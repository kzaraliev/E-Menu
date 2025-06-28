"use client";

import React, { useState } from "react";
import { useAuth } from "../lib/auth-context";

// Stripe Plans
export const plans = [
  {
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_6oU7sLayceiN1fV42Z63K00"
        : "",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1ReuJ3HWilXYbGmnpAWwnjmL"
        : "",
    priceBGN: 9.99,
    priceEUR: 5.11,
    duration: "/месец",
  },
  {
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_bJe14n6hWb6B2jZ2YV63K01"
        : "",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1ReuNbHWilXYbGmnit7DBh5z"
        : "",
    priceBGN: 99.99,
    priceEUR: 51.12,
    duration: "/година",
  },
];

const DashboardPricing = () => {
  const { user } = useAuth();
  const [plan, setPlan] = useState(plans[0]);

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Изберете план за да започнете
          </h2>
          <p className="text-lg text-gray-600">
            Създайте професионално дигитално меню за вашия ресторант
          </p>
        </div>

        {/* Warning Card */}
        <div className="mb-8 bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-orange-800">
                Активен план е необходим
              </h3>
              <div className="mt-1 text-sm text-orange-700">
                <p>
                  За да създадете и управлявате ресторанта си, трябва да изберете план.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Plan Selection */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6">
            {/* Plan Toggle */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-6 p-3 bg-gray-50 rounded-lg">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="plan"
                    value="monthly"
                    className="w-4 h-4 text-blue-600"
                    checked={plan.priceBGN === 9.99}
                    onChange={() => setPlan(plans[0])}
                  />
                  <span className="text-gray-700 font-medium">Месечно</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="plan"
                    value="yearly"
                    className="w-4 h-4 text-blue-600"
                    checked={plan.priceBGN === 99.99}
                    onChange={() => setPlan(plans[1])}
                  />
                  <span className="text-gray-700 font-medium">
                    Годишно{" "}
                    <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs font-bold">
                      17% OFF 💰
                    </span>
                  </span>
                </label>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Price Section */}
              <div className="text-center">
                <div className="flex items-baseline justify-center gap-2 mb-4">
                  <span className="text-5xl font-bold text-gray-900">
                    {plan.priceBGN}
                  </span>
                  <div className="flex flex-col items-start">
                    <span className="text-lg text-gray-900 font-bold">лв</span>
                    <span className="text-sm text-gray-500 font-medium">
                      {plan.duration}
                    </span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-2xl font-bold text-blue-900">
                      {plan.priceEUR}
                    </span>
                    <span className="text-sm text-blue-900 font-bold">
                      €{plan.duration}
                    </span>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">
                    Готови за еврозоната 🇪🇺
                  </p>
                </div>

                {plan.priceBGN === 99.99 && (
                  <p className="text-green-600 font-medium text-sm">
                    Спестявате 19.89 лв (10.17 €) годишно!
                  </p>
                )}
              </div>

              {/* Features Section */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Какво получавате:
                </h4>
                <ul className="space-y-3">
                  {[
                    "Дигитално меню за ресторанта",
                    "QR код за лесен достъп",
                    "Управление на продукти и категории",
                    "Мултиезичен интерфейс",
                    "Безплатни актуализации",
                    "24/7 техническа поддръжка",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-3 h-3 text-green-600"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="text-center">
                <a
                  className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-200 inline-block text-lg"
                  target="_blank"
                  href={plan.link + "?prefilled_email=" + user?.email}
                >
                  Започнете сега
                </a>
                <p className="text-sm text-gray-500 mt-3">
                  Започнете за минути. Отменете по всяко време.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Имате въпроси? Свържете се с нас на{" "}
            <a href="mailto:support@e-menu.bg" className="text-blue-600 hover:text-blue-800">
              support@e-menu.bg
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPricing; 