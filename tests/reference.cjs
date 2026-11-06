const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const read = name => fs.readFileSync(path.join(__dirname, '../dist', name), 'utf8');
function run(value = '', pick = '001.DXY6zpmiGsV', hash = '#mission/8') {
  let events = 0, cleaned = null, focused = false;
  const answer = {value, dispatchEvent(e) { assert.equal(e.type, 'input'); assert.equal(e.bubbles, true); events++; }, focus() { focused = true; }, setSelectionRange() {}};
  vm.runInNewContext(read('apply-reference.js'), {URL, Event, location: {href: 'https://example.test/?keep=yes&pick=' + encodeURIComponent(pick) + hash}, document: {querySelector() { return answer; }}, history: {state: null, replaceState(_s, _t, url) { cleaned = url; }}});
  return {answer, events, cleaned, focused};
}
test('selection appends without replacing existing answer and triggers autosave', () => {
  const r = run('Мой хук');
  assert.equal(r.answer.value, 'Мой хук\nReel 001 · https://www.instagram.com/reel/DXY6zpmiGsV/\n');
  assert.equal(r.events, 1);
  assert.equal(r.cleaned.searchParams.has('pick'), false);
  assert.equal(r.cleaned.searchParams.get('keep'), 'yes');
  assert.equal(r.cleaned.hash, '#mission/8');
  assert.equal(r.focused, true);
});
test('reselecting same reel does not duplicate it or save again', () => {
  const first = run();
  const second = run(first.answer.value);
  assert.equal(second.answer.value, first.answer.value);
  assert.equal(second.events, 0);
});
test('invalid picks and unrelated routes never change answers', () => {
  for (const p of ['000.A', '189.A', '1.A', '001.<script>', '001.https://evil.test', '']) {
    const r = run('Оставить', p);
    assert.equal(r.answer.value, 'Оставить');
    assert.equal(r.events, 0);
  }
  assert.equal(run('Оставить', '001.A', '#home').answer.value, 'Оставить');
});
test('all 188 original links remain unique and build correct task actions', () => {
  const html = read('references.html');
  const links = [...html.matchAll(/href="(https:\/\/www\.instagram\.com\/reel\/[^"]+)"[^>]*>Reel (\d{3})<\/a>/g)];
  assert.equal(links.length, 188);
  assert.equal(new Set(links.map(m => m[1])).size, 188);
  const wrappers = [];
  const reels = links.map(m => ({href: m[1], textContent: 'Reel ' + m[2], replaceWith(w) { wrappers.push(w); }}));
  vm.runInNewContext(read('pick-reference.js'), {URL, document: {querySelectorAll() { return reels; }, createElement() { return {setAttribute() {}, append(...children) { this.children = children; }}; }}});
  wrappers.forEach((w, i) => {
    assert.equal(w.children[0], reels[i]);
    assert.equal(w.children[1].href, './?pick=' + links[i][2] + '.' + new URL(links[i][1]).pathname.split('/')[2] + '#mission/8');
  });
});
test('import script runs after application boot', () => {
  const html = read('index.html');
  assert.ok(html.indexOf('apply-reference.js') > html.indexOf('help.js'));
  assert.ok(read('references.html').includes('src="pick-reference.js"'));
});
