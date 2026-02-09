'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Heart, Flame, Baby, Crown, ChevronDown, 
  Building2, GlassWater, X, Send, Loader2, CheckCircle2
} from 'lucide-react';

// --- CONFIGURATION ---
const BRAND = {
  name: "NeoCard",
  tagline: "Architecte de vos Souvenirs",
  email: "contact@neocard.ch",
  webhookUrl: "https://n8n-latest-fsq5.onrender.com/webhook/contactneocard"
};

// --- TYPES ---
type ModalKey = 
  | 'mariage' | 'barmitzvah' | 'birthday' | 'retraite' 
  | 'naissance' | 'bapteme' | 'communion' 
  | 'proposal' | 'evjf' 
  | 'memorial' | 'corporate' 
  | 'contact'
  | null;

// --- COMPOSANT FORMULAIRE DE CONTACT (n8n ready) ---
function ContactModal({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(BRAND.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...data, 
          source: 'Site Web NeoCard',
          timestamp: new Date().toLocaleString('fr-CH') 
        }),
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(onClose, 2500);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="bg-slate-900 border border-white/10 p-8 rounded-2xl max-w-lg w-full relative shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>

        {status === 'success' ? (
          <div className="py-12 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-amber-500 mx-auto animate-bounce" />
            <h2 className="text-2xl font-serif text-white">C'est envoyé !</h2>
            <p className="text-slate-400">Michaël a bien reçu votre demande.</p>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-serif text-white mb-2">Un projet ?</h2>
            <p className="text-slate-400 mb-8 italic">Décrivez vos envies, je m'occupe du reste.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-amber-500 mb-2 font-bold">Nom</label>
                <input required name="nom" type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-all" placeholder="Votre nom" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-amber-500 mb-2 font-bold">Email</label>
                <input required name="email" type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-all" placeholder="votre@email.com" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-amber-500 mb-2 font-bold">Message</label>
                <textarea required name="message" rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-all resize-none" placeholder="Détails de l'événement..." />
              </div>
              
              <button 
                disabled={status === 'sending'}
                type="submit" 
                className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-slate-700 text-black font-bold py-4 rounded-full transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
              >
                {status === 'sending' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Envoyer ma demande'} <Send className="w-4 h-4" />
              </button>
              {status === 'error' && <p className="text-rose-500 text-xs text-center mt-2">Erreur de connexion avec le serveur.</p>}
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

// --- PAGE PRINCIPALE ---
export default function LandingPage() {
  const [activeModal, setActiveModal] = useState<ModalKey>(null);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setActiveModal(null);
  }, []);

  useEffect(() => {
    if (activeModal) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [activeModal, handleEscape]);

  const openModal = (key: ModalKey) => setActiveModal(key);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="bg-black text-slate-200 font-sans selection:bg-amber-500 selection:text-black overflow-x-hidden">
      
      <HeroSection />
      <GrandeurSection openModal={openModal} />
      <FamilySection openModal={openModal} />
      <EVJFSection openModal={openModal} />
      <LoveSection openModal={openModal} />
      <CorporateSection openModal={openModal} />
      <MemorySection openModal={openModal} />
      <ArtisanSection />

      {/* FOOTER */}
      <footer className="py-24 bg-slate-950 text-center border-t border-white/5">
        <h2 className="text-4xl font-serif text-white mb-6 tracking-widest">{BRAND.name}</h2>
        <p className="text-slate-500 text-sm mb-8">Votre histoire mérite le meilleur écrin.</p>
        <button 
          id="btn-devis"
          onClick={() => openModal('contact')}
          className="inline-block border border-amber-500/50 text-amber-500 px-8 py-3 rounded-full hover:bg-amber-500 hover:text-black transition-all duration-300 uppercase tracking-widest text-xs font-bold"
        >
          Demander un devis
        </button>
        <p className="mt-12 text-slate-700 text-xs">
          © {new Date().getFullYear()} {BRAND.name} — Basé en Valais, Suisse
        </p>
      </footer>

      <AnimatePresence>
        {activeModal === 'contact' && <ContactModal onClose={closeModal} />}
        {/* Tes autres modals importées ici restent inchangées */}
      </AnimatePresence>
    </div>
  );
}

// =============================================================
// --- SECTIONS ---
// =============================================================

function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-black to-black z-0" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-pulse z-0" />
      
      <motion.div style={{ y }} className="relative z-10 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1.2 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs uppercase tracking-widest text-amber-400"
        >
          <Sparkles className="w-3 h-3" aria-hidden="true" /> Le faire-part digital numérique
        </motion.div>
        
        <h1 className="text-6xl md:text-9xl font-serif font-thin mb-8 text-white tracking-tighter">
          {BRAND.name}
        </h1>
        
        <p className="text-lg md:text-2xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
          Nous transformons les grands moments de votre vie en{' '}
          <span className="text-white font-normal">expériences web immersives</span>.
          <br/>Bienvenue dans le futur du faire-part.
        </p>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }} 
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-600"
        aria-hidden="true"
      >
        <ChevronDown className="w-8 h-8 opacity-50" />
      </motion.div>
    </section>
  );
}

// --- CHAPITRE 1 : GRANDEUR ---
function GrandeurSection({ openModal }: { openModal: (k: ModalKey) => void }) {
  return (
    <section id="celebrations" className="py-32 px-4 relative z-10 bg-gradient-to-b from-black to-slate-900">
      <div className="max-w-6xl mx-auto">
        <SectionHeader 
          title="Grandeurs & Célébrations" 
          subtitle="Quand la fête devient inoubliable" 
          icon={<Crown className="w-6 h-6 text-amber-400" />}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <FeatureCard 
            title="Le Mariage" 
            price="Dès 950 CHF"
            desc="L'offre signature. Timeline de votre histoire, Livre d'or Audio, Galerie HD, RSVP intelligent."
            tags={['Best-Seller', 'Audio']}
            onClick={() => openModal('mariage')} 
          />
          <FeatureCard 
            title="Bar Mitzvah" 
            price="Dès 950 CHF"
            desc="L'alliance de la tradition et du digital. Expliquez la Parasha, gérez les invités internationaux, sublimez la fête."
            tags={['Communauté', 'Prestige']}
            onClick={() => openModal('barmitzvah')}
          />
          <FeatureCard 
            title="Anniversaire & Jubilé" 
            price="Dès 650 CHF"
            desc="Une rétrospective interactive d'une vie de souvenirs. Quiz, playlist collaborative et cagnotte intégrée."
            tags={['Populaire', 'Fun']}
            onClick={() => openModal('birthday')}
          />
          <FeatureCard 
            title="Départ Retraite" 
            price="Dès 550 CHF"
            desc="Livre d'or vidéo des collègues, rétrospective de carrière et compte à rebours vers la liberté."
            tags={['Entreprise']}
            onClick={() => openModal('retraite')}
          />
        </div>
      </div>
    </section>
  );
}

// --- CHAPITRE 2 : DOUCEUR ---
function FamilySection({ openModal }: { openModal: (k: ModalKey) => void }) {
  return (
    <section id="famille" className="py-32 px-4 bg-slate-900 border-t border-white/5">
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
            price="Dès 450 CHF"
            desc="Bien plus qu'un faire-part. Stats animées de bébé, premières photos, liste de naissance intégrée."
            tags={['Populaire']}
            color="rose"
            onClick={() => openModal('naissance')}
          />
          <FeatureCard 
            title="Baptême" 
            price="Dès 450 CHF"
            desc="Invitez la famille avec élégance. Infos cérémonie, carte GPS, et recueil de vœux pour l'enfant."
            tags={['Spirituel']}
            color="rose"
            onClick={() => openModal('bapteme')}
          />
          <FeatureCard 
            title="Communion" 
            price="Dès 450 CHF"
            desc="Une page lumineuse pour marquer cette étape importante. Simple, pure, efficace."
            tags={['Famille']}
            color="rose"
            onClick={() => openModal('communion')}
          />
        </div>
      </div>
    </section>
  );
}

// --- CHAPITRE 3 : FOLIE (EVG/EVJF) ---
function EVJFSection({ openModal }: { openModal: (k: ModalKey) => void }) {
  return (
    <section id="evjf" className="py-40 px-4 bg-gradient-to-b from-slate-900 to-fuchsia-950/20 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          viewport={{ once: true }}
          className="inline-block p-4 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 mb-8"
        >
          <GlassWater className="w-8 h-8 text-fuchsia-400" aria-hidden="true" />
        </motion.div>
        
        <h2 className="text-5xl md:text-7xl font-serif text-white mb-6">LA FOLIE</h2>
        <p className="text-fuchsia-200 text-xl tracking-widest uppercase mb-10">Enterrement de Vie de Garçon / Jeune Fille</p>
        
        <p className="text-slate-300 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
          Le dernier baroud d&apos;honneur avant le grand saut. <br/>
          Une page secrète avec programme surprise, défis interactifs, cagnotte commune 
          et révélation progressive. L&apos;outil parfait pour les témoins organisateurs.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => openModal('evjf')}
            className="px-8 py-4 bg-fuchsia-600 text-white font-bold rounded-full shadow-[0_0_30px_rgba(192,38,211,0.4)] hover:bg-fuchsia-500 transition-colors uppercase tracking-widest text-xs"
          >
            Découvrir l&apos;Offre — Dès 450 CHF
          </button>
          <a 
            href="https://evjf.neocard.ch" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-fuchsia-300 underline hover:text-white transition-colors"
          >
            Voir la démo en direct
          </a>
        </div>
      </div>
    </section>
  );
}

// --- CHAPITRE 4 : PASSION (Demande en Mariage) ---
function LoveSection({ openModal }: { openModal: (k: ModalKey) => void }) {
  return (
    <section id="proposal" className="py-40 px-4 bg-gradient-to-b from-fuchsia-950/20 to-rose-950/20 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          viewport={{ once: true }}
          className="inline-block p-4 rounded-full bg-rose-500/10 border border-rose-500/20 mb-8"
        >
          <Heart className="w-8 h-8 text-rose-500 animate-pulse" aria-hidden="true" />
        </motion.div>
        
        <h2 className="text-5xl md:text-7xl font-serif text-white mb-6">L&apos;ÉCLAT</h2>
        <p className="text-rose-200 text-xl tracking-widest uppercase mb-10">La Demande en Mariage Ultime</p>
        
        <p className="text-slate-300 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
          Vous avez la bague, nous avons le scénario. <br/>
          Une expérience mobile interactive qui fait monter le suspense jusqu&apos;à la question fatidique.
          Effet &quot;Waouh&quot; et larmes de joie garantis.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => openModal('proposal')}
            className="px-8 py-4 bg-rose-600 text-white font-bold rounded-full shadow-[0_0_30px_rgba(225,29,72,0.4)] hover:bg-rose-500 transition-colors uppercase tracking-widest text-xs"
          >
            Découvrir l&apos;Offre — Dès 590 CHF
          </button>
          <a 
            href="https://proposal.neocard.ch" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-rose-300 underline hover:text-white transition-colors"
          >
            Voir la démo sur mobile
          </a>
        </div>
      </div>
    </section>
  );
}

// --- CHAPITRE 5 : PROFESSIONNEL (Corporate) ---
function CorporateSection({ openModal }: { openModal: (k: ModalKey) => void }) {
  return (
    <section id="corporate" className="py-32 px-4 bg-gradient-to-b from-rose-950/10 to-slate-900 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <SectionHeader 
          title="Professionnel & Corporate" 
          subtitle="L'excellence au service de votre image" 
          icon={<Building2 className="w-6 h-6 text-cyan-400" />}
        />

        <div className="grid md:grid-cols-2 gap-6 mt-16 max-w-4xl mx-auto">
          <FeatureCard 
            title="Événement Corporate" 
            price="Dès 750 CHF"
            desc="Conférences, galas, lancements de produit — un site événementiel avec inscriptions, agenda interactif et branding intégral."
            tags={['Business', 'Premium']}
            color="cyan"
            onClick={() => openModal('corporate')}
          />
          <FeatureCard 
            title="Départ Retraite Pro" 
            price="Dès 550 CHF"
            desc="Offrez à votre collègue une rétrospective de carrière immersive. Le cadeau collectif qui marque les esprits."
            tags={['Équipe', 'Cagnotte']}
            color="cyan"
            onClick={() => openModal('retraite')}
          />
        </div>
      </div>
    </section>
  );
}

// --- CHAPITRE 6 : ÉTERNITÉ (Mémorial) ---
function MemorySection({ openModal }: { openModal: (k: ModalKey) => void }) {
  return (
    <section id="memorial" className="py-32 px-4 bg-gradient-to-b from-slate-900 to-stone-950 border-t border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
            <Flame className="w-6 h-6 text-stone-400" aria-hidden="true" />
            <span className="text-stone-400 uppercase tracking-widest text-sm">Espace Mémoire</span>
          </div>
          <h2 className="text-4xl font-serif text-white mb-6">L&apos;HOMMAGE</h2>
          <p className="text-stone-400 leading-relaxed mb-8">
            Parce que le papier journal s&apos;efface, mais le web reste. <br/>
            Offrez aux familles un sanctuaire perpétuel : biographie, galerie photo, et 
            notre fonctionnalité exclusive de{' '}
            <span className="text-amber-500">Bougies Virtuelles</span>.
          </p>
          <button 
            onClick={() => openModal('memorial')}
            className="text-stone-300 border-b border-stone-600 pb-1 hover:text-white hover:border-white transition-all"
          >
            Découvrir l&apos;offre Mémorial (dès 750 CHF)
          </button>
        </div>

        <div className="flex-1 w-full">
          <div className="bg-stone-900 p-8 rounded-sm border border-stone-800 text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-stone-700" aria-hidden="true" />
             <p className="text-stone-500 text-xs uppercase mb-4">En mémoire de</p>
             <h3 className="text-2xl font-serif text-white mb-2">Marie Dupont</h3>
             <p className="text-stone-600 text-sm mb-6">1942 - 2026</p>
             <div className="flex justify-center gap-1" aria-label="Bougies virtuelles">
               {[1,2,3].map(i => (
                 <div key={i} className="w-1 h-8 bg-amber-500/20 rounded-full animate-pulse" />
               ))}
             </div>
             <a 
               href="https://memorial.neocard.ch" 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-block mt-6 text-xs text-stone-500 underline hover:text-white transition-colors"
             >
               Voir la démo complète
             </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- L'ARTISAN ---
function ArtisanSection() {
  return (
    <section id="artisan" className="py-24 px-4 bg-slate-950 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl font-serif text-white mb-6">L&apos;Artisan derrière vos souvenirs</h2>
        <div className="flex flex-col md:flex-row items-center gap-8 justify-center text-left">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center font-serif text-3xl text-black font-bold shadow-lg shadow-amber-500/20 flex-shrink-0" aria-hidden="true">
            M.
          </div>
          <div className="max-w-lg">
            <p className="text-slate-300 mb-4 leading-relaxed">
              &quot;Je suis Michaël, développeur et créatif basé en Valais. J&apos;ai créé{' '}
              <span className="text-amber-400">NeoCard</span> avec une conviction : vos grands moments méritent 
              mieux qu&apos;un groupe WhatsApp ou un faire-part qui finit à la poubelle.&quot;
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

// =============================================================
// --- COMPOSANTS UTILITAIRES ---
// =============================================================

function SectionHeader({ title, subtitle, icon, align = 'left' }: { 
  title: string; 
  subtitle: string; 
  icon: React.ReactNode; 
  align?: 'left' | 'right'; 
}) {
  return (
    <div className={`mb-16 flex flex-col gap-4 ${align === 'right' ? 'md:text-right items-end' : 'md:text-left items-start'} text-center items-center`}>
      <div className="p-3 bg-white/5 rounded-full border border-white/10 w-fit" aria-hidden="true">{icon}</div>
      <div>
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-2">{title}</h2>
        <p className="text-slate-500 text-lg font-light">{subtitle}</p>
      </div>
    </div>
  );
}

function FeatureCard({ title, price, desc, tags, color = 'amber', onClick }: { 
  title: string; 
  price: string; 
  desc: string; 
  tags?: string[]; 
  color?: 'amber' | 'rose' | 'cyan'; 
  onClick?: () => void; 
}) {
  const colorMap = {
    amber: {
      accent: 'text-amber-400',
      border: 'group-hover:border-amber-500/30',
      tag: 'border-amber-500/30 text-amber-300',
      check: 'text-amber-400',
    },
    rose: {
      accent: 'text-rose-400',
      border: 'group-hover:border-rose-500/30',
      tag: 'border-rose-500/30 text-rose-300',
      check: 'text-rose-400',
    },
    cyan: {
      accent: 'text-cyan-400',
      border: 'group-hover:border-cyan-500/30',
      tag: 'border-cyan-500/30 text-cyan-300',
      check: 'text-cyan-400',
    },
  };

  const c = colorMap[color];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={onClick}
      onKeyDown={(e) => { if (onClick && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onClick(); } }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `Voir les détails de ${title}` : undefined}
      className={`group bg-white/5 border border-white/10 p-8 rounded-sm hover:bg-white/10 transition-all duration-300 ${c.border} ${onClick ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:ring-offset-2 focus:ring-offset-black' : ''}`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-serif text-white">{title}</h3>
        {tags && tags[0] && (
          <span className={`text-[10px] uppercase border px-2 py-1 rounded-full ${c.tag}`}>
            {tags[0]}
          </span>
        )}
      </div>
      <p className={`text-sm font-bold mb-4 ${c.accent}`}>{price}</p>
      <p className="text-slate-400 text-sm leading-relaxed mb-6 min-h-[60px]">
        {desc}
      </p>
      <div className="w-full h-px bg-white/5 group-hover:bg-white/20 transition-colors" />
      <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 group-hover:text-white transition-colors">
        <span>Voir détails</span> <div className="w-4 h-px bg-current" aria-hidden="true" />
      </div>
    </motion.div>
  );
}