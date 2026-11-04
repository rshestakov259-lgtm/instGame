/* Shared state rules, also exercised by the Node regression suite. */
(function (root) {
  const record = v => v && typeof v === 'object' && !Array.isArray(v);
  function validDate(v){if(typeof v!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(v))return false;const d=new Date(v+'T12:00:00');return !Number.isNaN(d.valueOf())&&dateKey(d)===v;}
  function normalize(value) {
    const v = record(value) ? value : {};
    const fields = Object.fromEntries(Object.entries(record(v.fields) ? v.fields : {}).filter(([k,x]) => !['__proto__','constructor','prototype'].includes(k) && (typeof x === 'string' || typeof x === 'boolean' || typeof x === 'number' && Number.isFinite(x))));
    const done = [...new Set((Array.isArray(v.done) ? v.done : []).filter(x => Number.isInteger(x) && x >= 0 && x < 42))];
    const activity = Object.fromEntries(Object.entries(record(v.activity) ? v.activity : {}).filter(([k,x]) => /^\d{4}-\d{2}-\d{2}$/.test(k) && Number.isInteger(x) && x >= 0 && x <= 42));
    return {epoch:typeof v.epoch==='string'?v.epoch:'legacy',fields, done, activity, goal:[1,2,3].includes(v.goal)?v.goal:1, sound:v.sound===true, mapMode:v.mapMode==='list'?'list':'map', last:Number.isInteger(v.last)&&v.last>=0&&v.last<42?v.last:0};
  }
  function merge(base, local, remote) {
    const a=normalize(base), b=normalize(local), out=normalize(remote);
    if(a.epoch!==out.epoch)return out;
    for(const [key,val] of Object.entries(b.fields)) if(val!==a.fields[key]) out.fields[key]=val;
    for(const key of ['goal','sound','mapMode','last']) if(b[key]!==a[key]) out[key]=b[key];
    out.done=[...new Set([...out.done,...b.done])];
    for(const [day,count] of Object.entries(b.activity)) out.activity[day]=Math.max(count,out.activity[day]||0);
    return out;
  }
  function route(hash) {
    const s=String(hash||'').replace(/^#/,'');
    if(/^mission\/\d+$/.test(s)&&Number(s.split('/')[1])>=1&&Number(s.split('/')[1])<=42)return Number(s.split('/')[1])-1;
    if(/^chapter\/[1-7]$/.test(s))return s;
    return ['home','materials','achievements','profile','calendar','help','preflight'].includes(s)?s:'home';
  }
  function hash(view){return typeof view==='number'?'#mission/'+(view+1):'#'+view;}
  function dateKey(date=new Date()){return date.getFullYear()+'-'+String(date.getMonth()+1).padStart(2,'0')+'-'+String(date.getDate()).padStart(2,'0');}
  const api={normalize,merge,route,hash,dateKey,validDate};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  else root.KadrState=api;
})(globalThis);
