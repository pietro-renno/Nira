import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, 
  MessageSquare, 
  Zap, 
  Users, 
  HeartHandshake, 
  PieChart, 
  ArrowRight, 
  Lock, 
  CheckCircle2, 
  HelpCircle,
  EyeOff,
  BellRing
} from 'lucide-react';

const STAGES = [
  {
    id: '01',
    title: 'Silêncio e Segurança',
    subtitle: 'O Primeiro Contato',
    desc: 'O acesso à Nira é totalmente anônimo. Não pedimos CPF, nome ou telefone. O sistema foi desenhado para ser acessado em momentos de vulnerabilidade, com um botão de "Saída Rápida" sempre visível para proteger sua privacidade caso alguém se aproxime.',
    icon: <EyeOff size={32} />,
    color: 'from-blue-500 to-cyan-400',
    features: ['Zero Logs de IP', 'Sem Cadastro Prévio', 'Modo Furtivo']
  },
  {
    id: '02',
    title: 'Triagem Humanizada',
    subtitle: 'Escuta Ativa Digital',
    desc: 'Nosso chatbot acolhedor realiza uma triagem estruturada através de uma conversa fluida. Ele identifica o nível de risco, o tipo de abuso (psicológico, físico, patrimonial) e prepara o terreno para o suporte necessário, sem julgamentos.',

    icon: <MessageSquare size={32} />,
    color: 'from-brand-primary to-purple-500',
    features: ['Linguagem Acolhedora', 'Protocolo Científico', 'Triagem Automática']
  },
  {
    id: '03',
    title: 'Resposta Imediata',
    subtitle: 'Ação em Tempo Real',
    desc: 'Se o risco for alto, o botão S.O.S. entra em cena. Com um toque, sua localização é enviada para as equipes de pronta resposta. Caso contrário, você é conectada a uma psicóloga ou assistente social da nossa rede no mesmo chat.',
    icon: <Zap size={32} />,
    color: 'from-brand-emergency to-orange-500',
    features: ['Alerta Silencioso', 'Geolocalização Ativa', 'Conexão com Especialistas']
  },
  {
    id: '04',
    title: 'Cuidado Contínuo',
    subtitle: 'A Rede de Apoio',
    desc: 'O suporte não termina no chat. A Nira mapeia e encaminha você para a rede de proteção física mais próxima: ONGs parceiras, delegacias da mulher e abrigos, garantindo que o acolhimento se transforme em segurança real.',
    icon: <HeartHandshake size={32} />,
    color: 'from-emerald-500 to-teal-400',
    features: ['Mapeamento de ONGs', 'Encaminhamento VIP', 'Dados para Gestores']
  }
];

export default function ComoFunciona() {
  return (
    <div className="bg-bg-main text-text-main min-h-screen font-sans overflow-hidden">
      
      {/* ── HERO SECTION ── */}
      <section className="relative pt-28 pb-20 px-8 overflow-hidden">

        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-purple-500/10 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
        </div>

        <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="px-4 py-1.5 bg-brand-primary/10 border border-brand-primary/20 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary mb-6 inline-block">
              Arquitetura de Proteção
            </span>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-8 text-white">
              Simples por fora. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-purple-400 to-white">
                Poderoso por dentro.
              </span>
            </h1>
            <p className="text-xl text-text-muted max-w-3xl mx-auto font-light leading-relaxed">
              O ecossistema Nira combina um chatbot acolhedor com uma rede de especialistas humanos para criar uma ponte segura entre a dor e a proteção.
            </p>

          </motion.div>
        </div>
      </section>

      {/* ── PILARES SECTION ── */}
      <section className="py-24 px-8 relative bg-bg-main-alt/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: <Shield className="text-brand-primary" />, title: 'Privacidade Radical', desc: 'Sua identidade é protegida por criptografia e protocolos de anonimato total.' },
            { icon: <Zap className="text-brand-emergency" />, title: 'Velocidade Crítica', desc: 'Segundos salvam vidas. Nossa resposta é instantânea e automatizada.' },
            { icon: <Users className="text-emerald-400" />, title: 'Rede Humana', desc: 'A tecnologia é a ponte, mas o destino final é sempre o acolhimento humano.' }
          ].map((pillar, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 mb-2">
                {pillar.icon}
              </div>
              <h3 className="text-xl font-bold text-white">{pillar.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed font-light">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── THE JOURNEY SECTION ── */}
      <section className="py-20 px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-left">

            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">A Jornada do Acolhimento</h2>
            <div className="h-1.5 w-32 bg-brand-primary rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {STAGES.map((stage, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 blur-xl z-0 rounded-[2.5rem]" 
                     style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }} 
                />
                <div className="relative glass-card p-10 md:p-14 rounded-[2.5rem] border border-white/5 flex flex-col h-full z-10 hover:border-white/20 transition-all">
                  <div className="flex justify-between items-start mb-10">
                    <div className={`p-5 rounded-2xl bg-gradient-to-br ${stage.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                      {stage.icon}
                    </div>
                    <span className="text-7xl font-black text-white/5 tracking-tighter group-hover:text-white/10 transition-colors">
                      {stage.id}
                    </span>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <p className="text-xs font-bold text-brand-primary uppercase tracking-widest">{stage.subtitle}</p>
                    <h3 className="text-2xl font-black text-white group-hover:text-brand-primary transition-colors">{stage.title}</h3>
                    <p className="text-text-muted text-base font-light leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>

                  <div className="mt-auto pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {stage.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[10px] font-bold text-white/60 uppercase tracking-tighter">
                        <CheckCircle2 size={12} className="text-brand-primary" />
                        {feat}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH & HUMAN DIVIDER ── */}
      <section className="py-8 bg-gradient-to-b from-transparent via-brand-primary/5 to-transparent relative">

        <div className="max-w-5xl mx-auto px-8 text-center space-y-12">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-[#181825] border border-white/10 rounded-full shadow-2xl">
            <div className="flex -space-x-3">
              <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center border-2 border-[#11111B]"><Zap size={14} /></div>
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center border-2 border-[#11111B]"><Users size={14} /></div>
            </div>
            <p className="text-sm font-bold text-white tracking-tight">Chatbot + Especialistas = Proteção de Ponta a Ponta</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">Por que usamos um Chatbot?</h2>
          <p className="text-lg text-text-muted font-light leading-relaxed max-w-3xl mx-auto">
            O chatbot não substitui o humano, ele o escala. Em casos de abuso, a vítima muitas vezes sente vergonha ou medo de ser julgada. O sistema oferece um espaço de desabafo imediato, 24/7, que prepara a vítima emocionalmente para o contato com a psicóloga humana, filtrando urgências e salvando vidas.
          </p>
        </div>
      </section>


      {/* ── FAQ SHORTCUT ── */}
      <section className="py-8 px-8">


        <div className="max-w-4xl mx-auto glass-panel p-12 md:p-20 rounded-[3rem] border border-brand-primary/20 relative overflow-hidden text-center group">
          <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
            <HelpCircle size={200} />
          </div>
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl font-black text-white tracking-tight">Ainda tem dúvidas?</h2>
            <p className="text-lg text-text-muted font-light max-w-xl mx-auto">
              Nossa central de ajuda e perguntas frequentes está sempre atualizada com as diretrizes das principais ONGs de proteção.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <Link to="/sobre" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-bold transition-all">
                Conhecer a Equipe
              </Link>
              <Link to="/" className="px-8 py-4 bg-brand-primary hover:bg-brand-primary/80 rounded-full text-sm font-bold text-white transition-all shadow-lg glow-primary flex items-center justify-center gap-2">
                Voltar ao Início <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="pb-12 px-8">


        <div className="max-w-7xl mx-auto bg-gradient-to-r from-brand-primary to-purple-600 rounded-[3rem] p-12 md:p-24 text-center space-y-10 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10" />
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="relative z-10 space-y-6"
          >
            <BellRing size={64} className="mx-auto text-white/80 animate-bounce mb-8" />
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter">Não espere o pior acontecer.</h2>
            <p className="text-xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed">
              Dê o primeiro passo rumo à sua segurança hoje. É rápido, é anônimo e é o começo da sua nova história.
            </p>
            <div className="pt-10">
              <Link to="/chat" className="inline-flex items-center gap-4 bg-white text-brand-primary px-10 py-5 rounded-full text-lg font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl">
                <Lock size={20} /> Iniciar Triagem Agora
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}