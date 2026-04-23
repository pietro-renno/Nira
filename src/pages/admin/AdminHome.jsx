import React from 'react';
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
  TrendingUp,
  Activity,
  ShieldCheck,
  Zap,
  Globe,
  Lock
} from 'lucide-react';

const AdminHome = () => {
  const { user } = useAuth();
  
  const modules = [
    {
      title: 'Monitoramento S.O.S.',
      desc: 'Gestão crítica de acionamentos de emergência e triagem tática.',
      path: '/admin/alertas',
      icon: <AlertCircle size={22} />,
      color: 'from-[#FF4B4B] to-[#FF8E8E]',
      bg: 'rgba(255, 75, 75, 0.05)',
      roles: ['adm', 'ong'],
      badge: 'Ativo'
    },
    {
      title: 'GeoMonitor Ultra',
      desc: 'Visualização tática em tempo real de equipes e ocorrências.',
      path: '/admin/mapa',
      icon: <MapIcon size={22} />,
      color: 'from-[#F59E0B] to-[#FCD34D]',
      bg: 'rgba(245, 158, 11, 0.05)',
      roles: ['adm', 'ong']
    },
    {
      title: 'Central de Atendimento',
      desc: 'Apoio humano e chat psicológico de alta performance.',
      path: '/admin/atendimentos-chat',
      icon: <MessagesSquare size={22} />,
      color: 'from-brand-primary to-[#7a6cf0]',
      bg: 'rgba(139, 126, 250, 0.05)',
      roles: ['adm', 'ong']
    },
    {
      title: 'Controle de Acesso',
      desc: 'Gestão de identidades, ONGs e níveis de permissão.',
      path: '/admin/usuarios',
      icon: <Users size={22} />,
      color: 'from-[#A855F7] to-[#D946EF]',
      bg: 'rgba(168, 85, 247, 0.05)',
      roles: ['adm']
    },
    {
      title: 'Biblioteca Hub',
      desc: 'Curadoria de conteúdos, guias e protocolos de segurança.',
      path: '/admin/conteudos',
      icon: <FileText size={22} />,
      color: 'from-[#10B981] to-[#34D399]',
      bg: 'rgba(16, 185, 129, 0.05)',
      roles: ['adm', 'ong']
    },
    {
      title: 'Analytics Dashboard',
      desc: 'Métricas avançadas e relatórios de impacto da plataforma.',
      path: '/admin/dashboard',
      icon: <LayoutDashboard size={22} />,
      color: 'from-[#3B82F6] to-[#60A5FA]',
      bg: 'rgba(59, 130, 246, 0.05)',
      roles: ['adm', 'ong']
    }
  ];

  const filteredModules = modules.filter(m => !m.roles || m.roles.includes(user?.role));

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-fade-in-up">
      
      {/* ── HERO BANNER (REESTILIZADO) ── */}
      <section className="relative group perspective-1000">
         <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 via-transparent to-brand-primary/20 blur-[100px] opacity-30 group-hover:opacity-50 transition-opacity"></div>
         
         <div className="relative overflow-hidden bg-[#11111B]/80 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-12 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl">
            <div className="z-10 space-y-6 max-w-2xl text-center lg:text-left">
               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">
                  <ShieldCheck size={14} className="text-brand-primary" />
                  Terminal de Comando NIRA v2.0
               </div>
               <h2 className="text-4xl lg:text-6xl font-black tracking-tighter text-white leading-[1.1]">
                 Acelerando a <span className="bg-gradient-to-r from-brand-primary to-[#A855F7] bg-clip-text text-transparent">Proteção</span> que salva vidas.
               </h2>
               <p className="text-text-muted text-lg font-medium leading-relaxed opacity-80">
                 Bem-vindo de volta, <span className="text-white font-black">{user?.nome.split(' ')[0]}</span>. Sua central de inteligência está operacional e monitorando {alertsCountStub()} protocolos ativos no momento.
               </p>
               <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                  <Link to="/admin/alertas" className="bg-brand-primary hover:bg-[#7a6cf0] text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl glow-primary transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-2">
                     Ver Alertas Urgentes <ArrowRight size={16} />
                  </Link>
                  <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                     Configurações Base
                  </button>
               </div>
            </div>

            <div className="relative w-64 h-64 flex items-center justify-center">
               {/* Orbits */}
               <div className="absolute inset-0 border border-brand-primary/10 rounded-full animate-[spin_15s_linear_infinite]"></div>
               <div className="absolute inset-4 border border-brand-primary/5 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
               
               <div className="relative w-40 h-40 bg-brand-primary/10 rounded-full flex items-center justify-center border border-brand-primary/20 shadow-glow shadow-brand-primary/10 transition-transform duration-700 group-hover:scale-110">
                  <div className="relative z-10">
                     <ShieldCheck size={64} className="text-brand-primary animate-pulse" />
                  </div>
                  <div className="absolute inset-0 bg-brand-primary/20 rounded-full blur-2xl animate-pulse"></div>
               </div>
               
               {/* Floating Data Nodes */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-brand-primary rounded-full shadow-glow"></div>
               <div className="absolute bottom-10 right-0 w-2 h-2 bg-purple-500 rounded-full shadow-glow"></div>
            </div>
         </div>
      </section>

      {/* ── GRID DE MÓDULOS (MODERNIZADO) ── */}
      <section className="space-y-6">
         <div className="flex items-center justify-between px-4">
            <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em]">Módulos de Operação</h3>
            <span className="h-[1px] flex-1 mx-8 bg-white/5"></span>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((m, i) => (
              <Link 
                key={m.path}
                to={m.path}
                className="group relative overflow-hidden bg-[#11111B] border border-white/5 rounded-[2rem] p-8 flex flex-col gap-6 transition-all duration-300 hover:border-brand-primary/30 hover:-translate-y-2 hover:shadow-3xl"
              >
                 <div className="flex justify-between items-start">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${m.color} text-white shadow-lg`}>
                       {m.icon}
                    </div>
                    {m.badge && (
                      <span className="px-3 py-1 rounded-full bg-brand-emergency/10 border border-brand-emergency/20 text-brand-emergency text-[9px] font-black uppercase tracking-widest animate-pulse">
                         {m.badge}
                      </span>
                    )}
                 </div>

                 <div className="space-y-2">
                    <h4 className="text-xl font-bold text-white group-hover:text-brand-primary transition-colors">{m.title}</h4>
                    <p className="text-text-muted text-sm leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">
                      {m.desc}
                    </p>
                 </div>

                 <div className="mt-auto flex items-center gap-2 text-[10px] font-black text-brand-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                    Acessar Módulo <ArrowRight size={14} />
                 </div>

                 {/* Decoração Background */}
                 <div className="absolute -right-4 -bottom-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity scale-150 group-hover:scale-110 duration-500 text-white pointer-events-none">
                    {m.icon}
                 </div>
              </Link>
            ))}
         </div>
      </section>

      {/* ── LIVE FEED SUMMARY ── */}
      <section className="bg-white/5 border border-white/5 rounded-[2.5rem] p-4 lg:p-8">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Uso de CPU', value: '4%', color: 'text-emerald-400' },
              { label: 'Uptime Sistema', value: '99.9%', color: 'text-blue-400' },
              { label: 'Regiões Cobertas', value: 'São Paulo', color: 'text-white' },
              { label: 'API Status', value: 'Latência 12ms', color: 'text-emerald-400' }
            ].map(stat => (
              <div key={stat.label} className="bg-black/20 p-6 rounded-3xl border border-white/5 flex flex-col items-center text-center gap-1 group hover:border-brand-primary/20 transition-all">
                 <span className="text-[9px] font-black text-text-muted uppercase tracking-[0.2em]">{stat.label}</span>
                 <span className={`text-xl font-black ${stat.color}`}>{stat.value}</span>
              </div>
            ))}
         </div>
      </section>

    </div>
  );
};

// Stub function for visual only
const alertsCountStub = () => 14;

export default AdminHome;
