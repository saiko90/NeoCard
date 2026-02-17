import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // La liste exacte 6 langues
  locales: ['fr', 'en', 'de', 'it', 'he', 'ru'],
  // La langue par défaut
  defaultLocale: 'fr'
});

export const config = {
  // Le matcher qui dit à Next.js quelles pages doivent être traduites
  matcher: ['/', '/(fr|en|de|it|he|ru)/:path*']
};