'use client';

import { useAuth } from '../lib/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Customer portal link
const customerPortalLink =
    'https://billing.stripe.com/p/login/test_6oU7sLayceiN1fV42Z63K00';

const ButtonCustomerPortal = () => {
    const { user, loading } = useAuth();
    const router = useRouter();

    const handleSignIn = () => {
        router.push('/login');
    };

    if (loading) {
        return (
            <button 
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-50 cursor-not-allowed transition-all duration-200"
                disabled
            >
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Зареждане...
            </button>
        );
    }

    if (user) {
        return (
            <Link
                href={
                    customerPortalLink +
                    '?prefilled_email=' +
                    user?.email
                }
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                target="_blank"
                rel="noopener noreferrer"
            >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Фактуриране
            </Link>
        );
    }

    return (
        <button 
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            onClick={handleSignIn}
        >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Вход
        </button>
    );
};

export default ButtonCustomerPortal;