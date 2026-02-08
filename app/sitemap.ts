import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Remplace par ton VRAI domaine de production (ex: le lien Vercel final)
  const baseUrl = 'https://neocard.ch'; 

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // Si tu as d'autres pages (ex: /contact, /blog), ajoute-les ici :
    // {
    //   url: `${baseUrl}/a-propos`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ];
}