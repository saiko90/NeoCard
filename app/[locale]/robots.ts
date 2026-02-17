import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // On empêche les robots de scanner tes routes API (comme ton webhook n8n)
      disallow: '/api/',
    },
    // On indique à Google où trouver le plan du site
    sitemap: 'https://neocard.ch/sitemap.xml',
  };
}