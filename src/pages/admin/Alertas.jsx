import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  Search, 
  Filter, 
  Clock, 
  MapPin, 
  ArrowRight, 
  AlertTriangle, 
  Activity,
  CheckCircle2,
  MoreVertical,
  MessageSquare,
  Map as MapIcon
} from 'lucide-react';
import { NiraContext } from '../../context/NiraContext';

export default function Alertas() {
  const { alerts, updateChatStatus } = useContext(NiraContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisco, setFilterRisco] = useState('todos');
  const [activeType, setActiveType] = useState('todos');

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          alert.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          alert.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisco = filterRisco === 'todos' || alert.risk === filterRisco;
    const matchesType = activeType === 'todos' || alert.type === activeType;
    return matchesSearch && matchesRisco && matchesType;
  });

  const activeAlerts = alerts.filter(a => a.status === 'ativo');
  const criticalMap = alerts.filter(a => a.risk === 'alto' && a.status === 'ativo' && a.type === 'map');
  const criticalChat = alerts.filter(a => a.risk === 'alto' && a.status === 'ativo' && a.type === 'chat');

  return (
    <div className="space-y-6 animate-fade-in-up pb-10">
      
      {/* ── Mini Stats Header ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'S.O.S Mapa', value: criticalMap.length, color: 'text-brand-emergency', bg: 'from-brand-emergency/10 to-transparent', icon: <MapIcon size={18}/> },
          { label: 'S.O.S Chat', value: criticalChat.length, color: 'text-brand-primary', bg: 'from-brand-primary/10 to-transparent', icon: <MessageSquare size={18}/> },
          { label: 'Estáveis', value: activeAlerts.length - criticalMap.length - criticalChat.length, color: 'text-[#34D399]', bg: 'from-[#34D399]/10 to-transparent', icon: <Activity size={18}/> }
        ].map(stat => (
          <div key={stat.label} className={`bg-gradient-to-r ${stat.bg} border border-white/5 rounded-3xl p-5 flex items-center justify-between`}>
            <div>
               <p className="text-[9px] font-black uppercase tracking-widest text-text-muted mb-1">{stat.label}</p>
               <h3 className={`text-2xl font-black ${stat.color}`}>{stat.value}</h3>
            </div>
            <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* ── Filters Bar ── */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between border-b border-white/5 pb-6">
        <div className="flex bg-[#11111B]/60 p-1 rounded-2xl border border-white/5 w-full lg:w-auto">
          {['todos', 'map', 'chat'].map(type => (
            <button 
              key={type}
              onClick={() => setActiveType(type)}
              className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeType === type ? 'bg-brand-primary text-white shadow-lg' : 'text-text-muted hover:text-white'}`}
            >
              {type === 'map' ? <MapIcon size={12}/> : type === 'chat' ? <MessageSquare size={12}/> : <ShieldAlert size={12}/>}
              {type === 'map' ? 'Equipes' : type === 'chat' ? 'Chat' : 'Todos'}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
            <input 
              type="text" 
              placeholder="Pesquisar protocolo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#181825] border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-[11px] text-white focus:outline-none focus:border-brand-primary/50"
            />
          </div>
          <div className="flex gap-1.5">
            {['alto', 'médio', 'baixo'].map(r => (
              <button 
                key={r}
                onClick={() => setFilterRisco(filterRisco === r ? 'todos' : r)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${filterRisco === r ? 'bg-brand-primary text-white' : 'bg-[#181825] border border-white/5 text-text-muted'}`}
                title={`Risco ${r}`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${r === 'alto' ? 'bg-brand-emergency' : r === 'médio' ? 'bg-yellow-500' : 'bg-brand-primary'}`}></div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Alertas Cards ── */}
      <div className="space-y-4">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert, i) => (
            <div 
              key={alert.id}
              className={`group bg-[#11111B]/60 border ${alert.risk === 'alto' ? 'border-brand-emergency/20' : 'border-white/5'} rounded-[2rem] p-5 lg:p-7 flex flex-col lg:flex-row lg:items-center gap-6 transition-all duration-300 hover:bg-[#11111B]/80 hover:shadow-2xl relative overflow-hidden`}
            >
              {/* Type Pin */}
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${alert.type === 'map' ? 'bg-brand-emergency' : 'bg-brand-primary'}`}></div>
              
              <div className="flex flex-col lg:flex-row flex-1 lg:items-center gap-6 lg:gap-10">
                
                {/* ID & User */}
                <div className="lg:w-1/4 min-w-[180px]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[9px] font-mono font-black text-text-muted uppercase tracking-widest opacity-40">#{alert.id}</span>
                    <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest ${alert.type === 'map' ? 'bg-brand-emergency/10 text-brand-emergency' : 'bg-brand-primary/10 text-brand-primary'}`}>
                       {alert.type === 'map' ? 'S.O.S Mapa' : 'S.O.S Chat'}
                    </span>
                  </div>
                  <h4 className="text-lg font-black text-white truncate mb-1">{alert.user.split('•')[0]}</h4>
                  <p className="flex items-center gap-1.5 text-text-muted font-bold text-[10px] tracking-tight truncate">
                    <MapPin size={12} className="text-brand-primary" />
                    {alert.location}
                  </p>
                </div>

                {/* Risk & Time */}
                <div className="lg:w-40 flex flex-col gap-2">
                   <div className={`px-2.5 py-1 rounded-full border w-max flex items-center gap-2 ${alert.risk === 'alto' ? 'border-brand-emergency/30 bg-brand-emergency/5 text-brand-emergency' : 'border-white/10 bg-white/5 text-text-muted'}`}>
                      <div className={`w-1 h-1 rounded-full ${alert.risk === 'alto' ? 'bg-brand-emergency animate-pulse' : 'bg-brand-primary'}`}></div>
                      <span className="text-[9px] font-black uppercase tracking-widest">{alert.risk} Risco</span>
                   </div>
                   <div className="flex items-center gap-1.5 font-bold text-text-muted text-[10px] tracking-widest uppercase">
                    <Clock size={12} /> {alert.time.includes('há') ? alert.time : `há ${alert.time}`}
                  </div>
                </div>

                {/* Log Atividade */}
                <div className="flex-1 min-w-0">
                   <div className="bg-[#181825]/60 border border-white/5 rounded-2xl p-4 font-mono text-[10px] text-brand-primary/80 leading-relaxed group-hover:border-brand-primary/20 transition-colors">
                      <span className="opacity-30 mr-2">Monitoramento:</span>
                      {alert.logs[0]}
                   </div>
                </div>

                {/* Ações */}
                <div className="lg:w-auto flex flex-wrap items-center gap-2 mt-2 lg:mt-0 pt-4 lg:pt-0 border-t lg:border-none border-white/5">
                   <button 
                     onClick={() => updateChatStatus(alert.id, 'concluido')}
                     className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl text-text-muted hover:text-[#34D399] transition-all" 
                     title="Encerrar"
                   >
                     <CheckCircle2 size={20} />
                   </button>
                   <Link 
                     to="/admin/atendimentos-completo"
                     className="flex-1 lg:flex-none bg-brand-primary hover:bg-[#7a6cf0] text-white px-7 py-3.5 rounded-2xl font-black text-[10px] text-center uppercase tracking-widest shadow-lg transition-all hover:-translate-y-0.5 active:scale-95"
                   >
                     Assumir Atendimento
                   </Link>
                   <button className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl text-text-muted hover:text-white transition-all">
                     <MoreVertical size={20} />
                   </button>
                </div>

              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-[#11111B]/40 rounded-[3rem] border border-dashed border-white/5 flex flex-col items-center justify-center space-y-4">
             <ShieldAlert size={48} className="text-text-muted opacity-10" />
             <p className="text-text-muted font-bold tracking-widest uppercase text-xs">Nenhum alerta pendente</p>
          </div>
        )}
      </div>

    </div>
  );
}