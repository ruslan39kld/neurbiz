export const IMAGES = {
  photo: '/images/projects/photo1.jpg',
  hero: '/images/projects/hero.png',
  stack: '/images/projects/stack.JPG',
  vazno: '/images/projects/vazno.JPG',
  perviiMir: '/images/projects/pervii_mir.png',
  vtoriMir: '/images/projects/vtori_mir.png',
};

export const VIDEOS = {
  vibeCoding: 'https://vkvideo.ru/video-236823442_456239018',
  regulation: 'https://vkvideo.ru/video-236823442_456239017',
};

export function vkEmbedUrl(url: string): string {
  const match = url.match(/video(-?\d+)_(\d+)/);
  if (!match) return url;
  return `https://vk.com/video_ext.php?oid=${match[1]}&id=${match[2]}&hd=2`;
}

export const projects = [
  {
    id: 1, icon: '📊', category: 'Analytics', stage: 'Продакшен',
    title: 'Дашборд "Контроль удалённой работы"',
    description: 'Полный контроль трудозатрат и продуктивности команды в реальном времени',
    tags: ['Power BI', 'Power Query'],
    result: 'Контроль 100% рабочего времени в реальном времени',
    year: 2025,
    role: 'Разработчик',
    imageUrl: '/images/projects/PBI_udalenka.png',
    videoUrl: 'https://vkvideo.ru/video-236823442_456239026',
    demo_url: '',
    liveUrl: 'https://clck.ru/3SaMQs',
    detail: 'Полная реструктуризация источников данных в Power Query. Централизованный справочник сотрудников и подразделений. Модуль учёта трудозатрат: сотрудники / отделы / статусы (работа, больничный, отпуск, план). Мониторинг удалённой работы и выполнения задач. Метрики продуктивности. Контроль рабочего времени: опоздания, ранний уход, переработки после 19:00. Анализ времени открытия/закрытия задач с визуализацией по дням.',
    stats: [
      { value: '100%', label: 'контроль времени' },
      { value: '10+', label: 'отделов' },
      { value: '2025', label: 'год' }
    ]
  },
  {
    id: 2, icon: '🤖', category: 'AI/RAG', stage: 'MVP',
    title: 'Чат-бот "ЕАСУЗ | AI Консультант (44ФЗ, 223ФЗ, АРИП)"',
    description: 'Точность ответов 85–95% по базе из 4854 документов',
    tags: ['FAISS', 'BM25', 'RAG', 'Python'],
    result: 'Точность ответов 85–95% по 4854 документам',
    year: 2025,
    role: 'Разработчик',
    imageUrl: '/images/projects/ai_konsultant.png',
    videoUrl: 'https://vkvideo.ru/video-236823442_456239025',
    demo_url: '',
    liveUrl: '',
    detail: 'База знаний: 4854 документа. Гибридная система поиска: векторный FAISS + BM25. RAG-пайплайн для генерации ответов. Markdown-форматирование со ссылками на источники. Система оценки релевантности. Универсальный шаблон для аналогичных ботов.',
    stats: [
      { value: '4854', label: 'документов' },
      { value: '90%', label: 'точность' },
      { value: '2025', label: 'год' }
    ]
  },
  {
    id: 3, icon: '🔍', category: 'AI/NLP', stage: 'MVP',
    title: 'AI Поиск торгов "ЕАСУЗ | AI Поиск торгов"',
    description: 'Парсинг 3000+ объявлений, точность обработки запросов 95%',
    tags: ['Claude API', 'Yandex API', 'NLP', 'Telegram'],
    result: '3000+ объявлений, точность 95%',
    year: 2025,
    role: 'Разработчик',
    imageUrl: '/images/projects/ai_parser.png',
    videoUrl: 'https://vkvideo.ru/video-236823442_456239021',
    demo_url: '',
    liveUrl: '',
    detail: 'Автоматический парсинг 3000+ объявлений с портала ЕАСУЗ. База объектов: адреса, координаты, цены, площади, кадастровые номера. AI-парсер с NLP-обработкой. Интеллектуальный поиск с автоизвлечением параметров. Геолокация через Yandex API. Telegram-интерфейс.',
    stats: [
      { value: '3000+', label: 'объявлений' },
      { value: '95%', label: 'точность' },
      { value: '2025', label: 'год' }
    ]
  },
  {
    id: 4, icon: '🎓', category: 'EdTech/AI', stage: 'Продакшен',
    title: 'AI Инженер — Образовательная платформа по ИИ (Telegram)',
    description: '3 курса · 61 урок · 183 теста · точность 90–95%',
    tags: ['GigaChat API', 'FAISS', 'BM25', 'Python', 'Telegram Bot API'],
    result: '✅ 3 курса, 61 урок, 183 теста',
    year: 2025,
    role: 'Разработчик',
    imageUrl: '/images/projects/ai_inzhener.png',
    videoUrl: 'https://vkvideo.ru/video-236823442_456239019',
    demo_url: '',
    liveUrl: 'https://web.telegram.org/a/#8154806722',
    detail: '3 курса: «Промт-инженерия» (23 урока), «Vibe Coding» (20 уроков) и «Веб-приложения на ИИ» (18 уроков). 183 теста с автооценкой (3 теста на каждый урок). Режим «Тренажер»: AI-анализатор промптов по ПЛК-ФОТ, 10-балльная оценка. Режим «Навигатор»: 30+ нейросетей, сравнение российских и зарубежных ИИ. Режим «Консультант»: RAG-поиск, точность 90–95%. Админ-панель с выгрузкой Excel и мониторингом в реальном времени.',
    stats: [
      { value: '61', label: 'УРОКА' },
      { value: '183', label: 'ТЕСТА' },
      { value: '95%', label: 'ТОЧНОСТЬ' }
    ]
  },
  {
    id: 5, icon: '🚨', category: 'Enterprise/Deploy', stage: 'Продакшен',
    title: 'AI Центр оповещений (Система экстренного оповещения, Telegram)',
    description: 'Отправка оповещений за 3–5 сек · продакшен на Amvera',
    tags: ['React', 'TypeScript', 'FastAPI', 'Telegram Bot API', 'Amvera'],
    result: 'Отправка за 3–5 сек, продакшен на Amvera',
    year: 2026,
    role: 'Разработчик',
    imageUrl: '/images/projects/Cenrt_opov_Telegram.png',
    videoUrl: 'https://vkvideo.ru/video-236823442_456239023',
    demo_url: '',
    liveUrl: 'https://centr-opovesesnij-zaichkovv.amvera.io/',
    detail: 'Трёхзвенная архитектура: React/TypeScript + FastAPI + Telegram-бот. 4 типа тревог: пожар, учения, информирование, отбой. 5-шаговый мастер отправки. Импорт из Excel (до 500 чел.). Подтверждение получения в реальном времени. Excel-отчёты. Деплой на Amvera.',
    stats: [
      { value: '3-5 сек', label: 'отправка' },
      { value: '500', label: 'сотрудников' },
      { value: '2026', label: 'год' }
    ]
  },
  {
    id: 6, icon: '🏭', category: 'Enterprise/Deploy', stage: 'MVP',
    title: 'Цифровой двойник — Интеллектуальный помощник для HR-процессов',
    description: 'Цифровая модель предприятия с мониторингом процессов в реальном времени',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    result: 'Генерация заявлений за 60 сек, 10 шаблонов документов',
    year: 2026,
    role: 'Разработчик',
    imageUrl: '/images/projects/dwuinik.png',
    videoUrl: 'https://vkvideo.ru/video-236823442_456239024',
    demo_url: '',
    liveUrl: 'https://cifrovoj-dvojnik-zaichkovv.amvera.io',
    detail: 'Система цифровой трансформации HR-процессов. Пошаговый диалоговый интерфейс в стиле чат-бота для формирования заявлений на отпуск. Автоматическое склонение ФИО и должностей. Генерация .docx за 60 секунд. 10 шаблонов документов. История заявлений с фильтрацией.',
    stats: [
      { value: '60 сек', label: 'генерация' },
      { value: '10', label: 'шаблонов' },
      { value: '2026', label: 'год' }
    ]
  },
  {
    id: 7, icon: '🚀', category: 'Enterprise/Deploy', stage: 'Продакшен',
    title: 'RobotНик — Бот автоматизации закупочных процессов',
    description: 'Автоматизация закупок по 44-ФЗ/223-ФЗ, миграция с Telegram на VK MAX',
    tags: ['Python', 'VK MAX API', 'pandas', 'SQLite', 'Amvera'],
    result: 'Миграция с Telegram на VK MAX; обработка заявок за 3–5 сек',
    year: 2026,
    role: 'Разработчик',
    imageUrl: '/images/projects/ai_robot_nik.jpg',
    videoUrl: 'https://vkvideo.ru/video-236823442_456239031',
    demo_url: '',
    liveUrl: 'https://max.ru/hellpepperbot',
    detail: 'Интеллектуальный бот для специалистов по государственным закупкам. Полная миграция с Telegram Bot API на VK MAX. Модульная архитектура: уведомления ФАС, проверка участников, анализ заявок, PUSH по ГРБС, контроль просрочки договоров. Парсинг Excel-файлов с RTS-Tender. SQLite-база истории уведомлений.',
    stats: [
      { value: '3-5 сек', label: 'обработка' },
      { value: '2026', label: 'год' },
      { value: 'VK MAX', label: 'платформа' }
    ]
  },
  {
    id: 8, icon: '🚀', category: 'AI/ML', stage: 'Прототипы',
    title: 'BPMN Generator Pro — Автогенератор бизнес-процессов',
    description: 'AI-генерация BPMN-диаграмм из текста через GigaChat за 13 минут',
    tags: ['React', 'TypeScript', 'GigaChat API', 'bpmn.js', 'Node.js'],
    result: 'Автоматическая генерация BPMN-диаграмм из текста за 13 минут',
    year: 2026,
    role: 'Разработчик',
    imageUrl: '/images/projects/bpmn-generator_2.0_foto.png',
    videoUrl: '',
    demo_url: '',
    liveUrl: 'https://bpmn-generator-ruslan39kld.amvera.io/',
    detail: 'Инновационный прототип генератора бизнес-процессов. Анализирует текстовые описания (Word, PDF, Excel), выделяет этапы и роли, генерирует BPMN 2.0 диаграммы в draw.io XML. Система ролей, административная панель, поддержка AS-IS/TO-BE версий, экспорт в draw.io и SVG.',
    stats: [
      { value: '13 мин', label: 'генерация' },
      { value: '2026', label: 'год' },
      { value: 'BPMN 2.0', label: 'стандарт' }
    ]
  },
  {
    id: 9, icon: '🚀', category: 'Enterprise/Deploy', stage: 'Продакшен',
    title: 'AI Центр оповещений — Система экстренного оповещения (VK MAX)',
    description: 'Миграция с Telegram на VK MAX, 4 типа тревог, 500 сотрудников',
    tags: ['React', 'TypeScript', 'FastAPI', 'VK MAX API', 'Amvera'],
    result: 'Отправка за 3–5 сек; миграция с Telegram на VK MAX; деплой на Amvera',
    year: 2026,
    role: 'Разработчик',
    imageUrl: '/images/projects/ai_Cenrt_opov_max.png',
    videoUrl: 'https://vkvideo.ru/video-236823442_456239027',
    demo_url: '',
    liveUrl: '',
    detail: 'Полнофункциональная система оповещения на VK MAX. 4 типа тревог. Веб-панель из 8 разделов. Импорт до 500 сотрудников из Excel. Подтверждение в реальном времени. Excel-отчёты. Батчинг 30 сообщений/сек. Полная миграция с Telegram Bot API на VK MAX API.',
    stats: [
      { value: '3-5 сек', label: 'отправка' },
      { value: '500', label: 'сотрудников' },
      { value: '2026', label: 'год' }
    ]
  },
  {
    id: 10, icon: '🚀', category: 'AI/ML', stage: 'Прототипы',
    title: 'ProjectPro 2.0 — Профессиональная система управления проектами',
    description: 'MS Project + Power BI в браузере, AI-консультант на GigaChat',
    tags: ['React', 'TypeScript', 'Zustand', 'GigaChat API', 'Vercel'],
    result: 'Управление проектами, финансовый контроль, AI-консультант, деплой на Vercel',
    year: 2026,
    role: 'Разработчик',
    imageUrl: '/images/projects/ai_projectpro-2.0_foto111.png',
    videoUrl: 'https://vkvideo.ru/video-236823442_456239029',
    demo_url: '',
    liveUrl: 'https://projectpro-2-0.vercel.app/',
    detail: 'Профессиональная веб-система управления проектами без установки. Паспорт проекта, диаграмма Ганта с цветовой кодировкой, задачник из 12 колонок, финансовый модуль план/факт. Дашборд из 8 виджетов. AI-консультант на GigaChat: анализ рисков, рекомендации по плану.',
    stats: [
      { value: '8', label: 'виджетов' },
      { value: 'AI', label: 'консультант' },
      { value: '2026', label: 'год' }
    ]
  },
  {
    id: 11, icon: '🚀', category: 'AI/ML', stage: 'Прототипы',
    title: 'Тендерный форсаж — Интерактивная игра для конференций',
    description: 'Браузерная гонка для конференций по госзакупкам, Vibe Coding за 48 часов',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Canvas API', 'GigaChat API'],
    result: 'Разработка за 48 часов методом Vibe Coding; адаптивный дизайн для больших экранов',
    year: 2026,
    role: 'Разработчик',
    imageUrl: '/images/projects/ai_igra_gonka.png',
    videoUrl: 'https://vkvideo.ru/video-236823442_456239033',
    demo_url: '',
    liveUrl: '',
    detail: 'Тематическая браузерная гонка для презентации РЦТ на конференциях по 44-ФЗ. Создана методом Vibe Coding за 48 часов: генерация через GigaChat. Canvas API, 60 FPS анимация. Две машины: «Министерство» vs «Алгоритм-44». Система рекордов в localStorage.',
    stats: [
      { value: '48 ч', label: 'разработка' },
      { value: '60 FPS', label: 'анимация' },
      { value: '2026', label: 'год' }
    ]
  }
];

const BASE_CERT_URL = '/images/projects/';

export const certificates = [
  { id: 1, title: 'CV School: Основы создания CV проектов с помощью Vibe coding', org: 'ООО «Терра ЭйАй»', year: '2026', category: 'AI/ML', image: '', cert_url: `${BASE_CERT_URL}cert_20_CV_School.pdf` },
  { id: 2, title: 'Работа с LLM GigaChat', org: 'Корпоративный университет Сбербанка', year: '2025', category: 'AI/ML', image: '', cert_url: `${BASE_CERT_URL}cert_02_gigachat.png` },
  { id: 3, title: 'Генеративное искусство', org: 'Корпоративный университет Сбербанка', year: '2025', category: 'AI/ML', image: '', cert_url: `${BASE_CERT_URL}cert_03_generative_art.png` },
  { id: 4, title: 'Цифровая грамотность (продвинутый уровень)', org: 'ГК «РКТ»', year: '2025', category: 'AI/ML', image: '', cert_url: `${BASE_CERT_URL}cert_04_digital_literacy.pdf` },
  { id: 5, title: 'Введение в ИИ-агенты', org: 'Корпоративный университет Сбербанка', year: '2025', category: 'AI/ML', image: '', cert_url: `${BASE_CERT_URL}cert_05_ai_agents.png` },
  { id: 6, title: 'MS Project in Project Management', org: 'PMI', year: '2022', category: 'Управление', image: '', cert_url: `${BASE_CERT_URL}cert_06_ms_project.pdf` },
  { id: 7, title: 'Профессиональная клиентоцентричность', org: 'РАНХиГС', year: '2025', category: 'Управление', image: '', cert_url: `${BASE_CERT_URL}cert_07_client_centricity.png` },
  { id: 8, title: 'Project Management with Primavera P6', org: 'PMI', year: '2024', category: 'Управление', image: '', cert_url: `${BASE_CERT_URL}cert_08_primavera_p6.pdf` },
  { id: 9, title: 'Аналитик Power BI: Базовый и углублённый уровень', org: 'ООО «Нетология»', year: '2024', category: 'Аналитика', image: '', cert_url: `${BASE_CERT_URL}cert_09_power_bi.jpg` },
  { id: 10, title: 'AI Winter School', org: 'ООО «Терра ЭйАй»', year: '2026', category: 'AI/ML', image: '', cert_url: `${BASE_CERT_URL}cert_10_ai_winter_school.pdf` },
  { id: 11, title: 'Бизнес-аналитика. Финансовое моделирование', org: '', year: '2024', category: 'Аналитика', image: '', cert_url: `${BASE_CERT_URL}cert_11_ba_finance.pdf` },
  { id: 12, title: 'Бизнес-аналитика. Аналитические фреймворки и интерфейсы', org: '', year: '2024', category: 'Аналитика', image: '', cert_url: `${BASE_CERT_URL}cert_12_ba_frameworks.pdf` },
  { id: 13, title: 'Бизнес-аналитика. Основы стратегического планирования', org: '', year: '2024', category: 'Аналитика', image: '', cert_url: `${BASE_CERT_URL}cert_13_ba_strategy.pdf` },
  { id: 14, title: 'Бизнес-аналитика. Управление аналитическим проектом', org: '', year: '2024', category: 'Аналитика', image: '', cert_url: `${BASE_CERT_URL}cert_14_ba_project.pdf` },
  { id: 15, title: 'Благодарственное письмо — AI-система анализа биохимических анализов', org: 'ФГБУ «НМИЦ ТПМ» Минздрава России', year: '2024', category: 'Благодарности', image: '', cert_url: `${BASE_CERT_URL}cert_15_gratitude_nmits.jpg` },
  { id: 16, title: 'Благодарственное письмо — СИЗ и AI-мониторинг', org: 'ООО «Картика»', year: '2025', category: 'Благодарности', image: '', cert_url: `${BASE_CERT_URL}cert_16_gratitude_kartika.jpg` },
  { id: 17, title: 'Нейросети 2.0. Новый уровень', org: 'AI-CENTR', year: '2024', category: 'AI/ML', image: '', cert_url: `${BASE_CERT_URL}cert_17_neural_20.png` },
  { id: 18, title: 'Нейросети для работы и бизнеса', org: 'AI-CENTR', year: '2024', category: 'AI/ML', image: '', cert_url: `${BASE_CERT_URL}cert_18_neural_business.png` },
  { id: 19, title: 'Управление проектами в строительной сфере', org: '', year: '2023', category: 'Управление', image: '', cert_url: `${BASE_CERT_URL}cert_19_construction_pm.pdf` },
  { id: 20, title: 'AI/ML-разработчик', org: 'ООО «Терра ЭйАй» / University of Artificial Intelligence', year: '2024–2025', category: 'AI/ML', image: '', cert_url: `${BASE_CERT_URL}cert_01_aiml_developer.pdf` },
];