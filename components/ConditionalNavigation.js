'use client'

import { usePathname } from 'next/navigation';
import Navigation from './Navigation';

export default function ConditionalNavigation() {
  const pathname = usePathname();
  
  // Check if we're on a restaurant page (slug route)
  // Restaurant pages have pattern: /restaurant-slug (no additional path segments)
  const isRestaurantPage = pathname && 
    pathname !== '/' && 
    !pathname.startsWith('/dashboard') && 
    !pathname.startsWith('/login') && 
    !pathname.startsWith('/api') && 
    !pathname.startsWith('/blog') && 
    !pathname.startsWith('/contact') && 
    !pathname.startsWith('/about') && 
    !pathname.startsWith('/privacy-policy') && 
    !pathname.startsWith('/terms-of-use') && 
    !pathname.startsWith('/cookies-policy') && 
    pathname.split('/').length === 2;

  // Don't render Navigation on restaurant pages
  if (isRestaurantPage) {
    return null;
  }

  return <Navigation />;
} 