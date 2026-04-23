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
  ShieldCheck
} from 'lucide-react';

const AdminHome = () => {
  const { user } = useAuth();
  
  const allCards = [
    {
      title: 'Dashboard',
      desc: 'Visão geral métricas, estatísticas e monitoramento em tempo real.',
      path: '/admin/dashboard',
      icon: <LayoutDashboard size={24} />,
      color: 'from-blue-500/20 to-indigo-500/20',
      borderColor: 'border-blue-500/30',
      iconColor: 'text-blue-400',
      roles: ['adm', 'ong']
    },
    {
      title: 'Alertas S.O.S.',
      desc: 'Gerenciamento de chamados de emergência e canais de ajuda ativa.',
      path: '/admin/alertas',
      icon: <AlertCircle size={24} />,
      color: 'from-red-500/20 to-orange-500/20',
      borderColor: 'border-red-500/30',
      iconColor: 'text-red-400',
      badge: '2 Novos',
      roles: ['adm', 'ong']
    },
    {
      title: 'Gerenciar Conteúdos',
      desc: 'Publicação de artigos, guias e materiais de apoio para a plataforma.',
      path: '/admin/conteudos',
      icon: <FileText size={24} />,
      color: 'from-emerald-500/20 to-teal-500/20',
      borderColor: 'border-emerald-500/30',
      iconColor: 'text-emerald-400',
      roles: ['adm', 'ong']
    },
    {
      title: 'Usuários & ONGs',
      desc: 'Controle de acesso, gestão de permissões e vínculo institucional.',
      path: '/admin/usuarios',
      icon: <Users size={24} />,
      color: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/30',
      iconColor: 'text-purple-400',
      roles: ['adm']
    },
    {
      title: 'Mapa de Equipes',
      desc: 'Localização geográfica e alocação de profissionais em campo.',
      path: '/admin/mapa',
      icon: <MapIcon size={24} />,
      color: 'from-amber-500/20 to-yellow-500/20',
      borderColor: 'border-amber-500/30',
      iconColor: 'text-amber-400',
      roles: ['adm', 'ong']
    },
    {
      title: 'Painel de Atendimento',
      desc: 'Interface unificada para chat psicológico e assistência direta.',
      path: '/admin/atendimentos-chat',
      icon: <MessagesSquare size={24} />,
      color: 'from-cyan-500/20 to-sky-500/20',
      borderColor: 'border-cyan-500/30',
      iconColor: 'text-cyan-400',
      roles: ['adm', 'ong']
    }
  ];

  const adminCards = allCards.filter(card => !card.roles || card.roles.includes(user?.role));

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-fade-in-up">
      {/* Header Seção */}
      <div className="relative overflow-hidden rounded-3xl bg-bg-secondary border border-border-subtle p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
        <div className="z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest">
            <ShieldCheck size={14} />
            Acesso Administrativo
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-white leading-tight">
            Bem-vindo ao Centro de <span className="text-brand-primary">Comando NIRA</span>
          </h2>
          <p className="text-text-muted max-w-xl text-lg">
            Selecione um dos módulos abaixo para gerenciar a plataforma, monitorar atendimentos ou configurar equipes de campo.
          </p>
        </div>
        
        <div className="relative group perspective-1000 hidden lg:block">
          <div className="w-48 h-48 bg-brand-primary/10 rounded-full flex items-center justify-center border border-brand-primary/20 group-hover:scale-105 transition-transform duration-500 shadow-glow shadow-brand-primary/20">
             <div className="w-32 h-32 bg-brand-primary/20 rounded-full flex items-center justify-center animate-pulse-slow">
                <LayoutDashboard className="text-brand-primary w-16 h-16" />
             </div>
          </div>
        </div>
        
        {/* Background Decorative */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-primary/10 rounded-full blur-[80px] pointer-events-none" />
      </div>

      {/* Grid de Atalhos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminCards.map((card, index) => (
          <Link 
            key={card.path} 
            to={card.path}
            className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.color} border ${card.borderColor} p-6 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 flex flex-col gap-4`}
          >
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-xl bg-bg-main/50 ${card.iconColor} border border-white/5`}>
                {card.icon}
              </div>
              {card.badge && (
                <span className="px-2 py-1 rounded-lg bg-brand-emergency/20 border border-brand-emergency/30 text-brand-emergency text-[10px] font-bold uppercase tracking-wider animate-pulse">
                  {card.badge}
                </span>
              )}
            </div>
            
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white group-hover:text-brand-primary transition-colors flex items-center gap-2">
                {card.title}
                <ArrowRight size={16} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {card.desc}
              </p>
            </div>

            {/* Micro-interaction hover effect */}
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500 text-white select-none pointer-events-none">
              {card.icon}
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10">
        {[
          { label: 'Usuárias Ativas', value: '1.2k', icon: <TrendingUp size={14} />, color: 'text-emerald-400' },
          { label: 'Casos em Aberto', value: '42', icon: <Activity size={14} />, color: 'text-orange-400' },
          { label: 'Profissionais Online', value: '18', icon: <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />, color: 'text-emerald-400' },
          { label: 'Tempo Médio Resposta', value: '4 min', icon: <ShieldCheck size={14} />, color: 'text-blue-400' },
        ].map(stat => (
          <div key={stat.label} className="bg-bg-secondary p-4 rounded-xl border border-border-subtle flex flex-col items-center text-center gap-1">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{stat.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-white">{stat.value}</span>
              <span className={stat.color}>{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
