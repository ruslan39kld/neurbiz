import { searchKnowledge } from './ragService';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const CONSULTANT_PROMPT = `Ты — AI Консультант по промт-инжинирингу и нейросетям.
Ты часть портфолио Бельтюгова Руслана — Vibe Coding + Frontier Deployment Engineer.

Отвечаешь на основе материалов курса "Промт-инженер" (база знаний передаётся в контексте).

Правила:
- Используй КОНТЕКСТ из базы знаний если он есть и релевантен
- Если контекста нет — отвечай из общих знаний об ИИ
- Отвечай конкретно, структурированно, с примерами
- Язык: русский
- Длина ответа: 400-700 символов для простых вопросов, больше для сложных
- В конце если ответ из базы знаний — добавь: "📚 Источник: [название урока]"`;

const TRAINER_PROMPT = `Ты — тренажёр по промт-инжинирингу.
Анализируешь промпты пользователя по методологии ПЛК-ФОТ:
П — Персона (роль ИИ)
Л — Логика (что сделать)
К — Контекст (для кого, зачем)
Ф — Формат (структура результата)
О — Ограничения (объём, стиль)
Т — Тон (формальный/неформальный)

СТРОГАЯ СТРУКТУРА ОТВЕТА:
## Анализ промпта по ПЛК-ФОТ
### ✅ Что присутствует:
[элементы которые есть]
### ❌ Чего не хватает:
П — [есть ✓ / нет ✗ + пояснение]
Л — [есть ✓ / нет ✗ + пояснение]
К — [есть ✓ / нет ✗ + пояснение]
Ф — [есть ✓ / нет ✗ + пояснение]
О — [есть ✓ / нет ✗ + пояснение]
Т — [есть ✓ / нет ✗ + пояснение]
### 📊 Оценка: X/10
[1-2 предложения обоснования]
### 💡 Улучшенный промпт:
[полностью переписанный промпт со всеми элементами ПЛК-ФОТ]`;

// Читаем Claude ключ (fallback)
const getClaudeKey = (): string => {
  const variants = ['apikey_claude', 'api_key_claude', 'api_key_anthropic'];
  for (const k of variants) {
    const raw = localStorage.getItem(k) || '';
    if (!raw) continue;
    try { 
      const decoded = atob(raw);
      if (decoded.startsWith('sk-ant-')) return decoded;
      return decoded;
    } catch { 
      if (raw.startsWith('sk-ant-')) return raw;
    }
  }
  return '';
};

// Вызов GigaChat через прокси-сервер
const callGigaChat = async (
  system: string,
  messages: Message[],
  context: string
): Promise<string> => {
  const lastMsg = messages[messages.length - 1];
  const userContent = context
    ? `КОНТЕКСТ ИЗ БАЗЫ ЗНАНИЙ КУРСА:\n${context}\n\nВОПРОС:\n${lastMsg.content}`
    : lastMsg.content;

  const apiMessages = [
    ...messages.slice(0, -1).map(m => ({ role: m.role, content: m.content })),
    { role: 'user', content: userContent }
  ];

  try {
    // Получаем токен через прокси (ключ хранится на сервере)
    const tokenRes = await fetch('/api/gigachat/token', { method: 'POST' });

    if (!tokenRes.ok) {
      console.warn('GigaChat token failed, fallback to Claude');
      return callClaude(system, messages, context);
    }

    const { access_token } = await tokenRes.json();

    const chatRes = await fetch('/api/gigachat/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_token,
        model: 'GigaChat',
        messages: [
          { role: 'system', content: system },
          ...apiMessages
        ],
        max_tokens: 1500,
        temperature: 0.7
      })
    });

    if (!chatRes.ok) {
      console.warn('GigaChat chat failed, fallback to Claude');
      return callClaude(system, messages, context);
    }

    const chatData = await chatRes.json();
    return chatData.choices[0]?.message?.content || 'Пустой ответ GigaChat';

  } catch (e) {
    console.warn('GigaChat error, fallback to Claude:', e);
    return callClaude(system, messages, context);
  }
};

// Fallback на Claude
const callClaude = async (
  system: string,
  messages: Message[],
  context: string
): Promise<string> => {
  const apiKey = getClaudeKey();
  if (!apiKey) {
    return '⚠️ Настройте API ключ в Admin Panel → API Ключи.\n' +
           'Нужен GigaChat API Key или Claude API Key.';
  }

  const lastMsg = messages[messages.length - 1];
  const userContent = context
    ? `КОНТЕКСТ ИЗ БАЗЫ ЗНАНИЙ:\n${context}\n\nВОПРОС:\n${lastMsg.content}`
    : lastMsg.content;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1500,
        system,
        messages: [
          ...messages.slice(0, -1),
          { role: 'user', content: userContent }
        ]
      })
    });

    if (!res.ok) {
      const err = await res.json();
      return `❌ Ошибка API: ${err.error?.message || res.status}`;
    }

    const data = await res.json();
    return data.content[0]?.text || 'Пустой ответ';
  } catch (e) {
    return '❌ Ошибка соединения. Проверьте интернет.';
  }
};

// Экспортируемые функции
export const sendConsultantMessage = async (
  userMessage: string,
  history: Message[]
): Promise<{ text: string; hasContext: boolean }> => {
  const context = await searchKnowledge(userMessage);
  const allMessages = [...history, { role: 'user' as const, content: userMessage }];
  const text = await callGigaChat(CONSULTANT_PROMPT, allMessages, context);
  return { text, hasContext: context.length > 0 };
};

export const sendTrainerMessage = async (
  userMessage: string,
  history: Message[]
): Promise<{ text: string; hasContext: boolean }> => {
  const allMessages = [...history, { role: 'user' as const, content: userMessage }];
  const text = await callGigaChat(TRAINER_PROMPT, allMessages, '');
  return { text, hasContext: false };
};
