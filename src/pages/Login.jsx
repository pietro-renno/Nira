import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Users, Settings, Lock, Map as MapIcon } from 'lucide-react';
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
        if (resp.user?.especialidade === 'agente') {
          navigate('/admin/mapa-completo');
        } else {
          navigate('/');
        }
      } else {
        setErro('Usuário ou senha incorretos.');
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex text-text-main font-sans selection:bg-brand-primary/30 selection:text-white">
      
      {/* Left Form Area */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-20 pt-24 md:pt-32 pb-10 bg-bg-main relative z-10 animate-fade-in-up">
        
        <div className="max-w-md w-full mx-auto space-y-12">
          
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-text-muted hover:text-white transition-colors group">
               <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Voltar
            </Link>
            <h1 className="text-5xl font-black tracking-tight text-white mb-2 leading-tight">Acesso Restrito</h1>
            <p className="text-text-muted text-sm font-light max-w-sm leading-relaxed">
              Autenticação obrigatória para psicólogos, agentes e administradores da rede NIRA.
            </p>
          </div>

          <div className="space-y-8">
            {erro && (
              <div className="bg-brand-emergency/10 border border-brand-emergency/20 text-brand-emergency px-4 py-3 rounded-xl text-xs font-bold animate-pulse">
                {erro}
              </div>
            )}
            <div>
              <p className="text-[10px] font-extrabold tracking-widest uppercase text-text-muted mb-4">Escolha seu Perfil</p>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setSelectedRole('ADM')} className={`flex items-center justify-center gap-2 px-4 py-3 border rounded-xl text-[11px] font-black uppercase tracking-widest transition-all hover:-translate-y-1 ${selectedRole === 'ADM' ? 'bg-brand-primary/10 border-brand-primary text-brand-primary shadow-[0_0_15px_rgba(139,126,250,0.15)]' : 'bg-[#181825] border-white/5 text-text-muted hover:text-white hover:border-white/20'}`}>
                  <Settings size={14} /> ADM
                </button>
                <button type="button" onClick={() => setSelectedRole('ONG')} className={`flex items-center justify-center gap-2 px-4 py-3 border rounded-xl text-[11px] font-black uppercase tracking-widest transition-all hover:-translate-y-1 ${selectedRole === 'ONG' ? 'bg-[#34D399]/10 border-[#34D399] text-[#34D399] shadow-[0_0_15px_rgba(52,211,153,0.15)]' : 'bg-[#181825] border-white/5 text-text-muted hover:text-white hover:border-white/20'}`}>
                   <Users size={14} /> ONG
                </button>
                <button type="button" onClick={() => setSelectedRole('Prof.')} className={`flex items-center justify-center gap-2 px-4 py-3 border rounded-xl text-[11px] font-black uppercase tracking-widest transition-all hover:-translate-y-1 ${selectedRole === 'Prof.' ? 'bg-yellow-500/10 border-yellow-500 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.15)]' : 'bg-[#181825] border-white/5 text-text-muted hover:text-white hover:border-white/20'}`}>
                   <User size={14} /> Psicólogo(a)
                </button>
                <button type="button" onClick={() => setSelectedRole('Agente')} className={`flex items-center justify-center gap-2 px-4 py-3 border rounded-xl text-[11px] font-black uppercase tracking-widest transition-all hover:-translate-y-1 ${selectedRole === 'Agente' ? 'bg-blue-500/10 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]' : 'bg-[#181825] border-white/5 text-text-muted hover:text-white hover:border-white/20'}`}>
                   <MapIcon size={14} /> Agente
                </button>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-text-muted ml-1 uppercase tracking-widest">Identidade</label>
                <div className="relative group">
                  <User size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-brand-primary" />
                  <input 
                    type="text" 
                    required
                    value={usuario}
                    onChange={e => setUsuario(e.target.value)}
                    className="w-full bg-[#181825]/80 border border-white/5 rounded-2xl pl-12 pr-5 py-4 text-sm focus:outline-none focus:border-brand-primary transition-all text-white"
                    placeholder="Login"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-text-muted ml-1 uppercase tracking-widest">Chave de Segurança</label>
                <div className="relative group">
                  <Lock size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-brand-primary" />
                  <input 
                    type="password" 
                    required
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    className="w-full bg-[#181825]/80 border border-white/5 rounded-2xl pl-12 pr-5 py-4 text-sm focus:outline-none focus:border-brand-primary transition-all text-white"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <button disabled={loading} type="submit" className="block w-full bg-brand-primary hover:bg-[#7a6cf0] text-center text-white px-5 py-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all glow-primary hover:-translate-y-1 mt-6 disabled:opacity-50">
                {loading ? 'Validando Acesso...' : 'Autorizar Entrada'}
              </button>
            </form>
          </div>

          <p className="text-center text-[10px] text-text-muted font-medium opacity-50">
            Esqueceu sua senha? <Link to="/esqueci-senha" className="text-white hover:text-brand-primary underline transition-all">Contate o Suporte</Link>
          </p>

        </div>
      </div>

      {/* Right Column (Visual) */}
      <div className="hidden md:block flex-1 relative overflow-hidden bg-[#0A0A10]">
         <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/30 via-transparent to-transparent z-10"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary/10 rounded-full blur-[180px]"></div>
         <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover opacity-20 mix-blend-overlay" alt="Cyber Security" />
      </div>

    </div>
  );
}