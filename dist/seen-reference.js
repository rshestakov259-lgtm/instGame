// Catalogue helpers: "already watched" marks and jump to a Reel number.
// Marks live only in this browser under their own key; course progress is not touched.
(() => {
  const KEY = 'kadr-ref-seen';
  let seen = new Set();
  try { const raw = JSON.parse(localStorage.getItem(KEY) || '[]'); if (Array.isArray(raw)) seen = new Set(raw.filter(n => /^\d{3}$/.test(n))); } catch {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify([...seen])); } catch {} };
  const reels = [...document.querySelectorAll('.reel-links a[href*="instagram.com/reel/"]')];
  const numberOf = a => (a.textContent.match(/(\d{3})$/) || [])[1];
  const count = document.createElement('p');
  count.className = 'seen-count';
  count.setAttribute('role', 'status');
  const paint = () => {
    for (const a of reels) {
      const n = numberOf(a), box = a.closest('.reel-choice') || a;
      box.classList.toggle('is-seen', seen.has(n));
      a.setAttribute('aria-label', 'Reel ' + n + (seen.has(n) ? ', уже смотрел' : ''));
    }
    count.textContent = 'Просмотрено: ' + seen.size + ' из ' + reels.length;
  };
  for (const a of reels) a.addEventListener('click', () => { const n = numberOf(a); if (n) { seen.add(n); save(); paint(); } });

  const tools = document.createElement('div');
  tools.className = 'catalogue-tools';
  tools.innerHTML = '<label>Перейти к ролику <input id="reelJump" type="number" min="1" max="' + reels.length + '" inputmode="numeric" placeholder="например, 57"></label><button type="button" id="reelGo">Показать</button><button type="button" id="reelNext">Следующий непросмотренный</button><button type="button" id="seenReset">Сбросить отметки</button>';
  const first = document.querySelector('main details');
  first.before(tools, count);
  const show = a => {
    if (!a) return;
    const d = a.closest('details'); if (d) d.open = true;
    a.scrollIntoView({ block: 'center' });
    a.focus();
  };
  tools.addEventListener('click', e => {
    const id = e.target.id;
    if (id === 'reelGo') {
      const n = String(Number(document.querySelector('#reelJump').value)).padStart(3, '0');
      const a = reels.find(r => numberOf(r) === n);
      if (a) show(a); else count.textContent = 'Такого номера нет. Введи число от 1 до ' + reels.length + '.';
    }
    if (id === 'reelNext') { const a = reels.find(r => !seen.has(numberOf(r))); if (a) show(a); else count.textContent = 'Ты посмотрел все ролики подборки.'; }
    if (id === 'seenReset') { seen.clear(); save(); paint(); }
  });
  document.querySelector('#reelJump').addEventListener('keydown', e => { if (e.key === 'Enter') document.querySelector('#reelGo').click(); });
  paint();
})();
