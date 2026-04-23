import React from 'react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] mx-4 bg-white border-2 border-orange-500 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-gradient-to-r from-orange-600 to-orange-500 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Политика обработки персональных данных
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white/10 rounded-lg"
            aria-label="Закрыть"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)] px-6 py-8 bg-white text-gray-800">
          <div className="space-y-6">
            <div className="text-center pb-4 border-b border-orange-300">
              <p className="text-lg font-semibold text-orange-600">Бельтюгов Руслан</p>
              <p className="text-sm text-gray-700">Разработчик AI/ML</p>
              <p className="text-sm text-gray-700">Vibe Coding + Frontier Deployment Engineer</p>
              <p className="text-sm text-gray-600">Москва, Российская Федерация</p>
            </div>

            <section>
              <h3 className="text-xl font-bold text-orange-600 mb-3">1. Общие положения</h3>
              <p className="text-gray-800 leading-relaxed">
                Настоящая Политика обработки персональных данных регулирует порядок сбора, хранения и использования персональных данных посетителей сайта neurbiz.ru.
              </p>
              <p className="text-gray-800 leading-relaxed mt-2">
                Используя данный сайт, вы даете согласие на обработку ваших персональных данных в соответствии с настоящей Политикой и действующим законодательством Российской Федерации.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-orange-600 mb-3">2. Цель обработки персональных данных</h3>
              <p className="text-gray-800 leading-relaxed mb-2">Обработка персональных данных осуществляется со следующими целями:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-800 ml-4">
                <li>Анализ посещаемости сайта и поведения пользователей</li>
                <li>Улучшение качества предоставляемых услуг и функциональности сайта</li>
                <li>Проведение маркетинговых исследований</li>
                <li>Оптимизация контента и навигации</li>
                <li>Персонализация взаимодействия с посетителями</li>
                <li>Связь с потенциальными клиентами при отправке форм обратной связи</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-orange-600 mb-3">3. Состав обрабатываемых персональных данных</h3>
              <p className="text-gray-800 leading-relaxed mb-3">При посещении сайта автоматически собираются следующие данные:</p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-orange-600 mb-1">Технические данные:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-800 ml-4">
                    <li>IP-адрес устройства</li>
                    <li>Информация о браузере и его версии</li>
                    <li>Операционная система</li>
                    <li>Тип устройства (компьютер, мобильный телефон, планшет)</li>
                    <li>Разрешение экрана</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-orange-600 mb-1">Данные о поведении:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-800 ml-4">
                    <li>Источник перехода на сайт</li>
                    <li>Просмотренные страницы</li>
                    <li>Время, проведенное на сайте</li>
                    <li>Действия на сайте (клики, прокрутка страниц)</li>
                    <li>Географическое положение (город, регион)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-orange-600 mb-1">Данные из форм обратной связи:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-800 ml-4">
                    <li>Имя</li>
                    <li>Электронная почта</li>
                    <li>Телефон</li>
                    <li>Сообщение</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-orange-600 mb-3">4. Методы сбора данных</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-orange-600 mb-2">4.1 Cookie-файлы</h4>
                  <p className="text-gray-800 leading-relaxed mb-2">
                    Сайт использует технологию cookie — небольшие текстовые файлы, которые сохраняются на вашем устройстве.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-800 ml-4">
                    <li>Запоминания ваших предпочтений</li>
                    <li>Анализа статистики посещений</li>
                    <li>Улучшения работы сайта</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-orange-600 mb-2">4.2 Яндекс.Метрика</h4>
                  <p className="text-gray-800 leading-relaxed mb-2">
                    Сайт использует сервис Яндекс.Метрика для сбора обезличенной статистической информации о посетителях.
                  </p>
                  <p className="text-gray-800 leading-relaxed mt-2">
                    Данные передаются в Яндекс в обезличенном виде и используются исключительно для аналитических целей.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-orange-600 mb-3">5. Правовые основания обработки</h3>
              <p className="text-gray-800 leading-relaxed mb-2">Обработка персональных данных осуществляется на основании:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-800 ml-4">
                <li>Федерального закона от 27.07.2006 № 152-ФЗ</li>
                <li>Вашего согласия при продолжении использования сайта</li>
                <li>Необходимости исполнения договора</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-orange-600 mb-3">6. Срок хранения данных</h3>
              <p className="text-gray-800 leading-relaxed">
                Персональные данные хранятся в течение 5 (пяти) лет с момента их получения.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-orange-600 mb-3">7. Передача данных третьим лицам</h3>
              <p className="text-gray-800 leading-relaxed mb-2">
                Ваши персональные данные не передаются третьим лицам, за исключением:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-800 ml-4">
                <li>Передача обезличенных данных в Яндекс.Метрику</li>
                <li>По требованию государственных органов</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-orange-600 mb-3">8. Защита персональных данных</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-800 ml-4">
                <li>Использование защищенного протокола HTTPS</li>
                <li>Регулярное обновление систем безопасности</li>
                <li>Ограничение доступа к персональным данным</li>
                <li>Обезличивание данных при передаче</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-orange-600 mb-3">9. Ваши права</h3>
              <ul className="space-y-1 text-gray-800">
                <li>✅ Получить информацию о том, какие данные мы обрабатываем</li>
                <li>✅ Требовать уточнения или удаления ваших данных</li>
                <li>✅ Отозвать согласие на обработку персональных данных</li>
                <li>✅ Ограничить сбор данных через настройки браузера</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-orange-600 mb-3">10. Отзыв согласия</h3>
              <p className="text-gray-800 leading-relaxed">
                Вы можете отозвать согласие в любое время через форму обратной связи на сайте.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-orange-600 mb-3">11. Изменения в Политике</h3>
              <p className="text-gray-800 leading-relaxed">
                Мы оставляем за собой право вносить изменения в настоящую Политику без предварительного уведомления.
              </p>
            </section>

            <div className="pt-6 border-t border-orange-300 text-center">
              <p className="text-sm text-gray-600">
                Дата последнего обновления: 23 апреля 2026 г.
              </p>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-orange-300">
          <button
            onClick={onClose}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;