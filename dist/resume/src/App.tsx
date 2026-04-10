/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Briefcase, 
  BarChart3, 
  Zap, 
  Mail, 
  Send, 
  Globe, 
  Github, 
  ChevronUp,
  Award,
  GraduationCap,
  ExternalLink,
  CheckCircle2,
  Calendar,
  MapPin,
  Linkedin,
  FileText,
  Layout
} from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from './lib/utils';

// --- Components ---

const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-accent rounded-full"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: Math.random()
          }}
          animate={{ 
            y: [null, Math.random() * -100 + "%"],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      ))}
    </div>
  );
};

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      {subtitle && <span className="text-accent font-semibold tracking-widest uppercase text-sm mb-2 block">{subtitle}</span>}
      <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 relative inline-block">
        {children}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-accent to-secondary rounded-full"></div>
      </h2>
    </motion.div>
  );
};

const Counter = ({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center p-6 glass-card hover:border-accent/50 transition-colors duration-300">
      <div className="text-5xl font-display font-extrabold text-accent mb-2">
        {count}{suffix}
      </div>
      <div className="text-slate-500 uppercase tracking-wider text-xs font-semibold">
        {label}
      </div>
    </div>
  );
};

const TechTag = ({ label }: { label: string; key?: string | number }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05, backgroundColor: "#FF6B35", color: "#fff" }}
      className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-sm font-semibold border border-slate-200 transition-colors cursor-default"
    >
      {label}
    </motion.div>
  );
};

const CertificateSection = () => {
  const [activeFilter, setActiveFilter] = useState('Все');
  
  const certificates = [
    { id: 1, title: "AI/ML-разработчик", org: "ООО «Терра ЭйАй» / University of AI", year: "2024–2025", category: "AI/ML" },
    { id: 2, title: "Цифровая грамотность (продвинутый уровень)", org: "ГК «РКТ»", year: "2025", category: "AI/ML" },
    { id: 3, title: "Работа с LLM GigaChat", org: "Корпоративный университет Сбербанка", year: "2025", category: "AI/ML" },
    { id: 4, title: "Генеративное искусство", org: "Корпоративный университет Сбербанка", year: "2025", category: "AI/ML" },
    { id: 5, title: "Профессиональная клиентоцентричность", org: "РАНХиГС", year: "2025", category: "AI/ML" },
    { id: 6, title: "Введение в ИИ-агенты", org: "Корпоративный университет Сбербанка", year: "2025", category: "AI/ML" },
    { id: 7, title: "Project Management with Primavera P6", org: "PMI", year: "2024", category: "Управление" },
    { id: 8, title: "MS Project in Project Management", org: "PMI", year: "2022", category: "Управление" },
    { id: 9, title: "AI Winter School", org: "ООО «Терра ЭйАй»", year: "2026", category: "AI/ML" },
    { id: 10, title: "Бизнес-аналитика. Аналитические фреймворки", org: "Бизнес-аналитика", year: "2024", category: "Аналитика" },
    { id: 11, title: "Бизнес-аналитика. Финансовое моделирование", org: "Бизнес-аналитика", year: "2024", category: "Аналитика" },
    { id: 12, title: "Аналитик Power BI: Базовый и углубленный уровень", org: "ООО «Нетология»", year: "2024", category: "Аналитика" },
    { id: 13, title: "Бизнес-аналитика. Основы стратегического планирования", org: "Бизнес-аналитика", year: "2024", category: "Аналитика" },
    { id: 14, title: "Бизнес-аналитика. Управление аналитическим проектом", org: "Бизнес-аналитика", year: "2024", category: "Аналитика" },
    { id: 15, title: "Благодарственное письмо (ИИ-анализ биохимии)", org: "ФГБУ «НМИЦ ТПМ»", year: "2024", category: "Благодарности" },
    { id: 16, title: "Благодарственное письмо (СИЗ и ИИ-мониторинг)", org: "ООО «Картика»", year: "2025", category: "Благодарности" },
    { id: 17, title: "Нейросети 2.0. Новый уровень", org: "AI-CENTR", year: "2024", category: "AI/ML" },
    { id: 18, title: "Нейросети для работы и бизнеса", org: "AI-CENTR", year: "2024", category: "AI/ML" },
    { id: 19, title: "Управление проектами в строительной сфере", org: "Project Management", year: "2023", category: "Управление" },
    { id: 20, title: "CV School: Основы CV проектов (Vibe coding)", org: "ООО «Терра ЭйАй»", year: "2026", category: "AI/ML" },
  ];

  const filters = [
    { name: 'Все', count: certificates.length, icon: <Layout size={14} /> },
    { name: 'AI/ML', count: certificates.filter(c => c.category === 'AI/ML').length, icon: <Cpu size={14} /> },
    { name: 'Управление', count: certificates.filter(c => c.category === 'Управление').length, icon: <Briefcase size={14} /> },
    { name: 'Аналитика', count: certificates.filter(c => c.category === 'Аналитика').length, icon: <BarChart3 size={14} /> },
    { name: 'Благодарности', count: certificates.filter(c => c.category === 'Благодарности').length, icon: <Award size={14} /> },
  ];

  const filteredCerts = activeFilter === 'Все' 
    ? certificates 
    : certificates.filter(c => c.category === activeFilter);

  return (
    <div className="mt-12">
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-4 no-scrollbar">
        {filters.map((filter) => (
          <button
            key={filter.name}
            onClick={() => setActiveFilter(filter.name)}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap",
              activeFilter === filter.name 
                ? "bg-accent text-white shadow-lg shadow-accent/20" 
                : "bg-white text-slate-500 border border-slate-200 hover:border-accent/30"
            )}
          >
            {filter.icon}
            {filter.name} ({filter.count})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredCerts.map((cert) => (
            <motion.div
              layout
              key={cert.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="glass-card p-6 flex flex-col items-center text-center group hover:border-accent/50 hover:bg-accent/[0.01] transition-all cursor-default min-h-[210px] justify-between"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-accent/5 flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform">
                  <Award size={24} />
                </div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-accent transition-colors mb-2 line-clamp-2">
                  {cert.title}
                </h4>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  {cert.org}
                </p>
              </div>
              <div className="mt-4">
                <span className="px-3 py-1 bg-accent/5 rounded-full text-xs font-bold text-accent/70 group-hover:text-accent transition-colors">
                  {cert.year}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- Main Page Sections ---

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-bg-primary overflow-x-hidden selection:bg-accent selection:text-white">
      <ParticleBackground />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 pb-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
          <motion.div 
            style={{ opacity }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold mb-6 animate-pulse-slow"
            >
              <Zap size={14} className="fill-accent" />
              🚀 ДОСТУПЕН ДЛЯ ПРОЕКТОВ
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-display font-extrabold leading-tight mb-8 text-slate-900">
              Бельтюгов <br />
              <span className="text-gradient">Руслан Владимирович</span>
            </h1>

            <p className="text-2xl md:text-3xl font-display font-bold text-slate-800 mb-6 leading-snug">
              Превращаю бизнес-процессы в AI-системы за 30 дней
            </p>

            <p className="text-slate-600 text-lg mb-8 max-w-xl leading-relaxed">
              15+ лет управления сложными проектами. 10+ внедренных AI-решений. 
              Эксперт по методологии Vibe Coding и цифровой трансформации госсектора.
            </p>

            <div className="flex flex-wrap gap-6 mb-10">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-900">15+ лет</span>
                <span className="text-xs text-slate-400 uppercase tracking-widest">опыта</span>
              </div>
              <div className="w-px h-10 bg-slate-200 hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-900">10+</span>
                <span className="text-xs text-slate-400 uppercase tracking-widest">AI-проектов</span>
              </div>
              <div className="w-px h-10 bg-slate-200 hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-900">100+</span>
                <span className="text-xs text-slate-400 uppercase tracking-widest">процессов</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://neurbiz.ru" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 bg-accent hover:bg-accent/90 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-accent hover:-translate-y-1"
              >
                Портфолио проектов <ExternalLink size={18} />
              </a>
              <a 
                href="#contacts" 
                className="px-8 py-4 border border-slate-200 hover:border-accent text-slate-700 font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:bg-white"
              >
                Связаться со мной
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-accent to-secondary rounded-2xl opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500 animate-pulse-slow"></div>
            <div className="relative z-10 rounded-2xl overflow-hidden border-2 border-slate-100 group-hover:border-accent/30 transition-colors duration-500 shadow-xl">
              <img 
                src="https://fszyqkfwggdcmuywtzhp.supabase.co/storage/v1/object/public/portfolio/foto%20resume.jpg" 
                alt="Бельтюгов Руслан" 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent opacity-40"></div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
        </motion.div>
      </section>

      {/* Expertise Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Что я умею">Экспертиза</SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Cpu className="text-accent" />,
                title: "AI/ML разработка",
                skills: ["Python • TensorFlow", "OpenAI API", "Langchain", "Computer Vision"]
              },
              {
                icon: <Briefcase className="text-secondary" />,
                title: "Управление проектами",
                skills: ["MS Project • Primavera P6", "Agile • Scrum", "BPMN"]
              },
              {
                icon: <BarChart3 className="text-accent" />,
                title: "Бизнес-анализ",
                skills: ["Power BI • Excel • 1C", "Анализ данных", "KPI"]
              },
              {
                icon: <Zap className="text-secondary" />,
                title: "Цифровая трансформация",
                skills: ["Vibe Coding", "Process Automation", "AI Integration", "Innovation"]
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-8 glass-card border-white/5 hover:border-accent/30 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-900">{item.title}</h3>
                <ul className="space-y-2">
                  {item.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="text-slate-600 text-sm flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-accent/50" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 relative">
        <div className="max-w-4xl mx-auto">
          <SectionHeading subtitle="Мой путь">Карьерная траектория</SectionHeading>
          
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-secondary to-accent/20 transform md:-translate-x-1/2"></div>
            
            <div className="space-y-12">
              {[
                {
                  year: "2025 — н.в.",
                  role: "Заместитель начальника управления — Начальник отдела цифровой трансформации",
                  company: "ГКУ МО «РЦТ»",
                  site: "rctmo.mosreg.ru",
                  active: true,
                  achievements: [
                    "Создал AI-направление с нуля на базе Vibe Coding методологии",
                    "Запустил 10+ AI-проектов в production (neurbiz.ru)",
                    "Управляю командой бизнес-аналитиков",
                    "Оптимизировал бизнес-процессы через AI (эффективность +40%)"
                  ],
                  stack: "Python • Vibe Coding • BPMN • AI Integration"
                },
                {
                  year: "2022 — 2025",
                  role: "Senior Project Manager",
                  company: "АО «МСУ-1»",
                  site: "mcy-1.ru",
                  achievements: [
                    "Развил новое направление экологического строительства",
                    "Интегрировал процессы между подразделениями",
                    "Организовал интеграцию IT-систем (MS Project + Power BI)",
                    "Выстроил систему проектного контроллинга"
                  ],
                  stack: "MS Project • Power BI • Process Integration"
                },
                {
                  year: "2021 — 2022",
                  role: "Менеджер проектов по автоматизации",
                  company: "ООО «Стройинжсервис-2»",
                  site: "sis-2.ru",
                  achievements: [
                    "Создал методологическую базу проектного управления с нуля",
                    "Провел комплексный анализ всех бизнес-процессов",
                    "Внедрил систему календарно-сетевого планирования",
                    "Организовал систему мониторинга и отчетности"
                  ],
                  stack: "Project Management • Process Optimization"
                },
                {
                  year: "2018 — 2021",
                  role: "Менеджер проектов НИОКР, ГОЗ",
                  company: "АО \"ЦНИРТИ им. академика А.И. Берга\"",
                  site: "цнирти.рф",
                  achievements: [
                    "Управлял государственными проектами оборонного заказа",
                    "Внедрял проектное управление на предприятии",
                    "Выстроил календарно-сетевое планирование",
                    "Внедрил систему риск-менеджмента"
                  ],
                  stack: "MS Project • Risk Management • Government Contracts"
                },
                {
                  year: "2016 — 2018",
                  role: "Менеджер по производству",
                  company: "ОАО \"Балткран\"",
                  site: "baltkran.ru",
                  achievements: [
                    "Производственное планирование и контроль",
                    "Анализ производственной деятельности",
                    "Координация производственных подразделений"
                  ],
                  stack: "Production Planning • Manufacturing"
                }
              ].map((item, idx) => (
                <div key={idx} className="relative flex flex-col md:flex-row items-center">
                  {/* Dot */}
                  <div className={cn(
                    "absolute left-[-4px] md:left-1/2 w-3 h-3 rounded-full transform md:-translate-x-1/2 z-20 border-2 border-bg-primary",
                    item.active ? "bg-accent animate-ping" : "bg-secondary"
                  )}></div>
                  <div className={cn(
                    "absolute left-[-4px] md:left-1/2 w-3 h-3 rounded-full transform md:-translate-x-1/2 z-20 border-2 border-bg-primary",
                    item.active ? "bg-accent" : "bg-secondary"
                  )}></div>

                  {/* Content */}
                  <div className={cn(
                    "w-full md:w-1/2 pl-8 md:pl-0",
                    idx % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
                  )}>
                    <motion.div
                      initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className={cn(
                        "p-6 glass-card border-slate-200 hover:border-accent/30 transition-all duration-300",
                        item.active && "border-accent/30 bg-accent/5"
                      )}
                    >
                      <div className="text-accent font-bold mb-1">{item.year}</div>
                      <h3 className="text-xl font-bold mb-2 text-slate-900">{item.role}</h3>
                      <div className="flex items-center gap-2 text-secondary text-sm font-semibold mb-4 justify-start md:justify-end">
                        {idx % 2 !== 0 && <Globe size={14} />}
                        <a href={`https://${item.site}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{item.company}</a>
                        {idx % 2 === 0 && <Globe size={14} />}
                      </div>
                      
                      <ul className={cn(
                        "space-y-2 mb-4 text-sm text-slate-600",
                        idx % 2 === 0 ? "md:text-right" : "text-left"
                      )}>
                        {item.achievements.map((ach, aIdx) => (
                          <li key={aIdx} className="flex items-start gap-2 md:inline-block">
                            <span className="md:hidden">•</span>
                            {ach}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="pt-4 border-t border-slate-100">
                        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Стек: </span>
                        <span className="text-xs text-accent font-medium">{item.stack}</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Мой арсенал">Технологический стек</SectionHeading>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-900">
                <Cpu className="text-accent" /> AI/ML РАЗРАБОТКА
              </h3>
              <div className="flex flex-wrap gap-3">
                {["Python", "Pandas", "NumPy", "TensorFlow", "Keras", "OpenAI API", "Langchain", "YOLO", "Computer Vision"].map((tech) => (
                  <TechTag key={tech} label={tech} />
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-sm text-slate-500 leading-relaxed">
                  Глубокая экспертиза в создании интеллектуальных агентов, 
                  систем компьютерного зрения и автоматизации анализа данных.
                </p>
              </div>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-900">
                <Briefcase className="text-secondary" /> УПРАВЛЕНИЕ
              </h3>
              <div className="flex flex-wrap gap-3">
                {["MS Project", "Primavera P6", "BPMN", "Agile", "Scrum", "Process Modeling", "Project Portfolio"].map((tech) => (
                  <TechTag key={tech} label={tech} />
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-sm text-slate-500 leading-relaxed">
                  Профессиональное владение инструментами календарно-сетевого планирования 
                  и методологиями управления портфелями проектов.
                </p>
              </div>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-900">
                <BarChart3 className="text-accent" /> АНАЛИТИКА И BI
              </h3>
              <div className="flex flex-wrap gap-3">
                {["Power BI", "Excel Expert", "1C: ERP", "УСО", "Документооборот", "Data Analysis", "KPI Dashboards"].map((tech) => (
                  <TechTag key={tech} label={tech} />
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-sm text-slate-500 leading-relaxed">
                  Построение сложных аналитических дашбордов и интеграция 
                  разрозненных IT-систем в единый контур управления.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-accent/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          <Counter value={10} label="Запущенных AI-проектов" suffix="+" />
          <Counter value={15} label="Лет опыта в управлении" suffix="+" />
          <Counter value={20} label="Профессиональных курсов" suffix="+" />
          <Counter value={100} label="Оптимизированных процессов" suffix="+" />
        </div>
      </section>

      {/* Education Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-bg-secondary">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Обучение">Непрерывное развитие</SectionHeading>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-20">
            <div className="lg:col-span-1 glass-card p-8 border-accent/20">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6">
                <GraduationCap size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Высшее образование</h3>
              <p className="text-slate-700 font-semibold mb-2">АНО «Калининградский Институт Управления»</p>
              <p className="text-slate-500 text-sm">Менеджмент организации (2009)</p>
            </div>
            
            <div className="lg:col-span-2 glass-card p-8">
              <h3 className="text-2xl font-bold mb-6 text-slate-900 flex items-center gap-3">
                <Award className="text-accent" /> Ключевые компетенции
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="font-bold text-slate-900 mb-1">AI & Neural Networks</div>
                  <div className="text-xs text-slate-500">LLM, CV, Agentic Workflows, Vibe Coding</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="font-bold text-slate-900 mb-1">Project Management</div>
                  <div className="text-xs text-slate-500">Primavera P6, MS Project, Agile, Scrum</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="font-bold text-slate-900 mb-1">Business Analytics</div>
                  <div className="text-xs text-slate-500">Power BI, Financial Modeling, KPI Systems</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="font-bold text-slate-900 mb-1">Digital Transformation</div>
                  <div className="text-xs text-slate-500">Process Optimization, GovTech, AI Integration</div>
                </div>
              </div>
            </div>
          </div>

          <CertificateSection />
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <SectionHeading subtitle="Контакты">Готов обсудить ваш проект</SectionHeading>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
            {[
              { icon: <Mail />, label: "Email", val: "ruslan-39kld@yandex.ru", href: "mailto:ruslan-39kld@yandex.ru" },
              { icon: <Send />, label: "Telegram", val: "@Ruslan39kld", href: "https://t.me/Ruslan39kld" },
              { icon: <Linkedin />, label: "VK", val: "vk.com/beltugov39", href: "https://vk.com/beltugov39" },
              { icon: <Globe />, label: "Портфолио", val: "neurbiz.ru", href: "https://neurbiz.ru" },
              { icon: <Github />, label: "GitHub", val: "github.com/ruslan39kld", href: "https://github.com/ruslan39kld" }
            ].map((contact, idx) => (
              <motion.a
                key={idx}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className="p-6 glass-card flex flex-col items-center gap-3 hover:border-accent/50 transition-all group"
              >
                <div className="text-accent group-hover:scale-110 transition-transform">
                  {contact.icon}
                </div>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{contact.label}</span>
              </motion.a>
            ))}
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-slate-500">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-accent" />
              <span>Москва, Россия</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-slate-200 hidden md:block"></div>
            <div className="flex items-center gap-2">
              <Briefcase size={18} className="text-secondary" />
              <span>Открыт для интересных проектов</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-100 text-center text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto">
          <p>© {new Date().getFullYear()} Бельтюгов Руслан Владимирович. Все права защищены.</p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.3em] opacity-50">Digital Transformation & AI Expert</p>
        </div>
      </footer>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 w-14 h-14 bg-accent text-white rounded-full shadow-accent flex items-center justify-center z-50 hover:bg-accent/90 transition-colors"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
