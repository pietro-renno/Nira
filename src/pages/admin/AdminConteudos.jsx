import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { useContext, useState } from 'react';
import { NiraContext } from '../../context/NiraContext';

export default function AdminConteudos() {
  const { articles, deleteArticle, toggleArticleStatus } = useContext(NiraContext);
  const [activeTab, setActiveTab] = useState('TODOS');
  const [search, setSearch] = useState('');

  const tabs = ['TODOS', 'DIREITOS', 'SAÚDE MENTAL', 'SEGURANÇA', 'FAMÍLIA'];
  
  const filtered = articles
    .filter(a => activeTab === 'TODOS' || a.category.toUpperCase() === activeTab)
    .filter(a => a.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8 animate-fade-in-up">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3 bg-[#11111B]/60 glass-panel border border-white/5 p-2 rounded-2xl">
          {tabs.map((tab, i) => (
            <button key={i} onClick={() => setActiveTab(tab)} className={`px-5 py-2.5 rounded-xl text-[11px] font-extrabold tracking-widest uppercase transition-all duration-300 ${activeTab === tab ? 'bg-white/10 text-white shadow-sm' : 'text-text-muted hover:text-white'}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar conteúdos..." 
              className="w-full bg-[#181825]/80 glass-panel border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-brand-primary/50 transition-all shadow-inner"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
          </div>
          <button onClick={() => alert('Abrir modal de Novo Conteúdo')} className="bg-brand-primary hover:bg-[#7a6cf0] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(139,126,250,0.3)] transition-all flex items-center gap-2 hover:-translate-y-0.5">
            <Plus size={18} /> Novo
          </button>
        </div>
      </div>

      {/* Grid de Conteúdos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {filtered.map((art, i) => (
           <div key={i} className="glass-card border-white/5 rounded-[2rem] p-6 hover:bg-white/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:border-brand-primary/30 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                 <span className="text-[10px] font-extrabold tracking-widest text-brand-primary bg-brand-primary/10 px-3 py-1.5 rounded-full border border-brand-primary/20 uppercase">
                    {art.category}
                 </span>
                 <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => toggleArticleStatus(art.id)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-text-muted hover:text-white transition-colors" title="Rascunho / Publicar">
                      <Edit2 size={14} />
                    </button>
                    <button 
                      onClick={() => {
                        if(window.confirm('Tem certeza que deseja excluir esse artigo?')) {
                          deleteArticle(art.id);
                        }
                      }} 
                      className="p-2 bg-white/5 hover:bg-brand-emergency/20 rounded-lg text-text-muted hover:text-brand-emergency transition-colors" title="Excluir">
                      <Trash2 size={14} />
                    </button>
                 </div>
              </div>

              <h3 className="font-bold text-lg text-white mb-3 group-hover:text-brand-primary transition-colors leading-snug">{art.title}</h3>
              <p className="text-sm font-light text-text-muted line-clamp-2 leading-relaxed flex-1">{art.description}</p>
              
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white text-xs">
                      {art.author.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                       <p className="text-xs font-bold text-white tracking-wide">{art.author}</p>
                       <p className="text-[10px] font-medium text-text-muted uppercase tracking-wider">{art.date}</p>
                    </div>
                 </div>
                 {art.featured && <span className="text-[10px] font-extrabold text-yellow-500 bg-yellow-500/10 px-2.5 py-1 rounded-md border border-yellow-500/30 uppercase tracking-widest">Destaque</span>}
              </div>
           </div>
         ))}
      </div>

    </div>
  );
}