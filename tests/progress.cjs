const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const S = require('../dist/state.js');
const cloud = fs.readFileSync(path.join(__dirname,'../dist/cloud.js'),'utf8');

async function server(t) {
  const [{default:worker},{openLocalDB}]=await Promise.all([import('../server/progress.mjs'),import('../scripts/local-db.mjs')]);
  const db=openLocalDB(); t.after(()=>db.close());
  return (id,body,extra={}) => worker.fetch(new Request('https://course.example/api/progress',{
    method:body===undefined?'GET':'PUT',
    headers:{...(id?{'oai-authenticated-user-id':id}:{}),'content-type':'application/json',...extra},
    body:body===undefined?undefined:JSON.stringify(body)
  }),{DB:db});
}
test('the hosted API keeps the two accounts separate and requires verified identity for reading and writing',async t=>{
  const send=await server(t), state=S.normalize({fields:{answer_41:'Моя памятка'},done:[41]});
  assert.equal((await send(null)).status,401);
  assert.equal((await send(null,{account:'A',revision:0,state})).status,401);
  const before=await (await send('A')).json();
  assert.equal(before.state,null);
  assert.equal((await send('A',{account:'A',revision:0,state})).status,200);
  assert.equal((await send('B',{account:'A',revision:1,state})).status,403);
  assert.equal((await (await send('B')).json()).state,null);
  const after=await send('A');
  assert.match(after.headers.get('cache-control'),/no-store/);
  assert.deepEqual((await after.json()).state,state);
});
test('stale writes return the current snapshot, and an interrupted save can be retried',async t=>{
  const send=await server(t), start=S.normalize({});
  const first=await (await send('A',{account:'A',revision:0,state:start})).json();
  const phone=S.normalize({fields:{bankFile1:'На телефоне'},done:[18]}),pc=S.normalize({fields:{answer_25:'На компьютере'},done:[25]});
  const saved=await send('A',{account:'A',revision:first.revision,state:phone});
  assert.equal(saved.status,200);
  const conflict=await send('A',{account:'A',revision:first.revision,state:pc});
  assert.equal(conflict.status,409);
  const remote=await conflict.json(),combined=S.reconcile(start,pc,remote.state);
  const retry=await send('A',{account:'A',revision:remote.revision,state:combined});
  assert.equal(retry.status,200);
  const final=await (await send('A')).json();
  assert.deepEqual(final.state.fields,{bankFile1:'На телефоне',answer_25:'На компьютере'});assert.deepEqual(final.state.done,[18,25]);
  assert.equal((await send('A',{account:'A',revision:remote.revision,state:combined})).status,409);
});
test('invalid or oversized saves leave the durable snapshot intact',async t=>{
  const send=await server(t), state=S.normalize({fields:{note:'готово'}});
  await send('A',{account:'A',revision:0,state});
  assert.equal((await send('A',{account:'A',revision:1,state:{...state,done:[55]}})).status,400);
  assert.equal((await send('A',{account:'A',revision:1,state:{...state,fields:{note:'a'.repeat(1000000)}}})).status,413);
  assert.equal((await (await send('A')).json()).state.fields.note,'готово');
});
test('two devices get one credit per mission and retain historical activity when old saves are imported',()=>{
  const day='2026-11-19',base=S.normalize({done:[0,1],activity:{[day]:2}});
  const left=S.normalize({...base,done:[0,1,2],activity:{[day]:3},completedOn:{2:day}});
  const right=S.normalize({...base,done:[0,1,3],activity:{[day]:3},completedOn:{3:day}});
  assert.equal(S.reconcile(base,left,right).activity[day],4);
  assert.equal(S.reconcile(base,left,left).activity[day],3);
  const restore=S.normalize({epoch:'import-unique',done:[4],fields:{note:'из копии'}});
  assert.deepEqual(S.reconcile(base,restore,left),restore);
  assert.deepEqual(S.reconcile(base,left,restore),restore);
  const migrated=S.addGuest({...left,fields:{name:'на устройстве',film:'Файл'}},{...right,fields:{name:'из аккаунта'}});
  assert.deepEqual(migrated.fields,{name:'из аккаунта',film:'Файл'});
});
function device(request, initial={}) {
  const timers=new Map(), events={}, values=new Map(Object.entries(initial)), session=new Map();
  const tick=async()=>{if(!timers.size)return;const [id,callback]=timers.entries().next().value;timers.delete(id);await callback();};
  const get=(map,k)=>map.has(k)?map.get(k):null;
  let sequence=0;
  const element={dataset:{},innerHTML:'',textContent:''};
  const ctx={KadrState:S,structuredClone,console,JSON,Object,Array,Promise,KEY:'reels-start-v1',progressKey:'reels-start-v1',current:'home',
    state:S.normalize(JSON.parse(initial['reels-start-v1']||'null')),esc:String,render(){},toast(){},fetch:request,
    localStorage:{getItem:k=>get(values,k),setItem:(k,v)=>values.set(k,v)},
    sessionStorage:{getItem:k=>get(session,k),setItem:(k,v)=>session.set(k,v),removeItem:k=>session.delete(k)},
    window:{scrollTo(){},addEventListener:(name,fn)=>events[name]=fn},document:{querySelector:()=>element,querySelectorAll:()=>[],addEventListener:(name,fn)=>events[name]=fn},
    clearTimeout:id=>timers.delete(id),setTimeout:fn=>{const id=++sequence;timers.set(id,fn);return id;}};
  ctx.saved=structuredClone(ctx.state);
  vm.runInNewContext(cloud,ctx);
  return {ctx,values,tick,events,
    edit(k,v){ctx.state.fields[k]=v;values.set(ctx.progressKey,JSON.stringify(ctx.state));ctx.saved=structuredClone(ctx.state);ctx.window.KadrCloud.changed();},
    click(sel){return events.click({target:{closest:key=>key===sel?{}:null},preventDefault(){}});}
  };
}
test('two independent browser caches synchronize through the real SQLite handler; guest transfer is explicit and offline edits retry',async t=>{
  const send=await server(t);
  let offline=false;
  const network=id=>async(_url,opts={})=>{if(offline)throw Error('offline');return send(id,opts.body?JSON.parse(opts.body):undefined);};
  const phone=device(network('owner'),{'reels-start-v1':JSON.stringify(S.normalize({fields:{bankFile1:'Оттиск'}}))});
  await phone.tick();
  assert.equal((await (await send('owner')).json()).state,null);
  await phone.click('[data-cloud-import]');await phone.tick();
  assert.equal((await (await send('owner')).json()).state.fields.bankFile1,'Оттиск');
  const second=device(network('owner'));await second.tick();
  assert.equal(second.ctx.state.fields.bankFile1,'Оттиск');
  offline=true;phone.edit('answer_25','Заголовок в офлайне');await phone.tick();offline=false;
  second.edit('answer_39','Эксперимент на компьютере');await second.tick();
  phone.events.online();await phone.tick();
  second.events.focus();await second.tick();
  assert.equal(second.ctx.state.fields.answer_25,'Заголовок в офлайне');assert.equal(phone.ctx.state.fields.answer_39,'Эксперимент на компьютере');
  const other=device(network('other'),Object.fromEntries(phone.values));await other.tick();
  assert.equal(other.ctx.state.fields.answer_25,undefined);
});
