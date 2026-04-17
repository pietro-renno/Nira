import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { useState } from 'react';

export default function EsqueciSenha() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex text-text-main font-sans selection:bg-brand-primary/30 selection:text-white">
      
      {/* Left Form Array */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-20 bg-bg-main relative z-10 animate-fade-in-up">
        
        <div className="max-w-md w-full mx-auto space-y-12">
          
          <div className="space-y-4">
            <Link to="/login" className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-text-muted hover:text-white transition-colors mb-4 group">
               <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Voltar ao Login
            </Link>
            <h1 className="text-4xl font-black tracking-tight text-white mb-2">Recuperar Acesso</h1>
            <p className="text-text-muted text-sm font-light max-w-sm leading-relaxed">
              Esqueceu sua senha? Insira seu e-mail corporativo abaixo para receber um link seguro de redefinição de acesso.
            </p>
          </div>

          <div className="space-y-8">
            {sent ? (
              <div className="glass-panel p-8 text-center rounded-2xl border border-[#34D399]/30 bg-[#34D399]/5 animate-fade-in-up">
                 <div className="w-16 h-16 bg-[#34D399]/20 flex items-center justify-center rounded-full mx-auto mb-4 border border-[#34D399]/40 shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                   <Send className="text-[#34D399] ml-1" size={24} />
                 </div>
                 <h2 className="text-lg font-bold text-white mb-2 tracking-tight">E-mail enviado!</h2>
                 <p className="text-sm font-light text-text-muted">Se este endereço estiver registrado, você receberá um link em alguns minutos.</p>
              </div>
            ) : (
               <form onSubmit={handleSubmit} className="space-y-4">
                 <div className="space-y-1">
                   <label className="text-[11px] font-bold text-text-muted ml-2 tracking-wide">E-mail Corporativo</label>
                   <input 
                     type="email" 
                     required
                     className="w-full bg-[#181825]/80 glass-panel border border-white/5 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-brand-primary transition-all shadow-inner focus:shadow-[0_0_20px_rgba(139,126,250,0.1)] text-white"
                     placeholder="nome@ong.org"
                   />
                 </div>
                 
                 <button disabled={loading} type="submit" className="block w-full bg-brand-primary hover:bg-[#7a6cf0] text-center text-white px-5 py-4 rounded-xl text-sm font-bold transition-all glow-primary hover:-translate-y-1 mt-6 disabled:opacity-50 disabled:cursor-not-allowed">
                   {loading ? 'Enviando...' : 'Enviar link de recuperação →'}
                 </button>
               </form>
            )}
          </div>

        </div>
      </div>

      {/* Right Visual Image Block */}
      <div className="hidden md:block flex-1 relative overflow-hidden bg-[#181825]">
         <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 via-transparent to-transparent z-10 mix-blend-screen"></div>
         <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-brand-primary/10 rounded-full blur-[150px] animate-pulse" style={{animationDuration: '8s'}}></div>
         <img src="https://placehold.co/1000x1200/11111B/8B7EFA?text=NIRA+RECOVERY" className="w-full h-full object-cover opacity-30 grayscale contrast-125 saturate-50" alt="Abstract Background" />
      </div>

    </div>
  );
}
