import React, { useContext, useState } from 'react';
import { Plus, Search, X, Image as ImageIcon, Save } from 'lucide-react';
import { NiraContext } from '../../context/NiraContext';
import ContentCard from '../../components/admin/ContentCard';

export default function AdminConteudos() {
  const { articles, deleteArticle, toggleArticleStatus, addArticle, updateArticle } = useContext(NiraContext);
  const [activeTab, setActiveTab] = useState('TODOS');
  const [search, setSearch] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArt, setEditingArt] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Direitos',
    author: 'Equipe NIRA',
    readTime: '5 min',
    image: '',
    featured: false
  });

  const tabs = ['TODOS', 'DIREITOS', 'SAÚDE MENTAL', 'SEGURANÇA', 'FAMÍLIA', 'APOIO'];
  
  const filtered = articles
    .filter(a => activeTab === 'TODOS' || a.category.toUpperCase() === activeTab)
    .filter(a => a.title.toLowerCase().includes(search.toLowerCase()));

  const handleOpenModal = (art = null) => {
    if (art) {
      setEditingArt(art);
      setFormData({ ...art });
    } else {
      setEditingArt(null);
      setFormData({
        title: '',
        description: '',
        category: 'Direitos',
        author: 'Equipe NIRA',
        readTime: '5 min',
        image: '',
        featured: false
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingArt) {
      updateArticle(editingArt.id, formData);
    } else {
      addArticle({ ...formData, date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }) });
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if(window.confirm('Deseja realmente excluir este conteúdo?')) {
      deleteArticle(id);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      
      {/* ── FILTROS E BUSCA REFINADOS ── */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 bg-[#11111B]/40 p-4 rounded-[2rem] border border-white/5 backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-1.5">
          {tabs.map((tab, i) => (
            <button 
              key={i} 
              onClick={() => setActiveTab(tab)} 
              className={`px-4 py-2 rounded-xl text-[9px] font-black tracking-[0.2em] uppercase transition-all duration-300 ${activeTab === tab ? 'bg-brand-primary text-white shadow-glow' : 'text-text-muted hover:text-white hover:bg-white/5'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative group flex-1 lg:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-brand-primary transition-colors" size={14} />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por título..." 
              className="w-full bg-[#0A0A10] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-[11px] text-white focus:outline-none focus:border-brand-primary/50 transition-all"
            />
          </div>
          <button 
            onClick={() => handleOpenModal()} 
            className="bg-brand-primary hover:bg-[#7a6cf0] text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all flex items-center gap-2 hover:-translate-y-0.5"
          >
            <Plus size={16} /> Criar
          </button>
        </div>
      </div>

      {/* ── GRID DE CONTEÚDOS ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
         {filtered.map((art) => (
           <ContentCard 
             key={art.id} 
             art={art} 
             onToggle={toggleArticleStatus} 
             onDelete={handleDelete}
             onEdit={() => handleOpenModal(art)}
           />
         ))}
      </div>

      {/* ── MODAL CRUD ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           {/* Backdrop */}
           <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
           
           {/* Modal Content */}
           <div className="relative w-full max-w-2xl bg-[#11111B] border border-white/10 rounded-[2.5rem] shadow-3xl overflow-hidden animate-scale-in">
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                 <h2 className="text-xl font-black text-white px-2">
                    {editingArt ? 'Editar Matéria' : 'Nova Matéria'}
                 </h2>
                 <button onClick={() => setIsModalOpen(false)} className="p-2 text-text-muted hover:text-white transition-colors">
                    <X size={24} />
                 </button>
              </div>

              <form onSubmit={handleSave} className="p-10 space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-brand-primary uppercase tracking-widest ml-1">Título da Matéria</label>
                       <input 
                         required
                         type="text" 
                         value={formData.title}
                         onChange={e => setFormData({...formData, title: e.target.value})}
                         className="w-full bg-[#181825] border border-white/5 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-brand-primary/50"
                         placeholder="Ex: Guia de Segurança..."
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-brand-primary uppercase tracking-widest ml-1">Categoria</label>
                       <select 
                         value={formData.category}
                         onChange={e => setFormData({...formData, category: e.target.value})}
                         className="w-full bg-[#181825] border border-white/5 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-brand-primary/50 appearance-none"
                       >
                          {tabs.filter(t => t !== 'TODOS').map(t => (
                            <option key={t} value={t.charAt(0) + t.slice(1).toLowerCase()}>{t}</option>
                          ))}
                       </select>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-brand-primary uppercase tracking-widest ml-1">Descrição Curta</label>
                    <textarea 
                      required
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      rows={3}
                      className="w-full bg-[#181825] border border-white/5 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-brand-primary/50 resize-none"
                      placeholder="Um breve resumo para a listagem..."
                    />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-brand-primary uppercase tracking-widest ml-1">Autor</label>
                       <input 
                         type="text" 
                         value={formData.author}
                         onChange={e => setFormData({...formData, author: e.target.value})}
                         className="w-full bg-[#181825] border border-white/5 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-brand-primary/50"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-brand-primary uppercase tracking-widest ml-1">Tempo de Leitura</label>
                       <input 
                         type="text" 
                         value={formData.readTime}
                         onChange={e => setFormData({...formData, readTime: e.target.value})}
                         className="w-full bg-[#181825] border border-white/5 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-brand-primary/50"
                       />
                    </div>
                    <div className="flex items-end pb-2">
                       <label className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            className="hidden"
                            checked={formData.featured}
                            onChange={e => setFormData({...formData, featured: e.target.checked})}
                          />
                          <div className={`w-12 h-6 rounded-full p-1 transition-all ${formData.featured ? 'bg-brand-primary' : 'bg-white/10'}`}>
                             <div className={`w-4 h-4 bg-white rounded-full transition-all ${formData.featured ? 'translate-x-6' : 'translate-x-0'}`}></div>
                          </div>
                          <span className="text-[10px] font-black text-text-muted uppercase tracking-widest group-hover:text-white transition-colors">Destaque</span>
                       </label>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-brand-primary uppercase tracking-widest ml-1">URL da Imagem (Unsplash)</label>
                    <div className="relative">
                       <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                       <input 
                         type="url" 
                         value={formData.image}
                         onChange={e => setFormData({...formData, image: e.target.value})}
                         className="w-full bg-[#181825] border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm text-white focus:outline-none focus:border-brand-primary/50"
                         placeholder="https://images.unsplash.com/..."
                       />
                    </div>
                 </div>

                 <div className="pt-6 flex justify-end gap-4">
                    <button 
                      type="button" 
                      onClick={() => setIsModalOpen(false)}
                      className="px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-white transition-colors"
                    >
                       Cancelar
                    </button>
                    <button 
                      type="submit"
                      className="bg-brand-primary hover:bg-[#7a6cf0] text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2 transition-all hover:scale-105"
                    >
                       <Save size={16} /> {editingArt ? 'Salvar Alterações' : 'Publicar Agora'}
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}

    </div>
  );
}