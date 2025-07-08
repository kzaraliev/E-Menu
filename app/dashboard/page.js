"use client";

import { useAuth } from "@/lib/auth-context";
import { useSubscription } from "@/lib/payment-protection";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Pricing from "@/components/Pricing";
import ButtonCustomerPortal from "@/components/ButtonCustomerPortal";

export default function DashboardPage() {
  const { user } = useAuth();
  const {
    hasActiveSubscription,
    loading: subscriptionLoading,
    canCreateRestaurant,
  } = useSubscription(user);
  const [stats, setStats] = useState({
    restaurants: 0,
    categories: 0,
    menuItems: 0,
    totalViews: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const { data: restaurants, error: restaurantsError } = await supabase
        .from("restaurants")
        .select("id")
        .eq("owner_id", user.id);

      if (restaurantsError) throw restaurantsError;

      const { data: categories, error: categoriesError } = await supabase
        .from("categories")
        .select("id")
        .in("restaurant_id", restaurants?.map((r) => r.id) || []);

      if (categoriesError) throw categoriesError;

      const { data: menuItems, error: menuItemsError } = await supabase
        .from("menu_items")
        .select("id")
        .in("restaurant_id", restaurants?.map((r) => r.id) || []);

      if (menuItemsError) throw menuItemsError;

      setStats({
        restaurants: restaurants?.length || 0,
        categories: categories?.length || 0,
        menuItems: menuItems?.length || 0,
        totalViews: 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchStats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (loading || subscriptionLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!hasActiveSubscription) {
    return <Pricing />;
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Добре дошли в e-menu.bg Dashboard
          </h1>
          <div className="flex items-center space-x-2 bg-green-50 border-green-200 border rounded-lg px-3 py-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-green-700">
              Активен план
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <span className="text-white font-bold">🏪</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Ресторанти
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.restaurants}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <span className="text-white font-bold">📂</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Категории
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.categories}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                    <span className="text-white font-bold">🍽️</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Артикули в менюто
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.menuItems}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                    <span className="text-white font-bold">👁️</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Общо прегледи
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.totalViews}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Бързи действия
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {canCreateRestaurant ? (
                <Link
                  href="/dashboard/restaurants/new"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  ➕ Добави ресторант
                </Link>
              ) : (
                <Link
                  href="/dashboard/qr-generator"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  🔗 Генерирай QR код
                </Link>
              )}
              <Link
                href="/dashboard/restaurants"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                📝 Редактирай меню
              </Link>
              <ButtonCustomerPortal />
            </div>
          </div>
        </div>

        {stats.restaurants === 0 && canCreateRestaurant && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mt-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Започнете с първия си ресторант
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    Създайте първия си ресторант и започнете да добавяте менюта.
                    Ще можете да генерирате QR код за лесен достъп от клиентите
                    ви.
                  </p>
                </div>
                <div className="mt-4">
                  <div className="-mx-2 -my-1.5 flex">
                    <Link
                      href="/dashboard/restaurants/new"
                      className="bg-blue-50 px-2 py-1.5 rounded-md text-sm font-medium text-blue-800 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Създайте ресторант сега
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
