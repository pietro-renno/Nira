import { Filter, Search, ShieldAlert, BadgeInfo } from 'lucide-react';
import { mockAlerts } from '../../data/mockData';

export default function Alertas() {
  const alertsFull = [
    ...mockAlerts,
    { id: '0038', user: 'Usuária #0038', location: 'Rio de Janeiro, RJ', time: 'Ontem', status: 'ativo', risk: 'alto', logs: ['S.O.S. ativado - 18:30'] },
    { id: '0037', user: 'Usuária anônima', location: 'Curitiba, PR', time: 'Há 2 dias', status: 'ativo', risk: 'baixo', logs: ['Início de triagem - 14:15'] }
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      
      {/* Top Actions - Glass */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#11111B]/60 glass-panel border border-white/5 p-4 rounded-2xl shadow-xl">
        <div className="flex gap-2">
           <button onClick={() => alert('Filtro: Todos os chamados')} className="bg-brand-primary text-white border border-brand-primary px-5 py-2.5 rounded-xl text-xs font-bold shadow-[0_0_15px_rgba(139,126,250,0.3)] transition-all flex items-center gap-2">
              Ver Todos
           </button>
           <button onClick={() => alert('Filtro: S.O.S isolado')} className="bg-white/5 hover:bg-white/10 text-text-muted hover:text-white border border-white/5 px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2">
              Apenas S.O.S. (Alto Risco)
           </button>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <input 
              type="text" 
              placeholder="Pesquisar ID..." 
              className="w-full bg-[#181825]/80 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-brand-primary/50 transition-all shadow-inner"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
          </div>
          <button onClick={() => alert('Abrir janela de filtros avançados')} className="p-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-text-muted hover:text-white rounded-xl transition-all">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="glass-panel border-white/5 rounded-[2rem] overflow-hidden shadow-2xl relative">
        <div className="overflow-x-auto min-h-[500px]">
          <table className="w-full text-left text-sm text-text-muted">
            <thead className="bg-[#11111B] border-b border-white/5">
              <tr>
                <th className="px-8 py-5 text-[10px] font-extrabold tracking-widest uppercase text-text-muted">ID / Risco</th>
                <th className="px-6 py-5 text-[10px] font-extrabold tracking-widest uppercase text-text-muted">Status do Caso</th>
                <th className="px-6 py-5 text-[10px] font-extrabold tracking-widest uppercase text-text-muted">Usuária</th>
                <th className="px-6 py-5 text-[10px] font-extrabold tracking-widest uppercase text-text-muted">Localização Aprox.</th>
                <th className="px-6 py-5 text-[10px] font-extrabold tracking-widest uppercase text-text-muted">Último Log</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {alertsFull.map((item, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors group cursor-pointer">
                  <td className="px-8 py-5">
                     <div className="flex items-center gap-4">
                       <div className="font-bold text-white tracking-widest">{item.id}</div>
                       {item.risk === 'alto' && <span className="bg-brand-emergency/10 text-brand-emergency px-2 py-1 rounded text-[10px] font-bold border border-brand-emergency/30 flex items-center gap-1 uppercase tracking-wider"><ShieldAlert size={10}/> Alto r.</span>}
                       {item.risk === 'médio' && <span className="bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded text-[10px] font-bold border border-yellow-500/30 flex items-center gap-1 uppercase tracking-wider"><BadgeInfo size={10}/> Médio</span>}
                       {item.risk === 'baixo' && <span className="px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 uppercase tracking-wider text-[#34D399]"><span className="w-1.5 h-1.5 bg-[#34D399] rounded-full"></span> Baixo</span>}
                     </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    {item.status === 'ativo' ? (
                      <span className="flex items-center gap-2 text-brand-primary text-[10px] font-extrabold uppercase tracking-widest">
                        <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span> Ativo
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-text-muted text-[10px] font-extrabold uppercase tracking-widest">
                        <span className="w-2 h-2 rounded-full bg-[#3A3A5A]"></span> Concluído
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-5 font-bold text-white whitespace-nowrap">
                     {item.user}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    {item.location}
                  </td>
                  <td className="px-6 py-5">
                    <div className="bg-[#11111B]/80 px-4 py-2.5 rounded-xl border border-white/5 font-mono text-[11px] text-text-muted truncate group-hover:border-brand-primary/30 group-hover:text-white transition-colors">
                      {`> `}{item.logs[0]}
                    </div>
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