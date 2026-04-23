import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { NiraContext } from '../context/NiraContext';
import { Search, Clock, ArrowRight, X, Heart, Shield } from 'lucide-react';

const css = `
.blog-hero {
  padding: 120px 0 80px;
  background: radial-gradient(circle at 50% -20%, rgba(139,126,250,0.15), transparent), var(--bg-deep);
}
.blog-card {
  background: rgba(21, 21, 33, 0.6);
  border: 1px solid rgba(139, 126, 250, 0.05);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.blog-card:hover {
  transform: translateY(-10px);
  border-color: rgba(139, 126, 250, 0.3);
  box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.5);
}
.blog-img-hover { transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
.blog-card:hover .blog-img-hover { transform: scale(1.1); }

.blog-modal-backdrop {
  background: rgba(7, 7, 11, 0.9);
  backdrop-filter: blur(12px);
  animation: fadeIn 0.3s ease;
}
.blog-modal { animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1); }

@keyframes slideUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

export default function Conteudos() {
  const { articles } = useContext(NiraContext);
  const [catAtiva, setCatAtiva] = useState('Todos');
  const [busca, setBusca] = useState('');
  const [artigoAtivo, setArtigoAtivo] = useState(null);

  const CATS = ['Todos', 'Direitos', 'Saúde Mental', 'Segurança', 'Apoio', 'Família'];

  const filtrados = articles.filter(art => {
    const matchCat = catAtiva === 'Todos' || art.category === catAtiva;
    const matchBusca = !busca || art.title.toLowerCase().includes(busca.toLowerCase()) || art.description.toLowerCase().includes(busca.toLowerCase());
    return matchCat && matchBusca;
  });

  const destaque = articles.find(a => a.featured) || articles[0];

  return (
    <div className="min-h-screen bg-[#07070B] text-white">
      <style>{css}</style>
      
      {/* ── HERO ── */}
      <section className="blog-hero">
        <div className="container max-w-7xl mx-auto px-6 lg:px-8">
           <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
              <div className="max-w-2xl">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 rounded-full mb-6">
                    <Shield size={12} className="text-brand-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">Conexão Segura Ativa</span>
                 </div>
                 <h1 className="text-5xl lg:text-6xl font-black mb-6 leading-[1.1]">
                    Informação que <span className="text-brand-primary">Salva Vidas.</span>
                 </h1>
                 <p className="text-lg text-text-muted font-medium leading-relaxed max-w-lg">
                    Guias técnicos, apoio psicológico e orientações jurídicas produzidas por especialistas da rede NIRA.
                 </p>
              </div>
              
              <div className="relative w-full lg:w-[400px]">
                 <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                 <input 
                   type="text" 
                   value={busca}
                   onChange={e => setBusca(e.target.value)}
                   placeholder="Pesquisar por tema ou palavra-chave..."
                   className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-sm focus:outline-none focus:border-brand-primary/50 transition-all font-medium text-white"
                 />
              </div>
           </div>

           {/* Filtros */}
           <div className="flex flex-wrap gap-2 pb-12">
              {CATS.map(c => (
                <button 
                  key={c}
                  onClick={() => setCatAtiva(c)}
                  className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${catAtiva === c ? 'bg-brand-primary text-white shadow-lg' : 'bg-white/5 text-text-muted hover:text-white'}`}
                >
                  {c}
                </button>
              ))}
           </div>
        </div>
      </section>

      {/* ── CONTEÚDO EM DESTAQUE ── */}
      {destaque && !busca && catAtiva === 'Todos' && (
        <section className="pb-16">
          <div className="container max-w-7xl mx-auto px-6 lg:px-8">
             <div 
               onClick={() => setArtigoAtivo(destaque)}
               className="relative h-[500px] rounded-[3rem] overflow-hidden cursor-pointer group shadow-3xl border border-white/5"
             >
                <img 
                  src={destaque.image} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-60" 
                  alt="Destaque"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07070B] via-[#07070B]/40 to-transparent" />
                
                <div className="absolute bottom-12 left-12 right-12 space-y-4">
                   <div className="flex items-center gap-3">
                      <span className="px-4 py-1.5 bg-brand-primary rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                         📌 Matéria em Destaque
                      </span>
                      <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                         {destaque.category} · {destaque.readTime}
                      </span>
                   </div>
                   <h2 className="text-4xl lg:text-6xl font-black text-white max-w-3xl leading-tight group-hover:text-brand-primary transition-colors">
                      {destaque.title}
                   </h2>
                   <p className="text-lg text-text-muted max-w-2xl font-medium line-clamp-2 italic opacity-80">
                      {destaque.description}
                   </p>
                </div>
             </div>
          </div>
        </section>
      )}

      {/* ── LISTAGEM DE CONTEÚDOS ── */}
      <section className="pb-32">
        <div className="container max-w-7xl mx-auto px-6 lg:px-8">
           <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-6">
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white/40">
                 Explore a Biblioteca {busca && `· Resultados para "${busca}"`}
              </h3>
              <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">
                 {filtrados.length} Artigos Encontrados
              </span>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtrados.map(art => (
                <div 
                  key={art.id}
                  onClick={() => setArtigoAtivo(art)}
                  className="blog-card group rounded-[2.5rem] overflow-hidden flex flex-col cursor-pointer"
                >
                  <div className="relative h-64 overflow-hidden">
                     <img 
                       src={art.image || "https://images.unsplash.com/photo-1576091160550-217359971f8b?auto=format&fit=crop&q=80&w=800"} 
                       className="blog-img-hover w-full h-full object-cover opacity-70 group-hover:opacity-100" 
                       alt={art.title}
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#151521] via-transparent to-transparent"></div>
                     <span className="absolute top-6 left-6 px-4 py-1.5 bg-[#07070B]/80 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-brand-primary border border-brand-primary/20">
                        {art.category}
                     </span>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-1">
                     <h3 className="text-xl font-black mb-4 group-hover:text-brand-primary transition-colors leading-tight">
                        {art.title}
                     </h3>
                     <p className="text-sm text-text-muted leading-relaxed font-medium line-clamp-3 mb-8">
                        {art.description}
                     </p>
                     
                     <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary font-black text-[10px]">
                              {art.author.charAt(0)}
                           </div>
                           <span className="text-[10px] font-black text-text-muted uppercase tracking-widest opacity-60">
                              {art.author}
                           </span>
                        </div>
                        <div className="flex items-center gap-2 font-black text-[10px] text-text-muted uppercase tracking-widest opacity-40">
                           <Clock size={12} /> {art.readTime}
                        </div>
                     </div>
                  </div>
                </div>
              ))}
           </div>
           
           {filtrados.length === 0 && (
             <div className="text-center py-32 space-y-4 opacity-30">
                <Search size={64} className="mx-auto text-brand-primary" strokeWidth={1} />
                <h3 className="text-lg font-black uppercase tracking-widest">Nenhum resultado encontrado</h3>
             </div>
           )}
        </div>
      </section>

      {/* ── ARTIGO COMPLETO (MODAL) ── */}
      {artigoAtivo && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
           <div className="blog-modal-backdrop absolute inset-0" onClick={() => setArtigoAtivo(null)}></div>
           
           <div className="blog-modal relative w-full max-w-4xl max-h-[90vh] bg-[#11111B] border border-white/10 rounded-[3rem] overflow-hidden flex flex-col shadow-3xl">
              <button 
                onClick={() => setArtigoAtivo(null)}
                className="absolute top-6 right-6 z-50 w-12 h-12 bg-black/40 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-brand-primary transition-all duration-300"
              >
                 <X size={24} />
              </button>

              <div className="overflow-y-auto no-scrollbar">
                 <div className="h-[400px] relative">
                    <img src={artigoAtivo.image} className="w-full h-full object-cover" alt="Article Cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#11111B] via-transparent to-transparent"></div>
                    <div className="absolute bottom-12 left-12 right-12">
                       <span className="px-4 py-1.5 bg-brand-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block">
                          {artigoAtivo.category}
                       </span>
                       <h2 className="text-4xl lg:text-5xl font-black leading-tight">{artigoAtivo.title}</h2>
                    </div>
                 </div>

                 <div className="p-12 lg:p-16">
                    <div className="flex flex-wrap items-center gap-6 mb-12 text-sm text-text-muted font-bold pb-8 border-b border-white/5 uppercase tracking-widest text-[11px]">
                       <span className="flex items-center gap-2"><Heart size={14} className="text-brand-primary" /> Escrito por {artigoAtivo.author}</span>
                       <span className="opacity-20">|</span>
                       <span className="flex items-center gap-2"><Clock size={14} /> Leitura de {artigoAtivo.readTime}</span>
                       <span className="opacity-20">|</span>
                       <span>📅 Publicado em {artigoAtivo.date}</span>
                    </div>

                    <div className="prose prose-invert max-w-none text-text-muted text-lg leading-[1.8] font-light space-y-8">
                       <p className="text-xl font-medium text-white italic opacity-80 leading-relaxed">
                          {artigoAtivo.description}
                       </p>
                       <p>
                          Este é um conteúdo informativo fornecido para auxiliar mulheres em situação de risco. O NIRA não substitui o aconselhamento jurídico formal, mas oferece as primeiras diretrizes de segurança e suporte emocional.
                       </p>
                       <div className="p-10 bg-brand-primary/5 border border-brand-primary/20 rounded-[2rem] space-y-6">
                          <h4 className="text-white font-black uppercase tracking-widest text-sm">Próximos Passos Sugeridos:</h4>
                          <ul className="space-y-4">
                             <li className="flex gap-4">
                               <div className="w-6 h-6 rounded-full bg-brand-primary text-white flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-1">1</div>
                               <span>Busque um local seguro e silencioso antes de continuar a leitura ou solicitar ajuda.</span>
                             </li>
                             <li className="flex gap-4">
                               <div className="w-6 h-6 rounded-full bg-brand-primary text-white flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-1">2</div>
                               <span>Lembre-se de usar o modo de navegação anônima para sua segurança digital.</span>
                             </li>
                          </ul>
                       </div>
                    </div>

                    <div className="mt-16 flex flex-col sm:flex-row gap-4 pt-12 border-t border-white/5">
                       <Link 
                        to="/atendimentos" 
                        onClick={() => setArtigoAtivo(null)}
                        className="flex-1 bg-brand-primary hover:bg-[#7a6cf0] text-center text-white px-8 py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
                       >
                          🆘 Solicitar Apoio Agora <ArrowRight size={18} />
                       </Link>
                       <button 
                        onClick={() => setArtigoAtivo(null)}
                        className="flex-1 bg-white/5 hover:bg-white/10 text-white px-8 py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all"
                       >
                          Voltar para Galeria
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}