import Link from 'next/link';

export const metadata = {
  title: "Политика за поверителност | e-menu.bg - Дигитални менюта за ресторанти",
  description: "Политика за поверителност на e-menu.bg. Научете как събираме, използваме и защитаваме вашите лични данни в съответствие с GDPR.",
  keywords: "политика за поверителност, GDPR, лични данни, защита на данните, e-menu.bg",
  authors: [{ name: "e-menu.bg Team" }],
  creator: "e-menu.bg",
  publisher: "e-menu.bg",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://e-menu.bg'),
  alternates: {
    canonical: '/privacy-policy',
    languages: {
      'bg-BG': '/privacy-policy',
    },
  },
  openGraph: {
    title: "Политика за поверителност | e-menu.bg",
    description: "Политика за поверителност на e-menu.bg. Научете как събираме, използваме и защитаваме вашите лични данни в съответствие с GDPR.",
    url: 'https://e-menu.bg/privacy-policy',
    siteName: 'e-menu.bg',
    locale: 'bg_BG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Политика за поверителност | e-menu.bg",
    description: "Политика за поверителност на e-menu.bg. Научете как събираме, използваме и защитаваме вашите лични данни в съответствие с GDPR.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function PrivacyPolicyPage() {
  const lastUpdated = "15 януари 2025";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Политика за <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">поверителност</span>
            </h1>
            <p className="text-lg text-slate-600 mb-4">
              Последна актуализация: {lastUpdated}
            </p>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Тази политика описва как e-menu.bg събира, използва и защитава вашите лични данни
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-slate max-w-none">
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
              <h2 className="text-xl font-semibold text-blue-900 mb-2">Кратко обобщение</h2>
              <p className="text-blue-800">
                Ние зачитаме вашата поверителност и събираме само необходимите данни за предоставяне на нашите услуги. 
                Данните ви се използват единствено за функциониране на платформата и се защитават с най-високи стандарти за сигурност.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Контролиращо лице на данните</h2>
            <p className="text-slate-700 mb-6">
              Контролиращо лице на личните данни е e-menu.bg, регистрирано в България. 
              За въпроси относно обработката на лични данни можете да се свържете с нас на email: 
              <Link href="mailto:privacy@e-menu.bg" className="text-blue-600 hover:text-blue-800">privacy@e-menu.bg</Link>
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Какви данни събираме</h2>
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">2.1. Данни за регистрация</h3>
                <ul className="list-disc list-inside text-slate-700 space-y-1">
                  <li>Име и фамилия</li>
                  <li>Email адрес</li>
                  <li>Телефонен номер</li>
                  <li>Информация за ресторанта (име, адрес, тип кухня)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">2.2. Технически данни</h3>
                <ul className="list-disc list-inside text-slate-700 space-y-1">
                  <li>IP адрес</li>
                  <li>Данни за браузъра и устройството</li>
                  <li>Cookies и подобни технологии</li>
                  <li>Данни за активността в платформата</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">2.3. Бизнес данни</h3>
                <ul className="list-disc list-inside text-slate-700 space-y-1">
                  <li>Информация за менютата и продуктите</li>
                  <li>Снимки на ястия</li>
                  <li>Цени и описания</li>
                  <li>Статистики за посещенията</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Как използваме вашите данни</h2>
            <div className="space-y-3 mb-6">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-slate-700">Предоставяне на услугите на платформата e-menu.bg</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-slate-700">Създаване и управление на вашия акаунт</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-slate-700">Комуникация относно услугите (поддръжка, актуализации)</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-slate-700">Анализ и подобряване на платформата</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-slate-700">Спазване на правни задължения</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Правно основание за обработка</h2>
            <p className="text-slate-700 mb-4">
              Обработваме вашите лични данни въз основа на:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 mb-6">
              <li><strong>Договор:</strong> За предоставяне на услугите, които сте поискали</li>
              <li><strong>Законен интерес:</strong> За подобряване на услугите и анализ</li>
              <li><strong>Съгласие:</strong> За маркетингови комуникации (по ваш избор)</li>
              <li><strong>Правно задължение:</strong> За спазване на данъчни и счетоводни изисквания</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">5. Споделяне на данни с трети страни</h2>
            <p className="text-slate-700 mb-4">
              Не продаваме и не споделяме вашите лични данни с трети страни, освен в следните случаи:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 mb-6">
              <li>Доставчици на технологични услуги (hosting, анализи, поддръжка)</li>
              <li>Платежни процесори за обработка на плащания</li>
              <li>При правно изискване от компетентен орган</li>
              <li>С ваше изрично съгласие</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">6. Съхранение на данните</h2>
            <p className="text-slate-700 mb-6">
              Съхраняваме вашите данни толкова дълго, колкото е необходимо за предоставяне на услугите или 
              докато не поискате изтриването им. Минималните периоди за съхранение са:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 mb-6">
              <li>Данни за акаунта: до изтриване на акаунта + 30 дни</li>
              <li>Бизнес данни: до прекратяване на услугата + 1 година</li>
              <li>Финансови данни: 5 години (съгласно данъчното законодателство)</li>
              <li>Технически логове: 12 месеца</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">7. Вашите права</h2>
            <p className="text-slate-700 mb-4">
              Съгласно GDPR имате следните права относно вашите лични данни:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-800 mb-2">Право на достъп</h4>
                <p className="text-sm text-slate-600">Да получите копие от данните си</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-800 mb-2">Право на поправка</h4>
                <p className="text-sm text-slate-600">Да коригирате неточни данни</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-800 mb-2">Право на изтриване</h4>
                <p className="text-sm text-slate-600">Да поискате изтриване на данните</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-800 mb-2">Право на възражение</h4>
                <p className="text-sm text-slate-600">Да възразите срещу обработка</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">8. Сигурност на данните</h2>
            <p className="text-slate-700 mb-4">
              Прилагаме технически и организационни мерки за защита на вашите данни:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 mb-6">
              <li>SSL криптиране на всички комуникации</li>
              <li>Регулярни резервни копия</li>
              <li>Ограничен достъп до данните само за упълномощени служители</li>
              <li>Редовни проверки за сигурност</li>
              <li>Съответствие с международни стандарти за сигурност</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">9. Cookies</h2>
            <p className="text-slate-700 mb-4">
              Използваме cookies и подобни технологии за:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 mb-6">
              <li>Осигуряване на функционалността на сайта</li>
              <li>Запазване на вашите предпочитания</li>
              <li>Анализ на трафика и използването</li>
              <li>Подобряване на потребителското изживяване</li>
            </ul>
            <p className="text-slate-700 mb-6">
              Можете да управлявате cookies настройките си чрез браузъра или чрез нашия cookie banner.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">10. Промени в политиката</h2>
            <p className="text-slate-700 mb-6">
              Можем да актуализираме тази политика периодично. При съществени промени ще ви уведомим 
              по email или чрез известие в платформата. Препоръчваме да преглеждате редовно тази страница.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">11. Контакти</h2>
            <div className="bg-slate-50 p-6 rounded-lg">
              <p className="text-slate-700 mb-4">
                За въпроси относно тази политика или вашите права, моля свържете се с нас:
              </p>
              <div className="space-y-2">
                <p className="text-slate-700">
                  <strong>Email:</strong> <a href="mailto:privacy@e-menu.bg" className="text-blue-600 hover:text-blue-800">privacy@e-menu.bg</a>
                </p>
                <p className="text-slate-700">
                  <strong>Адрес:</strong> България
                </p>
                <p className="text-slate-700">
                  <strong>Телефон:</strong> +359-XXX-XXXXXX
                </p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                <Link 
                  href="/"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Към началната страница
                </Link>
                <Link 
                  href="/terms-of-use"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Условия за ползване →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
} 