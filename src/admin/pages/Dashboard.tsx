import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, Eye, MousePointerClick, TrendingUp, BarChart2 } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface AnalyticsEvent {
  id: string;
  page: string;
  action: string;
  timestamp: number;
  device: string;
}

export default function Dashboard() {
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

  const today = new Date().toDateString();
  const todayVisits = events.filter(e => 
    new Date(e.timestamp).toDateString() === today && e.action === 'page_view'
  ).length;

  const totalVisits = events.filter(e => e.action === 'page_view').length;
  const botOpens = events.filter(e => 
    e.action === 'open_consultant' || e.action === 'open_trainer'
  ).length;
  const uniquePages = new Set(events.map(e => e.page)).size;

  // Generate last 7 days data
  const last7Days = Array.from({length: 7}, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toDateString();
  });

  const chartData = {
    labels: last7Days.map(d => new Date(d).toLocaleDateString('ru-RU', { weekday: 'short' })),
    datasets: [
      {
        label: 'Просмотры',
        data: last7Days.map(day => 
          events.filter(e => new Date(e.timestamp).toDateString() === day && e.action === 'page_view').length
        ),
        borderColor: '#F4621F',
        backgroundColor: 'rgba(244, 98, 31, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#FFFFFF',
        titleColor: '#1A1A1A',
        bodyColor: '#6C757D',
        borderColor: '#E9ECEF',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#E9ECEF' },
        ticks: { 
          color: '#6C757D',
          font: { size: 11 }
        }
      },
      x: {
        grid: { display: false },
        ticks: { 
          color: '#6C757D',
          font: { size: 11 }
        }
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold text-[var(--admin-text-main)] mb-1 tracking-tight">Дашборд</h1>
          <p className="text-[var(--admin-text-muted)] text-[14px]">Обзор активности вашего портфолио в реальном времени</p>
        </div>
        <div className="bg-white border border-[var(--admin-border)] px-4 py-2 rounded-xl flex items-center gap-3 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[var(--admin-text-muted)] text-[13px] font-medium">Система активна</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Визитов сегодня', value: todayVisits, icon: <Users size={22} />, color: '#F4621F' },
          { label: 'Всего визитов', value: totalVisits, icon: <Eye size={22} />, color: '#3B82F6' },
          { label: 'Открытий ботов', value: botOpens, icon: <MousePointerClick size={22} />, color: '#10B981' },
          { label: 'Страниц в базе', value: uniquePages, icon: <TrendingUp size={22} />, color: '#8B5CF6' }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="admin-stat-card group"
          >
            <div className="flex items-center justify-between mb-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
                style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
              >
                {stat.icon}
              </div>
              <div className="text-gray-200 group-hover:text-[var(--admin-accent)]/20 transition-colors">
                <TrendingUp size={24} />
              </div>
            </div>
            <h3 className="text-[var(--admin-text-muted)] text-[13px] font-bold uppercase tracking-wider mb-1">{stat.label}</h3>
            <p className="text-[32px] font-bold text-[var(--admin-text-main)] leading-none">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts & Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 admin-card">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[18px] font-bold text-[var(--admin-text-main)]">Активность за 7 дней</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[var(--admin-accent)]"></div>
                <span className="text-[var(--admin-text-muted)] text-[12px]">Просмотры</span>
              </div>
            </div>
          </div>
          <div className="h-[320px]">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="admin-card flex flex-col p-0 overflow-hidden">
          <div className="p-8 border-b border-[var(--admin-border)]">
            <h2 className="text-[18px] font-bold text-[var(--admin-text-main)]">Последние события</h2>
          </div>
          <div className="flex-1 p-6 space-y-4 overflow-y-auto custom-scrollbar max-h-[400px]">
            {events.slice(-15).reverse().map((e, i) => (
              <div key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className="w-2 h-2 mt-2 rounded-full bg-[var(--admin-accent)] group-hover:shadow-[0_0_8px_var(--admin-accent)] transition-all shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-bold text-[var(--admin-text-main)] truncate">
                    {e.page}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] text-[var(--admin-text-muted)] uppercase tracking-wider font-medium">{e.action}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-[11px] text-[var(--admin-text-muted)]">{new Date(e.timestamp).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
                <div className="text-[10px] text-gray-300 uppercase tracking-widest font-bold self-center">
                  {e.device}
                </div>
              </div>
            ))}
            {events.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 mb-4">
                  <BarChart2 size={24} />
                </div>
                <p className="text-[var(--admin-text-muted)] text-[14px]">Нет данных для отображения</p>
              </div>
            )}
          </div>
          <div className="p-4 border-t border-[var(--admin-border)]">
            <button className="w-full py-2 text-[var(--admin-text-muted)] text-[12px] font-bold uppercase tracking-widest hover:text-[var(--admin-accent)] transition-colors">
              Показать все события
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
