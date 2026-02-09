import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Lato } from 'next/font/google';
import { GoogleTagManager } from '@next/third-parties/google'; // Importation du composant officiel

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

export const metadata: Metadata = {
  title: 'NeoCard - Le futur du faire-part',
  description: 'Expériences web immersives pour mariages et grands moments de vie.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${lato.variable} scroll-smooth`}>
      {/* Le composant GoogleTagManager s'occupe d'insérer le script dans le <head> 
          et le noscript au bon endroit automatiquement.
      */}
      <GoogleTagManager gtmId="GTM-PJLHPWLK" />
      
      <body className="bg-black font-sans antialiased text-slate-200">
        {children}
      </body>
    </html>
  );
}