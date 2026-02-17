import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://neocard.ch';
  const locales = ['fr', 'en', 'de', 'it', 'he', 'ru'];

  // On crée la liste des langues pour les balises "hreflang"
  const alternateLanguages = locales.reduce((acc, locale) => {
    acc[locale] = `${baseUrl}/${locale}`;
    return acc;
  }, {} as Record<string, string>);
  
  // On ajoute la langue par défaut (fallback)
  alternateLanguages['x-default'] = `${baseUrl}/fr`;

  // On génère dynamiquement une entrée pour chaque langue
  const sitemapEntries: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    // On donne un petit bonus de priorité au français (ta langue principale)
    priority: locale === 'fr' ? 1 : 0.9,
    
    // C'est ici que la magie opère pour le SEO multilingue
    alternates: {
      languages: alternateLanguages,
    },
  }));

  return sitemapEntries;
}