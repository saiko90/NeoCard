import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Lato } from 'next/font/google';

// Configuration des polices "Luxe"
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
  title: 'NeoCard - Le Faire-Part digital numérique',
  description: 'Expériences web immersives pour mariages et grands moments de vie.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // J'ai ajouté 'scroll-smooth' ici pour le défilement doux
    <html lang="fr" className={`${playfair.variable} ${lato.variable} scroll-smooth`}>
      <body className="bg-black font-sans antialiased text-slate-200">
        {children}
      </body>
    </html>
  );
}