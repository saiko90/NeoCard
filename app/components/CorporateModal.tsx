'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, ExternalLink, Smartphone, Shield, Globe, Building2 } from 'lucide-react';

const OFFRE_CORPORATE = {
  title: "Événement Corporate",
  subtitle: "L'Excellence Professionnelle",
  description: "Conférences, lancements de produit, galas d'entreprise, team buildings — votre marque mérite une invitation à la hauteur de son image. Un site événementiel sur-mesure avec gestion des inscriptions, agenda interactif et branding intégral.",
  demoLink: "https://corporate.neocard.ch",
  pricing: [
    {
      name: "Starter",
      price: "750 CHF",
      features: [
        "Page Événement Professionnelle",
        "Programme & Agenda Interactif",
        "Formulaire d'Inscription / RSVP",
        "Carte GPS du Lieu",
        "Branding Couleurs & Logo",
        "Hébergement 1 an"
      ]
    },
    {
      name: "Business",
      price: "1'500 CHF",
      tag: "Best-Seller",
      features: [
        "Tout l'offre Starter",
        "Gestion Multi-Sessions / Ateliers",
        "Profils des Intervenants",
        "Export Excel des Inscrits",
        "Galerie Photo Post-Événement",
        "Analytics & Statistiques de Visite"
      ]
    },
    {
      name: "Enterprise",
      price: "Sur Devis",
      features: [
        "Design 100% Sur Mesure",
        "Multi-événements & Série",
        "Intégration CRM / Mailchimp",
        "Billetterie / Paiement en Ligne",
        "Multi-langues (FR/EN/DE/IT)",
        "Nom de domaine personnalisé"
      ]
    }
  ]
};

export default function CorporateModal({ onClose }: { onClose: () => void }) {
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
        <div className="w-full md:w-2/5 bg-cyan-950/40 p-8 pt-12 md:pt-8 flex flex-col shrink-0 relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
          
          <div className="relative z-10">
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2 block">{OFFRE_CORPORATE.subtitle}</span>
            <h2 className="text-4xl font-serif text-white mb-6">{OFFRE_CORPORATE.title}</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">{OFFRE_CORPORATE.description}</p>
            
            <div className="space-y-4 mb-8">
               <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Smartphone size={16} className="text-cyan-400"/> <span>100% Mobile Friendly</span>
               </div>
               <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Globe size={16} className="text-cyan-400"/> <span>Multi-langues disponible</span>
               </div>
               <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Shield size={16} className="text-cyan-400"/> <span>Données sécurisées en Suisse</span>
               </div>
               <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Building2 size={16} className="text-cyan-400"/> <span>Branding entreprise intégral</span>
               </div>
            </div>
          </div>

          <div className="mt-auto relative z-10">
             <p className="text-xs text-slate-500 uppercase tracking-widest mb-3 text-center">Voir le résultat en direct</p>
             <a 
               href={OFFRE_CORPORATE.demoLink} 
               target="_blank" 
               rel="noopener noreferrer"
               className="block w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 rounded-lg text-center transition-colors uppercase tracking-widest text-sm flex items-center justify-center gap-2"
             >
               Voir la Démo Live <ExternalLink size={16} />
             </a>
          </div>
        </div>

        {/* COLONNE DROITE : PRIX */}
        <div className="w-full md:w-3/5 p-8 bg-black">
           <h3 className="text-xl font-serif text-white mb-8 border-b border-white/10 pb-4 md:mt-0 mt-4">Nos Formules</h3>

           <div className="grid gap-4">
             {OFFRE_CORPORATE.pricing.map((plan, i) => (
               <div key={i} className={`relative p-5 rounded-lg border transition-all ${plan.tag ? 'border-cyan-500/40 bg-cyan-900/10' : 'border-white/10 bg-white/5 hover:border-white/20'}`}>
                  
                  {plan.tag && (
                    <span className="absolute -top-2 right-4 bg-cyan-600 text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm">
                      {plan.tag}
                    </span>
                  )}

                  <div className="flex justify-between items-end mb-3">
                     <h4 className={`text-base font-bold ${plan.tag ? 'text-cyan-400' : 'text-white'}`}>{plan.name}</h4>
                     <div className="text-lg font-serif text-white">{plan.price}</div>
                  </div>

                  <ul className="grid grid-cols-1 gap-2">
                     {plan.features.map((feature, j) => (
                       <li key={j} className="flex items-start gap-2 text-xs text-slate-400">
                         <Check size={12} className="text-cyan-400 mt-0.5 shrink-0" />
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