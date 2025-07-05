export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard/',
        '/api/',
        '/_next/',
        '/login',
      ],
    },
    sitemap: 'https://e-menu.bg/sitemap.xml',
  }
} 