import { Link } from 'react-router-dom';
import { Shield, Fingerprint, MapPin, AlertCircle, EyeOff, UserX, Clock, Heart, HeartHandshake, Lock, AlertTriangle, ArrowRight, BookOpen, LifeBuoy, PhoneCall, Zap} from 'lucide-react';
import { mockStats, mockTeam } from '../data/mockData';
import { useState, useContext } from 'react';
import { NiraContext } from '../context/NiraContext';

import VideoScrollSection from '../components/VideoScrollSection';
import { motion } from 'framer-motion';

import owlVideo from '../assets/owl_hero.mp4';


const FAQ_ITEMS = [
  { tag:'Privacidade', q:'A Nira é realmente anônima? Meus dados ficam salvos?', a:'Sim. A Nira foi desenhada com anonimato desde o início. Nenhum dado pessoal como nome, CPF ou telefone é solicitado. As conversas são temporárias e não associadas a qualquer identidade.' },
  { tag:'Segurança',   q:'E se o meu agressor pegar meu celular e ver o site?',  a:'A Nira possui um botão de saída rápida que fecha o aplicativo instantaneamente. Recomendamos acessar pelo modo de navegação privada (aba anônima) para não deixar histórico.' },
  { tag:'S.O.S.',      q:'Como funciona o botão S.O.S.?',                        a:'Com um único toque, o S.O.S. envia sua localização em tempo real para a equipe Nira e rede de apoio cadastrada. Não é necessário digitar nada ou falar. Em produção, integra diretamente com agentes da região.' },
  { tag:'Atendimento', q:'Posso conversar com uma pessoa real?',   a:'O painel acolhedor da Nira faz a recepção e a triagem inicial automática, mas você pode solicitar conexão com uma atendente humana — psicóloga ou assistente social — que responde no mesmo chat, de forma segura e confidencial.' },
  { tag:'Acesso',      q:'Preciso criar uma conta para usar a plataforma?',      a:'Não! Qualquer pessoa usa a triagem, o chat com o chatbot e os conteúdos sem criar conta. Cadastros existem apenas para profissionais da equipe interna.' },

  { tag:'Emergência',  q:'O que fazer se estiver em perigo imediato agora?',     a:'Ative o botão S.O.S. dentro da plataforma ou ligue 190 (Polícia). O canal 180 (Central da Mulher) também está disponível 24h para suporte específico.' },
  { tag:'Suporte',     q:'A Nira atende apenas mulheres?',                       a:'Embora o foco inicial tenha sido violência doméstica, a Nira acolhe toda e qualquer pessoa em situação de vulnerabilidade que precise de apoio. Nossa tecnologia e acolhimento são universais e inclusivos.' },
  { tag:'Projeto',     q:'A Nira é um projeto escolar ou está em produção?',     a:'É um projeto acadêmico da equipe E.Y.E (Ethical Youth Engineers) do SESI-SENAI — 2026 — com objetivo de evoluir para uma plataforma real de impacto social.' },
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
    <div className="flex flex-col text-text-main font-sans">
      
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
              <span>identificação e</span><br />
              <span>resposta ao</span><br />
              abuso
            </h1>
            <p className="home-hero__quote">"Mais do que um app, um porto seguro digital."</p>
            <p className="home-hero__desc">Tecnologia para ouvir, acolher e proteger quem mais precisa. Um canal anônimo, seguro e disponível de qualquer lugar.</p>
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
              <div className="home-hero__video-container">
                <video 
                  src={owlVideo} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="home-hero__video"
                />
                <div className="home-hero__video-mask" />
                <div className="home-hero__scanner" />
              </div>
            </div>

            {/* Decorative Geometric Elements */}
            <div className="absolute -top-10 -right-10 w-24 h-24 border-t-2 border-r-2 border-brand-primary/20 rounded-tr-3xl" />
            <div className="absolute -bottom-10 -left-10 w-24 h-24 border-b-2 border-l-2 border-brand-primary/20 rounded-bl-3xl" />

            <div className="home-hero__fcard home-hero__fcard1">
              <span className="home-hero__fcard-icon text-brand-primary"><Lock size={18} strokeWidth={2} /></span>
              <div><p className="home-hero__fcard-title">100% Anônimo</p><p className="home-hero__fcard-sub">Criptografia Ponta-a-Ponta</p></div>
            </div>
            <div className="home-hero__fcard home-hero__fcard2">
              <span className="home-hero__fcard-icon text-brand-emergency"><AlertTriangle size={18} strokeWidth={2} /></span>
              <div><p className="home-hero__fcard-title">Botão S.O.S.</p><p className="home-hero__fcard-sub">Acionamento Silencioso</p></div>
            </div>
            <div className="home-hero__fcard home-hero__fcard3">
              <span className="home-hero__fcard-icon text-[#34D399]"><HeartHandshake size={18} strokeWidth={2} /></span>
              <div><p className="home-hero__fcard-title">Apoio Real</p><p className="home-hero__fcard-sub">+50 ONGs Parceiras</p></div>
            </div>
          </div>
        </div>
      </section>

      <VideoScrollSection />

      {/* Dor que nos move */}
      <section className="bg-bg-main-alt py-40 px-8 border-y border-white/5 relative z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-emergency/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-primary/20 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-6 mb-24">
            <motion.p 
              initial={{ opacity: 0, letterSpacing: '0.2em' }} 
              whileInView={{ opacity: 1, letterSpacing: '0.5em' }} 
              className="text-[10px] font-black text-brand-emergency uppercase"
            >
              Problemática Social
            </motion.p>
            <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none">
              Qual a dor que <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emergency to-orange-500">nos move?</span>
            </h2>
            <p className="text-xl font-light text-text-muted max-w-2xl mx-auto leading-relaxed">
              O silêncio é o combustível da violência. Criamos a Nira para ser a voz de quem precisa de proteção imediata e anônima.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dores.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="glass-card p-10 rounded-[2.5rem] border border-white/5 hover:border-brand-emergency/40 transition-all duration-500 group relative"
              >
                <div className="w-16 h-16 rounded-2xl bg-bg-main flex items-center justify-center mb-8 border border-white/10 group-hover:bg-brand-emergency/10 group-hover:border-brand-emergency/30 transition-all">
                  {item.icon}
                </div>
                <h3 className="text-lg font-black text-white mb-4 group-hover:text-brand-emergency transition-colors">
                  {item.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed font-light">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTEÚDOS QUE EMPODERAM (NOVO) ── */}
      <section className="bg-bg-main py-32 px-8 border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
           <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <div className="space-y-4">
                 <p className="text-[10px] font-black tracking-[0.3em] text-brand-primary uppercase">Informação e apoio</p>
                 <h2 className="text-4xl md:text-5xl font-black tracking-tight">Conteúdos que <span className="text-brand-primary">empoderam</span></h2>
                 <p className="text-text-muted text-lg max-w-xl font-light leading-relaxed">Conheça seus direitos e saiba como se proteger com guias produzidos por especialistas da rede Nira.</p>
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
      <section className="bg-bg-main-alt py-40 px-8 border-y border-white/5 relative overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-16 relative z-10">
            <div className="text-center space-y-8">
              <div>
                <p className="text-[10px] font-black tracking-widest text-brand-primary uppercase mb-4">
                  Nossa resposta
                </p>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-white leading-tight">
                  A solução que <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-primary to-purple-400">faz a diferença</span>
                </h2>
                <p className="text-xl font-light text-text-muted leading-relaxed max-w-2xl mx-auto">
                  Unimos tecnologia de ponta e acolhimento humano para garantir que ninguém fique sem resposta em momentos críticos.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                {[
                  { title: 'Celular como Ferramenta de Defesa', desc: 'Proteção silenciosa na palma da mão para quem vive sob vigilância.' },
                  { title: 'Canal 100% Anônimo', desc: 'Segurança absoluta para o primeiro passo rumo à liberdade.' },
                  { title: 'S.O.S. Instantâneo', desc: 'Localização em tempo real para a rede de apoio em um clique.' },
                  { title: 'Acolhimento Integrado', desc: 'Suporte emocional, jurídico e encaminhamento imediato.' }
                ].map((sol, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass-card hover:bg-white/5 p-8 rounded-[2rem] border border-white/5 hover:border-brand-primary/40 transition-all cursor-default group"
                  >
                    <h3 className="text-lg font-bold text-white group-hover:text-brand-primary transition-colors flex items-center gap-3">
                      <Zap size={18} className="text-brand-primary mb-1" />
                      {sol.title}
                    </h3>
                    <p className="text-sm font-light text-text-muted mt-3 group-hover:text-white/80 transition-colors leading-relaxed">{sol.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
      </section>

      {/* Para Quem é */}
      <section className="bg-bg-main py-32 px-8">
         <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center">
               <p className="text-[10px] font-bold tracking-widest text-[#34D399] uppercase mb-3">A quem é destinado?</p>
               <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Para quem é a Nira?</h2>
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
                   <li className="flex gap-4 items-start"><span className="text-brand-primary mt-1">✔</span> Pessoas em situação de violência ou risco.</li>
                   <li className="flex gap-4 items-start"><span className="text-brand-primary mt-1">✔</span> Indivíduos em vulnerabilidade social e emocional.</li>
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
              <span className="home-faq__side-label">// Perguntas frequentes</span>
              <h2 className="home-faq__side-title">Dúvidas<br />comuns</h2>
              <p className="home-faq__side-sub">Tire suas dúvidas sobre segurança, privacidade e como a Nira funciona na prática.</p>
              <div className="home-faq__side-cta">
                <Link to="/chat" className="home-faq__contact">
                  <span className="home-faq__contact-icon text-brand-emergency"><LifeBuoy size={24} /></span>
                  <div><p className="home-faq__contact-title">Precisa de ajuda agora?</p><p className="home-faq__contact-sub">Acesse a triagem anônima</p></div>
                </Link>
                <Link to="/conteudos" className="home-faq__contact">
                  <span className="home-faq__contact-icon text-brand-primary"><BookOpen size={24} /></span>
                  <div><p className="home-faq__contact-title">Ver conteúdos informativos</p><p className="home-faq__contact-sub">Artigos e guias das ONGs parceiras</p></div>
                </Link>
                <a href="tel:180" className="home-faq__contact">
                  <span className="home-faq__contact-icon text-[#34D399]"><PhoneCall size={24} /></span>
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