'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, ExternalLink, Smartphone, Shield, Globe, Baby } from 'lucide-react';

const OFFRE_NAISSANCE = {
  title: "Naissance",
  subtitle: "Premier Souffle",
  description: "Bien plus qu'un faire-part. Annoncez l'arrivée de votre petit miracle avec une page immersive : prénom révélé en animation, stats animées de bébé, premières photos et liste de naissance intégrée. Un souvenir digital que vos proches garderont précieusement.",
  demoLink: "https://naissance.neocard.ch",
  pricing: [
    {
      name: "Petit Cœur",
      price: "450 CHF",
      features: [
        "Faire-Part Digital Animé",
        "Prénom, Date, Poids & Taille Animés",
        "Galerie des Premières Photos",
        "Partage WhatsApp / SMS / E-mail",
        "Hébergement 1 an"
      ]
    },
    {
      name: "Étoile",
      price: "750 CHF",
      tag: "Coup de Cœur",
      features: [
        "Tout l'offre Petit Cœur",
        "Liste de Naissance Intégrée",
        "Livre d'Or de Bienvenue",
        "Compteur de Visites (qui a vu ?)",
        "Musique d'Ambiance au Choix",
        "Animation Confettis / Étoiles"
      ]
    },
    {
      name: "Miracle",
      price: "Sur Devis",
      features: [
        "Design 100% Sur Mesure",
        "Vidéo d'Introduction Cinématique",
        "Nom de domaine personnalisé",
        "Suivi des Premiers Mois (Blog)",
        "Impression QR Code pour Cadre"
      ]
    }
  ]
};

export default function NaissanceModal({ onClose }: { onClose: () => void }) {
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
        <div className="w-full md:w-2/5 bg-rose-950/40 p-8 pt-12 md:pt-8 flex flex-col shrink-0 relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
          
          <div className="relative z-10">
            <span className="text-rose-300 text-xs font-bold uppercase tracking-widest mb-2 block">{OFFRE_NAISSANCE.subtitle}</span>
            <h2 className="text-4xl font-serif text-white mb-6">{OFFRE_NAISSANCE.title}</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">{OFFRE_NAISSANCE.description}</p>
            
            <div className="space-y-4 mb-8">
               <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Smartphone size={16} className="text-rose-300"/> <span>100% Mobile Friendly</span>
               </div>
               <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Globe size={16} className="text-rose-300"/> <span>Partageable en un clic</span>
               </div>
               <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Shield size={16} className="text-rose-300"/> <span>Données sécurisées en Suisse</span>
               </div>
               <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Baby size={16} className="text-rose-300"/> <span>Souvenir digital éternel</span>
               </div>
            </div>
          </div>

          <div className="mt-auto relative z-10">
             <p className="text-xs text-slate-500 uppercase tracking-widest mb-3 text-center">Voir le résultat en direct</p>
             <a 
               href={OFFRE_NAISSANCE.demoLink} 
               target="_blank" 
               rel="noopener noreferrer"
               className="block w-full bg-rose-500 hover:bg-rose-400 text-white font-bold py-4 rounded-lg text-center transition-colors uppercase tracking-widest text-sm flex items-center justify-center gap-2"
             >
               Voir la Démo Live <ExternalLink size={16} />
             </a>
          </div>
        </div>

        {/* COLONNE DROITE : PRIX */}
        <div className="w-full md:w-3/5 p-8 bg-black">
           <h3 className="text-xl font-serif text-white mb-8 border-b border-white/10 pb-4 md:mt-0 mt-4">Nos Formules</h3>

           <div className="grid gap-4">
             {OFFRE_NAISSANCE.pricing.map((plan, i) => (
               <div key={i} className={`relative p-5 rounded-lg border transition-all ${plan.tag ? 'border-rose-500/40 bg-rose-900/10' : 'border-white/10 bg-white/5 hover:border-white/20'}`}>
                  
                  {plan.tag && (
                    <span className="absolute -top-2 right-4 bg-rose-500 text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm">
                      {plan.tag}
                    </span>
                  )}

                  <div className="flex justify-between items-end mb-3">
                     <h4 className={`text-base font-bold ${plan.tag ? 'text-rose-300' : 'text-white'}`}>{plan.name}</h4>
                     <div className="text-lg font-serif text-white">{plan.price}</div>
                  </div>

                  <ul className="grid grid-cols-1 gap-2">
                     {plan.features.map((feature, j) => (
                       <li key={j} className="flex items-start gap-2 text-xs text-slate-400">
                         <Check size={12} className="text-rose-400 mt-0.5 shrink-0" />
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