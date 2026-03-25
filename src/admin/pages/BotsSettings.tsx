import React, { useState } from 'react';
import { Save, Plus, X } from 'lucide-react';

export default function BotsSettings() {
  const [consultantStatus, setConsultantStatus] = useState(() => {
    const saved = localStorage.getItem('bot_consultant_active');
    return saved !== null ? saved === 'true' : true;
  });
  const [consultantPrompt, setConsultantPrompt] = useState(() => {
    return localStorage.getItem('bot_consultant_prompt') || 'Ты AI Консультант по нейросетям и промт-инжинирингу. Помогаешь выбрать нужный инструмент, объясняешь методологии и отвечаешь на вопросы об ИИ.';
  });
  const [consultantHints, setConsultantHints] = useState<string[]>(() => {
    const saved = localStorage.getItem('bot_consultant_hints');
    return saved ? JSON.parse(saved) : [
      'Топ нейросетей для работы',
      'Что такое промт-инженерия?',
      'Чем GigaChat отличается от ChatGPT?',
      'Как выбрать нейросеть под задачу?'
    ];
  });
  const [newHint, setNewHint] = useState('');

  const [trainerStatus, setTrainerStatus] = useState(() => {
    const saved = localStorage.getItem('bot_trainer_active');
    return saved !== null ? saved === 'true' : true;
  });
  const [trainerPrompt, setTrainerPrompt] = useState(() => {
    return localStorage.getItem('bot_trainer_prompt') || 'Ты Тренажёр промтов. Оцениваешь промт пользователя по 10-балльной шкале и предлагаешь улучшенную версию.';
  });
  const [trainerHints, setTrainerHints] = useState<string[]>(() => {
    const saved = localStorage.getItem('bot_trainer_hints');
    return saved ? JSON.parse(saved) : [
      'Оцени мой промт',
      'Как улучшить этот запрос?',
      'Пример идеального промта'
    ];
  });
  const [newTrainerHint, setNewTrainerHint] = useState('');

  const [savedMessage, setSavedMessage] = useState('');

  const handleSaveConsultant = () => {
    localStorage.setItem('bot_consultant_active', consultantStatus.toString());
    localStorage.setItem('bot_consultant_prompt', consultantPrompt);
    localStorage.setItem('bot_consultant_hints', JSON.stringify(consultantHints));
    
    setSavedMessage('Настройки консультанта сохранены');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleSaveTrainer = () => {
    localStorage.setItem('bot_trainer_active', trainerStatus.toString());
    localStorage.setItem('bot_trainer_prompt', trainerPrompt);
    localStorage.setItem('bot_trainer_hints', JSON.stringify(trainerHints));

    setSavedMessage('Настройки тренажёра сохранены');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const addHint = () => {
    if (newHint.trim() && !consultantHints.includes(newHint.trim())) {
      setConsultantHints([...consultantHints, newHint.trim()]);
      setNewHint('');
    }
  };

  const removeHint = (hint: string) => {
    setConsultantHints(consultantHints.filter(h => h !== hint));
  };

  const addTrainerHint = () => {
    if (newTrainerHint.trim() && !trainerHints.includes(newTrainerHint.trim())) {
      setTrainerHints([...trainerHints, newTrainerHint.trim()]);
      setNewTrainerHint('');
    }
  };

  const removeTrainerHint = (hint: string) => {
    setTrainerHints(trainerHints.filter(h => h !== hint));
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[var(--text-main)]">Настройки ботов</h1>
        {savedMessage && (
          <div className="bg-[#22C55E]/10 border border-[#22C55E] text-[#22C55E] px-4 py-2 rounded-lg text-sm flex items-center gap-2 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
            {savedMessage}
          </div>
        )}
      </div>

      {/* AI Consultant */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 p-card">
        <div className="flex justify-between items-center mb-6 border-b border-[var(--border)] pb-4">
          <h2 className="text-xl font-semibold text-[var(--text-main)] flex items-center gap-2">
            🧠 AI Консультант
          </h2>
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input type="checkbox" className="sr-only" checked={consultantStatus} onChange={() => setConsultantStatus(!consultantStatus)} />
              <div className={`block w-10 h-6 rounded-full transition-colors ${consultantStatus ? 'bg-[#22C55E]' : 'bg-[var(--border)]'}`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform shadow-sm ${consultantStatus ? 'transform translate-x-4' : ''}`}></div>
            </div>
            <div className="ml-3 text-sm font-medium text-[var(--text-secondary)]">
              {consultantStatus ? 'Вкл' : 'Выкл'}
            </div>
          </label>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Системный промпт</label>
            <textarea
              value={consultantPrompt}
              onChange={(e) => setConsultantPrompt(e.target.value)}
              className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg p-4 text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all h-32 resize-y"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Быстрые кнопки</label>
            <div className="flex flex-wrap gap-2 mb-4">
              {consultantHints.map(hint => (
                <div key={hint} className="flex items-center gap-2 bg-[var(--bg-primary)] border border-[var(--border)] rounded-full px-3 py-1.5 text-sm text-[var(--text-main)]">
                  <span>{hint}</span>
                  <button onClick={() => removeHint(hint)} className="text-[var(--text-secondary)] hover:text-[#EF4444] transition-colors">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newHint}
                onChange={(e) => setNewHint(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addHint()}
                placeholder="Новая кнопка..."
                className="flex-1 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-4 py-2 text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
              />
              <button
                onClick={addHint}
                className="bg-[var(--bg-primary)] border border-[var(--border)] hover:bg-[var(--border)] text-[var(--text-main)] px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus size={18} /> Добавить
              </button>
            </div>
          </div>

          <button
            onClick={handleSaveConsultant}
            className="bg-[var(--accent)] hover:opacity-90 text-white font-medium py-2 px-6 rounded-lg transition-all shadow-lg flex items-center gap-2"
          >
            <Save size={18} /> Сохранить
          </button>
        </div>
      </div>

      {/* Prompt Trainer */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 p-card">
        <div className="flex justify-between items-center mb-6 border-b border-[var(--border)] pb-4">
          <h2 className="text-xl font-semibold text-[var(--text-main)] flex items-center gap-2">
            🎯 Тренажёр промптов
          </h2>
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input type="checkbox" className="sr-only" checked={trainerStatus} onChange={() => setTrainerStatus(!trainerStatus)} />
              <div className={`block w-10 h-6 rounded-full transition-colors ${trainerStatus ? 'bg-[#22C55E]' : 'bg-[var(--border)]'}`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform shadow-sm ${trainerStatus ? 'transform translate-x-4' : ''}`}></div>
            </div>
            <div className="ml-3 text-sm font-medium text-[var(--text-secondary)]">
              {trainerStatus ? 'Вкл' : 'Выкл'}
            </div>
          </label>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Системный промпт</label>
            <textarea
              value={trainerPrompt}
              onChange={(e) => setTrainerPrompt(e.target.value)}
              className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg p-4 text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all h-32 resize-y"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Быстрые кнопки</label>
            <div className="flex flex-wrap gap-2 mb-4">
              {trainerHints.map(hint => (
                <div key={hint} className="flex items-center gap-2 bg-[var(--bg-primary)] border border-[var(--border)] rounded-full px-3 py-1.5 text-sm text-[var(--text-main)]">
                  <span>{hint}</span>
                  <button onClick={() => removeTrainerHint(hint)} className="text-[var(--text-secondary)] hover:text-[#EF4444] transition-colors">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTrainerHint}
                onChange={(e) => setNewTrainerHint(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTrainerHint()}
                placeholder="Новая кнопка..."
                className="flex-1 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-4 py-2 text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
              />
              <button
                onClick={addTrainerHint}
                className="bg-[var(--bg-primary)] border border-[var(--border)] hover:bg-[var(--border)] text-[var(--text-main)] px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus size={18} /> Добавить
              </button>
            </div>
          </div>

          <button
            onClick={handleSaveTrainer}
            className="bg-[var(--accent)] hover:opacity-90 text-white font-medium py-2 px-6 rounded-lg transition-all shadow-lg flex items-center gap-2"
          >
            <Save size={18} /> Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
