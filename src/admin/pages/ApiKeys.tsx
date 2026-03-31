import React, { useState, useEffect } from 'react';
import { getSupabaseClient } from '../../services/supabaseClient';

interface KeyState {
  value: string;
  editing: boolean;
  inputValue: string;
  visible: boolean;
}

const ApiKeys: React.FC = () => {
  const [keys, setKeys] = useState<Record<string, KeyState>>({
    supabase_url: { value: '', editing: false, inputValue: '', visible: false },
    supabase_anon: { value: '', editing: false, inputValue: '', visible: false },
    gigachat: { value: '', editing: false, inputValue: '', visible: false },
    claude: { value: '', editing: false, inputValue: '', visible: false },
    telegram: { value: '', editing: false, inputValue: '', visible: false },
  });
  const [savedDates, setSavedDates] = useState<Record<string, string>>({});
  const [toast, setToast] = useState('');

  const loadFromLocalStorage = () => {
    const load = (k: string, noEncrypt?: boolean) => {
      const v = localStorage.getItem(noEncrypt ? k : `apikey_${k}`);
      if (!v) return '';
      if (noEncrypt) return v;
      try { return atob(v); } catch { return v; }
    };
    setKeys(prev => ({
      supabase_url: { ...prev.supabase_url, value: load('supabase_url', true), inputValue: load('supabase_url', true) },
      supabase_anon: { ...prev.supabase_anon, value: load('supabase_anon'), inputValue: load('supabase_anon') },
      gigachat: { ...prev.gigachat, value: load('gigachat'), inputValue: load('gigachat') },
      claude: { ...prev.claude, value: load('claude'), inputValue: load('claude') },
      telegram: { ...prev.telegram, value: load('telegram'), inputValue: load('telegram') },
    }));
    setSavedDates({
      supabase_url: localStorage.getItem('supabase_url_date') || '',
      supabase_anon: localStorage.getItem('apikey_supabase_anon_date') || '',
      gigachat: localStorage.getItem('apikey_gigachat_date') || '',
      claude: localStorage.getItem('apikey_claude_date') || '',
      telegram: localStorage.getItem('apikey_telegram_date') || '',
    });
  };

  useEffect(() => {
    // First load from localStorage (bootstrap)
    loadFromLocalStorage();

    // Then try to load from Supabase and override
    const loadFromSupabase = async () => {
      const supabase = getSupabaseClient();
      if (!supabase) return;
      const { data, error } = await supabase
        .from('api_keys')
        .select('key_name, key_value, updated_at');
      if (error || !data) return;

      const map: Record<string, { value: string; date: string }> = {};
      for (const row of data) {
        map[row.key_name] = {
          value: row.key_value || '',
          date: row.updated_at ? new Date(row.updated_at).toLocaleString('ru') : '',
        };
      }

      setKeys(prev => {
        const next = { ...prev };
        const keyMap: Record<string, string> = {
          supabase_url: 'supabase_url',
          supabase_anon: 'supabase_anon',
          gigachat: 'gigachat',
          claude: 'claude',
          telegram: 'telegram',
        };
        for (const [stateKey, supabaseKey] of Object.entries(keyMap)) {
          if (map[supabaseKey] !== undefined && map[supabaseKey].value) {
            next[stateKey] = {
              ...prev[stateKey],
              value: map[supabaseKey].value,
              inputValue: map[supabaseKey].value,
            };
          }
        }
        return next;
      });

      setSavedDates(prev => {
        const next = { ...prev };
        const keyMap: Record<string, string> = {
          supabase_url: 'supabase_url',
          supabase_anon: 'supabase_anon',
          gigachat: 'gigachat',
          claude: 'claude',
          telegram: 'telegram',
        };
        for (const [stateKey, supabaseKey] of Object.entries(keyMap)) {
          if (map[supabaseKey]?.date) {
            next[stateKey] = map[supabaseKey].date;
          }
        }
        return next;
      });
    };

    loadFromSupabase();
  }, []);

  const startEdit = (k: string) => {
    setKeys(prev => ({
      ...prev,
      [k]: { ...prev[k], editing: true, inputValue: prev[k].value }
    }));
  };

  const cancelEdit = (k: string) => {
    setKeys(prev => ({
      ...prev,
      [k]: { ...prev[k], editing: false, inputValue: prev[k].value }
    }));
  };

  const saveKey = async (k: string, noEncrypt?: boolean) => {
    const newVal = keys[k].inputValue.trim();
    if (!newVal) return;

    // Save to localStorage (bootstrap / fallback)
    const storageKey = noEncrypt ? k : `apikey_${k}`;
    localStorage.setItem(storageKey, noEncrypt ? newVal : btoa(newVal));
    const now = new Date().toLocaleString('ru');
    localStorage.setItem(`${storageKey}_date`, now);

    // Save to Supabase api_keys table
    const supabaseKeyName = k; // key names match: supabase_url, supabase_anon, gigachat, claude, telegram
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase
        .from('api_keys')
        .upsert(
          { key_name: supabaseKeyName, key_value: newVal, updated_at: new Date().toISOString() },
          { onConflict: 'key_name' }
        );
    }

    setKeys(prev => ({
      ...prev,
      [k]: { ...prev[k], value: newVal, editing: false }
    }));
    setSavedDates(prev => ({ ...prev, [k]: now }));
    setToast(`✅ Ключ сохранён!`);
    setTimeout(() => setToast(''), 3000);
  };

  const toggleVisible = (k: string) => {
    setKeys(prev => ({
      ...prev,
      [k]: { ...prev[k], visible: !prev[k].visible }
    }));
  };

  const deleteKey = async (k: string, noEncrypt?: boolean) => {
    // Remove from localStorage
    const storageKey = noEncrypt ? k : `apikey_${k}`;
    localStorage.removeItem(storageKey);
    localStorage.removeItem(`${storageKey}_date`);

    // Remove from Supabase
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase
        .from('api_keys')
        .update({ key_value: null, updated_at: new Date().toISOString() })
        .eq('key_name', k);
    }

    setKeys(prev => ({
      ...prev,
      [k]: { ...prev[k], value: '', inputValue: '', editing: false }
    }));
    setSavedDates(prev => ({ ...prev, [k]: '' }));
    setToast('🗑 Ключ удалён');
    setTimeout(() => setToast(''), 3000);
  };

  const keyConfigs = [
    {
      id: 'supabase_url',
      label: '🗄️ Supabase URL',
      hint: 'URL проекта Supabase (Project URL)',
      noEncrypt: true
    },
    {
      id: 'supabase_anon',
      label: '🔑 Supabase Anon Key',
      hint: 'Публичный ключ (Project API keys -> anon/public)'
    },
    {
      id: 'gigachat',
      label: '🔑 GigaChat API Key',
      hint: 'Получить: developers.sber.ru → GigaChat API'
    },
    {
      id: 'claude',
      label: '🔑 Claude API Key (Anthropic)',
      hint: 'Используется для ботов на /bots. Получить: console.anthropic.com → API Keys'
    },
    {
      id: 'telegram',
      label: '🔑 Telegram Bot Token',
      hint: 'Получить у @BotFather в Telegram'
    },
  ];

  const cardStyle: React.CSSProperties = {
    background: '#fff',
    border: '1px solid #E2E8F0',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '16px',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#1E293B',
    boxSizing: 'border-box',
    marginBottom: '12px',
    fontFamily: 'monospace',
  };

  const btnOrange: React.CSSProperties = {
    background: '#F97316',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '9px 18px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    marginRight: '8px',
  };

  const btnGray: React.CSSProperties = {
    background: '#F1F5F9',
    color: '#475569',
    border: 'none',
    borderRadius: '8px',
    padding: '9px 18px',
    fontSize: '14px',
    cursor: 'pointer',
    marginRight: '8px',
  };

  const btnRed: React.CSSProperties = {
    background: '#FEE2E2',
    color: '#EF4444',
    border: 'none',
    borderRadius: '8px',
    padding: '9px 18px',
    fontSize: '14px',
    cursor: 'pointer',
  };

  return (
    <div style={{ padding: '32px', background: '#F8FAFC', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1E293B', marginBottom: '8px' }}>
        🔑 API Ключи
      </h1>
      <p style={{ color: '#64748B', marginBottom: '24px' }}>
        Управление API ключами для интеграций
      </p>

      {/* Toast уведомление */}
      {toast && (
        <div style={{
          position: 'fixed', top: '24px', right: '24px',
          background: '#1E293B', color: '#fff',
          padding: '12px 20px', borderRadius: '8px',
          fontSize: '14px', zIndex: 9999,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          {toast}
        </div>
      )}

      {/* Плашка безопасности */}
      <div style={{
        background: '#F0FDF4', border: '1px solid #86EFAC',
        borderRadius: '10px', padding: '14px 18px', marginBottom: '24px'
      }}>
        <div style={{ color: '#16A34A', fontWeight: '600', marginBottom: '4px' }}>
          🔒 Безопасное хранение
        </div>
        <div style={{ color: '#15803D', fontSize: '13px' }}>
          Ключи сохраняются в Supabase (таблица api_keys) и дублируются в localStorage браузера для быстрого доступа.
        </div>
      </div>

      {keyConfigs.map(cfg => {
        const k = keys[cfg.id];
        const hasValue = !!k.value;

        return (
          <div key={cfg.id} style={cardStyle}>
            {/* Заголовок строки */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div>
                <span style={{ fontWeight: '600', fontSize: '16px', color: '#1E293B' }}>
                  {cfg.label}
                </span>
                <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>
                  {cfg.hint}
                </div>
              </div>
              <span style={{
                background: hasValue ? '#DCFCE7' : '#FEE2E2',
                color: hasValue ? '#16A34A' : '#EF4444',
                padding: '3px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600'
              }}>
                {hasValue ? '✅ Задан' : '● Не задан'}
              </span>
            </div>

            {/* Режим просмотра */}
            {!k.editing && (
              <>
                <div style={{
                  background: '#F8FAFC', border: '1px solid #E2E8F0',
                  borderRadius: '8px', padding: '10px 14px',
                  fontSize: '13px', color: '#94A3B8',
                  fontFamily: 'monospace', marginBottom: '12px',
                  letterSpacing: hasValue ? '2px' : 'normal'
                }}>
                  {hasValue
                    ? (k.visible
                        ? k.value.substring(0, 8) + '...' + k.value.substring(k.value.length - 4)
                        : '●'.repeat(32))
                    : 'Ключ не установлен'
                  }
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#94A3B8' }}>
                    Последнее обновление: {savedDates[cfg.id] || 'Нет данных'}
                  </span>
                  <div>
                    {hasValue && (
                      <button onClick={() => toggleVisible(cfg.id)} style={btnGray}>
                        {k.visible ? '🙈 Скрыть' : '👁 Показать'}
                      </button>
                    )}
                    <button onClick={() => startEdit(cfg.id)} style={btnOrange}>
                      ✏️ {hasValue ? 'Изменить' : 'Добавить'}
                    </button>
                    {hasValue && (
                      <button onClick={() => deleteKey(cfg.id, cfg.noEncrypt)} style={btnRed}>
                        🗑 Удалить
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Режим редактирования */}
            {k.editing && (
              <div style={{ marginTop: '8px' }}>
                <input
                  type="text"
                  value={k.inputValue}
                  onChange={e => setKeys(prev => ({
                    ...prev,
                    [cfg.id]: { ...prev[cfg.id], inputValue: e.target.value }
                  }))}
                  placeholder={`Вставьте ${cfg.label}...`}
                  style={inputStyle}
                  autoFocus
                  onKeyDown={e => e.key === 'Enter' && saveKey(cfg.id, cfg.noEncrypt)}
                />
                <div style={{ display: 'flex' }}>
                  <button onClick={() => saveKey(cfg.id, cfg.noEncrypt)} style={btnOrange}>
                    💾 Сохранить
                  </button>
                  <button onClick={() => cancelEdit(cfg.id)} style={btnGray}>
                    Отмена
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ApiKeys;
