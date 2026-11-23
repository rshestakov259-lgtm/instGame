import { build } from 'esbuild';
import { copyFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const local = relative => fileURLToPath(new URL(relative, import.meta.url));
const out = '../dist/assets/';
await build({ entryPoints:[local('route-control.jsx')], outfile:local(out+'route-control.js'),
  bundle:true, minify:true, legalComments:'eof', jsx:'automatic', target:['es2020'],
  define:{'process.env.NODE_ENV':'"production"'} });
const font = 'node_modules/@fontsource-variable/unbounded/';
await mkdir(local(out+'fonts'), {recursive:true});
for (const subset of ['cyrillic','latin']) {
  const file = `unbounded-${subset}-wght-normal.woff2`;
  await copyFile(local(font+'files/'+file),local(out+'fonts/'+file));
}
await copyFile(local(font+'LICENSE'),local(out+'fonts/Unbounded-LICENSE.txt'));
