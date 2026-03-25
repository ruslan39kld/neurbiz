import express from 'express';
import https from 'https';
import crypto from 'crypto';
import { config } from 'dotenv';

config();

const app = express();
const PORT = 3001;

app.use(express.json());

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (_req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

const agent = new https.Agent({ rejectUnauthorized: false });

function httpsPost(url: string, headers: Record<string, string>, body: string): Promise<{ status: number; data: unknown }> {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request(
      {
        hostname: u.hostname,
        port: u.port || 443,
        path: u.pathname + u.search,
        method: 'POST',
        headers: { ...headers, 'Content-Length': Buffer.byteLength(body) },
        agent,
      },
      (res) => {
        let raw = '';
        res.on('data', (chunk) => (raw += chunk));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode ?? 0, data: JSON.parse(raw) });
          } catch {
            resolve({ status: res.statusCode ?? 0, data: raw });
          }
        });
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// POST /api/gigachat/token — получить access_token от GigaChat OAuth
app.post('/api/gigachat/token', async (_req, res) => {
  const authKey = process.env.GIGACHAT_AUTH_KEY;
  if (!authKey) {
    return res.status(500).json({ error: 'GIGACHAT_AUTH_KEY не настроен на сервере' });
  }

  try {
    const result = await httpsPost(
      'https://ngw.devices.sberbank.ru:9443/api/v2/oauth',
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        RqUID: crypto.randomUUID(),
        Authorization: `Basic ${authKey}`,
      },
      'scope=GIGACHAT_API_PERS'
    );

    if (result.status < 200 || result.status >= 300) {
      return res.status(result.status).json({ error: 'Ошибка получения токена GigaChat', detail: result.data });
    }

    res.json(result.data);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    res.status(500).json({ error: message });
  }
});

// POST /api/gigachat/chat — проксировать запрос к GigaChat Chat API
app.post('/api/gigachat/chat', async (req, res) => {
  const { access_token, ...chatBody } = req.body as { access_token: string; [key: string]: unknown };

  if (!access_token) {
    return res.status(400).json({ error: 'access_token обязателен' });
  }

  try {
    const result = await httpsPost(
      'https://gigachat.devices.sberbank.ru/api/v1/chat/completions',
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      JSON.stringify(chatBody)
    );

    if (result.status < 200 || result.status >= 300) {
      return res.status(result.status).json({ error: 'Ошибка запроса к GigaChat', detail: result.data });
    }

    res.json(result.data);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    res.status(500).json({ error: message });
  }
});

app.listen(PORT, () => {
  console.log(`GigaChat proxy server запущен на http://localhost:${PORT}`);
});
