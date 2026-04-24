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
            <p className="text-lg font-semibold text-[#FF6B2B]">Бельтюгов Руслан Владимирович</p>
            <p className="text-sm text-[var(--text-secondary)]">Разработчик AI/ML</p>
            <p className="text-sm text-[var(--text-secondary)]">Vibe Coding + Frontier Deployment Engineer</p>
            <p className="text-sm text-[var(--text-secondary)]">Москва, Российская Федерация</p>
            <p className="text-xs text-[var(--text-secondary)] mt-2">Email: ruslan-39kld@yandex.ru</p>
          </div>

          {/* Вступление */}
          <section>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Настоящая Политика конфиденциальности предназначена для информирования Вас о действиях по сбору, обработке и защите Ваших персональных данных на сайте <strong>stimit.ru</strong> (далее — Сайт).
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mt-2">
              Оператор персональных данных: <strong>Бельтюгов Руслан Владимирович</strong>, действующий на основании Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» (далее — 152-ФЗ).
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mt-2">
              Используя данный Сайт, Вы даёте согласие на обработку Ваших персональных данных в соответствии с настоящей Политикой и действующим законодательством Российской Федерации.
            </p>
          </section>

          {/* Section 1 */}
          <section>
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-3">1. Цель обработки персональных данных</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-2">Обработка персональных данных осуществляется со следующими целями:</p>
            <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] ml-4">
              <li>Анализ посещаемости Сайта и поведения пользователей для улучшения качества предоставляемых услуг;</li>
              <li>Сбор статистической информации для проведения маркетинговых исследований;</li>
              <li>Оптимизация контента и навигации Сайта;</li>
              <li>Персонализация взаимодействия с посетителями.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-3">2. Состав обрабатываемых персональных данных</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-3">При посещении Сайта автоматически собираются следующие данные:</p>
            
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-[#FF6B2B] mb-1">Технические данные:</h4>
                <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] ml-4">
                  <li>IP-адрес устройства;</li>
                  <li>Информация о браузере и его версии;</li>
                  <li>Операционная система;</li>
                  <li>Тип устройства (компьютер, мобильный телефон, планшет).</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-[#FF6B2B] mb-1">Данные о поведении:</h4>
                <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] ml-4">
                  <li>Источник перехода на Сайт;</li>
                  <li>Просмотренные страницы;</li>
                  <li>Время, проведённое на Сайте;</li>
                  <li>Действия на Сайте (клики, прокрутка);</li>
                  <li>Географическое положение.</li>
                </ul>
              </div>
            </div>

            <p className="text-[var(--text-secondary)] leading-relaxed mt-3 text-sm italic">
              Данные, собираемые с помощью Cookies, не относятся к специальным или биометрическим в соответствии со ст. 10–11 152-ФЗ и обрабатываются автоматизированным способом.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-3">3. Методы сбора данных</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-[#FF6B2B] mb-2">3.1 Cookie-файлы</h4>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Сайт использует технологию cookie — небольшие текстовые файлы, загружаемые на Ваше устройство при посещении Сайта. Cookies позволяют запоминать Ваши предпочтения, анализировать статистику посещений и улучшать работу Сайта.
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed mt-2">
                  Основанием обработки Ваших данных является согласие на обработку персональных данных, предоставляемое путём совершения конклюдентных действий, а именно: Вы пользуетесь Сайтом.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-[#FF6B2B] mb-2">3.2 Яндекс.Метрика</h4>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Сайт использует сервис <strong>Яндекс.Метрика</strong> (ООО «Яндекс», ОГРН: 1027700229193, адрес: 119021, г. Москва, ул. Льва Толстого, д. 16) для сбора обезличенной статистической информации о посетителях.
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed mt-2">
                  Данные передаются в Яндекс в обезличенном виде. Рекомендуем ознакомиться с Политикой конфиденциальности ООО «Яндекс»: <a href="https://yandex.ru/legal/confidential" target="_blank" rel="noopener noreferrer" className="text-[#FF6B2B] underline">https://yandex.ru/legal/confidential</a>
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 - Cookies details */}
          <section>
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-3">4. Типы используемых Cookies</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-[#FF6B2B]">Сессионные</h4>
                <p className="text-[var(--text-secondary)] text-sm">
                  Существуют только во временной памяти в течение времени, когда Вы находитесь на Сайте. Удаляются после закрытия браузера.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-[#FF6B2B]">Постоянные</h4>
                <p className="text-[var(--text-secondary)] text-sm">
                  Хранятся на Вашем устройстве и не удаляются при закрытии браузера. Позволяют сохранять настройки для последующих посещений.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-[#FF6B2B]">Аналитические</h4>
                <p className="text-[var(--text-secondary)] text-sm">
                  Собирают информацию о том, как Вы используете Сайт (посещённые страницы, переходы по ссылкам). Используются для улучшения функционала Сайта.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-3">5. Срок хранения персональных данных</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Персональные данные хранятся в течение <strong>5 (пяти) лет</strong> с момента их получения.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mt-2">
              По достижении сроков обработки персональные данные уничтожаются путём удаления из информационных систем с помощью встроенных средств.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-3">6. Передача данных третьим лицам</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Ваши персональные данные <strong>не передаются третьим лицам</strong>, за исключением передачи обезличенных данных в сервис Яндекс.Метрика для целей аналитики.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mt-2">
              Сайт гарантирует, что полученная от Вас информация никогда и ни при каких условиях не будет предоставлена третьим лицам, за исключением случаев, предусмотренных действующим законодательством Российской Федерации.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-3">7. Ваши права</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-2">
              В соответствии с 152-ФЗ Вы имеете следующие права:
            </p>
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li>✅ <strong>Право на доступ к персональным данным</strong> — получить информацию о том, какие данные мы обрабатываем;</li>
              <li>✅ <strong>Право на уточнение</strong> — требовать исправления неточных, неполных или устаревших данных;</li>
              <li>✅ <strong>Право на удаление</strong> — требовать удаления Ваших персональных данных;</li>
              <li>✅ <strong>Право на отзыв согласия</strong> — отозвать согласие на обработку персональных данных в любое время;</li>
              <li>✅ <strong>Право на ограничение сбора</strong> — ограничить сбор данных через настройки браузера (блокировка cookies, отключение JavaScript).</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section>
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-3">8. Как отказаться от обработки Cookies?</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Вы можете отказаться от сохранения и использования Cookies на своём устройстве или удалить уже сохранённые Cookies в настройках Вашего браузера.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mt-2">
              Если Вы откажетесь от обработки Cookies, Сайт будет использовать только обязательные Cookies, необходимые для базового функционирования.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-3">9. Как реализовать свои права?</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-2">
              Направить запрос на электронную почту: <a href="mailto:ruslan-39kld@yandex.ru" className="text-[#FF6B2B] underline">ruslan-39kld@yandex.ru</a>
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-2">
              Запрос должен содержать:
            </p>
            <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] ml-4">
              <li>Ваше ФИО или ФИО Вашего представителя;</li>
              <li>Реквизиты Вашего паспорта или паспорта Вашего представителя (серия, номер, дата выдачи, выдавший орган);</li>
              <li>Информацию о характере взаимоотношений, которые будут подтверждать факт обработки Ваших персональных данных;</li>
              <li>Вашу подпись или подпись Вашего представителя (для электронных документов — электронную подпись в соответствии с ФЗ № 63-ФЗ).</li>
            </ul>
          </section>

          {/* Section 10 */}
          <section>
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-3">10. Безопасность данных</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Персональные данные, которые мы собираем и храним, считаются конфиденциальной информацией. Они защищены от потери, изменения или несанкционированного доступа в соответствии с законодательством РФ.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mt-2">
              Для этого применяются технические средства и организационные меры в соответствии со ст. 18, 18.1, 19 152-ФЗ.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-3">11. Обработка персональных данных несовершеннолетних</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Сайт не предназначен для обработки персональных данных несовершеннолетних. Если у Вас есть основания полагать, что ребёнок предоставил нам свои персональные данные, просим сообщить об этом по электронной почте <a href="mailto:ruslan-39kld@yandex.ru" className="text-[#FF6B2B] underline">ruslan-39kld@yandex.ru</a>.
            </p>
          </section>

          {/* Section 12 */}
          <section>
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-3">12. Изменение Политики конфиденциальности</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Мы вправе вносить изменения в настоящую Политику конфиденциальности без какого-либо предварительного уведомления. Просим Вас регулярно просматривать обновления на данной странице.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mt-2">
              Продолжая использование Сайта после внесения изменений, Вы соглашаетесь с обновлённой версией Политики конфиденциальности.
            </p>
          </section>

          {/* Footer */}
          <div className="pt-6 border-t border-[var(--border)] text-center">
            <p className="text-sm text-[var(--text-secondary)]">
              <strong>Дата последнего обновления:</strong> 24 апреля 2026 г.
            </p>
            <p className="text-xs text-[var(--text-secondary)] mt-2">
              Настоящим Вы подтверждаете, что ознакомились с настоящей Политикой конфиденциальности, понимаете её содержание и даёте своё согласие на обработку персональных данных на указанных условиях.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
