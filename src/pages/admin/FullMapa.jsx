import React, { useState, useContext, useEffect } from 'react';
import { 
  MapPin, 
  Users, 
  Shield, 
  Navigation, 
  Search, 
  Activity,
  AlertTriangle,
  Layers,
  ArrowLeft
} from 'lucide-react';
import { NiraContext } from '../../context/NiraContext';
import { useNavigate } from 'react-router-dom';

export default function FullMapa() {
  const { mapAgents, alerts } = useContext(NiraContext);
  const navigate = useNavigate();
  const [activeLayer, setActiveLayer] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  // Simulação de Agentes Operativos
  const agents = [
    { id: 1, name: 'Agente André', pos: { x: 32, y: 45 }, status: 'Patrulha', type: 'agente' },
    { id: 2, name: 'Agente Pedro', pos: { x: 58, y: 28 }, status: 'Resgate', type: 'agente' },
    { id: 3, name: 'ONG Vida Nova', pos: { x: 42, y: 68 }, status: 'Disponível', type: 'ong' },
    { id: 4, name: 'Instituto Renascer', pos: { x: 18, y: 75 }, status: 'Ocupado', type: 'ong' },
  ];

  // Ocorrências de Campo (Filtro por Mapa)
  const mapAlerts = alerts.filter(a => a.type === 'map' && a.status === 'ativo').map((a, i) => ({
    ...a,
    pos: { x: 25 + (i * 22), y: 35 + (i * 18) }
  }));

  return (
    <div className="h-screen w-full bg-[#0A0A10] flex flex-col overflow-hidden fixed inset-0 z-[9999]">
      
      {/* ── Background Mapa (Abstrato/Grid) ── */}
      <div className="absolute inset-0 z-0 bg-[#0F0F1A]">
        {/* Grid de Coordenadas */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#8B7EFA 1px, transparent 1px), linear-gradient(90deg, #8B7EFA 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, #8B7EFA 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }}></div>
        
        {/* SVG Decorative Paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.02]">
           <path d="M 0 400 Q 300 350 600 450 T 1200 400" stroke="#8B7EFA" strokeWidth="3" fill="none" />
           <path d="M 400 0 Q 450 300 400 600 T 400 1200" stroke="#8B7EFA" strokeWidth="3" fill="none" />
        </svg>

        {/* Marcadores de Agentes */}
        {(activeLayer === 'todos' || activeLayer === 'agentes' || activeLayer === 'ongs') && agents.map(agent => (
           <div 
             key={agent.id}
             className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
             style={{ left: `${agent.pos.x}%`, top: `${agent.pos.y}%` }}
           >
              <div className="relative">
                 <div className={`w-10 h-10 ${agent.type==='agente'?'bg-brand-primary':'bg-[#34D399]'} border-4 border-[#0A0A10] rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-125 transition-all duration-300`}>
                    {agent.type==='agente' ? <Shield size={16} className="text-white"/> : <Users size={16} className="text-white"/>}
                 </div>
                 
                 {/* Label Flutuante */}
                 <div className="absolute top-1/2 left-full translate-y-[-50%] ml-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <div className="bg-[#11111B]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-3xl w-52">
                       <p className="text-[9px] font-black text-brand-primary uppercase tracking-widest mb-1">{agent.type === 'agente' ? 'Segurança/Campo' : 'Entidade Parceira'}</p>
                       <p className="text-sm font-black text-white">{agent.name}</p>
                       <div className="flex items-center gap-2 mt-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${agent.status === 'Patrulha' || agent.status === 'Disponível' ? 'bg-[#34D399]' : 'bg-yellow-500'} animate-pulse`}></div>
                          <p className="text-[10px] font-bold text-text-muted">{agent.status}</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        ))}

        {/* Marcadores de S.O.S (Ocorrências) */}
        {(activeLayer === 'todos' || activeLayer === 'sos') && mapAlerts.map(alert => (
          <div 
            key={alert.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-30"
            style={{ left: `${alert.pos.x}%`, top: `${alert.pos.y}%` }}
          >
             <div className="relative">
                {/* Rings de Alerta */}
                <div className="absolute inset-0 bg-brand-emergency rounded-full animate-ping opacity-20 scale-[2.5]"></div>
                <div className="absolute inset-0 bg-brand-emergency rounded-full animate-ping opacity-10 scale-[3.5] [animation-delay:0.5s]"></div>
                
                <div className="w-14 h-14 bg-brand-emergency border-4 border-[#0A0A10] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.5)] transform group-hover:scale-110 transition-transform">
                   <AlertTriangle size={24} className="text-white animate-pulse" />
                </div>
                
                {/* Popover Detalhes */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <div className="bg-[#11111B] border-2 border-brand-emergency rounded-[2rem] p-6 shadow-3xl w-64">
                     <div className="flex justify-between items-start mb-4">
                        <span className="bg-brand-emergency/10 text-brand-emergency border border-brand-emergency/20 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">S.O.S Urgente</span>
                        <span className="text-[10px] font-mono text-white/50">#{alert.id}</span>
                     </div>
                     <p className="text-lg font-black text-white mb-1">{alert.user}</p>
                     <p className="text-[11px] text-text-muted mb-4 flex items-center gap-2"><MapPin size={12}/> {alert.location}</p>
                     <button 
                       onClick={(e) => { e.stopPropagation(); navigate('/admin/atendimentos-chat'); }} 
                       className="w-full bg-brand-emergency py-3 rounded-xl text-[10px] font-black text-white uppercase tracking-widest hover:brightness-110 transition-all"
                     >
                       Iniciar Intervenção
                     </button>
                  </div>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* ── Header Monitor ── */}
      <div className="relative z-50 p-6 flex items-start justify-between pointer-events-none">
        
        <div className="flex items-start gap-4 pointer-events-auto">
           <button 
             onClick={() => navigate(-1)} 
             className="w-12 h-12 bg-[#11111B]/80 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-brand-primary transition-all shadow-2xl"
           >
             <ArrowLeft size={20} />
           </button>
           
           <div className="bg-[#11111B]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center gap-6 shadow-2xl">
             <div className="flex items-center gap-4 pr-6 border-r border-white/10">
                <div className="bg-brand-primary p-2.5 rounded-xl">
                  <Navigation size={22} className="text-white rotate-45" />
                </div>
                <div>
                   <h2 className="text-sm font-black text-white uppercase tracking-widest">GeoMonitor Ultra</h2>
                   <p className="text-[10px] text-text-muted font-bold">SP :: Unidade Metropolitana</p>
                </div>
             </div>
             
             <div className="flex gap-4">
                <div className="text-center">
                   <p className="text-[9px] font-black text-text-muted uppercase tracking-tighter">Lat: 23°33'12" S</p>
                   <p className="text-[9px] font-black text-text-muted uppercase tracking-tighter">Long: 46°38'02" W</p>
                </div>
                <div className="text-center">
                   <p className="text-[9px] font-black text-text-muted uppercase tracking-tighter">Alt: 760m</p>
                   <p className="text-[9px] font-black text-[#34D399] uppercase tracking-tighter">Signal: Stable</p>
                </div>
             </div>
           </div>
        </div>

        <div className="pointer-events-auto flex gap-3">
           <div className="bg-[#11111B]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex gap-1 shadow-2xl">
              {[
                { id: 'todos', label: 'Unificado', icon: <Layers size={14}/> },
                { id: 'agentes', label: 'Agentes', icon: <Shield size={14}/> },
                { id: 'ongs', label: 'Entidades', icon: <Users size={14}/> },
                { id: 'sos', label: 'S.O.S', icon: <AlertTriangle size={14}/> }
              ].map(layer => (
                <button 
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeLayer === layer.id ? 'bg-brand-primary text-white shadow-lg' : 'text-text-muted hover:text-white'}`}
                >
                  {layer.icon} <span className="hidden sm:inline">{layer.label}</span>
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* ── Painel de Informações Lateral ── */}
      <div className="absolute left-6 bottom-6 z-50 w-80 space-y-4">
         <div className="bg-[#11111B]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-3xl space-y-8">
            <div>
               <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <Activity size={14} className="text-brand-primary"/> Live Analytics
               </h3>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                     <p className="text-[9px] font-black text-text-muted uppercase">Conectados</p>
                     <p className="text-3xl font-black text-white">12</p>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[9px] font-black text-brand-emergency uppercase">Críticos</p>
                     <p className="text-3xl font-black text-brand-emergency">{mapAlerts.length}</p>
                  </div>
               </div>
            </div>

            <div className="space-y-4">
               <h4 className="text-[10px] font-black text-text-muted uppercase tracking-widest">Histórico de Movimentação</h4>
               <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex gap-4 items-start border-l border-white/10 ml-1 pl-4 relative">
                       <div className="absolute -left-[4.5px] top-1 w-2 h-2 rounded-full bg-brand-primary shadow-[0_0_10px_#8B7EFA]"></div>
                       <div>
                          <p className="text-[11px] font-bold text-white leading-tight">Posição Agente #{i} atualizada</p>
                          <p className="text-[10px] text-text-muted mt-1 uppercase">ZONA SUL - {12 + i}:4{i}h</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* ── Footer / Info Coords ── */}
      <div className="absolute right-6 bottom-6 z-50">
         <div className="bg-[#11111B]/60 backdrop-blur-md border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-8 shadow-2xl">
            <div className="flex gap-4">
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
                  <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Campo</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#34D399]"></div>
                  <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Parceiros</span>
               </div>
            </div>
            <div className="text-[10px] font-mono text-white/30 font-bold">
               UPDATE :: T-SEC {new Date().toLocaleTimeString()}
            </div>
         </div>
      </div>

    </div>
  );
}