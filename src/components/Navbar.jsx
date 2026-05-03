import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import { NiraContext } from '../context/NiraContext';
import { ChevronDown, LayoutDashboard, AlertCircle, FileText, Users, Map as MapIcon, MessagesSquare, LogOut, ShieldAlert, Home } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { addSOSAlert } = useContext(NiraContext);
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Como funciona', path: '/como-funciona' },
    { name: 'Conteúdos', path: '/conteudos' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'Login', path: '/login' },
  ];

  const adminLinks = [
    { name: 'Início', path: '/admin', icon: <Home size={14} />, roles: ['adm', 'ong', 'funcionario'] },
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={14} />, roles: ['adm'] },
    { name: 'Alertas S.O.S.', path: '/admin/alertas', icon: <AlertCircle size={14} />, roles: ['adm', 'funcionario'], espec: ['agente', 'policial'] },
    { name: 'Conteúdos', path: '/admin/conteudos', icon: <FileText size={14} />, roles: ['adm', 'ong'] },
    { name: 'Usuários/ONGs', path: '/admin/usuarios', icon: <Users size={14} />, roles: ['adm'] },
    { name: 'Mapa / Equipes', path: '/admin/mapa', icon: <MapIcon size={14} />, roles: ['adm', 'funcionario'], espec: ['agente', 'policial'] },
    { name: 'Atendimentos', path: '/admin/atendimentos-chat', icon: <MessagesSquare size={14} />, roles: ['adm', 'funcionario'], espec: ['psicologo', 'assistente_social'] },
  ];

  // Filter links based on user role and specialty
  const filteredAdminLinks = adminLinks.filter(link => {
    if (!user) return false;
    if (user.role === 'adm') return true;

    const rolePermitida = link.roles.includes(user.role);
    if (!rolePermitida) return false;

    if (user.role === 'funcionario' && link.espec) {
      return link.espec.includes(user.especialidade);
    }

    return true;
  });

  return (
    <nav className="w-full bg-[#11111B]/80 backdrop-blur-xl border-b border-white/5 py-4 px-8 fixed top-0 z-50 transition-all duration-300">
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
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-brand-primary rounded-full transform origin-left transition-transform duration-300 ease-out ${location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* Botão S.O.S - Sempre Visível */}
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

          {!user ? (
            <Link to="/chat" className="bg-brand-primary hover:bg-[#7a6cf0] text-white px-6 py-2.5 rounded-full text-[13px] font-bold tracking-wider transition-all duration-300 shadow-lg glow-primary">
              PsiTech
            </Link>
          ) : (
            <div className="relative">
              <button 
                onClick={() => setShowAdminMenu(!showAdminMenu)}
                className="flex items-center gap-2 bg-brand-primary hover:bg-[#7a6cf0] text-white px-6 py-2.5 rounded-full text-[13px] font-bold tracking-wider transition-all duration-300 shadow-lg glow-primary group"
              >
                ADM <ChevronDown size={14} className={`transition-transform duration-300 ${showAdminMenu ? 'rotate-180' : ''}`} />
              </button>

              {showAdminMenu && (
                <div 
                  className="absolute right-0 mt-3 w-56 bg-[#181825] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up z-[60]"
                  onMouseLeave={() => setShowAdminMenu(false)}
                >
                  <div className="p-3 border-b border-white/5 bg-white/5">
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-2">Logado como</p>
                    <p className="text-[12px] font-bold text-white px-2 mt-1 truncate">{user.nome}</p>
                  </div>
                  
                  <div className="p-2">
                    {filteredAdminLinks.map(link => (
                      <Link 
                        key={link.path}
                        to={link.path}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[12px] font-medium text-text-muted hover:text-white hover:bg-white/5 transition-all"
                        onClick={() => setShowAdminMenu(false)}
                      >
                        <span className="text-brand-primary">{link.icon}</span>
                        {link.name}
                      </Link>
                    ))}
                  </div>

                  <div className="p-2 border-t border-white/5 bg-black/20">
                    <button 
                      onClick={() => { logout(); navigate('/'); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[12px] font-bold text-brand-emergency hover:bg-brand-emergency/10 transition-all"
                    >
                      <LogOut size={14} />
                      Sair da conta
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
