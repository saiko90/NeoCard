'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, ExternalLink, Smartphone, Shield, Globe, Palmtree } from 'lucide-react';

const OFFRE_RETRAITE = {
  title: "Départ à la Retraite",
  subtitle: "L'Heure de Gloire",
  description: "30 ans de carrière ne se résument pas en un pot de départ. Offrez à votre collègue une page immersive avec les témoignages de toute l'équipe, une rétrospective de carrière et un compte à rebours vers la liberté.",
  demoLink: "https://retraite.neocard.ch",
  pricing: [
    {
      name: "Convivial",
      price: "550 CHF",
      features: [
        "Site Web Invitation Design",
        "Infos Pratiques & Carte GPS",
        "Compte à Rebours vers la Liberté",
        "Formulaire RSVP Simple",
        "Hébergement 1 an"
      ]
    },
    {
      name: "Hommage",
      price: "950 CHF",
      tag: "Recommandé",
      features: [
        "Tout l'offre Convivial",
        "Livre d'Or Vidéo des Collègues",
        "Rétrospective de Carrière Animée",
        "Galerie Photo des Moments Clés",
        "Cagnotte Commune Intégrée",
        "Gestion Excel des participants"
      ]
    },
    {
      name: "Prestige",
      price: "Sur Devis",
      features: [
        "Design 100% Sur Mesure",
        "Montage Vidéo Récapitulatif",
        "Nom de domaine personnalisé",
        "Branding Entreprise Intégré",
        "Assistance Dédiée"
      ]
    }
  ]
};

export default function RetraiteModal({ onClose }: { onClose: () => void }) {
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
        <div className="w-full md:w-2/5 bg-emerald-950/40 p-8 pt-12 md:pt-8 flex flex-col shrink-0 relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
          
          <div className="relative z-10">
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2 block">{OFFRE_RETRAITE.subtitle}</span>
            <h2 className="text-4xl font-serif text-white mb-6">{OFFRE_RETRAITE.title}</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">{OFFRE_RETRAITE.description}</p>
            
            <div className="space-y-4 mb-8">
               <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Smartphone size={16} className="text-emerald-400"/> <span>100% Mobile Friendly</span>
               </div>
               <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Globe size={16} className="text-emerald-400"/> <span>Partageable par lien</span>
               </div>
               <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Shield size={16} className="text-emerald-400"/> <span>Données sécurisées en Suisse</span>
               </div>
               <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Palmtree size={16} className="text-emerald-400"/> <span>Le cadeau collectif parfait</span>
               </div>
            </div>
          </div>

          <div className="mt-auto relative z-10">
             <p className="text-xs text-slate-500 uppercase tracking-widest mb-3 text-center">Voir le résultat en direct</p>
             <a 
               href={OFFRE_RETRAITE.demoLink} 
               target="_blank" 
               rel="noopener noreferrer"
               className="block w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-lg text-center transition-colors uppercase tracking-widest text-sm flex items-center justify-center gap-2"
             >
               Voir la Démo Live <ExternalLink size={16} />
             </a>
          </div>
        </div>

        {/* COLONNE DROITE : PRIX */}
        <div className="w-full md:w-3/5 p-8 bg-black">
           <h3 className="text-xl font-serif text-white mb-8 border-b border-white/10 pb-4 md:mt-0 mt-4">Nos Formules</h3>

           <div className="grid gap-4">
             {OFFRE_RETRAITE.pricing.map((plan, i) => (
               <div key={i} className={`relative p-5 rounded-lg border transition-all ${plan.tag ? 'border-emerald-500/40 bg-emerald-900/10' : 'border-white/10 bg-white/5 hover:border-white/20'}`}>
                  
                  {plan.tag && (
                    <span className="absolute -top-2 right-4 bg-emerald-600 text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm">
                      {plan.tag}
                    </span>
                  )}

                  <div className="flex justify-between items-end mb-3">
                     <h4 className={`text-base font-bold ${plan.tag ? 'text-emerald-400' : 'text-white'}`}>{plan.name}</h4>
                     <div className="text-lg font-serif text-white">{plan.price}</div>
                  </div>

                  <ul className="grid grid-cols-1 gap-2">
                     {plan.features.map((feature, j) => (
                       <li key={j} className="flex items-start gap-2 text-xs text-slate-400">
                         <Check size={12} className="text-emerald-400 mt-0.5 shrink-0" />
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