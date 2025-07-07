import ContactForm from './ContactForm';
import Link from 'next/link';

export const metadata = {
  title: 'Контакти | E-Menu - Дигитални менюта за ресторанти',
  description: 'Свържете се с екипа на E-Menu. Получете помощ, поддръжка или се консултирайте за дигиталните менюта за вашия ресторант.',
  keywords: 'контакти, E-Menu, дигитални менюта, поддръжка, ресторанти, QR менюта, помощ',
  openGraph: {
    title: 'Контакти | E-Menu - Дигитални менюта за ресторанти',
    description: 'Свържете се с екипа на E-Menu за поддръжка и консултации за дигиталните менюта.',
    type: 'website',
    locale: 'bg_BG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Контакти | E-Menu',
    description: 'Свържете се с нас за поддръжка и консултации',
  },
  alternates: {
    canonical: '/contact',
  },
  robots: {
    index: true,
    follow: true,
  }
};

const contactInfo = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Имейл поддръжка",
    value: "support@e-menu.bg",
    link: "mailto:support@e-menu.bg",
    description: "За технически въпроси и поддръжка"
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
      </svg>
    ),
    title: "Бизнес запитвания",
    value: "business@e-menu.bg",
    link: "mailto:business@e-menu.bg",
    description: "За партньорства и бизнес предложения"
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Локация",
    value: "София, България",
    link: null,
    description: "Обслужваме ресторанти в цяла България"
  }
];

const benefits = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Бърз отговор",
    description: "Отговаряме на всички запитвания до 2 часа в работно време"
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Безплатна поддръжка",
    description: "Пълна техническа поддръжка включена в плана"
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Персонализирана помощ",
    description: "Индивидуален подход за всеки ресторант"
  }
];

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Контакти - E-Menu",
    "description": "Свържете се с екипа на E-Menu за поддръжка и консултации за дигитални менюта",
    "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://e-menu.bg'}/contact`,
    "mainEntity": {
      "@type": "Organization",
      "name": "E-Menu",
      "email": "support@e-menu.bg",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "София",
        "addressCountry": "Bulgaria"
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "support@e-menu.bg",
          "contactType": "customer service",
          "availableLanguage": "Bulgarian"
        }
      ]
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
        <div className="relative bg-white border-b border-slate-200">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                Свържете се с
                <span className="block text-blue-600">нашия екип</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12">
                Имате въпроси за дигиталните менюта? Нуждаете се от помощ? 
                Нашият екип е тук, за да ви помогне да успеете.
              </p>
              
              {/* Quick benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {benefits.map((benefit, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                      <div className="text-blue-600">
                        {benefit.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-600">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Contact Information */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">
                  Информация за контакт
                </h2>
                
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="group">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors duration-300">
                            <div className="text-blue-600">
                              {item.icon}
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-slate-900 mb-1">
                            {item.title}
                          </h3>
                          {item.link ? (
                            <Link
                              href={item.link}
                              className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
                            >
                              {item.value}
                            </Link>
                          ) : (
                            <p className="text-slate-900 font-medium">
                              {item.value}
                            </p>
                          )}
                          <p className="text-sm text-slate-500 mt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* FAQ Link */}
                <div className="mt-8 pt-8 border-t border-slate-200">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">Често задавани въпроси</h4>
                      <p className="text-sm text-slate-500">
                        Проверете нашите <Link href="/faq" className="text-blue-600 hover:text-blue-700">ЧЗВ</Link> за бързи отговори
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Изпратете ни съобщение
                </h2>
                <p className="text-slate-600 mb-8">
                  Попълнете формата по-долу и ще се свържем с вас възможно най-скоро.
                </p>
                
                <ContactForm />
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                Готови да започнете?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Създайте дигитално меню за вашия ресторант още днес. 
                Безплатно тестване за 30 дни.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors duration-300 transform hover:scale-105"
                >
                  Започнете безплатно
                </Link>
                {/* <Link
                    href="/demo"
                  className="bg-transparent border-2 border-slate-600 hover:border-slate-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors duration-300"
                >
                  Вижте демо
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 