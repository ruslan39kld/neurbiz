import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import QuickPinchZoom, { make3dTransformValue } from 'react-quick-pinch-zoom';
import { certificates as defaultCertificates } from '../data';
import { getSupabaseClient } from '../services/supabaseClient';
import Modal from './Modal';
import SectionTitle from './SectionTitle';

export default function CertsPage() {
  const [filter, setFilter] = useState('Все');
  const [selectedCert, setSelectedCert] = useState<any>(null);
  const [loadError, setLoadError] = useState(false);
  const [imgOrientation, setImgOrientation] = useState<'portrait' | 'landscape' | null>(null);
  const [previewErrors, setPreviewErrors] = useState<Record<number, boolean>>({});
  const imgRef = useRef<HTMLImageElement>(null);
  const [certificates, setCertificates] = useState<any[]>(defaultCertificates);

  useEffect(() => {
    const loadCertificates = async () => {
      // Check sessionStorage cache first (avoids re-fetching on tab switches)
      const cached = sessionStorage.getItem('cache_certificates');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCertificates(parsed);
            return;
          }
        } catch {}
      }

      // Try Supabase
      const supabase = await getSupabaseClient();
      if (supabase) {
        const { data, error } = await supabase
          .from('certificates')
          .select('*')
          .order('year', { ascending: false });
        if (!error && data && data.length > 0) {
          setCertificates(data);
          sessionStorage.setItem('cache_certificates', JSON.stringify(data));
          return;
        }
      }
      // Fallback: src/data.ts (defaultCertificates already set as initial state)
    };

    loadCertificates();
  }, []);

  const onUpdate = useCallback(({ x, y, scale }: { x: number; y: number; scale: number }) => {
    if (imgRef.current) {
      const value = make3dTransformValue({ x, y, scale });
      imgRef.current.style.setProperty('transform', value);
    }
  }, []);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    setImgOrientation(naturalHeight > naturalWidth ? 'portrait' : 'landscape');
  };

  const handlePreviewError = (id: number) => {
    setPreviewErrors(prev => ({ ...prev, [id]: true }));
  };

  const categories = [
    { id: 'Все', label: 'Все', count: certificates.length },
    { id: 'AI/ML', label: '🤖 AI/ML', count: certificates.filter(c => c.category === 'AI/ML').length },
    { id: 'Управление', label: '📋 Управление', count: certificates.filter(c => c.category === 'Управление').length },
    { id: 'Аналитика', label: '📊 Аналитика', count: certificates.filter(c => c.category === 'Аналитика').length },
    { id: 'Благодарности', label: '🏆 Благодарности', count: certificates.filter(c => c.category === 'Благодарности').length },
  ];

  const filteredCerts = filter === 'Все' 
    ? certificates 
    : certificates.filter(c => c.category === filter);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'AI/ML': return '#9B59B6';
      case 'Управление': return '#3498DB';
      case 'Аналитика': return '#2ECC71';
      case 'Благодарности': return '#F1C40F';
      default: return '#FF6B2B';
    }
  };

  const isPdf = (url: string) => url.toLowerCase().endsWith('.pdf');

  const handleOpenCert = (cert: typeof certificates[0]) => {
    setLoadError(false);
    setImgOrientation(null);
    setSelectedCert(cert);
  };

  return (
    <div className="px-[20px] py-[24px] md:px-[32px] md:py-[32px] lg:px-[72px] lg:py-[56px] max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <SectionTitle>СЕРТИФИКАТЫ</SectionTitle>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8 mt-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 rounded-full font-dm text-[14px] transition-all duration-300 p-tab ${
                filter === cat.id 
                  ? 'bg-[#FF6B2B] text-white' 
                  : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[#FF6B2B]/50'
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert, i) => {
              const color = getCategoryColor(cert.category);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  key={cert.id}
                  className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[16px] overflow-hidden flex flex-col p-card"
                >
                  {/* Image/Placeholder */}
                  <div className="relative h-[180px] bg-[var(--bg-primary)] overflow-hidden">
                    {cert.cert_url && !previewErrors[cert.id] ? (
                      isPdf(cert.cert_url) ? (
                        <div className="w-full h-full relative cursor-pointer" onClick={() => handleOpenCert(cert)}>
                          <iframe 
                            src={`https://docs.google.com/viewer?url=${encodeURIComponent(cert.cert_url)}&embedded=true`} 
                            className="w-full h-full border-none rounded-[8px] pointer-events-none"
                            title={cert.title}
                          />
                          <div className="absolute inset-0 bg-transparent" />
                        </div>
                      ) : (
                        <img 
                          src={cert.cert_url} 
                          alt={cert.title} 
                          className="w-full h-full object-cover rounded-[8px] cursor-pointer"
                          onClick={() => handleOpenCert(cert)}
                          onError={() => handlePreviewError(cert.id)}
                        />
                      )
                    ) : (
                      <div 
                        className="w-full h-full flex flex-col items-center justify-center relative cursor-pointer"
                        style={{ background: `linear-gradient(135deg, ${color}20, transparent)` }}
                        onClick={() => handleOpenCert(cert)}
                      >
                        <span className="text-[44px] opacity-50 mb-2">📜</span>
                        <span className="bg-[#FF6B2B] text-white text-[11px] font-bold px-3 py-1 rounded-full absolute bottom-4">
                          {cert.year}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h3 className="font-dm text-[13px] font-bold text-[var(--text-main)] line-clamp-2 flex-1">
                        {cert.title}
                      </h3>
                      {cert.image && (
                        <span className="bg-[#FF6B2B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                          {cert.year}
                        </span>
                      )}
                    </div>
                    <p className="font-dm text-[11px] text-[var(--text-secondary)] mb-auto">
                      {cert.org}
                    </p>
                    <button 
                      onClick={() => handleOpenCert(cert)}
                      className="w-full border border-[#FF6B2B]/40 text-[#FF6B2B] rounded-lg py-1.5 text-[12px] mt-3 hover:bg-[#FF6B2B]/10 transition-colors"
                    >
                      👁 Смотреть
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Modal */}
      <Modal isOpen={!!selectedCert} onClose={() => setSelectedCert(null)} size="full">
        {selectedCert && (
          <div className="flex flex-col h-full p-4 sm:p-6">
            {/* Header */}
            <div className="h-[70px] shrink-0 flex flex-col justify-center">
              <h2 className="font-orbitron text-[18px] md:text-[22px] font-bold text-[var(--text-main)] line-clamp-1">
                {selectedCert.title}
              </h2>
              <p className="font-dm text-[12px] md:text-[14px] text-[var(--text-secondary)]">
                {selectedCert.org} • {selectedCert.year}
              </p>
            </div>
            
            {/* Content Area */}
            <div className="flex-1 bg-[var(--bg-primary)] rounded-xl border border-[var(--border)] overflow-hidden relative">
              {loadError ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-[var(--text-secondary)] p-8 text-center">
                  <span className="text-[64px] mb-4">⚠️</span>
                  <p className="font-dm text-[16px]">Файл временно недоступен. Попробуйте позже.</p>
                </div>
              ) : selectedCert.cert_url ? (
                isPdf(selectedCert.cert_url) ? (
                  <iframe 
                    src={`https://docs.google.com/viewer?url=${encodeURIComponent(selectedCert.cert_url)}&embedded=true`} 
                    className="w-full h-full border-none"
                    title={selectedCert.title}
                    onError={() => setLoadError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center overflow-auto bg-[#f5f5f5]">
                    <QuickPinchZoom onUpdate={onUpdate} containerProps={{ style: { width: '100%', height: '100%' } }}>
                      <img 
                        ref={imgRef}
                        src={selectedCert.cert_url} 
                        alt={selectedCert.title} 
                        onLoad={handleImageLoad}
                        className={`object-contain cursor-zoom-in transition-all duration-300 ${
                          imgOrientation === 'portrait' ? 'h-full w-auto max-h-full' : 'w-full h-auto max-w-full'
                        }`}
                        onError={() => setLoadError(true)}
                      />
                    </QuickPinchZoom>
                  </div>
                )
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-[var(--text-secondary)]">
                  <span className="text-[64px] mb-4">📄</span>
                  <p className="font-dm">Файл сертификата не найден</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="h-[60px] shrink-0 flex gap-3 justify-between items-center px-5 py-3 mt-2">
              <div className="text-[11px] text-[var(--text-secondary)] font-dm hidden sm:block">
                {selectedCert.cert_url && !isPdf(selectedCert.cert_url) && !loadError && (
                  <span>💡 Используйте колесико или жесты для масштабирования</span>
                )}
              </div>
              <div className="flex gap-3 ml-auto">
                {selectedCert.cert_url && (
                  <a 
                    href={selectedCert.cert_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#FF6B2B] text-white font-orbitron text-[12px] px-6 py-2 rounded-lg hover:bg-[#FF6B2B]/90 transition-colors flex items-center gap-2"
                  >
                    📥 Скачать
                  </a>
                )}
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border)] font-orbitron text-[12px] px-6 py-2 rounded-lg hover:bg-[var(--bg-primary)] transition-colors"
                >
                  ✕ Закрыть
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
