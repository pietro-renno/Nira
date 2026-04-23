import React from 'react';
import { Link } from 'react-router-dom';
import { MessagesSquare, ArrowRight } from 'lucide-react';

export default function AtendimentosChat() {
  return (
    <div className="flex flex-col items-center justify-center p-20 text-center space-y-10 animate-fade-in-up">
      <div className="w-32 h-32 bg-[#34D399]/10 rounded-full flex items-center justify-center border border-[#34D399]/20 shadow-glow shadow-[#34D399]/10">
        <MessagesSquare size={48} className="text-[#34D399]" />
      </div>
      
      <div className="space-y-4 max-w-md">
        <h2 className="text-3xl font-black text-white tracking-tight">Atendimentos</h2>
        <p className="text-text-muted text-sm leading-relaxed">
          Acesse o painel unificado de chat psicológico e emergência. Gerencie conversas ativas, realize triagens por IA e monitore o tempo de resposta.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          to="/admin/atendimentos-completo" 
          className="bg-[#34D399] hover:bg-[#2EB57D] text-white px-8 py-4 rounded-2xl font-bold text-sm transition-all shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:-translate-y-1 flex items-center gap-2"
        >
          Abrir Atendimentos <ArrowRight size={18} />
        </Link>
        <Link 
          to="/admin" 
          className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-2xl font-bold text-sm transition-all hover:-translate-y-1"
        >
          Voltar ao Início
        </Link>
      </div>
      
      {/* Background Decorativo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#34D399]/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
    </div>
  );
}
