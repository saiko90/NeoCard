const withNextIntl = require('next-intl/plugin')('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // --- NOUVEAU BLOC : EN-TÊTES DE SÉCURITÉ ---
  async headers() {
    return [
      {
        // Applique ces règles à absolument toutes les pages du site
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          },
          {
            // Protection XSS basique (sans casser Framer Motion ni Google Tag Manager)
            key: 'Content-Security-Policy',
            value: "upgrade-insecure-requests; frame-ancestors 'self';"
          }
        ]
      }
    ];
  }
};

module.exports = withNextIntl(nextConfig);