import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  MoreVertical, 
  Send, 
  Paperclip, 
  MapPin, 
  Clock, 
  CheckCircle2,
  Phone,
  MessageSquare,
  ShieldCheck,
  Settings,
  Activity,
  AlertTriangle,
  Lock,
  UserX,
  FileText
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { NiraContext } from '../../context/NiraContext';

export default function FullAtendimentos() {
  const navigate = useNavigate();
  const authContext = useAuth();
  const niraContext = useContext(NiraContext);
  
  const user = authContext?.user;
  const getVinculoLabel = authContext?.getVinculoLabel || (() => '---');
  const chats = niraContext?.chats || [];
  const addChatMessage = niraContext?.addChatMessage || (() => {});
  const updateChatStatus = niraContext?.updateChatStatus || (() => {});
  const setTypingStatus = niraContext?.setTypingStatus || (() => {});
  const burnMessage = niraContext?.burnMessage || (() => {});
  const markChatAsRead = niraContext?.markChatAsRead || (() => {});
  
  const [casoAtivoId, setCasoAtivoId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [inputMsg, setInputMsg] = useState('');
  const [notas, setNotas] = useState('');
  const messagesEndRef = useRef(null);
  const [notif, setNotif] = useState({ show: false, type: 'info', title: '', msg: '' });
  const [sendFileOnce, setSendFileOnce] = useState(false);
  const fileInputRef = useRef(null);

  const casoAtivo = chats.find(c => c.id === casoAtivoId);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [casoAtivo?.messages]);

  const filteredChats = chats
    .filter(c => 
      c.status === 'ativo' && 
      (c.user?.toLowerCase().includes(searchTerm.toLowerCase()) || c.id?.includes(searchTerm))
    )
    .sort((a, b) => b.id.localeCompare(a.id)); // Simula 'mais recente' pelo ID decrescente ou timestamp se houvesse

  const handleSend = () => {
    if (!inputMsg.trim() || !casoAtivoId) return;
    addChatMessage(casoAtivoId, inputMsg, 'prof');
    setInputMsg('');
  };

  const handleSendFile = (fileName) => {
    if (!casoAtivoId) return;
    addChatMessage(casoAtivoId, fileName, 'prof', 'file', sendFileOnce);
    setNotif({ show: true, type: 'success', title: 'ARQUIVO ENVIADO', msg: `Arquivo "${fileName}" enviado com sucesso.` });
    setTimeout(() => setNotif({ show: false }), 3000);
  };

  // Sincroniza estado de digitação do profissional
  useEffect(() => {
    if (casoAtivoId) {
      const isTyping = inputMsg.length > 0;
      setTypingStatus(casoAtivoId, 'prof', isTyping);
      const timer = setTimeout(() => setTypingStatus(casoAtivoId, 'prof', false), 3000);
      return () => clearTimeout(timer);
    }
  }, [inputMsg, casoAtivoId]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#07070B] flex flex-col overflow-hidden text-white font-sans selection:bg-brand-primary/30">
      
      {/* ── HEADER COMPACTO ── */}
      <header className="h-[64px] bg-[#0D0D15]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 flex-shrink-0 z-50">
         <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/admin/dashboard')}
              className="group relative w-9 h-9 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-brand-primary transition-all duration-300 shadow-md"
            >
               <ArrowLeft size={18} />
            </button>
            <div className="flex flex-col">
               <div className="flex items-center gap-3">
                  <h1 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/90">Atendimento Humano</h1>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[7px] font-black tracking-widest uppercase">Encriptado</span>
               </div>
               <div className="flex items-center gap-2 text-[9px] font-bold text-text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse"></span>
                  {user?.nome?.split(' ')[0] || 'Admin'} · {getVinculoLabel?.(user?.vinculo, user?.ongId) || 'Nira Core'}
               </div>
            </div>
         </div>

         <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5 text-[8px] font-black uppercase tracking-widest text-text-muted">
               <Activity size={10} className="text-brand-primary" /> {chats.filter(c => c.status === 'ativo').length} OCORRÊNCIAS EM FILA
            </div>
             <button 
               onClick={() => {
                 setNotif({ show: true, type: 'info', title: 'CONFIGURAÇÕES TÁTICAS', msg: 'Ajustes de latência e criptografia de canal estão em modo automático.' });
                 setTimeout(() => setNotif({ show: false }), 3000);
               }}
               className="w-9 h-9 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-text-muted hover:text-white transition-all active:scale-95"
             >
                <Settings size={16} />
             </button>
          </div>
       </header>

      <div className="flex-1 flex overflow-hidden">
        
        <aside className="w-[260px] bg-[#0D0D15]/40 backdrop-blur-3xl border-r border-white/5 flex flex-col flex-shrink-0 z-40">
           <div className="p-4">
              <div className="relative group">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
                 <input 
                   type="text" 
                   value={searchTerm}
                   onChange={e => setSearchTerm(e.target.value)}
                   placeholder="Buscar..."
                   className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-[11px] text-white focus:outline-none focus:border-brand-primary/50"
                 />
              </div>
           </div>
           
           <div className="flex-1 overflow-y-auto p-2 space-y-1 no-scrollbar">
              {filteredChats.length > 0 ? filteredChats.map(chat => (
                <div 
                  key={chat.id}
                  onClick={() => {
                    setCasoAtivoId(chat.id);
                    markChatAsRead(chat.id);
                    setNotas(chat.internalNote || '');
                  }}
                  className={`p-3 rounded-xl cursor-pointer transition-all border ${casoAtivoId === chat.id ? 'bg-brand-primary/10 border-brand-primary/30' : 'bg-transparent border-transparent hover:bg-white/5'}`}
                >
                   <div className="flex justify-between items-center mb-1">
                      <span className="text-[8px] font-mono font-black text-text-muted opacity-40">#{chat.id}</span>
                      <div className="flex items-center gap-2">
                         {chat.unread && <div className="w-1.5 h-1.5 rounded-full bg-brand-emergency animate-pulse" />}
                         <div className={`w-1 h-1 rounded-full ${chat.risk === 'alto' ? 'bg-brand-emergency' : 'bg-brand-primary'}`}></div>
                      </div>
                   </div>
                   <p className="text-[11px] font-bold text-white truncate">{chat.user?.split('•')[0] || 'Anônima'}</p>
                   <div className="flex items-center justify-between text-[8px] text-text-muted mt-1 font-bold">
                      <span className="opacity-40 uppercase tracking-widest">{chat.location.split(',')[0]}</span>
                      <span className="opacity-40">Ativo</span>
                   </div>
                </div>
              )) : (
                <div className="text-center py-10 opacity-20 text-[8px] font-black uppercase tracking-widest">Fila Limpa</div>
              )}
           </div>
        </aside>

        <main className="flex-1 bg-[#07070B] flex flex-col relative min-w-0">
           {casoAtivo ? (
             <>
                <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#0D0D15]/40 backdrop-blur-xl z-10">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-[#6358db] flex items-center justify-center text-white font-black text-sm shadow-xl">
                         {casoAtivo.user?.charAt(0) || 'U'}
                      </div>
                      <div className="space-y-0.5">
                         <div className="flex items-center gap-2">
                            <h3 className="text-sm font-black text-white">{casoAtivo.user || 'Usuária Anônima'}</h3>
                            <Lock size={12} className="text-brand-primary opacity-50" />
                         </div>
                         <p className="text-[10px] font-bold text-text-muted flex items-center gap-1">
                            <MapPin size={10} className="text-brand-primary" /> {casoAtivo.location}
                         </p>
                      </div>
                   </div>
                   <div className="flex gap-2">
                      <button 
                        onClick={() => updateChatStatus(casoAtivo.id, 'concluido')}
                        className="h-9 px-4 bg-[#10B981]/10 border border-[#10B981]/20 rounded-xl text-[#10B981] flex items-center gap-2 font-black text-[9px] uppercase tracking-widest hover:bg-[#10B981] hover:text-white transition-all shadow-lg active:scale-95"
                      >
                         <CheckCircle2 size={14} /> Encerrar Caso
                      </button>
                   </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 lg:p-8 flex flex-col gap-6 no-scrollbar">
                   <div className="relative flex items-center justify-center">
                      <span className="h-[1px] w-full bg-white/5 absolute"></span>
                      <span className="relative px-4 py-1 bg-[#07070B] text-[8px] font-black text-text-muted uppercase tracking-[0.2em] border border-white/5 rounded-full">
                        Canal Seguro Aberto
                      </span>
                   </div>
                   
                   {casoAtivo.isTyping?.user && (
                     <div className="self-start flex gap-1 mb-4 animate-pulse">
                        <span className="w-1 h-1 bg-brand-primary rounded-full"></span>
                        <span className="w-1 h-1 bg-brand-primary rounded-full"></span>
                        <span className="w-1 h-1 bg-brand-primary rounded-full"></span>
                        <span className="text-[7px] font-black uppercase text-brand-primary ml-2">Usuária digitando...</span>
                     </div>
                   )}
                   {(casoAtivo.messages || []).map((msg, i) => (
                     <div 
                       key={i} 
                       className={`max-w-[70%] p-4 rounded-2xl text-xs leading-relaxed shadow-lg ${msg.sender === 'prof' ? 'self-end bg-brand-primary text-white rounded-br-none' : 'self-start bg-[#151521] text-white/80 rounded-bl-none border border-white/5'}`}
                     >
                        {msg.type === 'file' ? (
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                 <FileText size={16} />
                              </div>
                              <div className="flex-1">
                                 <p className="font-bold text-[11px] truncate">{msg.text}</p>
                                 <p className="text-[8px] opacity-40 uppercase font-black">{msg.once ? 'Visualização Única' : 'Documento'}</p>
                              </div>
                              {msg.burned && <Lock size={12} className="text-brand-emergency" />}
                           </div>
                        ) : msg.text}
                        <div className="flex items-center justify-end gap-1 mt-2 opacity-50">
                           <span className="text-[7px] font-black uppercase">{msg.time}</span>
                           {msg.sender === 'prof' && <CheckCircle2 size={8} />}
                        </div>
                     </div>
                   ))}
                   <div ref={messagesEndRef} />
                </div>

                <div className="p-6 bg-gradient-to-t from-[#07070B] to-transparent">
                   <div className="max-w-3xl mx-auto flex items-center gap-3 bg-[#151521]/80 backdrop-blur-2xl border border-white/10 p-2 rounded-2xl focus-within:border-brand-primary/50 transition-all shadow-2xl">
                       <input 
                         type="file" 
                         ref={fileInputRef} 
                         className="hidden" 
                         onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) handleSendFile(file.name);
                         }}
                       />
                       <button 
                         onClick={() => fileInputRef.current.click()}
                         className="h-10 w-10 rounded-xl flex items-center justify-center text-text-muted hover:text-white active:scale-90 transition-all relative group"
                       >
                          <Paperclip size={20} />
                          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/80 p-2 rounded-lg border border-white/10 hidden group-hover:flex flex-col items-start gap-1 w-32 z-50">
                             <label className="flex items-center gap-2 cursor-pointer w-full">
                                <input 
                                  type="checkbox" 
                                  checked={sendFileOnce} 
                                  onChange={e => setSendFileOnce(e.target.checked)} 
                                  className="accent-brand-primary"
                                />
                                <span className="text-[8px] font-black text-white uppercase">Vista Única</span>
                             </label>
                          </div>
                       </button>
                      <input 
                        type="text" 
                        value={inputMsg}
                        onChange={e => setInputMsg(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSend()}
                        placeholder="Escreva sua resposta..."
                        className="flex-1 bg-transparent border-none outline-none text-xs text-white py-2"
                      />
                      <button 
                        onClick={handleSend}
                        className="h-10 px-6 bg-brand-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                      >
                         <Send size={14} />
                      </button>
                   </div>
                   <p className="text-center text-[7px] text-text-muted mt-3 font-bold uppercase tracking-[0.2em] opacity-30">A privacidade da usuária é absoluta.</p>
                </div>
             </>
           ) : (
             <div className="flex-1 flex flex-col items-center justify-center space-y-4 opacity-10">
                <MessageSquare size={60} className="text-brand-primary" strokeWidth={1} />
                <h3 className="text-xs font-black text-white uppercase tracking-[0.3em]">Aguardando Protocolo</h3>
             </div>
           )}
        </main>

        {/* COLUNA DIREITA: Detalhes (Otimizada) */}
        <aside className="w-[300px] bg-[#0D0D15]/60 backdrop-blur-3xl border-l border-white/5 p-6 overflow-y-auto no-scrollbar flex flex-col gap-8">
           {casoAtivo ? (
             <>
                <section>
                   <div className="flex items-center gap-2 mb-4">
                      <FileText size={14} className="text-brand-primary" />
                      <h4 className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Detalhes</h4>
                   </div>
                   <div className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-white/5">
                         <div>
                            <p className="text-[8px] font-black text-text-muted uppercase mb-0.5">Protocolo</p>
                            <p className="text-[11px] font-mono font-bold text-brand-primary">#{casoAtivo.id}</p>
                         </div>
                         <div className="text-right">
                            <p className="text-[8px] font-black text-text-muted uppercase mb-0.5">Severidade</p>
                            <span className={`text-[9px] font-black uppercase ${casoAtivo.risk === 'alto' ? 'text-brand-emergency' : 'text-brand-primary'}`}>{casoAtivo.risk}</span>
                         </div>
                      </div>
                      <div>
                         <p className="text-[8px] font-black text-text-muted uppercase mb-0.5">Localização</p>
                         <p className="text-xs font-bold text-white/90">{casoAtivo.location}</p>
                      </div>
                    </div>
                 </section>

                 <section>
                    <div className="flex items-center gap-2 mb-4">
                       <AlertTriangle size={14} className="text-brand-emergency" />
                       <h4 className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Encaminhamento Tático</h4>
                    </div>
                    <div className="grid gap-2">
                       <button 
                         onClick={() => {
                           setNotif({ show: true, type: 'success', title: 'ENCAMINHADO AO CRAM', msg: `O caso #${casoAtivo.id} foi vinculado à rede municipal de atendimento à mulher.` });
                           setTimeout(() => setNotif({ show: false }), 4000);
                         }}
                         className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase text-white hover:bg-brand-primary/20 hover:border-brand-primary/40 transition-all text-left group"
                       >
                          CRAM <ArrowLeft className="rotate-180 group-hover:translate-x-1 transition-transform" size={12} />
                       </button>
                       
                       <button 
                         onClick={() => {
                           setNotif({ show: true, type: 'emergency', title: 'CONSELHO TUTELAR ACIONADO', msg: 'Equipe de proteção à criança e adolescente foi notificada para intervenção conjunta.' });
                           setTimeout(() => setNotif({ show: false }), 4000);
                         }}
                         className="flex items-center justify-between p-4 bg-brand-emergency/5 border border-brand-emergency/10 rounded-xl text-[9px] font-black uppercase text-brand-emergency hover:bg-brand-emergency hover:text-white transition-all text-left group"
                       >
                          Conselho Tutelar <UserX className="group-hover:scale-110 transition-transform" size={14} />
                       </button>

                       <button 
                         onClick={() => {
                           setNotif({ show: true, type: 'info', title: 'GERANDO RELATÓRIO', msg: 'O prontuário completo está sendo compilado em formato seguro PDF/A.' });
                           setTimeout(() => setNotif({ show: false }), 4000);
                         }}
                         className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase text-white hover:bg-white/10 transition-all text-left"
                       >
                          Gerar PDF do Caso <FileText size={14} className="opacity-40" />
                       </button>

                       <button 
                         onClick={() => {
                           if(window.confirm('CONFIRMAR ACIONAMENTO POLICIAL? Esta ação enviará as coordenadas exatas para o COPOM.')) {
                             setNotif({ show: true, type: 'emergency', title: 'POLÍCIA MILITAR ACIONADA', msg: 'Viaturas em rota de intercepção. Tempo estimado: 4-7 min.' });
                             setTimeout(() => setNotif({ show: false }), 5000);
                           }
                         }}
                         className="flex items-center justify-between p-4 bg-brand-emergency/20 border border-brand-emergency/40 rounded-xl text-[9px] font-black uppercase text-brand-emergency hover:bg-brand-emergency hover:text-white transition-all text-left shadow-[0_0_20px_rgba(255,71,87,0.2)]"
                       >
                          Polícia Militar (190) <Phone size={14} className="animate-pulse" />
                       </button>
                    </div>
                 </section>

                 <section className="flex-1 flex flex-col min-h-[180px]">
                    <div className="flex items-center gap-2 mb-4">
                       <ShieldCheck size={14} className="text-brand-primary" />
                       <h4 className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Prontuário</h4>
                    </div>
                    <textarea 
                      value={notas}
                      onChange={e => setNotas(e.target.value)}
                      placeholder="Anote aqui observações críticas sobre o acolhimento..."
                      className="flex-1 bg-white/5 border border-white/5 rounded-2xl p-4 text-xs text-white focus:outline-none focus:border-brand-primary/30 resize-none font-medium leading-relaxed placeholder:opacity-20"
                    />
                 </section>

                 <section className="mt-auto pt-4">
                    <button 
                       onClick={() => alert('Abrindo protocolo de Plano de Segurança...')}
                       className="w-full p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all flex flex-col items-center gap-2"
                    >
                       <ShieldCheck size={20} />
                       <span className="text-[10px] font-black uppercase tracking-widest">Plano de Segurança</span>
                    </button>
                 </section>
              </>
            ) : (
              <div className="text-center py-10 opacity-10">
                 <ShieldCheck size={80} className="mx-auto" strokeWidth={1} />
              </div>
            )}
         </aside>

      </div>

      {/* ── FEEDBACK OVERLAY (NOTIFICAÇÕES IMERSIVAS) ── */}
      {notif.show && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[10000] animate-fade-in-down">
          <div className={`flex items-center gap-4 px-8 py-4 rounded-2xl border backdrop-blur-2xl shadow-2xl min-w-[320px] ${
            notif.type === 'success' ? 'bg-[#10B981]/10 border-[#10B981]/30 text-[#10B981]' : 
            notif.type === 'emergency' ? 'bg-[#FF4757]/10 border-[#FF4757]/30 text-[#FF4757]' : 
            'bg-brand-primary/10 border-brand-primary/30 text-brand-primary'
          }`}>
             <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                {notif.type === 'success' ? <CheckCircle2 size={20} /> : 
                 notif.type === 'emergency' ? <AlertTriangle size={20} /> : 
                 <ShieldCheck size={20} />}
             </div>
             <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-0.5">{notif.title}</p>
                <p className="text-[11px] font-bold text-white/70">{notif.msg}</p>
             </div>
          </div>
        </div>
      )}

    </div>
  );
}