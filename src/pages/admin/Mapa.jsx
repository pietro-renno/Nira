import React from 'react';
import { Link } from 'react-router-dom';
import { Map as MapIcon, ArrowRight } from 'lucide-react';

export default function Mapa() {
  return (
    <div className="flex flex-col items-center justify-center p-20 text-center space-y-10 animate-fade-in-up">
      <div className="w-32 h-32 bg-brand-primary/10 rounded-full flex items-center justify-center border border-brand-primary/20 shadow-glow shadow-brand-primary/10">
        <MapIcon size={48} className="text-brand-primary" />
      </div>
      
      <div className="space-y-4 max-w-md">
        <h2 className="text-3xl font-black text-white tracking-tight">Mapa de Equipes</h2>
        <p className="text-text-muted text-sm leading-relaxed">
          O mapa interativo permite visualizar a localização em tempo real das equipes de campo, ONGs parceiras e ocorrências em aberto. Escolha uma das opções abaixo para prosseguir.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          to="/admin/mapa-completo" 
          className="bg-brand-primary hover:bg-[#7a6cf0] text-white px-8 py-4 rounded-2xl font-bold text-sm transition-all shadow-lg glow-primary hover:-translate-y-1 flex items-center gap-2"
        >
          Abrir Mapa Completo <ArrowRight size={18} />
        </Link>
        <Link 
          to="/admin" 
          className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-2xl font-bold text-sm transition-all hover:-translate-y-1"
        >
          Voltar ao Início
        </Link>
      </div>
      
      {/* Background Decorativo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
    </div>
  );
}
