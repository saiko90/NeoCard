'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { X, Check, ExternalLink, Smartphone, Shield, Globe, Palmtree } from 'lucide-react';

export default function RetraiteModal({ onClose }: { onClose: () => void }) {
  const t = useTranslations('Modals.retraite');
  const tc = useTranslations('Common');
  const demoLink = "https://retraite.neocard.ch";

  const renderFeatures = (featuresKey: string) => {
    return t.raw(featuresKey).map((feature: string, index: number) => (
      <li key={index} className="flex items-start gap-2 text-xs text-slate-400">
        <Check size={12} className="text-emerald-400 mt-0.5 shrink-0" />
        <span>{feature}</span>
      </li>
    ));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-hidden">
      <div className="absolute inset-0" onClick={onClose} />
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }} 
        className="relative bg-slate-950 border border-white/10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl flex flex-col md:flex-row z-10"
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 bg-black/60 border border-white/10 rounded-full text-white hover:bg-white hover:text-black transition-colors">
          <X size={20} />
        </button>

        <div className="w-full md:w-2/5 bg-emerald-950/40 p-8 pt-12 md:pt-8 flex flex-col shrink-0 relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
          <div className="relative z-10">
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2 block">{t('subtitle')}</span>
            <h2 className="text-4xl font-serif text-white mb-6">{t('title')}</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">{t('description')}</p>
            <div className="space-y-4 mb-8">
               <div className="flex items-center gap-3 text-slate-300 text-sm"><Smartphone size={16} className="text-emerald-400"/> <span>{tc('features.mobile')}</span></div>
               <div className="flex items-center gap-3 text-slate-300 text-sm"><Shield size={16} className="text-emerald-400"/> <span>{tc('features.secure')}</span></div>
               <div className="flex items-center gap-3 text-slate-300 text-sm"><Palmtree size={16} className="text-emerald-400"/> <span>Cadeau collectif</span></div>
            </div>
          </div>
          <div className="mt-auto relative z-10">
             <p className="text-xs text-slate-500 uppercase tracking-widest mb-3 text-center">{tc('viewLiveResult')}</p>
             <a href={demoLink} target="_blank" rel="noopener noreferrer" className="block w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-lg text-center transition-colors uppercase tracking-widest text-sm flex items-center justify-center gap-2">
               {tc('liveDemo')} <ExternalLink size={16} />
             </a>
          </div>
        </div>

        <div className="w-full md:w-3/5 p-8 bg-black">
           <h3 className="text-xl font-serif text-white mb-8 border-b border-white/10 pb-4 md:mt-0 mt-4">{tc('ourFormulas')}</h3>
           <div className="grid gap-4">
             <div className="p-5 rounded-lg border border-white/10 bg-white/5 hover:border-white/20 transition-all">
                <div className="flex justify-between items-end mb-3">
                   <h4 className="text-base font-bold text-white">{t('plan1')}</h4>
                   <div className="text-lg font-serif text-white">550 CHF</div>
                </div>
                <ul className="grid grid-cols-1 gap-2">{renderFeatures('plan1_features')}</ul>
             </div>
             <div className="relative p-5 rounded-lg border border-emerald-500/40 bg-emerald-900/10 transition-all">
                <span className="absolute -top-2 right-4 bg-emerald-600 text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm">{tc('recommended')}</span>
                <div className="flex justify-between items-end mb-3">
                   <h4 className="text-base font-bold text-emerald-400">{t('plan2')}</h4>
                   <div className="text-lg font-serif text-white">950 CHF</div>
                </div>
                <ul className="grid grid-cols-1 gap-2">{renderFeatures('plan2_features')}</ul>
             </div>
             <div className="p-5 rounded-lg border border-white/10 bg-white/5 hover:border-white/20 transition-all">
                <div className="flex justify-between items-end mb-3">
                   <h4 className="text-base font-bold text-white">{t('plan3')}</h4>
                   <div className="text-lg font-serif text-white">{tc('onQuote')}</div>
                </div>
                <ul className="grid grid-cols-1 gap-2">{renderFeatures('plan3_features')}</ul>
             </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
}