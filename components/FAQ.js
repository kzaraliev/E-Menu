'use client'

import Link from 'next/link';
import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'Как мога да създам дигитално меню?',
      answer: 'Процесът е изключително лесен! Регистрирате се безплатно, добавяте информацията за вашия ресторант, качвате менюто си и генерирате QR код. Целият процес отнема под 15 минути.'
    },
    {
      question: 'Какво е включено в цената?',
      answer: 'В цената са включени: дигитално меню, QR код генератор, управление на продукти, мултиезичен интерфейс, безплатни актуализации и 24/7 техническа поддръжка.'
    },
    {
      question: 'Как работи QR кодът?',
      answer: 'QR кодът се генерира автоматично за вашия ресторант. Клиентите го сканират с телефона си и директно достъпват менюто ви онлайн. Не е нужна инсталация на приложение.'
    },
    {
      question: 'Мога ли да променям менюто в реално време?',
      answer: 'Абсолютно! Можете да актуализирате цени, добавяте нови ястия или категории по всяко време чрез нашия лесен за използване админ панел. Промените са видими веднага.'
    },
    {
      question: 'Поддържате ли мултиезичност?',
      answer: 'Да! Можете да добавите преводи на менюто си на различни езици. Това е особено полезно за ресторанти, които обслужват туристи или международни клиенти.'
    },
    {
      question: 'Нужно ли е специално оборудване?',
      answer: 'Не, не е нужно специално оборудване! Всичко работи с обикновени смартфони и таблети. Вие само поставяте отпечатания QR код на масите.'
    },
    {
      question: 'Какво се случва ако имам технически проблеми?',
      answer: 'Нашият екип предлага 24/7 техническа поддръжка. Можете да се свържете с нас по всяко време и ще решим всеки проблем максимално бързо.'
    },
    {
      question: 'Мога ли да отменя абонамента по всяко време?',
      answer: 'Разбира се! Можете да отмените абонамента си по всяко време без допълнителни такси. Няма договори за дълъг период или скрити условия.'
    },
    {
      question: 'Как се генерира QR кодът?',
      answer: 'QR кодът се генерира автоматично за вашия ресторант след като настроите менюто. Можете да го изтеглите като PDF файл и да го отпечатате в желания размер.'
    },
    {
      question: 'Безопасни ли са данните ми?',
      answer: 'Да, всички данни се съхраняват сигурно с SSL криптиране и редовни backup-и. Спазваме GDPR изискванията и не споделяме вашите данни с трети страни.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Често задавани въпроси
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Отговори на най-често задаваните въпроси за нашата платформа
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors">
              <button
                className="w-full px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-2xl"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Все още имате въпроси?
          </h3>
          <p className="text-gray-600 mb-6">
            Нашият екип е готов да ви помогне с всякакви въпроси
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="mailto:support@e-menu.bg"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              📧 support@e-menu.bg
            </Link>
            <Link
              href="tel:+359888123456"
              className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              📞 +359 888 123 456
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 