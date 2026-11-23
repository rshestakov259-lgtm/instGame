import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import * as Progress from '@radix-ui/react-progress';
import { MantineProvider, SegmentedControl } from '@mantine/core';
import { useReducedMotion } from '@mantine/hooks';
import { MapTrifoldIcon, ListBulletsIcon } from '@phosphor-icons/react';

const options = [
  { value: 'map', label: <><MapTrifoldIcon size={17} aria-hidden />Карта</> },
  { value: 'list', label: <><ListBulletsIcon size={17} aria-hidden />Список</> }
];

// Adapt the shadcn/ui progress primitive to the chapter's six film frames.
function ChapterProgress({count}) {
  return <Progress.Root className="chapter-meter" value={count} max={6} aria-label="Прогресс главы"
    getValueLabel={n => `${n} из 6 миссий`}>
    <Progress.Indicator className="meter-ink" style={{width: `${count / 6 * 100}%`}} />
  </Progress.Root>;
}

function RouteControl({mode, change}) {
  const [selected, setSelected] = useState(mode);
  const reducedMotion = useReducedMotion();
  return <SegmentedControl unstyled name="route-mode" aria-label="Вид маршрута" data={options}
    value={selected} onChange={next => { setSelected(next); change(next); }} transitionDuration={reducedMotion ? 0 : 140}
    classNames={{root:'game-switch',control:'switch-item',input:'switch-radio',label:'switch-label',innerLabel:'switch-text',indicator:'switch-indicator'}} />;
}

let root;
const clear = () => { if (root) { root.unmount(); root = undefined; } };
window.KadrControls = {
  clear,
  mount(host, mode, change, progress) {
    clear();
    root = createRoot(host);
    root.render(<MantineProvider withCssVariables={false} withGlobalClasses={false}>
      <RouteControl mode={mode} change={change} />
      {progress && createPortal(<ChapterProgress count={Number(progress.dataset.count)} />,progress)}
    </MantineProvider>);
  }
};
window.KadrMountControls?.();
