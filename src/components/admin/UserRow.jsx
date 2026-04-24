import React from 'react';
import { Trash2, ShieldCheck, UserX, Brain, HeartHandshake, Building2 } from 'lucide-react';

const UserRow = ({ user, onToggle, onDelete }) => {
  return (
    <tr className="hover:bg-white/[0.02] transition-colors group">
      <td className="px-6 py-4">
        <p className="font-bold text-white text-sm whitespace-nowrap group-hover:text-brand-primary transition-colors">{user.name}</p>
      </td>
      <td className="px-4 py-4 font-mono text-[10px] font-bold text-text-muted opacity-60">@{user.login}</td>
      <td className="px-4 py-4">
        {user.profile === 'ADM' && <span className="px-3 py-1 rounded-lg bg-brand-primary/10 text-brand-primary border border-brand-primary/20 text-[9px] font-black uppercase tracking-widest">ADM</span>}
        {user.profile === 'ONG' && <span className="px-3 py-1 rounded-lg bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/20 text-[9px] font-black uppercase tracking-widest">ONG</span>}
        {user.profile === 'Prof.' && <span className="px-3 py-1 rounded-lg bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-[9px] font-black uppercase tracking-widest">PROF.</span>}
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        {user.specialty !== '-' ? (
          <span className="flex items-center gap-1.5 font-bold text-[11px] text-white/80">
            <span className="opacity-60 text-brand-primary flex items-center justify-center">{user.specialty.includes('Psicólogo') ? <Brain size={14} /> : <HeartHandshake size={14} />}</span> {user.specialty}
          </span>
        ) : <span className="opacity-20 text-xs">-</span>}
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        {user.link !== '-' ? (
          <span className="flex items-center gap-2 text-text-muted font-bold text-[10px]">
            <Building2 size={12} className="text-brand-primary" /> {user.link}
          </span>
        ) : <span className="opacity-20 text-xs">-</span>}
      </td>
      <td className="px-4 py-4">
        <span className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest text-text-muted">
          {user.access === 'Tudo' ? 'TUDO' : 'CHAT'}
        </span>
      </td>
      <td className="px-4 py-4">
        <div className={`flex items-center gap-2 text-[9px] font-black tracking-widest uppercase ${user.status === 'Inativo' ? 'text-text-muted opacity-40' : 'text-[#34D399]'}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Inativo' ? 'bg-text-muted' : 'bg-[#34D399] shadow-[0_0_8px_rgba(52,211,153,0.4)] animate-pulse'}`}></div> 
          {user.status || 'Ativo'}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-2">
          <button 
            onClick={() => onToggle(user.id)} 
            className={`flex items-center justify-center p-2 rounded-xl border transition-all ${user.status === 'Inativo' ? 'bg-brand-primary border-brand-primary text-white' : 'bg-white/5 border-white/10 text-text-muted hover:text-white hover:bg-white/10'}`}
            title={user.status === 'Inativo' ? 'Ativar' : 'Desativar'}
          >
            {user.status === 'Inativo' ? <ShieldCheck size={16}/> : <UserX size={16}/>}
          </button>
          <button 
            onClick={() => onDelete(user.id)} 
            className="p-2 bg-white/5 hover:bg-brand-emergency hover:border-brand-emergency border border-white/10 text-text-muted hover:text-white rounded-xl transition-all" 
            title="Excluir"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
