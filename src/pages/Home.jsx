import { Link } from 'react-router-dom';
import { Shield, Fingerprint, MapPin, AlertCircle, EyeOff, UserX, Clock, Heart, HeartHandshake } from 'lucide-react';
import { mockStats, mockTeam } from '../data/mockData';

export default function Home() {
  const dores = [
    { title: 'O SILÊNCIO', desc: 'Medo de represália, vergonha e dependência do agressor tornam o silêncio uma armadilha, não uma escolha.', icon: <EyeOff size={24} className="text-brand-emergency" /> },
    { title: 'FALTA DE ACESSO', desc: 'Ir a uma delegacia ou psicólogo presencialmente é impossível para quem vive sob vigilância constante.', icon: <UserX size={24} className="text-brand-emergency" /> },
    { title: 'SEM RESPOSTA RÁPIDA', desc: 'Em momentos de agressão, ligar e falar ao telefone não é uma opção. É preciso socorro silencioso.', icon: <Clock size={24} className="text-brand-emergency" /> },
    { title: 'AUSÊNCIA DE ACOLHIMENTO', desc: 'Antes da denúncia, existe a necessidade de ser ouvida. Sem julgamento, sem burocracia, sem se expor.', icon: <Heart size={24} className="text-brand-emergency" /> }
  ];

  return (
    <div className="flex flex-col text-text-main font-sans overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center justify-center px-8 relative overflow-hidden bg-bg-main animate-fade-in-up">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[150px] -translate-y-1/2 -z-10 animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-emergency/10 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDuration: '5s' }}></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10 w-full py-20">
          <div className="space-y-6 max-w-2xl">
            <div className="flex gap-2 text-[10px] font-bold tracking-widest text-text-muted uppercase">
               <span className="px-3 py-1 rounded-full glass-panel">• GOVTECH</span>
               <span className="px-3 py-1 rounded-full glass-panel">• SOCIALTECH</span>
               <span className="px-3 py-1 rounded-full glass-panel">• E.Y.E 2026</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Núcleo de<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-purple-300 to-white">
                Identificação e<br/>Resposta ao Abuso
              </span>
            </h1>
            <p className="text-xl md:text-2xl font-light italic text-[#E0E0E6] mt-4">
              Mais do que um app — um porto seguro digital.
            </p>
            <p className="text-lg font-light text-text-muted leading-relaxed max-w-lg mt-4">
              Tecnologia para ouvir, acolher e proteger quem mais precisa. Canal anônimo, seguro e disponível de qualquer lugar.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-6">
              <Link to="/chat" className="bg-brand-primary hover:bg-[#7a6cf0] text-white px-8 py-4 rounded-full font-bold transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_30px_rgba(139,126,250,0.5)] glow-primary text-lg flex items-center gap-3">
                <span className="w-2 h-2 bg-pink-300 rounded-full animate-pulse"></span> Iniciar Triagem
              </Link>
              <Link to="/como-funciona" className="bg-transparent border border-white/20 hover:bg-white/5 hover:border-white/40 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 ease-in-out text-lg">
                Como Funciona
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-white/10 mt-8">
              {mockStats.map((stat, i) => (
                <div key={i} className="hover:-translate-y-1 transition-transform duration-300">
                  <p className="text-3xl font-extrabold text-white tracking-tight">{stat.value}</p>
                  <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-1 opacity-80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Hero Illustration */}
          <div className="relative hidden md:flex justify-center items-center">
            <div className="relative w-full max-w-[500px] aspect-square rounded-full flex items-center justify-center p-8 transition-transform duration-700 hover:scale-105">
               <div className="absolute inset-4 rounded-full border border-brand-primary/20 animate-[spin_30s_linear_infinite]"></div>
               <div className="absolute inset-12 rounded-full border border-brand-primary/10 animate-[spin_20s_linear_infinite_reverse]"></div>
               <img src="https://placehold.co/500x500/1E1E2E/8B7EFA?text=Coruja+NIRA" alt="NIRA Logo Central" className="w-[85%] rounded-full shadow-[0_0_100px_rgba(139,126,250,0.4)] relative z-10" />
            </div>
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

      {/* Quote */}
      <section className="bg-bg-main py-24 px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#181825] to-bg-main opacity-50"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 glass-panel p-12 rounded-3xl border border-white/5 shadow-2xl hover:border-white/10 transition-colors duration-500">
          <p className="text-2xl md:text-3xl font-light leading-relaxed italic text-[#E0E0E6]">
            "No Brasil, uma mulher é vítima de violência doméstica a cada 4 minutos. Apenas 1 em cada 4 casos é denunciado formalmente. Cerca de 70% das vítimas de feminicídio nunca haviam registrado uma ocorrência."
          </p>
          <p className="text-sm font-bold tracking-widest text-[#A6A6B0] mt-8 uppercase">— Fórum Brasileiro de Segurança Pública (2023) - Instituto Avon (2021) - IPEA</p>
        </div>
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

    </div>
  );
}