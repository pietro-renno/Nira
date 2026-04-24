import { Link } from 'react-router-dom';
import { ArrowRight, Lock, MessageSquare, MapPin, Search, Map as MapIcon, BarChart2 } from 'lucide-react';

export default function ComoFunciona() {
  const steps = [
    { num: '01', title: 'Acesso anônimo seguro', desc: 'A vítima abre o app ou site sem precisar se cadastrar...', icon: <Lock size={20} className="text-white" /> },
    { num: '02', title: 'Triagem Inteligente Digital', desc: 'Um painel anonimizado faz perguntas estruturadas para entender a situação...', icon: <MessageSquare size={20} className="text-white" /> },
    { num: '03', title: 'S.O.S. com Geolocalização', desc: 'Em caso de perigo imediato, um único toque no botão de pânico envia a localização...', icon: <MapPin size={20} className="text-white" /> },
    { num: '04', title: 'Atendimento pelo Chat', desc: 'Psicólogos e assistentes sociais recebem o caso no painel web...', icon: <Search size={20} className="text-white" /> },
    { num: '05', title: 'Encaminhamento para Serviços', desc: 'O sistema mapeia delegacias, ONGs e clínicas parceiras próximas...', icon: <MapIcon size={20} className="text-white" /> },
    { num: '06', title: 'Acompanhamento e Dados', desc: 'Gestores acessam relatórios, mapa de calor e indicadores...', icon: <BarChart2 size={20} className="text-white" /> }
  ];

  return (
    <div className="bg-bg-main text-text-main min-h-screen font-sans">
      {/* Header */}
      <section className="pt-24 pb-16 px-8 text-center relative overflow-hidden bg-[#181825] border-b border-white/5 animate-fade-in-up">
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-brand-primary/15 rounded-full blur-[100px] -translate-y-1/2 -z-10 animate-pulse"></div>
        
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <p className="text-[10px] font-extrabold tracking-widest text-[#34D399] uppercase mb-4 shadow-sm inline-block px-3 py-1 bg-[#34D399]/10 rounded-full border border-[#34D399]/20">Como o NIRA funciona?</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Uma plataforma completa - <br className="hidden md:block"/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-text-muted">do pedido de socorro ao acompanhamento integrado</span>
          </h1>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#181825]/50 -z-10"></div>
        <div className="max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          
          <h2 className="text-2xl font-black tracking-tight mb-16 text-center text-white">Fluxo / Passo a passo</h2>

          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-primary/50 before:via-white/10 before:to-transparent">
            {steps.map((step, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                
                {/* Icon Marker */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-primary border-4 border-[#11111B] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(139,126,250,0.5)] group-hover:scale-125 group-hover:bg-[#a69bff] transition-all duration-300 relative z-10">
                   {step.icon}
                </div>
                
                {/* Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel border border-white/5 p-8 rounded-3xl hover:bg-white/5 hover:border-brand-primary/40 hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_15px_30px_rgba(139,126,250,0.1)]">
                   <span className="text-brand-primary font-black tracking-tighter text-4xl mb-4 block opacity-40 group-hover:opacity-100 transition-opacity">{step.num}</span>
                   <h3 className="font-bold text-lg mb-2 text-white">{step.title}</h3>
                   <p className="text-sm font-light text-text-muted leading-relaxed">{step.desc}</p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-8 text-center bg-bg-main-alt border-t border-white/5 relative z-10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
         <div className="max-w-2xl mx-auto space-y-8 glass-card p-12 rounded-[3rem] shadow-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/10 to-transparent"></div>
            <div className="relative z-10">
              <h2 className="text-[10px] font-extrabold tracking-widest text-[#34D399] uppercase mb-4 inline-block px-3 py-1 bg-[#34D399]/10 rounded-full border border-[#34D399]/20">Pronto para começar?</h2>
              <p className="text-4xl font-black text-white mb-8 tracking-tight">Você não está só</p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <Link to="/conteudos" className="bg-transparent border border-white/20 hover:bg-white/5 text-white px-8 py-3.5 rounded-full font-bold transition-all duration-300 text-sm">
                   Ver conteúdos
                 </Link>
                 <Link to="/chat" className="bg-brand-primary hover:bg-[#7a6cf0] text-white px-8 py-3.5 rounded-full font-bold transition-all duration-300 ease-in-out glow-primary hover:-translate-y-1 text-sm flex items-center justify-center gap-2">
                   <Lock size={16} /> Iniciar triagem agora
                 </Link>
              </div>
            </div>
         </div>
      </section>

    </div>
  );
}