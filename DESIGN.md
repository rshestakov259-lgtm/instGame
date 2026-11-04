# Кадр — learning app pilot

## Visual direction
A playful creator studio, with custom vector illustration and a camera companion named Клик. Soft lilac environment, violet primary actions, mint completion states, gold experience and awards. Rounded controls have physical depth; detail backgrounds and map decorations are rendered in CSS and SVG.

## Screens
- Path: six mission nodes, map/list switch, chapter navigator, daily target, next achievement.
- Lessons: existing module one content and forms, optional deeper explanations, reference screenshot viewer, completion validation.
- Backpack: account worksheet download, profile copy, reusable prompt.
- Awards: achievements at 1, 3, 6 completed missions.
- Profile: name, daily goal 1–3 missions, seven-day completion history, opt-in reward sound.

## Progress rules
Existing `reels-start-v1` localStorage is preserved. Each mission grants 50 XP once, for a maximum of 300 in this chapter. Repeating a mission does not grant more XP. Daily counts record first-time completions only. Prior completions count toward XP and achievements but are not assigned fabricated historical dates. All missions remain accessible for self-paced learning.

## Limits
Browser-local data only. No server sync, payment, user account system or shipped modules 2–7. Screenshots and existing author-method content remain pilot material. The course calendar is not implemented. No fabricated ranking, live user count or testimonials.

## Verification
Desktop and 390/320 px layout review. Browser checks for empty-form validation, first-time rewards, duplicate XP prevention, saving name and goal over reload, next-mission navigation and achievement states. `node --check dist/app.js`.

## Full-course update · 2026-10-27

The approved studio visual language is preserved. Seven selectable worlds now contain 42 missions (six each); original mission IDs 0–5 and storage key remain compatible. Later chapters each provide an actionable route, optional deeper explanation, saved practice response and completion checkbox. All chapters are open for self-paced study. Funnel sales content remains outside the core scope.

New functionality: 1.8× reference calculator, reusable editor prompt, workbook export, JSON backup/restore, 60-day publication calendar with main/trial/mixed modes, saved daily actual counts, separate repeatable 30-day cycles. Calendar plans explicitly represent the author's practice. Publication counts do not earn XP. The app does not upload or publish Instagram media, run an AI API, or synchronize between devices.

Bug fixes: hash routes and browser history, validation with field focus, state shape normalization, legacy data preservation, complete note export, once-only awards, toast timer handling, merge of different-tab edits, and serialized completions with Web Locks where supported. Storage failure is shown rather than silently claiming durable save.

Validation: 17 Node regression tests passed; syntax checks passed. Browser checks covered chapter switching, reference calculator threshold, missing-answer validation, mission reward, reload, back navigation, original settings mission, calendar creation, daily save/reload, and new 30-day repeat retaining the old cycle. Visual QA at 390px and 320px. App-generated errors were not observed; browser extension metadata errors were unrelated. Backup restore's confirmation UI is implemented but full file chooser round-trip was not browser-tested.

Editorial follow-up: modules are complete first editorial drafts, not approved final copy. Original screenshot annotations still need author review. The remaining chapters use text and practice, with no fabricated screenshots of Edits. Additional exact interface screenshots and richer worked examples can be added during revision. No support mailbox address has been invented.

Sources used for content checks:
- https://about.fb.com/news/2024/12/trial-reels-try-content-non-followers-first-see-what-perfoms-best/
- https://www.pexels.com/license/
- https://pixabay.com/service/license-summary/

## Studio Objects sticker pack · 2026-10-27
Eight original transparent SVG assets: camera, clapper, idea, editor, film, calendar, growth, award. Shared 240×240 drawing space, 3.5-unit graphite outline, lavender/mint/cream fills, restrained gold accents, white cutline and soft offset shadow. No system emoji are used inside the decorative objects. Map objects vary by chapter; chapter badges and completion-count decoration use the same set. Existing Click mascot retained. Gallery: stickers.html. Source archive: kadr-stickers.zip, also linked from workbook. All eight assets checked in browser; JS regression tests pass. Gallery is responsive at two columns on narrow screens.


## Аудит и центр помощи — 28.10.2026
Добавлен help.js: 31 решение, закладки, проверка ролика и отчёт об ошибке. Сохранена палитра и SVG-стикеры. Мобильные диалоги и восстановление состояния исправлены. Подробная проверка и ограничения: QA.md.

## Векторные элементы интерфейса — 28.10.2026
Системные стрелки, галочки, звёздочки и крестики заменены встроенными SVG: единая линия 1.8, currentColor, декоративные aria-hidden, некликабельные внутренние элементы. Проверены кнопки уроков и закрытие награды; мобильная стрелка 17×17 px. Удалён риск цветной emoji-подстановки на iOS.

## Первый визуальный модуль
visual-guide.js: семь исходных экранов с HTML-рамками, пояснениями и результатом; учебный пример профиля и схемы выбора аккаунта, архивации, точки старта. Скрины не перерисованы. quality.jpg оказался экраном меню, подпись исправлена. Нужны реальные промежуточные экраны навигации и переключатель качества. Проверены увеличение оригинала, сохранение шести select после reload, две карточки примера профиля, мобильная ширина 390 (375 clientWidth=scrollWidth). 23 регрессионные проверки проходят.

## Romanpopular: личная подача
Добавлены присланные экраны профиля, статуса, качества, редактирования, архивации и навигации типа аккаунта. Методические отсылки к стороннему автору переведены в первое лицо; отсылки к авторам референсов сохранены. 23 проверки проходят. Четыре старых экрана настроек ждут новых снимков.
