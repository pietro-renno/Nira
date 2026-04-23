import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Users, Settings, Lock } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('ADM');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setErro('');
    
    setTimeout(() => {
      const resp = login(usuario, senha);
      if (resp.ok) {
        navigate('/');
      } else {
        setErro('Usuário ou senha incorretos.');
        setLoading(false);
      }
    }, 1200);
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
            {erro && (
              <div className="bg-brand-emergency/10 border border-brand-emergency/20 text-brand-emergency px-4 py-3 rounded-xl text-xs font-bold animate-pulse">
                {erro}
              </div>
            )}
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
                <div className="relative">
                  <User size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                  <input 
                    type="text" 
                    required
                    value={usuario}
                    onChange={e => setUsuario(e.target.value)}
                    className="w-full bg-[#181825]/80 glass-panel border border-white/5 rounded-xl pl-12 pr-5 py-4 text-sm focus:outline-none focus:border-brand-primary transition-all shadow-inner focus:shadow-[0_0_20px_rgba(139,126,250,0.1)] text-white"
                    placeholder="Seu login"
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-text-muted ml-2 tracking-wide">Senha</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                  <input 
                    type="password" 
                    required
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    className="w-full bg-[#181825]/80 glass-panel border border-white/5 rounded-xl pl-12 pr-5 py-4 text-sm focus:outline-none focus:border-brand-primary transition-all shadow-inner focus:shadow-[0_0_20px_rgba(139,126,250,0.1)] text-white"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <button disabled={loading} type="submit" className="block w-full bg-brand-primary hover:bg-[#7a6cf0] text-center text-white px-5 py-4 rounded-xl text-sm font-bold transition-all glow-primary hover:-translate-y-1 mt-6 disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? 'Autenticando...' : 'Entrar →'}
              </button>

              <div className="pt-4 flex flex-col gap-2">
                <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest text-center">Contas de demonstração</p>
                <div className="flex justify-center gap-2">
                  <button type="button" onClick={() => { setUsuario('admin'); setSenha('123'); }} className="text-[10px] text-text-muted hover:text-white border border-white/5 px-2 py-1 rounded-md transition-colors">Admin</button>
                  <button type="button" onClick={() => { setUsuario('ong_vida'); setSenha('123'); }} className="text-[10px] text-text-muted hover:text-white border border-white/5 px-2 py-1 rounded-md transition-colors">ONG</button>
                  <button type="button" onClick={() => { setUsuario('psicologa01'); setSenha('123'); }} className="text-[10px] text-text-muted hover:text-white border border-white/5 px-2 py-1 rounded-md transition-colors">Psi</button>
                </div>
              </div>
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