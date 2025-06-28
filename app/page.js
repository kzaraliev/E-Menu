import Link from 'next/link'
import Pricing from '@/components/Pricing'
import ButtonCustomerPortal from '@/components/ButtonCustomerPortal'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-gradient-to-br from-blue-50 to-indigo-100 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">e-menu.bg</span>
                  <span className="block text-blue-600 xl:inline"> - Цифрови менюта</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Създайте и управлявайте цифровото меню на вашия ресторант лесно и бързо. 
                  Всеки ресторант получава уникална страница на e-menu.bg/име-на-ресторант
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      href="/login"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    >
                      Започнете сега
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a
                      href="#features"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                    >
                      Научете повече
                    </a>
                    <ButtonCustomerPortal />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-56 w-full bg-cover bg-center sm:h-72 md:h-96 lg:w-full lg:h-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
            <div className="text-white text-6xl">🍽️</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Функции</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Всичко нужно за цифровото ви меню
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white text-2xl">
                  🏪
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Уникална страница</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Всеки ресторант получава своя страница: e-menu.bg/име-на-ресторант
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white text-2xl">
                  📱
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Мобилно оптимизирано</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Перфектно изглежда на всякакви устройства - телефони, таблети, компютри
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white text-2xl">
                  ⚡
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Лесно управление</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Интуитивен админ панел за добавяне и редактиране на менюто
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white text-2xl">
                  📸
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">OCR (скоро)</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Автоматично създаване на меню от снимка на съществуващо меню
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Pricing />

      {/* CTA Section */}
      <div className="bg-blue-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Готови за цифровото меню?</span>
            <span className="block text-blue-600">Започнете още днес.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Регистрирайте се
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
