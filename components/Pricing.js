'use client';

import React, { useState } from 'react';
import { useAuth } from '../lib/auth-context';
import Image from 'next/image';

// Stripe Plans >> fill in your own priceId & link
export const plans = [
    {
        link: process.env.NODE_ENV === 'development' ? 'https://buy.stripe.com/test_6oU7sLayceiN1fV42Z63K00' : '',
        priceId: process.env.NODE_ENV === 'development' ? 'price_1ReuJ3HWilXYbGmnpAWwnjmL' : '',
        price: 9.99,
        duration: '/month'
    },
    {
        link: process.env.NODE_ENV === 'development' ? 'https://buy.stripe.com/test_bJe14n6hWb6B2jZ2YV63K01' : '',
        priceId: process.env.NODE_ENV === 'development' ? 'price_1ReuNbHWilXYbGmnit7DBh5z' : '',

        price: 99.99,
        duration: '/year'
    }
];

const Pricing = () => {
    const { user } = useAuth();
    const [plan, setPlan] = useState(plans[0]);

    return (
        <>
            <section id="pricing" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="py-16 px-4 max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-lg font-medium text-indigo-600 mb-4">Ценообразуване</p>
                        <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                            Готови за цифровото меню?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Изберете план, който най-добре отговаря на нуждите на вашия ресторант
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <div className="w-full max-w-md">
                            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8 p-4 bg-gray-50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="plan"
                                            value="monthly"
                                            className="radio radio-primary w-5 h-5"
                                            checked={plan.price === 9.99}
                                            onChange={() => setPlan(plans[0])}
                                        />
                                        <label 
                                            className="cursor-pointer text-gray-700 font-medium"
                                            onClick={() => setPlan(plans[0])}
                                        >
                                            Месечно
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="plan"
                                            value="yearly"
                                            className="radio radio-primary w-5 h-5"
                                            checked={plan.price === 99.99}
                                            onChange={() => setPlan(plans[1])}
                                        />
                                        <label 
                                            className="cursor-pointer text-gray-700 font-medium"
                                            onClick={() => setPlan(plans[1])}
                                        >
                                            Годишно <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-sm font-bold">17% OFF 💰</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="text-center mb-8">
                                    <div className="flex items-baseline justify-center gap-2 mb-2">
                                        <span className="text-6xl font-bold text-gray-900">
                                            ${plan.price}
                                        </span>
                                        <span className="text-xl text-gray-500 font-medium">
                                            {plan.duration}
                                        </span>
                                    </div>
                                    {plan.price === 99.99 && (
                                        <p className="text-green-600 font-medium">
                                            Спестявате $19.89 годишно!
                                        </p>
                                    )}
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {[
                                        {
                                            name: 'Дигитално меню за ресторанта'
                                        },
                                        { name: 'QR код за лесен достъп' },
                                        { name: 'Управление на продукти' },
                                        { name: 'Мултиезичен интерфейс' },
                                        { name: 'Безплатни актуализации' },
                                        { name: '24/7 техническа поддръжка' }
                                    ].map((feature, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center gap-3"
                                        >
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
                                            <span className="text-gray-700 font-medium">{feature.name}</span>
                                        </li>
                                    ))}
                                </ul>
                                
                                <div className="pt-6 border-t border-gray-100">
                                    <a
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-colors duration-200 inline-block text-center text-lg"
                                        target="_blank"
                                        href={
                                            plan.link +
                                            '?prefilled_email=' +
                                            user?.email
                                        }
                                    >
                                        Регистрирайте се
                                    </a>
                                    <p className="text-center text-sm text-gray-500 mt-3">
                                        Започнете за минути. Отменете по всяко време.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Pricing;