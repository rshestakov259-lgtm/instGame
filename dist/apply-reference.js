// Accept a catalogue number and shortcode, never arbitrary markup or URLs.
(() => {
  const url = new URL(location.href);
  const match = /^(\d{3})\.([A-Za-z0-9_-]{1,32})$/.exec(url.searchParams.get('pick') || '');
  const answer = document.querySelector('[data-field="answer_7"]');
  if (url.hash !== '#mission/8' || !answer || !match) return;
  const [, number, code] = match;
  if (Number(number) < 1 || Number(number) > 188) return;
  const link = 'https://www.instagram.com/reel/' + code + '/';
  if (!answer.value.includes(link)) {
    const prefix = answer.value && !answer.value.endsWith('\n') ? '\n' : '';
    answer.value += prefix + 'Reel ' + number + ' · ' + link + '\n';
    answer.dispatchEvent(new Event('input', { bubbles: true }));
  }
  url.searchParams.delete('pick');
  history.replaceState(history.state, '', url);
  answer.focus();
  answer.setSelectionRange(answer.value.length, answer.value.length);
})();
