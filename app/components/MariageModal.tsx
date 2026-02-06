'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, ExternalLink, Smartphone, Shield, Globe } from 'lucide-react';

const OFFRE_MARIAGE = {
  title: "Mariage",
  subtitle: "L'Union Sacrée",
  description: "Fini les faire-part papier qui finissent à la poubelle. Offrez à vos invités une expérience immersive digne de votre union. Programme, RSVP intelligent, Galerie live et Livre d'or audio.",
  demoLink: "https://mariage.neocard.ch",
  pricing: [
    {
      name: "Essentiel",
      price: "950 CHF",
      features: [
        "Site Web Invitation Design",
        "Programme & Itinéraire GPS",
        "Formulaire RSVP Simple",
        "Compte à rebours",
        "Hébergement 1 an"
      ]
    },
    {
      name: "Prestige",
      price: "1'900 CHF",
      tag: "Recommandé",
      features: [
        "Tout l'offre Essentiel",
        "Galerie Photo & Vidéo Live",
        "Livre d'Or Audio (Vocaux)",
        "Formulaire RSVP Complexe",
        "Protection par Mot de Passe",
        "Gestion Excel des invités"
      ]
    },
    {
      name: "Excellence",
      price: "Sur Devis",
      features: [
        "Design 100% Sur Mesure",
        "Multi-langues (FR/EN/DE)",
        "Nom de domaine personnalisé",
        "Assistance dédiée aux mariés",
        "Animations 3D spécifiques"
      ]
    }
  ]
};

export default function MariageModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-hidden">
      {/* Overlay cliquable pour fermer */}
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }} 
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative bg-slate-950 border border-white/10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl flex flex-col md:flex-row z-10"
      >
        
        {/* BOUTON FERMER (Mobile & Desktop) */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full text-white hover:bg-white hover:text-black transition-colors"
        >
          <X size={20} />
        </button>

        {/* COLONNE GAUCHE : VISUEL & INFO */}
        <div className="w-full md:w-2/5 bg-slate-900 p-8 flex flex-col relative overflow-hidden">
          {/* Fond texturé */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
          
          <div className="relative z-10">
            <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-2 block">{OFFRE_MARIAGE.subtitle}</span>
            <h2 className="text-4xl font-serif text-white mb-6">{OFFRE_MARIAGE.title}</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">{OFFRE_MARIAGE.description}</p>
            
            {/* Arguments rassurance */}
            <div className="space-y-4 mb-8">
               <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Smartphone size={16} className="text-amber-500"/> <span>100% Mobile Friendly</span>
               </div>
               <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Globe size={16} className="text-amber-500"/> <span>Accessible sans application</span>
               </div>
               <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Shield size={16} className="text-amber-500"/> <span>Données sécurisées en Suisse</span>
               </div>
            </div>
          </div>

          <div className="mt-auto relative z-10">
             <p className="text-xs text-slate-500 uppercase tracking-widest mb-3 text-center">Voir le résultat en direct</p>
             <a 
               href={OFFRE_MARIAGE.demoLink} 
               target="_blank" 
               rel="noopener noreferrer"
               className="block w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 rounded-lg text-center transition-colors uppercase tracking-widest text-sm flex items-center justify-center gap-2"
             >
               Voir la Démo Live <ExternalLink size={16} />
             </a>
          </div>
        </div>

        {/* COLONNE DROITE : PRIX */}
        <div className="w-full md:w-3/5 p-8 bg-black">
           <h3 className="text-xl font-serif text-white mb-8 border-b border-white/10 pb-4">Nos Formules</h3>

           <div className="grid gap-4">
             {OFFRE_MARIAGE.pricing.map((plan, i) => (
               <div key={i} className={`relative p-5 rounded-lg border transition-all ${plan.tag ? 'border-amber-500/40 bg-amber-900/10' : 'border-white/10 bg-white/5 hover:border-white/20'}`}>
                  
                  {plan.tag && (
                    <span className="absolute -top-2 right-4 bg-amber-500 text-black text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm">
                      {plan.tag}
                    </span>
                  )}

                  <div className="flex justify-between items-end mb-3">
                     <h4 className={`text-base font-bold ${plan.tag ? 'text-amber-400' : 'text-white'}`}>{plan.name}</h4>
                     <div className="text-lg font-serif text-white">{plan.price}</div>
                  </div>

                  <ul className="grid grid-cols-1 gap-2">
                     {plan.features.map((feature, j) => (
                       <li key={j} className="flex items-start gap-2 text-xs text-slate-400">
                         <Check size={12} className="text-amber-500 mt-0.5 shrink-0" />
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