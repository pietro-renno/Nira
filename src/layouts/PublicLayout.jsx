import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { NiraContext } from '../context/NiraContext';

export default function PublicLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addSOSAlert } = useContext(NiraContext);

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Como funciona', path: '/como-funciona' },
    { name: 'Conteúdos', path: '/conteudos' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'Login', path: '/login' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-bg-main text-text-main font-sans selection:bg-brand-primary/30 selection:text-white">
      {/* Navbar with Glassmorphism */}
      <nav className="w-full bg-[#11111B]/80 backdrop-blur-xl border-b border-white/5 py-4 px-8 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group hover:-translate-y-0.5 transition-transform">
            <h1 className="text-2xl font-extrabold tracking-tighter text-white group-hover:text-brand-primary transition-colors">Nira</h1>
          </Link>
          
          <div className="hidden lg:flex items-center gap-10 text-[13px] font-bold tracking-wide uppercase text-text-muted">
            {navLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`relative py-2 transition-all duration-300 ease-in-out hover:text-white group ${location.pathname === link.path ? 'text-white' : ''}`}
              >
                {link.name}
                {/* Micro-interaction underline */}
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-brand-primary rounded-full transform origin-left transition-transform duration-300 ease-out ${location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                if (window.confirm('ALERTA S.O.S: Acionar modo de emergência silenciosa?')) {
                  addSOSAlert();
                  navigate('/chat');
                }
              }}
              className="flex items-center gap-2 bg-transparent border border-brand-emergency/50 hover:bg-brand-emergency hover:border-brand-emergency text-brand-emergency hover:text-white px-5 py-2.5 rounded-full text-[13px] font-bold tracking-wider transition-all duration-300 ease-in-out shadow-[0_0_15px_rgba(229,62,62,0.15)] group"
            >
              <span className="w-1.5 h-1.5 bg-brand-emergency rounded-full group-hover:bg-white animate-[ping_2s_infinite]"></span> S.O.S
            </button>
            <Link to="/chat" className="bg-brand-primary hover:bg-[#7a6cf0] text-white px-6 py-2.5 rounded-full text-[13px] font-bold tracking-wider transition-all duration-300 glow-primary hover:-translate-y-1 hover:shadow-indigo-500/30 shadow-lg">
              PsiTech
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-bg-main-alt border-t border-white/5 py-16 px-8 flex-shrink-0 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-black tracking-tighter text-white">NIRA</h2>
            <p className="text-text-muted text-sm font-light leading-loose max-w-xs">
              Núcleo de Identificação e Resposta ao Abuso. Um porto seguro digital para ouvir, acolher e proteger quem mais precisa.
            </p>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-[11px] font-extrabold tracking-widest text-[#34D399] uppercase">LINKS DE NAVEGAÇÃO</h3>
            <div className="flex flex-col gap-4 text-sm text-text-muted font-medium">
              <Link to="/" className="hover:text-brand-primary hover:translate-x-1 transition-all duration-300 w-fit">Início</Link>
              <Link to="/como-funciona" className="hover:text-brand-primary hover:translate-x-1 transition-all duration-300 w-fit">Como Funciona</Link>
              <Link to="/conteudos" className="hover:text-brand-primary hover:translate-x-1 transition-all duration-300 w-fit">Conteúdos</Link>
              <Link to="/sobre" className="hover:text-brand-primary hover:translate-x-1 transition-all duration-300 w-fit">Sobre nós</Link>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-[11px] font-extrabold tracking-widest text-brand-emergency uppercase">EMERGÊNCIA</h3>
            <div className="flex flex-col gap-4 text-sm text-text-muted font-medium">
              <p className="hover:text-white transition-colors cursor-default">190 - Polícia</p>
              <p className="hover:text-white transition-colors cursor-default">180 - Central da Mulher</p>
              <Link to="/chat" className="text-brand-emergency hover:text-[#ff6b6b] hover:translate-x-1 font-bold transition-all duration-300 w-fit flex items-center gap-2">
                 S.O.S. NIRA
              </Link>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-muted font-medium tracking-wide">© 2026 NIRA • Desenvolvido pela equipe E.Y.E.</p>
        </div>
      </footer>
    </div>
  );
}