import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Lato } from 'next/font/google';
import { GoogleTagManager } from '@next/third-parties/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const lato = Lato({ 
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const locales = ['fr', 'en', 'de', 'it', 'he', 'ru'];

// =============================================================
// --- GÉNÉRATION DYNAMIQUE DU SEO (METADATA) ---
// =============================================================
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  
  // On charge spécifiquement le bloc SEO du bon fichier JSON
  const t = await getTranslations({ locale, namespace: 'SEO' });

  // L'URL de base de ton site (à adapter si tu as un autre domaine principal)
  const baseUrl = 'https://neocard.ch';

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL(baseUrl),
    
    // Le Hreflang : Indispensable pour dire à Google que ces pages sont des traductions
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'fr': '/fr',
        'en': '/en',
        'de': '/de',
        'it': '/it',
        'he': '/he',
        'ru': '/ru',
        'x-default': '/fr' // La langue de repli si la langue du visiteur est inconnue
      },
    },

    // OpenGraph : Pour que le partage sur WhatsApp, iMessage et LinkedIn soit magnifique
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${baseUrl}/${locale}`,
      siteName: 'NeoCard',
      locale: locale,
      type: 'website',
      // images: [
      //   {
      //     url: '/og-image.jpg', // Un beau visuel 1200x630px que tu devras mettre dans le dossier /public
      //     width: 1200,
      //     height: 630,
      //     alt: 'NeoCard - Faire-part digitaux',
      //   },
      // ],
    },
    
    // Pour Twitter / X
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    }
  };
}

// =============================================================
// --- LAYOUT PRINCIPAL ---
// =============================================================
export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();
  const direction = locale === 'he' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction} className={`${playfair.variable} ${lato.variable} scroll-smooth`}>
      <GoogleTagManager gtmId="GTM-PJLHPWLK" />
      
      <body className="bg-black font-sans antialiased text-slate-200">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}