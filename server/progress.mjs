// Sites supplies the verified visitor identity. Never choose a database row by a client-supplied ID.
const maxBytes = 1_000_000;
const headers = { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'private, no-store', 'vary': 'Cookie' };
const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers });
const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);

function validSnapshot(s) {
  if (!record(s) || !record(s.fields) || !record(s.activity) || !Array.isArray(s.done) || s.done.length > 42) return false;
  if (typeof s.epoch !== 'string' || s.epoch.length > 150 || ![1, 2, 3].includes(s.goal) || typeof s.sound !== 'boolean' ||
      !['list', 'map'].includes(s.mapMode) || !Number.isInteger(s.last) || s.last < 0 || s.last >= 42) return false;
  if (!s.done.every(id => Number.isInteger(id) && id >= 0 && id < 42)) return false;
  if (!Object.entries(s.fields).every(([key, value]) => key.length <= 160 && !['__proto__', 'constructor', 'prototype'].includes(key) &&
      (typeof value === 'string' || typeof value === 'boolean' || Number.isFinite(value)))) return false;
  const day = /^\d{4}-\d{2}-\d{2}$/;
  if (!Object.entries(s.activity).every(([date, n]) => day.test(date) && Number.isInteger(n) && n >= 0 && n <= 42)) return false;
  return s.completedOn === undefined || (record(s.completedOn) && Object.entries(s.completedOn).every(([id, date]) =>
    /^\d{1,2}$/.test(id) && s.done.includes(Number(id)) && typeof date === 'string' && day.test(date)));
}

async function readBoundedBody(request) {
  if (Number(request.headers.get('content-length')) > maxBytes) return null;
  const reader = request.body?.getReader();
  if (!reader) return '';
  const decoder = new TextDecoder();
  let bytes = 0, text = '';
  for (;;) {
    const part = await reader.read();
    if (part.done) return text + decoder.decode();
    bytes += part.value.byteLength;
    if (bytes > maxBytes) { await reader.cancel(); return null; }
    text += decoder.decode(part.value, { stream: true });
  }
}

async function progress(request, env) {
  const account = request.headers.get('oai-authenticated-user-id');
  if (!account) return json({ account: null }, 401);
  if (!['GET', 'PUT'].includes(request.method)) return json({ error: 'method' }, 405);
  const db = env.DB;
  async function current(status = 200) {
    const row = await db.prepare('SELECT revision, snapshot FROM course_progress WHERE account_id = ?').bind(account).first();
    return json({ account, revision: row?.revision ?? 0, state: row ? JSON.parse(row.snapshot) : null }, status);
  }
  if (request.method === 'GET') return current();
  if (request.headers.get('sec-fetch-site') === 'cross-site' ||
      (request.headers.has('origin') && request.headers.get('origin') !== new URL(request.url).origin)) {
    return json({ error: 'origin' }, 403);
  }
  if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') return json({ error: 'json_required' }, 415);
  const raw = await readBoundedBody(request);
  if (raw === null) return json({ error: 'too_large' }, 413);
  let body;
  try { body = JSON.parse(raw); } catch { return json({ error: 'invalid_json' }, 400); }
  if (!record(body) || body.account !== account) return json({ error: 'account_changed' }, 403);
  if (!Number.isSafeInteger(body.revision) || body.revision < 0 || !validSnapshot(body.state)) return json({ error: 'invalid_snapshot' }, 400);
  const snapshot = JSON.stringify(body.state);
  const revision = body.revision;
  const result = revision === 0
    ? await db.prepare('INSERT INTO course_progress(account_id, revision, snapshot) VALUES (?, 1, ?) ON CONFLICT(account_id) DO NOTHING').bind(account, snapshot).run()
    : await db.prepare('UPDATE course_progress SET snapshot = ?, revision = revision + 1 WHERE account_id = ? AND revision = ?').bind(snapshot, account, revision).run();
  if (result.meta.changes !== 1) return current(409);
  return json({ account, revision: revision + 1 });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/progress') {
      try { return await progress(request, env); } catch { return json({ error: 'storage_unavailable' }, 503); }
    }
    if (url.pathname.startsWith('/api/')) return json({ error: 'not_found' }, 404);
    return env.ASSETS ? env.ASSETS.fetch(request) : new Response('Not found', { status: 404 });
  }
};
