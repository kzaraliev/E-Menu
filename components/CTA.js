'use client'

import Link from 'next/link';
import { useAuth } from '../lib/auth-context';
import { useRouter } from 'next/navigation';

export default function CTA() {
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
    <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTAgMGMwLTIuMjA5LTEuNzkxLTQtNC00cy00IDEuNzkxLTQgNCAx0Ljc5MSA0IDQgNCA0LTEuNzkxIDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Готови за дигиталното бъдеще?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Присъединете се към 50+ ресторанта в България, които вече използват e-menu.bg 
            за по-модерно и удобно обслужване на клиентите си
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold text-white mb-2">Бърза настройка</h3>
              <p className="text-purple-100 text-sm">Готови за по-малко от 15 минути</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl mb-4">📱</div>
              <h3 className="text-lg font-semibold text-white mb-2">QR код достъп</h3>
              <p className="text-purple-100 text-sm">Лесен достъп без приложения</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl mb-4">🌍</div>
              <h3 className="text-lg font-semibold text-white mb-2">Мултиезичен</h3>
              <p className="text-purple-100 text-sm">Подходящо за всички клиенти</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={handleGetStarted}
              className="px-8 py-4 bg-white text-indigo-900 font-bold rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-2xl text-lg"
            >
              {user ? '🚀 Към таблото' : '🚀 Започнете безплатно'}
            </button>
            <Link
              href="#pricing"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-indigo-900 transition-all duration-200 text-lg"
            >
              💰 Вижте цените
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
            <div className="flex items-center text-white">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18l-8-8 1.414-1.414L10 15.172l6.586-6.586L18 10l-8 8z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">SSL сигурност</span>
            </div>
            <div className="flex items-center text-white">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18l-8-8 1.414-1.414L10 15.172l6.586-6.586L18 10l-8 8z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">GDPR съвместимост</span>
            </div>
            <div className="flex items-center text-white">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18l-8-8 1.414-1.414L10 15.172l6.586-6.586L18 10l-8 8z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">99.9% Uptime</span>
            </div>
            <div className="flex items-center text-white">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18l-8-8 1.414-1.414L10 15.172l6.586-6.586L18 10l-8 8z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">24/7 поддръжка</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 120" className="w-full h-12 fill-white">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,53.3C672,53,768,75,864,80C960,85,1056,75,1152,69.3C1248,64,1344,64,1392,64L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
} 