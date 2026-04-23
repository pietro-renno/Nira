import React from 'react';

const StatCard = ({ title, value, icon, trend, alert }) => {
  return (
    <div className={`glass-panel p-8 rounded-[2rem] border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group ${
      alert ? 'border-brand-emergency/30 bg-brand-emergency/5 shadow-[0_0_15px_rgba(229,62,62,0.05)] hover:border-brand-emergency/50 hover:bg-brand-emergency/10' : 'border-white/5 hover:border-white/20 hover:bg-white/5'
    }`}>
      <div className="flex justify-between items-start mb-6">
        <div className={`p-4 rounded-xl transition-all ${
          alert ? 'bg-brand-emergency/20 group-hover:scale-110' : 'bg-white/5 border border-white/5 group-hover:scale-110 group-hover:bg-white/10'
        }`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${
            alert ? 'bg-brand-emergency/20 text-brand-emergency' : 'bg-white/5 text-text-muted border border-white/5'
          }`}>
            {trend}
          </span>
        )}
      </div>
      <h3 className="text-sm font-bold tracking-widest uppercase text-text-muted mb-2">{title}</h3>
      <p className="text-5xl font-black tracking-tighter text-white">{value}</p>
    </div>
  );
};

export default StatCard;
