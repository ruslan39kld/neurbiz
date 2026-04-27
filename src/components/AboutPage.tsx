import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { IMAGES, projects as defaultProjects, certificates as defaultCertificates } from '../data';
import Counter from './Counter';
import SectionTitle from './SectionTitle';

interface AboutPageProps {
  setActiveTab?: (tab: string) => void;
}

// ─────────────────────────────────────────────────────────
// STIMIT — цвет под картинку (тёмно-синий/индиго #1E3A5F)
// с оранжевым свечением, расшифровка крупная читаемая
// ─────────────────────────────────────────────────────────
function StimitTitle({ onRegulation }: { onRegulation?: () => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

      {/* STIMIT — тёмно-синий + оранжевое свечение + чёткая тень */}
      <div style={{
        fontFamily: 'Orbitron, monospace',
        fontWeight: 900,
        fontSize: 'clamp(52px, 8vw, 96px)',
        letterSpacing: '10px',
        lineHeight: 1,
        color: '#1B3A6B',
        textShadow: `
          2px 4px 0px rgba(0,0,0,0.18),
          4px 8px 12px rgba(0,0,0,0.12),
          0 0 8px rgba(255,107,43,0.85),
          0 0 18px rgba(255,107,43,0.65),
          0 0 36px rgba(255,107,43,0.45),
          0 0 72px rgba(255,107,43,0.25)
        `,
      }}>
        {['S','T','I','M','I','T'].map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.45 }}
            style={{ display: 'inline-block' }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {/* Линия — градиент оранжевый → прозрачный */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.4, ease: 'easeOut' }}
        style={{
          height: '2px',
          background: 'linear-gradient(90deg, #FF6B2B 0%, rgba(255,107,43,0.15) 100%)',
          maxWidth: '540px',
          transformOrigin: 'left',
        }}
      />

      {/* Расшифровка — крупная, жирная, цвет под картинку
          Латинские S,T,I,M,I,T — оранжевые и крупнее
          Остальное — тёмно-синий (#1B3A6B) как буквы STIMIT */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.45 }}
        style={{
          fontFamily: 'Orbitron, monospace',
          fontWeight: 700,
          fontSize: 'clamp(14px, 2vw, 21px)',
          letterSpacing: '0.3px',
          lineHeight: 1.7,
          color: '#1B3A6B',
          maxWidth: '580px',
          textShadow: '1px 2px 6px rgba(0,0,0,0.13)',
        }}
      >
        <span style={{ color: '#FF6B2B', fontWeight: 900, fontSize: '1.2em' }}>S</span>
        <span>ис</span>
        <span style={{ color: '#FF6B2B', fontWeight: 900, fontSize: '1.2em' }}>T</span>
        <span>ема </span>
        <span style={{ color: '#FF6B2B', fontWeight: 900, fontSize: '1.2em' }}>I</span>
        <span>нтеллектуального </span>
        <span style={{ color: '#FF6B2B', fontWeight: 900, fontSize: '1.2em' }}>M</span>
        <span>одуля </span>
        <span style={{ color: '#FF6B2B', fontWeight: 900, fontSize: '1.2em' }}>I</span>
        <span>ндивидуальной </span>
        <span style={{ color: '#FF6B2B', fontWeight: 900, fontSize: '1.2em' }}>T</span>
        <span>рансформации</span>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// АРХИТЕКТУРА МОДУЛЯ — таймлайн как в резюме
// Оранжевая вертикальная линия по центру
// Карточки чередуются: слева / справа
// Каждая: небольшая картинка сверху + заголовок + описание
// ─────────────────────────────────────────────────────────
const ARCH_COLOR = '#FF6B2B'; // единый цвет сайта — оранжевый

const ARCH_STEPS = [
  {
    num: '01',
    title: 'Сбор данных',
    sub: 'База знаний · ТЗ',
    desc: 'Аудит данных заказчика, структурирование базы знаний, написание ТЗ и согласование сценариев работы системы.',
    image: IMAGES.perviiMir,
  },
  {
    num: '02',
    title: 'Прототип',
    sub: 'Первая версия · 1–3 дня',
    desc: 'Разработка первого рабочего прототипа через Vibe Coding. Базовый UI, логика, первичное тестирование.',
    image: IMAGES.vtoriMir,
  },
  {
    num: '03',
    title: 'Доработка',
    sub: 'Функционал · Тестирование',
    desc: 'Устранение ошибок, расширение функционала до полного ТЗ, оптимизация и финальное согласование.',
    image: IMAGES.stack,
  },
  {
    num: '04',
    title: 'Продакшен',
    sub: 'Деплой · Сопровождение',
    desc: 'Деплой на сервер, настройка домена и SSL, документация, обучение команды и техническая поддержка.',
    image: IMAGES.hero,
  },
];

function ArchModule({ onRegulation }: { onRegulation?: () => void }) {
  return (
    <div style={{ position: 'relative' }}>

      {/* Вертикальная оранжевая линия по центру — desktop */}
      <div className="hidden md:block" style={{
        position: 'absolute',
        left: '50%',
        top: 0,
        bottom: 0,
        width: '3px',
        background: 'linear-gradient(180deg, #FF6B2B 0%, rgba(255,107,43,0.25) 100%)',
        transform: 'translateX(-50%)',
        borderRadius: '2px',
        zIndex: 0,
      }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative', zIndex: 1 }}>
        {ARCH_STEPS.map((step, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="arch-timeline-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 48px 1fr',
                alignItems: 'center',
                gap: '0',
              }}
            >
              {/* Левая колонка */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '28px' }}>
                {isLeft ? <ArchCard step={step} /> : <div />}
              </div>

              {/* Центр — круглый маркер, всё оранжевое */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: '#FF6B2B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Orbitron, monospace',
                  fontWeight: 700,
                  fontSize: '13px',
                  color: '#fff',
                  flexShrink: 0,
                  // тень на маркере
                  boxShadow: '0 0 0 4px var(--bg-primary), 0 0 0 6px rgba(255,107,43,0.45), 0 6px 20px rgba(255,107,43,0.5)',
                }}>
                  {step.num}
                </div>
              </div>

              {/* Правая колонка */}
              <div style={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: '28px' }}>
                {!isLeft ? <ArchCard step={step} /> : <div />}
              </div>
            </motion.div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .arch-timeline-row {
            grid-template-columns: 32px 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>

      {/* Кнопка под линией — с заметной тенью */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}
      >
        <button
          onClick={onRegulation}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '16px 40px',
            background: 'transparent',
            border: '2px solid #FF6B2B',
            borderRadius: '12px',
            color: '#FF6B2B',
            fontFamily: 'Orbitron, monospace',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '1px',
            cursor: 'pointer',
            transition: 'all 0.22s ease',
            // заметная тень
            boxShadow: '0 6px 24px rgba(255,107,43,0.35), 0 2px 8px rgba(255,107,43,0.2)',
          }}
          onMouseEnter={e => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = '#FF6B2B';
            btn.style.color = '#fff';
            btn.style.boxShadow = '0 10px 32px rgba(255,107,43,0.55), 0 4px 12px rgba(255,107,43,0.3)';
            btn.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = 'transparent';
            btn.style.color = '#FF6B2B';
            btn.style.boxShadow = '0 6px 24px rgba(255,107,43,0.35), 0 2px 8px rgba(255,107,43,0.2)';
            btn.style.transform = 'translateY(0)';
          }}
        >
          <span>📋</span>
          СМОТРЕТЬ РЕГЛАМЕНТ РАБОТ
        </button>
      </motion.div>
    </div>
  );
}

// Карточка — всё в одном оранжевом цвете сайта
function ArchCard({ step }: { step: typeof ARCH_STEPS[0] }) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1.5px solid rgba(255,107,43,0.3)',
      borderTop: `3px solid ${ARCH_COLOR}`,
      borderRadius: '14px',
      overflow: 'hidden',
      width: '100%',
      maxWidth: '420px',
      // тень на карточке
      boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,107,43,0.08), 0 8px 32px rgba(255,107,43,0.08)',
      transition: 'box-shadow 0.2s, transform 0.2s',
    }}
    onMouseEnter={e => {
      const el = e.currentTarget as HTMLDivElement;
      el.style.boxShadow = '0 8px 36px rgba(0,0,0,0.12), 0 0 0 1.5px rgba(255,107,43,0.25), 0 12px 40px rgba(255,107,43,0.15)';
      el.style.transform = 'translateY(-3px)';
    }}
    onMouseLeave={e => {
      const el = e.currentTarget as HTMLDivElement;
      el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,107,43,0.08), 0 8px 32px rgba(255,107,43,0.08)';
      el.style.transform = 'translateY(0)';
    }}
    >
      {/* Картинка сверху */}
      <div style={{ height: '140px', overflow: 'hidden', position: 'relative' }}>
        <img
          src={step.image}
          alt={step.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={(e) => {
            const p = e.currentTarget.parentElement!;
            p.style.background = 'rgba(255,107,43,0.1)';
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* Оранжевая полоска снизу картинки */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #FF6B2B 0%, rgba(255,107,43,0.4) 100%)',
        }} />
      </div>

      {/* Текст */}
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <div style={{
          fontFamily: 'Orbitron, monospace',
          fontSize: '15px',
          fontWeight: 700,
          color: ARCH_COLOR,
          textShadow: '0 2px 8px rgba(255,107,43,0.25)',
        }}>
          {step.title}
        </div>
        <div style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '12px',
          color: 'var(--text-secondary)',
          fontWeight: 600,
          letterSpacing: '0.3px',
        }}>
          {step.sub}
        </div>
        <div style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '13px',
          color: 'var(--text-secondary)',
          lineHeight: 1.65,
          marginTop: '4px',
        }}>
          {step.desc}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// ГЛАВНЫЙ КОМПОНЕНТ
// ─────────────────────────────────────────────────────────
export default function AboutPage({ setActiveTab }: AboutPageProps) {
  const [certCount, setCertCount]       = useState(defaultCertificates.length);
  const [projectCount, setProjectCount] = useState(defaultProjects.length);

  useEffect(() => {
    const load = async () => {
      try {
        const [pRes, cRes] = await Promise.all([
          fetch('/data/projects.json'),
          fetch('/data/certificates.json'),
        ]);
        if (pRes.ok) { const d = await pRes.json(); if (Array.isArray(d) && d.length) setProjectCount(d.length); }
        if (cRes.ok) { const d = await cRes.json(); if (Array.isArray(d) && d.length) setCertCount(d.length); }
      } catch {
        try { const s = localStorage.getItem('portfolio_certificates'); if (s) { const p = JSON.parse(s); if (Array.isArray(p)) setCertCount(p.length); } } catch {}
        try { const s = localStorage.getItem('portfolio_projects');     if (s) { const p = JSON.parse(s); if (Array.isArray(p)) setProjectCount(p.length); } } catch {}
      }
    };
    load();
  }, []);

  const stats = [
    { num: 18,           suffix: '+', label: 'лет опыта',           icon: '⚙️' },
    { num: projectCount, suffix: '+', label: 'AI MVP в продакшене',  icon: '🚀' },
    { num: certCount,    suffix: '',  label: 'сертификатов',         icon: '📜' },
    { num: 95,           suffix: '%', label: 'точность AI-систем',   icon: '🎯' },
  ];

  return (
    <div className="px-[20px] py-[24px] md:px-[32px] md:py-[32px] lg:px-[72px] lg:py-[56px] max-w-7xl mx-auto">

      {/* ══════════════════════════════════════════
          4.1  HERO
      ══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-[28px] items-center">
        <div>
          <StimitTitle onRegulation={() => setActiveTab?.('regulation')} />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.45 }}
            className="font-dm text-[17px] text-[var(--text-secondary)] leading-[1.75] max-w-[520px] mb-4 mt-7"
          >
            Гибкая система подходов и решений, которая адаптируется под специфику вашего бизнеса.
            От анализа процессов до работающего AI-продукта — без шаблонов, без ограничений.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.0, duration: 0.45 }}
            className="font-dm text-[17px] text-[var(--text-main)] font-bold mb-7"
          >
            Результат: реальные корпоративные системы за дни вместо месяцев при точности до 95%.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.1, duration: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => setActiveTab?.('regulation')}
              className="bg-[#FF6B2B] text-white font-orbitron text-[13px] px-7 py-3 rounded-lg hover:bg-[#e55a1f] transition-colors"
            >
              Узнать больше
            </button>
            <button
              onClick={() => setActiveTab?.('contacts')}
              className="bg-transparent border-2 border-[#FF6B2B] text-[#FF6B2B] font-orbitron text-[13px] px-7 py-3 rounded-lg hover:bg-[#FF6B2B] hover:text-white transition-colors"
            >
              Связаться
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block"
        >
          <img
            src={IMAGES.hero}
            alt="STIMIT"
            loading="eager"
            className="w-full h-[420px] object-cover rounded-[20px] border-2 border-[#FF6B2B]/25 shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════
          4.2  ОПЫТ КАК ФУНДАМЕНТ
      ══════════════════════════════════════════ */}
      <div className="mt-[96px]">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionTitle>ОПЫТ КАК ФУНДАМЕНТ</SectionTitle>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: 60 }}
          viewport={{ once: true }}
          className="h-[3px] bg-[#FF6B2B] mb-3"
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-dm text-[15px] leading-[1.8] text-[var(--text-secondary)] max-w-[680px] mb-8"
        >
          STIMIT строится на пересечении реального отраслевого опыта и современных AI-технологий.
          Методология, основанная на 18 годах практики в отраслях, где нет права на ошибку —
          позволяет закрыть весь путь от постановки задачи до работающего продукта в продакшене.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[28px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="bg-[var(--bg-card)] border-2 border-[#FF6B2B]/20 border-l-[4px] border-l-[#FF6B2B] rounded-[16px] overflow-hidden hover:-translate-y-1.5 hover:border-[#FF6B2B]/50 transition-all duration-300 flex flex-col"
          >
            <img
              src={IMAGES.perviiMir}
              alt="Первый мир — реальный бизнес"
              className="w-full object-cover block"
              style={{ height: '180px', objectPosition: 'center' }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="p-5 sm:p-6 flex flex-col gap-3 flex-1">
              <h3 className="font-orbitron text-[16px] text-[#FF6B2B]">
                Первый мир — реальный бизнес
              </h3>
              <p className="font-dm text-[14px] text-[var(--text-secondary)] leading-[1.75]">
                Судостроительный завод, оборонное предприятие, производство металлоконструкций,
                крупное строительство, государственный сектор. На базе 18 лет практики сформировалось
                глубокое понимание: как думает руководитель завода, что болит у менеджера стройки,
                где теряются деньги на производстве. Именно это знание отличает STIMIT от решений,
                созданных техническими специалистами без понимания реального бизнеса.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[var(--bg-card)] border-2 border-[#4A9EFF]/25 border-l-[4px] border-l-[#4A9EFF] rounded-[16px] overflow-hidden hover:-translate-y-1.5 hover:border-[#4A9EFF]/50 transition-all duration-300 flex flex-col"
          >
            <img
              src={IMAGES.vtoriMir}
              alt="Второй мир — AI-инжиниринг"
              className="w-full object-cover block"
              style={{ height: '180px', objectPosition: 'center' }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="p-5 sm:p-6 flex flex-col gap-3 flex-1">
              <h3 className="font-orbitron text-[16px] text-[#4A9EFF]">
                Второй мир — AI-инжиниринг нового поколения
              </h3>
              <p className="font-dm text-[14px] text-[var(--text-secondary)] leading-[1.75] mb-2">
                Методология STIMIT опирается на два ключевых подхода:
              </p>
              <div className="border-l-2 border-[#4A9EFF] pl-4">
                <p className="font-dm text-[14px] font-bold text-[var(--text-main)] mb-1">Vibe Coding</p>
                <p className="font-dm text-[13px] text-[var(--text-secondary)] leading-[1.7]">
                  Стратегическое создание IT-продуктов с участием AI. Архитектура, логика, код, тест.
                  Точность 90–95%. Дни вместо недель.
                </p>
              </div>
              <div className="border-l-2 border-[#FF6B2B] pl-4">
                <p className="font-dm text-[14px] font-bold text-[var(--text-main)] mb-1">Frontier Deployment</p>
                <p className="font-dm text-[13px] text-[var(--text-secondary)] leading-[1.7]">
                  Финальный шаг — довести систему до реального продакшена, настроить инфраструктуру,
                  задеплоить, обеспечить работу с живыми пользователями.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 border-l-[4px] border-[#FF6B2B] pl-5"
        >
          <p className="font-dm text-[15px] text-[var(--text-secondary)] leading-[1.8] mb-2">
            Эта комбинация встречается редко. Обычно — либо бизнес-аналитик без технических
            компетенций, либо разработчик без понимания отрасли. STIMIT закрывает весь путь:
            от постановки задачи до работающего продукта в продакшене.
          </p>
          <p className="font-dm text-[15px] text-[var(--text-secondary)] leading-[1.8]">
            Каждая отрасль — своя специфика, свои процессы, свои требования. В любой новой сфере
            можно разобраться и выстроить эффективную систему, следуя чёткому структурированному плану.
          </p>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════
          4.3  СТАТИСТИКА
      ══════════════════════════════════════════ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-[28px] mt-[32px]">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-[var(--bg-card)] border-t-[3px] border-[#FF6B2B] rounded-[16px] p-6 text-center hover:-translate-y-1.5 hover:shadow-[var(--glow)] transition-all duration-300"
          >
            <div className="text-[32px] mb-2">{stat.icon}</div>
            <div className="font-orbitron text-[36px] font-bold text-[#FF6B2B]">
              <Counter end={stat.num} />{stat.suffix}
            </div>
            <div className="font-dm text-[13px] text-[var(--text-secondary)] mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* ══════════════════════════════════════════
          4.4  АРХИТЕКТУРА МОДУЛЯ
          Компактные карточки: слева/справа компоновка
          Без раскрытия, с кнопкой перехода в регламент
      ══════════════════════════════════════════ */}
      <div className="mt-[96px]">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionTitle>АРХИТЕКТУРА МОДУЛЯ</SectionTitle>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-dm text-[16px] text-[var(--text-secondary)] mb-8 max-w-[620px]"
        >
          От задачи заказчика до работающего продукта — четыре этапа.
        </motion.p>

        <ArchModule onRegulation={() => setActiveTab?.('regulation')} />
      </div>

      {/* ══════════════════════════════════════════
          4.5  ПОЧЕМУ ЭТО ВАЖНО
      ══════════════════════════════════════════ */}
      <div className="mt-[96px]">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionTitle>ПОЧЕМУ ЭТО ВАЖНО</SectionTitle>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[28px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[16px] p-7"
          >
            <h3 className="font-dm text-[18px] font-bold text-[var(--text-main)] mb-3">
              Проблема большинства AI-инструментов
            </h3>
            <p className="font-dm text-[15px] text-[var(--text-secondary)] leading-[1.7]">
              Большинство AI-решений создают технические специалисты, которые хорошо знают
              технологии, но слабо понимают, как работает реальное предприятие. В результате —
              красивые демо, которые не приживаются в бизнесе. No-code платформы ограничены
              шаблонами и не способны решать нестандартные задачи корпоративного уровня.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[#FF6B2B] rounded-[16px] p-7"
          >
            <h3 className="font-dm text-[18px] font-bold text-white mb-3">
              Обратный путь STIMIT
            </h3>
            <p className="font-dm text-[15px] text-white leading-[1.7]">
              Сначала — 18 лет в реальных отраслях: производство, оборонка, стройка, госсектор.
              Затем — AI-стек и методология, которая позволяет строить системы корпоративного
              уровня без команды разработчиков. Понимание бизнеса и технологии в одном решении.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[28px] mt-[28px]">
          {[
            { icon: '🎯', title: 'Понимание боли руководителя', text: 'STIMIT знает, что болит у руководителя, где теряется эффективность, какие данные нужны для решений — и автоматизирует это через AI без потери контекста.' },
            { icon: '⚡', title: 'Без потерь смысла',           text: 'Без длинной цепочки объяснений между бизнесом и разработчиком. От постановки задачи до работающего решения — напрямую, без лишних согласований.' },
            { icon: '🔄', title: 'Живая система',               text: 'Системы STIMIT развиваются вместе с организацией: дорабатываются, расширяются, адаптируются. Это не разовая автоматизация — живой инструмент роста.' },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[var(--bg-card)] border border-[#FF6B2B]/20 rounded-[16px] p-6"
            >
              <div className="text-[24px] mb-3">{card.icon}</div>
              <h3 className="font-dm text-[16px] font-bold text-[var(--text-main)] mb-2">{card.title}</h3>
              <p className="font-dm text-[14px] text-[var(--text-secondary)] leading-[1.7]">{card.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-7 border-l-[3px] border-[#FF6B2B] pl-5"
        >
          <p className="font-dm text-[15px] text-[var(--text-secondary)] leading-[1.8]">
            Бизнес не стоит на месте — меняются данные, появляются новые задачи, требования
            обновляются. Системы STIMIT не просто запускаются и забываются. Они развиваются
            вместе с организацией: дорабатываются под новые условия, расширяются под новые
            процессы, адаптируются под изменившиеся требования.
          </p>
        </motion.div>
      </div>

      {/* 4.6  КАРТИНКА VAZNO */}
      <motion.img
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        src={IMAGES.vazno}
        alt="Почему это важно"
        className="max-w-[600px] w-full h-auto rounded-[20px] block mx-auto mt-[24px] mb-4 border-2 border-[#FF6B2B]/20 shadow-[0_8px_40px_rgba(0,0,0,0.12)]"
        loading="lazy"
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
      />

      {/* ══════════════════════════════════════════
          4.7  СТЕК
      ══════════════════════════════════════════ */}
      <div className="mt-[96px]">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionTitle>СТЕК</SectionTitle>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-dm text-[17px] text-[var(--text-secondary)] mb-8"
        >
          Экосистема технологий и экспертизы — каждый модуль усиливает другой
        </motion.p>

        <div className="hidden md:block w-full">
          <svg viewBox="0 0 1400 900" width="100%" height="auto" style={{ display: 'block' }}>
            <defs>
              <filter id="sf">
                <feGaussianBlur stdDeviation="4" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <style>{`.sl{animation:dm 1.8s linear infinite}@keyframes dm{to{stroke-dashoffset:-24}}`}</style>
            <path id="perimeter"
              d="M370,150 C700,60 700,60 1030,150 L1030,450 L1030,750 C700,840 700,840 370,750 L370,450 Z"
              fill="none" stroke="rgba(255,107,43,0.35)" strokeWidth="2" strokeDasharray="8 5" className="sl"
            />
            <g stroke="#FF6B2B" strokeWidth="2.5" strokeDasharray="8 5" className="sl" fill="none">
              <path d="M400,150 C480,150 480,350 480,380"/>
              <path d="M1000,150 C920,150 920,350 920,380"/>
              <path d="M400,450 L480,450"/>
              <path d="M1000,450 L920,450"/>
              <path d="M400,750 C480,750 480,550 480,520"/>
              <path d="M1000,750 C920,750 920,550 920,520"/>
            </g>
            {[
              { dur:'2s',   begin:'0s',    path:'M400,150 C480,150 480,350 480,380' },
              { dur:'2s',   begin:'1s',    path:'M400,150 C480,150 480,350 480,380' },
              { dur:'2.3s', begin:'0s',    path:'M1000,150 C920,150 920,350 920,380' },
              { dur:'2.3s', begin:'1.15s', path:'M1000,150 C920,150 920,350 920,380' },
              { dur:'1.8s', begin:'0s',    path:'M400,450 L480,450' },
              { dur:'1.8s', begin:'0.9s',  path:'M400,450 L480,450' },
              { dur:'2.1s', begin:'0s',    path:'M1000,450 L920,450' },
              { dur:'2.1s', begin:'1.05s', path:'M1000,450 L920,450' },
              { dur:'1.9s', begin:'0s',    path:'M400,750 C480,750 480,550 480,520' },
              { dur:'1.9s', begin:'0.95s', path:'M400,750 C480,750 480,550 480,520' },
              { dur:'2.2s', begin:'0s',    path:'M1000,750 C920,750 920,550 920,520' },
              { dur:'2.2s', begin:'1.1s',  path:'M1000,750 C920,750 920,550 920,520' },
            ].map((c, i) => (
              <circle key={i} r="7" fill="#FF6B2B" filter="url(#sf)">
                <animateMotion dur={c.dur} begin={c.begin} repeatCount="indefinite" path={c.path}/>
              </circle>
            ))}
            <circle r="8" fill="#FF6B2B" filter="url(#sf)">
              <animateMotion dur="6s" repeatCount="indefinite"><mpath href="#perimeter"/></animateMotion>
            </circle>
            <circle r="6" fill="#FF6B2B" opacity="0.6" filter="url(#sf)">
              <animateMotion dur="6s" begin="3s" repeatCount="indefinite"><mpath href="#perimeter"/></animateMotion>
            </circle>
            <foreignObject x="480" y="280" width="440" height="340">
              <div style={{ width:'440px', height:'340px', borderRadius:'18px', overflow:'hidden', border:'3px solid #FF6B2B', boxShadow:'0 0 30px rgba(255,107,43,0.4)' }}>
                <img src={IMAGES.stack} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                  onError={(e) => { e.currentTarget.parentElement!.innerHTML = '<div style="width:100%;height:100%;background:#1A1A2E;color:white;display:flex;align-items:center;justify-content:center;font-family:Orbitron;font-size:24px;font-weight:bold;">⚡ AI CORE</div>'; }}
                />
              </div>
            </foreignObject>
            <rect x="480" y="280" width="440" height="340" rx="20" fill="none" stroke="#FF6B2B">
              <animate attributeName="stroke-width" values="3;30;3" dur="2.5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite"/>
            </rect>
            {[
              { x:20,   y:20,  w:380, h:260, icon:'🤖', title:'AI и ML',              tags:['GigaChat API','RAG','FAISS','BM25','NLP','LLM','Computer Vision','YOLO','векторные БД'] },
              { x:1000, y:20,  w:380, h:260, icon:'⚙️', title:'Разработка и деплой',  tags:['Python','FastAPI','React','TypeScript','Telegram Bot API','Amvera','REST API','Yandex API','локальные серверы'] },
              { x:20,   y:320, w:380, h:260, icon:'📊', title:'Аналитика и данные',   tags:['Power BI','Power Query','MS Project','Primavera P6','Excel','управленческий учёт','бюджетная аналитика','KPI-системы'] },
              { x:1000, y:320, w:380, h:260, icon:'🧭', title:'Методологии',           tags:['Vibe Coding','Frontier Deployment','Prompt Engineering','PMI','бизнес-анализ','проектное управление','оптимизация процессов'] },
              { x:20,   y:620, w:380, h:260, icon:'🏭', title:'Отраслевая экспертиза', tags:['Производство','машиностроение','судостроение','оборонный госзаказ','НИОКР','ГОЗ','дорожное строительство','госсектор','телеком'] },
              { x:1000, y:620, w:380, h:260, icon:'🔗', title:'Интеграции и API',      tags:['1C','Bitrix24','amoCRM','Webhooks','OAuth','SOAP','GraphQL','RabbitMQ','Kafka'] },
            ].map((mod, i) => (
              <foreignObject key={i} x={mod.x} y={mod.y} width={mod.w} height={mod.h}>
                <div style={{ width:'100%', height:'100%', background:'var(--bg-card)', border:'2px solid rgba(255,107,43,0.45)', borderRadius:'14px', padding:'20px', boxSizing:'border-box', display:'flex', flexDirection:'column', gap:'12px', overflow:'hidden' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px', borderBottom:'1px solid rgba(255,107,43,0.15)', paddingBottom:'12px' }}>
                    <span style={{ fontSize:'26px' }}>{mod.icon}</span>
                    <span style={{ fontFamily:'Orbitron', fontSize:'16px', fontWeight:700, color:'var(--text-main)' }}>{mod.title}</span>
                  </div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
                    {mod.tags.map((tag, j) => (
                      <span key={j} style={{ fontSize:'13px', padding:'6px 12px', borderRadius:'999px', background:'var(--bg-primary)', color:'var(--text-main)', border:'1px solid var(--border)', whiteSpace:'nowrap' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </foreignObject>
            ))}
          </svg>
        </div>

        <div className="md:hidden grid grid-cols-1 gap-[16px]">
          {[
            { icon:'🤖', title:'AI и ML',              tags:['GigaChat API','RAG','FAISS','BM25','NLP','LLM','Computer Vision','YOLO','векторные БД'] },
            { icon:'⚙️', title:'Разработка и деплой',  tags:['Python','FastAPI','React','TypeScript','Telegram Bot API','Amvera','REST API','Yandex API','локальные серверы'] },
            { icon:'📊', title:'Аналитика и данные',   tags:['Power BI','Power Query','MS Project','Primavera P6','Excel','управленческий учёт','бюджетная аналитика','KPI-системы'] },
            { icon:'🧭', title:'Методологии',           tags:['Vibe Coding','Frontier Deployment','Prompt Engineering','PMI','бизнес-анализ','проектное управление','оптимизация процессов'] },
            { icon:'🏭', title:'Отраслевая экспертиза', tags:['Производство','машиностроение','судостроение','оборонный госзаказ','НИОКР','ГОЗ','дорожное строительство','госсектор','телеком'] },
            { icon:'🔗', title:'Интеграции и API',      tags:['1C','Bitrix24','amoCRM','Webhooks','OAuth','SOAP','GraphQL','RabbitMQ','Kafka'] },
          ].map((mod, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[var(--bg-card)] border-2 border-[#FF6B2B]/40 rounded-[16px] p-4 flex flex-col gap-2.5"
            >
              <div className="flex items-center gap-2 border-b border-[#FF6B2B]/15 pb-2">
                <span className="text-[24px]">{mod.icon}</span>
                <span className="font-orbitron text-[14px] font-bold text-[var(--text-main)]">{mod.title}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {mod.tags.map((tag, j) => (
                  <span key={j} className="text-[11px] px-2 py-1 rounded-full bg-[var(--bg-primary)] text-[var(--text-main)] border border-[var(--border)] whitespace-nowrap">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          4.8  МЕТОДОЛОГИЯ
      ══════════════════════════════════════════ */}
      <div className="mt-[96px]">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionTitle>МЕТОДОЛОГИЯ</SectionTitle>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[28px]">
          {[
            { icon:'💡', title:'Vibe Coding',         text:'Стратегическое создание AI-продуктов. Архитектура → Логика → Код → Тест. Не шаблоны — полноценная разработка с участием AI. Дни вместо недель.' },
            { icon:'🔧', title:'Frontier Deployment', text:'От кода до продакшена. Инфраструктура, деплой, интеграция, мониторинг и сопровождение. Финальный шаг, который превращает MVP в работающий продукт.' },
            { icon:'⚡', title:'Vs No-Code',          text:'Не ограничен шаблонами. Полноценный код — нестандартные решения. RAG-системы, AI-агенты, сложная бизнес-логика. То, что невозможно в no-code.' },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[16px] p-7 hover:-translate-y-2 hover:shadow-[var(--glow)] transition-all duration-300"
            >
              <div className="text-[24px] mb-3">{card.icon}</div>
              <h3 className="font-dm text-[16px] font-bold text-[var(--text-main)] mb-2">{card.title}</h3>
              <p className="font-dm text-[14px] text-[var(--text-secondary)] leading-[1.7]">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
