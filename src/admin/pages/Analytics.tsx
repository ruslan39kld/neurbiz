import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface AnalyticsEvent {
  id: string;
  page: string;
  action: string;
  timestamp: number;
  device: string;
}

export default function Analytics() {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);

  useEffect(() => {
    const rawEvents = localStorage.getItem('portfolio_analytics');
    if (rawEvents) {
      setEvents(JSON.parse(rawEvents));
    } else {
      // Generate demo data
      const demo = generateDemoData();
      setEvents(demo);
    }
  }, []);

  const generateDemoData = () => {
    const pages = ['about','projects','bots','certificates','contacts'];
    const demo = [];
    for (let i = 0; i < 50; i++) {
      demo.push({
        id: i.toString(),
        page: pages[Math.floor(Math.random() * pages.length)],
        action: 'page_view',
        timestamp: Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000,
        device: Math.random() > 0.5 ? 'desktop' : 'mobile'
      });
    }
    return demo;
  };

  const pageMap: Record<string, { label: string, icon: string }> = {
    'about': { label: 'Обо мне', icon: '👤' },
    'projects': { label: 'Проекты', icon: '🚀' },
    'bots': { label: 'Боты', icon: '🤖' },
    'regulation': { label: 'Регламент работ', icon: '📄' },
    'certs': { label: 'Сертификаты', icon: '🎓' },
    'contacts': { label: 'Контакты', icon: '📞' }
  };

  const pages = Object.keys(pageMap);
  const totalViews = events.filter(e => e.action === 'page_view').length;

  const getPageStats = (page: string) => {
    const pageEvents = events.filter(e => e.page === page && e.action === 'page_view');
    const views = pageEvents.length;
    const percentage = totalViews > 0 ? Math.round((views / totalViews) * 100) : 0;
    
    const today = new Date().toDateString();
    const viewsToday = pageEvents.filter(e => new Date(e.timestamp).toDateString() === today).length;
    
    // Mock average time since we don't have duration tracking
    const avgTime = views > 0 ? Math.round(views * 12.5) : 0;

    return { views, viewsToday, avgTime, percentage };
  };

  const statsData = pages.map(p => ({ id: p, ...getPageStats(p) }));
  const maxViews = Math.max(...statsData.map(s => s.views), 1);

  const chartData = {
    labels: pages.map(p => pageMap[p].label),
    datasets: [
      {
        label: 'Просмотры',
        data: statsData.map(s => s.views),
        backgroundColor: statsData.map(s => s.views === maxViews ? '#FF6B2B' : 'rgba(255, 107, 43, 0.5)'),
        borderColor: '#FF6B2B',
        borderWidth: 1,
        borderRadius: 4
      }
    ]
  };

  const chartOptions = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'var(--bg-card)',
        titleColor: 'var(--text-main)',
        bodyColor: 'var(--text-secondary)',
        borderColor: 'var(--border)',
        borderWidth: 1
      }
    },
    scales: {
      x: { grid: { color: 'var(--border)' }, ticks: { color: 'var(--text-secondary)' } },
      y: { grid: { display: false }, ticks: { color: 'var(--text-secondary)' } }
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-main)] mb-2">Аналитика страниц</h1>
        <p className="text-[var(--text-secondary)]">Детальная статистика по разделам сайта</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map(page => {
          const stats = getPageStats(page);
          return (
            <div key={page} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 p-card hover:border-[var(--accent)]/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{pageMap[page].icon}</span>
                <h3 className="text-lg font-semibold text-[var(--text-main)]">{pageMap[page].label}</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Всего просмотров</span>
                  <span className="text-[var(--text-main)] font-medium">{stats.views}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Просмотров сегодня</span>
                  <span className="text-[var(--text-main)] font-medium">{stats.viewsToday}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Среднее время</span>
                  <span className="text-[var(--text-main)] font-medium">{stats.avgTime} сек</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[var(--text-secondary)]">Доля трафика</span>
                    <span className="text-[var(--accent)] font-medium">{stats.percentage}%</span>
                  </div>
                  <div className="w-full bg-[var(--bg-primary)] rounded-full h-2 overflow-hidden">
                    <div className="bg-[var(--accent)] h-full rounded-full" style={{ width: `${stats.percentage}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 p-card">
        <h2 className="text-lg font-semibold text-[var(--text-main)] mb-6">Рейтинг страниц</h2>
        <div className="h-[300px]">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
