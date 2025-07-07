import Link from 'next/link';

export const metadata = {
  title: "За нас | e-menu.bg - Дигитални менюта за ресторанти",
  description: "Научете повече за e-menu.bg - българската платформа за дигитални менюта. Нашата мисия е да модернизираме ресторантската индустрия в България.",
  keywords: "за нас, e-menu.bg, дигитални менюта, екип, мисия, vision, ресторанти България",
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
    canonical: '/about',
    languages: {
      'bg-BG': '/about',
    },
  },
  openGraph: {
    title: "За нас | e-menu.bg - Дигитални менюта за ресторанти",
    description: "Научете повече за e-menu.bg - българската платформа за дигитални менюта. Нашата мисия е да модернизираме ресторантската индустрия в България.",
    url: 'https://e-menu.bg/about',
    siteName: 'e-menu.bg',
    locale: 'bg_BG',
    type: 'website',
    images: [
      {
        url: 'https://e-menu.bg/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'За нас - e-menu.bg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "За нас | e-menu.bg - Дигитални менюта за ресторанти",
    description: "Научете повече за e-menu.bg - българската платформа за дигитални менюта. Нашата мисия е да модернизираме ресторантската индустрия в България.",
    images: ['https://e-menu.bg/og-about.jpg'],
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

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'e-menu.bg',
    description: 'Дигитални менюта за ресторанти в България',
    url: 'https://e-menu.bg',
    foundingDate: '2024',
    foundingLocation: {
      '@type': 'Place',
      name: 'България'
    },
    sameAs: [
      'https://facebook.com/emenu.bg',
      'https://instagram.com/emenu.bg',
      'https://linkedin.com/company/emenu-bg'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+359-XXX-XXXXXX',
      contactType: 'customer service',
      areaServed: 'BG',
      availableLanguage: 'Bulgarian'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                За <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">нас</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Ние сме <strong>e-menu.bg</strong> - българската платформа, която трансформира начина, 
                по който ресторантите представят менютата си и се свързват с клиентите.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  Нашата мисия
                </h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  Вярваме, че всеки ресторант заслужава модерни решения, които правят бизнеса по-ефективен 
                  и клиентското изживяване по-приятно. Създаваме технологии, които са достъпни, 
                  лесни за използване и донасят реална стойност.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Нашата цел е да помогнем на българските ресторанти да се развиват в дигиталната ера, 
                  като предлагаме решения, които увеличават продажбите и подобряват ефективността.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Иновация</h3>
                      <p className="text-white/80">Модерни решения за модерни ресторанти</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Страст</h3>
                      <p className="text-white/80">Обичаме това, което правим</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Екип</h3>
                      <p className="text-white/80">Силен екип от професионалисти</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Нашите ценности
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Принципите, които ни водят в ежедневната работа и определят начина, 
                по който създаваме продукти и обслужваме клиентите.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Value 1 */}
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Качество</h3>
                <p className="text-slate-600">
                  Стремим се към съвършенство във всеки детайл от нашите продукти. 
                  Качеството е в основата на всичко, което създаваме.
                </p>
              </div>

              {/* Value 2 */}
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Скорост</h3>
                <p className="text-slate-600">
                  Бързо реагираме на нуждите на клиентите и непрекъснато подобряваме 
                  продуктите си, за да останем винаги актуални.
                </p>
              </div>

              {/* Value 3 */}
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Партньорство</h3>
                <p className="text-slate-600">
                  Третираме всеки клиент като партньор. Успехът ви е наш успех, 
                  затова работим заедно за постигане на общи цели.
                </p>
              </div>

              {/* Value 4 */}
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Иновация</h3>
                <p className="text-slate-600">
                  Постоянно търсим нови начини да подобрим изживяването. 
                  Иновацията е двигателят на нашия растеж.
                </p>
              </div>

              {/* Value 5 */}
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Отговорност</h3>
                <p className="text-slate-600">
                  Поемаме отговорност за действията си и стоим зад продуктите, 
                  които създаваме. Вашето доверие е най-ценното за нас.
                </p>
              </div>

              {/* Value 6 */}
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Прозрачност</h3>
                <p className="text-slate-600">
                  Комуникираме открито и честно. Прозрачността създава доверие 
                  и дълготрайни партньорски отношения.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Нашата история
                </h2>
                <p className="text-lg text-slate-600">
                  Как започна всичко и къде сме днес
                </p>
              </div>

              <div className="space-y-12">
                {/* Timeline Item 1 */}
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">2024</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Началото</h3>
                    <p className="text-slate-600 leading-relaxed">
                      e-menu.bg се роди от идеята да направим дигиталните менюта достъпни за всеки ресторант в България. 
                      Видяхме как пандемията промени нуждите на бизнеса и решихме да помогнем с иновативни решения.
                    </p>
                  </div>
                </div>

                {/* Timeline Item 2 */}
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Първите клиенти</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Започнахме с няколко пилотни проекта в София и Пловдив. Обратната връзка от първите ни клиенти 
                      ни помогна да усъвършенстваме платформата и да разберем реалните нужди на пазара.
                    </p>
                  </div>
                </div>

                {/* Timeline Item 3 */}
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Днес</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Сега обслужваме ресторанти в цяла България и продължаваме да развиваме нови функционалности. 
                      Нашата цел е да станем водещата платформа за дигитални менюта в региона.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Готови сте да се присъедините към нас?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Станете част от революцията в ресторантската индустрия. 
              Започнете да използвате модерни дигитални решения още днес.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors duration-300 transform hover:scale-105 shadow-lg"
              >
                Свържете се с нас
              </Link>
              <Link
                href="/login"
                className="bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-800 transition-colors duration-300 transform hover:scale-105 shadow-lg border border-blue-500"
              >
                Започнете безплатно
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
} 