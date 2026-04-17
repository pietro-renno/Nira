import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Users, Settings } from 'lucide-react';
import { useState, useContext } from 'react';
import { NiraContext } from '../context/NiraContext';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('ADM');
  const { login } = useContext(NiraContext);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(selectedRole);
      navigate('/admin/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex text-text-main font-sans selection:bg-brand-primary/30 selection:text-white">
      
      {/* Left Form Array */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-20 bg-bg-main relative z-10 animate-fade-in-up">
        
        <div className="max-w-md w-full mx-auto space-y-12">
          
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-text-muted hover:text-white transition-colors mb-4 group">
               <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Voltar
            </Link>
            <h1 className="text-4xl font-black tracking-tight text-white mb-2">Bem-vindo de volta</h1>
            <p className="text-text-muted text-sm font-light max-w-sm leading-relaxed">
              Acesso exclusivo para equipe interna. Somente administradores criam novos acessos.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-[10px] font-extrabold tracking-widest uppercase text-text-muted mb-4">Acesso como</p>
              <div className="flex flex-wrap gap-4">
                <button type="button" onClick={() => setSelectedRole('ADM')} className={`flex-1 min-w-[100px] flex items-center justify-center gap-2 px-4 py-3 border rounded-xl text-sm font-bold transition-all hover:-translate-y-1 ${selectedRole === 'ADM' ? 'bg-brand-primary/10 border-brand-primary text-brand-primary shadow-[0_0_15px_rgba(139,126,250,0.15)]' : 'bg-[#181825] border-white/5 text-text-muted hover:text-white hover:border-white/20'}`}>
                  <Settings size={16} /> ADM
                </button>
                <button type="button" onClick={() => setSelectedRole('ONG')} className={`flex-1 min-w-[100px] flex items-center justify-center gap-2 px-4 py-3 border rounded-xl text-sm font-bold transition-all hover:-translate-y-1 ${selectedRole === 'ONG' ? 'bg-[#34D399]/10 border-[#34D399] text-[#34D399] shadow-[0_0_15px_rgba(52,211,153,0.15)]' : 'bg-[#181825] border-white/5 text-text-muted hover:text-white hover:border-white/20'}`}>
                   <Users size={16} /> ONG
                </button>
                <button type="button" onClick={() => setSelectedRole('Prof.')} className={`flex-1 min-w-[100px] flex items-center justify-center gap-2 px-4 py-3 border rounded-xl text-sm font-bold transition-all hover:-translate-y-1 ${selectedRole === 'Prof.' ? 'bg-yellow-500/10 border-yellow-500 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.15)]' : 'bg-[#181825] border-white/5 text-text-muted hover:text-white hover:border-white/20'}`}>
                   <User size={16} /> Funcionário
                </button>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-text-muted ml-2 tracking-wide">Usuário</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-[#181825]/80 glass-panel border border-white/5 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-brand-primary transition-all shadow-inner focus:shadow-[0_0_20px_rgba(139,126,250,0.1)] text-white"
                  placeholder="Seu login"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-text-muted ml-2 tracking-wide">Senha</label>
                <input 
                  type="password" 
                  required
                  className="w-full bg-[#181825]/80 glass-panel border border-white/5 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-brand-primary transition-all shadow-inner focus:shadow-[0_0_20px_rgba(139,126,250,0.1)] text-white"
                  placeholder="••••••••"
                />
              </div>
              
              <button disabled={loading} type="submit" className="block w-full bg-brand-primary hover:bg-[#7a6cf0] text-center text-white px-5 py-4 rounded-xl text-sm font-bold transition-all glow-primary hover:-translate-y-1 mt-6 disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? 'Autenticando...' : 'Entrar →'}
              </button>
            </form>
          </div>

          <div className="text-center pt-8 border-t border-white/5">
            <p className="text-xs text-text-muted font-medium">Esqueceu sua senha? <Link to="/esqueci-senha" className="text-white hover:text-brand-primary hover:underline transition-all">Entre em contato</Link></p>
          </div>

        </div>
      </div>

      {/* Right Visual Image Block */}
      <div className="hidden md:block flex-1 relative overflow-hidden bg-[#181825]">
         <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 via-transparent to-transparent z-10 mix-blend-screen"></div>
         <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-brand-primary/10 rounded-full blur-[150px] animate-pulse" style={{animationDuration: '6s'}}></div>
         <img src="https://placehold.co/1000x1200/11111B/8B7EFA?text=NIRA+SECURE+LOGIN" className="w-full h-full object-cover opacity-30 grayscale contrast-125" alt="Abstract Background" />
      </div>

    </div>
  );
}