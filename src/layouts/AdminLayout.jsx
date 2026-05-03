import { useEffect, useRef } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import { LayoutDashboard, AlertCircle, FileText, Users, Map as MapIcon, MessagesSquare, Home } from 'lucide-react';

export default function AdminLayout() {
  const location = useLocation();
  const scrollRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
    }
  }, [location.pathname]);


  const navLinks = [
    { name: 'Início', path: '/admin', icon: <Home size={18} />, roles: ['adm', 'ong', 'funcionario'] },
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={18} />, roles: ['adm'] },
    { name: 'Alertas S.O.S.', path: '/admin/alertas', icon: <AlertCircle size={18} />, roles: ['adm', 'funcionario'], espec: ['agente', 'policial'] },
  ];

  const manageLinks = [
    { name: 'Conteúdos', path: '/admin/conteudos', icon: <FileText size={18} />, roles: ['adm', 'ong'] },
    { name: 'Usuários & Profissionais', path: '/admin/usuarios', icon: <Users size={18} />, roles: ['adm'] },
    { name: 'Mapa / Equipes', path: '/admin/mapa', icon: <MapIcon size={18} />, roles: ['adm', 'funcionario'], espec: ['agente', 'policial'] },
    { name: 'Atendimentos', path: '/admin/atendimentos-chat', icon: <MessagesSquare size={18} />, roles: ['adm', 'funcionario'], espec: ['psicologo', 'assistente_social'] },
  ];

  const filterLinks = (links) => {
    return links.filter(link => {
      // Admin vê tudo
      if (user?.role === 'adm') return true;
      
      // Verifica se a role básica está permitida
      const rolePermitida = link.roles.includes(user?.role);
      if (!rolePermitida) return false;

      // Se for funcionário, verifica se a especialidade bate
      if (user?.role === 'funcionario' && link.espec) {
        return link.espec.includes(user?.especialidade);
      }

      return true;
    });
  };

  const filteredNav = filterLinks(navLinks);
  const filteredManage = filterLinks(manageLinks);

  const getRoleLabel = () => {
    if (!user) return 'SEM ACESSO';
    if (user.role === 'adm') return 'ADM - ADMINISTRADOR(A)';
    if (user.role === 'ong') return '🤝 - PARCEIRO ONG';
    if (user.role === 'funcionario') {
      const especs = {
        psicologo: '🧠 - PSICÓLOGO(A)',
        agente: '🛡️ - AGENTE DE CAMPO',
        policial: '👮 - FORÇA POLICIAL',
        assistente_social: '🏠 - ASSISTENTE SOCIAL'
      };
      return especs[user.especialidade] || '💼 - PROFISSIONAL';
    }
    return 'VISITANTE';
  };

  // Helper to map route path to header title
  const getHeaderTitle = () => {
    switch(location.pathname) {
      case '/admin': return 'Início';
      case '/admin/dashboard': return 'Dashboard';
      case '/admin/alertas': return 'Alertas S.O.S.';
      case '/admin/conteudos': return 'Gestão de Conteúdos';
      case '/admin/usuarios': return 'Usuários e profissionais';
      case '/admin/mapa': return 'Mapa e Equipes';
      case '/admin/atendimentos-chat': return 'Atendimentos Chat';
      default: return 'Visão Geral';
    }
  };

  return (
    <div className="flex h-screen bg-[#11111B] text-text-main overflow-hidden font-sans">
      
      {/* Sidebar */}
      <aside className="w-[280px] bg-bg-main border-r border-[#242436] flex flex-col flex-shrink-0 z-10 hidden md:flex">
        <div className="p-6 border-b border-[#242436] flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-primary/20 flex items-center justify-center rounded-full text-brand-primary shadow-lg">
            <span className="font-bold">N</span>
          </div>
          <h2 className="text-xl font-bold tracking-wide text-white">NIRA Admin</h2>
        </div>
        
        <div className="px-6 pb-6 pt-4 border-b border-[#242436]">
          <div className="px-3 py-1.5 border border-brand-primary/50 text-brand-primary rounded-full text-[10px] font-bold tracking-wider inline-block">
            {getRoleLabel()}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 no-scrollbar">
          
          {filteredNav.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-[10px] uppercase font-bold text-text-muted px-4 mb-3 tracking-widest">Principal</h3>
              {filteredNav.map(link => {
                const active = location.pathname === link.path;
                return (
                  <Link 
                    key={link.path} 
                    to={link.path} 
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-[#1E1E2E] text-white border-l-2 border-brand-primary' : 'text-text-muted hover:text-white hover:bg-white/5 border-l-2 border-transparent'}`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                )
              })}
            </div>
          )}

          {filteredManage.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-[10px] uppercase font-bold text-text-muted px-4 mb-3 tracking-widest">Gestão</h3>
              {filteredManage.map(link => {
                const active = location.pathname === link.path;
                return (
                  <Link 
                    key={link.path} 
                    to={link.path} 
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-[#1E1E2E] text-white border-l-2 border-brand-primary' : 'text-text-muted hover:text-white hover:bg-white/5 border-l-2 border-transparent'}`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                )
              })}
            </div>
          )}

        </div>

        <div className="p-4 mt-auto">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-text-muted hover:text-white hover:bg-white/5 transition-colors">
            <Home size={18} />
            Voltar
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden bg-bg-main-alt">
        {/* Top Header */}
        <header className="h-[90px] border-b border-[#242436] flex items-center justify-between px-8 bg-bg-main flex-shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            {location.pathname === '/admin/usuarios' && (
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <Users className="text-bg-main" size={24} />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">{getHeaderTitle()}</h1>
              <p className="text-xs text-text-muted mt-1 font-medium">NIRA Admin • E.Y.E 2026</p>
            </div>
          </div>

          <div className="flex items-center border border-[#163823] bg-[#0E1F15] text-[#34D399] px-4 py-2 rounded-full gap-2 shadow-inner">
            <div className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse"></div>
            <span className="text-sm font-semibold">Sistema online</span>
          </div>
        </header>

        {/* Scrollable Main Area (with Footer inside) */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto bg-bg-main-alt flex flex-col no-scrollbar">
          <main className="p-8 flex-grow relative">
            <Outlet />
          </main>
          
          {/* Admin Global Footer */}
          <footer className="bg-bg-main border-t border-[#242436] py-10 px-8 flex-shrink-0 mt-8">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <h2 className="text-lg font-bold tracking-widest text-white">NIRA</h2>
                <p className="text-text-muted text-xs leading-relaxed max-w-sm">
                  Núcleo de Identificação e Resposta ao Abuso. Um porto seguro digital para ouvir, acolher e proteger quem mais precisa.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xs font-bold tracking-widest text-white uppercase">LINKS DE NAVEGAÇÃO</h3>
                <div className="flex flex-col gap-2 text-xs text-text-muted">
                  <Link to="/" className="hover:text-brand-primary w-fit">Início</Link>
                  <Link to="/como-funciona" className="hover:text-brand-primary w-fit">Como Funciona</Link>
                  <Link to="/conteudos" className="hover:text-brand-primary w-fit">Conteúdos</Link>
                  <Link to="/sobre" className="hover:text-brand-primary w-fit">Sobre nós</Link>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-xs font-bold tracking-widest text-white uppercase">EMERGÊNCIA</h3>
                <div className="flex flex-col gap-2 text-xs text-text-muted">
                  <p>190 - Polícia</p>
                  <p>180 - Central da Mulher</p>
                  <Link to="/chat" className="text-brand-emergency font-semibold hover:text-brand-emergency-alt w-fit">S.O.S. NIRA</Link>
                </div>
              </div>
            </div>
            <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-[#242436]">
              <p className="text-[10px] text-text-muted text-left">© 2026 NIRA • Desenvolvido pela equipe E.Y.E.</p>
            </div>
          </footer>
        </div>

      </div>
    </div>
  );
}