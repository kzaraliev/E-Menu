export default function Features() {
  const features = [
    {
      icon: '🏪',
      title: 'Уникална страница',
      description: 'Всеки ресторант получава своя страница: e-menu.bg/име-на-ресторант',
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      icon: '📱',
      title: 'Мобилно оптимизирано',
      description: 'Перфектно изглежда на всякакви устройства - телефони, таблети, компютри',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: '⚡',
      title: 'Лесно управление',
      description: 'Интуитивен админ панел за добавяне и редактиране на менюто',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: '🔍',
      title: 'QR код генератор',
      description: 'Автоматично генерираме QR код за лесен достъп до менюто',
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <div id="features" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Функции</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Всичко нужно за цифровото ви меню
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Нашата платформа предлага всички инструменти за създаване на професионално дигитално меню
          </p>
        </div>

        <div className="mt-16">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-x-8 md:gap-y-10">
            {features.map((feature, index) => (
              <div key={index} className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
                <div className={`absolute -top-4 left-6 flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r ${feature.gradient} text-white text-2xl shadow-lg`}>
                  {feature.icon}
                </div>
                <p className="mt-8 text-lg leading-6 font-semibold text-gray-900">{feature.title}</p>
                <p className="mt-2 text-base text-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 