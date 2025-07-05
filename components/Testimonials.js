export default function Testimonials() {
  const testimonials = [
    {
      name: 'Иван Петров',
      role: 'Собственик на ресторант "Старата къща"',
      location: 'София',
      image: '👨‍💼',
      rating: 5,
      text: 'e-menu.bg промени начина, по който клиентите ни разглеждат менюто. Много по-удобно и модерно! Клиентите харесват QR кода и лесния достъп.',
      highlight: 'Увеличихме продажбите с 25%'
    },
    {
      name: 'Мария Георгиева',
      role: 'Мениджър на "Mediteraneo"',
      location: 'Варна',
      image: '👩‍💼',
      rating: 5,
      text: 'Невероятно лесно е да управляваш менюто. Можем да променяме цените и да добавяме нови ястия в реalno време. Много препоръчвам!',
      highlight: 'Спестихме 80% време за актуализации'
    },
    {
      name: 'Стефан Димитров',
      role: 'Собственик на "Pizza Corner"',
      location: 'Пловдив',
      image: '🍕',
      rating: 5,
      text: 'Мултиезичният интерфейс е страхотен за туристите. Имаме много чуждестранни клиенти и те лесно могат да разберат менюто на английски.',
      highlight: 'Подобрихме клиентското изживяване'
    },
    {
      name: 'Анна Стоянова',
      role: 'Управител на "Градска градина"',
      location: 'Бургас',
      image: '👩‍🍳',
      rating: 5,
      text: 'Техническата поддръжка е отлична! Всичко е настроено перфектно и никога не сме имали проблеми. Клиентите обичат новото дигитално меню.',
      highlight: 'Нулеви технически проблеми'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Какво казват нашите клиенти?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Повече от 50+ ресторанта в България вече използват e-menu.bg за своите дигитални менюта
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              {/* Rating */}
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-gray-700 text-lg leading-relaxed mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>

              {/* Highlight */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 font-semibold text-center">
                  ✅ {testimonial.highlight}
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-2xl mr-4">
                  {testimonial.image}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  <p className="text-gray-500 text-sm flex items-center">
                    📍 {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Присъединете се към успешните ресторанти
            </h3>
            <p className="text-gray-600">
              Доверие от ресторанти в цяла България
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">50+</div>
              <p className="text-gray-600">Активни ресторанти</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">1000+</div>
              <p className="text-gray-600">Дневни прегледи</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">99.9%</div>
              <p className="text-gray-600">Uptime гаранция</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <p className="text-gray-600">Техническа поддръжка</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 