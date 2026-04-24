import React, { useState, useEffect } from 'react';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

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

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[9999] max-w-[450px] animate-slide-in-right">
        <div className="bg-white border-2 border-orange-500 rounded-xl shadow-2xl p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-gray-800 text-sm leading-relaxed">
                Наш сайт использует cookies, продолжая им пользоваться, вы соглашаетесь <a href="/privacy-policy" className="text-orange-500 hover:text-orange-600 underline font-medium">на обработку персональных данных</a>
              </p>
            </div>

            <button
              onClick={handleAccept}
              className="flex-shrink-0 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2.5 px-5 rounded-lg transition-all duration-200 whitespace-nowrap"
            >
              Согласен
            </button>
          </div>
        </div>
      </div>

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
