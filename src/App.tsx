/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Preloader from './components/Preloader';
import Sidebar from './components/Sidebar';
import AboutPage from './components/AboutPage';
import ProjectsPage from './components/ProjectsPage';
import RegulationPage from './components/RegulationPage';
import CertsPage from './components/CertsPage';
import ContactsPage from './components/ContactsPage';
import BotsPage from './components/BotsPage';
import CookieBanner from './components/CookieBanner';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import AdminApp from './admin/AdminApp';
import { trackEvent } from './utils/analytics';

const initializeLocalStorage = () => {
  if (!localStorage.getItem('portfolio_reviews')) {
    localStorage.setItem('portfolio_reviews', JSON.stringify([
      {
        id: '1',
        author: 'Иван Иванов',
        role: 'CEO, TechCorp',
        text: 'Отличная работа! Проект выполнен в срок и с высоким качеством.',
        rating: 5
      }
    ]));
  }
  if (!localStorage.getItem('portfolio_regulations')) {
    localStorage.setItem('portfolio_regulations', JSON.stringify([
      { id: 1, title: 'Регламент работ', video_url: 'https://vkvideo.ru/video-236823442_456239017' }
    ]));
  }
};

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isPrivacyRoute = location.pathname === '/privacy-policy';

  const [activeTab, setActiveTab] = useState('about');
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    localStorage.setItem('theme', 'light');
    return 'light';
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    initializeLocalStorage();
    if (!isAdminRoute) {
      const isAuth = localStorage.getItem('admin_auth') === 'true' || sessionStorage.getItem('admin_auth') === 'true';
      if (isAuth) {
        navigate('/admin');
      }
    }
  }, [isAdminRoute, navigate]);

  useEffect(() => {
    if (!isAdminRoute && !isPrivacyRoute) {
      trackEvent(activeTab, 'page_view');
    }
  }, [activeTab, isAdminRoute, isPrivacyRoute]);

  useEffect(() => {
    if (!isAdminRoute) {
      window.scrollTo(0, 0);
    }
  }, [activeTab, isAdminRoute]);

  useEffect(() => {
    if (isAdminRoute) return;
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'about': return <AboutPage setActiveTab={setActiveTab} />;
      case 'projects': return <ProjectsPage setActiveTab={setActiveTab} />;
      case 'bots': return <BotsPage />;
      case 'regulation': return <RegulationPage setActiveTab={setActiveTab} />;
      case 'certs': return <CertsPage />;
      case 'contacts': return <ContactsPage />;
      default: return <AboutPage />;
    }
  };

  if (isAdminRoute) {
    return <AdminApp />;
  }

  if (isPrivacyRoute) {
    return (
      <>
        <Preloader />
        <div className="flex min-h-[100dvh] bg-[var(--bg-primary)] text-[var(--text-main)] font-dm">
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            theme={theme} 
            toggleTheme={toggleTheme}
            isOpen={isSidebarOpen}
            setIsOpen={setIsSidebarOpen}
          />
          <main className="flex-1 w-full md:w-[calc(100%-260px)] min-h-[100dvh]">
            <PrivacyPolicyPage />
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Preloader />
      <CookieBanner />
      
      <div className="flex min-h-[100dvh] bg-[var(--bg-primary)] text-[var(--text-main)] font-dm transition-colors duration-300">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          theme={theme} 
          toggleTheme={toggleTheme}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
        
        <main className="flex-1 w-full md:w-[calc(100%-260px)] min-h-[100dvh] relative">
          <div className="md:hidden sticky top-0 z-30 bg-[var(--bg-sidebar)]/80 backdrop-blur-md border-b border-[var(--border)] px-4 py-3 flex items-center justify-between">
            <div className="font-orbitron font-bold text-[16px] text-[var(--text-main)]">
              БР | Портфолио
            </div>
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-md bg-[var(--bg-primary)] text-[var(--text-main)] border border-[var(--border)]"
            >
              <Menu size={20} />
            </button>
          </div>

          <div className="animate-fade-in">
            {renderContent()}
          </div>
        </main>
      </div>
    </>
  );
}