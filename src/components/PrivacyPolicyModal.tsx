import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SectionTitle from './SectionTitle';

export default function PrivacyPolicyPage() {
  const navigate = useNavigate();

  return (
    <div className="px-[20px] py-[24px] md:px-[32px] md:py-[32px] lg:px-[72px] lg:py-[56px] max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Кнопка "Закрыть" */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 text-[var(--text-secondary)] hover:text-[#FF6B2B] transition-colors"
          >
            <X size={20} />
            <span className="font-dm text-sm">Закрыть</span>
          </button>
        </div>

        <SectionTitle>Политика конфиденциальности</SectionTitle>
        
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8 space-y-6">
          {/* Intro */}
          <div className="text-center pb-6 border-b border-[var(--border)]">
            <p className="text-lg font-semibold text-[#FF6B2B]">Бельтюгов Руслан</p>
            <p className="text-sm text-[var(--text-secondary)]">Разработчик AI/ML</p>
            <p className="text-sm text-[var(--text-secondary)]">Vibe Coding + Frontier Deployment Engineer</p>
            <p className="text-sm text-[var(--text-secondary)]">Москва, Российская Федерация</p>
          </div>

          {/* Section 1 */}
          <section>
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-3">1. Общие положения</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Настоящая Политика конфиденциальности регулирует порядок сбора, хранения и использования персональных данных посетителей сайта stimit.ru.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mt-2">
              Используя данный сайт, вы даете согласие на обработку ваших персональных данных в соответствии с настоящей Политикой и действующим законодательством Российской Федерации.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-3">2. Цель обработки персональных данных</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-2">Обработка персональных данных осуществляется со следующими целями:</p>
            <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] ml-4">
              <li>Анализ посещаемости сайта и поведения пользователей</li>
              <li>Улучшение качества предоставляемых услуг и функциональности сайта</li>
              <li>Проведение маркетинговых исследований</li>
              <li>Оптимизация контента и навигации</li>
              <li>Персонализация взаимодействия с посетителями</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-3">3. Состав обрабатываемых персональных данных</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-3">При посещении сайта автоматически собираются следующие данные:</p>
            
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-[#FF6B2B] mb-1">Технические данные:</h4>
                <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] ml-4">
                  <li>IP-адрес устройства</li>
                  <li>Информация о браузере и его версии</li>
                  <li>Операционная система</li>
                  <li>Тип устройства (компьютер, мобильный телефон, планшет)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-[#FF6B2B] mb-1">Данные о поведении:</h4>
                <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] ml-4">
                  <li>Источник перехода на сайт</li>
                  <li>Просмотренные страницы</li>
                  <li>Время, проведенное на сайте</li>
                  <li>Действия на сайте (клики, прокрутка)</li>
                  <li>Географическое положение</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-3">4. Методы сбора данных</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-[#FF6B2B] mb-2">4.1 Cookie-файлы</h4>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Сайт использует технологию cookie — небольшие текстовые файлы для запоминания ваших предпочтений, анализа статистики и улучшения работы сайта.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-[#FF6B2B] mb-2">4.2 Яндекс.Метрика</h4>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Сайт использует сервис Яндекс.Метрика для сбора обезличенной статистической информации о посетителях. Данные передаются в обезличенном виде.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-3">5. Срок хранения данных</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Персональные данные хранятся в течение 5 (пяти) лет с момента их получения.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-3">6. Передача данных третьим лицам</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Ваши персональные данные не передаются третьим лицам, за исключением передачи обезличенных данных в Яндекс.Метрику для аналитики.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-3">7. Ваши права</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-2">
              В соответствии с законодательством РФ, вы имеете право:
            </p>
            <ul className="space-y-1 text-[var(--text-secondary)]">
              <li>✅ Получить информацию о том, какие данные мы обрабатываем</li>
              <li>✅ Требовать уточнения или удаления ваших данных</li>
              <li>✅ Отозвать согласие на обработку персональных данных</li>
              <li>✅ Ограничить сбор данных через настройки браузера</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section>
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-3">8. Отзыв согласия</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Вы можете отозвать согласие на обработку персональных данных в любое время, связавшись с нами через контактную информацию на сайте.
            </p>
          </section>

          {/* Footer */}
          <div className="pt-6 border-t border-[var(--border)] text-center">
            <p className="text-sm text-[var(--text-secondary)]">
              <strong>Дата последнего обновления:</strong> 24 апреля 2026 г.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}