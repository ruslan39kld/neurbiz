import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { IMAGES, VIDEOS, vkEmbedUrl, projects as defaultProjects, certificates as defaultCertificates } from '../data';
import Counter from './Counter';
import SectionTitle from './SectionTitle';

interface AboutPageProps {
  setActiveTab?: (tab: string) => void;
}

export default function AboutPage({ setActiveTab }: AboutPageProps) {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [certCount, setCertCount] = useState(defaultCertificates.length);
  const [projectCount, setProjectCount] = useState(defaultProjects.length);

  useEffect(() => {
    const updateCounts = () => {
      const savedCerts = localStorage.getItem('portfolio_certificates');
      if (savedCerts) {
        try {
          const parsed = JSON.parse(savedCerts);
          if (Array.isArray(parsed)) setCertCount(parsed.length);
        } catch (e) {
          console.error('Failed to parse certificates from localStorage', e);
        }
      }

      const savedProjects = localStorage.getItem('portfolio_projects');
      if (savedProjects) {
        try {
          const parsed = JSON.parse(savedProjects);
          if (Array.isArray(parsed)) setProjectCount(parsed.length);
        } catch (e) {
          console.error('Failed to parse projects from localStorage', e);
        }
      }
    };

    updateCounts();
    window.addEventListener('storage', updateCounts);
    window.addEventListener('focus', updateCounts);

    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setVideoModalOpen(false); };
    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
      window.removeEventListener('storage', updateCounts);
      window.removeEventListener('focus', updateCounts);
    };
  }, []);

  const stats = [
    { num: 18, suffix: '+', label: 'лет опыта', icon: '⚙️' },
    { num: projectCount, suffix: '+', label: 'AI MVP в продакшене', icon: '🚀' },
    { num: certCount, suffix: '', label: 'сертификатов', icon: '📜' },
    { num: 95, suffix: '%', label: 'точность AI-систем', icon: '🎯' },
  ];

  return (
    <div className="px-[20px] py-[24px] md:px-[32px] md:py-[32px] lg:px-[72px] lg:py-[56px] max-w-7xl mx-auto">
      {/* 4.1 HERO БЛОК */}
      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-[28px] items-center">
        <div>
          <h1 className="font-orbitron text-[26px] sm:text-[32px] lg:text-[46px] font-bold text-[var(--text-main)] leading-tight"
              style={{ textShadow: '0 0 7px rgba(255,107,43,0.8), 0 0 15px rgba(255,107,43,0.6), 0 0 30px rgba(255,107,43,0.4), 0 0 60px rgba(255,107,43,0.2)' }}>
            {['VIBE', 'CODING', '+', 'FRONTIER', 'DEPLOYMENT', 'ENGINEER'].map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="inline-block mr-3 mb-2"
              >
                {word}
              </motion.span>
            ))}
          </h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{
              fontSize: '14px',
              fontFamily: 'Orbitron, monospace',
              fontWeight: 700,
              letterSpacing: '1.5px',
              padding: '10px 20px',
              background: 'rgba(255,107,43,0.15)',
              border: '1.5px solid rgba(255,107,43,0.6)',
              color: '#FF6B2B',
              borderRadius: '8px',
              display: 'inline-block',
              margin: '18px 0'
            }}
          >
            №1 ИНСТРУМЕНТ ЦИФРОВОЙ ТРАНСФОРМАЦИИ
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="font-dm text-[17px] text-[var(--text-secondary)] leading-[1.7] max-w-[520px] mb-4"
          >
            Методология, которая позволяет строить AI-системы корпоративного уровня без команды разработчиков — от архитектуры до продакшена.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="font-dm text-[17px] text-[var(--text-main)] font-bold"
          >
            Результат: сложные системы за дни вместо месяцев при качестве 95%.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-wrap gap-4 mt-7"
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
            alt="Hero"
            loading="eager"
            className="w-full h-[420px] object-cover rounded-[20px] border-2 border-[#FF6B2B]/25 shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display='none'; }}
          />
        </motion.div>
      </div>

      {/* 4.2 КТО Я */}
      <div className="mt-[96px]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionTitle>КТО Я</SectionTitle>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: 60 }}
          viewport={{ once: true }}
          className="h-[3px] bg-[#FF6B2B] mb-2"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-dm text-[15px] leading-[1.8] text-[var(--text-secondary)] max-w-[680px] mb-8"
        >
          Я работаю на пересечении двух миров, которые редко встречаются в одном человеке. Эта уникальная комбинация позволяет закрыть весь путь — от постановки задачи до работающего продукта в продакшене.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[28px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="bg-[var(--bg-card)] border-2 border-[#FF6B2B]/20 border-l-[4px] border-l-[#FF6B2B] rounded-[16px] overflow-hidden hover:-translate-y-1.5 hover:border-[#FF6B2B]/50 transition-all duration-300 p-card"
          >
            <img 
              src={IMAGES.perviiMir} 
              alt="Первый мир"
              className="w-full h-[200px] object-cover block"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display='none'; }}
            />
            <div className="p-6 sm:p-7">
              <h3 className="font-orbitron text-[17px] text-[#FF6B2B] mb-3">Первый мир — реальный бизнес</h3>
              <p className="font-dm text-[15px] text-[var(--text-secondary)] leading-[1.8]">
                Судостроительный завод, оборонное предприятие, производство металлоконструкций, крупное строительство, государственный сектор. 18 лет я выстраивал процессы, внедрял планирование, убирал хаос в операционной деятельности — в отраслях, где нет права на ошибку. Я знаю как думает руководитель завода, что болит у менеджера стройки, где теряются деньги на производстве.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[var(--bg-card)] border-2 border-[#4A9EFF]/25 border-l-[4px] border-l-[#4A9EFF] rounded-[16px] overflow-hidden hover:-translate-y-1.5 hover:border-[#4A9EFF]/50 transition-all duration-300 p-card"
          >
            <img 
              src={IMAGES.vtoriMir} 
              alt="Второй мир"
              className="w-full h-[200px] object-cover block"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display='none'; }}
            />
            <div className="p-6 sm:p-7">
              <h3 className="font-orbitron text-[17px] text-[#4A9EFF] mb-3">Второй мир — AI-инжиниринг нового поколения</h3>
              <p className="font-dm text-[15px] text-[var(--text-secondary)] leading-[1.8]">
                Методология Vibe Coding позволяет проектировать и строить сложные IT-продукты совместно с искусственным интеллектом — не прототипы, не демо, а работающие системы с точностью 90–95%. Frontier Deployment — это финальный шаг, который большинство пропускает: довести систему до реального продакшена, настроить инфраструктуру, задеплоить, обеспечить работу с живыми пользователями.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-7 border-l-[4px] border-[#FF6B2B] pl-5"
        >
          <p className="font-dm text-[15px] text-[var(--text-secondary)] leading-[1.8] mb-4">
            Эта комбинация встречается редко. Обычно либо бизнес-аналитик без технических компетенций, либо разработчик без понимания отрасли. Я закрываю весь путь — от постановки задачи до работающего продукта в продакшене.
          </p>
          <p className="font-dm text-[15px] text-[var(--text-secondary)] leading-[1.8]">
            Главный вывод: каждая сфера — своя специфика, свои процессы, свои требования. В любой новой отрасли можно разобраться и выстроить эффективную систему, если следовать чёткому структурированному плану.
          </p>
        </motion.div>
      </div>

      {/* 4.3 СТАТИСТИКА */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-[28px] mt-[32px]">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-[var(--bg-card)] border-t-[3px] border-[#FF6B2B] rounded-[16px] p-6 text-center hover:-translate-y-1.5 hover:shadow-[var(--glow)] transition-all duration-300 p-stat"
          >
            <div className="text-[32px] mb-2">{stat.icon}</div>
            <div className="font-orbitron text-[36px] font-bold text-[#FF6B2B]">
              <Counter end={stat.num} />{stat.suffix}
            </div>
            <div className="font-dm text-[13px] text-[var(--text-secondary)] mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* 4.4 ВИДЕО VIBE CODING */}
      <div className="mt-[96px]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionTitle>VIBE CODING В ДЕЙСТВИИ</SectionTitle>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-dm text-[16px] text-[var(--text-secondary)] mb-8"
        >
          Смотри как строятся AI-системы корпоративного уровня — от идеи до продакшена за дни.
        </motion.p>

        <div className="block">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-0 overflow-hidden rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] max-w-[640px] mx-auto"
            style={{ paddingBottom: 'calc(640px * 9 / 16)', maxHeight: '360px', aspectRatio: '16/9' }}
          >
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={vkEmbedUrl(VIDEOS.vibeCoding)}
              frameBorder="0"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
        </div>
      </div>

      {/* 4.5 ПОЧЕМУ ЭТО ВАЖНО */}
      <div className="mt-[96px]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionTitle>ПОЧЕМУ ЭТО ВАЖНО</SectionTitle>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[28px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[16px] p-7 p-card"
          >
            <h3 className="font-dm text-[18px] font-bold text-[var(--text-main)] mb-3">Проблема большинства AI-инструментов</h3>
            <p className="font-dm text-[15px] text-[var(--text-secondary)] leading-[1.7]">
              Большинство AI-инструментов создаются людьми, которые хорошо знают технологии, но слабо понимают как работает реальное предприятие. В результате — красивые демо, которые не приживаются в бизнесе.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[#FF6B2B] rounded-[16px] p-7 p-card-accent"
          >
            <h3 className="font-dm text-[18px] font-bold text-[#FFFFFF] mb-3">Мой обратный путь</h3>
            <p className="font-dm text-[15px] text-[#FFFFFF] leading-[1.7]">
              Сначала 18 лет в реальных отраслях — производство, оборонка, стройка, госсектор. Потом — AI-стек и методология, которая позволяет строить системы корпоративного уровня без команды разработчиков.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[28px] mt-[28px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[var(--bg-card)] border border-[#FF6B2B]/20 rounded-[16px] p-6 p-card"
          >
            <div className="text-[24px] mb-3">🎯</div>
            <h3 className="font-dm text-[16px] font-bold text-[var(--text-main)] mb-2">Понимание боли руководителя</h3>
            <p className="font-dm text-[14px] text-[var(--text-secondary)] leading-[1.7]">
              Я знаю, что болит у руководителя, где теряется эффективность, какие данные нужны для решений — и могу сразу автоматизировать через AI.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[var(--bg-card)] border border-[#FF6B2B]/20 rounded-[16px] p-6 p-card"
          >
            <div className="text-[24px] mb-3">⚡</div>
            <h3 className="font-dm text-[16px] font-bold text-[var(--text-main)] mb-2">Без потерь смысла</h3>
            <p className="font-dm text-[14px] text-[var(--text-secondary)] leading-[1.7]">
              Без длинной цепочки объяснений между бизнесом и разработчиком. Без потери смысла на каждом этапе согласований.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[var(--bg-card)] border border-[#FF6B2B]/20 rounded-[16px] p-6 p-card"
          >
            <div className="text-[24px] mb-3">🔄</div>
            <h3 className="font-dm text-[16px] font-bold text-[var(--text-main)] mb-2">Живая система</h3>
            <p className="font-dm text-[14px] text-[var(--text-secondary)] leading-[1.7]">
              Системы развиваются вместе с организацией: дорабатываются под новые условия, расширяются, адаптируются. Это не разовая автоматизация.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-7 border-l-[3px] border-[#FF6B2B] pl-5"
        >
          <p className="font-dm text-[15px] text-[var(--text-secondary)] leading-[1.8]">
            Бизнес не стоит на месте — меняются данные, появляются новые задачи, требования обновляются. Поэтому созданные системы не просто запускаются и забываются. Они развиваются вместе с организацией: дорабатываются под новые условия, расширяются под новые процессы, адаптируются под изменившиеся требования. Это не разовая автоматизация — это живой инструмент, который подстраивается под бизнес на каждом этапе его развития.
          </p>
        </motion.div>
      </div>

      {/* 4.6 КАРТИНКА VAZNO */}
      <motion.img 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        src={IMAGES.vazno} 
        alt="Почему это важно"
        className="max-w-[600px] w-full h-auto rounded-[20px] block mx-auto mt-[24px] mb-4 border-2 border-[#FF6B2B]/20 shadow-[0_8px_40px_rgba(0,0,0,0.12)]"
        loading="lazy"
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display='none'; }}
      />

      {/* 4.7 СТЕК */}
      <div className="mt-[96px]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionTitle>СТЕК</SectionTitle>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-dm text-[17px] text-[var(--text-secondary)] mb-8"
        >
          Экосистема технологий и экспертизы — каждый модуль усиливает другой
        </motion.p>

        {/* Desktop SVG */}
        <div className="hidden md:block w-full">
          <svg viewBox="0 0 1400 900" width="100%" height="auto" style={{display:'block'}}>
            <defs>
              <filter id="sf">
                <feGaussianBlur stdDeviation="4" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <style>{`
              .sl { animation: dm 1.8s linear infinite; }
              @keyframes dm { to { stroke-dashoffset: -24; } }
            `}</style>

            {/* Замкнутый периметральный путь */}
            <path id="perimeter"
              d="M370,150 C700,60 700,60 1030,150
                 L1030,450
                 L1030,750 C700,840 700,840 370,750
                 L370,450
                 Z"
              fill="none"
              stroke="rgba(255,107,43,0.35)"
              strokeWidth="2"
              strokeDasharray="8 5"
              className="sl"
            />

            {/* Линии от модулей к центру */}
            <g stroke="#FF6B2B" strokeWidth="2.5" strokeDasharray="8 5" className="sl" fill="none">
              <path d="M400,150 C480,150 480,350 480,380"/>
              <path d="M1000,150 C920,150 920,350 920,380"/>
              <path d="M400,450 L480,450"/>
              <path d="M1000,450 L920,450"/>
              <path d="M400,750 C480,750 480,550 480,520"/>
              <path d="M1000,750 C920,750 920,550 920,520"/>
            </g>

            {/* Анимированные точки от модулей к центру */}
            <circle r="7" fill="#FF6B2B" filter="url(#sf)">
              <animateMotion dur="2s" repeatCount="indefinite" path="M400,150 C480,150 480,350 480,380"/>
            </circle>
            <circle r="7" fill="#FF6B2B" filter="url(#sf)">
              <animateMotion dur="2s" begin="1s" repeatCount="indefinite" path="M400,150 C480,150 480,350 480,380"/>
            </circle>
            <circle r="7" fill="#FF6B2B" filter="url(#sf)">
              <animateMotion dur="2.3s" repeatCount="indefinite" path="M1000,150 C920,150 920,350 920,380"/>
            </circle>
            <circle r="7" fill="#FF6B2B" filter="url(#sf)">
              <animateMotion dur="2.3s" begin="1.15s" repeatCount="indefinite" path="M1000,150 C920,150 920,350 920,380"/>
            </circle>
            <circle r="7" fill="#FF6B2B" filter="url(#sf)">
              <animateMotion dur="1.8s" repeatCount="indefinite" path="M400,450 L480,450"/>
            </circle>
            <circle r="7" fill="#FF6B2B" filter="url(#sf)">
              <animateMotion dur="1.8s" begin="0.9s" repeatCount="indefinite" path="M400,450 L480,450"/>
            </circle>
            <circle r="7" fill="#FF6B2B" filter="url(#sf)">
              <animateMotion dur="2.1s" repeatCount="indefinite" path="M1000,450 L920,450"/>
            </circle>
            <circle r="7" fill="#FF6B2B" filter="url(#sf)">
              <animateMotion dur="2.1s" begin="1.05s" repeatCount="indefinite" path="M1000,450 L920,450"/>
            </circle>
            <circle r="7" fill="#FF6B2B" filter="url(#sf)">
              <animateMotion dur="1.9s" repeatCount="indefinite" path="M400,750 C480,750 480,550 480,520"/>
            </circle>
            <circle r="7" fill="#FF6B2B" filter="url(#sf)">
              <animateMotion dur="1.9s" begin="0.95s" repeatCount="indefinite" path="M400,750 C480,750 480,550 480,520"/>
            </circle>
            <circle r="7" fill="#FF6B2B" filter="url(#sf)">
              <animateMotion dur="2.2s" repeatCount="indefinite" path="M1000,750 C920,750 920,550 920,520"/>
            </circle>
            <circle r="7" fill="#FF6B2B" filter="url(#sf)">
              <animateMotion dur="2.2s" begin="1.1s" repeatCount="indefinite" path="M1000,750 C920,750 920,550 920,520"/>
            </circle>

            {/* Анимированные точки по периметру */}
            <circle r="8" fill="#FF6B2B" filter="url(#sf)">
              <animateMotion dur="6s" repeatCount="indefinite">
                <mpath href="#perimeter"/>
              </animateMotion>
            </circle>
            <circle r="6" fill="#FF6B2B" opacity="0.6" filter="url(#sf)">
              <animateMotion dur="6s" begin="3s" repeatCount="indefinite">
                <mpath href="#perimeter"/>
              </animateMotion>
            </circle>

            {/* Центральное ядро */}
            <foreignObject x="480" y="280" width="440" height="340">
              <div style={{width:'440px', height:'340px', borderRadius:'18px', overflow:'hidden', border:'3px solid #FF6B2B', boxShadow:'0 0 30px rgba(255,107,43,0.4)'}}>
                <img src={IMAGES.stack} style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}}
                     onError={(e) => { e.currentTarget.parentElement!.innerHTML = '<div style="width:100%;height:100%;background:#1A1A2E;color:white;display:flex;align-items:center;justify-content:center;font-family:Orbitron;font-size:24px;font-weight:bold;">⚡ AI CORE</div>'; }}
                />
              </div>
            </foreignObject>
            <rect x="480" y="280" width="440" height="340" rx="20" fill="none" stroke="#FF6B2B">
              <animate attributeName="stroke-width" values="3;30;3" dur="2.5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite"/>
            </rect>

            {/* Модули */}
            {[
              { x: 20, y: 20, width: 380, height: 260, icon: '🤖', title: 'AI и ML', tags: ['GigaChat API', 'RAG', 'FAISS', 'BM25', 'NLP', 'LLM', 'Computer Vision', 'YOLO', 'векторные БД'] },
              { x: 1000, y: 20, width: 380, height: 260, icon: '⚙️', title: 'Разработка и деплой', tags: ['Python', 'FastAPI', 'React', 'TypeScript', 'Telegram Bot API', 'Amvera', 'REST API', 'Yandex API', 'локальные серверы'] },
              { x: 20, y: 320, width: 380, height: 260, icon: '📊', title: 'Аналитика и данные', tags: ['Power BI', 'Power Query', 'MS Project', 'Primavera P6', 'Excel', 'управленческий учёт', 'бюджетная аналитика', 'KPI-системы'] },
              { x: 1000, y: 320, width: 380, height: 260, icon: '🧭', title: 'Методологии', tags: ['Vibe Coding', 'Frontier Deployment', 'Prompt Engineering', 'PMI', 'бизнес-анализ', 'проектное управление', 'оптимизация процессов'] },
              { x: 20, y: 620, width: 380, height: 260, icon: '🏭', title: 'Отраслевая экспертиза', tags: ['Производство', 'машиностроение', 'судостроение', 'оборонный госзаказ', 'НИОКР', 'ГОЗ', 'дорожное строительство', 'госсектор', 'телеком'] },
              { x: 1000, y: 620, width: 380, height: 260, icon: '🔗', title: 'Интеграции и API', tags: ['1C', 'Bitrix24', 'amoCRM', 'Webhooks', 'OAuth', 'SOAP', 'GraphQL', 'RabbitMQ', 'Kafka'] }
            ].map((mod, i) => (
              <foreignObject key={i} x={mod.x} y={mod.y} width={mod.width} height={mod.height}>
                <div style={{width:'100%', height:'100%', background:'var(--bg-card)', border:'2px solid rgba(255,107,43,0.45)', borderRadius:'14px', padding:'20px', boxSizing:'border-box', display:'flex', flexDirection:'column', gap:'12px', overflow:'hidden'}}>
                  <div style={{display:'flex', alignItems:'center', gap:'10px', borderBottom:'1px solid rgba(255,107,43,0.15)', paddingBottom:'12px'}}>
                    <span style={{fontSize:'26px'}}>{mod.icon}</span>
                    <span style={{fontFamily:'Orbitron', fontSize:'16px', fontWeight:700, color:'var(--text-main)'}}>{mod.title}</span>
                  </div>
                  <div style={{display:'flex', flexWrap:'wrap', gap:'6px'}}>
                    {mod.tags.map((tag, j) => (
                      <span key={j} style={{fontSize:'13px', padding:'6px 12px', borderRadius:'999px', background:'var(--bg-primary)', color:'var(--text-main)', border:'1px solid var(--border)', whiteSpace:'nowrap'}}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </foreignObject>
            ))}
          </svg>
        </div>

        {/* Mobile Stack Grid */}
        <div className="md:hidden grid grid-cols-1 gap-[16px]">
          {[
            { icon: '🤖', title: 'AI и ML', tags: ['GigaChat API', 'RAG', 'FAISS', 'BM25', 'NLP', 'LLM', 'Computer Vision', 'YOLO', 'векторные БД'] },
            { icon: '⚙️', title: 'Разработка и деплой', tags: ['Python', 'FastAPI', 'React', 'TypeScript', 'Telegram Bot API', 'Amvera', 'REST API', 'Yandex API', 'локальные серверы'] },
            { icon: '📊', title: 'Аналитика и данные', tags: ['Power BI', 'Power Query', 'MS Project', 'Primavera P6', 'Excel', 'управленческий учёт', 'бюджетная аналитика', 'KPI-системы'] },
            { icon: '🧭', title: 'Методологии', tags: ['Vibe Coding', 'Frontier Deployment', 'Prompt Engineering', 'PMI', 'бизнес-анализ', 'проектное управление', 'оптимизация процессов'] },
            { icon: '🏭', title: 'Отраслевая экспертиза', tags: ['Производство', 'машиностроение', 'судостроение', 'оборонный госзаказ', 'НИОКР', 'ГОЗ', 'дорожное строительство', 'госсектор', 'телеком'] },
            { icon: '🔗', title: 'Интеграции и API', tags: ['1C', 'Bitrix24', 'amoCRM', 'Webhooks', 'OAuth', 'SOAP', 'GraphQL', 'RabbitMQ', 'Kafka'] }
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

      {/* 4.8 МЕТОДОЛОГИЯ */}
      <div className="mt-[96px]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionTitle>МЕТОДОЛОГИЯ</SectionTitle>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[28px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[16px] p-7 hover:-translate-y-2 hover:shadow-[var(--glow)] transition-all duration-300 p-card-accent"
          >
            <div className="text-[24px] mb-3">💡</div>
            <h3 className="font-dm text-[16px] font-bold text-[var(--text-main)] mb-2">Vibe Coding</h3>
            <p className="font-dm text-[14px] text-[var(--text-secondary)] leading-[1.7]">
              Стратегическое создание AI-продуктов. Архитектура → Логика → Код → Тест. Дни вместо недель.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[16px] p-7 hover:-translate-y-2 hover:shadow-[var(--glow)] transition-all duration-300 p-card-accent"
          >
            <div className="text-[24px] mb-3">🔧</div>
            <h3 className="font-dm text-[16px] font-bold text-[var(--text-main)] mb-2">Frontier Deployment</h3>
            <p className="font-dm text-[14px] text-[var(--text-secondary)] leading-[1.7]">
              От кода до продакшена. Инфраструктура, деплой, интеграция, мониторинг и сопровождение.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[16px] p-7 hover:-translate-y-2 hover:shadow-[var(--glow)] transition-all duration-300 p-card-accent"
          >
            <div className="text-[24px] mb-3">⚡</div>
            <h3 className="font-dm text-[16px] font-bold text-[var(--text-main)] mb-2">Vs No-Code</h3>
            <p className="font-dm text-[14px] text-[var(--text-secondary)] leading-[1.7]">
              Не ограничен шаблонами. Полноценный код — нестандартные решения. RAG, AI-агенты, сложная бизнес-логика.
            </p>
          </motion.div>
        </div>
      </div>
      {videoModalOpen && (
        <div
          onClick={() => setVideoModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.92)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="modal-shadow"
            style={{
              width: '100%',
              maxWidth: '960px',
              background: '#0D0D14',
              borderRadius: '20px',
              border: '2px solid rgba(255,107,43,0.5)',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            {/* Шапка модалки */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              borderBottom: '1px solid rgba(255,107,43,0.2)',
              background: 'rgba(255,107,43,0.05)'
            }}>
              <span style={{fontFamily:'Orbitron,monospace', fontSize:'14px', color:'#FF6B2B', fontWeight:700}}>
                ▶ AI Поиск торгов ЕАСУЗ
              </span>
              <button
                onClick={() => setVideoModalOpen(false)}
                style={{
                  background: 'rgba(255,107,43,0.15)',
                  border: '1px solid rgba(255,107,43,0.4)',
                  color: '#FF6B2B',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                  flexShrink: 0
                }}
              >✕</button>
            </div>

            {/* Видео */}
            <div style={{position:'relative', paddingBottom:'56.25%', height:0, background:'#000'}}>
              <iframe
                style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}}
                src="https://vk.com/video_ext.php?oid=-236823442&id=456239018&hd=2"
                frameBorder="0"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                title="AI Поиск торгов ЕАСУЗ"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
