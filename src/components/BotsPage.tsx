import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SectionTitle from './SectionTitle';
import ChatInterface from './ChatInterface';
import { Cpu, Database, Rocket, ArrowLeft } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface Bot {
  id: string;
  icon: string;
  image: string;
  name: string;
  subtitle: string;
  description: string;
  status: 'LIVE' | 'BETA';
  mode: 'consultant' | 'trainer';
  tags: string[];
  gradient: string;
}

export default function BotsPage() {
  const [selectedBotMode, setSelectedBotMode] = useState<'consultant' | 'trainer' | null>(null);

  const bots: Bot[] = [
    {
      id: 'consultant',
      icon: '🧠',
      image: '/images/projects/ai_bot1.JPG',
      name: 'AI Консультант',
      subtitle: 'по нейросетям и промт-инжинирингу',
      description: 'Знает 30+ нейросетей. Объяснит методологию ПЛК-ФОТ. Поможет выбрать инструмент под задачу.',
      status: 'LIVE',
      mode: 'consultant',
      tags: ['🤖 нейросети', '✍️ промты', '⚡ Vibe Coding'],
      gradient: 'from-green-400/20 to-blue-500/20'
    },
    {
      id: 'trainer',
      icon: '🎯',
      image: '/images/projects/ai_bot2.JPG',
      name: 'Тренажёр промтов',
      subtitle: 'оценка по методологии ПЛК-ФОТ',
      description: 'Вставь любой промт — получи оценку 0-10 по 6 критериям и улучшенную версию за 10 секунд.',
      status: 'LIVE',
      mode: 'trainer',
      tags: ['📊 оценка', '🔧 улучшение', '📝 ПЛК-ФОТ'],
      gradient: 'from-orange-400/20 to-red-500/20'
    }
  ];

  const techStack = [
    { icon: <Cpu className="text-[#FF6B2B]" size={20} />, label: 'GigaChat API' },
    { icon: <Database className="text-[#FF6B2B]" size={20} />, label: 'FAISS + BM25' },
    { icon: <Rocket className="text-[#FF6B2B]" size={20} />, label: 'Задеплоено на Amvera' }
  ];

  return (
    <div className="px-[20px] py-[24px] md:px-[32px] md:py-[32px] lg:px-[72px] lg:py-[56px] max-w-7xl mx-auto min-h-[80vh]">
      <AnimatePresence mode="wait">
        {!selectedBotMode ? (
          <motion.div
            key="bots-list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Hero Section */}
            <div className="mb-12">
              <SectionTitle>БОТЫ</SectionTitle>
              <h1 className="font-orbitron text-[24px] md:text-[32px] font-bold text-[var(--text-main)] mt-2 mb-4">
                Живые AI-инструменты из проекта AI Инженер
              </h1>
              <p className="font-dm text-[16px] md:text-[18px] text-[var(--text-secondary)] max-w-2xl leading-relaxed">
                Два рабочих бота которые я создал и задеплоил. <br className="hidden md:block" />
                Попробуйте прямо здесь — без Telegram, без регистрации.
              </p>
            </div>

            {/* Bots Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {bots.map((bot, i) => {
                const isActive = localStorage.getItem(`bot_${bot.mode}_active`) !== 'false';
                return (
                <motion.div
                  key={bot.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[32px] p-8 flex flex-col group hover:border-[#FF6B2B]/40 hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-[#FF6B2B]/5 relative overflow-hidden"
                >
                  {/* Full-width square image */}
                  <div className="w-full mb-6 overflow-hidden rounded-[8px]" style={{ aspectRatio: '1 / 1' }}>
                    <img src={bot.image} alt={bot.name} className="w-full h-full object-cover object-top" />
                  </div>

                  {/* Pulsing Badge */}
                  <div className="absolute top-6 right-6 flex items-center gap-2">
                    {isActive ? (
                      <>
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
                        </span>
                        <span className="text-[#22C55E] text-[10px] font-bold tracking-widest uppercase">
                          {bot.status}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="relative flex h-2 w-2">
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EF4444]"></span>
                        </span>
                        <span className="text-[#EF4444] text-[10px] font-bold tracking-widest uppercase">
                          OFFLINE
                        </span>
                      </>
                    )}
                  </div>

                  <div className="mb-4">
                    <h3 className="font-orbitron text-[22px] font-bold text-[var(--text-main)] leading-tight">
                      {bot.name}
                    </h3>
                    <p className="font-dm text-[12px] text-[#FF6B2B] font-medium uppercase tracking-wider mt-1">
                      {bot.subtitle}
                    </p>
                  </div>

                  <p className="font-dm text-[15px] text-[var(--text-secondary)] mb-6 leading-relaxed">
                    {bot.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {bot.tags.map(tag => (
                      <span key={tag} className="bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-secondary)] text-[12px] px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button 
                    onClick={() => {
                      trackEvent('bots', `open_${bot.mode}`);
                      setSelectedBotMode(bot.mode);
                    }}
                    className="mt-auto w-full bg-[#FF6B2B] text-white font-orbitron text-[14px] py-4 rounded-2xl hover:bg-[#e55a1f] transition-all duration-300 shadow-[0_4px_15px_rgba(232,80,10,0.2)] hover:shadow-[0_6px_20px_rgba(232,80,10,0.3)] flex items-center justify-center gap-2"
                  >
                    {bot.mode === 'consultant' ? '💬 Открыть чат' : '🎯 Открыть тренажёр'}
                  </button>
                </motion.div>
                );
              })}
            </div>

            {/* Knowledge Base Info */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[32px] p-8 mb-16 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Database size={24} />
                </div>
                <div>
                  <h3 className="font-orbitron text-[20px] font-bold text-[var(--text-main)]">
                    База знаний RAG (Supabase)
                  </h3>
                  <p className="font-dm text-[14px] text-[var(--text-secondary)]">
                    AI Консультант подключен к векторной базе данных и отвечает на основе материалов курса:
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-dm text-[14px] text-[var(--text-secondary)]">
                <div className="bg-[var(--bg-primary)] p-4 rounded-xl border border-[var(--border)]">
                  <span className="text-[#FF6B2B] font-bold mr-2">01</span>
                  Введение в нейросети
                </div>
                <div className="bg-[var(--bg-primary)] p-4 rounded-xl border border-[var(--border)]">
                  <span className="text-[#FF6B2B] font-bold mr-2">02</span>
                  Продвинутый Промт-инжиниринг
                </div>
                <div className="bg-[var(--bg-primary)] p-4 rounded-xl border border-[var(--border)]">
                  <span className="text-[#FF6B2B] font-bold mr-2">03</span>
                  Генерация изображений (Midjourney)
                </div>
                <div className="bg-[var(--bg-primary)] p-4 rounded-xl border border-[var(--border)]">
                  <span className="text-[#FF6B2B] font-bold mr-2">04</span>
                  Нейросети для аудио и видео
                </div>
                <div className="bg-[var(--bg-primary)] p-4 rounded-xl border border-[var(--border)]">
                  <span className="text-[#FF6B2B] font-bold mr-2">05</span>
                  Автоматизация и AI Агенты
                </div>
                <div className="bg-[var(--bg-primary)] p-4 rounded-xl border border-[var(--border)]">
                  <span className="text-[#FF6B2B] font-bold mr-2">06</span>
                  Российские нейросети (GigaChat, Yandex)
                </div>
              </div>
            </div>

            {/* Tech Stack Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {techStack.map((item, i) => (
                <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-4 flex items-center justify-center gap-3 shadow-sm">
                  {item.icon}
                  <span className="font-orbitron text-[12px] font-bold text-[var(--text-main)]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col"
          >
            <button 
              onClick={() => setSelectedBotMode(null)}
              className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[#FF6B2B] transition-colors mb-6 group w-fit"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-orbitron text-[14px] font-bold">Сменить бота</span>
            </button>

            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[32px] overflow-hidden shadow-2xl h-[calc(100vh-180px)] min-h-[500px] flex flex-col">
              <ChatInterface 
                botType={selectedBotMode!}
                onClose={() => setSelectedBotMode(null)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
