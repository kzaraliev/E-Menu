'use client'

import { useAuth } from '../lib/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Hero() {
  const { user } = useAuth();
  const router = useRouter();

  const handleGetStarted = () => {
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="bg-white">
      <div className="relative isolate pt-6">
        {/* Background Pattern */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 -z-10 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" width="100%" height="100%" strokeWidth={0} />
        </svg>

        <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            {/* Status Badge */}
            <div className="flex">
              <div className="relative flex items-center gap-x-4 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-1 text-sm/6 text-gray-600 ring-1 ring-green-500/20 hover:ring-green-500/30 transition-all duration-200">
                <span className="font-semibold text-green-600">✨ Нов продукт</span>
                <span aria-hidden="true" className="h-4 w-px bg-gray-900/10" />
                <Link href="/#pricing" className="flex items-center gap-x-1 hover:text-green-600 transition-colors">
                  <span aria-hidden="true" className="absolute inset-0" />
                  Вижте цените
                  <svg className="-mr-2 size-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="mt-10 text-5xl font-bold tracking-tight text-pretty bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent sm:text-7xl">
              Дигитални менюта за ресторанти
            </h1>

            {/* Subheading */}
            <p className="mt-8 text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
              Създайте професионално дигитално меню за вашия ресторант за минути. 
              QR код, лесно управление, мултиезичен интерфейс - всичко това на една платформа.
            </p>

            {/* Features List */}
            <div className="mt-8 flex flex-wrap gap-4">
              {[
                '📱 QR код достъп',
                '🌍 Мултиезичен',
                '⚡ Лесно управление',
                '💡 Модерен дизайн'
              ].map((feature, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium"
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* Call to Action Buttons */}
            <div className="mt-10 flex items-center gap-x-6">
              <button
                onClick={handleGetStarted}
                className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transform hover:scale-105 transition-all duration-200"
              >
                {user ? 'Към таблото' : 'Започнете сега'}
              </button>
              <Link href="/#pricing" className="text-sm/6 font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                Научете повече <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <div className="text-3xl font-bold text-indigo-600">50+</div>
                <div className="text-sm text-gray-600">Активни ресторанти</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-600">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-600">24/7</div>
                <div className="text-sm text-gray-600">Поддръжка</div>
              </div>
            </div>
          </div>

          {/* Hero Image/Visual */}
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:shrink-0 lg:grow">
            <div className="mx-auto w-full max-w-md">
              {/* Modern Phone Mockup with QR Menu */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-600 rounded-3xl transform rotate-6 scale-105 opacity-20"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl p-6 border border-gray-100">
                  {/* Phone Screen */}
                  <div className="bg-gray-900 rounded-2xl p-1">
                    <div className="bg-white rounded-xl overflow-hidden">
                      {/* Phone Header */}
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          </div>
                          <div className="text-xs text-gray-500 font-medium">e-menu.bg</div>
                        </div>
                      </div>
                      
                      {/* Menu Content */}
                      <div className="p-4 space-y-4">
                        <div className="text-center">
                          <h3 className="text-lg font-bold text-gray-900">Ресторант "Орхидея"</h3>
                          <p className="text-sm text-gray-600">Вкусни традиционни ястия</p>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <div>
                              <div className="text-sm font-medium text-gray-900">Шопска салата</div>
                              <div className="text-xs text-gray-500">Свежи зеленчуци, сирене</div>
                            </div>
                            <div className="text-sm font-bold text-indigo-600">8.50 лв</div>
                          </div>
                          
                          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <div>
                              <div className="text-sm font-medium text-gray-900">Пилешко филе</div>
                              <div className="text-xs text-gray-500">С гарнитура по избор</div>
                            </div>
                            <div className="text-sm font-bold text-indigo-600">14.90 лв</div>
                          </div>
                          
                          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <div>
                              <div className="text-sm font-medium text-gray-900">Тирамису</div>
                              <div className="text-xs text-gray-500">Домашен десерт</div>
                            </div>
                            <div className="text-sm font-bold text-indigo-600">6.00 лв</div>
                          </div>
                        </div>
                        
                        <div className="pt-2 border-t border-gray-200">
                          <div className="text-center">
                            <div className="text-xs text-gray-500">Сканирано с QR код</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* QR Code */}
                  <div className="absolute -right-8 -bottom-8 bg-white rounded-xl shadow-lg p-3 border border-gray-200">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 3h6v6H3V3zm8 0h6v6h-6V3zM3 11h6v6H3v-6zm8 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm4 0h2v2h-2v-2zm0-8h2v2h-2V7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
