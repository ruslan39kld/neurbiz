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
      <div className="fixed bottom-6 right-6 z-[9999] max-w-[450px] animate-slide-in-right">
        <div className="bg-white border-2 border-orange-500 rounded-xl shadow-2xl p-4">
          {/* Flex контейнер: текст слева, кнопка справа */}
          <div className="flex items-center gap-4">
            {/* Текст */}
            <div className="flex-1">
              <p className="text-gray-800 text-sm leading-relaxed">
                Мы используем cookies и Яндекс.Метрику для улучшения сайта.{' '}
                <button
                  onClick={handleOpenPolicy}
                  className="text-orange-500 hover:text-orange-600 underline font-medium"
                >
                  Подробнее
                </button>
              </p>
            </div>

            {/* Кнопка справа */}
            <button
              onClick={handleAccept}
              className="flex-shrink-0 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2.5 px-5 rounded-lg transition-all duration-200 whitespace-nowrap"
            >
              Согласен
            </button>
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