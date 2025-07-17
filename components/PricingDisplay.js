'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PricingDisplay() {
  const router = useRouter();

  const plans = [
    {
      name: 'Месечен план',
      priceBGN: 9.99,
      priceEUR: 5.11,
      period: 'месец',
      popular: false,
      savings: null,
      features: [
        'Дигитално меню за ресторанта',
        'QR код за лесен достъп',
        'Управление на продукти',
        'Мултиезичен интерфейс',
        'Безплатни актуализации',
        '24/7 техническа поддръжка',
        'Безлимитен брой категории',
        'Безлимитен брой ястия',
        'Персонализиран дизайн',
        'Статистики и анализи'
      ]
    },
    {
      name: 'Годишен план',
      priceBGN: 99.99,
      priceEUR: 51.12,
      period: 'година',
      popular: true,
      savings: 'Спестявате 19.89 лв (10.17 €)',
      features: [
        'Всички функции от месечния план',
        'Дигитално меню за ресторанта',
        'QR код за лесен достъп',
        'Управление на продукти',
        'Мултиезичен интерфейс',
        'Безплатни актуализации',
        '24/7 техническа поддръжка',
        'Безлимитен брой категории',
        'Безлимитен брой ястия',
        'Персонализиран дизайн',
        'Статистики и анализи',
        'Приоритетна поддръжка',
        '17% отстъпка'
      ]
    }
  ];

  const handleGetStarted = () => {
    router.push('/login');
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Прозрачно ценообразуване
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Изберете план, който най-добре отговаря на нуждите на вашия ресторант. 
            Всички планове включват пълен достъп до всички функции.
          </p>
          <div className="mt-6 p-4 bg-blue-100 border border-blue-200 rounded-lg max-w-md mx-auto">
            <p className="text-blue-800 font-medium">
              Готови за еврозоната! Цени в лева и евро
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative bg-white rounded-3xl shadow-xl border ${
                plan.popular ? 'border-indigo-200 ring-2 ring-indigo-500' : 'border-gray-200'
              } overflow-hidden transform hover:scale-105 transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center py-2 text-sm font-bold">
                  🔥 Най-популярен план
                </div>
              )}
              
              <div className={`p-8 ${plan.popular ? 'pt-16' : ''}`}>
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  
                  {/* BGN Price */}
                  <div className="flex items-baseline justify-center mb-4">
                    <span className="text-5xl font-bold text-gray-900">
                      {plan.priceBGN}
                    </span>
                    <span className="text-xl text-gray-600 font-semibold ml-2">
                      лв/{plan.period}
                    </span>
                  </div>
                  
                  {/* EUR Price */}
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 mb-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-2xl font-bold text-indigo-900">
                        {plan.priceEUR}
                      </span>
                      <span className="text-base text-indigo-700 font-semibold ml-2">
                        €/{plan.period}
                      </span>
                    </div>
                  </div>
                  
                  {plan.savings && (
                    <p className="text-green-600 font-semibold text-sm">
                      💰 {plan.savings}
                    </p>
                  )}
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Какво включва:
                  </h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="ml-3 text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="text-center">
                  <button 
                    className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-2 border-gray-200'
                    }`}
                    onClick={handleGetStarted}
                  >
                    Регистрирайте се безплатно
                  </button>
                  <p className="text-sm text-gray-500 mt-3">
                    Безплатна регистрация • Изберете план след влизане
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Защо да изберете e-menu.bg?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Без скрити такси</h4>
                <p className="text-sm text-gray-600">Прозрачно ценообразуване без изненади</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Бърза настройка</h4>
                <p className="text-sm text-gray-600">Готови за работа за под 15 минути</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12l8-8m-8 8v8m0-8L4 4" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Отменете всяка минута</h4>
                <p className="text-sm text-gray-600">Няма дългосрочни договори</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">24/7 поддръжка</h4>
                <p className="text-sm text-gray-600">Винаги сме тук да помогнем</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Quick Links */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Имате въпроси? Разгледайте нашите 
            <Link href="#faq" className="text-indigo-600 hover:text-indigo-800 font-semibold mx-1">
              често задавани въпроси
            </Link>
            или се 
            <Link href="mailto:support@e-menu.bg" className="text-indigo-600 hover:text-indigo-800 font-semibold mx-1">
              свържете с нас
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
} 