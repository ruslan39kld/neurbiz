import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { LayoutDashboard, BarChart2, Bot, Key, Shield, LogOut, Menu, X, FileEdit } from 'lucide-react';

interface AdminSidebarProps {
  onLogout: () => void;
  currentPath: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function AdminSidebar({ onLogout, currentPath, isOpen, setIsOpen }: AdminSidebarProps) {
  const navItems = [
    { path: '/admin', label: 'Дашборд', icon: <LayoutDashboard size={20} /> },
    { path: '/admin/analytics', label: 'Аналитика страниц', icon: <BarChart2 size={20} /> },
    { path: '/admin/content', label: 'Контент', icon: <FileEdit size={20} /> },
    { path: '/admin/bots', label: 'Настройки ботов', icon: <Bot size={20} /> },
    { path: '/admin/api-keys', label: 'API Ключи', icon: <Key size={20} /> },
    { path: '/admin/security', label: 'Безопасность', icon: <Shield size={20} /> },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <aside className={`admin-sidebar transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-8 border-b border-[var(--admin-border)]">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-[18px] font-bold tracking-tighter text-[var(--admin-accent)]">
              ADMIN PANEL
            </h1>
            <button className="lg:hidden text-[var(--admin-text-muted)] hover:text-[var(--admin-accent)]" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--admin-accent)]/10 border border-[var(--admin-accent)]/20 flex items-center justify-center text-[var(--admin-accent)] font-bold">
              РБ
            </div>
            <div>
              <p className="text-[14px] font-bold text-[var(--admin-text-main)] leading-none">Руслан Б.</p>
              <p className="text-[11px] text-[var(--admin-text-muted)] mt-1 uppercase tracking-wider font-medium">Administrator</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-6 overflow-y-auto custom-scrollbar">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`admin-nav-item ${isActive ? 'active' : ''}`}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="active-nav-indicator"
                        className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--admin-accent)] shadow-[0_0_10px_rgba(244,98,31,0.3)]"
                      />
                    )}
                    <span className={`${isActive ? 'text-[var(--admin-accent)]' : 'text-inherit group-hover:text-[var(--admin-accent)] transition-colors'}`}>
                      {item.icon}
                    </span>
                    <span className="text-[14px] font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-6 border-t border-[var(--admin-border)]">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-[var(--admin-text-muted)] hover:bg-red-50/50 hover:text-red-500 rounded-xl transition-all group"
          >
            <LogOut size={18} className="group-hover:rotate-12 transition-transform" />
            <span className="text-[14px] font-medium">Выйти из системы</span>
          </button>
        </div>
      </aside>
    </>
  );
}
