import { Trash2 } from 'lucide-react';
import { useContext, useState } from 'react';
import { NiraContext } from '../../context/NiraContext';

export default function Usuarios() {
  const { users, toggleUserStatus, deleteUser } = useContext(NiraContext);
  const [activeTab, setActiveTab] = useState('TODOS');
  
  const tabs = ['TODOS', 'ADM', 'ONGS', 'PSICOLÓGICAS'];
  
  const filteredUsers = users.filter(user => {
    if (activeTab === 'TODOS') return true;
    if (activeTab === 'ADM' && user.profile === 'ADM') return true;
    if (activeTab === 'ONGS' && user.profile === 'ONG') return true;
    if (activeTab === 'PSICOLÓGICAS' && user.profile === 'Prof.') return true;
    return false;
  });

  return (
    <div className="space-y-6 animate-fade-in-up">
      
      {/* Tabs Menu */}
      <div className="flex flex-wrap gap-3 pb-6">
        {tabs.map((tab, i) => (
          <button 
            key={i} 
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 test rounded-2xl text-[11px] font-extrabold tracking-widest uppercase transition-all duration-300 shadow-sm ${
              activeTab === tab 
              ? 'bg-gradient-to-r from-brand-primary to-[#7a6cf0] border border-brand-primary text-white shadow-[0_5px_20px_rgba(139,126,250,0.3)] hover:-translate-y-1' 
              : 'glass-panel border border-white/5 text-text-muted hover:text-white hover:border-white/20 hover:bg-white/5 hover:-translate-y-1'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Table Container Glass */}
      <div className="glass-panel border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
        <div className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="overflow-x-auto min-h-[500px] relative z-10 p-4">
          <div className="bg-[#11111B]/60 rounded-[2rem] overflow-hidden border border-white/5 backdrop-blur-xl">
            <table className="w-full text-left text-sm text-text-muted">
              <thead className="border-b border-white/5">
                <tr>
                  <th className="px-8 py-6 text-[10px] font-extrabold tracking-widest uppercase text-text-muted">Nome</th>
                  <th className="px-6 py-6 text-[10px] font-extrabold tracking-widest uppercase text-text-muted">Login</th>
                  <th className="px-6 py-6 text-[10px] font-extrabold tracking-widest uppercase text-text-muted">Perfil</th>
                  <th className="px-6 py-6 text-[10px] font-extrabold tracking-widest uppercase text-text-muted">Especialidade</th>
                  <th className="px-6 py-6 text-[10px] font-extrabold tracking-widest uppercase text-text-muted">Vínculo</th>
                  <th className="px-6 py-6 text-[10px] font-extrabold tracking-widest uppercase text-text-muted">Acessa</th>
                  <th className="px-6 py-6 text-[10px] font-extrabold tracking-widest uppercase text-text-muted">Status</th>
                  <th className="px-8 py-6 text-[10px] font-extrabold tracking-widest uppercase text-text-muted text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredUsers.map((user, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-5 font-bold text-white whitespace-nowrap group-hover:text-brand-primary transition-colors">{user.name}</td>
                    <td className="px-6 py-5 font-mono text-[11px] font-medium">{user.login}</td>
                    <td className="px-6 py-5">
                       {user.profile === 'ADM' && <span className="px-3 py-1 rounded-md bg-brand-primary/10 text-brand-primary border border-brand-primary/20 text-[10px] font-extrabold uppercase tracking-widest shadow-sm shadow-brand-primary/10">ADM</span>}
                       {user.profile === 'ONG' && <span className="px-3 py-1 rounded-md bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/20 text-[10px] font-extrabold uppercase tracking-widest">ONG</span>}
                       {user.profile === 'Prof.' && <span className="px-3 py-1 rounded-md bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-[10px] font-extrabold uppercase tracking-widest">Prof.</span>}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      {user.specialty !== '-' ? (
                        <span className="flex items-center gap-2 font-medium">
                          {user.specialty.includes('Psicólogo') ? '🧠' : '🤝'} {user.specialty}
                        </span>
                      ) : <span className="opacity-30">-</span>}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-xs">
                      {user.link !== '-' ? (
                        <span className="flex items-center gap-2 text-white/80 font-medium">
                          <span className="opacity-50">🏢</span> {user.link}
                        </span>
                      ) : <span className="opacity-30">-</span>}
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-widest flex items-center w-max gap-1.5">
                        {user.access === 'Tudo' ? 'Tudo' : '💬 Chat'}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                       <span className="flex items-center gap-2 text-[#34D399] text-[10px] font-extrabold tracking-widest uppercase">
                         <span className="w-2 h-2 rounded-full bg-[#34D399] shadow-[0_0_10px_rgba(52,211,153,0.5)]"></span> Ativo
                       </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => toggleUserStatus(user.id)} className={`px-4 py-2 border rounded-lg text-[10px] font-extrabold uppercase tracking-widest transition-colors ${user.status === 'Ativo' ? 'bg-white/5 hover:bg-white/10 border-white/5 text-white' : 'bg-[#34D399]/10 border-[#34D399]/30 text-[#34D399] hover:bg-[#34D399]/20'}`}>
                          {user.status === 'Ativo' ? 'Desativar' : 'Ativar'}
                        </button>
                        <button 
                          onClick={() => {
                            if(window.confirm('Excluir este usuário permanentemente?')) deleteUser(user.id);
                          }} 
                          className="p-2 bg-white/5 hover:bg-brand-emergency hover:border-brand-emergency border border-white/5 text-text-muted hover:text-white rounded-lg transition-all shadow-sm" title="Excluir">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}