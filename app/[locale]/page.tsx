'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from './components/LanguageSwitcher';
import { 
  Sparkles, Heart, Flame, Baby, Crown, ChevronDown, 
  Building2, GlassWater, X, Send, Loader2, CheckCircle2, Target, FileText, Scale
} from 'lucide-react';

// --- IMPORTS MODALS ---
import MariageModal from './components/MariageModal';
import BarMitzvahModal from './components/BarmitzvahModal';
import BirthdayModal from './components/BirthdayModal';
import RetraiteModal from './components/RetraiteModal';
import NaissanceModal from './components/NaissanceModal';
import BaptemeModal from './components/BaptemeModal';
import CommunionModal from './components/CommunionModal';
import ProposalModal from './components/ProposalModal';
import EVJFModal from './components/EvjfModal';
import MemorialModal from './components/MemorialModal';
import CorporateModal from './components/CorporateModal';

// --- CONFIGURATION ---
const BRAND = {
  name: "NeoCard",
  email: "contact@neocard.ch",
  webhookUrl: "/api/contact"
};

// --- TYPES ---
type ModalKey = 
  | 'mariage' | 'barmitzvah' | 'birthday' | 'retraite' 
  | 'naissance' | 'bapteme' | 'communion' 
  | 'proposal' | 'evjf' 
  | 'memorial' | 'corporate' 
  | 'contact'
  | 'pricing'
  | 'legal'
  | null;

// =============================================================
// --- COMPOSANTS MODALS ---
// =============================================================

function PricingModal({ onClose }: { onClose: () => void }) {
  const t = useTranslations('Modals');
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-5xl h-[85vh] relative shadow-2xl flex flex-col overflow-hidden"
      >
        <div className="flex justify-between items-center p-6 border-b border-white/10 bg-black/50">
          <h2 className="text-2xl font-serif text-white flex items-center gap-3">
            <FileText className="text-amber-500" /> {t('pricing_title')}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 bg-slate-800 p-2 md:p-6">
          <iframe 
            src="/tarifs_neocard.pdf" 
            className="w-full h-full rounded-lg border border-white/5 bg-white"
            title="Grille Tarifaire NeoCard"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function LegalModal({ onClose }: { onClose: () => void }) {
  const tModals = useTranslations('Modals');
  const tLegal = useTranslations('LegalText');
  
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="bg-slate-900 border border-white/10 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto relative shadow-2xl"
      >
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur p-6 border-b border-white/10 flex justify-between items-center z-10">
          <h2 className="text-2xl font-serif text-white flex items-center gap-3">
            <Scale className="text-amber-500" /> {tModals('legal_title')}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-8 space-y-8 text-slate-300 text-sm leading-relaxed">
          <section>
            <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-widest text-xs">{tLegal('section1_title')}</h3>
            <p>{tLegal('section1_desc')}</p>
            <ul className="mt-2 space-y-1 bg-black/30 p-4 rounded-lg border border-white/5 font-mono">
              <li><strong>{tLegal('editor')}</strong> Michaël Kaeser</li>
              <li><strong>{tLegal('commercial_name')}</strong> NeoCard</li>
              <li><strong>{tLegal('address')}</strong> Route de Derborence 18, 1976 Aven (Valais), Suisse</li>
              <li><strong>{tLegal('contact')}</strong> {BRAND.email}</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-widest text-xs">{tLegal('section2_title')}</h3>
            <p>{tLegal('section2_desc')}</p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-widest text-xs">{tLegal('section3_title')}</h3>
            <p className="mb-2">{tLegal('section3_desc')}</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>{tLegal('collect')}</strong> {tLegal('collect_desc')}</li>
              <li><strong>{tLegal('purpose')}</strong> {tLegal('purpose_desc')}</li>
              <li><strong>{tLegal('confidentiality')}</strong> {tLegal('confidentiality_desc')}</li>
              <li><strong>{tLegal('rights')}</strong> {tLegal('rights_desc')} {BRAND.email}.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-widest text-xs">{tLegal('section4_title')}</h3>
            <p>{tLegal('section4_desc')}</p>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ContactModal({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const t = useTranslations('Modals');
  const locale = useLocale();

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
          locale: locale, // Info hyper pratique pour n8n !
          timestamp: new Date().toLocaleString(locale) 
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
            <h2 className="text-2xl font-serif text-white">{t('contact_success_title')}</h2>
            <p className="text-slate-400">{t('contact_success_desc')}</p>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-serif text-white mb-2">{t('contact_title')}</h2>
            <p className="text-slate-400 mb-8 italic">{t('contact_subtitle')}</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-amber-500 mb-2 font-bold">{t('form_name')}</label>
                <input required name="nom" type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-all" placeholder={t('form_name_ph')} />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-amber-500 mb-2 font-bold">{t('form_email')}</label>
                <input required name="email" type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-all" placeholder={t('form_email_ph')} />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-amber-500 mb-2 font-bold">{t('form_message')}</label>
                <textarea required name="message" rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-all resize-none" placeholder={t('form_message_ph')} />
              </div>
              
              <button 
                disabled={status === 'sending'}
                type="submit" 
                className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-slate-700 text-black font-bold py-4 rounded-full transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
              >
                {status === 'sending' ? <Loader2 className="w-4 h-4 animate-spin" /> : t('form_btn')} <Send className="w-4 h-4" />
              </button>
              {status === 'error' && <p className="text-rose-500 text-xs text-center mt-2">{t('form_error')}</p>}
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
  const tFooter = useTranslations('Footer');
  const tCommon = useTranslations('Common');

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
      <LanguageSwitcher />

      <footer className="py-24 bg-slate-950 text-center border-t border-white/5 px-4">
        <h2 className="text-4xl font-serif text-white mb-6 tracking-widest">{BRAND.name}</h2>
        <p className="text-slate-500 text-sm mb-8 max-w-md mx-auto">{tFooter('desc')}</p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button 
            id="btn-devis"
            onClick={() => openModal('contact')}
            className="inline-block border border-amber-500/50 bg-amber-500 text-black px-8 py-3 rounded-full hover:bg-amber-400 hover:border-amber-400 transition-all duration-300 uppercase tracking-widest text-xs font-bold w-full sm:w-auto"
          >
            {tFooter('btn_quote')}
          </button>
          
          <button 
            onClick={() => openModal('pricing')}
            className="inline-flex items-center justify-center gap-2 border border-slate-700 text-slate-300 px-8 py-3 rounded-full hover:bg-slate-800 hover:text-white transition-all duration-300 uppercase tracking-widest text-xs font-bold w-full sm:w-auto"
          >
            <FileText className="w-4 h-4" /> {tFooter('btn_pricing')}
          </button>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-center gap-6 text-slate-600 text-xs">
          <p>© {new Date().getFullYear()} {BRAND.name} — {tCommon('based_in')}</p>
          <span className="hidden md:inline text-slate-800">|</span>
          <button onClick={() => openModal('legal')} className="hover:text-amber-500 transition-colors uppercase tracking-widest">
            {tFooter('legal_link')}
          </button>
        </div>
      </footer>

      <AnimatePresence>
        {activeModal === 'mariage' && <MariageModal onClose={closeModal} />}
        {activeModal === 'barmitzvah' && <BarMitzvahModal onClose={closeModal} />}
        {activeModal === 'birthday' && <BirthdayModal onClose={closeModal} />}
        {activeModal === 'retraite' && <RetraiteModal onClose={closeModal} />}
        {activeModal === 'naissance' && <NaissanceModal onClose={closeModal} />}
        {activeModal === 'bapteme' && <BaptemeModal onClose={closeModal} />}
        {activeModal === 'communion' && <CommunionModal onClose={closeModal} />}
        {activeModal === 'proposal' && <ProposalModal onClose={closeModal} />}
        {activeModal === 'evjf' && <EVJFModal onClose={closeModal} />}
        {activeModal === 'memorial' && <MemorialModal onClose={closeModal} />}
        {activeModal === 'corporate' && <CorporateModal onClose={closeModal} />}
        {activeModal === 'contact' && <ContactModal onClose={closeModal} />}
        {activeModal === 'pricing' && <PricingModal onClose={closeModal} />}
        {activeModal === 'legal' && <LegalModal onClose={closeModal} />}
      </AnimatePresence>
    </div>
  );
}

// =============================================================
// --- SECTIONS 
// =============================================================

function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const t = useTranslations('Hero');
  
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-black to-black z-0" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-pulse z-0" />
      
      <motion.div style={{ y }} className="relative z-10 max-w-5xl flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1.2 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs uppercase tracking-widest text-amber-400"
        >
          <Sparkles className="w-3 h-3" aria-hidden="true" /> {t('tagline')}
        </motion.div>
        
        <h1 className="text-6xl md:text-9xl font-serif font-thin mb-8 text-white tracking-tighter">
          {BRAND.name}
        </h1>
        
        <p className="text-lg md:text-2xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
          {t('desc_part1')}{' '}
          <span className="text-white font-normal">{t('desc_highlight')}</span>.
          <br/>{t('desc_part2')}
        </p>

        <motion.a 
          href="https://chasseautresor.neocard.ch"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative inline-flex group mt-12 mb-8"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          <div className="relative flex items-center justify-center px-8 md:px-12 py-5 text-sm md:text-base font-black text-black transition-all duration-200 bg-amber-500 rounded-full uppercase tracking-[0.2em] gap-3 shadow-[0_0_40px_rgba(245,158,11,0.5)]">
            <Target className="w-5 h-5 md:w-6 md:h-6 animate-spin-slow" /> 
            <span>{t('button')}</span>
          </div>
        </motion.a>

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

function GrandeurSection({ openModal }: { openModal: (k: ModalKey) => void }) {
  const t = useTranslations('Grandeur');
  return (
    <section id="celebrations" className="py-32 px-4 relative z-10 bg-gradient-to-b from-black to-slate-900">
      <div className="max-w-6xl mx-auto">
        <SectionHeader 
          title={t('title')} 
          subtitle={t('subtitle')} 
          icon={<Crown className="w-6 h-6 text-amber-400" />}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <FeatureCard 
            title={t('mariage_title')} 
            price={t('mariage_price')}
            desc={t('mariage_desc')}
            tags={[t('mariage_tag1'), t('mariage_tag2')]}
            onClick={() => openModal('mariage')} 
          />
          <FeatureCard 
            title={t('bar_title')} 
            price={t('bar_price')}
            desc={t('bar_desc')}
            tags={[t('bar_tag1'), t('bar_tag2')]}
            onClick={() => openModal('barmitzvah')}
          />
          <FeatureCard 
            title={t('anniv_title')} 
            price={t('anniv_price')}
            desc={t('anniv_desc')}
            tags={[t('anniv_tag1'), t('anniv_tag2')]}
            onClick={() => openModal('birthday')}
          />
          <FeatureCard 
            title={t('retraite_title')} 
            price={t('retraite_price')}
            desc={t('retraite_desc')}
            tags={[t('retraite_tag1')]}
            onClick={() => openModal('retraite')}
          />
        </div>
      </div>
    </section>
  );
}

function FamilySection({ openModal }: { openModal: (k: ModalKey) => void }) {
  const t = useTranslations('Family');
  return (
    <section id="famille" className="py-32 px-4 bg-slate-900 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <SectionHeader 
          title={t('title')} 
          subtitle={t('subtitle')} 
          icon={<Baby className="w-6 h-6 text-rose-300" />}
          align="right"
        />

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <FeatureCard 
            title={t('naissance_title')} 
            price={t('naissance_price')}
            desc={t('naissance_desc')}
            tags={[t('naissance_tag')]}
            color="rose"
            onClick={() => openModal('naissance')}
          />
          <FeatureCard 
            title={t('bapteme_title')} 
            price={t('bapteme_price')}
            desc={t('bapteme_desc')}
            tags={[t('bapteme_tag')]}
            color="rose"
            onClick={() => openModal('bapteme')}
          />
          <FeatureCard 
            title={t('communion_title')} 
            price={t('communion_price')}
            desc={t('communion_desc')}
            tags={[t('communion_tag')]}
            color="rose"
            onClick={() => openModal('communion')}
          />
        </div>
      </div>
    </section>
  );
}

function EVJFSection({ openModal }: { openModal: (k: ModalKey) => void }) {
  const t = useTranslations('EVJF');
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
        
        <h2 className="text-5xl md:text-7xl font-serif text-white mb-6">{t('section_title')}</h2>
        <p className="text-fuchsia-200 text-xl tracking-widest uppercase mb-10">{t('subtitle')}</p>
        
        <p className="text-slate-300 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
          {t('desc_part1')} <br/>
          {t('desc_part2')}
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => openModal('evjf')}
            className="px-8 py-4 bg-fuchsia-600 text-white font-bold rounded-full shadow-[0_0_30px_rgba(192,38,211,0.4)] hover:bg-fuchsia-500 transition-colors uppercase tracking-widest text-xs"
          >
            {t('button')}
          </button>
          <a 
            href="https://evjf.neocard.ch" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-fuchsia-300 underline hover:text-white transition-colors"
          >
            {t('demo')}
          </a>
        </div>
      </div>
    </section>
  );
}

function LoveSection({ openModal }: { openModal: (k: ModalKey) => void }) {
  const t = useTranslations('Love');
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
        
        <h2 className="text-5xl md:text-7xl font-serif text-white mb-6">{t('section_title')}</h2>
        <p className="text-rose-200 text-xl tracking-widest uppercase mb-10">{t('subtitle')}</p>
        
        <p className="text-slate-300 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
          {t('desc_part1')} <br/>
          {t('desc_part2')}
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => openModal('proposal')}
            className="px-8 py-4 bg-rose-600 text-white font-bold rounded-full shadow-[0_0_30px_rgba(225,29,72,0.4)] hover:bg-rose-500 transition-colors uppercase tracking-widest text-xs"
          >
            {t('button')}
          </button>
          <a 
            href="https://proposal.neocard.ch" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-rose-300 underline hover:text-white transition-colors"
          >
            {t('demo')}
          </a>
        </div>
      </div>
    </section>
  );
}

function CorporateSection({ openModal }: { openModal: (k: ModalKey) => void }) {
  const t = useTranslations('Corporate');
  return (
    <section id="corporate" className="py-32 px-4 bg-gradient-to-b from-rose-950/10 to-slate-900 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <SectionHeader 
          title={t('title')} 
          subtitle={t('subtitle')} 
          icon={<Building2 className="w-6 h-6 text-cyan-400" />}
        />

        <div className="grid md:grid-cols-2 gap-6 mt-16 max-w-4xl mx-auto">
          <FeatureCard 
            title={t('event_title')} 
            price={t('event_price')}
            desc={t('event_desc')}
            tags={[t('event_tag1'), t('event_tag2')]}
            color="cyan"
            onClick={() => openModal('corporate')}
          />
          <FeatureCard 
            title={t('retraite_title')} 
            price={t('retraite_price')}
            desc={t('retraite_desc')}
            tags={[t('retraite_tag1'), t('retraite_tag2')]}
            color="cyan"
            onClick={() => openModal('retraite')}
          />
        </div>
      </div>
    </section>
  );
}

function MemorySection({ openModal }: { openModal: (k: ModalKey) => void }) {
  const t = useTranslations('Memory');
  return (
    <section id="memorial" className="py-32 px-4 bg-gradient-to-b from-slate-900 to-stone-950 border-t border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
            <Flame className="w-6 h-6 text-stone-400" aria-hidden="true" />
            <span className="text-stone-400 uppercase tracking-widest text-sm">{t('label')}</span>
          </div>
          <h2 className="text-4xl font-serif text-white mb-6">{t('title')}</h2>
          <p className="text-stone-400 leading-relaxed mb-8">
            {t('desc_part1')} <br/>
            {t('desc_part2')}{' '}
            <span className="text-amber-500">{t('highlight')}</span>.
          </p>
          <button 
            onClick={() => openModal('memorial')}
            className="text-stone-300 border-b border-stone-600 pb-1 hover:text-white hover:border-white transition-all"
          >
            {t('button')}
          </button>
        </div>

        <div className="flex-1 w-full">
          <div className="bg-stone-900 p-8 rounded-sm border border-stone-800 text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-stone-700" aria-hidden="true" />
             <p className="text-stone-500 text-xs uppercase mb-4">{t('demo_card_label')}</p>
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
               {t('demo_link')}
             </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArtisanSection() {
  const t = useTranslations('Artisan');
  return (
    <section id="artisan" className="py-24 px-4 bg-slate-950 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl font-serif text-white mb-6">{t('title')}</h2>
        <div className="flex flex-col md:flex-row items-center gap-8 justify-center text-left">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center font-serif text-3xl text-black font-bold shadow-lg shadow-amber-500/20 flex-shrink-0" aria-hidden="true">
            M.
          </div>
          <div className="max-w-lg">
            <p className="text-slate-300 mb-4 leading-relaxed">
              {t('quote_part1')}{' '}
              <span className="text-amber-400">{t('quote_highlight')}</span>{' '}
              {t('quote_part2')}
            </p>
            <p className="text-slate-500 text-sm italic">
              {t('tech')}
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
  const tCommon = useTranslations('Common');
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
        <span>{tCommon('see_details')}</span> <div className="w-4 h-px bg-current" aria-hidden="true" />
      </div>
    </motion.div>
  );
}