'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Flame, Baby, Crown, ChevronDown } from 'lucide-react';
// Vérifie bien que ce chemin est correct selon où tu as rangé le fichier
import MariageModal from './components/MariageModal'; 

const BRAND = {
  name: "NeoCard",
  tagline: "Architecte de vos Souvenirs",
  email: "contact@neocard.ch"
};

export default function LandingPage() {
  const [showMariage, setShowMariage] = useState(false);

  return (
    <div className="bg-black text-slate-200 font-sans selection:bg-amber-500 selection:text-black overflow-x-hidden">
      
      {/* --- HERO : L'ENTRÉE DANS L'UNIVERS --- */}
      <HeroSection />

      {/* --- CHAPITRE 1 : GRANDEUR (Les Célébrations) --- */}
      {/* On passe la fonction pour ouvrir le modal ici */}
      <GrandeurSection onOpenMariage={() => setShowMariage(true)} />

      {/* --- CHAPITRE 2 : DOUCEUR (La Famille) --- */}
      <FamilySection />

      {/* --- CHAPITRE 3 : PASSION (Les Amoureux) --- */}
      <LoveSection />

      {/* --- CHAPITRE 4 : ÉTERNITÉ (Le Souvenir) --- */}
      <MemorySection />

      {/* --- L'ARTISAN (Ta section présentation) --- */}
      <ArtisanSection />

      {/* --- MODALE (S'affiche si showMariage est true) --- */}
      <AnimatePresence>
        {showMariage && <MariageModal onClose={() => setShowMariage(false)} />}
      </AnimatePresence>

      {/* --- FOOTER --- */}
      <footer className="py-24 bg-slate-950 text-center border-t border-white/5">
        <h2 className="text-4xl font-serif text-white mb-6 tracking-widest">{BRAND.name}</h2>
        <p className="text-slate-500 text-sm mb-8">Votre histoire mérite le meilleur écrin.</p>
        <a 
          href={`mailto:${BRAND.email}`}
          className="inline-block border border-amber-500/50 text-amber-500 px-8 py-3 rounded-full hover:bg-amber-500 hover:text-black transition-all duration-300 uppercase tracking-widest text-xs font-bold"
        >
          Demander un devis
        </a>
      </footer>
    </div>
  );
}

// --- SECTIONS DÉTAILLÉES ---

function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Background Cosmique */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-black to-black z-0" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-pulse z-0" />
      
      <motion.div style={{ y }} className="relative z-10 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs uppercase tracking-widest text-amber-400"
        >
          <Sparkles className="w-3 h-3" /> Le futur du Faire-Part
        </motion.div>
        
        <h1 className="text-6xl md:text-9xl font-serif font-thin mb-8 text-white tracking-tighter">
          {BRAND.name}
        </h1>
        
        <p className="text-lg md:text-2xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
          Nous transformons les grands moments de votre vie en <span className="text-white font-normal">expériences web immersives</span>.
          <br/>Bienvenue dans le futur du faire-part.
        </p>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-600"
      >
        <ChevronDown className="w-8 h-8 opacity-50" />
      </motion.div>
    </section>
  );
}

// Correction ici : Ajout de la prop onOpenMariage
function GrandeurSection({ onOpenMariage }: { onOpenMariage: () => void }) {
  return (
    <section className="py-32 px-4 relative z-10 bg-gradient-to-b from-black to-slate-900">
      <div className="max-w-6xl mx-auto">
        <SectionHeader 
          title="Grandeurs & Célébrations" 
          subtitle="Quand la fête devient inoubliable" 
          icon={<Crown className="w-6 h-6 text-amber-400" />}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {/* Correction ici : Nettoyage et ajout du onClick */}
          <FeatureCard 
            title="Le Mariage" 
            price="Dès 1'900 CHF"
            desc="L'offre signature. Timeline de votre histoire, Livre d'or Audio, Galerie HD, RSVP intelligent."
            tags={['Best-Seller', 'Audio']}
            onClick={onOpenMariage} 
          />
          <FeatureCard 
            title="Bar Mitzvah" 
            price="Dès 1'900 CHF"
            desc="L'alliance de la tradition et du digital. Expliquez la Parasha, gérez les invités internationaux, sublimez la fête."
            tags={['Communauté', 'Prestige']}
          />
          <FeatureCard 
            title="Jubilé / 50 Ans" 
            price="Dès 1'200 CHF"
            desc="Une rétrospective interactive d'un demi-siècle de souvenirs. Le cadeau commun idéal."
            tags={['Rétro', 'Émotion']}
          />
          <FeatureCard 
            title="Départ Retraite" 
            price="Dès 950 CHF"
            desc="Livre d'or vidéo des collègues, photos de carrière, compte à rebours vers la liberté."
            tags={['Entreprise']}
          />
        </div>
      </div>
    </section>
  );
}

function FamilySection() {
  return (
    <section className="py-32 px-4 bg-slate-900 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <SectionHeader 
          title="Douceur & Famille" 
          subtitle="Les premiers chapitres d'une vie" 
          icon={<Baby className="w-6 h-6 text-rose-300" />}
          align="right"
        />

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <FeatureCard 
            title="Naissance" 
            price="Dès 750 CHF"
            desc="Bien plus qu'un faire-part. Stats animées de bébé, premières photos, liste de naissance intégrée."
            tags={['Populaire']}
            color="rose"
          />
          <FeatureCard 
            title="Baptême" 
            price="Dès 750 CHF"
            desc="Invitez la famille avec élégance. Infos cérémonie, carte GPS, et recueil de vœux pour l'enfant."
            tags={['Spirituel']}
            color="rose"
          />
          <FeatureCard 
            title="Communion" 
            price="Dès 750 CHF"
            desc="Une page lumineuse pour marquer cette étape importante. Simple, pur, efficace."
            tags={['Famille']}
            color="rose"
          />
        </div>
      </div>
    </section>
  );
}

function LoveSection() {
  return (
    <section className="py-40 px-4 bg-gradient-to-b from-slate-900 to-rose-950/20 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="inline-block p-4 rounded-full bg-rose-500/10 border border-rose-500/20 mb-8"
        >
          <Heart className="w-8 h-8 text-rose-500 animate-pulse" />
        </motion.div>
        
        <h2 className="text-5xl md:text-7xl font-serif text-white mb-6">L'ÉCLAT</h2>
        <p className="text-rose-200 text-xl tracking-widest uppercase mb-10">La Demande en Mariage Ultime</p>
        
        <p className="text-slate-300 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
          Vous avez la bague, nous avons le scénario. <br/>
          Une expérience mobile interactive qui fait monter le suspense jusqu'à la question fatidique.
          Effet "Waouh" et larmes de joie garantis.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="px-8 py-4 bg-rose-600 text-white font-bold rounded-full shadow-[0_0_30px_rgba(225,29,72,0.4)]">
            Offre Unique : 890 CHF
          </div>
          <a href="#" className="text-rose-300 underline hover:text-white transition-colors">Voir la démo sur mobile</a>
        </div>
      </div>
    </section>
  );
}

function MemorySection() {
  return (
    <section className="py-32 px-4 bg-gradient-to-b from-black to-stone-950 border-t border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
            <Flame className="w-6 h-6 text-stone-400" />
            <span className="text-stone-400 uppercase tracking-widest text-sm">Espace Mémoire</span>
          </div>
          <h2 className="text-4xl font-serif text-white mb-6">L'HOMMAGE</h2>
          <p className="text-stone-400 leading-relaxed mb-8">
            Parce que le papier journal s'efface, mais le web reste. <br/>
            Offrez aux familles un sanctuaire perpétuel : biographie, galerie photo, et 
            notre fonctionnalité exclusive de <span className="text-amber-500">Bougies Virtuelles</span>.
          </p>
          <button className="text-stone-300 border-b border-stone-600 pb-1 hover:text-white hover:border-white transition-all">
            Découvrir l'offre Deuil (1'500 CHF)
          </button>
        </div>

        <div className="flex-1 w-full">
          <div className="bg-stone-900 p-8 rounded-sm border border-stone-800 text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-stone-700" />
             <p className="text-stone-500 text-xs uppercase mb-4">En mémoire de</p>
             <h3 className="text-2xl font-serif text-white mb-2">Anna Karina</h3>
             <p className="text-stone-600 text-sm mb-6">1954 - 2026</p>
             <div className="flex justify-center gap-1">
               {[1,2,3].map(i => <div key={i} className="w-1 h-8 bg-amber-500/20 rounded-full animate-pulse" />)}
             </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function ArtisanSection() {
  return (
    <section className="py-24 px-4 bg-slate-950 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl font-serif text-white mb-6">L'Artisan derrière vos souvenirs</h2>
        <div className="flex flex-col md:flex-row items-center gap-8 justify-center text-left">
          {/* Logo M. temporaire */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center font-serif text-3xl text-black font-bold shadow-lg shadow-amber-500/20 flex-shrink-0">
            M.
          </div>
          <div className="max-w-lg">
            <p className="text-slate-300 mb-4 leading-relaxed">
              "Je suis Michaël, développeur et créatif basé en Valais. J'ai créé <span className="text-amber-400">NeoCard</span> avec une conviction : vos grands moments méritent mieux qu'un groupe WhatsApp ou un faire-part qui finit à la poubelle."
            </p>
            <p className="text-slate-500 text-sm italic">
              — Technologie Next.js, Design Haute Couture, Hébergement Suisse.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- UTILITAIRES ---

function SectionHeader({ title, subtitle, icon, align = 'left' }: any) {
  return (
    <div className={`mb-16 flex flex-col gap-4 ${align === 'right' ? 'md:text-right items-end' : 'md:text-left items-start'} text-center items-center`}>
      <div className="p-3 bg-white/5 rounded-full border border-white/10 w-fit">{icon}</div>
      <div>
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-2">{title}</h2>
        <p className="text-slate-500 text-lg font-light">{subtitle}</p>
      </div>
    </div>
  );
}

// Correction ici : Ajout de onClick dans les props et application sur la div
function FeatureCard({ title, price, desc, tags, color = 'amber', onClick }: any) {
  const isRose = color === 'rose';
  const accentColor = isRose ? 'text-rose-400' : 'text-amber-400';
  const borderColor = isRose ? 'group-hover:border-rose-500/30' : 'group-hover:border-amber-500/30';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={onClick}
      className={`group bg-white/5 border border-white/10 p-8 rounded-sm hover:bg-white/10 transition-all duration-300 ${borderColor} ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-serif text-white">{title}</h3>
        {tags && (
          <span className={`text-[10px] uppercase border px-2 py-1 rounded-full ${isRose ? 'border-rose-500/30 text-rose-300' : 'border-amber-500/30 text-amber-300'}`}>
            {tags[0]}
          </span>
        )}
      </div>
      <p className={`text-sm font-bold mb-4 ${accentColor}`}>{price}</p>
      <p className="text-slate-400 text-sm leading-relaxed mb-6 min-h-[60px]">
        {desc}
      </p>
      <div className="w-full h-px bg-white/5 group-hover:bg-white/20 transition-colors" />
      <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 group-hover:text-white transition-colors">
        <span>Voir détails</span> <div className="w-4 h-px bg-current" />
      </div>
    </motion.div>
  );
}