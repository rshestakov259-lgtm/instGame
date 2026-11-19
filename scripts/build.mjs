import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(root, 'dist');
const client = path.join(dist, 'client');
const server = path.join(dist, 'server');
await rm(client, { recursive: true, force: true });
await mkdir(client, { recursive: true });
for (const entry of await readdir(dist, { withFileTypes: true })) {
  if (entry.name === 'assets' || (entry.isFile() && /\.(html|css|js|zip)$/.test(entry.name))) {
    await cp(path.join(dist, entry.name), path.join(client, entry.name), { recursive: true });
  }
}
await mkdir(server, { recursive: true });
await cp(path.join(root, 'server/progress.mjs'), path.join(server, 'index.js'));
await mkdir(path.join(dist, '.openai'), { recursive: true });
await cp(path.join(root, '.openai/hosting.json'), path.join(dist, '.openai/hosting.json'));
