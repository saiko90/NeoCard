'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, ExternalLink, Smartphone, Shield, Globe, Sun } from 'lucide-react';

const OFFRE_COMMUNION = {
  title: "Communion",
  subtitle: "La Lumière Intérieure",
  description: "Une étape spirituelle importante mérite d'être partagée avec grâce. Une page lumineuse et épurée pour inviter vos proches, partager le programme de la cérémonie et recueillir les messages d'encouragement pour votre enfant.",
  demoLink: "https://communion.neocard.ch",
  pricing: [
    {
      name: "Pureté",
      price: "450 CHF",
      features: [
        "Faire-Part Digital Élégant",
        "Programme de la Cérémonie",
        "Carte GPS Église & Réception",
        "Formulaire RSVP Simple",
        "Hébergement 1 an"
      ]
    },
    {
      name: "Harmonie",
      price: "750 CHF",
      tag: "Recommandé",
      features: [
        "Tout l'offre Pureté",
        "Mur de Messages pour l'Enfant",
        "Galerie Photo du Jour J",
        "Compte à Rebours Animé",
        "Musique d'Ambiance Personnalisée",
        "Protégé par Mot de Passe"
      ]
    },
    {
      name: "Éternité",
      price: "Sur Devis",
      features: [
        "Design 100% Sur Mesure",
        "Vidéo d'Introduction Animée",
        "Nom de domaine personnalisé",
        "Multi-langues pour la famille",
        "Impression QR Code Souvenir"
      ]
    }
  ]
};

export default function CommunionModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-hidden">
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }} 
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative bg-slate-950 border border-white/10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl flex flex-col md:flex-row z-10"
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-50 p-2 bg-black/60 border border-white/10 rounded-full text-white hover:bg-white hover:text-black transition-colors"
        >
          <X size={20} />
        </button>

        {/* COLONNE GAUCHE */}
        <div className="w-full md:w-2/5 bg-amber-950/30 p-8 pt-12 md:pt-8 flex flex-col shrink-0 relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
          
          <div className="relative z-10">
            <span className="text-amber-300 text-xs font-bold uppercase tracking-widest mb-2 block">{OFFRE_COMMUNION.subtitle}</span>
            <h2 className="text-4xl font-serif text-white mb-6">{OFFRE_COMMUNION.title}</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">{OFFRE_COMMUNION.description}</p>
            
            <div className="space-y-4 mb-8">
               <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Smartphone size={16} className="text-amber-300"/> <span>100% Mobile Friendly</span>
               </div>
               <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Globe size={16} className="text-amber-300"/> <span>Accessible sans application</span>
               </div>
               <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Shield size={16} className="text-amber-300"/> <span>Données sécurisées en Suisse</span>
               </div>
               <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Sun size={16} className="text-amber-300"/> <span>Simple, pur, lumineux</span>
               </div>
            </div>
          </div>

          <div className="mt-auto relative z-10">
             <p className="text-xs text-slate-500 uppercase tracking-widest mb-3 text-center">Voir le résultat en direct</p>
             <a 
               href={OFFRE_COMMUNION.demoLink} 
               target="_blank" 
               rel="noopener noreferrer"
               className="block w-full bg-amber-600 hover:bg-amber-500 text-black font-bold py-4 rounded-lg text-center transition-colors uppercase tracking-widest text-sm flex items-center justify-center gap-2"
             >
               Voir la Démo Live <ExternalLink size={16} />
             </a>
          </div>
        </div>

        {/* COLONNE DROITE : PRIX */}
        <div className="w-full md:w-3/5 p-8 bg-black">
           <h3 className="text-xl font-serif text-white mb-8 border-b border-white/10 pb-4 md:mt-0 mt-4">Nos Formules</h3>

           <div className="grid gap-4">
             {OFFRE_COMMUNION.pricing.map((plan, i) => (
               <div key={i} className={`relative p-5 rounded-lg border transition-all ${plan.tag ? 'border-amber-500/40 bg-amber-900/10' : 'border-white/10 bg-white/5 hover:border-white/20'}`}>
                  
                  {plan.tag && (
                    <span className="absolute -top-2 right-4 bg-amber-600 text-black text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm">
                      {plan.tag}
                    </span>
                  )}

                  <div className="flex justify-between items-end mb-3">
                     <h4 className={`text-base font-bold ${plan.tag ? 'text-amber-300' : 'text-white'}`}>{plan.name}</h4>
                     <div className="text-lg font-serif text-white">{plan.price}</div>
                  </div>

                  <ul className="grid grid-cols-1 gap-2">
                     {plan.features.map((feature, j) => (
                       <li key={j} className="flex items-start gap-2 text-xs text-slate-400">
                         <Check size={12} className="text-amber-400 mt-0.5 shrink-0" />
                         <span>{feature}</span>
                       </li>
                     ))}
                  </ul>
               </div>
             ))}
           </div>
           
           <div className="mt-6 text-center">
             <a href="mailto:contact@neocard.ch" className="text-xs text-slate-500 hover:text-white transition-colors underline decoration-slate-700">
               Besoin d'un devis personnalisé ? Contactez-nous.
             </a>
           </div>
        </div>
      </motion.div>
    </div>
  );
}