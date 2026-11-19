import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { Readable } from 'node:stream';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import app from '../server/progress.mjs';
import { openLocalDB } from './local-db.mjs';

const dir = fileURLToPath(new URL('../dist/', import.meta.url));
const cache = fileURLToPath(new URL('../.preview-data/', import.meta.url));
await mkdir(cache, { recursive: true });
const db = openLocalDB(path.join(cache, 'course.sqlite'));
const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8',
  '.svg':'image/svg+xml','.jpg':'image/jpeg','.png':'image/png','.mp4':'video/mp4','.zip':'application/zip','.txt':'text/plain; charset=utf-8'};
const assets = { async fetch(request) {
  const pathname = decodeURIComponent(new URL(request.url).pathname);
  const rel = pathname === '/' ? 'index.html' : pathname.slice(1);
  if (rel.split('/').some(p => p.startsWith('.') || p === 'server' || p === 'client') || !Object.hasOwn(mime,path.extname(rel))) return new Response(null,{status:404});
  try {
    const data = await readFile(path.join(dir,rel));
    const headers = {'content-type':mime[path.extname(rel)],'accept-ranges':'bytes'};
    const range = /^bytes=(\d+)-(\d*)$/.exec(request.headers.get('range') || '');
    if (range) {
      const start = Number(range[1]), end = range[2] ? Math.min(Number(range[2]),data.length-1) : data.length-1;
      if (start > end) return new Response(null,{status:416});
      headers['content-range'] = 'bytes ' + start + '-' + end + '/' + data.length;
      return new Response(data.subarray(start,end+1),{status:206,headers});
    }
    return new Response(data,{headers});
  } catch { return new Response(null,{status:404}); }
}};
const flag = process.argv.indexOf('--port');
const port = Number(flag >= 0 ? process.argv[flag+1] : process.env.PORT || 5173);
createServer(async (req,res) => {
  try {
    const h = new Headers(Object.entries(req.headers).filter(([k]) => !k.startsWith('oai-authenticated-')));
    const body = ['GET','HEAD'].includes(req.method) ? undefined : Readable.toWeb(req);
    const request = new Request('http://' + req.headers.host + req.url, {method:req.method,headers:h,body,duplex:'half'});
    const response = await app.fetch(request,{DB:db,ASSETS:assets});
    res.writeHead(response.status,Object.fromEntries(response.headers));
    res.end(Buffer.from(await response.arrayBuffer()));
  } catch { res.writeHead(500); res.end(); }
}).listen(port,'0.0.0.0',() => console.log('Кадр готов на порту ' + port));
