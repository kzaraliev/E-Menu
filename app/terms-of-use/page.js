import Link from 'next/link';

export const metadata = {
  title: "Условия за ползване | e-menu.bg - Дигитални менюта за ресторанти",
  description: "Условия за ползване на платформата e-menu.bg. Научете правилата и условията за използване на нашите услуги за дигитални менюта.",
  keywords: "условия за ползване, правила, договор, e-menu.bg, дигитални менюта, ресторанти",
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
    canonical: '/terms-of-use',
    languages: {
      'bg-BG': '/terms-of-use',
    },
  },
  openGraph: {
    title: "Условия за ползване | e-menu.bg",
    description: "Условия за ползване на платформата e-menu.bg. Научете правилата и условията за използване на нашите услуги за дигитални менюта.",
    url: 'https://e-menu.bg/terms-of-use',
    siteName: 'e-menu.bg',
    locale: 'bg_BG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Условия за ползване | e-menu.bg",
    description: "Условия за ползване на платформата e-menu.bg. Научете правилата и условията за използване на нашите услуги за дигитални менюта.",
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

export default function TermsOfUsePage() {
  const lastUpdated = "15 януари 2025";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Условия за <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ползване</span>
            </h1>
            <p className="text-lg text-slate-600 mb-4">
              Последна актуализация: {lastUpdated}
            </p>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Тези условия определят правилата за използване на платформата e-menu.bg
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-slate max-w-none">
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8 rounded-r-lg">
              <h2 className="text-xl font-semibold text-green-900 mb-2">Важна информация</h2>
              <p className="text-green-800">
                Като използвате нашата платформа, вие се съгласявате с тези условия. 
                Моля, прочетете ги внимателно преди да започнете да използвате услугите ни.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Общи положения</h2>
            <p className="text-slate-700 mb-4">
              Тези Условия за ползване (&quot;Условията&quot;) регулират достъпа до и използването на 
              уебсайта e-menu.bg и свързаните с него услуги (&quot;Платформата&quot;), 
              предоставяни от e-menu.bg (&quot;ние&quot;, &quot;нас&quot;, &quot;наша&quot;).
            </p>
            <p className="text-slate-700 mb-6">
              Като достъпвате или използвате нашата Платформа, вие се съгласявате да спазвате 
              и да бъдете обвързани от тези Условия. Ако не се съгласявате с някоя част от тези условия, 
              не трябва да използвате нашата Платформа.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Описание на услугите</h2>
            <p className="text-slate-700 mb-4">
              e-menu.bg е платформа за създаване и управление на дигитални менюта за ресторанти. 
              Нашите услуги включват:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 mb-6">
              <li>Създаване на дигитални менюта с QR код достъп</li>
              <li>Управление на продукти, категории и цени</li>
              <li>Анализ и статистики за посещения</li>
              <li>Персонализиране на дизайна на менютата</li>
              <li>Многоезикова поддръжка</li>
              <li>Интеграция с платежни системи (където е приложимо)</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Регистрация и акаунт</h2>
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">3.1. Изисквания за регистрация</h3>
                <p className="text-slate-700 mb-3">
                  За да използвате пълния функционал на Платформата, трябва да създадете акаунт. 
                  При регистрацията се задължавате да:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-1 ml-4">
                  <li>Предоставите точна и актуална информация</li>
                  <li>Поддържате сигурността на вашата парола</li>
                  <li>Уведомявате ни незабавно за неоторизиран достъп</li>
                  <li>Поемате отговорност за всички дейности в акаунта ви</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">3.2. Възрастови изисквания</h3>
                <p className="text-slate-700">
                  Трябва да сте навършили 18 години или да имате съгласието на родител/настойник 
                  за да използвате нашите услуги.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Използване на услугите</h2>
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">4.1. Разрешено използване</h3>
                <p className="text-slate-700 mb-3">Можете да използвате нашата Платформа за:</p>
                <ul className="list-disc list-inside text-slate-700 space-y-1 ml-4">
                  <li>Създаване и управление на менюта за вашия ресторант</li>
                  <li>Споделяне на менютата с клиенти</li>
                  <li>Анализиране на статистики за посещения</li>
                  <li>Персонализиране на външния вид на менютата</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">4.2. Забранено използване</h3>
                <p className="text-slate-700 mb-3">Забранено е да използвате Платформата за:</p>
                <ul className="list-disc list-inside text-slate-700 space-y-1 ml-4">
                  <li>Незаконни или измамни дейности</li>
                  <li>Нарушаване на авторски или други права</li>
                  <li>Разпространение на вредоносен софтуер</li>
                  <li>Спам или нежелани комуникации</li>
                  <li>Нарушаване сигурността на системата</li>
                  <li>Създаване на фалшиви акаунти</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">5. Съдържание и авторски права</h2>
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">5.1. Ваше съдържание</h3>
                <p className="text-slate-700 mb-3">
                  Вие запазвате собствеността върху съдържанието, което качвате (текстове, снимки, описания). 
                  Като качвате съдържание, ни предоставяте лиценз да:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-1 ml-4">
                  <li>Показваме съдържанието в рамките на услугата</li>
                  <li>Съхраняваме и обработваме данните</li>
                  <li>Правим резервни копия за сигурност</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">5.2. Наше съдържание</h3>
                <p className="text-slate-700">
                  Платформата, дизайнът, логото и всички материали са наша собственост или 
                  ни са лицензирани. Забранено е неоторизираното им използване.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">6. Плащания и абонаменти</h2>
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">6.1. Видове услуги</h3>
                <p className="text-slate-700 mb-3">Предлагаме различни планове:</p>
                <ul className="list-disc list-inside text-slate-700 space-y-1 ml-4">
                  <li>Безплатен план с основен функционал</li>
                  <li>Платени планове с разширени функции</li>
                  <li>Корпоративни решения</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">6.2. Плащания</h3>
                <p className="text-slate-700">
                  Плащанията се извършват предварително. Всички цени са в български лева и включват ДДС. 
                  Приемаме основните кредитни карти и банкови преводи.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">6.3. Анулиране и възстановяване</h3>
                <p className="text-slate-700">
                  Можете да анулирате абонамента си по всяко време. Възстановяванията се извършват 
                  съгласно нашата политика за възстановяване на средства.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">7. Прекратяване на услугата</h2>
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">7.1. От ваша страна</h3>
                <p className="text-slate-700">
                  Можете да прекратите акаунта си по всяко време чрез настройките на профила 
                  или като се свържете с нас.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">7.2. От наша страна</h3>
                <p className="text-slate-700 mb-3">
                  Можем да прекратим или ограничим достъпа ви при:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-1 ml-4">
                  <li>Нарушение на тези Условия</li>
                  <li>Незаконна дейност</li>
                  <li>Неплащане на дължими суми</li>
                  <li>Прекратяване на услугата</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">8. Отказ от отговорност</h2>
            <p className="text-slate-700 mb-4">
              Услугите се предоставят &quot;както са&quot;. Не гарантираме, че:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 mb-6">
              <li>Услугите ще бъдат непрекъснати или безпроблемни</li>
              <li>Всички грешки ще бъдат коригирани</li>
              <li>Услугите ще отговарят на всички ваши изисквания</li>
              <li>Данните ще бъдат винаги достъпни</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">9. Ограничение на отговорността</h2>
            <p className="text-slate-700 mb-6">
              В максимално допустимата от закона степен, нашата отговорност за щети е ограничена 
              до сумата, която сте платили за услугите през последните 12 месеца. 
              Не носим отговорност за индиректни, случайни или последващи щети.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">10. Приложимо право</h2>
            <p className="text-slate-700 mb-6">
              Тези Условия се уреждат от българското право. Всички спорове се решават от 
              компетентните български съдилища.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">11. Промени в условията</h2>
            <p className="text-slate-700 mb-6">
              Можем да актуализираме тези Условия периодично. При значителни промени ще ви 
              уведомим по email или чрез съобщение в платформата. Продължаването на използването 
              след промените означава приемане на новите условия.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">12. Свържете се с нас</h2>
            <div className="bg-slate-50 p-6 rounded-lg">
              <p className="text-slate-700 mb-4">
                За въпроси относно тези Условия или нашите услуги:
              </p>
              <div className="space-y-2">
                <p className="text-slate-700">
                  <strong>Email:</strong> <Link href="mailto:support@e-menu.bg" className="text-blue-600 hover:text-blue-800">support@e-menu.bg</Link>
                </p>
                <p className="text-slate-700">
                  <strong>Правни въпроси:</strong> <Link href="mailto:legal@e-menu.bg" className="text-blue-600 hover:text-blue-800">legal@e-menu.bg</Link>
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
                  href="/privacy-policy"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  ← Политика за поверителност
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
} 