import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['fr', 'en', 'de', 'it', 'he', 'ru'];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  
  // Sécurité additionnelle si la langue n'est pas trouvée
  if (!locale || !locales.includes(locale)) {
    locale = 'fr';
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});