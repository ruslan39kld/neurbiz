import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { VIDEOS, vkEmbedUrl } from '../data';
import SectionTitle from './SectionTitle';

const STAGES = [
  {
    id: 'database',
    number: '01',
    icon: '🗄️',
    title: 'База данных — сбор и подготовка данных',
    description: 'Определяются источники данных для проекта. Данные собираются, структурируются и готовятся к обработке. Прописывается сценарий: какие данные нужны, в каком формате, как они будут использоваться системой.',
    includes: [
      'Аудит существующих данных заказчика',
      'Парсинг и сбор данных из источников',
      'Разметка и структурирование базы знаний',
      'Написание технического задания (ТЗ)',
      'Согласование сценариев работы системы'
    ],
    badge: { text: 'ТЗ + структурированная база данных', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' }
  },
  {
    id: 'prototype',
    number: '02',
    icon: '⚡',
    title: 'Прототип — первая рабочая версия',
    description: 'На основе ТЗ создаётся первый рабочий прототип. Реализуется базовый функционал: интерфейс, логика, интеграции. Продукт тестируется заказчиком и реальными пользователями — собирается обратная связь.',
    includes: [
      'Разработка прототипа через Vibe Coding',
      'Базовый UI и логика взаимодействия',
      'Первичное тестирование функционала',
      'Сбор обратной связи от пользователей',
      'Фиксация ошибок и замечаний'
    ],
    badge: { text: 'Рабочий прототип за 1-3 дня', color: 'bg-orange-100 text-orange-700 border-orange-200' }
  },
  {
    id: 'refinement',
    number: '03',
    icon: '🔧',
    title: 'Доработка — расширение и улучшение',
    description: 'По результатам тестирования прототипа добавляется новый функционал, исправляются ошибки, улучшается UX. Задача этапа — довести продукт до требуемого качества и полноты функций перед финальным запуском.',
    includes: [
      'Устранение ошибок и замечаний из тестирования',
      'Расширение функционала до полного ТЗ',
      'Оптимизация скорости и точности работы',
      'Повторное тестирование с пользователями',
      'Финальное согласование с заказчиком'
    ],
    badge: { text: 'Продукт готов к запуску', color: 'bg-blue-100 text-blue-700 border-blue-200' }
  },
  {
    id: 'production',
    number: '04',
    icon: '🚀',
    title: 'Продакшен — запуск и сопровождение',
    description: 'Готовый продукт разворачивается в боевой среде. Настраивается хостинг, домен, резервное копирование. Заказчик получает работающую систему, документацию и инструкцию по использованию.',
    includes: [
      'Деплой на сервер (Amvera, VPS, Telegram)',
      'Настройка домена и SSL',
      'Документация и инструкция для пользователей',
      'Обучение команды заказчика',
      'Техническая поддержка после запуска'
    ],
    badge: { text: 'Система работает в продакшене', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' }
  }
];

export default function RegulationPage({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  const [regulations, setRegulations] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_regulations');
    if (saved) {
      setRegulations(JSON.parse(saved));
    } else {
      setRegulations([
        { id: 1, title: 'Регламент работ', video_url: VIDEOS.regulation }
      ]);
    }
  }, []);

  return (
    <div className="px-[20px] py-[24px] md:px-[32px] md:py-[32px] lg:px-[72px] lg:py-[56px] max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* БЛОК 1 */}
        <div className="mb-20">
          <SectionTitle>РЕГЛАМЕНТ РАБОТ</SectionTitle>
          <p className="font-dm text-[16px] text-[var(--text-secondary)] mb-8">
            Как формируется и реализуется AI-проект
          </p>

          <div className="space-y-8">
            {regulations.map((reg) => (
              <div key={reg.id} className="border border-[var(--border)] rounded-[16px] overflow-hidden shadow-sm max-w-4xl bg-[var(--bg-card)]">
                <div className="bg-[#FF6B35] text-white text-center py-3 px-6 font-orbitron text-[16px] font-bold tracking-[1px] flex items-center justify-center gap-2 animate-blink-panel">
                  <span>⚠</span> ОБЯЗАТЕЛЬНО К ПРОСМОТРУ
                </div>
                <div className="relative pb-[56.25%] h-0 bg-black">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={vkEmbedUrl(reg.video_url)}
                    frameBorder="0"
                    allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ))}
          </div>
          
          <p className="font-dm text-[14px] text-[var(--text-secondary)] mt-6 max-w-4xl leading-relaxed">
            Видео показывает методику работы предприятия: как ставятся задачи, контролируется исполнение и принимается результат. Это рабочая основа, в которую AI встраивается на каждом этапе — усиливая процессы, а не заменяя их.
          </p>
        </div>

        {/* БЛОК 2 */}
        <div>
          <SectionTitle>ЭТАПЫ ФОРМИРОВАНИЯ AI-ПРОЕКТА</SectionTitle>
          <p className="font-dm text-[16px] text-[var(--text-secondary)] mb-12">
            От задачи заказчика до работающего продукта в продакшене
          </p>

          <div className="relative max-w-4xl">
            {/* Вертикальная линия */}
            <div className="absolute left-[19px] top-4 bottom-4 w-[3px] bg-[#FF6B35] rounded-full hidden md:block"></div>

            <div className="space-y-12">
              {STAGES.map((stage, index) => (
                <motion.div 
                  key={stage.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative flex flex-col md:flex-row gap-6 md:gap-10 group"
                >
                  {/* Кружок с номером */}
                  <div className="hidden md:flex shrink-0 w-[40px] h-[40px] bg-[#FF6B35] rounded-full items-center justify-center font-orbitron font-bold text-white text-[16px] z-10 shadow-[0_0_10px_rgba(255,107,53,0.4)]">
                    {stage.number}
                  </div>

                  {/* Мобильный номер (показывается только на маленьких экранах) */}
                  <div className="md:hidden flex items-center gap-3 mb-2">
                    <div className="w-[32px] h-[32px] bg-[#FF6B35] rounded-full flex items-center justify-center font-orbitron font-bold text-white text-[14px] shadow-md">
                      {stage.number}
                    </div>
                    <span className="font-orbitron font-bold text-[#FF6B35] uppercase tracking-wider text-[14px]">Этап {stage.number}</span>
                  </div>

                  {/* Карточка */}
                  <div className="flex-1 bg-[var(--bg-card)] border border-[var(--border)] rounded-[12px] p-6 md:p-8 shadow-sm hover:shadow-md hover:border-[#FF6B35]/30 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-[40px] h-[40px] bg-[#FF6B35] rounded-[10px] flex items-center justify-center text-[20px] shadow-sm shrink-0">
                        {stage.icon}
                      </div>
                      <h3 className="font-orbitron text-[18px] md:text-[20px] font-bold text-[var(--text-main)]">
                        {stage.title}
                      </h3>
                    </div>

                    <p className="font-dm text-[14px] text-[var(--text-secondary)] mb-6 leading-relaxed">
                      {stage.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="font-dm text-[13px] font-bold text-[var(--text-main)] uppercase tracking-wider mb-3">
                        Что входит:
                      </h4>
                      <ul className="space-y-2">
                        {stage.includes.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 font-dm text-[13px] text-[var(--text-secondary)]">
                            <span className="shrink-0 mt-0.5">✅</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={`inline-block px-4 py-1.5 rounded-[20px] font-dm text-[13px] font-bold border ${stage.badge.color}`}>
                      {stage.badge.text}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Финальный блок */}
          <div className="mt-16 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] rounded-[24px] px-[40px] py-[24px] text-center shadow-lg animate-pulse-orange"
            >
              <h3 className="font-orbitron text-[20px] md:text-[24px] font-bold text-white mb-0">
                Средний срок от идеи до продакшена: 2-4 недели
              </h3>
            </motion.div>
          </div>

          {/* БЛОК 3: ВАЖНО */}
          <div className="mt-24">
            <SectionTitle>ВАЖНО</SectionTitle>
            <p className="font-dm text-[16px] text-[var(--text-secondary)] mb-12">
              Два принципа, на которых строится каждый проект
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Карточка 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[var(--bg-card)] border-l-4 border-[#FF6B35] rounded-[12px] p-8 shadow-sm flex flex-col"
              >
                <div className="w-full mb-6 overflow-hidden rounded-[8px]" style={{ aspectRatio: '1 / 1' }}>
                  <img
                    src="https://fszyqkfwggdcmuywtzhp.supabase.co/storage/v1/object/public/portfolio/ai%20logika.JPG"
                    alt="AI-Логика проекта"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[24px]">🧠</span>
                  <h3 className="font-orbitron text-[20px] font-bold text-[#FF6B35]">
                    AI-Логика проекта
                  </h3>
                </div>
                <div className="font-dm text-[16px] text-[var(--text-main)] leading-[1.7] mb-8 flex-1">
                  <p className="mb-4">Регламент — это не шаблон. Это живая система.</p>
                  <p className="mb-4">В основе каждого проекта лежат два вопроса:</p>
                  <ul className="mb-4 space-y-2">
                    <li className="flex gap-2"><span>→</span><span>Где мы находимся сейчас?</span></li>
                    <li className="flex gap-2"><span>→</span><span>Куда мы хотим прийти?</span></li>
                  </ul>
                  <p className="mb-4">Всё между этими точками — логика и стратегические шаги. Когда понимаешь вектор движения, маховик начинает раскручиваться сам: гибкое ТЗ → итерационная разработка → масштабирование.</p>
                  <p>Новые задачи не ломают систему — они встраиваются в логику проекта. Для старта первого прототипа можно взять любой действующий проект как фундамент — изменив логику и подход под новую задачу.</p>
                </div>
                <button
                  onClick={() => setActiveTab && setActiveTab('projects')}
                  className="w-full bg-[#FF6B35] text-white font-bold text-[15px] py-[14px] rounded-[8px] hover:bg-[#e55a1f] hover:shadow-md transition-all duration-200"
                >
                  📁 Посмотреть проекты
                </button>
              </motion.div>

              {/* Карточка 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-[var(--bg-card)] border-l-4 border-[#FF6B35] rounded-[12px] p-8 shadow-sm flex flex-col"
              >
                <div className="w-full mb-6 overflow-hidden rounded-[8px]" style={{ aspectRatio: '1 / 1' }}>
                  <img
                    src="https://fszyqkfwggdcmuywtzhp.supabase.co/storage/v1/object/public/portfolio/ai%20bezopasnost.jpg"
                    alt="Безопасность продукта"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[24px]">🛡️</span>
                  <h3 className="font-orbitron text-[20px] font-bold text-[#FF6B35]">
                    Безопасность продукта
                  </h3>
                </div>
                <div className="font-dm text-[16px] text-[var(--text-main)] leading-[1.7] mb-8 flex-1">
                  <p className="mb-4">Готовый продукт безопасно использовать, развивать и масштабировать.</p>
                  <p className="mb-4">При разработке по методологии VIBE CODING + FRONTIER DEPLOYMENT ENGINEER финальный продукт работает как стабильное «железо» — нейросети пишут код, который функционирует локально и предсказуемо.</p>
                  <p className="mb-4">🔑 Ключевой принцип — суверенитет данных:<br/>API — это «мост» между системами. Именно через него данные могут покидать периметр. Поэтому я подключаюсь исключительно к:</p>
                  <ul className="mb-4 space-y-2">
                    <li className="flex gap-2"><span>✅</span><span>GigaChat API — российская разработка (Сбер)</span></li>
                    <li className="flex gap-2"><span>✅</span><span>Amvera — российская платформа деплоя</span></li>
                    <li className="flex gap-2"><span>✅</span><span>Серверы предприятия — при работе с корпоративными заказчиками</span></li>
                  </ul>
                  <p>Все разработки для ЕАСУЗ и Центра оповещения созданы в государственном контуре, где безопасность — требование первого уровня. Каждый файл кода прошёл проверку и получил подтверждение соответствия требованиям ИБ.</p>

                  <div className="mt-6 pt-6 border-t border-[var(--border)]">
                    <p className="text-[14px] italic text-[var(--text-secondary)]">
                      Остались вопросы по безопасности нейросетей или корректному использованию AI-инструментов? Проверьте ваш запрос перед тем, как задавать его — это повысит точность ответа.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab && setActiveTab('bots')}
                  className="w-full bg-[#FF6B35] text-white font-bold text-[15px] py-[14px] rounded-[8px] hover:bg-[#e55a1f] hover:shadow-md transition-all duration-200"
                >
                  🤖 Открыть ботов
                </button>
              </motion.div>
            </div>
          </div>

          {/* БЛОК 4: ЧТО ДАЁТ ВНЕДРЕНИЕ AI */}
          <div className="mt-24">
            <SectionTitle>ЧТО ДАЁТ ВНЕДРЕНИЕ AI</SectionTitle>
            <p className="font-dm text-[16px] text-[var(--text-secondary)] mb-12">
              Три результата, которые получает каждый заказчик
            </p>

            <div className="flex flex-col gap-6 max-w-[700px] mx-auto">
              {/* Карточка 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[var(--bg-card)] border border-[var(--border)] border-l-4 border-l-[#F4621F] rounded-[12px] overflow-hidden shadow-md flex flex-col md:flex-row min-h-[180px]"
              >
                <div className="w-full md:w-[40%] h-[200px] md:h-auto shrink-0 overflow-hidden">
                  <img
                    src="https://fszyqkfwggdcmuywtzhp.supabase.co/storage/v1/object/public/portfolio/vnedrenie%201.JPG"
                    alt="Порядок в процессах"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[24px]">🤝</span>
                    <h3 className="font-orbitron text-[18px] font-bold text-[#F4621F]">
                      Порядок в процессах
                    </h3>
                  </div>
                  <p className="font-dm text-[15px] text-[var(--text-main)] leading-[1.7]">
                    AI встраивается в существующие процессы компании — финансовый учёт, проектное управление, кадровый документооборот. Система не заменяет людей, а усиливает их: берёт рутину на себя, подсказывает решения и удерживает процессы в норме без ручного контроля.
                  </p>
                </div>
              </motion.div>

              {/* Карточка 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-[var(--bg-card)] border border-[var(--border)] border-l-4 border-l-[#F4621F] rounded-[12px] overflow-hidden shadow-md flex flex-col md:flex-row min-h-[180px]"
              >
                <div className="w-full md:w-[40%] h-[200px] md:h-auto shrink-0 overflow-hidden">
                  <img
                    src="https://fszyqkfwggdcmuywtzhp.supabase.co/storage/v1/object/public/portfolio/vnedrenie%202.JPG"
                    alt="Единая структура предприятия"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[24px]">⚙️</span>
                    <h3 className="font-orbitron text-[18px] font-bold text-[#F4621F]">
                      Единая структура предприятия
                    </h3>
                  </div>
                  <p className="font-dm text-[15px] text-[var(--text-main)] leading-[1.7]">
                    Каждая задача получает чёткий регламент. Все подразделения работают в единой системе — данные не теряются, зоны ответственности не пересекаются. Хаос превращается в управляемую архитектуру.
                  </p>
                </div>
              </motion.div>

              {/* Карточка 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-[var(--bg-card)] border border-[var(--border)] border-l-4 border-l-[#F4621F] rounded-[12px] overflow-hidden shadow-md flex flex-col md:flex-row min-h-[180px]"
              >
                <div className="w-full md:w-[40%] h-[200px] md:h-auto shrink-0 overflow-hidden">
                  <img
                    src="https://fszyqkfwggdcmuywtzhp.supabase.co/storage/v1/object/public/portfolio/vnedrenie%203.JPG"
                    alt="Скорость и экономия"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[24px]">📱</span>
                    <h3 className="font-orbitron text-[18px] font-bold text-[#F4621F]">
                      Скорость и экономия
                    </h3>
                  </div>
                  <p className="font-dm text-[15px] text-[var(--text-main)] leading-[1.7]">
                    Автоматизация освобождает сотни часов ручного труда ежемесячно. Система работает быстрее, ошибок меньше, решения принимаются на основе данных. Экономия от внедрения — от нескольких сотен тысяч рублей в год.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
