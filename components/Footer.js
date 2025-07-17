import Link from 'next/link';

const navigation = {
    solutions: [
      { name: 'Дигитални менюта', href: '/#features' },
      { name: 'QR код генератор', href: '/#features' },
      { name: 'Мобилна оптимизация', href: '/#features' },
      { name: 'Ценообразуване', href: '/#pricing' },
    ],
    support: [
      { name: 'Помощ', href: '/contact' },
    ],
    company: [
      { name: 'За нас', href: '/about' },
      { name: 'Блог', href: '/blog' },
      { name: 'Контакти', href: '/contact' },
    ],
    legal: [
      { name: 'Условия за ползване', href: '/terms-of-use' },
      { name: 'Политика за поверителност', href: '/privacy-policy' },
      { name: 'Политика за бисквитки', href: '/cookies-policy' },
    ],
    social: [
      {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/konstantin-zaraliev-9826a4262',
        icon: (props) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        ),
      },
    ],
  }
  
  export default function Footer() {
    return (
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        {/* CTA Section */}
        {/* <div className="border-b border-gray-700">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <hgroup>
                <h2 className="text-base/7 font-semibold text-indigo-400">Започнете днес</h2>
                <p className="mt-4 text-4xl font-bold tracking-tight text-balance text-white sm:text-6xl">
                  Готови за дигиталното меню?
                </p>
              </hgroup>
              <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-300">
                Създайте професионално дигитално меню за вашия ресторант за минути. 
                Лесно управление, QR код достъп и мобилна оптимизация.
              </p>
              <div className="mt-10 flex justify-center gap-6">
                <Link
                  href="/login"
                  className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-2xl hover:from-indigo-700 hover:to-purple-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transform hover:scale-105 transition-all duration-300"
                >
                  Започнете безплатно
                </Link>
                <Link
                  href="/#pricing"
                  className="rounded-xl border border-gray-600 bg-gray-800/50 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-gray-700/50 backdrop-blur-sm transition-all duration-300"
                >
                  Вижте цените
                </Link>
              </div>
            </div>
          </div>
        </div> */}
        
        {/* Main Footer Content */}
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
            {/* Brand Section */}
            <div className="md:col-span-1 space-y-6">
              <Link href="/" className="flex items-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  e-menu.bg
                </div>
              </Link>
              <p className="text-base text-gray-300 leading-relaxed">
                Водещата платформа за дигитални менюта в България. 
                Помагаме на ресторантите да се дигитализират лесно и бързо.
              </p>
              <div className="flex gap-4">
                {navigation.social.map((item) => (
                  <Link
                    key={item.name} 
                    href={item.href} 
                    target="_blank"
                    className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 transform hover:scale-110"
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon aria-hidden="true" className="size-7" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigation Sections */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Решения</h3>
              <ul role="list" className="space-y-4">
                {navigation.solutions.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      className="text-base text-gray-300 hover:text-indigo-400 transition-colors duration-300"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Поддръжка</h3>
              <ul role="list" className="space-y-4">
                {navigation.support.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      className="text-base text-gray-300 hover:text-indigo-400 transition-colors duration-300"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Компания</h3>
              <ul role="list" className="space-y-4">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      className="text-base text-gray-300 hover:text-indigo-400 transition-colors duration-300"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-gray-400 mb-4">Правни</h4>
                <ul role="list" className="space-y-3">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="text-sm text-gray-400 hover:text-indigo-400 transition-colors duration-300"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="mt-16 pt-8 border-t border-gray-700">
            <p className="text-center text-sm text-gray-400">
              &copy; 2024 e-menu.bg. Всички права запазени.
            </p>
          </div>
        </div>
      </footer>
    )
  }
  