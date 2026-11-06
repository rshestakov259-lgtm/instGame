// Original Instagram links remain usable without JavaScript.
for (const reel of document.querySelectorAll('.reel-links a')) {
  const number = reel.textContent.match(/\d+$/)[0];
  const code = new URL(reel.href).pathname.split('/')[2];
  const choice = document.createElement('div');
  choice.className = 'reel-choice';
  const use = document.createElement('a');
  use.className = 'use-reel';
  use.href = './?pick=' + number + '.' + code + '#mission/8';
  use.textContent = 'В задание';
  use.setAttribute('aria-label', 'Выбрать Reel ' + number + ' для разбора');
  reel.replaceWith(choice);
  choice.append(reel, use);
}
