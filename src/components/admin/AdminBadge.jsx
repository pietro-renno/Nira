import React from 'react';

const AdminBadge = ({ children, status }) => {
  const styles = {
    ativo: 'bg-[#34D399]/10 text-[#34D399] border-[#34D399]/30',
    pendente: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
    urgente: 'bg-brand-emergency/10 text-brand-emergency border-brand-emergency/30',
    concluido: 'bg-white/5 text-text-muted border-white/5',
    default: 'bg-white/5 text-text-muted border-white/10'
  };

  const currentStyle = styles[status] || styles.default;

  return (
    <span className={`text-[10px] font-bold px-3 py-1.5 rounded border tracking-widest uppercase flex w-max gap-2 items-center ${currentStyle}`}>
      {status === 'urgente' && <span className="w-1.5 h-1.5 bg-brand-emergency rounded-full animate-pulse"></span>}
      {children}
    </span>
  );
};

export default AdminBadge;
