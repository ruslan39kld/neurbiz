import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, ExternalLink, X } from 'lucide-react';
import { sendConsultantMessage, sendTrainerMessage, Message as ApiMessage } from '../services/botService';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  timestamp: string;
  hasContext?: boolean;
}

interface ChatInterfaceProps {
  botType: 'consultant' | 'trainer';
  onClose: () => void;
}

export default function ChatInterface({ botType, onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isActive = localStorage.getItem(`bot_${botType}_active`) !== 'false';

  const getConsultantHints = () => {
    const saved = localStorage.getItem('bot_consultant_hints');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return ['Топ нейросетей для работы', 'Что такое промт-инженерия?', 'Чем GigaChat отличается от ChatGPT?', 'Как выбрать нейросеть под задачу?'];
  };

  const getTrainerHints = () => {
    const saved = localStorage.getItem('bot_trainer_hints');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return ['Напиши промпт для создания лендинга', 'Помоги написать промпт для анализа данных', 'Создай промпт для генерации изображений', 'Промпт для написания кода на Python'];
  };

  const botInfo = {
    consultant: {
      name: 'AI КОНСУЛЬТАНТ',
      icon: '🧠',
      greeting: 'Привет! Я AI Консультант по нейросетям и промт-инжинирингу. Помогу выбрать нужный инструмент, объясню методологии и отвечу на вопросы об ИИ. Что интересует?',
      hints: getConsultantHints(),
    },
    trainer: {
      name: 'ТРЕНАЖЁР ПРОМПТОВ',
      icon: '🎯',
      greeting: 'Привет! Я Тренажёр промптов. Отправь мне любой промпт — проанализирую его по методологии ПЛК-ФОТ, дам оценку от 1 до 10 и предложу улучшенную версию. Жду твой промпт!',
      hints: getTrainerHints(),
    }
  };

  const getApiKeyForChat = (): string => {
    const variants = ['apikey_gigachat', 'api_key_gigachat', 'api_key_claude', 'api_key_anthropic', 'apikey_claude'];
    for (const key of variants) {
      const saved = localStorage.getItem(key);
      if (saved) {
        try { return atob(saved); } catch { return saved; }
      }
    }
    return '';
  };

  useEffect(() => {
    const apiKey = getApiKeyForChat();
    const welcomeText = botType === 'consultant'
      ? 'Привет! Я AI Консультант по нейросетям и промт-инжинирингу. Помогу выбрать нужный инструмент, объясню методологии и отвечу на вопросы об ИИ. Что интересует?'
      : 'Привет! Я Тренажёр промптов. Отправь мне любой промпт — проанализирую по методологии ПЛК-ФОТ, дам оценку 1-10 и предложу улучшенную версию!';
      
    const statusText = apiKey 
      ? '' 
      : '\n\n⚙️ Для работы бота зайдите в Admin Panel → API Ключи → добавьте GigaChat API Key или Claude API Key';
      
    setMessages([
      {
        id: Date.now(),
        text: welcomeText + statusText,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [botType]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;
    
    setInput('');
    const newUserMessage: Message = { 
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setIsLoading(true);
    
    // Трекинг события
    const events = JSON.parse(localStorage.getItem('portfolio_analytics') || '[]');
    events.push({
      id: Date.now().toString(),
      page: 'bots',
      action: botType === 'consultant' ? 'open_consultant' : 'open_trainer',
      timestamp: Date.now(),
      device: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
    localStorage.setItem('portfolio_analytics', JSON.stringify(events));
    
    try {
      // Преобразуем историю для API
      const historyForApi: ApiMessage[] = updatedMessages.slice(0, -1).map(m => ({
        role: m.sender === 'bot' ? 'assistant' : 'user',
        content: m.text
      }));
      
      const { text: responseText, hasContext } = botType === 'consultant'
        ? await sendConsultantMessage(messageText, historyForApi)
        : await sendTrainerMessage(messageText, historyForApi);
      
      setMessages(prev => [...prev, { 
        id: Date.now(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        hasContext
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Простой парсер Markdown
  const renderMarkdown = (text: string) => {
    let html = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/## (.*?)\n/g, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
      .replace(/### (.*?)\n/g, '<h4 class="text-md font-bold mt-3 mb-1">$1</h4>')
      .replace(/- (.*?)\n/g, '<li class="ml-4 list-disc">$1</li>')
      .replace(/\n\n/g, '</p><p class="mt-2">')
      .replace(/\n/g, '<br/>');
    
    return <div dangerouslySetInnerHTML={{ __html: `<p>${html}</p>` }} />;
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] text-[var(--text-main)] font-dm rounded-[32px] overflow-hidden">
      {/* Header */}
      <div className="bg-[#1a1a2e] p-4 flex items-center justify-between text-white shadow-lg shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[20px] shadow-inner">
            {botInfo[botType].icon}
          </div>
          <div>
            <h3 className="font-orbitron text-[14px] font-semibold leading-tight uppercase tracking-wider text-white">
              {botInfo[botType].name}
            </h3>
            <span className="text-[10px] flex items-center gap-1 text-[#22C55E] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
              онлайн
            </span>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
          aria-label="Закрыть чат"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-[#F8FAFC] scrollbar-thin scrollbar-thumb-[var(--border)]">
        {!isActive ? (
          <div className="flex items-center justify-center h-full text-[var(--text-secondary)]">
            <p>Бот временно недоступен</p>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
                  <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-[14px] shadow-sm ${
                    msg.sender === 'user' ? 'bg-[#F97316] text-white' : 'bg-[#F97316] text-white'
                  }`}>
                    {msg.sender === 'user' ? <User size={16} /> : botInfo[botType].icon}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className={`p-4 rounded-2xl text-[14px] leading-relaxed shadow-sm ${
                      msg.sender === 'user' 
                        ? 'bg-[#F97316] text-white rounded-tr-none' 
                        : 'bg-white text-[#1E293B] rounded-tl-none border border-gray-100'
                    }`}>
                      {msg.sender === 'bot' ? renderMarkdown(msg.text) : msg.text}
                      {msg.hasContext && (
                        <div className="mt-3 pt-2 border-t border-gray-100 text-xs text-emerald-600 flex items-center gap-1 font-medium">
                          <span className="text-[10px]">📚</span> Ответ на основе базы знаний курса
                        </div>
                      )}
                    </div>
                    <div className={`text-[10px] opacity-50 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex max-w-[85%] flex-row gap-3">
                  <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-[14px] shadow-sm bg-[#F97316] text-white">
                    {botInfo[botType].icon}
                  </div>
                  <div className="bg-white text-[#1E293B] rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex items-center">
                    <div style={{display:'flex', gap:'4px', padding:'12px 16px'}}>
                      {[0,1,2].map(i => (
                        <div key={i} style={{
                          width:'8px', height:'8px', borderRadius:'50%',
                          background:'#F97316', opacity: 0.6,
                          animation: `bounce 1s ${i * 0.2}s infinite`
                        }}/>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Quick Hints */}
      {isActive && messages.length === 1 && !isLoading && (
        <div className="px-4 py-3 flex overflow-x-auto gap-2 bg-[#F8FAFC] scrollbar-none shrink-0 border-t border-gray-100">
          {botInfo[botType].hints.map(hint => (
            <button 
              key={hint}
              onClick={() => handleSend(hint)}
              style={{
                background: 'transparent', border: '1px solid #F97316', 
                color: '#F97316', borderRadius: '20px', padding: '6px 14px',
                fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F97316';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#F97316';
              }}
            >
              {hint}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-white shrink-0">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={isActive ? "Напишите сообщение..." : "Бот отключен"}
            disabled={!isActive || isLoading}
            style={{
              border: '1px solid #E2E8F0', borderRadius: '24px', padding: '10px 16px'
            }}
            className="flex-1 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#F97316]/50 focus:border-[#F97316] transition-all text-[#1E293B] disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button 
            onClick={() => handleSend()}
            disabled={!isActive || isLoading}
            className="w-11 h-11 rounded-full bg-[#F97316] text-white flex items-center justify-center hover:bg-[#e55a1f] transition-all shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} className="ml-1" />
          </button>
        </div>
        <div className="mt-3 flex justify-center">
          <a 
            href="https://t.me/AIEngineerPro_bot" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[11px] text-[#64748B] hover:text-[#F97316] flex items-center gap-1 transition-colors"
          >
            <ExternalLink size={10} />
            🔗 Полная версия в Telegram @AIEngineerPro_bot
          </a>
        </div>
      </div>
      
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
