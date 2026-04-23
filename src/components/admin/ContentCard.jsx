import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const ContentCard = ({ art, onToggle, onDelete, onEdit }) => {
  return (
    <div className="bg-[#11111B]/40 backdrop-blur-sm border border-white/5 rounded-[2.5rem] overflow-hidden hover:bg-white/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-3xl hover:border-brand-primary/30 group flex flex-col h-full">
      
      {/* Imagem de Capa */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={art.image || "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800"} 
          alt={art.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#11111B] to-transparent"></div>
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="text-[9px] font-black tracking-[0.2em] text-brand-primary bg-[#0A0A10]/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-brand-primary/20 uppercase">
            {art.category}
          </span>
          {art.featured && (
            <span className="text-[9px] font-black tracking-[0.2em] text-yellow-500 bg-[#0A0A10]/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-yellow-500/20 uppercase">
              Destaque
            </span>
          )}
        </div>
        
        {/* Quick Actions (Floating) */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
          <button 
            onClick={() => onEdit(art)} 
            className="p-2.5 bg-[#0A0A10]/80 backdrop-blur-md hover:bg-brand-primary rounded-xl text-white transition-all shadow-xl"
            title="Editar Artigo"
          >
            <Edit2 size={14} />
          </button>
          <button 
            onClick={() => onDelete(art.id)} 
            className="p-2.5 bg-[#0A0A10]/80 backdrop-blur-md hover:bg-brand-emergency rounded-xl text-white transition-all shadow-xl"
            title="Excluir"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-8 flex flex-col flex-1">
        <h3 className="font-black text-lg text-white mb-3 group-hover:text-brand-primary transition-colors leading-tight line-clamp-2">{art.title}</h3>
        <p className="text-sm font-medium text-text-muted/80 line-clamp-2 leading-relaxed flex-1 italic">{art.description}</p>
        
        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-primary to-purple-600 flex items-center justify-center font-black text-white text-xs shadow-lg">
              {art.author.charAt(0)}
            </div>
            <div className="flex flex-col">
              <p className="text-xs font-black text-white/90 tracking-wide">{art.author}</p>
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{art.date} · {art.readTime}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
