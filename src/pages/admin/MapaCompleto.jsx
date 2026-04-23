import React, { useState, useContext } from 'react';
import { MapPin, Users, Shield, Navigation, Search, Filter, Layers, List } from 'lucide-react';
import { NiraContext } from '../../context/NiraContext';
import NavPill from '../../components/NavPill';

export default function MapaCompleto() {
  const { mapAgents, alerts } = useContext(NiraContext);
  const [activeLayer, setActiveLayer] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  // Simulação de Agentes
  const agents = [
    { id: 1, name: 'Agente André', pos: { x: 30, y: 40 }, status: 'Patrulha', type: 'agente' },
    { id: 2, name: 'Agente Pedro', pos: { x: 60, y: 25 }, status: 'Em Resgate', type: 'agente' },
    { id: 3, name: 'ONG Vida Nova', pos: { x: 45, y: 65 }, status: 'Disponível', type: 'ong' },
    { id: 4, name: 'Instituto Renascer', pos: { x: 15, y: 80 }, status: 'Ocupado', type: 'ong' },
  ];

  // Simulação de Ocorrências (Alertas S.O.S)
  const mapAlerts = alerts.filter(a => a.type === 'map' && a.status === 'ativo').map((a, i) => ({
    ...a,
    pos: { x: 20 + (i * 25), y: 30 + (i * 15) }
  }));

  return (
    <div className="h-screen w-full bg-[#0A0A10] flex flex-col overflow-hidden">
      
      {/* ── Header Flutuante ── */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
        <div className="glass-panel border-white/5 bg-[#11111B]/80 backdrop-blur-2xl rounded-3xl p-3 flex items-center justify-between shadow-3xl">
           <div className="flex items-center gap-4 px-4 border-r border-white/5">
             <div className="bg-brand-primary p-2 rounded-xl text-white">
               <Navigation size={20} className="rotate-45" />
             </div>
             <div>
               <h1 className="text-sm font-black text-white uppercase tracking-widest">GeoMonitor v2</h1>
               <p className="text-[10px] text-text-muted font-bold">Unidade de Gestão de Campo</p>
             </div>
           </div>

           <div className="flex-1 px-6">
              <div className="relative">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                <input 
                  type="text" 
                  placeholder="Pesquisar agentes ou perímetros..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent border-none outline-none text-xs text-white placeholder:text-text-muted/50 w-full pl-6"
                />
              </div>
           </div>

           <div className="flex gap-2 pr-2">
              {['todos', 'agentes', 'ongs', 'sos'].map(layer => (
                <button 
                  key={layer}
                  onClick={() => setActiveLayer(layer)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeLayer === layer ? 'bg-brand-primary text-white' : 'bg-white/5 text-text-muted'}`}
                >
                  {layer}
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* ── Painel de Controle Lateral ── */}
      <div className="absolute left-6 top-32 bottom-6 w-80 z-40 space-y-4">
         
         {/* Live Stats */}
         <div className="glass-panel border-white/5 rounded-3xl p-6 space-y-6">
            <h3 className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] flex items-center gap-2">
               <Activity size={14}/> Status em Tempo Real
            </h3>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1">
                  <p className="text-[9px] font-bold text-text-muted uppercase">Equipes</p>
                  <p className="text-2xl font-black text-white">08</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[9px] font-bold text-text-muted uppercase">S.O.S Ativos</p>
                  <p className="text-2xl font-black text-brand-emergency">{mapAlerts.length}</p>
               </div>
            </div>
         </div>

         {/* Agentes List */}
         <div className="glass-panel border-white/5 rounded-3xl p-6 flex-1 flex flex-col max-h-[60%] overflow-hidden">
            <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-4">Agentes Operacionais</h3>
            <div className="space-y-3 overflow-y-auto no-scrollbar">
               {agents.map(agent => (
                 <div key={agent.id} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-all">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center">
                          {agent.type === 'agente' ? <Shield size={14} className="text-brand-primary"/> : <Users size={14} className="text-[#34D399]"/>}
                       </div>
                       <div>
                          <p className="text-xs font-bold text-white">{agent.name}</p>
                          <p className="text-[10px] text-text-muted">{agent.status}</p>
                       </div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${agent.status === 'Patrulha' ? 'bg-[#34D399]' : 'bg-yellow-500'} animate-pulse`}></div>
                 </div>
               ))}
            </div>
         </div>
      </div>

      {/* ── Mapa Interativo Fake ── */}
      <div className="flex-1 relative bg-[#0F0F1A] overflow-hidden">
        {/* Map Grid / Texture */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #8B7EFA 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        {/* Animated Rings for S.O.S */}
        {mapAlerts.map(alert => (
          <div 
            key={alert.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
            style={{ left: `${alert.pos.x}%`, top: `${alert.pos.y}%` }}
          >
             <div className="relative">
                <div className="absolute inset-0 bg-brand-emergency rounded-full animate-ping opacity-20 scale-150"></div>
                <div className="absolute inset-0 bg-brand-emergency rounded-full animate-ping opacity-10 scale-[2]"></div>
                <div className="w-12 h-12 bg-brand-emergency border-4 border-white/20 rounded-full flex items-center justify-center shadow-3xl transform group-hover:scale-125 transition-transform">
                   <AlertTriangle size={20} className="text-white" />
                </div>
                
                {/* Popover Info */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 translate-y-[-10px] opacity-0 group-hover:opacity-100 transition-all pointer-events-none w-48">
                  <div className="bg-[#11111B] border border-brand-emergency/30 rounded-2xl p-4 shadow-3xl">
                     <p className="text-[10px] font-black text-brand-emergency uppercase tracking-widest mb-1">Risco Alto</p>
                     <p className="text-sm font-bold text-white">{alert.user}</p>
                     <p className="text-[10px] text-text-muted mt-2">{alert.location}</p>
                  </div>
                </div>
             </div>
          </div>
        ))}

        {/* Agentes Pins */}
        {agents.map(agent => (
           <div 
             key={agent.id}
             className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
             style={{ left: `${agent.pos.x}%`, top: `${agent.pos.y}%` }}
           >
              <div className="relative">
                 <div className={`w-8 h-8 ${agent.type==='agente'?'bg-brand-primary':'bg-[#34D399]'} border-2 border-white/20 rounded-xl flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform`}>
                    {agent.type==='agente' ? <Shield size={14} className="text-white"/> : <Users size={14} className="text-white"/>}
                 </div>
                 
                 {/* Label */}
                 <div className="absolute top-1/2 left-full translate-y-[-50%] ml-3 opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap bg-[#11111B]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5">
                    <p className="text-[10px] font-bold text-white tracking-wide">{agent.name}</p>
                 </div>
              </div>
           </div>
        ))}

        {/* Map Decoration: Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-5">
           <path d="M 0 500 Q 250 450 500 500 T 1000 500" stroke="#8B7EFA" strokeWidth="2" fill="none" />
           <path d="M 500 0 Q 550 250 500 500 T 500 1000" stroke="#8B7EFA" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* ── Footer / Barra de Status ── */}
      <div className="bg-[#11111B] border-t border-white/5 p-4 z-50 flex items-center justify-between px-8">
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
               <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Agentes em Campo</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-brand-emergency"></div>
               <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Emergências Ativas</span>
            </div>
         </div>
         <div className="flex items-center gap-3">
            <button 
              onClick={() => window.history.back()}
              className="px-6 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black tracking-widest text-white uppercase border border-white/5 transition-all"
            >
              Sair do Monitoramento
            </button>
            <div className="text-[10px] font-mono text-text-muted">
              COORD: 23°11'S 45°53'W
            </div>
         </div>
      </div>

    </div>
  );
}

// Icons
const Activity = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);
