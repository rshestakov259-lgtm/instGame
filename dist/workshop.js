/* Practical work for missions 19–42. Indices and answer_<id> are shared with the original workbook. */
const workshop = [
  {
    steps:['Открываю пять недавних вертикальных видео. Просматриваю каждое без звука: какое действие узнаётся за секунду?', 'Останавливаю кадр в начале и конце действия. Проверяю, останется ли место для двух строк текста и не попали ли в кадр адрес или переписка.', 'Даю каждому файлу понятное имя и привязываю к конкретной мысли ролика.'],
    example:'В учебном клипе штамп оставляет оттиск на обложке. На этом фрагменте можно показать, как один заметный элемент направляет взгляд. Открытие приложения на телефоне рассказало бы уже о другой задаче.',
    label:'Пять исходников и подходящие темы', hint:'Обложка_01 — как выбрать один акцент на обложке.'
  },
  {
    steps:['Выбираю три места с разным светом и записываю по одному действию для каждого.', 'Ставлю телефон вертикально на опору. Оставляю секунду до начала движения и после остановки, снимаю 12–15 секунд.', 'Просматриваю первый дубль в полный экран. Если свет меняется или фокус ушёл на фон, переснимаю, пока всё на месте.'],
    example:'У окна снимаю, как открываю книгу. За столом ставлю штамп на листе. На полке вынимаю нужный том. На все три кадра отвожу пятнадцать минут после обеда.',
    label:'Где, что и когда я сниму', hint:'Среда, 14:00. У окна — открываю книгу. За столом — …'
  },
  {
    steps:['Подбираю три действия, которые понятны по рукам, предмету или экрану без портрета.', 'Для чужого исходника открываю страницу конкретного клипа и условия использования. Записываю автора, ссылку и выбранный фрагмент.', 'Если источник проверить нельзя, снимаю свой дубль. В учебной анимации ниже можно потренироваться прямо сейчас.'],
    example:'Для книжного блога подойдут три разных действия: развернуть обложку, приклеить закладку, поставить книгу на полку. Каждое можно снять руками за один дубль.',
    label:'Три сюжета без лица и источник кадров', hint:'1. Закладка крупным планом — сниму сам. 2. …'
  },
  {
    steps:['В галерее создаю три альбома для исходников, выбранных фрагментов и публикаций.', 'Имя строю из темы, действия и номера дубля. Оригинал оставляю там, где его легко найти.', 'Для использованного кадра записываю отрезок и дату выхода. Проверяю, что нужный исходник находится по этой записи.'],
    example:'В альбоме «Исходники» лежит «обложка_штамп_02». В заметке к публикации указано «03–09 с, ролик про читаемость». Через неделю легко взять другой момент.',
    label:'Мои альбомы и названия первых пяти файлов', hint:'Исходники / Фрагменты / Опубликовано. Имена: …'
  },
  {
    steps:['Просматриваю один исходник и нахожу три разных момента: начало действия, его развитие и результат.', 'Выбираю точку входа. Проверяю первый и последний кадр выбранного отрезка.', 'Для каждого варианта записываю, какую мысль он иллюстрирует. В учебном клипе можно передвинуть начало на шкале.'],
    example:'На 0–6 с лист превращается в обложку со штампом. На 3–9 с видны оттиск и движение валика. На 6–12 с лучше читается готовый рисунок. Для хука про один акцент я выбираю середину.',
    label:'Три отрезка одного файла и тема каждого', hint:'00:00–00:06 — …\n00:03–00:09 — …\n00:06–00:12 — …'
  },
  {
    steps:['Беру три идеи и нахожу для каждой конкретный видеофайл.', 'Записываю хук и границы фрагмента. Читаю хук вслух и смотрю выбранные секунды.', 'Выбираю одну пару для первого монтажа. Две другие остаются в видеобанке.'],
    example:'Первая пара: «Почему обложку трудно прочитать с телефона?» + «обложка_штамп» с 3-й по 9-ю секунду. В описании разбираю размер заголовка и контраст.',
    label:'Три пары для монтажа', hint:'Тема | хук | файл | отрезок. Пометь звёздочкой пару для первого монтажа.'
  },
  {
    steps:['Создаю проект в Edits и добавляю выбранный исходный файл.', 'На временной шкале оставляю 5–6 секунд одного законченного действия. Смотрю, как начинается и чем заканчивается движение.', 'Сохраняю название проекта и границы клипа. Для тренировки можно скачать тот же исходник, что в разборе.'],
    example:'В проекте «Книга_01» беру из 12-секундной анимации участок 00:03–00:09. Штамп и валик остаются в кадре, перед началом движения нет лишней паузы.',
    label:'Мой проект, исходник и границы клипа', hint:'Книга_01 | обложка_штамп | 00:03–00:09 | 6 секунд.'
  },
  {
    steps:['Переношу выбранный хук из третьей главы или ввожу свой. Разбиваю длинную фразу по смыслу.', 'В Edits растягиваю слой текста от первого до последнего кадра. Проверяю контраст над самым светлым и самым тёмным местом.', 'Открываю предпросмотр на телефоне. Читаю фразу, не приближая экран, и сверяю края с кнопками и подписью.'],
    example:'В учебном монтаже вопрос занимает две-три короткие строки на свободном участке листа. Штамп и рисунок остаются видны. Сравни исходник и готовый экспорт.',
    label:'Хук, который появится в моём ролике', hint:'Почему обложку трудно прочитать с телефона?'
  },
  {
    steps:['Решаю, что должно быть слышно: собственный голос, шум действия или музыка.', 'Выбираю разрешённый источник. Если беру трек из библиотеки приложения, проверяю доступность для этой публикации и аккаунта.', 'Прослушиваю начало и конец в наушниках и через динамик. Сохраняю название звука и его источник.'],
    example:'Могу отдельно записать звук штампа на своём столе и совместить его с касанием листа. Учебные MP4 идут без аудио, поэтому на них удобно проверить свою звуковую дорожку.',
    label:'Какой звук я использую и откуда он', hint:'Запись собственного штампа | записал сам | касание на второй секунде.'
  },
  {
    steps:['Экспортирую ролик и открываю сохранённый файл в обычной галерее.', 'Один раз смотрю ролик целиком со звуком. Второй раз ставлю на паузу в начале и конце и проверяю хук.', 'Если нашёл дефект, исправляю исходный проект, экспортирую снова и отмечаю результат по новой версии.'],
    example:'Текст виден в начале, но исчезает перед последним движением. Возвращаюсь на шкалу, продлеваю текстовый слой и заново открываю экспорт.',
    label:'Проверка файла после экспорта', hint:'Что исправил и какую версию проверил.'
  },
  {
    steps:['Открываю создание Reel, выбираю проверенный экспорт и вставляю полное описание.', 'Выбираю обложку и доступный режим показа. Ещё раз сверяю вид текста и звук.', 'После выхода открываю саму публикацию и разворачиваю описание до последней строки. Сохраняю ссылку, время и режим.'],
    example:'Для заметки оставляю постоянную ссылку из меню самой публикации. Рядом пишу «пятница, 18:30, обычный». Эти сведения пригодятся при сравнении статистики.',
    label:'Ссылка на публикацию, время и режим', hint:'Ссылка на твой Reel | дата и время | обычный или пробный.'
  },
  {
    steps:['При сбое фиксирую, на каком этапе он появился: в проекте, в экспорте или уже в Instagram.', 'Сначала проверяю опубликованную версию в профиле. Это помогает случайно не выпустить дубликат.', 'Выбираю подходящий сценарий ниже и записываю, что проверю после исправления.'],
    example:'Если исчез конец описания, сверяю его с сохранённым текстом и проверяю последнюю строку после редактирования. Если пропал звук, сначала слушаю локальный экспорт.',
    label:'Как я поступлю при сбое', hint:'Симптом → первое действие → как проверю результат.'
  },
  {
    steps:['Открываю экран публикации и смотрю, какие режимы предлагает мой аккаунт.', 'Выбираю обычные Reels, пробные или оба варианта. Учитываю, сколько самостоятельных роликов успею подготовить.', 'Запоминаю режим в практикуме. Он подставится в план и в новый календарь.'],
    example:'Если у меня готов один ролик и доступен только обычный показ, я начинаю с него. День можно отметить даже при меньшем объёме, чем в авторском плане.',
    label:'Мой режим и почему он подходит', hint:'Обычный: есть время собрать одну качественную публикацию после работы.'
  },
  {
    steps:['Сверяю авторский ориентир на первые три дня с запасом готовых файлов.', 'Отдельно записываю свой посильный план. Если смешанный режим недоступен, считаю только обычные публикации.', 'Вечером отмечаю фактический выпуск. План и факт храню отдельно, чтобы видеть реальную нагрузку.'],
    example:'Авторский ориентир обычного режима начинается с 3, 4 и 5 роликов. При двух готовых исходниках мой рабочий план может быть 1, 1 и 2. В календарь по факту попадёт только вышедшее.',
    label:'Мой план на первые три дня', hint:'День 1 — … обычных / … пробных. День 2 — … День 3 — …'
  },
  {
    steps:['Отмечаю в расписании отдельное время на поиск темы, подготовку и монтаж.', 'Выбираю окна, когда могу проверить публикацию после выхода.', 'Оставляю короткое вечернее окно для записи факта в календарь и подготовки следующего файла.'],
    example:'08:30 — поиск и текст. 13:00 — монтаж первого ролика. 18:30 — публикация, проверка ссылки и запись факта. На следующий день могу поменять окна под работу.',
    label:'Окна работы и публикаций', hint:'Утро — … День — … Вечер — … Запас готовлю в …'
  },
  {
    steps:['При наличии пробного режима записываю время первого показа и время следующей проверки.', 'Смотрю доступные показатели и сравниваю две отметки одного ролика. Сохраняю значения с их возрастом.', 'Принимаю одно решение: оставить пробным, показать всем или вернуться позже. Если режима нет, разбираю учебный случай.'],
    example:'Учебный случай: через 24 часа 1 400 просмотров, через 48 — 2 100. Вторая отметка выше на 700. Я записываю изменение и планирую ещё одну проверку в 72 часа.',
    label:'Моё решение по пробному ролику или учебному случаю', hint:'Результат в 24 и 48 часов | решение | следующее время проверки.'
  },
  {
    steps:['Открываю календарь, выбираю дату старта и сверяю режим.', 'Выбираю день 1 и ввожу фактические количества. Если публикаций пока не было, указываю 0.', 'Нажимаю «Отметить день», возвращаюсь в миссию и проверяю, что отметка появилась.'],
    example:'Планировал три обычных публикации, вышли две. Записываю 2 обычных и 0 пробных. В заметке сохраняю, что для третьего ролика предстоит проверить звук.',
    label:'Мой первый день в календаре', hint:'Дата старта, фактический выпуск и запас на завтра.'
  },
  {
    steps:['После паузы смотрю последнюю фактическую отметку и доступные материалы.', 'Для первого дня выбираю ближайший готовый ролик. На второй и третий дни распределяю оставшиеся задачи.', 'Продолжаю свой календарь или начинаю отдельный цикл. Предыдущие отметки остаются доступны в списке циклов.'],
    example:'Понедельник — один готовый ролик и поиск двух тем. Вторник — снять два кадра и выпустить один. Среда — проверить первые цифры и решить, готов ли я увеличить темп.',
    label:'Три дня после перерыва', hint:'День 1 | День 2 | День 3. Что подготовлю заранее?'
  },
  {
    steps:['Выбираю три ролика одного режима и один возраст для замера, например через 72 часа после публикации.', 'Для каждого записываю тему, ссылку, режим, возраст и просмотры. Добавляю охват и сохранения, если они видны.', 'Оставляю неизвестные показатели пустыми. Ноль ставлю, только если в статистике действительно указан ноль.'],
    example:'В учебном примере один ролик получил 6 000 просмотров и 48 сохранений при охвате 4 000 аккаунтов. Доля сохранений от охвата равна 48 ÷ 4 000 × 100 = 1,20%.',
    label:'Три замера статистики', hint:'Три ролика в одном возрасте и режиме показа.'
  },
  {
    steps:['Сначала проверяю, что у роликов совпадают возраст и режим. Затем выбираю один показатель для сравнения.', 'Смотрю и абсолютное число просмотров, и долю сохранений от охвата, если доступны оба числа.', 'Записываю сильную тему и три новых угла. Для каждого указываю, на какой вопрос зрителя отвечает ролик.'],
    example:'Обложка с большим охватом дала 0,50% сохранений, а ролик про размер шрифта — 1,20%. Для серии про шрифт проверю три вопроса: какой размер читается, где теряется контраст, сколько строк оставлять.',
    label:'Тема, наблюдение и три новых угла', hint:'Тема: … Подтверждение: … Следующие три вопроса: …'
  },
  {
    steps:['Проверяю статус аккаунта, доступность публикации и возраст замера.', 'Смотрю первый кадр с выключенным звуком. Прошу себя сформулировать обещание хука одним предложением.', 'Выбираю один следующий шаг. Остальные условия сохраняю похожими и записываю дату повторной проверки.'],
    example:'У нескольких роликов мало просмотров. Я вижу, что первые слова закрыты интерфейсом, и в следующей серии меняю положение хука. Отдельно фиксирую метрику и возраст замера.',
    label:'Одно наблюдение и ближайшая проверка', hint:'Что вижу | что проверил | одно изменение | когда сверю.'
  },
  {
    steps:['Превращаю наблюдение в вопрос, на который можно ответить числами.', 'Готовлю три самостоятельных публикации по близкой теме. Для серии меняю один основной элемент и записываю, что сохраню одинаковым.', 'До выхода выбираю метрику, окно измерения и дату разбора. После замера записываю решение о следующей серии.'],
    example:'Проверю, даст ли конкретный вопрос больше сохранений на тысячу охваченных аккаунтов. Выпущу три новых разбора обложек, сохраню формат и сравню их через 72 часа с предыдущей серией.',
    label:'Карточка моего эксперимента', hint:'Гипотеза | одно изменение | три публикации | метрика | окно измерения | дата решения.'
  },
  {
    steps:['Открываю выводы о темах и предстоящий эксперимент.', 'Распределяю на неделю проверенные темы, новые идеи и свои специальные публикации. На каждый день назначаю посильный объём.', 'Назначаю дату разбора. Когда нужен следующий цикл, открываю календарь и выбираю повторение второго месяца.'],
    example:'Пн — размер шрифта, ср — контраст, пт — новый разбор обложки подписчика с разрешения. В воскресенье сравню сохранения в одном возрасте и выберу тему продолжения.',
    label:'План следующей недели и дата разбора', hint:'День | тема | формат | сколько роликов. Итоги посмотрю …'
  },
  {
    steps:['Сверяю четыре результата ниже: видеобанк, опубликованный ролик, ритм и эксперимент.', 'Записываю себе короткую инструкцию на следующую неделю с местом хранения исходников и временем разбора.', 'Скачиваю ответы или открываю рюкзак. В профиле проверяю, включено ли облачное сохранение для следующего устройства.'],
    example:'В воскресенье снимаю исходники. Накануне публикации выбираю тему и хук. После выхода сохраняю ссылку, через 72 часа записываю цифры. В пятницу выбираю одно изменение для следующей серии.',
    label:'Моя рабочая памятка на неделю', hint:'Где исходники | когда готовлю | как публикую | что измеряю | когда принимаю решение.'
  }
];

const exportChecks = ['Файл длится 5–6 секунд', 'Хук виден с первого до последнего кадра', 'Телефон показывает текст целиком',
  'Звук прослушан или тишина выбрана осознанно', 'В начале и конце только нужные кадры'];
const rhythmModes = {main:'Только обычные',trial:'Только пробные',both:'Обычные и пробные'};
const metricFields = {topic:'Тема',link:'Ссылка на Reel',mode:'Режим',hours:'Возраст при замере, ч',views:'Просмотры',reach:'Охваченные аккаунты',saves:'Сохранения'};
const sampleStats = [
  {topic:'Один акцент на обложке',mode:'Обычный',hours:72,views:12000,reach:9000,saves:45},
  {topic:'Как подобрать размер шрифта',mode:'Обычный',hours:72,views:6000,reach:4000,saves:48},
  {topic:'Что меняет цвет бумаги',mode:'Обычный',hours:72,views:9000,reach:6000,saves:18}
];
const metricKey = (n, key) => 'insight_' + n + '_' + key;
const metricRows = f => [1,2,3].map(n => Object.fromEntries(Object.keys(metricFields).map(k => [k,f[metricKey(n,k)] ?? ''])));
const hasValue = v => v !== undefined && v !== null && String(v).trim() !== '';
const isCount = v => hasValue(v) && Number.isSafeInteger(Number(v)) && Number(v) >= 0;
const percent = (saves, reach) => isCount(saves) && isCount(reach) && Number(reach) > 0
  ? (Number(saves) / Number(reach) * 100).toLocaleString('ru',{minimumFractionDigits:2,maximumFractionDigits:2}) + '%' : '—';

function workshopRoute(i) {
  return block('Как я это делаю','<ol class="work-steps">' + workshop[i-18].steps.map(s => '<li>' + esc(s) + '</li>').join('') + '</ol>');
}
function workshopExample(i) {
  return '<details class="work-example"><summary>Разобрать на примере</summary><p>' + esc(workshop[i-18].example) + '</p></details>';
}
function bankForm() {
  return '<div class="work-rows">' + [1,2,3,4,5].map(n => '<fieldset><legend>Исходник ' + n + '</legend><div class="work-grid">' +
    field('bankFile'+n,'Имя видео','обложка_штамп_01') + field('bankTopic'+n,'Для какой темы','Один акцент на обложке') + '</div></fieldset>').join('') + '</div>';
}
function metricsForm() {
  return '<div class="work-rows">' + [1,2,3].map(n => {
    const key = k => metricKey(n,k);
    return '<fieldset><legend>Ролик ' + n + '</legend><div class="work-grid">' + field(key('topic'),metricFields.topic,'Как подобрать размер шрифта') +
      field(key('link'),metricFields.link,'https://www.instagram.com/reel/…','url') + select(key('mode'),metricFields.mode,['Обычный','Пробный']) +
      field(key('hours'),metricFields.hours,'72','number') + field(key('views'),metricFields.views,'0','number') +
      field(key('reach'),metricFields.reach + ' (если видно)','','number') + field(key('saves'),metricFields.saves + ' (если видно)','','number') + '</div></fieldset>';
  }).join('') + '</div>';
}
function workshopPractice(i) {
  const w = workshop[i-18], legacy = state.fields['answer_'+i];
  let html;
  if (i===18) html=bankForm();
  else if (i===27) html=exportChecks.map((s,n)=>check('exportCheck'+n,s)).join('');
  else if (i===28) html=field('publishedUrl','Ссылка на мой Reel','https://www.instagram.com/reel/…','url')+
    '<div class="work-grid">'+field('publishedDate','Дата публикации','','date')+field('publishedTime','Местное время','','time')+'</div>'+
    select('publishedMode','Как опубликован ролик',['Обычный','Пробный'])+area('publishedPlace','Где ролик виден после выхода (необязательно)','Например, в разделе Reels и основной сетке.');
  else if (i===36) html=(isReelUrl(state.fields.publishedUrl)?'<button class="secondary" data-use-release>Взять ссылку и режим из главы 5</button>':'')+metricsForm();
  else if (i===34) html='<button class="secondary" data-view="calendar">Заполнить день в календаре</button>';
  else html=area('answer_'+i,w.label,w.hint);
  if ([18,27,28,34,36].includes(i) && hasValue(legacy)) html += area('answer_'+i,'Мой ранее сохранённый результат');
  return html;
}
function workshopIssue(i) {
  const f=state.fields, old=hasValue(f['answer_'+i]);
  if (old) return null;
  if (i===18) {
    for (let n=1;n<=5;n++) for (const [prefix,label] of [['bankFile','имя файла'],['bankTopic','тему']]) {
      if (!hasValue(f[prefix+n])) return [prefix+n,'Для исходника '+n+' укажи '+label+'.'];
    }
    return null;
  }
  if (i===27) {
    const n=exportChecks.findIndex((_,n)=>!f['exportCheck'+n]);
    return n<0 ? null : ['exportCheck'+n,'Проверь файл и отметь этот пункт.'];
  }
  if (i===28) {
    if(!isReelUrl(f.publishedUrl))return ['publishedUrl','Вставь ссылку на свою публикацию в Instagram.'];
    if(!KadrState.validDate(f.publishedDate))return ['publishedDate','Укажи дату публикации.'];
    if(!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(f.publishedTime||''))return ['publishedTime','Укажи местное время публикации.'];
    return f.publishedMode?null:['publishedMode','Выбери режим публикации.'];
  }
  if (i===34) return cycles().some(id=>f['cal_'+id+'_d1_done']) ? null : ['check_34','Отметь первый день цикла в календаре. Можно указать 0 публикаций.'];
  if (i===36) {
    for (const [idx,row] of metricRows(f).entries()) {
      for (const k of ['topic','link','mode','hours','views']) {
        const ok = k==='link' ? isReelUrl(row.link) : k==='hours' ? isCount(row.hours) && +row.hours>0 : k==='views' ? isCount(row.views) : hasValue(row[k]);
        if (!ok) return [metricKey(idx+1,k),'Ролик '+(idx+1)+'. Проверь поле «'+metricFields[k]+'».'];
      }
      for (const k of ['reach','saves']) if (hasValue(row[k]) && !isCount(row[k])) return [metricKey(idx+1,k),'Укажи целое число или оставь поле пустым.'];
    }
    return null;
  }
  return ['answer_'+i,'Запиши результат практики.'];
}
function isReelUrl(value) {
  try { const u=new URL(value); return u.protocol==='https:' && /^(www\.|m\.)?instagram\.com$/.test(u.hostname) && /^\/(?:reels?|p|share\/reel)\/[\w-]+\/?$/.test(u.pathname); }
  catch { return false; }
}
function evidence(i) {
  const f=state.fields, lines=[];
  if (i===18) for (let n=1;n<=5;n++) if (f['bankFile'+n] || f['bankTopic'+n]) lines.push([f['bankFile'+n],f['bankTopic'+n]].filter(Boolean).join(' — '));
  if (i===27) exportChecks.forEach((v,n)=>{if(f['exportCheck'+n])lines.push('✓ '+v);});
  if (i===28) [f.publishedUrl,[f.publishedDate,f.publishedTime,f.publishedMode].filter(Boolean).join(' · '),f.publishedPlace].filter(Boolean).forEach(v=>lines.push(v));
  if (i===30 && f.rhythmMode) lines.push('Режим: '+f.rhythmMode);
  if (i===34) cycles().filter(id=>f['cal_'+id+'_d1_done']).forEach(id=>lines.push(f['cal_'+id+'_start']+' · обычных '+f['cal_'+id+'_d1_main']+' · пробных '+f['cal_'+id+'_d1_trial']));
  if (i===36) metricRows(f).filter(row=>Object.values(row).some(hasValue)).forEach((row,n)=>lines.push('Ролик '+(n+1)+'\n'+
    Object.entries(metricFields).filter(([k])=>hasValue(row[k])).map(([k,label])=>label+': '+row[k]).join(' · ')+'\nСохранения от охвата: '+percent(row.saves,row.reach)));
  if (hasValue(f['answer_'+i])) lines.push(f['answer_'+i]);
  return lines.join('\n');
}
const clipRoot = 'assets/practice/book-cover-';
const exampleHook = 'Почему обложку трудно прочитать с телефона?';
function clipPlayer(edited=false, trim=false) {
  const title = edited ? 'Готовый монтаж' : 'Исходник';
  const file = clipRoot + (edited ? 'edit' : 'source') + '.mp4';
  const caption = edited ? '6 секунд · участок 00:03–00:09 с хуком' : '12 секунд · учебная анимация «Сад после дождя»';
  return '<figure class="work-clip"><video controls playsinline preload="metadata" aria-label="'+title+
    '" '+(trim?'data-trim-video ':'')+'poster="'+clipRoot+(edited?'edit-poster.jpg':'poster.jpg')+'" src="'+file+'"></video><figcaption><strong>'+title+'</strong><span>'+caption+
    '</span><a href="'+file+'" download>Скачать MP4</a></figcaption></figure>';
}
function trimTool() {
  const n = Math.max(0, Math.min(6, Number(state.fields.clipStart) || 0));
  return block('Выбери шесть секунд',clipPlayer(false,true)+'<label class="field">Начало фрагмента, секунды<input type="range" min="0" max="6" step="1" data-field="clipStart" value="'+n+'"></label>'+
    '<div class="actions"><output id="trimOutput">'+n+'–'+(n+6)+' с</output><button class="secondary" data-trim-play>Проиграть отрезок</button></div>');
}
function shotPreview() {
  const text=String(state.fields.answer_25 || state.fields.m3Hook || exampleHook);
  return '<figure class="work-position"><div class="work-frame"><img src="'+clipRoot+'poster.jpg" alt="Книжная обложка на рабочем столе">'+
    '<span class="work-hook" id="positionHook">'+esc(text)+'</span><i aria-hidden="true"></i></div><figcaption>Учебная схема. Справа и внизу оставлено место для элементов Reel. Проверь свой кадр в предпросмотре Instagram.</figcaption></figure>';
}
function selectedMode() { return Object.keys(rhythmModes).find(k=>rhythmModes[k]===state.fields.rhythmMode) || 'main'; }
function firstDays() {
  const mode=selectedMode();
  return '<p>'+esc(rhythmModes[mode])+' · ориентир автора</p><div class="work-days">'+[1,2,3].map(day=>{
    const plan=calendarPlan(day,mode);
    return '<div><strong>День '+day+'</strong><span>Обычных '+plan.main+'</span><span>Пробных '+plan.trial+'</span></div>';
  }).join('')+'</div>';
}
function statsTable(rows) {
  if (!rows.some(r=>hasValue(r.topic))) return '<p>После заполнения трёх карточек здесь появится сравнение.</p>';
  const filled=rows.filter(r=>hasValue(r.topic));
  const groups=new Set(filled.map(r=>r.mode+'|'+r.hours));
  return '<div class="work-table"><table><caption>Сохранения ÷ охваченные аккаунты × 100%</caption><thead><tr>'+
    ['Тема','Показ и возраст','Просмотры','Охват','Сохранения','Доля'].map(s=>'<th scope="col">'+s+'</th>').join('')+'</tr></thead><tbody>'+
    filled.map(r=>'<tr><th scope="row">'+esc(r.topic)+'</th><td>'+esc(r.mode||'—')+' · '+esc(r.hours||'—')+' ч</td>'+
    ['views','reach','saves'].map(k=>'<td>'+(isCount(r[k])?Number(r[k]).toLocaleString('ru'):'—')+'</td>').join('')+
    '<td>'+percent(r.saves,r.reach)+'</td></tr>').join('')+'</tbody></table></div>'+
    (groups.size>1?'<p class="note">Возраст или режим различаются. Для вывода выбери замеры в одинаковых условиях.</p>':'')+
    '<p class="note">Прочерк означает, что данных для расчёта пока нет.</p>';
}
function carried(items) {
  return items.map(([label,i])=>{
    const value=evidence(i);
    return '<div class="work-carried"><strong>'+esc(label)+'</strong>'+(value?'<p>'+esc(value)+'</p>':'<p class="note">Пока не заполнено.</p>')+
      '<button class="quiet" data-lesson="'+i+'">Открыть задание</button></div>';
  }).join('');
}
const outcomeSources = [
  [['Исходники и темы',18],['Фрагменты для монтажа',22]],
  [['Пары для монтажа',23],['Результат проверки экспорта',27],['Опубликованный Reel',28]],
  [['Выбранный режим',30],['Окна публикаций',32],['Первый день календаря',34]],
  [['Видеобанк',23],['Моя публикация',28],['Ритм работы',32],['Следующий эксперимент',39]]
];
function actionLink(url,label) { return '<a href="'+url+'" target="_blank" rel="noopener noreferrer">'+label+'</a>'; }
function workshopTools(i) {
  let body='';
  if (i===18 || i===20) body+=block('Материал для тренировки',clipPlayer());
  if (i===20) body+=block('Если берёшь кадр со стока','<p>Открой условия площадки и страницу выбранного клипа. Сохрани обе ссылки вместе с именем файла.</p><div class="actions">'+
    actionLink('https://www.pexels.com/license/','Лицензия Pexels')+actionLink('https://pixabay.com/service/license-summary/','Лицензия Pixabay')+'</div>');
  if (i===22) body+=trimTool();
  if (i===23 || i===29 || i===35 || i===41) body+=block(i===41?'Мои результаты за курс':'Что уже готово',carried(outcomeSources[Math.floor(i/6)-3]));
  if (i===24) body+=block('Один исходник до и после монтажа','<div class="work-pair">'+clipPlayer()+clipPlayer(true)+'</div><p>'+actionLink('https://about.fb.com/news/2025/04/introducing-edits-streamlined-video-creation-app/','Edits на сайте Meta')+'</p>')+
    block('Моя подборка из видеобанка',carried([['Текст и выбранный кадр',23]]));
  if (i===25) body+=block('Проверь свой хук в кадре',shotPreview()+
    (hasValue(state.fields.m3Hook)?'<button class="secondary" data-use-hook>Взять мой хук из главы 3</button>':'<button class="quiet" data-lesson="13">Выбрать свой хук в главе 3</button>'));
  if (i===26) body+=block('Что сделать в Edits','<ol class="work-steps"><li>Добавь свой звук или доступную дорожку. Для разрешённого аудио из видео используй извлечение звука, если оно есть в твоей версии.</li><li>Совмести первый акцент с движением в кадре. Если есть речь, убавь фоновый звук и прослушай слова.</li><li>Экспортируй короткий тест и прослушай файл вне редактора.</li></ol>');
  if (i===27 || i===28) body+=block('Текст и проверка перед выходом','<p>В предпросмотре можно проверить хук, описание и семь пунктов готовности.</p><button class="secondary" data-open-preflight>Открыть проверку ролика</button>');
  if (i===29) body+=block('Найди свой случай',['Описание обрезалось при публикации','Загрузка зависла','После выхода пропал звук'].map((s,n)=>detail(s,[
    'Сверь последнюю строку с исходным текстом. Отредактируй описание, сохрани и снова открой публикацию.',
    'Открой профиль из другого экрана и проверь наличие ролика. Если его нет, вернись к загрузке и прочитай сообщение приложения.',
    'Прослушай локальный файл. Если звук на месте, посмотри сообщение об аудио в самой публикации и доступные варианты замены.'
  ][n])).join(''));
  if (i===30 || i===31) body+=block('Режим для моего календаря',select('rhythmMode','Доступный режим',Object.values(rhythmModes))+'<div id="firstDays">'+firstDays()+'</div>');
  if (i===30 || i===33) body+=block('Как работает пробный показ','<p>По описанию Meta, первые показатели обычно появляются примерно через 24 часа. Показ всем можно выбрать вручную. Автоматический показ, если он включён, учитывает первые 72 часа.</p><p>'+actionLink('https://about.fb.com/news/2024/12/trial-reels-try-content-non-followers-first-see-what-perfoms-best/','Объяснение Meta')+'</p>');
  if (i===32) body+=block('Мой план объёма',carried([['Первые три дня',31]]));
  if (i===34) body+=block('Мой календарь',evidence(34)?'<p class="work-result">'+esc(evidence(34))+'</p>':'<p>Здесь появится запись после отметки первого дня.</p>');
  if (i===35 || i===40) body+=block('История практики','<p>В календаре доступны все созданные циклы и фактические публикации по дням.</p><button class="secondary" data-view="calendar">Открыть календарь</button>');
  if (i===36 || i===37) body+=block('Разбор учебных чисел','<details class="work-example"><summary>Три примера в возрасте 72 часов</summary>'+statsTable(sampleStats)+'<p>Больше всего просмотров у первого ролика. У второго выше доля сохранений. Для следующей серии я выбираю показатель под свою цель.</p></details>');
  if (i===36) body+=block('Моя опубликованная работа',carried([['Ссылка из главы 5',28]]));
  if (i===37) body+=block('Мои замеры',statsTable(metricRows(state.fields))+'<button class="quiet" data-lesson="36">Редактировать три замера</button>');
  if (i===38) body+=block('Как выбрать первую проверку',detail('Показателей ещё мало','Запиши время замера и проверь те же метрики через выбранное окно. Сравни со своими роликами того же возраста.')+
    detail('Зрители смотрят, но редко сохраняют','Открой описание с телефона. Найди обещанный пример или инструкцию и проверь, легко ли к нему вернуться.')+
    detail('Зрители редко переходят в профиль','Сверь тему ролика с последними публикациями и первым экраном профиля. Запиши одно изменение для проверки.'));
  if (i===39 || i===40) body+=block('Основа следующей серии',carried(i===39?[['Моя сильная тема',37],['Ближайшая проверка',38]]:[['Мой эксперимент',39]]));
  if (i===41) body+=block('Забрать материалы','<p>Текстовый файл включает твои ответы, карточки роликов и календарь.</p><div class="actions"><button class="secondary" id="download">Скачать мои ответы</button><button class="quiet" data-view="materials">Открыть рюкзак</button></div>');
  return body;
}
function putWorkshopField(key, value) {
  const input=document.querySelector('[data-field="'+key+'"]');
  if (!input) return;
  input.value=value;input.dispatchEvent(new Event('input',{bubbles:true}));
}
document.addEventListener('input',event=>{
  const key=event.target.dataset?.field;
  if (key==='rhythmMode') { const box=document.querySelector('#firstDays'); if(box)box.innerHTML=firstDays(); }
  if (key==='clipStart') {
    const n=Number(event.target.value),video=document.querySelector('[data-trim-video]');
    document.querySelector('#trimOutput').textContent=n+'–'+(n+6)+' с';
    if(video){video.pause();trimEnd=null;if(video.readyState)video.currentTime=n;}
  }
  if(key==='answer_25'){const hook=document.querySelector('#positionHook');if(hook)hook.textContent=event.target.value||exampleHook;}
});
let trimEnd=null;
document.addEventListener('timeupdate',event=>{
  const video=event.target;
  if(video.hasAttribute?.('data-trim-video') && trimEnd!==null && video.currentTime>=trimEnd) { const end=trimEnd;trimEnd=null;video.pause();video.currentTime=end; }
},true);
document.addEventListener('click',event=>{
  const b=event.target.closest('button');
  if (!b) return;
  if (b.hasAttribute('data-trim-play')) {
    const video=document.querySelector('[data-trim-video]'), n=Number(state.fields.clipStart)||0;
    if(!video)return;
    const play=()=>{video.currentTime=n;trimEnd=n+6;video.play().catch(()=>toast('Открой плеер и нажми воспроизведение.'));};
    if(video.readyState)play();else{video.addEventListener('loadedmetadata',play,{once:true});video.load();}
  }
  if (b.hasAttribute('data-use-hook')) {
    const own=state.fields.answer_25;
    if (own && own!==state.fields.m3Hook) { toast('Поле уже заполнено. Очисти его, чтобы подставить хук из главы 3.');return; }
    putWorkshopField('answer_25',state.fields.m3Hook);
  }
  if (b.hasAttribute('data-use-release')) {
    if (state.fields.insight_1_link && state.fields.insight_1_link!==state.fields.publishedUrl) {toast('У первого ролика уже есть ссылка. Очисти поле, чтобы взять публикацию из главы 5.');return;}
    putWorkshopField('insight_1_link',state.fields.publishedUrl);
    if(!state.fields.insight_1_mode && state.fields.publishedMode)putWorkshopField('insight_1_mode',state.fields.publishedMode);
  }
  if (b.hasAttribute('data-open-preflight')) {
    if (!state.fields.flightHook) state.fields.flightHook=state.fields.answer_25||state.fields.m3Hook||'';
    if (!state.fields.flightCaption) state.fields.flightCaption=state.fields.m3Caption||'';
    persist();render('preflight');
  }
});
