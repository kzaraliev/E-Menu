export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Регистрация',
      description: 'Създайте безплатен профил за вашия ресторант за минути',
      icon: '👤',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      number: '02',
      title: 'Добавяне на меню',
      description: 'Лесно добавяне на категории, ястия, цени и описания',
      icon: '📝',
      color: 'from-green-500 to-emerald-600'
    },
    {
      number: '03',
      title: 'QR код генериране',
      description: 'Автоматично генериране на QR код за достъп до менюто',
      icon: '📱',
      color: 'from-purple-500 to-pink-600'
    },
    {
      number: '04',
      title: 'Готово!',
      description: 'Поставете QR кода на масите и клиентите могат да разглеждат менюто',
      icon: '🎉',
      color: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Как работи?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Започнете с вашето дигитално меню за минути. Простият ни процес ви позволява да стартирате бързо и лесно.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 z-0"></div>
              )}
              
              <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-gray-200">
                {/* Step Number */}
                <div className="absolute -top-4 left-8 bg-white px-3 py-1 rounded-full border border-gray-200">
                  <span className="text-sm font-bold text-gray-600">{step.number}</span>
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center text-3xl shadow-lg`}>
                  {step.icon}
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 