import React, { useContext, useState } from 'react';
import { createPortal } from 'react-dom';
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
    content: '',
    category: 'Direitos',
    author: 'Equipe NIRA',
    readTime: '5 min',
    image: '',
    tags: '',
    featured: false
  });

  const [isDeleting, setIsDeleting] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const tabs = ['TODOS', 'DIREITOS', 'SAÚDE MENTAL', 'SEGURANÇA', 'FAMÍLIA', 'APOIO'];
  
  const filtered = articles
    .filter(a => activeTab === 'TODOS' || a.category.toUpperCase() === activeTab)
    .filter(a => a.title.toLowerCase().includes(search.toLowerCase()));

  const handleOpenModal = (art = null) => {
    if (art) {
      setEditingArt(art);
      setFormData({ 
        ...art,
        content: art.content || '',
        tags: art.tags ? art.tags.join(', ') : ''
      });
    } else {
      setEditingArt(null);
      setFormData({
        title: '',
        description: '',
        content: '',
        category: 'Direitos',
        author: 'Equipe NIRA',
        readTime: '5 min',
        image: '',
        tags: '',
        featured: false
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t !== '')
    };

    if (editingArt) {
      updateArticle(editingArt.id, finalData);
    } else {
      addArticle({ ...finalData, date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }) });
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (isDeleting) {
      deleteArticle(isDeleting);
      setIsDeleting(null);
    }
  };

  return (
    <div className="space-y-8">
      
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
             onDelete={() => setIsDeleting(art.id)}
             onEdit={() => handleOpenModal(art)}
           />
         ))}
      </div>

      {/* ── MODAL CRUD PORTAL ── */}
      {isModalOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
           
           <div className="relative w-full max-w-4xl bg-[#11111B] border border-white/10 rounded-[2.5rem] shadow-3xl overflow-hidden">
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                 <div className="px-2">
                    <h2 className="text-xl font-black text-white">
                       {editingArt ? 'Editar Matéria' : 'Criar Nova Matéria'}
                    </h2>
                    <p className="text-[10px] text-brand-primary font-bold uppercase tracking-widest mt-1">Gestão de Conhecimento NIRA</p>
                 </div>
                 <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setShowPreview(true)}
                      className="px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white border border-white/10 hover:bg-white/5 transition-all"
                    >
                      Ver Prévia
                    </button>
                    <button onClick={() => setIsModalOpen(false)} className="p-2 text-text-muted hover:text-white transition-colors bg-white/5 rounded-full">
                       <X size={20} />
                    </button>
                 </div>
              </div>

              <form onSubmit={handleSave} className="p-10 space-y-8 max-h-[75vh] overflow-y-auto sidebar-scroll">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-brand-primary uppercase tracking-widest ml-1">Título da Matéria</label>
                       <input 
                         required
                         type="text" 
                         value={formData.title}
                         onChange={e => setFormData({...formData, title: e.target.value})}
                         className="w-full bg-[#181825] border border-white/5 rounded-2xl p-5 text-sm text-white focus:outline-none focus:border-brand-primary/50 transition-all shadow-inner"
                         placeholder="Ex: Como se proteger digitalmente..."
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-brand-primary uppercase tracking-widest ml-1">Categoria</label>
                       <select 
                         value={formData.category}
                         onChange={e => setFormData({...formData, category: e.target.value})}
                         className="w-full bg-[#181825] border border-white/5 rounded-2xl p-5 text-sm text-white focus:outline-none focus:border-brand-primary/50 appearance-none cursor-pointer"
                       >
                          {tabs.filter(t => t !== 'TODOS').map(t => (
                            <option key={t} value={t.charAt(0) + t.slice(1).toLowerCase()}>{t}</option>
                          ))}
                       </select>
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-brand-primary uppercase tracking-widest ml-1">Descrição Curta (Resumo)</label>
                    <textarea 
                      required
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      rows={2}
                      className="w-full bg-[#181825] border border-white/5 rounded-2xl p-5 text-sm text-white focus:outline-none focus:border-brand-primary/50 resize-none leading-relaxed"
                      placeholder="Um breve resumo atrativo para a listagem..."
                    />
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-brand-primary uppercase tracking-widest ml-1">Conteúdo do Artigo (HTML/Texto)</label>
                    <textarea 
                      required
                      value={formData.content}
                      onChange={e => setFormData({...formData, content: e.target.value})}
                      rows={10}
                      className="w-full bg-[#181825] border border-white/5 rounded-2xl p-6 text-sm text-[#E0E0E6] focus:outline-none focus:border-brand-primary/50 resize-y leading-loose font-light"
                      placeholder="Escreva aqui o conteúdo completo do artigo..."
                    />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-brand-primary uppercase tracking-widest ml-1">URL da Imagem (Principal)</label>
                       <div className="relative">
                          <ImageIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                          <input 
                            type="url" 
                            value={formData.image}
                            onChange={e => setFormData({...formData, image: e.target.value})}
                            className="w-full bg-[#181825] border border-white/5 rounded-2xl pl-14 pr-5 py-5 text-sm text-white focus:outline-none focus:border-brand-primary/50"
                            placeholder="https://images.unsplash.com/..."
                          />
                       </div>
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-brand-primary uppercase tracking-widest ml-1">Tags (Separadas por vírgula)</label>
                       <input 
                         type="text" 
                         value={formData.tags}
                         onChange={e => setFormData({...formData, tags: e.target.value})}
                         className="w-full bg-[#181825] border border-white/5 rounded-2xl p-5 text-sm text-white focus:outline-none focus:border-brand-primary/50"
                         placeholder="Segurança, Direitos, Guia..."
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-brand-primary uppercase tracking-widest ml-1">Autor / Instituição</label>
                       <input 
                         type="text" 
                         value={formData.author}
                         onChange={e => setFormData({...formData, author: e.target.value})}
                         className="w-full bg-[#181825] border border-white/5 rounded-2xl p-5 text-sm text-white focus:outline-none focus:border-brand-primary/50"
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-brand-primary uppercase tracking-widest ml-1">Tempo de Leitura</label>
                       <input 
                         type="text" 
                         value={formData.readTime}
                         onChange={e => setFormData({...formData, readTime: e.target.value})}
                         className="w-full bg-[#181825] border border-white/5 rounded-2xl p-5 text-sm text-white focus:outline-none focus:border-brand-primary/50"
                       />
                    </div>
                    <div className="flex items-end pb-3">
                       <label className="flex items-center gap-4 cursor-pointer group bg-white/5 p-4 rounded-2xl border border-white/5 w-full">
                          <input 
                            type="checkbox" 
                            className="hidden"
                            checked={formData.featured}
                            onChange={e => setFormData({...formData, featured: e.target.checked})}
                          />
                          <div className={`w-12 h-6 rounded-full p-1 transition-all ${formData.featured ? 'bg-brand-primary' : 'bg-white/10'}`}>
                             <div className={`w-4 h-4 bg-white rounded-full transition-all ${formData.featured ? 'translate-x-6' : 'translate-x-0'}`}></div>
                          </div>
                          <span className="text-[10px] font-black text-text-muted uppercase tracking-widest group-hover:text-white transition-colors">Conteúdo em Destaque</span>
                       </label>
                    </div>
                 </div>

                 <div className="pt-10 flex justify-end gap-5">
                    <button 
                      type="button" 
                      onClick={() => setIsModalOpen(false)}
                      className="px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-white transition-colors"
                    >
                       Cancelar
                    </button>
                    <button 
                      type="submit"
                      className="bg-brand-primary hover:bg-[#7a6cf0] text-white px-12 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl flex items-center gap-3 transition-all hover:scale-105 active:scale-95"
                    >
                       <Save size={18} /> {editingArt ? 'Salvar Matéria' : 'Publicar Agora'}
                    </button>
                 </div>
              </form>
           </div>
        </div>,
        document.getElementById('modal-root')
      )}

      {/* ── MODAL CONFIRMAÇÃO DE EXCLUSÃO ── */}
      {isDeleting && createPortal(
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setIsDeleting(null)}></div>
           <div className="relative bg-[#11111B] border border-white/10 p-10 rounded-[2.5rem] shadow-3xl max-w-sm w-full text-center space-y-8">
              <div className="w-20 h-20 bg-brand-emergency/10 border border-brand-emergency/20 text-brand-emergency rounded-full flex items-center justify-center mx-auto mb-6">
                 <X size={40} />
              </div>
              <div className="space-y-3">
                 <h3 className="text-xl font-black text-white">Excluir Conteúdo?</h3>
                 <p className="text-sm text-text-muted leading-relaxed">Esta ação é permanente e removerá a matéria de todas as listagens do portal NIRA.</p>
              </div>
              <div className="flex flex-col gap-3">
                 <button onClick={handleDelete} className="w-full bg-brand-emergency hover:bg-brand-emergency-alt text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Sim, Excluir Matéria</button>
                 <button onClick={() => setIsDeleting(null)} className="w-full text-text-muted hover:text-white py-4 text-[10px] font-black uppercase tracking-widest transition-all">Manter Conteúdo</button>
              </div>
           </div>
        </div>,
        document.getElementById('modal-root')
      )}

      {/* ── MODAL PRÉVIA DO CARD ── */}
      {showPreview && createPortal(
        <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => setShowPreview(false)}></div>
           <div className="relative max-w-md w-full space-y-8">
              <div className="text-center">
                 <p className="text-brand-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4">Prévia do Card no Portal</p>
                 <div className="bg-[#11111B]/40 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <div className="relative h-56">
                       <img src={formData.image || 'https://via.placeholder.com/800x600?text=Sem+Imagem'} className="w-full h-full object-cover" alt="Preview" />
                       <div className="absolute inset-0 bg-gradient-to-t from-[#11111B] to-transparent" />
                       <span className="absolute top-6 left-6 px-4 py-1.5 bg-[#07070B]/80 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-brand-primary border border-brand-primary/20">
                          {formData.category}
                       </span>
                    </div>
                    <div className="p-8 text-left">
                       <h3 className="text-xl font-black text-white mb-4 line-clamp-2">{formData.title || 'Título da Matéria'}</h3>
                       <p className="text-sm text-text-muted leading-relaxed italic line-clamp-3 mb-8">{formData.description || 'Uma breve descrição do seu conteúdo...'}</p>
                       <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                          <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{formData.author}</span>
                          <span className="text-[10px] font-black text-white/20 uppercase">{formData.readTime}</span>
                       </div>
                    </div>
                 </div>
              </div>
              <button onClick={() => setShowPreview(false)} className="w-full bg-white/5 hover:bg-white/10 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Voltar para Edição</button>
           </div>
        </div>,
        document.getElementById('modal-root')
      )}

    </div>
  );
}