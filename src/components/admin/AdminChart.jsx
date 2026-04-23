import React from 'react';

const AdminChart = ({ title, data, type = 'bar' }) => {
  const max = Math.max(...data.map(d => d.value));

  return (
    <div className="glass-panel border-white/5 rounded-[2.5rem] p-8 space-y-6 hover:shadow-2xl transition-all duration-500">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-black text-text-muted uppercase tracking-[0.2em]">{title}</h4>
        <div className="flex gap-2">
           <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
           <div className="w-2 h-2 rounded-full bg-white/10"></div>
        </div>
      </div>

      <div className="h-48 flex items-end justify-between gap-2 px-2">
        {data.map((item, i) => (
          <div key={i} className="flex-1 flex flex-col items-center group relative h-full justify-end">
            {/* Tooltip */}
            <div className="absolute -top-8 bg-brand-primary text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {item.value}
            </div>
            
            {/* Bar */}
            <div 
              className="w-full bg-gradient-to-t from-brand-primary/20 to-brand-primary rounded-t-xl transition-all duration-700 ease-out group-hover:to-[#a69bff] cursor-pointer"
              style={{ height: `${(item.value / max) * 100}%` }}
            ></div>
            
            <span className="text-[9px] font-bold text-text-muted mt-3 uppercase tracking-tighter">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminChart;
