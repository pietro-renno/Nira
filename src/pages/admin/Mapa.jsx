import { useState, useContext } from 'react';
import { Bell, Search, ChevronDown, Map as MapIcon, Users, ShieldAlert } from 'lucide-react';
import { NiraContext } from '../../context/NiraContext';

export default function Mapa() {
  const { mapAgents, allocateMapAgent } = useContext(NiraContext);
  const [activeTab, setActiveTab] = useState('Equipe');

  return (
    <div className="h-[calc(100vh-160px)] -mt-8 -mx-8 relative overflow-hidden bg-bg-main animate-fade-in-up">
      
      {/* Search Input On Map - Glass */}
      <div className="absolute top-8 left-8 z-20 flex gap-3 w-full max-w-md">
        <div className="relative flex-1 group">
          <input 
            type="text" 
            placeholder="Buscar endereço..." 
            className="w-full bg-[#181825]/90 backdrop-blur-xl text-white font-medium shadow-[0_15px_30px_rgba(0,0,0,0.5)] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-brand-primary/50 transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-hover:text-brand-primary transition-colors" size={20} />
        </div>
        <button onClick={() => alert('Localizando endereço no mapa...')} className="bg-gradient-to-r from-brand-primary to-[#7a6cf0] hover:scale-105 text-white px-6 py-4 rounded-2xl font-bold text-sm shadow-[0_15px_30px_rgba(139,126,250,0.3)] transition-all flex items-center justify-center">
          Localizar
        </button>
      </div>

      {/* Map Legend Overlay - Glass */}
      <div className="absolute bottom-8 left-8 z-20 bg-[#11111B]/80 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-64 hover:-translate-y-1 transition-transform duration-300">
        <h3 className="font-extrabold text-white mb-6 text-sm tracking-tight flex items-center gap-2">
           <MapIcon size={18} className="text-brand-primary" /> Agenda de Serviços
        </h3>
        <ul className="space-y-4 text-xs text-text-muted font-semibold tracking-wide">
           <li className="flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-[#34D399] shadow-[0_0_10px_rgba(52,211,153,0.5)]"></span> Agente Ativo</li>
           <li className="flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></span> Delegacia / CRAM</li>
           <li className="flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-brand-emergency shadow-[0_0_10px_rgba(229,62,62,0.5)]"></span> Alerta S.O.S.</li>
        </ul>
      </div>

      {/* Map Abstract Background */}
      <div className="absolute inset-0 z-0 bg-[#0A0A10]">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
         <img src="https://placehold.co/1200x800/181825/2a2a35?text=MAPA+INTERATIVO+AVANÇADO" className="w-full h-full object-cover opacity-80 mix-blend-screen" alt="Mapa" />
         
         {/* Fake Map Markers Premium */}
         <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-brand-emergency/20 rounded-full flex items-center justify-center animate-pulse" style={{animationDuration: '2s'}}>
            <div className="w-4 h-4 bg-brand-emergency rounded-full shadow-[0_0_20px_#e53e3e]"></div>
         </div>
         <div className="absolute top-1/3 left-1/2 w-8 h-8 rounded-full border border-[#34D399]/50 flex items-center justify-center bg-[#11111B]/50 backdrop-blur-sm shadow-xl">
            <div className="w-2.5 h-2.5 bg-[#34D399] rounded-full shadow-[0_0_10px_#34D399]"></div>
         </div>
      </div>

      {/* Right Sidebar Panel Over map - Ultra Glass */}
      <div className="absolute right-0 top-0 bottom-0 w-96 bg-[#11111B]/80 backdrop-blur-2xl border-l border-white/10 z-20 flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.5)]">
         
         {/* Sidebar Header with Tabs */}
         <div className="flex border-b border-white/5 bg-transparent pt-4 px-4 gap-2 pb-0">
           <button 
             onClick={() => setActiveTab('Zonas')} 
             className={`flex-1 pb-4 text-[11px] font-extrabold uppercase tracking-widest border-b-2 transition-all duration-300 relative ${activeTab === 'Zonas' ? 'border-brand-primary text-white' : 'border-transparent text-text-muted hover:text-white'}`}
           >
             Zonas
           </button>
           <button 
             onClick={() => setActiveTab('Equipe')} 
             className={`flex-1 pb-4 text-[11px] font-extrabold uppercase tracking-widest border-b-2 transition-all duration-300 relative flex justify-center items-center gap-2 ${activeTab === 'Equipe' ? 'border-brand-primary text-white' : 'border-transparent text-text-muted hover:text-white'}`}
           >
             Equipe 
             <span className={`text-[9px] px-2 py-0.5 rounded-md ${activeTab === 'Equipe' ? 'bg-brand-primary/20 text-brand-primary' : 'bg-white/5 text-text-muted'}`}>{mapAgents.length}</span>
           </button>
           <button className="pb-4 px-4 flex items-center justify-center text-text-muted hover:text-white transition-colors">
             <Bell size={18} />
           </button>
         </div>

         {/* Sidebar Content */}
         <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
           
           {activeTab === 'Equipe' && (
             <div className="space-y-4">
               {mapAgents.map((user, i) => (
                 <div key={user.id} className="bg-white/5 backdrop-blur-md border border-white/5 hover:border-brand-primary/30 rounded-[1.5rem] p-5 transition-all duration-300 hover:shadow-lg group cursor-default">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2B2B3C] to-[#1E1E2E] flex items-center justify-center font-black text-lg text-white shadow-inner border border-white/5 group-hover:border-brand-primary/20 transition-colors">
                            {user.name.charAt(0)}
                         </div>
                         <div>
                            <p className="font-bold text-white text-sm tracking-tight">{user.name}</p>
                            <p className="text-[10px] text-brand-primary font-extrabold uppercase tracking-widest flex items-center gap-1 mt-1"><ShieldAlert size={10}/> Equipe NIRA</p>
                         </div>
                      </div>
                      <span className={`text-[9px] font-extrabold uppercase px-2 py-1 rounded-md flex gap-1.5 items-center border tracking-widest ${
                        user.status === 'Ativo' ? 'bg-[#34D399]/10 border-[#34D399]/20 text-[#34D399]' : 'bg-white/5 border-white/10 text-text-muted'
                      }`}>
                         {user.status === 'Ativo' && <span className="w-1.5 h-1.5 bg-[#34D399] rounded-full shadow-[0_0_5px_#34D399]"></span>}
                         {user.status}
                      </span>
                    </div>
                    
                    <div className="flex gap-2 relative">
                       <div className="flex-1 relative border border-white/10 bg-[#11111B]/50 rounded-xl py-3 px-4 flex justify-between items-center text-xs font-semibold text-text-muted cursor-pointer hover:border-brand-primary/50 hover:bg-[#181825]/50 transition-colors backdrop-blur-sm">
                         <select 
                           value={user.region || ''} 
                           onChange={(e) => allocateMapAgent(user.id, e.target.value)} 
                           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer text-xs"
                         >
                           <option value="">Selecionar zona...</option>
                           <option value="Norte">Norte</option>
                           <option value="Sul">Sul</option>
                           <option value="Leste">Leste</option>
                           <option value="Oeste">Oeste</option>
                           <option value="Centro">Centro</option>
                         </select>
                         {user.region ? `Alocado: ${user.region}` : 'Selecionar zona...'} <ChevronDown size={14} className="opacity-50" />
                       </div>
                       <button className="bg-brand-primary/50 cursor-not-allowed hover:bg-[#7a6cf0]/50 px-4 py-3 rounded-xl text-xs font-bold text-white/50 transition-all shadow-[0_0_15px_rgba(139,126,250,0.1)]">
                         Salvo
                       </button>
                    </div>
                 </div>
               ))}
             </div>
           )}

           {activeTab === 'Zonas' && (
             <div className="space-y-4">
                <p className="text-text-muted text-[10px] font-extrabold uppercase tracking-widest mb-4 px-2">Monitoramento por região</p>
                {['Norte', 'Sul', 'Leste', 'Oeste', 'Centro'].map((zona, i) => (
                  <div key={i} className="flex items-center justify-between bg-white/5 backdrop-blur-md border border-white/5 rounded-[1.5rem] px-6 py-5 cursor-pointer hover:border-brand-primary/50 hover:bg-white/10 transition-all hover:scale-[1.02]">
                     <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_currentColor] ${i===1?'bg-[#34D399] text-[#34D399]': i===2?'bg-yellow-500 text-yellow-500': i===3?'bg-orange-500 text-orange-500':'bg-brand-primary text-brand-primary'}`}></div>
                        <span className="font-bold text-[15px] text-white tracking-tight">{zona}</span>
                     </div>
                     <span className="text-[10px] font-bold text-text-muted bg-[#11111B]/50 px-3 py-1 rounded-full border border-white/5 uppercase tracking-widest">{i===0?'1 agente':'0 agentes'}</span>
                  </div>
                ))}
             </div>
           )}

         </div>
      </div>
      
    </div>
  );
}