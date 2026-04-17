import { Users, AlertTriangle, MessageSquare, ArrowUpRight, Check, AlertCircle } from 'lucide-react';
import { useContext } from 'react';
import { NiraContext } from '../../context/NiraContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { alerts, chats } = useContext(NiraContext);
  const navigate = useNavigate();
  
  const activeAlertsCount = alerts.filter(a => a.status === 'ativo').length;
  const todayChatsCount = chats.length;
  const activeChatsCount = chats.filter(c => c.status === 'ativo').length;

  const urgentAlert = alerts.find(a => a.risk === 'alto' && a.status === 'ativo') || alerts[0];
  const kpis = [
    { title: 'Alertas Ativos', value: activeAlertsCount.toString(), trend: 'Hoje', icon: <AlertTriangle size={24} className="text-brand-emergency" />, alert: activeAlertsCount > 0 },
    { title: 'Atendimentos Hoje', value: todayChatsCount.toString(), trend: 'Hoje', icon: <MessageSquare size={24} className="text-brand-primary" />, alert: false },
    { title: 'Usuárias no Chat', value: activeChatsCount.toString(), trend: 'Ao vivo', icon: <Users size={24} className="text-[#34D399]" />, alert: false }
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      
      {/* S.O.S Banner Focus */}
      <div className="bg-gradient-to-r from-[#2B1014] to-[#1E1E2E] border border-brand-emergency text-brand-emergency rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between shadow-[0_0_50px_rgba(229,62,62,0.15)] relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-emergency/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 animate-pulse"></div>
        <div className="flex items-center gap-6 relative z-10">
          <div className="p-5 bg-brand-emergency/20 rounded-2xl flex items-center justify-center animate-pulse border border-brand-emergency/30">
            <AlertCircle size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-black mb-2 tracking-tight">S.O.S. #{urgentAlert?.id || '---'}</h2>
            <p className="text-sm font-semibold opacity-90 tracking-wide text-brand-emergency/80">
              {urgentAlert?.user || 'Sem alertas'} • {urgentAlert?.location} • <span className="text-white">{urgentAlert?.time}</span>
            </p>
          </div>
        </div>
        {urgentAlert && (
          <button onClick={() => navigate('/admin/atendimentos-chat', { state: { activeChatId: urgentAlert.id } })} className="mt-6 md:mt-0 bg-brand-emergency hover:bg-[#ff4444] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(229,62,62,0.4)] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(229,62,62,0.6)] relative z-10 ring-2 ring-transparent hover:ring-white/20">
            Atender agora →
          </button>
        )}
      </div>

      {/* KPI Cards Glass */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((kpi, i) => (
          <div key={i} className={`glass-panel p-8 rounded-[2rem] border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group ${
            kpi.alert ? 'border-brand-emergency/30 bg-brand-emergency/5 shadow-[0_0_15px_rgba(229,62,62,0.05)] hover:border-brand-emergency/50 hover:bg-brand-emergency/10' : 'border-white/5 hover:border-white/20 hover:bg-white/5'
          }`}>
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-xl transition-all ${
                kpi.alert ? 'bg-brand-emergency/20 group-hover:scale-110' : 'bg-white/5 border border-white/5 group-hover:scale-110 group-hover:bg-white/10'
              }`}>
                {kpi.icon}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${
                kpi.alert ? 'bg-brand-emergency/20 text-brand-emergency' : 'bg-white/5 text-text-muted border border-white/5'
              }`}>
                {kpi.trend}
              </span>
            </div>
            <h3 className="text-sm font-bold tracking-widest uppercase text-text-muted mb-2">{kpi.title}</h3>
            <p className="text-5xl font-black tracking-tighter text-white">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Atendimentos Recentes Modern Table */}
      <div className="glass-panel border-white/5 rounded-[2rem] overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-primary/5 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="p-8 border-b border-white/5 flex items-center justify-between relative z-10">
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-3">
             <MessageSquare size={20} className="text-brand-primary" /> Últimas atividades
          </h2>
          <button onClick={() => alert('Redirecionar para tela de logs gerais')} className="text-sm font-bold text-brand-primary hover:text-[#a69bff] flex items-center gap-1 transition-colors">
            Ver todos <ArrowUpRight size={16} />
          </button>
        </div>
        
        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left text-sm text-text-muted">
            <thead className="bg-[#11111B]/60 backdrop-blur-md border-b border-white/5">
               <tr>
                 <th className="px-8 py-5 text-[10px] font-extrabold text-text-muted uppercase tracking-widest">ID</th>
                 <th className="px-8 py-5 text-[10px] font-extrabold text-text-muted uppercase tracking-widest">Usuária</th>
                 <th className="px-8 py-5 text-[10px] font-extrabold text-text-muted uppercase tracking-widest">Localização</th>
                 <th className="px-8 py-5 text-[10px] font-extrabold text-text-muted uppercase tracking-widest">Tempo</th>
                 <th className="px-8 py-5 text-[10px] font-extrabold text-text-muted uppercase tracking-widest">Status / Fila</th>
                 <th className="px-8 py-5 text-[10px] font-extrabold text-text-muted uppercase tracking-widest text-right">Ação</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
               {alerts.map((al, idx) => (
                 <tr key={idx} className="hover:bg-white/5 transition-colors group cursor-pointer">
                    <td className="px-8 py-6 font-bold text-white whitespace-nowrap">{al.id}</td>
                    <td className="px-8 py-6">
                       <span className={`inline-flex items-center gap-2 font-semibold ${al.status==='ativo'&&al.risk==='alto' ? 'text-brand-emergency' : 'text-white'}`}>
                         {al.status==='ativo'&&al.risk==='alto' && <span className="w-2 h-2 rounded-full bg-brand-emergency animate-pulse"></span>}
                         {al.user}
                       </span>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap relative">
                      <span className="relative z-10">{al.location}</span>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">{al.time}</td>
                    <td className="px-8 py-6 whitespace-nowrap">
                       {al.status === 'ativo' ? (
                         <span className={`text-[10px] font-bold px-3 py-1.5 rounded border tracking-widest uppercase flex w-max gap-2 items-center ${al.risk==='alto'? 'bg-brand-emergency/10 text-brand-emergency border-brand-emergency/30' : 'bg-[#34D399]/10 text-[#34D399] border-[#34D399]/30'}`}>
                            {al.risk==='alto' && <AlertTriangle size={12}/>} NOVO
                         </span>
                       ) : (
                         <span className="text-[10px] font-bold px-3 py-1.5 rounded bg-white/5 text-text-muted border border-white/5 tracking-widest uppercase flex w-max gap-2 items-center">
                            <Check size={12}/> Concluído
                         </span>
                       )}
                    </td>
                    <td className="px-8 py-6 text-right">
                       <button onClick={() => navigate('/admin/atendimentos-chat', { state: { activeChatId: al.id } })} className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-lg font-bold text-xs transition-colors shadow-sm">
                         Ver
                       </button>
                    </td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}