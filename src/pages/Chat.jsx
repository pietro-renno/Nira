import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, User, AlertTriangle, MessageSquare, BookOpen, MapPin,
  Lock, Send, RefreshCcw, ArrowLeft
} from 'lucide-react';

/* ─── CSS TEMA DARK IMERSIVO (Corrigido para Fixed e No-Page-Scroll) ─── */
const css = `
/* Prende a página inteira, a tela nunca desce *//* Estilo "Nav Fixa" absoluta */
.chat-page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background-color: #111119;
  display: flex;
  font-family: 'Inter', 'Segoe UI', 'Poppins', sans-serif;
  overflow: hidden;
}

.chat-wrap {
  display: grid;
  grid-template-columns: 290px 1fr;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* ── SIDEBAR (Histórico / Nav Fixa) ── */
.chat-sidebar {
  background: #111119;
  border-right: 1px solid rgba(155,143,255,0.08);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
.chat-sidebar__head {
  padding: 24px 20px 16px;
  flex-shrink: 0;
}
.chat-sidebar__back-btn {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: .75rem; font-weight: 600; color: rgba(255,255,255,0.4);
  text-decoration: none; margin-bottom: 24px; transition: color .2s;
}
.chat-sidebar__back-btn:hover { color: #8A7EF8; }

.chat-sidebar__title {
  font-weight: 700;
  font-size: .65rem;
  color: #8B8A9A;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 16px;
}
.chat-sidebar__new {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  background: rgba(139,126,250, 0.05);
  border: 1px solid rgba(139,126,250, 0.35);
  border-radius: 20px;
  padding: 12px 16px;
  font-size: .85rem;
  font-weight: 500;
  color: rgba(255,255,255,0.4);
  cursor: pointer;
  transition: all .2s;
  text-align: left;
}
.chat-sidebar__new:hover {
  background: rgba(139,126,250, 0.15);
  color: #8A7EF8;
}

.chat-sidebar__list {
  flex: 1;
  overflow-y: auto;
  padding: 0 10px;
}
.chat-sidebar__list::-webkit-scrollbar { width: 3px; }
.chat-sidebar__list::-webkit-scrollbar-thumb { background: rgba(107,104,152,.3); border-radius: 3px; }

.chat-hist-item {
  padding: 14px 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: all .2s;
  margin-bottom: 8px;
  border: 1px solid transparent;
}
.chat-hist-item:hover:not(.chat-hist-item--active) { background: rgba(255,255,255,0.02); }
.chat-hist-item--active {
  background: rgba(139,126,250, 0.1);
  border-color: rgba(139,126,250, 0.2);
}
.chat-hist-item__title {
  font-size: .85rem; font-weight: 600; color: #fff; margin-bottom: 4px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.chat-hist-item__sub {
  font-size: .75rem; color: rgba(255,255,255,0.4);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px;
}
.chat-hist-item__date {
  font-size: .65rem; color: rgba(255,255,255,0.25);
}

.chat-sidebar__anon {
  padding: 24px 20px; border-top: 1px solid rgba(155,143,255,0.08);
  display: flex; gap: 12px; align-items: flex-start;
  flex-shrink: 0;
}
.chat-sidebar__anon-icon svg { width:18px; height:18px; stroke:rgba(255,255,255,0.8); }
.chat-sidebar__anon-text { font-size: .7rem; color: rgba(255,255,255,0.4); line-height: 1.5; font-weight: 500; }

/* ── CHAT PRINCIPAL ── */
.chat-main {
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
  background: #111119;
}

.chat-header {
  padding: 18px 24px;
  border-bottom: 1px solid rgba(155,143,255,0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  z-index: 10;
}
.chat-header__info { display: flex; align-items: center; gap: 12px; }
.chat-header__avatar {
  width: 44px; height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(155,143,255,0.15));
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 0 20px rgba(139,126,250,0.1);
}
.chat-header__avatar svg { width:22px; height:22px; stroke:#A491FF; fill:none; }
.chat-header__name { font-weight: 700; font-size: 1rem; color: #fff; margin-bottom: 2px; }
.chat-header__status { display: flex; align-items: center; gap: 6px; font-size: .75rem; color: #2ED573; font-weight: 500; }
.chat-header__status-dot { width: 6px; height: 6px; border-radius: 50%; background: #2ED573; animation: glowPulse 2s ease-in-out infinite; }

.chat-header__actions { display: flex; gap: 10px; }
.chat-header__btn {
  background: transparent; border: 1px solid rgba(155,143,255,0.25);
  color: rgba(255,255,255,0.8); padding: 10px 16px; border-radius: 8px; font-size: .8rem; font-weight: 500; cursor: pointer; transition: all .2s;
  display: flex; align-items: center; gap: 6px;
}
.chat-header__btn:hover { background: rgba(155,143,255,0.1); color: #fff; }
.chat-header__btn--danger { background: rgba(255, 71, 87, 0.1); border-color: rgba(255,71,87,0.3); color: #FF4757; }
.chat-header__btn--danger:hover { background: #FF4757; color: #fff; }

/* ── CAIXAS E MENSAGENS ISOLADAS DA ROLAGEM ── */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 40px 0 160px; /* Previne encobrir Input Bottom */
  display: flex; flex-direction: column; align-items: center; gap: 24px;
}
/* Estilo Personalizado de Scroll pra não estourar */
.chat-messages::-webkit-scrollbar { width: 6px; }
.chat-messages::-webkit-scrollbar-thumb { background: rgba(155,143,255,0.2); border-radius: 6px; }

.chat-date-sep {
  width: 100%; max-width: 800px; margin: 0 auto; text-align: center;
  font-size: .75rem; color: rgba(255,255,255,0.2); font-weight: 600;
  position: relative;
}
.chat-date-sep::before, .chat-date-sep::after {
  content:''; position: absolute; top:50%; width: 45%; height: 1px; background: rgba(255,255,255,0.05);
}
.chat-date-sep::before { left: 0; }
.chat-date-sep::after { right: 0; }

.chat-msg {
  width: 100%; max-width: 800px; display: flex; gap: 16px; padding: 0 20px;
  animation: msgIn .25s ease both;
}
.chat-msg--ia   { align-items: flex-start; }
.chat-msg--user { justify-content: flex-end; align-items: flex-start; }

.chat-msg__avatar {
  width: 42px; height: 42px; border-radius: 50%;
  background: #A491FF; display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; margin-top: 4px; box-shadow: 0 0 15px rgba(164,145,255,0.3);
}
.chat-msg__avatar svg { width:20px; height:20px; stroke:#fff; fill:none; stroke-width:2.2; }
.chat-msg--user .chat-msg__avatar { background: rgba(164,145,255,0.5); box-shadow: none; }

.chat-msg__bubble {
  background: rgba(164,145,255,0.05);
  border: 1px solid rgba(164,145,255,0.2);
  padding: 16px 20px; border-radius: 12px;
  color: #D1D5DB; font-size: .95rem; line-height: 1.6;
}
.chat-msg--user .chat-msg__bubble { text-align: left; }

.chat-options { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 16px; width: 100%; }
.chat-option-btn {
  background: transparent; border: 1px solid rgba(255,255,255,0.15);
  color: #D1D5DB; padding: 10px 16px; border-radius: 20px; font-size: .85rem; font-weight: 500; cursor: pointer; transition: all .2s;
}
.chat-option-btn:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.3); }

.chat-msg__time {
  font-size: .65rem; color: rgba(255,255,255,0.3); margin-top: 8px; font-weight: 500;
}
.chat-msg--user .chat-msg-col { display: flex; flex-direction: column; align-items: flex-end; }
.chat-msg--user .chat-msg__bubble { max-width: 600px; }
.chat-msg--ia .chat-msg__bubble   { max-width: 650px; }

/* Typing */
.chat-typing { display: flex; gap: 16px; align-items: center; align-self: flex-start; max-width: 800px; padding: 0 20px; width: 100%; margin: 0 auto; }
.chat-typing__avatar { width: 42px; height: 42px; border-radius: 50%; background: #A491FF; display: flex; align-items: center; justify-content: center; }
.chat-typing__dots { display: flex; gap: 5px; padding: 16px 20px; background: rgba(164,145,255,0.05); border: 1px solid rgba(164,145,255,0.2); border-radius: 12px;}
.chat-typing__dot { width: 7px; height: 7px; border-radius: 50%; background: rgba(155,143,255,.7); animation: typing 1.2s infinite; }
.chat-typing__dot:nth-child(2) { animation-delay: .2s; } .chat-typing__dot:nth-child(3) { animation-delay: .4s; }
@keyframes typing { 0%,60%,100% {transform:translateY(0); opacity:.3;} 30% {transform:translateY(-6px); opacity:1;} }

/* Risk Card */
.chat-risk-card {
  background: rgba(45,43,78,.7); border: 1px solid rgba(107,104,152,.25); border-radius: 12px; padding: 18px 20px; margin-top: 12px; max-width: 500px;
}
.chat-risk-card__label { font-size: .65rem; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: .1em; margin-bottom: 8px; }
.chat-risk-card__level { display: inline-flex; align-items: center; gap: 7px; border-radius: 100px; padding: 5px 14px; font-size: .75rem; font-weight: 700; margin-bottom: 12px; }
.chat-risk-card__level--alto  { background: rgba(255,71,87,.18);  border: 1px solid rgba(255,71,87,.35);  color: #FF4757; }
.chat-risk-card__level--medio { background: rgba(255,200,0,.14);  border: 1px solid rgba(255,200,0,.3);   color: #FFC800; }
.chat-risk-card__level--baixo { background: rgba(46,213,115,.12); border: 1px solid rgba(46,213,115,.28); color: #2ED573; }
.chat-risk-card__actions { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 14px; }
.chat-risk-btn { display:flex; align-items:center; gap:5px; padding:10px 14px; border-radius:8px; font-size:.8rem; cursor:pointer; font-weight:bold; }
.btn-r-sos { background: rgba(255,71,87,0.15); color: #FF4757; border: 1px solid rgba(255,71,87,0.3); }

/* SOS FLOTUANTE (Bottom Isolado) */
.chat-sos-float { position: absolute; bottom: 120px; right: 24px; display: flex; align-items: center; gap: 8px; background: rgba(255,71,87,.14); border: 1.5px solid rgba(255,71,87,.4); border-radius: 100px; padding: 9px 18px; cursor: pointer; transition: all .25s; font-weight: 700; font-size: .78rem; color: #FF4757; box-shadow: 0 4px 20px rgba(255,71,87,.2); z-index: 50; animation: glowPulse 2.5s infinite; }

/* INPUT */
.chat-input-area {
  position: absolute; bottom: 0; left: 0; right: 0; display: flex; flex-direction: column; align-items: center;
  background: linear-gradient(to top, rgba(17,17,25,1) 50%, rgba(17,17,25,0)); padding: 0 24px 20px;
  z-index: 20;
}
.chat-input-wrap {
  width: 100%; max-width: 800px; background: rgba(164,145,255,0.03); border: 1px solid rgba(164,145,255,0.25);
  border-radius: 12px; display: flex; align-items: center; padding: 8px 12px; transition: all .3s;
  box-shadow: 0 8px 30px rgba(0,0,0,0.5);
}
.chat-input-wrap:focus-within { border-color: rgba(164,145,255,0.5); box-shadow: 0 0 30px rgba(164,145,255,0.1); background: rgba(164,145,255,0.07); }
.chat-input { flex: 1; background: none; border: none; outline: none; color: #fff; padding: 8px; font-size: .95rem; font-family: 'Inter', sans-serif; resize: none; min-height: 24px; max-height: 120px; }
.chat-input::placeholder { color: rgba(255,255,255,0.25); }
.chat-send-btn { background: #8A7EF8; border: none; width: 44px; height: 44px; border-radius: 8px; color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all .2s; flex-shrink: 0; margin-left: 10px; }
.chat-send-btn:hover { background: #A491FF; transform: translateY(-2px); }
.chat-send-btn:disabled { opacity: .4; cursor: not-allowed; transform: none; background: rgba(255,255,255,0.1); }
.chat-input-hint { text-align: center; font-size: .7rem; color: rgba(255,255,255,0.3); margin-top: 12px; display:flex; align-items:center; gap:6px; justify-content:center; }

/* WELCOME */
.chat-welcome { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px 24px; z-index: 5; }
.chat-welcome__owl svg { width:60px; height:60px; stroke:#A491FF; margin-bottom:20px; animation: float 4s infinite;}
.chat-welcome__title { font-size: 1.6rem; font-weight: 700; color: #F4F6F8; margin-bottom: 12px; }
.chat-welcome__sub { font-size: .95rem; color: rgba(255,255,255,0.5); line-height: 1.6; max-width: 500px; margin-bottom: 30px; }
.chat-welcome__starts { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }
.chat-welcome__start { background: rgba(164,145,255,0.05); border: 1px solid rgba(164,145,255,0.2); border-radius: 12px; padding: 18px; cursor: pointer; transition: all .2s; text-align: left; width: 220px; }
.chat-welcome__start:hover { border-color: rgba(164,145,255,0.4); background: rgba(164,145,255,0.08); transform: translateY(-2px); }
.chat-welcome__start-icon { margin-bottom: 12px; display:flex; align-items:center; justify-content:center; width:42px; height:42px; border-radius:8px; background:rgba(164,145,255,0.1); }
.chat-welcome__start-icon svg { width:20px; height:20px; stroke:#A491FF; }
.chat-welcome__start-title { font-size: .9rem; font-weight: 600; color: #fff; margin-bottom: 6px; }
.chat-welcome__start-desc  { font-size: .75rem; color: rgba(255,255,255,0.4); line-height: 1.5; }

@keyframes glowPulse { 0%, 100% { opacity:.6; transform:scale(1);} 50% {opacity:1; transform:scale(1.1);} }
@keyframes msgIn { 0% { opacity:0; transform:translateY(10px); } 100% { opacity:1; transform:translateY(0); } }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

.chat-header__back-mob { display:none; color: rgba(255,255,255,0.6); margin-right: 10px; text-decoration:none; }
.chat-header__back-mob:hover { color: #fff; }

@media (max-width: 900px) {
  .chat-wrap { grid-template-columns: 1fr; }
  .chat-sidebar { display: none; }
  .chat-msg { padding: 0 16px; }
  .chat-header__back-mob { display: block; }
}
`;

/* ─── Fluxo de perguntas ─── */
const FLOW = [
  {
    id: 'start',
    msg: 'Olá. Bem-vinda ao espaço de acolhimento da Nira.\n\nEste ambiente é totalmente seguro e anônimo. Não registramos nenhum dado pessoal.\n\nComo posso ajudar você neste momento?',
    options: [
      { text: 'Estou em perigo imediato',        next: 'perigo'   },
      { text: 'Preciso conversar',             next: 'conversar' },
      { text: 'Desejo entender meus direitos', next: 'direitos' },
      { text: 'Busco apoio na minha região',     next: 'servicos' },
    ],
  },
  {
    id: 'perigo',
    msg: 'Compreendo. Sua segurança é a nossa maior preocupação agora.\n\nVocê tem condições de acionar o botão de S.O.S. vermelho na tela? Ele enviará sua localização discretamente para nossa equipe de apoio.\n\nCaso possa fazer uma ligação: disque 190 (Polícia Militar) ou 180 (Central da Mulher).',
    options: [
      { text: 'Ativar S.O.S. agora',         next: 'sos_ativo'  },
      { text: 'Estou em um local seguro agora', next: 'seguro'     },
    ],
    risco: 'alto',
  },
  {
    id: 'sos_ativo',
    msg: 'Alerta acionado. Nossa rede de apoio recebeu a notificação da sua localização.\n\nPermaneça em local seguro, se possível com as portas trancadas. Uma profissional humana fará contato por aqui em instantes.',
    options: [
      { text: 'Aguardando atendimento', next: 'aguardando' },
    ],
    risco: 'alto',
  },
  {
    id: 'aguardando',
    msg: 'Nossa equipe está a caminho. Tente respirar de forma pausada.\n\nVocê não está passando por isso sozinha.',
    options: [],
    final: true,
    risco: 'alto',
  },
  {
    id: 'seguro',
    msg: 'Fico mais tranquila ao saber que você está em segurança neste momento.\n\nVocê poderia compartilhar um pouco sobre o que ocorreu?',
    options: [
      { text: 'Sofri agressão física',       next: 'tipo_fisica'  },
      { text: 'Sofri abuso verbal ou psicológico', next: 'tipo_psico'   },
      { text: 'Fui alvo de ameaças',               next: 'tipo_ameaca'  },
      { text: 'Estou sofrendo controle financeiro', next: 'tipo_fin' },
    ],
    risco: 'medio',
  },
  {
    id: 'conversar',
    msg: 'Nós estamos aqui para ouvir você de forma empática e sem nenhum tipo de julgamento.\n\nPor favor, essa situação está acontecendo agora, ou é algo relacionado ao passado?',
    options: [
      { text: 'Está ocorrendo neste momento',   next: 'seguro'    },
      { text: 'Aconteceu recentemente',   next: 'recente'   },
      { text: 'Foi no passado, mas sigo afetada', next: 'passado' },
    ],
  },
  {
    id: 'recente',
    msg: 'Agradecemos muito por compartilhar isso conosco. O acolhimento é o primeiro passo.\n\nO que você está sentindo com mais intensidade agora?',
    options: [
      { text: 'Medo profundo ou ansiedade',     next: 'emocoes_resp' },
      { text: 'Extensa tristeza e isolamento',   next: 'emocoes_resp' },
      { text: 'Sensação de raiva e injustiça',               next: 'emocoes_resp' },
      { text: 'Vazio ou entorpecimento',       next: 'emocoes_resp' },
    ],
    risco: 'medio',
  },
  {
    id: 'passado',
    msg: 'Situações ocorridas no passado continuam gerando sofrimento real hoje, e buscar apoio requer muita força.\n\nVocê possui algum acompanhamento ou tratamento psicológico ativo?',
    options: [
      { text: 'Sim, realizo acompanhamento',     next: 'ja_ajuda'  },
      { text: 'Ainda não busco apoio profissional',                   next: 'sem_ajuda' },
      { text: 'Tentei, porém encontrei dificuldades de acesso',  next: 'sem_ajuda' },
    ],
    risco: 'baixo',
  },
  {
    id: 'direitos',
    msg: 'Perfeito. Compreender legalmente a situação é essencial.\n\nQual tema específico você gostaria de acessar?',
    options: [
      { text: 'Lei Maria da Penha',       next: 'lei_mp'    },
      { text: 'Pedido de medidas protetivas',       next: 'medidas'   },
      { text: 'Registrar Boletim de Ocorrência',         next: 'bo'        },
      { text: 'Questões sobre guarda dos filhos',        next: 'guarda'    },
    ],
    risco: 'baixo',
  },
  {
    id: 'lei_mp',
    msg: 'A Lei Maria da Penha (Lei 11.340/2006) foi elaborada para proteger contra qualquer forma de violência física, psicológica, sexual, patrimonial e moral no âmbito doméstico.\n\nA responsabilidade recai sobre pessoas com as quais a vítima possua ou possuiu laços afetivos. Deseja conferir os moldes protetivos garantidos?',
    options: [
      { text: 'Gostaria de saber sobre as medidas', next: 'medidas'  },
      { text: 'Desejo buscar serviços de auxílio', next: 'servicos' },
    ],
    risco: 'baixo',
  },
  {
    id: 'medidas',
    msg: 'Diante de urgência, ordens judiciais de proteção podem ser concedidas num prazo de até 48 horas após registro.\n\nIncluem determinações como:\n• Afastamento compulsório do agressor;\n• Fixação de distanciamento mínimo obrigatório;\n• Cancelamento de meios de comunicação;\n• Interrupção de posse ou porte de armamentos.\n\nA solicitação inicial se dá diretamente na delegacia civil local.',
    options: [
      { text: 'Verificar unidades de atendimento próximas', next: 'servicos' },
      { text: 'Retornar ao acolhimento via chat',   next: 'conversar' },
    ],
    risco: 'baixo',
  },
  {
    id: 'bo',
    msg: 'Para a elaboração de um Boletim de Ocorrência, há vias seguras:\n\n• Dirigir-se pessoalmente a instâncias policiais civis.\n• Acesso direto nas delegacias digitais online.\n• Central Telefônica 180 para orientações preliminares.\n\nViolências não físicas (coação e cerceio) configuram infração; separe arquivos e provas digitais se possível.',
    options: [
      { text: 'Encontrar unidades policiais da região', next: 'servicos' },
      { text: 'Retornar ao menu de instruções',                 next: 'direitos'  },
    ],
    risco: 'baixo',
  },
  {
    id: 'servicos',
    msg: 'Podemos repassar locais governamentais estruturados próximos.\n\nQue modelo de retaguarda se faz mais necessário hoje?',
    options: [
      { text: 'Delegacia Especializada de Atendimento à Mulher (DEAM)', next: 'final_servicos' },
      { text: 'Ponto de abrigo imediato',               next: 'final_servicos' },
      { text: 'Atenção e cuidado psicológico', next: 'final_servicos' },
      { text: 'Centros e conselhos de apoio',    next: 'final_servicos' },
    ],
  },
  {
    id: 'final_servicos',
    msg: 'Com acesso geográfico, seria possível filtrar centros perfeitamente em torno do seu endereço de momento.\n\nNo entanto, deixamos canais perenes de contato direto:\n\n• 180 — Coordenação Nacional de Atendimento (24h)\n• 190 — Sistema de Emergência Policial\n• 100 — Disque Direitos Humanos\n\nPodemos interligar este atendimento a uma das nossas profissionais de acompanhamento se desejar estar amparada por equipe humana.',
    options: [
      { text: 'Solicitar assistência humana ao vivo', next: 'conectar_humano' },
      { text: 'Explorar diretrizes de proteção e lei', next: 'direitos' },
    ],
    risco: 'medio',
  },
  {
    id: 'conectar_humano',
    msg: 'Estabelecendo protocolo de conexão segura...\n\nEm curtos instantes, uma especialista ou assistente social da nossa rede estará conectada a essa sessão, com todo o acolhimento já compreendido. Pode relatar mais coisas em sigilo se puder.',
    options: [],
    final: true,
    risco: 'medio',
  },
  {
    id: 'tipo_fisica',
    msg: 'Compreendemos integralmente o evento brutal, ninguém merece passar ou sentir essa agressão.\n\nPrimeiramente: existe chance de risco estrutural e biológico no seu estado atual? Necessita de retaguarda hospitalar?',
    options: [
      { text: 'É imprescindível um encaminhamento médico',    next: 'medico'         },
      { text: 'Fisicamente a questão não é urgência clínica de momento',       next: 'emocoes_resp'   },
    ],
    risco: 'alto',
  },
  {
    id: 'medico',
    msg: 'Recomendamos que não excite de tentar apoio via SAMU (192) ou comparecimento seguro ao bloco de emergências clínicas disponível e perto de você.\n\nDentro das unidades há protocolo de verificação de violência contra a mulher.\n\nVocê prefere que disparemos uma chamada da nossa equipe pelo botão de socorro para suporte cruzado?',
    options: [
      { text: 'Habilitar resgate S.O.S.', next: 'sos_ativo' },
      { text: 'Tenho autonomia de prosseguir agora', next: 'emocoes_resp' },
    ],
    risco: 'alto',
  },
  {
    id: 'tipo_psico',
    msg: 'O dolo mental, isolamento estrutural e o rebaixamento de autoestima gerados formam frentes enraizadas e gravíssimas que a lei penaliza abertamente.\n\nHá quanto tempo você nota o endurecimento desse modelo abusivo ocorrer?',
    options: [
      { text: 'Começou e/ou intensificou ultimamente', next: 'recente'      },
      { text: 'Consolidou-se durante longo tempo e meses',           next: 'passado'      },
      { text: 'Não tenho base sólida para mensurar o tempo exato',          next: 'emocoes_resp' },
    ],
    risco: 'medio',
  },
  {
    id: 'tipo_ameaca',
    msg: 'O crime de ameaça se qualifica juridicamente nas esferas de coerção e desconstrução.\n\nSempre armazene interações gravadas ou transcrições de comunicação da pessoa incriminada para eventuais trâmites civis.\n\nSente que corre um risco vital no imediato ou durante a próxima noite de desdobramentos?',
    options: [
      { text: 'Sim, a circunstância é de extrema periculosidade contínua',  next: 'perigo'      },
      { text: 'No minuto atual a margem de ataque é refreada e controlada',     next: 'final_servicos' },
    ],
    risco: 'medio',
  },
  {
    id: 'tipo_fin',
    msg: 'Inviabilização de contas, apreensão unilateral de quantias, constrangimento por não deter posse de dinheiro — também são frentes da violação do código interno de Maria da Penha.\n\nVocê detém independência e canais próprios de provento e uso civil hoje em dia?',
    options: [
      { text: 'Consigo manipular minhas contas devidamente',           next: 'final_servicos' },
      { text: 'Total obstrução ou ausência de renda livre', next: 'final_servicos' },
    ],
    risco: 'medio',
  },
  {
    id: 'emocoes_resp',
    msg: 'Entendemos isso. Suas impressões fazem todo e completo sentido dentro desse contexto complexo.\n\nGostaria que efetuássemos redirecionamento para o setor e os gabinetes integrados das nossas terapeutas parceiras que compõem a NIRA?',
    options: [
      { text: 'Prosseguir para área de consulta especializada',         next: 'conectar_humano' },
      { text: 'Compreender com melhor extensão a validade legal das ações', next: 'direitos'       },
      { text: 'Acessar diretórios e locais perimetrais de salvaguardada',           next: 'servicos'        },
    ],
    risco: 'medio',
  },
  {
    id: 'ja_ajuda',
    msg: 'Este compromisso de se expor com um encarregado ou a ajuda mental é um excelente contraponto contra eventuais distorções do ambiente do trauma e abuso contíguo.\n\nQue braço de acompanhamento técnico as nossas centrais poderiam auxiliar em continuidade?',
    options: [
      { text: 'Quero instrução clara da justiça e validade dos recursos', next: 'direitos'  },
      { text: 'Procurar abas e alas disponíveis na microrregião de residência',        next: 'servicos'  },
      { text: 'Falar de angústia e compartilhar vivências atípicas',           next: 'emocoes_resp' },
    ],
    risco: 'baixo',
  },
  {
    id: 'sem_ajuda',
    msg: 'Dentro da sua limitação não há nenhuma inércia pessoal sua de procurar o sistema. Há o peso em si do obstáculo estrutural do ato em seu curso de ocorrência.\n\nNossa instituição permite pontes e contato via o site com gabarito de anonimato.\n\nAceita ser disposta como prioridade técnica aos nossos psicólogos de plantão de acolhimento orgânico?',
    options: [
      { text: 'Confirmar e engessar apoio de análise e condução mista', next: 'conectar_humano' },
      { text: 'Consultar portais abertos estaduais', next: 'servicos'       },
    ],
    risco: 'medio',
  },
  {
    id: 'guarda',
    msg: 'Nos eventos da Lei doméstica é impetrada junto às representações a ação coligada de guarda emergencial compulsória nas cadeias de delegacias (CRAM incluído no desmembramento local).\n\nO crivo magistrado inibe contato materno-limitante efetuado como intimidação.\n\nQuer listar e referenciar o suporte jurídico que encoste nas suas fronteiras geográficas ou estuda as outras opções passadas?',
    options: [
      { text: 'Verificar centrais e escritórios integrados', next: 'final_servicos' },
      { text: 'Recuar os passos e rever o painel legal',   next: 'direitos'       },
    ],
    risco: 'baixo',
  },
];

const HIST_MOCK = [
  { id: 1, titulo: 'Conversa atual', preview: 'Estou aqui para te ouvir, sem julgam...', data: 'Agora' },
  { id: 2, titulo: 'Conversa sobre direitos', preview: 'Perguntei sobre a Lei Maria da Penha...', data: 'Hoje, 10:42' },
  { id: 3, titulo: 'Triagem — busca de apoio', preview: 'Falei sobre a minha situação em casa...', data: 'Ontem' },
];

function formatTime() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
}

function parseMsg(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br />');
}

export default function TriagemPage() {
  const [histAtivo, setHistAtivo] = useState(1);
  const [chatAtivo, setChatAtivo] = useState(true); 
  const [messages,  setMessages]  = useState([
    { role: 'ia', text: "Olá. Bem-vinda ao espaço de acolhimento da Nira.\n\nEste ambiente é totalmente seguro e anônimo. Não registramos nenhum dado pessoal.\n\nComo posso ajudar você neste momento?", time: '19:47' },
    { role: 'user', text: "Preciso conversar", time: '20:33' },
    { role: 'ia', text: "Nós estamos aqui para ouvir você de forma empática e sem julgamentos.\n\nPor favor, essa situação está acontecendo agora, ou é algo relacionado ao passado?", time: '20:34', 
      options: [
        { text: "Está ocorrendo neste momento", next: 'seguro' },
        { text: "Aconteceu recentemente", next: 'recente' },
        { text: "Foi no passado, mas sigo afetada", next: 'passado' }
      ]
    }
  ]);
  const [digitando, setDigitando] = useState(false);
  const [inputVal,  setInputVal]  = useState('');
  const [riscoAtual,setRiscoAtual]= useState(null);

  const scrollContainerRef = useRef(null);

  // Scroll logic isolado no container interior p evitar rolagem global //
  function scrollBottom() {
    if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
            top: scrollContainerRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }
  }
  useEffect(() => { scrollBottom(); }, [messages, digitando]);

  function iniciarChat() {
    setChatAtivo(true);
    setMessages([]);
    setRiscoAtual(null);
    const step = FLOW.find(f => f.id === 'start');
    setTimeout(() => {
      setDigitando(true);
      setTimeout(() => {
        setDigitando(false);
        setMessages([{ role:'ia', text: step.msg, options: step.options, time: formatTime() }]);
      }, 1200);
    }, 300);
  }

  function escolherOpcao(opcao, optText) {
    const userMsg = { role:'user', text: optText, time: formatTime() };
    setMessages(prev => {
      const semBotoes = [...prev];
      const ultimaIA = semBotoes[semBotoes.length - 1];
      if (ultimaIA && ultimaIA.role === 'ia') { delete ultimaIA.options; }
      return [...semBotoes, userMsg];
    });

    const proxStep = FLOW.find(f => f.id === opcao.next);
    if (!proxStep) return;

    if (proxStep.risco) setRiscoAtual(proxStep.risco);

    setDigitando(true);
    setTimeout(() => {
      setDigitando(false);
      const iaMsg = {
        role: 'ia',
        text: proxStep.msg,
        options: proxStep.final ? [] : proxStep.options,
        time: formatTime(),
        risco: proxStep.risco,
        final: proxStep.final,
      };
      setMessages(prev => [...prev, iaMsg]);
    }, 1000 + Math.random() * 600);
  }

  function enviarTexto() {
    if (!inputVal.trim()) return;
    const userMsg = { role:'user', text: inputVal.trim(), time: formatTime() };
    
    setMessages(prev => {
      const res = [...prev];
      const lst = res[res.length-1];
      if (lst && lst.role === 'ia') { delete lst.options; }
      return [...res, userMsg];
    });

    setInputVal('');
    setDigitando(true);
    setTimeout(() => {
      setDigitando(false);
      const resp = {
        role: 'ia',
        text: 'Agradecemos por nos pontuar este fator.\n\nPara seguirmos com zelo, como podemos estabilizar o cenário atual ou auxiliar o entendimento da via judicial a frente?',
        options: [
          { text: 'Encontro-me em situação de perigo de risco altíssimo', next: 'perigo'    },
          { text: 'Necessito conexão com profissionais', next: 'conectar_humano' },
          { text: 'Instruções sobre amparo em lei', next: 'direitos'  },
        ],
        time: formatTime(),
      };
      setMessages(prev => [...prev, resp]);
    }, 1200 + Math.random() * 600);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviarTexto(); }
  }

  function novoChat() { iniciarChat(); setHistAtivo(1); }
  function abrirHist(id) { setHistAtivo(id); if(id !== 1) setChatAtivo(false); else setChatAtivo(true); }

  function ativarSOS() {
    alert('🆘 S.O.S. ativado!\n\nEm produção: sua localização seria enviada silenciosamente para a equipe NIRA.\n\nEmergências: 190 (Polícia) · 192 (SAMU) · 180 (Central da Mulher)');
  }

  return (
    <>
      <style>{css}</style>
      <div className="chat-page">
        <div className="chat-wrap">
          
          <aside className="chat-sidebar">
            <div className="chat-sidebar__head">
              <Link to="/" className="chat-sidebar__back-btn">
                <ArrowLeft size={14} /> Voltar ao site
              </Link>
              <p className="chat-sidebar__title">Conversas</p>
              <button className="chat-sidebar__new" onClick={novoChat}>
                ✦ Nova conversa
              </button>
            </div>

            <div className="chat-sidebar__list">
              {HIST_MOCK.map(h => (
                <div
                  key={h.id}
                  className={`chat-hist-item${histAtivo===h.id?' chat-hist-item--active':''}`}
                  onClick={() => abrirHist(h.id)}
                >
                  <p className="chat-hist-item__title">{h.titulo}</p>
                  <p className="chat-hist-item__sub">{h.preview}</p>
                  <p className="chat-hist-item__date">{h.data}</p>
                </div>
              ))}
            </div>

            <div className="chat-sidebar__anon">
              <span className="chat-sidebar__anon-icon"><Lock /></span>
              <p className="chat-sidebar__anon-text">Todas as conversas são 100% anônimas. Nenhum dado pessoal é armazenado.</p>
            </div>
          </aside>

          <div className="chat-main">
            {chatAtivo ? (
              <div className="chat-header">
                <div className="chat-header__info">
                  <Link to="/" className="chat-header__back-mob"><ArrowLeft size={18} /></Link>
                  <div className="chat-header__avatar"><Shield /></div>
                  <div>
                    <p className="chat-header__name">Assistente Nira</p>
                    <p className="chat-header__status">
                      <span className="chat-header__status-dot" />
                      Atendimento verificado
                      {riscoAtual && <span style={{marginLeft:8, opacity:.7}}>· Grau mapeado: <strong>{riscoAtual}</strong></span>}
                    </p>
                  </div>
                </div>
                <div className="chat-header__actions">
                  <button className="chat-header__btn chat-header__btn--danger" onClick={ativarSOS}>
                    <AlertTriangle size={13}/> Acionar S.O.S.
                  </button>
                  <button className="chat-header__btn" onClick={() => alert('Conectando com atendente humano...')}>
                    <MessageSquare size={13}/> Analista Humana
                  </button>
                  <button className="chat-header__btn" onClick={novoChat}><RefreshCcw size={13}/> Atualizar caso</button>
                </div>
              </div>
            ) : (
              <div className="chat-header">
                <div className="chat-header__info">
                  <Link to="/" className="chat-header__back-mob"><ArrowLeft size={18} /></Link>
                  <div className="chat-header__avatar"><Shield /></div>
                  <div>
                    <p className="chat-header__name">Painel Nira</p>
                    <p className="chat-header__status"><span className="chat-header__status-dot" />Serviço em plantão contínuo</p>
                  </div>
                </div>
                <div className="chat-header__actions">
                  <button className="chat-header__btn chat-header__btn--danger" onClick={ativarSOS}><AlertTriangle size={13}/> Acionar S.O.S.</button>
                </div>
              </div>
            )}

            {!chatAtivo ? (
              <div className="chat-welcome">
                <div className="chat-welcome__owl"><Shield size={64} strokeWidth={1.5} /></div>
                <h2 className="chat-welcome__title">Como podemos intervir?</h2>
                <p className="chat-welcome__sub">
                  O painel atua por intermédio reativo e confidencial da plataforma Nira. Escolha o vetor primário que requer nossa atenção agora:
                </p>
                <div className="chat-welcome__starts">
                  {[
                    { Icon:AlertTriangle, title:'Estou em perigo', desc:'Preciso de ajuda agora' },
                    { Icon:MessageSquare, title:'Quero conversar',  desc:'Preciso ser ouvida'     },
                    { Icon:BookOpen,      title:'Meus direitos',    desc:'Quero me informar'      },
                    { Icon:MapPin,        title:'Buscar apoio',     desc:'Serviços próximos'      },
                  ].map(s => (
                    <div key={s.title} className="chat-welcome__start" onClick={() => { novoChat() }}>
                      <div className="chat-welcome__start-icon"><s.Icon /></div>
                      <p className="chat-welcome__start-title">{s.title}</p>
                      <p className="chat-welcome__start-desc">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="chat-messages" ref={scrollContainerRef}>
                <div className="chat-date-sep">Hoje</div>

                {messages.map((msg, i) => (
                  <div key={i} className={`chat-msg chat-msg--${msg.role}`}>
                    <div className="chat-msg__avatar">
                      {msg.role === 'ia' ? <Shield /> : <User />}
                    </div>
                    
                    <div className={`chat-msg-col ${msg.role === 'user' ? 'chat-msg-col--user' : ''}`} style={{display: 'flex', flexDirection: 'column', width: '100%', alignItems: msg.role==='user'?'flex-end':'flex-start'}}>
                      <div
                        className="chat-msg__bubble"
                        dangerouslySetInnerHTML={{ __html: parseMsg(msg.text) }}
                      />
                      
                      {msg.role === 'ia' && msg.options && msg.options.length > 0 && i === messages.length - 1 && !digitando && (
                        <div className="chat-options">
                          {msg.options.map((op, oi) => (
                            <button
                              key={oi}
                              className="chat-option-btn"
                              onClick={() => escolherOpcao(op, op.text)}
                            >
                              {op.text}
                            </button>
                          ))}
                        </div>
                      )}

                      <p className="chat-msg__time">{msg.time}</p>

                      {msg.final && msg.risco && (
                        <div className="chat-risk-card" style={{ marginTop: 12 }}>
                          <p className="chat-risk-card__label">Triagem concluída</p>
                          <div className={`chat-risk-card__level chat-risk-card__level--${msg.risco}`}>
                            {msg.risco === 'alto' ? 'Risco Alto' : msg.risco === 'medio' ? 'Risco Médio' : 'Monitoramento'}
                          </div>
                          <p style={{ fontSize:'.82rem', color:'rgba(239,238,234,.6)', lineHeight:1.65 }}>
                            Nossa equipe foi notificada. Uma atendente humana entrará em contato em breve.
                          </p>
                          <div className="chat-risk-card__actions">
                            <button className="chat-risk-btn btn-r-sos" onClick={ativarSOS}><AlertTriangle size={13}/> S.O.S.</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {digitando && (
                  <div className="chat-typing">
                    <div className="chat-typing__avatar"><Shield /></div>
                    <div className="chat-typing__dots">
                      <div className="chat-typing__dot" />
                      <div className="chat-typing__dot" />
                      <div className="chat-typing__dot" />
                    </div>
                  </div>
                )}
              </div>
            )}

            {chatAtivo && (
              <button className="chat-sos-float" onClick={ativarSOS}>
                <span className="chat-sos-float-dot" />
                Ativar S.O.S.
              </button>
            )}

            {chatAtivo && (
               <div className="chat-input-area">
                 <div className="chat-input-wrap">
                   <textarea
                     className="chat-input"
                     placeholder="Digite uma mensagem ou escolha uma opção acima..."
                     rows={1}
                     value={inputVal}
                     onChange={e => setInputVal(e.target.value)}
                     onKeyDown={handleKeyDown}
                   />
                   <button
                     className="chat-send-btn"
                     onClick={enviarTexto}
                     disabled={!inputVal.trim() || digitando}
                     title="Enviar"
                   >
                     <Send size={16} />
                   </button>
                 </div>
                 <p className="chat-input-hint" style={{display:'flex',alignItems:'center',gap:6,justifyContent:'center'}}>
                   <Lock size={11}/> Conversa anônima · Enter para enviar · Shift+Enter para nova linha
                 </p>
               </div>
            )}
            
          </div>
        </div>
      </div>
    </>
  );
}