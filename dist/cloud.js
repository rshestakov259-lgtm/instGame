/* Guest progress retains the original key. A signed-in user gets a separate local cache. */
(() => {
  let account = null, revision = 0, base = null, status = 'Проверяем сохранение…';
  let timer = 0, running = null, pullRequested = false, canRetry = false, paused = false;
  const sessionKey = 'kadr-active-account';
  const scope = id => KEY + ':account:' + id;
  const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const meaningful = s => !!s && (s.done.length || Object.keys(s.fields).length || s.last || s.goal !== 1 || s.sound || s.mapMode === 'list');
  function read(key) { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } }
  function write(key, data) { try { localStorage.setItem(key, JSON.stringify(data)); return true; } catch { return false; } }
  const guest = () => KadrState.normalize(read(KEY));
  const hasGuest = () => account && meaningful(guest()) && !read(scope(account) + ':guest-imported');
  const dirty = () => account && (base ? !same(state, base) : meaningful(state));

  function paint() {
    const indicator = document.querySelector('#cloudIndicator');
    if (indicator) indicator.textContent = status;
    const panel = document.querySelector('#cloudPanel');
    if (!panel) return;
    const description = account
      ? 'Миссии, ответы, закладки и календарь доступны при входе в этот же аккаунт на другом устройстве.'
      : 'Без входа ответы остаются в этом браузере. Войди, чтобы продолжить с телефона или компьютера.';
    const signIn = '<a class="secondary" target="_top" href="/signin-with-chatgpt?return_to=%2F%23profile">Войти через ChatGPT</a>';
    const actions = account ? '<a class="quiet" data-cloud-signout target="_top" href="/signout-with-chatgpt?return_to=%2F%23profile">Выйти из аккаунта</a>' : signIn;
    const migrate = hasGuest() ? '<p>В этом браузере есть отдельные ответы, сохранённые без входа. Можно добавить их в аккаунт. Уже заполненные поля аккаунта сохранятся.</p><button class="secondary" data-cloud-import>Добавить ответы с этого устройства</button>' : '';
    const html = '<h2>Сохранение прогресса</h2><p role="status"><strong>' + esc(status) + '</strong></p><p>' + description + '</p>' + migrate +
      '<div class="actions">' + actions + (canRetry ? '<button class="secondary" data-cloud-retry>Проверить ещё раз</button>' : '') + '</div>';
    if (panel.dataset.rendered !== html) { panel.innerHTML = html; panel.dataset.rendered = html; }
  }
  function report(message, retry = false) { status = message; canRetry = retry; paint(); }
  function redraw() {
    const active = document.activeElement, key = active?.dataset?.field;
    const start = key ? active.selectionStart : null, end = key ? active.selectionEnd : null;
    const top = window.scrollY;
    render(current, 'none');
    if (key) {
      const input = [...document.querySelectorAll('[data-field]')].find(el => el.dataset.field === key);
      if (input) {
        input.focus({preventScroll:true});
        if (start != null && input.setSelectionRange) input.setSelectionRange(start, end);
      }
    }
    window.scrollTo({top,behavior:'instant'});
  }
  function selectAccount(id) {
    if (account === id) return false;
    account = id;
    progressKey = id ? scope(id) : KEY;
    const meta = id ? read(progressKey + ':sync') : null;
    revision = meta?.revision || 0;
    base = meta?.state ? KadrState.normalize(meta.state) : null;
    state = KadrState.normalize(read(progressKey) || base);
    saved = structuredClone(state);
    try { if (id) sessionStorage.setItem(sessionKey,id); else sessionStorage.removeItem(sessionKey); } catch {}
    return true;
  }
  function accept(remote) {
    const switched = selectAccount(remote.account);
    const before = state;
    if (remote.revision >= revision || switched) {
      const local = KadrState.merge(saved, state, read(progressKey) || state);
      state = KadrState.reconcile(base, local, remote.state);
      base = remote.state ? KadrState.normalize(remote.state) : null;
      revision = remote.revision;
      saved = structuredClone(state);
      write(progressKey, state);
      write(progressKey + ':sync', {revision, state:base});
    }
    if (switched || !same(before,state)) redraw();
  }
  function schedule(delay = 850, pull = false) {
    pullRequested ||= pull;
    clearTimeout(timer);
    timer = setTimeout(() => { timer=0;return run().catch(() => {}); }, delay);
  }
  async function process() {
    const pull = pullRequested || !account;
    pullRequested = false;
    if (pull) {
      const response = await fetch('/api/progress', {cache:'no-store',credentials:'same-origin'});
      if (response.status === 401) {
        if (selectAccount(null)) redraw();
        report('Сохранение в этом браузере');
        return;
      }
      if (!response.ok) throw Error('unavailable');
      const data = await response.json();
      if (typeof data.account !== 'string' || !Number.isSafeInteger(data.revision)) throw Error('unavailable');
      accept(data);
    }
    for (let attempt = 0; account && dirty() && attempt < 5; attempt++) {
      report('Сохраняем в аккаунте…');
      const sent = structuredClone(state);
      const response = await fetch('/api/progress', {method:'PUT', credentials:'same-origin', cache:'no-store',
        headers:{'content-type':'application/json'}, body:JSON.stringify({account,revision,state:sent})});
      if (response.status === 401 || response.status === 403) {
        schedule(50,true); report('Проверяем аккаунт…'); return;
      }
      if (response.status === 413 || response.status === 400) {
        report('Сервер не принял копию. Скачай JSON в рюкзаке.',true); return;
      }
      if (!response.ok && response.status !== 409) throw Error('unavailable');
      const data = await response.json();
      if (data.account !== account) { schedule(50,true); return; }
      if (response.status === 409) { accept(data); continue; }
      revision = data.revision;
      base = sent;
      write(progressKey + ':sync', {revision,state:base});
    }
    if (dirty()) { schedule(1000,true); return; }
    report(revision ? 'Сохранено в аккаунте' : 'Облачное сохранение включено');
  }
  function run() {
    if (running) return running;
    running = process().catch(() => {
      if (!account) {
        let cached;
        try { cached = sessionStorage.getItem(sessionKey); } catch {}
        if (cached && selectAccount(cached)) redraw();
      }
      report(account ? 'Нет связи с облаком. Ответы на этом устройстве.' : 'Облако недоступно. Ответы в этом браузере.', true);
      schedule(20000,true);
    }).finally(() => { running=null;if(pullRequested && !timer)schedule(0,true); });
    return running;
  }
  function changed() {
    if (paused || !account || !dirty()) return;
    report('Сохранение ожидает отправки');
    schedule();
  }
  window.KadrCloud = {changed,paint};
  document.addEventListener('click', async event => {
    if (event.target.closest('[data-cloud-retry]')) { schedule(0,true); return; }
    if (event.target.closest('[data-cloud-import]') && account && hasGuest()) {
      state = KadrState.addGuest(guest(), meaningful(state) ? state : null);
      saved = structuredClone(state);
      const cached = write(progressKey, state);
      if (cached) write(progressKey + ':guest-imported',true);
      redraw(); changed(); paint();
      toast('Ответы с устройства добавлены');
    }
    const link = event.target.closest('[data-cloud-signout]');
    if (!link || !account) return;
    event.preventDefault();
    clearTimeout(timer);
    await run();
    if (dirty()) { toast('Есть неотправленные изменения. Повтори сохранение или скачай JSON в рюкзаке.'); return; }
    paused = true;
    try { sessionStorage.removeItem(sessionKey); } catch {}
    window.top.location.href = link.href;
  });
  window.addEventListener('online', () => schedule(0,true));
  window.addEventListener('focus', () => schedule(0,true));
  window.addEventListener('storage', event => { if (account && event.key === progressKey) schedule(250,true); });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') schedule(0,true);
    else if (dirty()) { clearTimeout(timer); run(); }
  });
  paint(); schedule(0,true);
})();
