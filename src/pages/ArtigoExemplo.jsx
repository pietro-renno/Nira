import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Share2, Bookmark } from 'lucide-react';
import { mockArticles } from '../data/mockData';

export default function ArtigoExemplo() {
  const article = mockArticles[0];

  const handleAction = (msg) => {
    alert(msg);
  };

  return (
    <div className="bg-bg-main min-h-screen text-text-main font-sans pb-32 animate-fade-in-up">
      
      {/* Article Cover Hero */}
      <section className="relative h-[60vh] min-h-[400px] w-full border-b border-white/5 flex items-end pb-16 px-8">
        <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-[#11111B]/80 to-transparent z-10 w-full"></div>
        <img src="https://placehold.co/1920x1080/181825/8B7EFA?text=Lei+Maria+da+Penha" alt="Cover" className="absolute inset-0 w-full h-full object-cover saturate-50 opacity-60 z-0" />
        
        <div className="max-w-4xl mx-auto w-full relative z-20 space-y-6">
           <Link to="/conteudos" className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-white hover:text-brand-primary transition-colors hover:-translate-x-1 duration-300 shadow-sm glass-panel bg-white/10 px-4 py-2 rounded-full border border-white/20 w-max mb-6">
             <ArrowLeft size={16} /> Voltar aos conteúdos
           </Link>
           
           <span className="text-[10px] font-extrabold tracking-widest text-brand-primary bg-brand-primary/10 px-3 py-1.5 rounded-full border border-brand-primary/20 uppercase w-fit block shadow-sm">
             {article.category}
           </span>
           
           <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-[1.1] drop-shadow-xl">
              {article.title}
           </h1>
           
           <div className="flex flex-col sm:flex-row sm:items-center gap-6 mt-8 pt-6 border-t border-white/10 w-full max-w-2xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white text-lg shadow-xl backdrop-blur-md">{article.author.charAt(0)}</div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">{article.author}</span>
                  <span className="text-[11px] font-medium text-text-muted">{article.date}</span>
                </div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-white/10"></div>
              <div className="flex items-center gap-2 text-xs font-semibold text-text-muted bg-white/5 px-4 py-2 rounded-full border border-white/5 backdrop-blur-md">
                <Clock size={16} className="text-brand-primary" /> {article.readTime}
              </div>
           </div>
        </div>
      </section>

      {/* Main Content Read Area */}
      <section className="max-w-4xl mx-auto px-8 py-16 flex flex-col md:flex-row gap-12">
        
        <div className="hidden md:flex flex-col gap-4 sticky top-32 h-max">
           <button onClick={() => handleAction('Funcionalidade de Compartilhar em desenvolvimento')} className="w-12 h-12 rounded-full glass-panel border border-white/10 flex items-center justify-center hover:bg-white/10 text-text-muted hover:text-white hover:-translate-y-1 transition-all shadow-sm group">
              <Share2 size={20} className="group-hover:scale-110 transition-transform" />
           </button>
           <button onClick={() => handleAction('O artigo foi Salvo com sucesso!')} className="w-12 h-12 rounded-full glass-panel border border-white/10 flex items-center justify-center hover:bg-white/10 text-text-muted hover:text-brand-primary hover:-translate-y-1 transition-all shadow-sm group">
              <Bookmark size={20} className="group-hover:scale-110 transition-transform" />
           </button>
        </div>

        <article className="flex-1 space-y-8 text-lg font-light text-[#E0E0E6] leading-relaxed">
           <p className="text-xl font-medium leading-relaxed">
             A Lei Maria da Penha (Lei nº 11.340/2006) é o principal instrumento legal do Brasil para coibir e prevenir a violência doméstica e familiar contra a mulher. Entender seus mecanismos é o primeiro passo para a libertação.
           </p>

           <h2 className="text-2xl font-bold text-white tracking-tight mt-12 mb-6">O que a lei considera violência?</h2>
           <p>Muitas pessoas acreditam que apenas a agressão física se enquadra na lei. No entanto, ela estabelece 5 tipos de violência:</p>
           <ul className="list-disc pl-6 space-y-4">
             <li><strong className="text-white font-semibold">Violência Física:</strong> Qualquer conduta que ofenda a integridade ou saúde corporal da mulher.</li>
             <li><strong className="text-white font-semibold">Violência Psicológica:</strong> Qualquer conduta que cause dano emocional, diminuição da autoestima, ou que prejudique o desenvolvimento.</li>
             <li><strong className="text-white font-semibold">Violência Sexual:</strong> Conduta que constranja a presenciar, manter ou a participar de relação sexual não desejada.</li>
             <li><strong className="text-white font-semibold">Violência Patrimonial:</strong> Retenção, subtração ou destruição parcial ou total de objetos, instrumentos de trabalho ou recursos econômicos.</li>
             <li><strong className="text-white font-semibold">Violência Moral:</strong> Qualquer conduta que configure calúnia, difamação ou injúria.</li>
           </ul>

           <h2 className="text-2xl font-bold text-white tracking-tight mt-12 mb-6">Medidas Protetivas de Urgência</h2>
           <p>As medidas protetivas são ordens judiciais concedidas com a finalidade de proteger a vítima, garantindo sua integridade física e emocional. O agressor pode ser proibido de se aproximar, frequentar determinados lugares, ou contatar a vítima por qualquer meio (como mensagens ou ligações).</p>

           <div className="p-8 glass-card border border-brand-primary/30 rounded-3xl my-10 bg-brand-primary/5">
              <h3 className="text-brand-primary font-bold text-lg mb-3">Você não está sozinha.</h3>
              <p className="text-sm font-light text-text-muted">Se você se identifica com qualquer um dos cenários relatados neste artigo, nossa equipe está de prontidão para auxiliar 100% anonimamente no Chat PsiTech.</p>
           </div>
        </article>

      </section>
    </div>
  );
}
