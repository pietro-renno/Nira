import { useState, useContext } from 'react';
import { Search, Clock, Tag, ChevronRight } from 'lucide-react';
import { NiraContext } from '../context/NiraContext';
import { Link } from 'react-router-dom';

export default function Conteudos() {
  const { articles } = useContext(NiraContext);
  const [activeTag, setActiveTag] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  
  const tags = ['Todos', 'Direitos', 'Saúde Mental', 'Segurança', 'Família'];

  const filtered = articles
    .filter(a => !a.featured)
    .filter(a => activeTag === 'Todos' || a.tags.includes(activeTag))
    .filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const featured = articles.find(a => a.featured);

  return (
    <div className="bg-bg-main min-h-screen text-text-main font-sans pb-32">
      
      {/* Header Interativo */}
      <section className="pt-24 pb-16 px-8 relative overflow-hidden bg-[#181825] border-b border-white/5 animate-fade-in-up">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <p className="text-[10px] font-extrabold tracking-widest text-brand-primary uppercase shadow-sm inline-block px-3 py-1 bg-brand-primary/10 rounded-full border border-brand-primary/20">Informação que Protege e Empodera</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Conteúdos Educativos
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto font-light leading-relaxed">
            Artigos, guias e orientações publicados por ONGs parceiras para fortalecer sua jornada.
          </p>

          <div className="w-full max-w-xl mx-auto relative group mt-8">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar artigos..." 
              className="w-full bg-[#11111B]/80 glass-panel border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-base text-white focus:outline-none focus:border-brand-primary/60 transition-all shadow-xl focus:shadow-[0_0_25px_rgba(139,126,250,0.15)] group-hover:border-white/20"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-hover:text-brand-primary transition-colors" size={22} />
          </div>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-7xl mx-auto px-8 py-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        
        {/* Destaque Glassmorphism */}
        {featured && (
          <Link to="/conteudos/artigo-exemplo" className="block mb-20 glass-panel p-8 md:p-12 rounded-[2.5rem] border border-white/10 hover:border-brand-primary/30 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(139,126,250,0.08)] group cursor-pointer relative overflow-hidden flex flex-col md:flex-row gap-10 items-center">
            
            <div className="w-full md:w-1/2 relative space-y-6 z-10">
              <span className="flex items-center gap-2 text-xs font-bold text-brand-primary uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span> Em Destaque
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white group-hover:text-brand-primary transition-colors duration-300 leading-tight">
                {featured.title}
              </h2>
              <p className="text-text-muted text-lg font-light leading-relaxed">{featured.description}</p>
              
              <div className="flex items-center gap-6 mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white shadow-xl group-hover:bg-brand-primary/20 transition-colors">{featured.author.charAt(0)}</div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white">{featured.author}</span>
                    <span className="text-xs font-medium text-text-muted">{featured.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-text-muted bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                  <Clock size={14} className="text-brand-primary" /> {featured.readTime}
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl group-hover:-translate-y-2 transition-transform duration-500">
               <div className="absolute inset-0 bg-gradient-to-t from-bg-main to-transparent z-10 opacity-60"></div>
               <img src="https://placehold.co/800x600/181825/8B7EFA?text=Guia+Lei+Maria+da+Penha" alt={featured.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out saturate-50 group-hover:saturate-100" />
            </div>

          </Link>
        )}

        {/* Categories / Tags Slider */}
        <div className="flex gap-4 overflow-x-auto pb-6 mb-12 no-scrollbar">
          {tags.map(tag => (
            <button 
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-8 py-3.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 whitespace-nowrap shadow-sm border ${
                activeTag === tag 
                ? 'bg-brand-primary border-brand-primary text-white shadow-[0_5px_15px_rgba(139,126,250,0.3)]' 
                : 'glass-panel text-text-muted hover:text-white hover:border-white/20 hover:-translate-y-0.5'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Artigos Grid Modern */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(article => (
            <Link to="/conteudos/artigo-exemplo" key={article.id} className="glass-card rounded-[2rem] border border-white/5 p-8 flex flex-col h-full hover:bg-white/5 hover:border-brand-primary/30 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(139,126,250,0.05)] transition-all duration-500 cursor-pointer group">
              <div className="mb-8 overflow-hidden rounded-2xl aspect-video relative">
                <div className="absolute inset-0 bg-gradient-to-t from-bg-main to-transparent z-10 opacity-40"></div>
                <img src={`https://placehold.co/600x400/181825/8B7EFA?text=${article.category.replace(' ', '+')}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 saturate-50 group-hover:saturate-100" alt="Cover" />
                <div className="absolute top-4 left-4 z-20">
                  <span className="flex items-center gap-1.5 text-[10px] font-bold text-white bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 uppercase tracking-widest">
                    <Tag size={12} className={article.category === 'Saúde Mental' ? 'text-[#34D399]' : 'text-brand-primary'} />
                    {article.category}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-brand-primary transition-colors leading-snug">{article.title}</h3>
              <p className="text-sm font-light text-text-muted mb-6 line-clamp-3 leading-relaxed flex-1">{article.description}</p>
              
              <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                 <div className="flex flex-col gap-1">
                   <p className="text-xs font-bold text-white">{article.author}</p>
                   <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">{article.date}</p>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white group-hover:bg-brand-primary group-hover:border-brand-primary transition-all duration-300">
                    <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                 </div>
              </div>
            </Link>
          ))}
        </div>

      </section>

    </div>
  );
}