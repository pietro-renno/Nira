import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { NiraContext } from '../context/NiraContext';
import Footer from '../components/Footer';

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
      <Footer />
    </div>
  );
}