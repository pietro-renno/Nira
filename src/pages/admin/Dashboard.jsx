import React, { useContext } from 'react';
import { 
  Users, 
  AlertTriangle, 
  MessageSquare, 
  ArrowUpRight, 
  Check, 
  ArrowUpRight as ArrowIcon 
} from 'lucide-react';
import { NiraContext } from '../../context/NiraContext';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../components/admin/StatCard';
import AdminChart from '../../components/admin/AdminChart';

export default function Dashboard() {
  const { alerts, chats } = useContext(NiraContext);
  const navigate = useNavigate();
  
  const activeAlertsCount = alerts.filter(a => a.status === 'ativo').length;
  const todayChatsCount = chats.length;
  const activeChatsCount = chats.filter(c => c.status === 'ativo').length;

  const chartData = [
    { label: 'Seg', value: 12 },
    { label: 'Ter', value: 18 },
    { label: 'Qua', value: 15 },
    { label: 'Qui', value: 25 },
    { label: 'Sex', value: 42 },
    { label: 'Sab', value: 30 },
    { label: 'Dom', value: 20 },
  ];

  return (
    <div className="space-y-10 animate-fade-in-up pb-20">
      
      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Alertas Ativos" 
          value={activeAlertsCount.toString()} 
          icon={<AlertTriangle size={24} className="text-brand-emergency" />} 
          trend="Hoje" 
          alert={activeAlertsCount > 0} 
        />
        <StatCard 
          title="Atendimentos Hoje" 
          value={todayChatsCount.toString()} 
          icon={<MessageSquare size={24} className="text-brand-primary" />} 
          trend="Hoje" 
        />
        <StatCard 
          title="Usuárias no Chat" 
          value={activeChatsCount.toString()} 
          icon={<Users size={24} className="text-[#34D399]" />} 
          trend="Ao vivo" 
        />
      </div>

      {/* ── Visão Analítica (Gráficos) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AdminChart title="Volume de Atendimentos (Semanal)" data={chartData} />
        
        <div className="glass-panel border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between overflow-hidden relative">
           <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-primary/5 rounded-full blur-[80px]"></div>
           
           <h4 className="text-xs font-black text-text-muted uppercase tracking-[0.2em] mb-6 relative z-10">Eficiência por Categoria</h4>
           <div className="space-y-6 relative z-10">
              {[
                { label: 'Apoio Psicológico', value: 85, color: 'bg-brand-primary' },
                { label: 'Assistência Social', value: 62, color: 'bg-[#34D399]' },
                { label: 'Ações de Polícia', value: 25, color: 'bg-brand-emergency' }
              ].map((item, idx) => (
                <div key={idx} className="space-y-2">
                   <div className="flex justify-between text-[11px] font-bold uppercase">
                      <span className="text-white">{item.label}</span>
                      <span className="text-text-muted">{item.value}%</span>
                   </div>
                   <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`} style={{ width: `${item.value}%` }}></div>
                   </div>
                </div>
              ))}
           </div>
           
           <div 
             onClick={() => navigate('/admin/relatorios')}
             className="mt-8 p-6 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-all relative z-10"
           >
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">Relatórios Completos</span>
                <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Métricas de impacto social</span>
              </div>
              <ArrowUpRight size={20} className="text-brand-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
           </div>
        </div>
      </div>

      {/* ── Atendimentos Recentes ── */}
      <div className="glass-panel border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
        <div className="p-8 border-b border-white/5 flex items-center justify-between relative z-10">
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-3">
             <MessageSquare size={22} className="text-brand-primary" /> Atividades Recentes
          </h2>
          <button onClick={() => navigate('/admin/atendimentos-chat')} className="text-xs font-black uppercase tracking-widest text-brand-primary hover:text-white transition-colors">
            Ver central
          </button>
        </div>
        
        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left text-sm text-text-muted">
            <thead className="bg-[#11111B]/60 backdrop-blur-md border-b border-white/5">
               <tr>
                 <th className="px-8 py-5 text-[10px] font-extrabold text-text-muted uppercase tracking-widest">ID</th>
                 <th className="px-8 py-5 text-[10px] font-extrabold text-text-muted uppercase tracking-widest">Usuária</th>
                 <th className="px-8 py-5 text-[10px] font-extrabold text-text-muted uppercase tracking-widest">Localização</th>
                 <th className="px-8 py-5 text-[10px] font-extrabold text-text-muted uppercase tracking-widest">Status / Fila</th>
                 <th className="px-8 py-5 text-[10px] font-extrabold text-text-muted uppercase tracking-widest text-right">Ação</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
               {alerts.slice(0, 5).map((al, idx) => (
                 <tr key={idx} className="hover:bg-white/5 transition-colors group cursor-pointer">
                    <td className="px-8 py-6 font-bold text-white whitespace-nowrap">{al.id}</td>
                    <td className="px-8 py-6 font-semibold text-white">{al.user}</td>
                    <td className="px-8 py-6 whitespace-nowrap">{al.location}</td>
                    <td className="px-8 py-6 whitespace-nowrap">
                       {al.status === 'ativo' ? (
                          <span className={`text-[10px] font-black px-3 py-1.5 rounded border tracking-widest uppercase flex w-max gap-2 items-center ${al.risk==='alto'? 'bg-brand-emergency/10 text-brand-emergency border-brand-emergency/30' : 'bg-brand-primary/10 text-brand-primary border-brand-primary/30'}`}>
                             {al.risk==='alto' && <AlertTriangle size={12}/>} {al.risk} Risco
                          </span>
                       ) : (
                          <span className="text-[10px] font-bold px-3 py-1.5 rounded bg-white/5 text-text-muted border border-white/5 tracking-widest uppercase flex w-max gap-2 items-center">
                             <Check size={12}/> Concluído
                          </span>
                       )}
                    </td>
                    <td className="px-8 py-6 text-right">
                       <button onClick={() => navigate('/admin/atendimentos-chat')} className="p-2.5 bg-white/5 hover:bg-brand-primary rounded-xl text-white transition-all">
                         <ArrowIcon size={18} />
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