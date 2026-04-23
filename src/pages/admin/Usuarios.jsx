import { useContext, useState } from 'react';
import { NiraContext } from '../../context/NiraContext';
import UserRow from '../../components/admin/UserRow';

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

  const handleDelete = (id) => {
    if(window.confirm('Excluir este usuário permanentemente?')) deleteUser(id);
  };

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
                  <th className="px-6 py-4 text-[9px] font-black tracking-widest uppercase text-text-muted">Nome</th>
                  <th className="px-4 py-4 text-[9px] font-black tracking-widest uppercase text-text-muted">Login</th>
                  <th className="px-4 py-4 text-[9px] font-black tracking-widest uppercase text-text-muted">Perfil</th>
                  <th className="px-4 py-4 text-[9px] font-black tracking-widest uppercase text-text-muted">Especialidade</th>
                  <th className="px-4 py-4 text-[9px] font-black tracking-widest uppercase text-text-muted">Vínculo</th>
                  <th className="px-4 py-4 text-[9px] font-black tracking-widest uppercase text-text-muted">Acessa</th>
                  <th className="px-4 py-4 text-[9px] font-black tracking-widest uppercase text-text-muted">Status</th>
                  <th className="px-6 py-4 text-[9px] font-black tracking-widest uppercase text-text-muted text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredUsers.map((user, i) => (
                  <UserRow 
                    key={i} 
                    user={user} 
                    onToggle={toggleUserStatus} 
                    onDelete={handleDelete} 
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}