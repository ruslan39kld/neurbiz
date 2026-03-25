import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import ContentManager from './pages/ContentManager';
import BotsSettings from './pages/BotsSettings';
import ApiKeys from './pages/ApiKeys';
import Security from './pages/Security';
import AdminSidebar from './components/AdminSidebar';

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('admin_auth') === 'true' || sessionStorage.getItem('admin_auth') === 'true';
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Apply admin theme
    document.documentElement.classList.add('admin-theme');
    
    return () => {
      document.documentElement.classList.remove('admin-theme');
    };
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
    sessionStorage.removeItem('admin_auth');
    navigate('/');
  };

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="admin-layout">
      <AdminSidebar onLogout={handleLogout} currentPath={location.pathname} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <main className={`admin-content ${isSidebarOpen ? 'open' : ''}`}>
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between mb-6 p-4 bg-white rounded-xl border border-[var(--admin-border)] shadow-sm">
          <h1 className="text-[16px] font-bold text-[var(--admin-accent)] tracking-tighter">
            ADMIN PANEL
          </h1>
          <button onClick={() => setIsSidebarOpen(true)} className="text-[var(--admin-text-muted)] hover:text-[var(--admin-accent)] transition-colors">
            <Menu size={24} />
          </button>
        </div>
        
        <Routes>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/content" element={<ContentManager />} />
          <Route path="/admin/bots" element={<BotsSettings />} />
          <Route path="/admin/api-keys" element={<ApiKeys />} />
          <Route path="/admin/security" element={<Security />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </main>
    </div>
  );
}
