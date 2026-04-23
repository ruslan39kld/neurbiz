import React, { useState, useEffect } from 'react';
import PrivacyPolicyModal from './PrivacyPolicyModal';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  const handleOpenPolicy = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[9999] max-w-[380px] animate-slide-in-right">
        <div className="bg-white border-2 border-orange-500 rounded-xl shadow-2xl p-5">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
              <svg 
                className="w-9 h-9 text-orange-500" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M2 4.5A2.5 2.5 0 014.5 2h11a2.5 2.5 0 010 5h-11A2.5 2.5 0 012 4.5zM2.75 9.083a.75.75 0 000 1.5h14.5a.75.75 0 000-1.5H2.75zM2.75 12.663a.75.75 0 000 1.5h14.5a.75.75 0 000-1.5H2.75zM2.75 16.25a.75.75 0 000 1.5h14.5a.75.75 0 100-1.5H2.75z"/>
              </svg>
            </div>

            <div className="flex-1">
              <p className="text-gray-800 text-sm leading-relaxed mb-4">
                Мы используем cookies и Яндекс.Метрику для улучшения сайта.{' '}
                <button
                  onClick={handleOpenPolicy}
                  className="text-orange-500 hover:text-orange-600 underline font-medium"
                >
                  Подробнее
                </button>
              </p>

              <button
                onClick={handleAccept}
                className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2.5 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md"
              >
                Согласен
              </button>
            </div>
          </div>
        </div>
      </div>

      <PrivacyPolicyModal isOpen={isModalOpen} onClose={handleCloseModal} />

      <style>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-out;
        }

        @media (max-width: 640px) {
          .fixed.bottom-6.right-6 {
            bottom: 1rem;
            right: 1rem;
            left: 1rem;
            max-width: calc(100% - 2rem);
          }
        }
      `}</style>
    </>
  );
};

export default CookieBanner;