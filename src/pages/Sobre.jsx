import { ShieldCheck, EyeOff, Code, HeartHandshake } from 'lucide-react';
import { mockTeam } from '../data/mockData';

export default function Sobre() {
  return (
    <div className="bg-bg-main min-h-screen text-text-main font-sans pb-32">
      
      {/* Hero */}
      <section className="pt-24 pb-16 px-8 bg-[#181825] border-b border-border-subtle overflow-hidden relative">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-brand-primary/10 rounded-full blur-[100px] -translate-y-1/2"></div>
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
           <div className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold tracking-widest text-text-muted mb-4 uppercase shadow-xl">
             E.Y.E - Ethical Youth Engineers • SESI-SENAI 2026
           </div>
           <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
             Construindo o porto seguro que o Brasil precisa.
           </h1>
           <p className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
             Somos cinco estudantes que se uniram para transformar conhecimento técnico em impacto social real.
           </p>

           <div className="flex flex-wrap justify-center gap-6 pt-8">
              <div className="flex flex-col items-center p-4 bg-[#11111B] border border-border-subtle rounded-2xl w-40 hover:border-brand-primary/50 transition-colors">
                <Code size={24} className="text-brand-primary mb-3" />
                <span className="text-2xl font-bold text-white">5</span>
                <span className="text-xs text-text-muted font-bold uppercase mt-1">Devs no Time</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-[#11111B] border border-border-subtle rounded-2xl w-40 hover:border-brand-primary/50 transition-colors">
                <EyeOff size={24} className="text-brand-primary mb-3" />
                <span className="text-2xl font-bold text-white">0</span>
                <span className="text-xs text-text-muted font-bold uppercase mt-1">Dados Coletados</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-[#11111B] border border-border-subtle rounded-2xl w-40 hover:border-brand-primary/50 transition-colors">
                <ShieldCheck size={24} className="text-[#34D399] mb-3" />
                <span className="text-2xl font-bold text-white">100%</span>
                <span className="text-xs text-text-muted font-bold uppercase mt-1">anonimato</span>
              </div>
           </div>
        </div>
      </section>

      {/* Manifesto e Features */}
      <section className="py-24 px-8 border-b border-border-subtle">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
           
           {/* Manifesto Lateral (esquerda) */}
           <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug">Violência não começa com um soco...</h2>
              <p className="text-text-muted text-lg leading-relaxed">
                Ela começa no silêncio, na manipulação e na falta de acesso à informação. A NIRA existe para destruir essa barreira.
              </p>
              <div className="p-6 bg-[#181825] border-l-4 border-brand-primary rounded-r-2xl mt-8 italic text-text-muted">
                "Não adianta ter leis se a vítima não tem meios seguros de pedir socorro antes da tragédia."
              </div>
           </div>

           {/* 3 Features Direita */}
           <div className="space-y-8">
              <div className="flex gap-4">
                 <div className="flex-shrink-0 w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center border border-brand-primary/30">
                   <EyeOff size={20} className="text-brand-primary" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-white mb-2">Anonimato por padrão</h3>
                   <p className="text-text-muted text-sm leading-relaxed">Não armazenamos IPs, cookies rastreáveis ou exigimos login para acessar a área pública ou o chat.</p>
                 </div>
              </div>
              
              <div className="flex gap-4">
                 <div className="flex-shrink-0 w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center border border-brand-primary/30">
                   <HeartHandshake size={20} className="text-brand-primary" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-white mb-2">Acolhimento antes de tudo</h3>
                   <p className="text-text-muted text-sm leading-relaxed">A jornada foi criada não para ser um 'formulário policial', mas uma assistente amigável através da IA.</p>
                 </div>
              </div>

              <div className="flex gap-4">
                 <div className="flex-shrink-0 w-12 h-12 bg-[#34D399]/20 rounded-xl flex items-center justify-center border border-[#34D399]/30">
                   <Code size={20} className="text-[#34D399]" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-white mb-2">Código que salva vidas</h3>
                   <p className="text-text-muted text-sm leading-relaxed">Nosso foco é escalabilidade e segurança. Código open-source feito para rodar rápido mesmo em conexões lentas.</p>
                 </div>
              </div>
           </div>
           
        </div>
      </section>

      {/* Equipe Hero/Mock Equipe */}
      <section className="py-24 px-8 bg-bg-main-alt">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
             <h2 className="text-4xl font-bold text-white">Nossa Equipe de Criadores</h2>
             <p className="text-text-muted max-w-2xl mx-auto">Conheça o grupo E.Y.E que idealizou e desenvolveu do zero o NIRA.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {mockTeam.map((member, i) => (
               <div key={i} className="bg-bg-main border border-border-subtle p-6 rounded-3xl flex flex-col items-center hover:-translate-y-2 transition-transform cursor-pointer hover:border-brand-primary/50 shadow-lg text-center group">
                 <img src={`https://placehold.co/150x150/1E1E2E/8B7EFA?text=${member.name.charAt(0)}`} alt={member.name} className="w-24 h-24 rounded-full mb-5 object-cover shadow-[0_0_20px_rgba(139,126,250,0.15)] group-hover:shadow-[0_0_25px_rgba(139,126,250,0.4)] transition-shadow" />
                 <h4 className="text-lg font-bold text-white">{member.name}</h4>
                 <p className="text-xs text-brand-primary font-bold mt-1 uppercase tracking-wider mb-4">{member.role}</p>
                 
                 <div className="mt-auto px-3 py-1 bg-[#181825] border border-border-subtle rounded-full text-[10px] text-text-muted font-bold tracking-widest uppercase">
                   Sesi-Senai • 2026
                 </div>
               </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
