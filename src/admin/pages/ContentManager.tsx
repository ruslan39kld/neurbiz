import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Plus, Edit2, Trash2, X, Save, RefreshCw } from 'lucide-react';
import { certificates as defaultCertificates, projects as defaultProjects } from '../../data';
import { getSupabaseClient } from '../../services/supabaseClient';

function showNotification(message: string, type: 'success' | 'error' | 'info' = 'success') {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 24px;
    border-radius: 8px;
    background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
    color: white;
    font-weight: 600;
    font-size: 14px;
    z-index: 9999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    animation: slideIn 0.3s ease;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 2500);
}

const defaultReviews = [
  {
    id: '1',
    author: 'Иван Иванов',
    role: 'CEO, TechCorp',
    text: 'Отличная работа! Проект выполнен в срок и с высоким качеством.',
    rating: 5
  }
];

const defaultRegulations = [
  { id: 1, title: 'Регламент работ', video_url: 'https://vkvideo.ru/video-236823442_456239017' }
];

export default function ContentManager() {
  const [activeTab, setActiveTab] = useState('certificates');
  
  const tabs = [
    { id: 'certificates', label: 'Сертификаты' },
    { id: 'projects', label: 'Проекты' },
    { id: 'reviews', label: 'Отзывы' },
    { id: 'regulations', label: 'Регламент' }
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-[var(--text-main)] mb-8">Управление контентом</h1>

      <div className="flex gap-2 border-b border-[var(--border)] pb-4 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id 
                ? 'bg-[var(--accent)] text-white' 
                : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-main)] border border-[var(--border)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 p-card">
        {activeTab === 'certificates' && <CertificatesManager />}
        {activeTab === 'projects' && <ProjectsManager />}
        {activeTab === 'reviews' && <ReviewsManager />}
        {activeTab === 'regulations' && <RegulationsManager />}
      </div>
    </div>
  );
}

function CertificatesManager() {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);

  const loadCertificates = async () => {
    setIsLoading(true);
    const supabase = await getSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('year', { ascending: false })
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        setCertificates(data);
        setIsLoading(false);
        return;
      }
    }
    // Fallback: localStorage then defaultCertificates
    const saved = localStorage.getItem('portfolio_certificates');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) { setCertificates(parsed); setIsLoading(false); return; }
      } catch {}
    }
    setCertificates(defaultCertificates);
    setIsLoading(false);
  };

  useEffect(() => { loadCertificates(); }, []);

  const handleSave = async (item: any) => {
    if (!item.title?.trim()) {
      showNotification('Введите название сертификата', 'error');
      return;
    }
    const supabase = await getSupabaseClient();
    if (supabase) {
      if (editingItem) {
        const { error } = await supabase.from('certificates').update(item).eq('id', item.id);
        if (error) { showNotification('Ошибка сохранения: ' + error.message, 'error'); return; }
      } else {
        const { id: _id, ...itemWithoutId } = item;
        const { error } = await supabase.from('certificates').insert(itemWithoutId);
        if (error) { showNotification('Ошибка добавления: ' + error.message, 'error'); return; }
      }
      await loadCertificates();
    } else {
      let newItems;
      if (editingItem) {
        newItems = certificates.map(i => i.id === item.id ? item : i);
      } else {
        newItems = [{ ...item, id: Date.now().toString() }, ...certificates];
      }
      setCertificates(newItems);
      localStorage.setItem('portfolio_certificates', JSON.stringify(newItems));
    }
    setIsModalOpen(false);
    setEditingItem(null);
    sessionStorage.removeItem('cache_certificates');
    showNotification('✅ Сертификат сохранён!', 'success');
  };

  const handleDeleteCertificate = (id: string) => { setDeleteId(id); };

  const confirmDelete = async () => {
    if (!deleteId) return;
    const supabase = await getSupabaseClient();
    if (supabase) {
      const { error } = await supabase.from('certificates').delete().eq('id', deleteId);
      if (error) { showNotification('Ошибка удаления: ' + error.message, 'error'); setDeleteId(null); return; }
      await loadCertificates();
    } else {
      setCertificates(prev => {
        const updated = prev.filter(item => item.id !== deleteId);
        localStorage.setItem('portfolio_certificates', JSON.stringify(updated));
        return updated;
      });
    }
    sessionStorage.removeItem('cache_certificates');
    showNotification('🗑️ Сертификат удалён', 'info');
    setDeleteId(null);
  };

  const handleReset = () => { setIsResetting(true); };

  const confirmReset = async () => {
    const supabase = await getSupabaseClient();
    if (supabase) {
      const ids = certificates.map(c => c.id);
      if (ids.length > 0) {
        await supabase.from('certificates').delete().in('id', ids);
      }
      const certsToInsert = defaultCertificates.map(({ id: _id, ...rest }) => rest);
      await supabase.from('certificates').insert(certsToInsert);
      await loadCertificates();
    } else {
      localStorage.removeItem('portfolio_certificates');
      setCertificates(defaultCertificates);
    }
    sessionStorage.removeItem('cache_certificates');
    showNotification('Данные сброшены к дефолту', 'info');
    setIsResetting(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-[var(--text-main)]">Сертификаты</h2>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg flex items-center gap-2 hover:bg-gray-600 transition-colors text-sm"
            style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
          >
            <RefreshCw size={16} /> Сбросить
          </button>
          <button
            onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
            className="bg-[var(--accent)] hover:opacity-90 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
          >
            <Plus size={18} /> Добавить
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="py-8 text-center text-[var(--text-secondary)]">Загрузка...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--bg-primary)] text-[var(--text-secondary)]">
              <tr>
                <th className="px-4 py-3 font-medium">Название</th>
                <th className="px-4 py-3 font-medium">Организация</th>
                <th className="px-4 py-3 font-medium">Год</th>
                <th className="px-4 py-3 font-medium">Категория</th>
                <th className="px-4 py-3 font-medium text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {certificates.map(item => (
                <tr key={item.id} className="hover:bg-[var(--bg-primary)] transition-colors">
                  <td className="px-4 py-3 text-[var(--text-main)] font-medium">{item.title}</td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">{item.org}</td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">{item.year}</td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">{item.category}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => { setEditingItem(item); setIsModalOpen(true); }}
                        className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-main)] bg-[var(--bg-primary)] rounded-md"
                        style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDeleteCertificate(item.id);
                        }}
                        className="p-1.5 text-[#EF4444] hover:bg-[#EF4444]/10 rounded-md"
                        style={{ pointerEvents: 'auto', position: 'relative', zIndex: 50, cursor: 'pointer' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <Modal title={editingItem ? 'Редактировать сертификат' : 'Добавить сертификат'} onClose={() => setIsModalOpen(false)}>
          <CertificateForm initialData={editingItem} onSave={handleSave} />
        </Modal>
      )}
      <ConfirmModal isOpen={!!deleteId} title="Удаление" message="Удалить этот сертификат?" onConfirm={confirmDelete} onCancel={() => setDeleteId(null)} />
      <ConfirmModal isOpen={isResetting} title="Сброс данных" message="Сбросить все данные к значениям по умолчанию?" onConfirm={confirmReset} onCancel={() => setIsResetting(false)} />
    </div>
  );
}

function CertificateForm({ initialData, onSave }: { initialData: any, onSave: (data: any) => void | Promise<void> }) {
  const [formData, setFormData] = useState(initialData || { title: '', org: '', year: '', category: '', cert_url: '' });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSaving) return;
    setIsSaving(true);
    await onSave(formData);
    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Название</label>
        <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-main)] focus:ring-2 focus:ring-[var(--accent)] outline-none" />
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Организация</label>
        <input type="text" value={formData.org} onChange={e => setFormData({...formData, org: e.target.value})} className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-main)] focus:ring-2 focus:ring-[var(--accent)] outline-none" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Год</label>
          <input type="text" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-main)] focus:ring-2 focus:ring-[var(--accent)] outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Категория</label>
          <input type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-main)] focus:ring-2 focus:ring-[var(--accent)] outline-none" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--text-main)] mb-1">URL файла (PDF/IMG)</label>
        <input type="text" value={formData.cert_url} onChange={e => setFormData({...formData, cert_url: e.target.value})} className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-main)] focus:ring-2 focus:ring-[var(--accent)] outline-none" />
      </div>
      <div className="pt-4 flex justify-end">
        <button 
          type="submit" 
          disabled={isSaving}
          className={`bg-[var(--accent)] text-white px-4 py-2 rounded-lg flex items-center gap-2 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
          style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
        >
          <Save size={18} /> {isSaving ? 'Сохранение...' : 'Сохранить'}
        </button>
      </div>
    </form>
  );
}

function ProjectsManager() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);

  const loadProjects = async () => {
    setIsLoading(true);
    const supabase = await getSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('year', { ascending: false })
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        setProjects(data);
        setIsLoading(false);
        return;
      }
    }
    // Fallback: localStorage then defaultProjects
    const saved = localStorage.getItem('portfolio_projects');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) { setProjects(parsed); setIsLoading(false); return; }
      } catch {}
    }
    setProjects(defaultProjects);
    setIsLoading(false);
  };

  useEffect(() => { loadProjects(); }, []);

  const handleSave = async (item: any) => {
    if (!item.title?.trim()) {
      showNotification('Введите название проекта', 'error');
      return;
    }
    if (!item.description?.trim()) {
      showNotification('Введите описание проекта', 'error');
      return;
    }
    const supabase = await getSupabaseClient();
    if (supabase) {
      if (editingItem) {
        const { error } = await supabase.from('projects').update(item).eq('id', item.id);
        if (error) { showNotification('Ошибка сохранения: ' + error.message, 'error'); return; }
      } else {
        const { id: _id, ...itemWithoutId } = item;
        const { error } = await supabase.from('projects').insert(itemWithoutId);
        if (error) { showNotification('Ошибка добавления: ' + error.message, 'error'); return; }
      }
      await loadProjects();
    } else {
      let newItems;
      if (editingItem) {
        newItems = projects.map(i => i.id === item.id ? item : i);
      } else {
        newItems = [{ ...item, id: Date.now().toString() }, ...projects];
      }
      setProjects(newItems);
      localStorage.setItem('portfolio_projects', JSON.stringify(newItems));
    }
    setIsModalOpen(false);
    setEditingItem(null);
    sessionStorage.removeItem('cache_projects');
    showNotification('✅ Проект сохранён!', 'success');
  };

  const handleDeleteProject = (id: string) => { setDeleteId(id); };

  const confirmDelete = async () => {
    if (!deleteId) return;
    const supabase = await getSupabaseClient();
    if (supabase) {
      const { error } = await supabase.from('projects').delete().eq('id', deleteId);
      if (error) { showNotification('Ошибка удаления: ' + error.message, 'error'); setDeleteId(null); return; }
      await loadProjects();
    } else {
      setProjects(prev => {
        const updated = prev.filter(item => item.id !== deleteId);
        localStorage.setItem('portfolio_projects', JSON.stringify(updated));
        return updated;
      });
    }
    sessionStorage.removeItem('cache_projects');
    showNotification('🗑️ Проект удалён', 'info');
    setDeleteId(null);
  };

  const handleReset = () => { setIsResetting(true); };

  const confirmReset = async () => {
    const supabase = await getSupabaseClient();
    if (supabase) {
      const ids = projects.map(p => p.id);
      if (ids.length > 0) {
        await supabase.from('projects').delete().in('id', ids);
      }
      const projectsToInsert = defaultProjects.map(({ id: _id, ...rest }) => rest);
      await supabase.from('projects').insert(projectsToInsert);
      await loadProjects();
    } else {
      localStorage.removeItem('portfolio_projects');
      setProjects(defaultProjects);
    }
    sessionStorage.removeItem('cache_projects');
    showNotification('Данные сброшены к дефолту', 'info');
    setIsResetting(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-[var(--text-main)]">Проекты</h2>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg flex items-center gap-2 hover:bg-gray-600 transition-colors text-sm"
            style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
          >
            <RefreshCw size={16} /> Сбросить
          </button>
          <button
            onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
            className="bg-[var(--accent)] hover:opacity-90 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
          >
            <Plus size={18} /> Добавить
          </button>
        </div>
      </div>
      {isLoading ? (
        <div className="py-8 text-center text-[var(--text-secondary)]">Загрузка...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--bg-primary)] text-[var(--text-secondary)]">
              <tr>
                <th className="px-4 py-3 font-medium">Название</th>
                <th className="px-4 py-3 font-medium">Категория</th>
                <th className="px-4 py-3 font-medium">Год</th>
                <th className="px-4 py-3 font-medium text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {projects.map(item => (
                <tr key={item.id} className="hover:bg-[var(--bg-primary)] transition-colors">
                  <td className="px-4 py-3 text-[var(--text-main)] font-medium">{item.icon} {item.title}</td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">{item.category}</td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">{item.year}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => { setEditingItem(item); setIsModalOpen(true); }}
                        className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-main)] bg-[var(--bg-primary)] rounded-md"
                        style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDeleteProject(item.id);
                        }}
                        className="p-1.5 text-[#EF4444] hover:bg-[#EF4444]/10 rounded-md"
                        style={{ pointerEvents: 'auto', position: 'relative', zIndex: 50, cursor: 'pointer' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isModalOpen && (
        <Modal title={editingItem ? 'Редактировать проект' : 'Добавить проект'} onClose={() => setIsModalOpen(false)}>
          <ProjectForm initialData={editingItem} onSave={handleSave} />
        </Modal>
      )}
      <ConfirmModal isOpen={!!deleteId} title="Удаление" message="Удалить этот проект?" onConfirm={confirmDelete} onCancel={() => setDeleteId(null)} />
      <ConfirmModal isOpen={isResetting} title="Сброс данных" message="Сбросить все данные к значениям по умолчанию?" onConfirm={confirmReset} onCancel={() => setIsResetting(false)} />
    </div>
  );
}

function normalizeArray(value: any): any[] {
  if (Array.isArray(value)) return value;
  if (value == null) return [];
  if (typeof value === 'string') {
    try { const parsed = JSON.parse(value); return Array.isArray(parsed) ? parsed : []; } catch { return []; }
  }
  return [];
}

const DEFAULT_STATS = [
  { value: '', label: '' },
  { value: '', label: '' },
  { value: '', label: '' }
];

function ProjectForm({ initialData, onSave }: { initialData: any, onSave: (data: any) => void | Promise<void> }) {
  const normalized = initialData ? {
    ...initialData,
    tags: normalizeArray(initialData.tags),
    tasks: normalizeArray(initialData.tasks),
    stats: (() => {
      const s = normalizeArray(initialData.stats);
      return s.length > 0 ? s : DEFAULT_STATS;
    })(),
  } : null;

  const [formData, setFormData] = useState(normalized || {
    title: '',
    icon: '🚀',
    category: '',
    stage: 'MVP',
    description: '',
    detail: '',
    year: new Date().getFullYear(),
    tags: [],
    tasks: [],
    result: '',
    imageUrl: '',
    videoUrl: '',
    liveUrl: '',
    stats: DEFAULT_STATS
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSaving) return;
    setIsSaving(true);
    await onSave(formData);
    setIsSaving(false);
  };

  const handleStatChange = (index: number, field: 'value' | 'label', value: string) => {
    const newStats = [...formData.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setFormData({ ...formData, stats: newStats });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto px-1">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Иконка</label>
          <input required type="text" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-main)] focus:ring-2 focus:ring-[var(--accent)] outline-none" />
        </div>
        <div className="col-span-3">
          <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Название</label>
          <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-main)] focus:ring-2 focus:ring-[var(--accent)] outline-none" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Категория</label>
          <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-main)] focus:ring-2 focus:ring-[var(--accent)] outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Стадия</label>
          <select value={formData.stage} onChange={e => setFormData({...formData, stage: e.target.value})} className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-main)] focus:ring-2 focus:ring-[var(--accent)] outline-none">
            <option value="Продакшен">Продакшен</option>
            <option value="MVP">MVP</option>
            <option value="Прототипы">Прототипы</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Год</label>
          <input required type="number" value={formData.year} onChange={e => setFormData({...formData, year: parseInt(e.target.value)})} className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-main)] focus:ring-2 focus:ring-[var(--accent)] outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Результат</label>
          <input required type="text" value={formData.result} onChange={e => setFormData({...formData, result: e.target.value})} className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-main)] focus:ring-2 focus:ring-[var(--accent)] outline-none" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Краткое описание</label>
        <input required type="text" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-main)] focus:ring-2 focus:ring-[var(--accent)] outline-none" />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Подробное описание</label>
        <textarea required value={formData.detail} onChange={e => setFormData({...formData, detail: e.target.value})} className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-main)] focus:ring-2 focus:ring-[var(--accent)] outline-none h-24 resize-y" />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Технологии (через запятую)</label>
        <input type="text" value={formData.tags?.join(', ') || ''} onChange={e => setFormData({...formData, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)})} className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-main)] focus:ring-2 focus:ring-[var(--accent)] outline-none" />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Задачи (через точку с запятой)</label>
        <textarea value={formData.tasks?.join('; ') || formData.whatDone?.join('; ') || ''} onChange={e => setFormData({...formData, tasks: e.target.value.split(';').map(t => t.trim()).filter(Boolean)})} className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-main)] focus:ring-2 focus:ring-[var(--accent)] outline-none h-24 resize-y" placeholder="Что было сделано..." />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--text-main)] mb-1">URL изображения</label>
          <input type="text" value={formData.imageUrl || ''} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-main)] focus:ring-2 focus:ring-[var(--accent)] outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text-main)] mb-1">URL видео (VK)</label>
          <input type="text" value={formData.videoUrl || ''} onChange={e => setFormData({...formData, videoUrl: e.target.value})} className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-main)] focus:ring-2 focus:ring-[var(--accent)] outline-none" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-main)] mb-1">URL живого проекта</label>
        <input type="url" placeholder="https://..." value={formData.liveUrl || ''} onChange={e => setFormData({...formData, liveUrl: e.target.value})} className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-main)] focus:ring-2 focus:ring-[var(--accent)] outline-none" />
        <p className="text-xs text-[var(--text-secondary)] mt-1">Если задан — появится кнопка "Открыть проект"</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Статистика</label>
        <div className="space-y-3">
          {formData.stats.map((stat: any, i: number) => (
            <div key={i} className="grid grid-cols-2 gap-3">
              <input placeholder="Значение (напр. 100%)" type="text" value={stat.value} onChange={e => handleStatChange(i, 'value', e.target.value)} className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-main)] text-sm outline-none" />
              <input placeholder="Метка (напр. точность)" type="text" value={stat.label} onChange={e => handleStatChange(i, 'label', e.target.value)} className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-main)] text-sm outline-none" />
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button 
          type="submit" 
          disabled={isSaving}
          className={`bg-[var(--accent)] text-white px-4 py-2 rounded-lg flex items-center gap-2 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
          style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
        >
          <Save size={18} /> {isSaving ? 'Сохранение...' : 'Сохранить'}
        </button>
      </div>
    </form>
  );
}

function ReviewsManager() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_reviews');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setReviews(parsed);
        } else {
          setReviews(defaultReviews);
        }
      } catch (e) {
        setReviews(defaultReviews);
      }
    } else {
      setReviews(defaultReviews);
    }
  }, []);

  const handleSave = (item: any) => {
    if (!item.author?.trim()) {
      showNotification('Введите имя автора', 'error');
      return;
    }
    if (!item.text?.trim()) {
      showNotification('Введите текст отзыва', 'error');
      return;
    }

    let newItems;
    if (editingItem) {
      newItems = reviews.map(i => i.id === item.id ? item : i);
    } else {
      newItems = [{ ...item, id: Date.now().toString() }, ...reviews];
    }
    setReviews(newItems);
    localStorage.setItem('portfolio_reviews', JSON.stringify(newItems));
    setIsModalOpen(false);
    setEditingItem(null);
    showNotification('✅ Отзыв сохранён!', 'success');
  };

  const handleDeleteReview = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    setReviews(prev => {
      const updated = prev.filter(item => item.id !== deleteId);
      localStorage.setItem('portfolio_reviews', JSON.stringify(updated));
      return updated;
    });
    showNotification('🗑️ Отзыв удалён', 'info');
    setDeleteId(null);
  };

  const handleReset = () => {
    setIsResetting(true);
  };

  const confirmReset = () => {
    localStorage.removeItem('portfolio_reviews');
    setReviews(defaultReviews);
    showNotification('Данные сброшены к дефолту', 'info');
    setIsResetting(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-[var(--text-main)]">Отзывы</h2>
        <div className="flex gap-2">
          <button 
            onClick={handleReset}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg flex items-center gap-2 hover:bg-gray-600 transition-colors text-sm"
            style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
          >
            <RefreshCw size={16} /> Сбросить
          </button>
          <button 
            onClick={() => { setEditingItem(null); setIsModalOpen(true); }} 
            className="bg-[var(--accent)] hover:opacity-90 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
          >
            <Plus size={18} /> Добавить
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[var(--bg-primary)] text-[var(--text-secondary)]">
            <tr>
              <th className="px-4 py-3 font-medium">Автор</th>
              <th className="px-4 py-3 font-medium">Должность</th>
              <th className="px-4 py-3 font-medium">Текст</th>
              <th className="px-4 py-3 font-medium text-right">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {reviews.map(item => (
              <tr key={item.id} className="hover:bg-[var(--bg-primary)] transition-colors">
                <td className="px-4 py-3 text-[var(--text-main)] font-medium">{item.author}</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">{item.role}</td>
                <td className="px-4 py-3 text-[var(--text-secondary)] truncate max-w-[200px]">{item.text}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => { setEditingItem(item); setIsModalOpen(true); }} 
                      className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-main)] bg-[var(--bg-primary)] rounded-md"
                      style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      type="button"
                      onClick={(e) => { 
                        e.preventDefault();
                        e.stopPropagation(); 
                        handleDeleteReview(item.id); 
                      }} 
                      className="p-1.5 text-[#EF4444] hover:bg-[#EF4444]/10 rounded-md"
                      style={{ pointerEvents: 'auto', position: 'relative', zIndex: 50, cursor: 'pointer' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {reviews.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-[var(--text-secondary)]">Нет отзывов</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <Modal title={editingItem ? 'Редактировать отзыв' : 'Добавить отзыв'} onClose={() => setIsModalOpen(false)}>
          <ReviewForm initialData={editingItem} onSave={handleSave} />
        </Modal>
      )}
      <ConfirmModal isOpen={!!deleteId} title="Удаление" message="Удалить этот отзыв?" onConfirm={confirmDelete} onCancel={() => setDeleteId(null)} />
      <ConfirmModal isOpen={isResetting} title="Сброс данных" message="Сбросить все данные к значениям по умолчанию?" onConfirm={confirmReset} onCancel={() => setIsResetting(false)} />
    </div>
  );
}

function ReviewForm({ initialData, onSave }: { initialData: any, onSave: (data: any) => void }) {
  const [formData, setFormData] = useState(initialData || { author: '', role: '', text: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Автор</label>
        <input required type="text" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-main)] focus:ring-2 focus:ring-[var(--accent)] outline-none" />
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Должность/Компания</label>
        <input required type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-main)] focus:ring-2 focus:ring-[var(--accent)] outline-none" />
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Текст отзыва</label>
        <textarea required value={formData.text} onChange={e => setFormData({...formData, text: e.target.value})} className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-main)] focus:ring-2 focus:ring-[var(--accent)] outline-none h-24 resize-y" />
      </div>
      <div className="pt-4 flex justify-end">
        <button 
          type="submit" 
          className="bg-[var(--accent)] text-white px-4 py-2 rounded-lg flex items-center gap-2"
          style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
        >
          <Save size={18} /> Сохранить
        </button>
      </div>
    </form>
  );
}

function RegulationsManager() {
  const [items, setItems] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_regulations');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        } else {
          setItems(defaultRegulations);
        }
      } catch (e) {
        setItems(defaultRegulations);
      }
    } else {
      setItems(defaultRegulations);
    }
  }, []);

  const handleSave = (item: any) => {
    if (!item.title?.trim()) {
      showNotification('Введите название регламента', 'error');
      return;
    }

    let newItems;
    if (editingItem) {
      newItems = items.map(i => i.id === item.id ? item : i);
    } else {
      newItems = [{ ...item, id: Date.now().toString() }, ...items];
    }
    setItems(newItems);
    localStorage.setItem('portfolio_regulations', JSON.stringify(newItems));
    setIsModalOpen(false);
    setEditingItem(null);
    showNotification('✅ Регламент сохранён!', 'success');
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    const newItems = items.filter(i => i.id !== deleteId);
    localStorage.setItem('portfolio_regulations', JSON.stringify(newItems));
    setItems(newItems);
    showNotification('🗑️ Регламент удалён', 'info');
    setDeleteId(null);
  };

  const handleReset = () => {
    setIsResetting(true);
  };

  const confirmReset = () => {
    localStorage.removeItem('portfolio_regulations');
    setItems(defaultRegulations);
    showNotification('Данные сброшены к дефолту', 'info');
    setIsResetting(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-[var(--text-main)]">Регламент</h2>
        <div className="flex gap-2">
          <button 
            onClick={handleReset}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg flex items-center gap-2 hover:bg-gray-600 transition-colors text-sm"
            style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
          >
            <RefreshCw size={16} /> Сбросить
          </button>
          <button 
            onClick={() => { setEditingItem(null); setIsModalOpen(true); }} 
            className="bg-[var(--accent)] hover:opacity-90 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
          >
            <Plus size={18} /> Добавить
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[var(--bg-primary)] text-[var(--text-secondary)]">
            <tr>
              <th className="px-4 py-3 font-medium">Название</th>
              <th className="px-4 py-3 font-medium">URL видео</th>
              <th className="px-4 py-3 font-medium text-right">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {items.map(item => (
              <tr key={item.id} className="hover:bg-[var(--bg-primary)] transition-colors">
                <td className="px-4 py-3 text-[var(--text-main)] font-medium">{item.title}</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">{item.video_url}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => { setEditingItem(item); setIsModalOpen(true); }} 
                      className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-main)] bg-[var(--bg-primary)] rounded-md"
                      style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      type="button"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDelete(item.id); }} 
                      className="p-1.5 text-[#EF4444] hover:bg-[#EF4444]/10 rounded-md"
                      style={{ pointerEvents: 'auto', position: 'relative', zIndex: 50, cursor: 'pointer' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <Modal title={editingItem ? 'Редактировать регламент' : 'Добавить регламент'} onClose={() => setIsModalOpen(false)}>
          <RegulationForm initialData={editingItem} onSave={handleSave} />
        </Modal>
      )}
      <ConfirmModal isOpen={!!deleteId} title="Удаление" message="Удалить этот регламент?" onConfirm={confirmDelete} onCancel={() => setDeleteId(null)} />
      <ConfirmModal isOpen={isResetting} title="Сброс данных" message="Сбросить все данные к значениям по умолчанию?" onConfirm={confirmReset} onCancel={() => setIsResetting(false)} />
    </div>
  );
}

function RegulationForm({ initialData, onSave }: { initialData: any, onSave: (data: any) => void }) {
  const [formData, setFormData] = useState(initialData || { title: '', video_url: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Название</label>
        <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-main)] focus:ring-2 focus:ring-[var(--accent)] outline-none" />
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--text-main)] mb-1">URL видео</label>
        <input required type="text" value={formData.video_url} onChange={e => setFormData({...formData, video_url: e.target.value})} className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-main)] focus:ring-2 focus:ring-[var(--accent)] outline-none" />
      </div>
      <div className="pt-4 flex justify-end">
        <button 
          type="submit" 
          className="bg-[var(--accent)] text-white px-4 py-2 rounded-lg flex items-center gap-2"
          style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
        >
          <Save size={18} /> Сохранить
        </button>
      </div>
    </form>
  );
}

function Modal({ title, onClose, children }: { title: string, onClose: () => void, children: React.ReactNode }) {
  return createPortal(
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', background: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      <div
        style={{ position: 'relative', width: '100%', maxWidth: '32rem', background: 'var(--bg-card)', borderRadius: '12px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', overflow: 'hidden', border: '1px solid var(--border)' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderBottom: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-main)', margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', padding: '4px' }}>
            <X size={20} />
          </button>
        </div>
        <div style={{ padding: '16px' }}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }: { isOpen: boolean, title: string, message: string, onConfirm: () => void, onCancel: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-[var(--bg-card)] rounded-xl shadow-2xl w-full max-w-sm overflow-hidden border border-[var(--border)] p-6">
        <h3 className="text-lg font-bold text-[var(--text-main)] mb-2">{title}</h3>
        <p className="text-[var(--text-secondary)] mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg font-medium bg-[var(--bg-primary)] text-[var(--text-main)] hover:bg-[var(--border)] transition-colors">
            Отмена
          </button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-lg font-medium bg-[#EF4444] text-white hover:bg-[#DC2626] transition-colors">
            Подтвердить
          </button>
        </div>
      </div>
    </div>
  );
}
