import React, { useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  AlertCircle,
  FileText,
  Users,
  Map as MapIcon,
  MessagesSquare,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

/* ─── Bento Card com efeitos Spline-style ─── */
const BentoCard = ({ module: m, index }) => {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});
  const [spotStyle, setSpotStyle] = useState({});
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -10;
    const rotY = ((x - cx) / cx) * 10;

    setStyle({
      transform: `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.025, 1.025, 1.025)`,
      transition: 'transform 0.08s ease-out',
    });

    setSpotStyle({
      background: `radial-gradient(260px circle at ${x}px ${y}px, rgba(139,126,250,0.18) 0%, transparent 70%)`,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    setStyle({ transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)', transition: 'transform 0.5s ease-out' });
    setSpotStyle({});
  }, []);

  const handleMouseEnter = useCallback(() => setHovered(true), []);

  return (
    <Link
      to={m.path}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="bento-card"
      style={{
        ...style,
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* Spotlight layer */}
      <div className="bento-spotlight" style={spotStyle} />

      {/* Gradient border animado */}
      <div className={`bento-border-glow ${hovered ? 'bento-border-glow--active' : ''}`} />

      {/* Conteúdo */}
      <div className="bento-inner">
        <div className="bento-header">
          <div
            className="bento-icon"
            style={{ background: `linear-gradient(135deg, ${m.colorFrom}, ${m.colorTo})` }}
          >
            {m.icon}
          </div>
          {m.badge && (
            <span className="bento-badge animate-pulse">
              {m.badge}
            </span>
          )}
        </div>

        <div className="bento-body">
          <h4 className={`bento-title ${hovered ? 'bento-title--hovered' : ''}`}
              style={{ '--hover-color': m.colorFrom }}>
            {m.title}
          </h4>
          <p className="bento-desc">{m.desc}</p>
        </div>

        <div className={`bento-cta ${hovered ? 'bento-cta--visible' : ''}`}>
          Acessar Módulo <ArrowRight size={14} />
        </div>

        {/* Ícone decorativo de fundo */}
        <div
          className={`bento-bg-icon ${hovered ? 'bento-bg-icon--hovered' : ''}`}
          style={{ color: m.colorFrom }}
        >
          {m.icon}
        </div>
      </div>
    </Link>
  );
};

/* ─── Página principal ─── */
const AdminHome = () => {
  const { user } = useAuth();
  
  // Se não houver usuário, não renderiza os blocos para evitar tela vazia
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-text-muted font-bold animate-pulse">
        Carregando painel de controle...
      </div>
    );
  }

  const modules = [
    {
      title: 'Monitoramento S.O.S.',
      desc: 'Gestão crítica de acionamentos de emergência e triagem tática.',
      path: '/admin/alertas',
      icon: <AlertCircle size={22} />,
      colorFrom: '#FF4B4B',
      colorTo: '#FF8E8E',
      roles: ['adm', 'funcionario'],
      espec: ['agente', 'policial'],
      badge: 'Ativo',
    },
    {
      title: 'GeoMonitor Ultra',
      desc: 'Visualização tática em tempo real de equipes e ocorrências.',
      path: '/admin/mapa',
      icon: <MapIcon size={22} />,
      colorFrom: '#F59E0B',
      colorTo: '#FCD34D',
      roles: ['adm', 'funcionario'],
      espec: ['agente', 'policial'],
    },
    {
      title: 'Central de Atendimento',
      desc: 'Apoio humano e chat psicológico de alta performance.',
      path: '/admin/atendimentos-chat',
      icon: <MessagesSquare size={22} />,
      colorFrom: '#8B7EFA',
      colorTo: '#7a6cf0',
      roles: ['adm', 'funcionario'],
      espec: ['psicologo', 'assistente_social'],
    },
    {
      title: 'Controle de Acesso',
      desc: 'Gestão de identidades, ONGs e níveis de permissão.',
      path: '/admin/usuarios',
      icon: <Users size={22} />,
      colorFrom: '#A855F7',
      colorTo: '#D946EF',
      roles: ['adm'],
    },
    {
      title: 'Biblioteca Hub',
      desc: 'Curadoria de conteúdos, guias e protocolos de segurança.',
      path: '/admin/conteudos',
      icon: <FileText size={22} />,
      colorFrom: '#10B981',
      colorTo: '#34D399',
      roles: ['adm', 'ong'],
    },
    {
      title: 'Analytics Dashboard',
      desc: 'Métricas avançadas e relatórios de impacto da plataforma.',
      path: '/admin/dashboard',
      icon: <LayoutDashboard size={22} />,
      colorFrom: '#3B82F6',
      colorTo: '#60A5FA',
      roles: ['adm'],
    },
  ];

  const filteredModules = modules.filter(m => {
    if (user?.role === 'adm') return true;
    const roleOk = m.roles?.includes(user?.role);
    if (!roleOk) return false;
    if (user?.role === 'funcionario' && m.espec) {
      return m.espec.includes(user?.especialidade);
    }
    return true;
  });

  const getHeroConfig = () => {
    if (user?.role === 'adm') return { label: 'Ver Alertas Urgentes', path: '/admin/alertas', desc: 'Sua central de inteligência está operacional e monitorando 14 protocolos ativos.' };
    if (user?.role === 'ong') return { label: 'Gerenciar Conteúdos', path: '/admin/conteudos', desc: 'Central de curadoria e apoio à rede de proteção.' };
    if (user?.role === 'funcionario') {
      if (['agente', 'policial'].includes(user.especialidade)) {
        return { label: 'Abrir Mapa Tático', path: '/admin/mapa', desc: 'Monitoramento em tempo real do setor central.' };
      }
      return { label: 'Central de Chat', path: '/admin/atendimentos-chat', desc: 'Inicie sessões de acolhimento e triagem humana.' };
    }
    return { label: 'Minha Área', path: '/admin', desc: 'Painel operacional.' };
  };

  const hero = getHeroConfig();

  return (
    <>
      {/* ── ESTILOS INLINE ── */}
      <style>{`
        /* ─ Animação de entrada ─ */
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes borderSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* ─ Card base ─ */
        .bento-card {
          position: relative;
          display: flex;
          flex-direction: column;
          background: #11111B;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 2rem;
          overflow: hidden;
          text-decoration: none;
          cursor: pointer;
          transform-style: preserve-3d;
          will-change: transform;
          opacity: 0;
          animation: fadeSlideUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* ─ Spotlight (segue o cursor) ─ */
        .bento-spotlight {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          transition: opacity 0.25s;
          border-radius: inherit;
        }

        /* ─ Borda gradiente giratória ─ */
        .bento-border-glow {
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          padding: 1px;
          background: transparent;
          z-index: 0;
          transition: opacity 0.3s;
        }
        .bento-border-glow--active::before {
          content: '';
          position: absolute;
          inset: -120%;
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            rgba(139,126,250,0.7) 60deg,
            rgba(168,85,247,0.5) 120deg,
            transparent 180deg,
            transparent 360deg
          );
          animation: borderSpin 3s linear infinite;
          border-radius: inherit;
        }
        .bento-border-glow--active::after {
          content: '';
          position: absolute;
          inset: 1px;
          background: #11111B;
          border-radius: calc(2rem - 1px);
        }

        /* ─ Conteúdo interno ─ */
        .bento-inner {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 2rem;
          height: 100%;
        }

        .bento-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        /* ─ Ícone ─ */
        .bento-icon {
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          flex-shrink: 0;
        }
        .bento-card:hover .bento-icon {
          transform: translateY(-3px) scale(1.07);
          box-shadow: 0 16px 32px rgba(0,0,0,0.4);
        }

        /* ─ Badge ─ */
        .bento-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          background: rgba(255, 80, 80, 0.12);
          border: 1px solid rgba(255, 80, 80, 0.25);
          color: #FF6B6B;
          font-size: 0.55rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        /* ─ Texto ─ */
        .bento-body {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
        }

        .bento-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: white;
          transition: color 0.3s;
          margin: 0;
        }
        .bento-title--hovered {
          color: var(--hover-color, #8B7EFA);
        }

        .bento-desc {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.4);
          line-height: 1.6;
          margin: 0;
          transition: color 0.3s;
        }
        .bento-card:hover .bento-desc {
          color: rgba(255,255,255,0.65);
        }

        /* ─ CTA ─ */
        .bento-cta {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.6rem;
          font-weight: 900;
          color: #8B7EFA;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.3s ease, transform 0.3s ease;
          margin-top: auto;
        }
        .bento-cta--visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ─ Ícone decorativo de fundo ─ */
        .bento-bg-icon {
          position: absolute;
          right: -0.75rem;
          bottom: -0.75rem;
          font-size: 7rem;
          opacity: 0.025;
          transform: scale(1.5);
          pointer-events: none;
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .bento-bg-icon--hovered {
          opacity: 0.07;
          transform: scale(1.2);
        }

        /* ─ Grid de módulos ─ */
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1024px) {
          .bento-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .bento-grid { grid-template-columns: 1fr; }
        }

        /* ─ Stats bar ─ */
        .stat-bar-item {
          background: rgba(0,0,0,0.25);
          padding: 1.5rem;
          border-radius: 1.5rem;
          border: 1px solid rgba(255,255,255,0.04);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.25rem;
          transition: border-color 0.3s;
        }
        .stat-bar-item:hover {
          border-color: rgba(139,126,250,0.2);
        }
      `}</style>

      <div className="max-w-7xl mx-auto space-y-12 animate-fade-in-up">

        {/* ── KPI STATS (Os blocos que o usuário sentiu falta) ── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {[
             { label: 'S.O.S. Ativos', value: '06', icon: <AlertCircle size={20} />, color: 'text-brand-emergency', bg: 'bg-brand-emergency/10' },
             { label: 'Equipes Campo', value: '08', icon: <Users size={20} />, color: 'text-brand-primary', bg: 'bg-brand-primary/10' },
             { label: 'ONGs Parceiras', value: '02', icon: <ShieldCheck size={20} />, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
             { label: 'Zonas Ativas', value: '05', icon: <MapIcon size={20} />, color: 'text-amber-400', bg: 'bg-amber-400/10' },
           ].map((stat, i) => (
             <div key={i} className="glass-panel p-6 rounded-3xl border-white/5 flex items-center gap-5 hover:border-white/10 transition-all group">
                <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                   {stat.icon}
                </div>
                <div>
                   <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">{stat.label}</p>
                   <p className="text-2xl font-black text-white">{stat.value}</p>
                </div>
             </div>
           ))}
        </div>

        {/* ── HERO BANNER ── */}
        <section className="relative group perspective-1000">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 via-transparent to-brand-primary/20 blur-[100px] opacity-30 group-hover:opacity-50 transition-opacity" />

          <div className="relative overflow-hidden bg-[#11111B]/80 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-12 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl">
            <div className="z-10 space-y-6 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">
                <ShieldCheck size={14} className="text-brand-primary" />
                Terminal de Comando NIRA v2.0
              </div>
              <h2 className="text-4xl lg:text-6xl font-black tracking-tighter text-white leading-[1.1]">
                Acelerando a{' '}
                <span className="bg-gradient-to-r from-brand-primary to-[#A855F7] bg-clip-text text-transparent">
                  Proteção
                </span>{' '}
                que salva vidas.
              </h2>
              <p className="text-text-muted text-lg font-medium leading-relaxed opacity-80">
                Bem-vindo de volta,{' '}
                <span className="text-white font-black">{user?.nome.split(' ')[0]}</span>. {hero.desc}
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                <Link
                  to={hero.path}
                  className="bg-brand-primary hover:bg-[#7a6cf0] text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-2"
                >
                  {hero.label} <ArrowRight size={16} />
                </Link>
                <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                  Configurações Base
                </button>
              </div>
            </div>

            <div className="relative w-64 h-64 flex items-center justify-center">
              <div className="absolute inset-0 border border-brand-primary/10 rounded-full animate-[spin_15s_linear_infinite]" />
              <div className="absolute inset-4 border border-brand-primary/5 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
              <div className="relative w-40 h-40 bg-brand-primary/10 rounded-full flex items-center justify-center border border-brand-primary/20 transition-transform duration-700 group-hover:scale-110">
                <ShieldCheck size={64} className="text-brand-primary animate-pulse relative z-10" />
                <div className="absolute inset-0 bg-brand-primary/20 rounded-full blur-2xl animate-pulse" />
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-brand-primary rounded-full" />
              <div className="absolute bottom-10 right-0 w-2 h-2 bg-purple-500 rounded-full" />
            </div>
          </div>
        </section>

        {/* ── GRID DE MÓDULOS ── */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-4">
            <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em]">
              Módulos de Operação
            </h3>
            <span className="h-[1px] flex-1 mx-8 bg-white/5" />
          </div>

          <div className="bento-grid">
            {filteredModules.map((m, i) => (
              <BentoCard key={m.path} module={m} index={i} />
            ))}
          </div>
        </section>

        {/* ── LIVE FEED SUMMARY ── */}
        <section className="bg-white/5 border border-white/5 rounded-[2.5rem] p-4 lg:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Uso de CPU',      value: '4%',          color: 'text-emerald-400' },
              { label: 'Uptime Sistema',  value: '99.9%',       color: 'text-blue-400' },
              { label: 'Regiões Cobertas', value: 'São Paulo',  color: 'text-white' },
              { label: 'API Status',      value: 'Latência 12ms', color: 'text-emerald-400' },
            ].map((stat) => (
              <div key={stat.label} className="stat-bar-item">
                <span className="text-[9px] font-black text-text-muted uppercase tracking-[0.2em]">
                  {stat.label}
                </span>
                <span className={`text-xl font-black ${stat.color}`}>{stat.value}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
};

const alertsCountStub = () => 14;

export default AdminHome;