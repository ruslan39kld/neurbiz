import React, { useState } from 'react';
import { Lock, ShieldCheck, LogOut } from 'lucide-react';

export default function Security() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [autoLogin, setAutoLogin] = useState(() => localStorage.getItem('admin_auth') === 'true');
  const [message, setMessage] = useState({ text: '', type: '' });

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    const savedPassword = localStorage.getItem('admin_password') || '123456789';
    if (currentPassword !== savedPassword) {
      setMessage({ text: 'Неверный текущий пароль', type: 'error' });
      return;
    }
    if (newPassword.length < 8) {
      setMessage({ text: 'Новый пароль должен содержать минимум 8 символов', type: 'error' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage({ text: 'Пароли не совпадают', type: 'error' });
      return;
    }

    localStorage.setItem('admin_password', newPassword);
    setMessage({ text: 'Пароль успешно изменён', type: 'success' });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const handleAutoLoginToggle = () => {
    const newValue = !autoLogin;
    setAutoLogin(newValue);
    if (newValue) {
      localStorage.setItem('admin_auth', 'true');
    } else {
      localStorage.removeItem('admin_auth');
    }
  };

  const handleLogoutAll = () => {
    localStorage.removeItem('admin_auth');
    sessionStorage.removeItem('admin_auth');
    window.location.href = '/';
  };

  const getPasswordStrength = (pass: string) => {
    if (pass.length === 0) return { label: '', color: 'bg-transparent' };
    if (pass.length < 8) return { label: 'Слабый', color: 'bg-[#EF4444]' };
    if (pass.length >= 8 && /[A-Z]/.test(pass) && /[0-9]/.test(pass)) return { label: 'Сильный', color: 'bg-[#22C55E]' };
    return { label: 'Средний', color: 'bg-[#F59E0B]' };
  };

  const strength = getPasswordStrength(newPassword);

  return (
    <div className="space-y-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-[var(--text-main)] mb-8">🔒 Безопасность</h1>

      {message.text && (
        <div className={`px-4 py-3 rounded-lg text-sm flex items-center gap-2 animate-fade-in ${
          message.type === 'success' 
            ? 'bg-[#22C55E]/10 border border-[#22C55E] text-[#22C55E]' 
            : 'bg-[#EF4444]/10 border border-[#EF4444] text-[#EF4444]'
        }`}>
          <span className={`w-2 h-2 rounded-full ${message.type === 'success' ? 'bg-[#22C55E]' : 'bg-[#EF4444]'}`}></span>
          {message.text}
        </div>
      )}

      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 p-card">
        <h2 className="text-xl font-semibold text-[var(--text-main)] flex items-center gap-2 mb-6 border-b border-[var(--border)] pb-4">
          <Lock size={20} className="text-[var(--accent)]" />
          Смена пароля
        </h2>

        <form onSubmit={handlePasswordChange} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Текущий пароль</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Новый пароль (мин. 8 символов)</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
              required
            />
            {newPassword.length > 0 && (
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-300 ${strength.color}`} style={{ width: strength.label === 'Слабый' ? '33%' : strength.label === 'Средний' ? '66%' : '100%' }}></div>
                </div>
                <span className={`text-xs font-medium ${strength.color.replace('bg-', 'text-')}`}>{strength.label}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Подтвердить новый пароль</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-[var(--accent)] hover:opacity-90 text-white font-medium py-2.5 px-6 rounded-lg transition-all shadow-lg flex items-center gap-2"
          >
            <ShieldCheck size={18} /> Изменить пароль
          </button>
        </form>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 p-card">
        <h2 className="text-xl font-semibold text-[var(--text-main)] flex items-center gap-2 mb-6 border-b border-[var(--border)] pb-4">
          <LogOut size={20} className="text-[#EF4444]" />
          Настройки сессии
        </h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[var(--text-main)] font-medium">Автовход</h3>
              <p className="text-sm text-[var(--text-secondary)] mt-1">Сохранять сессию при закрытии браузера</p>
            </div>
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input type="checkbox" className="sr-only" checked={autoLogin} onChange={handleAutoLoginToggle} />
                <div className={`block w-10 h-6 rounded-full transition-colors ${autoLogin ? 'bg-[#22C55E]' : 'bg-[var(--border)]'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform shadow-sm ${autoLogin ? 'transform translate-x-4' : ''}`}></div>
              </div>
            </label>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
            <div>
              <h3 className="text-[var(--text-main)] font-medium">Активные сессии</h3>
              <p className="text-sm text-[var(--text-secondary)] mt-1">Последний вход: {localStorage.getItem('admin_last_login') || new Date().toLocaleString('ru-RU')}</p>
            </div>
            <button
              onClick={handleLogoutAll}
              className="bg-[#EF4444]/10 hover:bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/20 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <LogOut size={16} /> Завершить все сессии
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
