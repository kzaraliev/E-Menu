import Link from 'next/link'

export const metadata = {
  title: 'Политика за бисквитки | E-Menu.bg',
  description: 'Информация за използването на бисквитки на нашата платформа за цифрови менюта.',
}

export default function CookiesPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8 lg:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Политика за бисквитки
          </h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              Последна актуализация: {new Date().toLocaleDateString('bg-BG')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Какво са бисквитките?
              </h2>
              <p className="text-gray-700 mb-4">
                Бисквитките са малки текстови файлове, които се съхраняват на вашето устройство 
                когато посещавате нашия уебсайт. Те ни помагат да подобрим вашето потребителско 
                изживяване и да анализираме как се използва нашата платформа.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Как използваме бисквитките?
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    🔧 Необходими бисквитки
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Тези бисквитки са необходими за правилното функциониране на уебсайта:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Съхраняване на сесионна информация</li>
                    <li>Запазване на настройките за тема (светла/тъмна)</li>
                    <li>Управление на влизането в системата</li>
                    <li>Безопасност и предотвратяване на злоупотреби</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    📊 Аналитични бисквитки
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Помагат ни да разберем как посетителите използват нашия сайт:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Брой посещения и продължителност</li>
                    <li>Най-популярни страници и функции</li>
                    <li>Грешки и проблеми в използването</li>
                    <li>Подобряване на производителността</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    🎯 Функционални бисквитки
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Подобряват вашето потребителско изживяване:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Запазване на избрания език</li>
                    <li>Предпочитания за дисплея</li>
                    <li>Персонализирани настройки</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Управление на бисквитките
              </h2>
              <p className="text-gray-700 mb-4">
                Можете да контролирате и изтривате бисквитките според вашите предпочитания. 
                Повечето браузъри автоматично приемат бисквитки, но можете да промените 
                настройките си, за да ги блокирате или да получавате предупреждения.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-blue-800 text-sm">
                  <strong>Важно:</strong> Блокирането на необходимите бисквитки може да 
                  повлияе на функционалността на сайта и да направи някои функции недостъпни.
                </p>
              </div>

              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Как да управлявате бисквитките в популярните браузъри:
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>
                  <strong>Chrome:</strong> Настройки → Поверителност и сигурност → Бисквитки
                </li>
                <li>
                  <strong>Firefox:</strong> Настройки → Поверителност и сигурност → Бисквитки
                </li>
                <li>
                  <strong>Safari:</strong> Настройки → Поверителност → Управление на данните от уебсайтове
                </li>
                <li>
                  <strong>Edge:</strong> Настройки → Поверителност → Бисквитки и разрешения на сайтове
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Трети страни
              </h2>
              <p className="text-gray-700 mb-4">
                Можем да използваме услуги на трети страни, които също поставят бисквитки:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Google Analytics - за анализ на трафика</li>
                <li>Supabase - за управление на данните</li>
                <li>Vercel - за хостинг и производителност</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Контакт
              </h2>
              <p className="text-gray-700 mb-4">
                Ако имате въпроси относно нашата политика за бисквитки, моля свържете се с нас:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">
                  <strong>Имейл:</strong> support@e-menu.bg<br/>
                  <strong>Страница за контакт:</strong> <Link href="/contact" className="text-blue-600 hover:text-blue-700 underline">Свържете се с нас</Link>
                </p>
              </div>
            </section>

            <div className="border-t pt-6">
              <Link 
                href="/"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Назад към началната страница
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 