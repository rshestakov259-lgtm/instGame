/* Shared state rules, also exercised by the Node regression suite. */
(function (root) {
  const record = v => v && typeof v === 'object' && !Array.isArray(v);
  function validDate(v){if(typeof v!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(v))return false;const d=new Date(v+'T12:00:00');return !Number.isNaN(d.valueOf())&&dateKey(d)===v;}
  function normalize(value) {
    const v = record(value) ? value : {};
    const fields = Object.fromEntries(Object.entries(record(v.fields) ? v.fields : {}).filter(([k,x]) => !['__proto__','constructor','prototype'].includes(k) && (typeof x === 'string' || typeof x === 'boolean' || typeof x === 'number' && Number.isFinite(x))));
    const done = [...new Set((Array.isArray(v.done) ? v.done : []).filter(x => Number.isInteger(x) && x >= 0 && x < 42))];
    const activity = Object.fromEntries(Object.entries(record(v.activity) ? v.activity : {}).filter(([k,x]) => /^\d{4}-\d{2}-\d{2}$/.test(k) && Number.isInteger(x) && x >= 0 && x <= 42));
    const completedOn = Object.fromEntries(Object.entries(record(v.completedOn) ? v.completedOn : {}).filter(([id, day]) => String(Number(id))===id && done.includes(Number(id)) && validDate(day)));
    return {completedOn,epoch:typeof v.epoch==='string'?v.epoch:'legacy',fields, done, activity, goal:[1,2,3].includes(v.goal)?v.goal:1, sound:v.sound===true, mapMode:v.mapMode==='list'?'list':'map', last:Number.isInteger(v.last)&&v.last>=0&&v.last<42?v.last:0};
  }
  function merge(base, local, remote) {
    const a=normalize(base), b=normalize(local), out=normalize(remote);
    if(a.epoch!==out.epoch)return out;
    for(const [key,val] of Object.entries(b.fields)) if(val!==a.fields[key]) out.fields[key]=val;
    for(const key of ['goal','sound','mapMode','last']) if(b[key]!==a[key]) out[key]=b[key];
    out.done=[...new Set([...out.done,...b.done])];
    const remoteDates = out.completedOn;
    out.completedOn = {...b.completedOn, ...remoteDates};
    const counts = dates => Object.values(dates).reduce((map, day) => {
      map[day] = (map[day] || 0) + 1;
      return map;
    }, {});
    const left = counts(b.completedOn), right = counts(remoteDates), combined = counts(out.completedOn);
    for (const day of new Set([...Object.keys(b.activity), ...Object.keys(out.activity), ...Object.keys(combined)])) {
      const historical = Math.max(0, (b.activity[day] || 0) - (left[day] || 0), (out.activity[day] || 0) - (right[day] || 0));
      out.activity[day] = Math.min(42, historical + (combined[day] || 0));
    }
    return out;
  }
  function reconcile(base, local, remote) {
    if (!remote) return normalize(local);
    const original = normalize(base), current = normalize(local), incoming = normalize(remote);
    if (incoming.epoch !== original.epoch) return incoming;
    if (current.epoch !== original.epoch) return current;
    return merge(original, current, incoming);
  }
  function addGuest(guest, account) {
    const local = normalize(guest), target = normalize(account);
    if (!account) return local;
    const seed = normalize({...local, epoch:target.epoch, fields:{...local.fields, ...target.fields}});
    const result = merge(normalize({epoch:target.epoch}), seed, target);
    for (const k of ['last','goal','sound','mapMode']) result[k] = target[k];
    return result;
  }
  function route(hash) {
    const s=String(hash||'').replace(/^#/,'');
    if(/^mission\/\d+$/.test(s)&&Number(s.split('/')[1])>=1&&Number(s.split('/')[1])<=42)return Number(s.split('/')[1])-1;
    if(/^chapter\/[1-7]$/.test(s))return s;
    return ['home','materials','achievements','profile','calendar','help','preflight'].includes(s)?s:'home';
  }
  function hash(view){return typeof view==='number'?'#mission/'+(view+1):'#'+view;}
  function dateKey(date=new Date()){return date.getFullYear()+'-'+String(date.getMonth()+1).padStart(2,'0')+'-'+String(date.getDate()).padStart(2,'0');}
  const api={normalize,merge,reconcile,addGuest,route,hash,dateKey,validDate};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  else root.KadrState=api;
})(globalThis);
