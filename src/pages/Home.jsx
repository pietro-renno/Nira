import { Link } from 'react-router-dom';
import { Shield, Fingerprint, MapPin, AlertCircle, EyeOff, UserX, Clock, Heart, HeartHandshake, Lock, AlertTriangle, ArrowRight, BookOpen } from 'lucide-react';
import { mockStats, mockTeam } from '../data/mockData';
import { useState, useContext } from 'react';
import { NiraContext } from '../context/NiraContext';

const FAQ_ITEMS = [
  { tag:'Privacidade', q:'A NIRA é realmente anônima? Meus dados ficam salvos?', a:'Sim. A NIRA foi desenhada com anonimato desde o início. Nenhum dado pessoal como nome, CPF ou telefone é solicitado. As conversas são temporárias e não associadas a qualquer identidade.' },
  { tag:'Segurança',   q:'E se o meu agressor pegar meu celular e ver o site?',  a:'A NIRA possui um botão de saída rápida que fecha o aplicativo instantaneamente. Recomendamos acessar pelo modo de navegação privada (aba anônima) para não deixar histórico.' },
  { tag:'S.O.S.',      q:'Como funciona o botão S.O.S.?',                        a:'Com um único toque, o S.O.S. envia sua localização em tempo real para a equipe NIRA e rede de apoio cadastrada. Não é necessário digitar nada ou falar. Em produção, integra diretamente com agentes da região.' },
  { tag:'Atendimento', q:'Posso conversar com uma pessoa real?',   a:'O painel acolhedor da Nira faz a recepção e a triagem inicial automática, mas você pode solicitar conexão com uma atendente humana — psicóloga ou assistente social — que responde no mesmo chat, de forma segura e confidencial.' },
  { tag:'Acesso',      q:'Preciso criar uma conta para usar a plataforma?',      a:'Não! Qualquer pessoa usa a triagem, o chat com a IA e os conteúdos sem criar conta. Cadastros existem apenas para profissionais da equipe interna.' },
  { tag:'Emergência',  q:'O que fazer se estiver em perigo imediato agora?',     a:'Ative o botão S.O.S. dentro da plataforma ou ligue 190 (Polícia) ou 180 (Central da Mulher, 24h). O SAMU pode ser acionado pelo 192.' },
  { tag:'Suporte',     q:'A NIRA atende apenas mulheres?',                       a:'A plataforma tem foco em violência doméstica e de gênero, mas qualquer pessoa em situação de vulnerabilidade pode buscar apoio. Conteúdos e triagem são inclusivos.' },
  { tag:'Projeto',     q:'A NIRA é um projeto escolar ou está em produção?',     a:'É um projeto acadêmico da equipe E.Y.E (Ethical Youth Engineers) do SESI-SENAI — 2026 — com objetivo de evoluir para uma plataforma real de impacto social.' },
];

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? ' faq-item--open' : ''}`}>
      <button className="faq-item__btn" onClick={() => setOpen(v => !v)}>
        <span className="faq-item__q">{item.q}</span>
        <span className="faq-item__icon">+</span>
      </button>
      <div className="faq-item__body">
        <div className="faq-item__a">
          <span className="faq-item__tag">{item.tag}</span><br />{item.a}
        </div>
      </div>
    </div>
  );
}


export default function Home() {
  const { articles } = useContext(NiraContext);
  const featuredArticles = articles.slice(0, 3);

  const dores = [
    { title: 'O SILÊNCIO', desc: 'Medo de represália, vergonha e dependência do agressor tornam o silêncio uma armadilha, não uma escolha.', icon: <EyeOff size={24} className="text-brand-emergency" /> },
    { title: 'FALTA DE ACESSO', desc: 'Ir a uma delegacia ou psicólogo presencialmente é impossível para quem vive sob vigilância constante.', icon: <UserX size={24} className="text-brand-emergency" /> },
    { title: 'SEM RESPOSTA RÁPIDA', desc: 'Em momentos de agressão, ligar e falar ao telefone não é uma opção. É preciso socorro silencioso.', icon: <Clock size={24} className="text-brand-emergency" /> },
    { title: 'AUSÊNCIA DE ACOLHIMENTO', desc: 'Antes da denúncia, existe a necessidade de ser ouvida. Sem julgamento, sem burocracia, sem se expor.', icon: <Heart size={24} className="text-brand-emergency" /> }
  ];

  return (
    <div className="flex flex-col text-text-main font-sans overflow-x-hidden">
      
      {/* ── HERO ── */}
      <section className="home-hero">
        <div className="home-hero__orb1" /><div className="home-hero__orb2" />
        <div className="home-hero__inner">
          <div>
            <div className="home-hero__badge">
              <span className="home-hero__badge-dot" />GovTech · SocialTech · E.Y.E 2026
            </div>
            <h1 className="home-hero__title">
              Núcleo de<br />
              <span>Identificação e</span><br />
              <span>Resposta ao</span><br />
              Abuso
            </h1>
            <p className="home-hero__quote">"Mais do que um app — um porto seguro digital."</p>
            <p className="home-hero__desc">Tecnologia para ouvir, acolher e proteger quem mais precisa. Canal anônimo, seguro e disponível de qualquer lugar.</p>
            <div className="home-hero__actions">
              <Link to="/chat" className="home-hero__btn-primary">
                <span className="home-hero__btn-dot" />Iniciar Triagem
              </Link>
              <Link to="/como-funciona" className="home-hero__btn-outline">Como Funciona</Link>
            </div>
            <div className="home-hero__stats">
              <div className="home-hero__stat"><span className="home-hero__stat-num">1/4</span><span className="home-hero__stat-lbl">Casos denunciados</span></div>
              <div className="home-hero__stat"><span className="home-hero__stat-num">4min</span><span className="home-hero__stat-lbl">1 vítima a cada</span></div>
              <div className="home-hero__stat"><span className="home-hero__stat-num">70%</span><span className="home-hero__stat-lbl">Sem registro</span></div>
            </div>
          </div>
          <div className="home-hero__visual">
            <div className="home-hero__orb-ring home-hero__orb-ring--1" />
            <div className="home-hero__orb-ring home-hero__orb-ring--2" />
            <div className="home-hero__orb-ring home-hero__orb-ring--3" />
            <div className="home-hero__orb">
              <span className="home-hero__orb-label"><Shield size={28} strokeWidth={1.5} /></span>
            </div>
            <div className="home-hero__fcard home-hero__fcard1"><span className="home-hero__fcard-icon"><Lock size={16} strokeWidth={1.5} /></span><div><p className="home-hero__fcard-title">100% Anônimo</p><p className="home-hero__fcard-sub">Sem identificação</p></div></div>
            <div className="home-hero__fcard home-hero__fcard2"><span className="home-hero__fcard-icon"><AlertTriangle size={16} strokeWidth={1.5} /></span><div><p className="home-hero__fcard-title">Botão S.O.S.</p><p className="home-hero__fcard-sub">Alerta + GPS</p></div></div>
            <div className="home-hero__fcard home-hero__fcard3"><span className="home-hero__fcard-icon"><HeartHandshake size={16} strokeWidth={1.5} /></span><div><p className="home-hero__fcard-title">Rede de Apoio</p><p className="home-hero__fcard-sub">Psicólogos · ONGs</p></div></div>
          </div>
        </div>
      </section>

      {/* Dor que nos move */}
      <section className="bg-bg-main-alt py-32 px-8 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto space-y-20 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="text-center space-y-4">
             <p className="text-[10px] font-bold tracking-widest text-brand-emergency uppercase">Problemática</p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Qual a Dor que nos Move?</h2>
            <p className="text-lg font-light text-text-muted max-w-2xl mx-auto leading-relaxed">
              Muitas pessoas em vulnerabilidade enfrentam barreiras enormes para pedir ajuda.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {dores.map((item, index) => (
              <div key={index} className="glass-card p-10 rounded-3xl hover:bg-white/5 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(139,126,250,0.1)] hover:border-brand-primary/40 transition-all duration-300 ease-in-out group flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-[#11111B] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-brand-primary/10 transition-all duration-300 border border-white/5">
                  {item.icon}
                </div>
                <h3 className="text-sm font-extrabold tracking-widest uppercase mb-4 text-white group-hover:text-brand-primary transition-colors">{item.title}</h3>
                <p className="text-text-muted text-sm leading-loose font-light flex-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTEÚDOS QUE EMPODERAM (NOVO) ── */}
      <section className="bg-bg-main py-32 px-8 border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
           <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <div className="space-y-4">
                 <p className="text-[10px] font-black tracking-[0.3em] text-brand-primary uppercase">Informação e Apoio</p>
                 <h2 className="text-4xl md:text-5xl font-black tracking-tight">Conteúdos que <span className="text-brand-primary">Empoderam</span></h2>
                 <p className="text-text-muted text-lg max-w-xl font-light leading-relaxed">Conheça seus direitos e saiba como se proteger com guias produzidos por especialistas da rede NIRA.</p>
              </div>
              <Link to="/conteudos" className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-white hover:text-brand-primary transition-all group">
                 Ver todas as matérias <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </Link>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredArticles.map((art, idx) => (
                <div key={idx} className="group flex flex-col bg-[#11111B]/40 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-brand-primary/30 transition-all duration-500 hover:shadow-2xl">
                   <div className="relative h-56 overflow-hidden">
                      <img src={art.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt={art.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#11111B] to-transparent" />
                      <span className="absolute top-6 left-6 px-4 py-1.5 bg-[#07070B]/80 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-brand-primary border border-brand-primary/20">
                         {art.category}
                      </span>
                   </div>
                   <div className="p-8 flex flex-col flex-1">
                      <h3 className="text-xl font-black text-white mb-4 group-hover:text-brand-primary transition-colors line-clamp-2">{art.title}</h3>
                      <p className="text-sm text-text-muted leading-relaxed font-medium line-clamp-3 mb-8 italic">{art.description}</p>
                      <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                         <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{art.author}</span>
                         <span className="flex items-center gap-1.5 text-[10px] font-black text-white/20 uppercase">
                            <Clock size={12} /> {art.readTime}
                         </span>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
      </section>

      {/* Solução */}
      <section className="bg-bg-main-alt py-32 px-8 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[100px] -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div>
               <p className="text-[10px] font-bold tracking-widest text-brand-primary uppercase mb-3">Nossa Solução</p>
               <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">A Solução que <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-primary">Faz a Diferença</span></h2>
               <p className="text-lg font-light text-text-muted leading-relaxed">
                 Uma plataforma digital que reduz as barreiras para a denúncia.
               </p>
            </div>
            
            <div className="space-y-4">
              {[
                { title: 'Celular como ferramenta de defesa', desc: 'O celular já na mão da vítima vira proteção silenciosa...' },
                { title: 'Canal 100% anônimo', desc: 'Nenhuma identificação necessária. Elimina o medo inicial...' },
                { title: 'S.O.S. — um toque, GPS em tempo real', desc: 'Um único toque envia localização para a rede de apoio...' },
                { title: 'Acolhimento e encaminhamento integrados', desc: 'Suporte emocional, conteúdo informativo...' }
              ].map((sol, idx) => (
                <div key={idx} className="glass-card p-6 rounded-2xl hover:bg-white/5 hover:border-brand-primary/50 transition-all duration-300 cursor-pointer group flex flex-col justify-center">
                  <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-brand-primary transition-colors">{sol.title}</h3>
                  <p className="text-sm font-light text-text-muted mt-2 group-hover:text-white/80 transition-colors">{sol.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center py-10 relative">
             <div className="relative glass-panel rounded-[40px] p-12 text-center shadow-2xl overflow-hidden hover:shadow-[0_0_50px_rgba(139,126,250,0.15)] transition-all duration-700">
               <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/10 to-transparent"></div>
               <img src="https://placehold.co/400x300/1E1E2E/8B7EFA?text=Coruja" alt="Coruja NIRA" className="w-[300px] h-[300px] object-cover rounded-3xl mx-auto mb-8 shadow-xl hover:scale-105 transition-transform duration-500" />
               <h3 className="text-2xl font-black tracking-tight text-white mb-2">NIRA</h3>
               <p className="text-sm font-bold tracking-widest text-text-muted uppercase mb-6">Núcleo de Identificação e Resposta ao Abuso</p>
               <div className="flex gap-2 justify-center">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-white tracking-widest uppercase">GovTech</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-white tracking-widest uppercase">SocialTech</span>
                  <span className="px-3 py-1 bg-brand-primary/20 border border-brand-primary/30 rounded-full text-[10px] font-bold text-brand-primary tracking-widest uppercase">E.Y.E 2026</span>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Para Quem é */}
      <section className="bg-bg-main py-32 px-8">
         <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center">
               <p className="text-[10px] font-bold tracking-widest text-[#34D399] uppercase mb-3">A Quem É Destinado?</p>
               <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Para quem é a NIRA?</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Bloco Esquerdo */}
               <div className="glass-card p-12 rounded-[2.5rem] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(255,255,255,0.03)] transition-all duration-500 group">
                 <div className="flex items-center gap-5 mb-10">
                   <div className="p-4 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <Shield size={32} />
                   </div>
                   <h3 className="text-2xl font-bold tracking-tight text-white">USUÁRIOS FINAIS</h3>
                 </div>
                 <ul className="space-y-6 text-lg font-light text-text-muted">
                   <li className="flex gap-4 items-start"><span className="text-brand-primary mt-1">✔</span> Mulheres em situação de violência ou risco.</li>
                   <li className="flex gap-4 items-start"><span className="text-brand-primary mt-1">✔</span> Pessoas em vulnerabilidade social.</li>
                   <li className="flex gap-4 items-start"><span className="text-brand-primary mt-1">✔</span> Quem precisa de ajuda mas teme se expor.</li>
                 </ul>
               </div>

               {/* Bloco Direito */}
               <div className="glass-panel p-12 rounded-[2.5rem] bg-gradient-to-b from-[#181825] to-[#1E1E2E] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(139,126,250,0.05)] hover:border-brand-primary/30 transition-all duration-500 group">
                 <div className="flex items-center gap-5 mb-10">
                   <div className="p-4 bg-white/5 border border-white/10 text-text-muted group-hover:text-brand-primary group-hover:border-brand-primary/30 rounded-2xl group-hover:scale-110 transition-all duration-300">
                      <HeartHandshake size={32} />
                   </div>
                   <h3 className="text-2xl font-bold tracking-tight text-white">GESTORES E PARCEIROS</h3>
                 </div>
                 <ul className="space-y-6 text-lg font-light text-text-muted">
                   <li className="flex gap-4 items-start"><span className="text-white/50 mt-1">✔</span> Psicólogos e assistentes sociais.</li>
                   <li className="flex gap-4 items-start"><span className="text-white/50 mt-1">✔</span> ONGs e centros de apoio.</li>
                   <li className="flex gap-4 items-start"><span className="text-white/50 mt-1">✔</span> Autoridades e agentes de segurança.</li>
                 </ul>
               </div>
            </div>
         </div>
      </section>

      {/* ── FAQ ── */}
      <section className="home-faq">
        <div className="container">
          <div className="home-faq__layout">
            <div>
              <span className="home-faq__side-label">// FAQ</span>
              <h2 className="home-faq__side-title">Perguntas<br />Frequentes</h2>
              <p className="home-faq__side-sub">Tire suas dúvidas sobre segurança, privacidade e como a NIRA funciona na prática.</p>
              <div className="home-faq__side-cta">
                <Link to="/chat" className="home-faq__contact">
                  <span className="home-faq__contact-icon">🆘</span>
                  <div><p className="home-faq__contact-title">Precisa de ajuda agora?</p><p className="home-faq__contact-sub">Acesse a triagem anônima</p></div>
                </Link>
                <Link to="/conteudos" className="home-faq__contact">
                  <span className="home-faq__contact-icon">📚</span>
                  <div><p className="home-faq__contact-title">Ver conteúdos informativos</p><p className="home-faq__contact-sub">Artigos e guias das ONGs parceiras</p></div>
                </Link>
                <a href="tel:180" className="home-faq__contact">
                  <span className="home-faq__contact-icon">📞</span>
                  <div><p className="home-faq__contact-title">Ligue 180</p><p className="home-faq__contact-sub">Central da Mulher — 24 horas</p></div>
                </a>
              </div>
            </div>
            <div className="home-faq__list">
              {FAQ_ITEMS.map((item, i) => <FaqItem key={i} item={item} />)}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}