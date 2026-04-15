import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projects as defaultProjects, vkEmbedUrl } from '../data';

import SectionTitle from './SectionTitle';

export default function ProjectsPage({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  const [filter, setFilter] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [photoModal, setPhotoModal] = useState<string | null>(null);
  const [projectsData, setProjectsData] = useState<any[]>(defaultProjects);

  useEffect(() => {
    const loadProjects = async () => {
      // Check sessionStorage cache first (avoids re-fetching on tab switches)
      const cached = sessionStorage.getItem('cache_projects');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setProjectsData(parsed);
            return;
          }
        } catch {}
      }

      // Fetch from static JSON file — canonical source, always preferred over localStorage
      try {
        const res = await fetch('/data/projects.json');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setProjectsData(data);
            sessionStorage.setItem('cache_projects', JSON.stringify(data));
            // Keep localStorage in sync so admin panel and AboutPage see fresh data
            localStorage.setItem('portfolio_projects', JSON.stringify(data));
            return;
          }
        }
      } catch {}

      // Fallback to localStorage if JSON fetch fails (offline / server error)
      const adminSaved = localStorage.getItem('portfolio_projects');
      if (adminSaved) {
        try {
          const parsed = JSON.parse(adminSaved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setProjectsData(parsed);
            sessionStorage.setItem('cache_projects', JSON.stringify(parsed));
            return;
          }
        } catch {}
      }

      // Final fallback: hardcoded defaults from src/data.ts
    };

    loadProjects();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (photoModal) {
          setPhotoModal(null);
        } else if (selectedProject) {
          setSelectedProject(null);
        }
      }
    };
    if (selectedProject || photoModal) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, photoModal]);

  const stages = [
    { label: 'Все', value: 'Все', count: projectsData.length },
    { label: 'Продакшен', value: 'Продакшен', count: projectsData.filter(p => p.stage === 'Продакшен').length },
    { label: 'MVP', value: 'MVP', count: projectsData.filter(p => p.stage === 'MVP').length },
    { label: 'Прототипы', value: 'Прототипы', count: projectsData.filter(p => p.stage === 'Прототипы').length }
  ];

  const filteredProjects = projectsData.filter(p => {
    const matchesStage = filter === 'Все' || p.stage === filter;
    const query = searchQuery.toLowerCase();
    const matchesSearch = !query || 
      p.title.toLowerCase().includes(query) || 
      p.description.toLowerCase().includes(query) || 
      (p.tags && p.tags.some((t: string) => t.toLowerCase().includes(query)));
    return matchesStage && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Analytics': return '#4A9EFF';
      case 'AI/RAG': return '#9B59B6';
      case 'AI/NLP': return '#27AE60';
      case 'EdTech/AI': return '#F39C12';
      case 'Enterprise/Deploy': return '#E74C3C';
      default: return '#FF6B2B';
    }
  };

  const getProjectCountText = (count: number) => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return `${count} проектов найдено`;
    }
    if (lastDigit === 1) {
      return `${count} проект найден`;
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return `${count} проекта найдено`;
    }
    return `${count} проектов найдено`;
  };

  return (
    <div className="px-[20px] py-[24px] md:px-[32px] md:py-[32px] lg:px-[72px] lg:py-[56px] max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <SectionTitle>ПРОЕКТЫ</SectionTitle>
        <div className="mb-8 mt-8">
          <div className="bg-[#FF6B2B]/10 border border-[#FF6B2B]/30 rounded-[12px] p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="text-[20px] shrink-0">⚡</span>
              <p className="font-dm text-[14px] text-[var(--text-main)] leading-relaxed">
                «Любой из этих проектов может стать фундаментом для вашего — меняется логика и подход, архитектура переиспользуется.»
              </p>
            </div>
            <button 
              onClick={() => setActiveTab && setActiveTab('regulation')}
              className="shrink-0 font-orbitron text-[13px] text-[#FF6B2B] border border-[#FF6B2B] px-5 py-2 rounded-lg hover:bg-[#FF6B2B] hover:text-white transition-colors"
            >
              📋 Регламент AI →
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 w-full max-w-[400px]">
          <input 
            type="text"
            placeholder="Найти проект..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-[#E0E0E0] rounded-[10px] py-[10px] px-[16px] text-[15px] focus:outline-none focus:border-[#FF6B35] transition-colors bg-white text-gray-900"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {stages.map(cat => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-4 py-2 rounded-full font-dm text-[14px] transition-all duration-300 p-tab ${
                filter === cat.value 
                  ? 'bg-[#FF6B2B] text-white' 
                  : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[#FF6B2B]/50'
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>

        {/* Grid or Empty State */}
        {filteredProjects.length === 0 ? (
          filter === 'Прототипы' && !searchQuery ? (
            <div className="text-center py-[60px]">
              <div className="text-[48px] mb-4">🚧</div>
              <p className="text-gray-500 font-dm text-[16px]">Прототипы появятся здесь совсем скоро</p>
            </div>
          ) : (
            <div className="text-center py-[60px]">
              <div className="text-[48px] mb-4">🔍</div>
              <p className="text-gray-500 font-dm text-[16px] mb-6">Ничего не найдено по запросу «{searchQuery}»</p>
              <button 
                onClick={() => { setSearchQuery(''); setFilter('Все'); }}
                className="bg-[#FF6B2B] text-white px-6 py-2 rounded-lg font-orbitron text-[14px] hover:bg-[#e55a1f] transition-colors"
              >
                Сбросить фильтры
              </button>
            </div>
          )
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => {
              const color = getCategoryColor(project.category);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  key={project.id}
                  className="bg-[var(--bg-card)] rounded-[16px] overflow-hidden border border-[var(--border)] group hover:-translate-y-2 transition-all duration-300 cursor-pointer p-card-accent"
                  style={{ borderTop: `4px solid ${color}` }}
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Image/Placeholder */}
                  <div className="relative h-[180px] overflow-hidden bg-[var(--bg-primary)] rounded-t-[12px] group/image">
                    {project.imageUrl && (
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        style={{width:"100%", height:"180px", objectFit:"cover", borderRadius:"12px 12px 0 0"}}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.parentElement?.querySelector('.fallback-icon');
                          if (fallback) fallback.classList.remove('hidden');
                        }}
                      />
                    )}
                    <div 
                      className={`fallback-icon w-full h-full flex items-center justify-center ${project.imageUrl ? 'hidden' : ''}`}
                      style={{ background: `linear-gradient(135deg, ${color}20, transparent)` }}
                    >
                      <span className="text-[56px] opacity-50">{project.icon}</span>
                    </div>
                    
                    {/* Photo Hover Overlay */}
                    {project.imageUrl && (
                      <div 
                        className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 rounded-t-[12px]"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPhotoModal(project.imageUrl);
                        }}
                      >
                        <button className="bg-white text-gray-900 font-semibold px-5 py-2.5 rounded-lg shadow-lg">
                          🔍 Смотреть фото
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex mb-3">
                      <span 
                        className="text-[11px] font-bold px-2 py-1 rounded-md"
                        style={{ backgroundColor: `${color}15`, color: color }}
                      >
                        {project.category}
                      </span>
                    </div>
                    <h3 className="font-orbitron text-[16px] font-bold text-[var(--text-main)] mb-3 leading-[1.4] h-[2.8em] overflow-hidden line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="font-dm text-[14px] text-[var(--text-secondary)] line-clamp-2 mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {Array.isArray(project.tags) && project.tags.slice(0, 3).map((t: string) => (
                        <span key={t} className="bg-[#FF6B2B]/10 text-[#FF6B2B] text-[11px] px-2 py-1 rounded-full">
                          {t}
                        </span>
                      ))}
                      {Array.isArray(project.tags) && project.tags.length > 3 && (
                        <span className="bg-[#FF6B2B]/10 text-[#FF6B2B] text-[11px] px-2 py-1 rounded-full">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                    <p className="font-dm text-[13px] text-[#22C55E] mb-4 line-clamp-1">
                      ✅ {project.result}
                    </p>
                    <div className="flex justify-between items-center pt-4 border-t border-[var(--border)]">
                      <span className="font-dm text-[13px] text-[var(--text-secondary)]">{project.year}</span>
                      <div className="flex gap-2">
                        <span className="font-orbitron text-[12px] text-[#FF6B2B] border border-[#FF6B2B] px-3 py-1 rounded-md group-hover:bg-[#FF6B2B] group-hover:text-white transition-colors flex items-center">
                          Подробнее →
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
        )}
      </motion.div>

      {/* Fullscreen Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto bg-black/45 backdrop-blur-[6px]"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white relative w-full max-w-[860px] max-h-[88vh] overflow-y-auto rounded-[16px] border border-[#E8E8E8] shadow-[0_24px_64px_rgba(0,0,0,0.14)] flex flex-col custom-scrollbar"
            >
              {/* HERO IMAGE SECTION */}
              {selectedProject.imageUrl && (
                <div className="modal-hero-image">
                  <img 
                    src={selectedProject.imageUrl} 
                    alt={selectedProject.title} 
                    className="modal-hero-img"
                  />
                  <div className="modal-hero-overlay">
                    <span className="modal-category-badge">
                      {selectedProject.category}
                    </span>
                    <span className="modal-status-badge">
                      {selectedProject.stage === 'Продакшен' ? '🚀 ПРОДАКШЕН' : selectedProject.stage}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="modal-close-over-image"
                    title="Закрыть"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Close Button (Fallback if no image) */}
              {!selectedProject.imageUrl && (
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-8 z-30 bg-[#F0F0F0] text-[#4A4A4A] rounded-full w-9 h-9 flex items-center justify-center hover:bg-[#F4621F] hover:text-white transition-all duration-200 shadow-sm"
                >
                  ✕
                </button>
              )}

              {/* 1. HEADER SECTION */}
              <div className="bg-[#F7F7F7] border-b border-[#E8E8E8] p-6 md:p-8 shrink-0">
                {!selectedProject.imageUrl && (
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="bg-[rgba(244,98,31,0.10)] text-[#F4621F] border border-[rgba(244,98,31,0.25)] text-[12px] font-semibold px-3.5 py-1 rounded-full uppercase tracking-[0.5px]">
                      {selectedProject.category}
                    </span>
                    <span className="text-[12px] font-medium text-[#8A8A8A] uppercase tracking-wider">
                      {selectedProject.stage}
                    </span>
                  </div>
                )}
                <h2 className="text-[24px] md:text-[28px] font-bold text-[#1A1A1A] leading-tight">
                  {selectedProject.title}
                </h2>
              </div>

              {/* 2. BODY SECTION */}
              <div className="p-6 md:p-8 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
                  {/* Left Column (60%) */}
                  <div className="md:col-span-6">
                    <div className="mb-8">
                      <h3 className="text-[16px] font-bold text-[#1A1A1A] mb-4 uppercase tracking-wider flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-[#F4621F] rounded-full"></span>
                        О проекте
                      </h3>
                      <p className="text-[15px] text-[#3A3A3A] leading-[1.7]">
                        {selectedProject.description}
                      </p>
                      <p className="text-[15px] text-[#6B6B6B] leading-[1.7] mt-4">
                        {selectedProject.detail}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-[16px] font-bold text-[#1A1A1A] mb-4 uppercase tracking-wider flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-[#F4621F] rounded-full"></span>
                        ЧТО СДЕЛАНО
                      </h3>
                      <ul className="flex flex-col">
                        {(Array.isArray(selectedProject.tasks) && selectedProject.tasks.length > 0 ? selectedProject.tasks : Array.isArray(selectedProject.whatDone) && selectedProject.whatDone.length > 0 ? selectedProject.whatDone : selectedProject.detail.split('. ').filter((s: string) => s.trim().length > 0)).map((point: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 py-2.5 border-b border-[#F0F0F0] text-[14px] text-[#2A2A2A] leading-[1.5]">
                            <span className="shrink-0">✅</span>
                            <span>{point.trim()}{point.endsWith('.') || point.includes('✅') ? '' : '.'}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column (40%) */}
                  <div className="md:col-span-4 flex flex-col gap-6">
                    {/* Metrics */}
                    <div className="grid grid-cols-1 gap-4">
                      {selectedProject.stats?.slice(0, 2).map((stat: any, index: number) => (
                        <div key={index} className="bg-[#F7F7F7] p-5 rounded-xl border border-[#E8E8E8] flex flex-col items-center text-center">
                          <span className="text-[#F4621F] text-[32px] font-extrabold leading-none mb-1.5">{stat.value}</span>
                          <span className="text-[#8A8A8A] text-[11px] uppercase tracking-[1px] font-semibold">{stat.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="bg-[rgba(244,98,31,0.04)] p-5 rounded-xl border border-[rgba(244,98,31,0.10)]">
                      <h4 className="text-[11px] text-[#8A8A8A] uppercase tracking-[1px] font-bold mb-4">Стек технологий</h4>
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(selectedProject.tags) && selectedProject.tags.map((t: string) => (
                          <span key={t} className="bg-[rgba(244,98,31,0.08)] text-[#E05510] border border-[rgba(244,98,31,0.20)] text-[13px] font-medium px-3.5 py-1 rounded-full">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="bg-[#F7F7F7]/50 p-5 rounded-xl border border-[#E8E8E8] flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[13px] text-[#8A8A8A]">Год</span>
                        <span className="text-[14px] text-[#1A1A1A] font-semibold">{selectedProject.year}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[13px] text-[#8A8A8A]">Роль</span>
                        <span className="text-[14px] text-[#F4621F] font-semibold">{selectedProject.role || 'Разработчик'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. VIDEO SECTION (if exists) */}
              {selectedProject.videoUrl && (
                <div className="px-6 md:px-8 pb-8">
                  <h3 className="text-[16px] font-bold text-[#1A1A1A] mb-4 flex items-center gap-2 uppercase tracking-wider">
                    <span className="text-[#F4621F]">▶</span> ВИДЕО-ДЕМО
                  </h3>
                  <div className="w-full rounded-xl overflow-hidden bg-black/5">
                    <iframe
                      src={vkEmbedUrl(selectedProject.videoUrl)}
                      width="100%"
                      height="300"
                      frameBorder="0"
                      allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                      allowFullScreen
                      style={{ borderRadius: '12px' }}
                    ></iframe>
                  </div>
                </div>
              )}

              {/* FOOTER */}
              <div className="sticky bottom-0 mt-auto bg-white p-6 border-t border-[#E8E8E8] flex flex-wrap gap-4 justify-between items-center z-20">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="order-2 md:order-1 px-6 py-2.5 rounded-lg border-2 border-[#E0E0E0] text-[#4A4A4A] font-semibold text-[14px] hover:border-[#F4621F] hover:text-[#F4621F] transition-all duration-200"
                >
                  ✕ Закрыть
                </button>
                <div className="order-1 md:order-2 flex gap-3 w-full md:w-auto">
                  {selectedProject.liveUrl && (
                    <a 
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 md:flex-none bg-[#FF6B2B] text-white font-bold text-[14px] px-[20px] py-[10px] rounded-[8px] hover:bg-[#e55a1f] hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
                    >
                      🚀 Открыть проект
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Photo Modal */}
      <AnimatePresence>
        {photoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            onClick={() => setPhotoModal(null)}
          >
            <button
              onClick={() => setPhotoModal(null)}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
              style={{ fontSize: '32px', lineHeight: 1 }}
            >
              ✕
            </button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              src={photoModal}
              alt="Project preview"
              style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: '12px' }}
              className="shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
