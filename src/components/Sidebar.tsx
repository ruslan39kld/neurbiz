import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMAGES } from '../data';
import { Download, Send, Github, Linkedin, Moon, Sun, Terminal, Hexagon, ClipboardList, Award, Mail, Settings, X } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: string;
  toggleTheme: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ activeTab, setActiveTab, theme, toggleTheme, isOpen, setIsOpen }: SidebarProps) {
  const navigate = useNavigate();
  const [showAdminModal, setShowAdminModal] = useState(false);

  const navItems = [
    { id: 'about', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>, label: 'Обо мне' },
    { id: 'projects', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>, label: 'Проекты' },
    { id: 'bots', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M12 7v6"/><path d="M9 10h6"/></svg>, label: 'Боты' },
    { id: 'regulation', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/></svg>, label: 'Регламент работ' },
    { id: 'certs', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><circle cx="12" cy="8" r="6"/><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/></svg>, label: 'Сертификаты' },
    { id: 'contacts', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>, label: 'Контакты' },
  ];

  return (
    <>
      {/* Mobile Overlay Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed md:sticky top-0 left-0 h-[100dvh] w-[260px] bg-[var(--bg-sidebar)] border-r border-[var(--border)] flex flex-col z-50 transition-transform duration-300 ease-in-out p-sidebar ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex-1 overflow-y-auto py-6">
          {/* Avatar Section */}
          <div className="relative w-[160px] h-[160px] mx-auto mt-[24px] mb-[14px] rounded-full border-[4px] border-[#FF6B2B] shadow-[0_0_25px_rgba(255,107,43,0.5),0_0_50px_rgba(255,107,43,0.2)] overflow-hidden">
            <img 
              src={IMAGES.photo} 
              alt="Бельтюгов Руслан"
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                e.currentTarget.parentElement!.innerHTML =
                  '<div style="width:100%;height:100%;background:linear-gradient(135deg,#FF6B2B,#4A9EFF);display:flex;align-items:center;justify-content:center;font-family:Orbitron,sans-serif;font-size:28px;font-weight:700;color:white;">БР</div>';
              }}
            />
            <div className="absolute bottom-[6px] right-[6px] w-[14px] h-[14px] bg-[#22C55E] border-2 border-[var(--bg-sidebar)] rounded-full z-10" />
          </div>
          
          <h2 className="font-orbitron text-[15px] font-bold text-[var(--text-main)] text-center mt-3">
            Бельтюгов Руслан
          </h2>
          <p className="font-dm text-[12px] italic text-[#FF6B2B] text-center tracking-wide mt-1">
            Дорогу осилит идущий
          </p>
          <p className="font-dm text-[12px] text-[var(--text-secondary)] text-center mt-2 mb-5">
            📍 Москва
          </p>

          {/* Navigation */}
          <nav className="px-4 flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center px-4 py-[10px] rounded-[10px] cursor-pointer transition-all duration-200 font-dm text-[14px] ${
                    isActive 
                      ? 'bg-[#FF6B2B]/15 text-[#FF6B2B] border-l-[3px] border-[#FF6B2B] font-semibold' 
                      : 'text-[var(--text-secondary)] hover:bg-[#FF6B2B]/10 hover:text-[var(--text-main)] border-l-[3px] border-transparent'
                  }`}
                >
                  <span style={{ fontSize: '18px', color: 'inherit', marginRight: '10px' }}>{item.icon}</span>
                  {item.label}
                </button>
              );
            })}

            {/* Admin Button */}
            <button
              onClick={() => setShowAdminModal(true)}
              className={`flex items-center px-4 py-[10px] rounded-[10px] cursor-pointer transition-all duration-200 font-dm text-[14px] text-[var(--text-secondary)] hover:bg-[#FF6B2B]/10 hover:text-[var(--text-main)] border-l-[3px] border-transparent`}
            >
              <span style={{ fontSize: '18px', color: 'inherit', marginRight: '10px' }}>⚙️</span>
              Администратор
            </button>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-[var(--border)]">
          <a
            href="/resume/index.html"
            target="_blank"
            className="w-full bg-[#FF6B2B] text-white font-orbitron text-[12px] py-[10px] rounded-lg hover:bg-[#e55a1f] transition-colors flex items-center justify-center gap-2 mb-3"
          >
            <Download size={14} />
            Смотреть резюме
          </a>
          
          <div className="flex justify-center gap-[10px]">
            <a href="#" className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[#FF6B2B] hover:border-[#FF6B2B] hover:scale-110 hover:shadow-[var(--glow)] transition-all">
              <Send size={14} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[#FF6B2B] hover:border-[#FF6B2B] hover:scale-110 hover:shadow-[var(--glow)] transition-all">
              <Github size={14} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[#FF6B2B] hover:border-[#FF6B2B] hover:scale-110 hover:shadow-[var(--glow)] transition-all">
              <Linkedin size={14} />
            </a>
            <button 
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:border-[var(--text-main)] hover:scale-110 transition-all ml-auto"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </div>
      </aside>

      {/* Admin Login Modal */}
      {showAdminModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center login-modal-backdrop"
          onClick={() => setShowAdminModal(false)}
        >
          <div
            className="login-modal relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAdminModal(false)}
              className="login-modal-close absolute top-3 right-3"
            >✕</button>

            <h2 className="login-modal-title flex items-center gap-2 mb-6">
              ⚙️ Панель управления
            </h2>

            <div className="mb-4">
              <label htmlFor="admin-email-input">Email</label>
              <input
                id="admin-email-input"
                type="email"
                placeholder="Email"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="admin-pass-input">Пароль</label>
              <input
                id="admin-pass-input"
                type="password"
                placeholder="Пароль"
              />
            </div>

            <div className="flex items-center gap-2 mb-4">
              <input type="checkbox" id="admin-remember" />
              <label htmlFor="admin-remember" className="remember-label !mb-0">
                Запомнить меня
              </label>
            </div>

            <div id="admin-error" className="text-[#EF4444] text-[13px] mb-3 hidden">
              Неверный email или пароль
            </div>

            <button
              className="btn-login"
              onClick={() => {
                const email = (document.getElementById('admin-email-input') as HTMLInputElement).value;
                const pass = (document.getElementById('admin-pass-input') as HTMLInputElement).value;
                const remember = (document.getElementById('admin-remember') as HTMLInputElement).checked;
                const errEl = document.getElementById('admin-error');
                const savedPassword = localStorage.getItem('admin_password') || '123456789';
                if (email === 'ruslan39kld@neurbiz.ru' && pass === savedPassword) {
                  if (remember) {
                    localStorage.setItem('admin_auth', 'true');
                  } else {
                    sessionStorage.setItem('admin_auth', 'true');
                  }
                  localStorage.setItem('admin_last_login', new Date().toLocaleString('ru-RU'));
                  setShowAdminModal(false);
                  navigate('/admin');
                } else {
                  if (errEl) errEl.style.display = 'block';
                }
              }}
            >
              Войти
            </button>
          </div>
        </div>
      )}
    </>
  );
}
