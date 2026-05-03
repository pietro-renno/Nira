import React from 'react';
import { 
  Maximize2, Activity, Shield, Navigation, 
  MapPin, Radio, Zap, Globe, Target
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Mapa() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-[#04040F] p-4 md:p-8 overflow-hidden rounded-[2.5rem]">
      
      {/* Header */}
      <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase italic flex items-center gap-3">
           <div className="w-1.5 h-8 bg-brand-primary rounded-full shadow-[0_0_15px_rgba(139,111,255,0.5)]"></div>
           Monitoramento Geográfico
        </h2>
        <p className="text-text-muted text-xs md:text-sm mt-1 font-medium italic opacity-70">SISTEMA DE RASTREAMENTO TÁTICO NIRA • V3.0</p>
      </div>

      {/* Main Panel Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative glass rounded-[2rem] border border-white/5 overflow-hidden p-6 md:p-12">
        
        {/* Background Elements (Pointer Events None) */}
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ 
          backgroundImage: `linear-gradient(#8B6FFF 1px, transparent 1px), linear-gradient(90deg, #8B6FFF 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none"></div>

        {/* Tactical Icon */}
        <div className="relative mb-8 group pointer-events-none">
           <div className="w-20 h-20 md:w-24 md:h-24 bg-[#0A0A1F] border border-white/10 rounded-[2rem] flex items-center justify-center shadow-2xl relative z-10">
              <Globe size={40} className="text-brand-primary" />
           </div>
           <div className="absolute -inset-4 bg-brand-primary/20 blur-2xl rounded-full animate-pulse"></div>
           <div className="absolute -bottom-2 -right-2 bg-brand-primary p-2 rounded-xl shadow-xl z-20">
              <Target size={16} className="text-white" />
           </div>
        </div>

        {/* Text and Button */}
        <div className="text-center max-w-xl relative z-30">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 italic tracking-tighter uppercase leading-tight">
            Terminal Tático <br/>
            <span className="text-brand-primary drop-shadow-[0_0_10px_rgba(139,111,255,0.5)]">Offline</span>
          </h1>
          
          <p className="text-text-muted text-sm md:text-base mb-10 opacity-80 leading-relaxed font-medium px-4">
            A sincronização de satélites e processamento de rota milimétrica exigem o ambiente dedicado do terminal NIRA em tela cheia.
          </p>

          <button 
            onClick={() => navigate('/admin/mapa-completo')}
            className="group relative z-[100] inline-flex items-center gap-4 bg-brand-primary hover:bg-[#7a6cf0] text-white px-8 md:px-12 py-5 md:py-6 rounded-2xl text-sm md:text-lg font-black transition-all duration-300 shadow-[0_15px_35px_rgba(139,111,255,0.4)] active:scale-95 overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <Zap size={22} className="fill-white" />
            ACESSAR TERMINAL FULL-SCREEN
          </button>
        </div>

        {/* Stats Footer - Non-absolute to avoid overlap */}
        <div className="mt-12 w-full max-w-4xl flex flex-wrap items-center justify-center gap-x-12 gap-y-6 pt-10 border-t border-white/5 relative z-20">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0"><Radio size={18} className="text-brand-primary" /></div>
              <div className="text-left shrink-0">
                <p className="text-[9px] text-text-muted font-black tracking-widest uppercase mb-1">GPS SIGNAL</p>
                <p className="text-white font-black">99.8% STABLE</p>
              </div>
           </div>

           <div className="hidden md:block w-[1px] h-8 bg-white/5"></div>

           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0"><Activity size={18} className="text-brand-primary" /></div>
              <div className="text-left shrink-0">
                <p className="text-[9px] text-text-muted font-black tracking-widest uppercase mb-1">LATENCY</p>
                <p className="text-white font-black">14ms NOMINAL</p>
              </div>
           </div>

           <div className="hidden md:block w-[1px] h-8 bg-white/5"></div>

           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0"><Shield size={18} className="text-brand-primary" /></div>
              <div className="text-left shrink-0">
                <p className="text-[9px] text-text-muted font-black tracking-widest uppercase mb-1">ENCRYPTION</p>
                <p className="text-white font-black">AES-4096 BIT</p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
