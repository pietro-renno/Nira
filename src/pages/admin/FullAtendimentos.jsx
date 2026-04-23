import { useState, useContext, useEffect, useRef } from 'react';
import { Send, Check, MapPin, MessagesSquare, ArrowUpRight, StopCircle, CarFront, FilePlus } from 'lucide-react';
import { NiraContext } from '../../context/NiraContext';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AtendimentosChat() {
  const { chats, addChatMessage, updateChatStatus, saveInternalNote } = useContext(NiraContext);
  const location = useLocation();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('Todos');
  const [activeId, setActiveId] = useState(null);
  const [inputVal, setInputVal] = useState('');
  const [localNote, setLocalNote] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (location.state?.activeChatId) {
      setActiveId(location.state.activeChatId);
    } else if (chats.length > 0 && !activeId) {
      setActiveId(chats[0].id);
    }
  }, [location.state, chats, activeId]);

  const currentChat = chats.find(c => c.id === activeId) || chats[0] || null;
  const messages = currentChat ? currentChat.messages : [];

  useEffect(() => {
    setLocalNote(currentChat?.internalNote || '');
  }, [currentChat?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const handleNoteBlur = () => {
    if(activeId) saveInternalNote(activeId, localNote);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if(!inputVal.trim() || !activeId || currentChat.status !== 'ativo') return;
    addChatMessage(activeId, inputVal, 'bot');
    setInputVal('');
  };

  const filteredChats = chats.filter(c => {
     if(activeTab === 'Todos') return true;
     if(activeTab === 'S.O.S' && c.risk === 'alto') return true;
     if(activeTab === 'Ativos' && c.status === 'ativo') return true;
     return false;
  });

  return (
    <div className="flex h-[calc(100vh-160px)] -mt-8 -mx-8 bg-bg-main border-y border-white/5 font-sans animate-fade-in-up">
      
      {/* Column 1: Lista de Conversas Glass */}
      <div className="w-[320px] bg-[#11111B]/90 backdrop-blur-md border-r border-white/5 flex flex-col flex-shrink-0 z-20">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-[10px] font-extrabold text-[#34D399] tracking-widest uppercase mb-6 shadow-sm">Gestão de Atendimentos</h2>
          
          {/* Custom Tabs */}
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
            <button onClick={() => setActiveTab('Todos')} className={`flex-1 text-[10px] font-extrabold shadow-sm py-2 rounded-lg tracking-widest uppercase transition-all duration-300 ${activeTab === 'Todos' ? 'bg-white/10 text-white' : 'text-text-muted hover:text-white'}`}>Todos</button>
            <button onClick={() => setActiveTab('S.O.S')} className={`flex-1 text-[10px] font-extrabold py-2 rounded-lg tracking-widest uppercase flex justify-center items-center gap-1.5 transition-all ${activeTab === 'S.O.S' ? 'bg-white/10 text-white shadow-sm' : 'text-text-muted hover:text-white'}`}>
              {activeTab === 'S.O.S' ? <span className="w-1.5 h-1.5 rounded-full bg-brand-emergency animate-pulse"></span> : null} S.O.S
            </button>
            <button onClick={() => setActiveTab('Ativos')} className={`flex-1 text-[10px] font-extrabold py-2 rounded-lg tracking-widest uppercase transition-all ${activeTab === 'Ativos' ? 'bg-white/10 text-white shadow-sm' : 'text-text-muted hover:text-white'}`}>Ativos</button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-1 p-3">
          {filteredChats.map((item, i) => {
             const isActive = item.id === activeId;
             return (
               <div key={i} onClick={() => setActiveId(item.id)} className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${isActive ? 'bg-gradient-to-r from-brand-primary/10 to-transparent border-brand-primary/30 shadow-[inset_4px_0_0_#8B7EFA]' : 'bg-transparent border-transparent hover:bg-white/5'}`}>
                  <div className="flex justify-between items-center mb-3">
                     <p className="text-xs font-black tracking-widest text-[#E0E0E6]">#{item.id}</p>
                     {item.risk === 'alto' && <span className="bg-brand-emergency/10 text-brand-emergency text-[9px] font-extrabold px-2 py-1 rounded-md flex items-center gap-1.5 uppercase tracking-wider border border-brand-emergency/20"><span className="w-1.5 h-1.5 bg-brand-emergency rounded-full shadow-[0_0_5px_#e53e3e]"></span> SOS</span>}
                     {item.status === 'ativo' && item.risk !== 'alto' && <span className="bg-brand-primary/10 text-brand-primary text-[9px] font-extrabold px-2 py-1 rounded-md flex items-center gap-1.5 uppercase tracking-wider border border-brand-primary/20"><MessagesSquare size={10}/> Chat</span>}
                     {item.status === 'concluido' && <span className="bg-white/5 text-text-muted text-[9px] font-extrabold px-2 py-1 rounded-md flex items-center gap-1.5 uppercase tracking-wider border border-white/5"><Check size={10}/> Feito</span>}
                  </div>
                  <p className={`text-[13px] font-medium leading-relaxed line-clamp-1 mb-2 ${isActive ? 'text-white' : 'text-text-muted'}`}>
                     {item.messages.length > 0 ? item.messages[item.messages.length - 1].text : 'Sem mensagens...'}
                  </p>
                  <p className="text-[10px] font-semibold text-text-muted/60 uppercase tracking-widest">{item.messages.length > 0 ? item.messages[item.messages.length - 1].time : '-'}</p>
               </div>
             );
          })}
        </div>
      </div>

      {/* Column 2: Chat Window Premium */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0A0A10] relative">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        {currentChat ? (
          <>
            {/* Chat Header Glass */}
            <div className="h-[90px] px-8 border-b border-white/5 flex justify-between items-center bg-[#11111B]/80 backdrop-blur-xl z-20">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-gradient-to-br from-[#2B2B3C] to-[#1E1E2E] rounded-[1rem] flex items-center justify-center border border-white/10 shadow-inner">
                   <span className="text-xl">👤</span>
                 </div>
                 <div className="flex flex-col gap-1">
                    <h3 className="font-extrabold text-[15px] text-white tracking-tight">{currentChat.user}</h3>
                    <div className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-widest text-text-muted">
                       {currentChat.status === 'ativo' ? (
                          <span className="bg-[#34D399]/10 border border-[#34D399]/20 text-[#34D399] px-2 py-0.5 rounded flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#34D399] rounded-full shadow-[0_0_5px_#34D399]"></span> Ativo</span>
                       ) : (
                          <span className="bg-white/10 border border-white/20 text-white/50 px-2 py-0.5 rounded flex items-center gap-1.5">Concluído</span>
                       )}
                       {currentChat.risk === 'alto' && <span className="flex items-center gap-1 text-brand-emergency"><span className="w-1.5 h-1.5 bg-brand-emergency shadow-[0_0_5px_#e53e3e] rounded-full"></span> Alto Risco</span>}
                       {currentChat.risk !== 'alto' && <span className="flex items-center gap-1 text-yellow-500"><span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span> {currentChat.risk}</span>}
                    </div>
                 </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => navigate('/admin/dashboard')} className="px-5 py-2.5 glass-panel border border-white/10 hover:border-white/20 rounded-xl text-[11px] font-extrabold uppercase tracking-widest flex items-center gap-2 text-text-muted hover:text-white transition-all shadow-sm hover:-translate-y-0.5"><ArrowUpRight size={14} /> Voltar</button>
                {currentChat.status === 'ativo' && (
                  <button onClick={() => updateChatStatus(activeId, 'concluido')} className="px-5 py-2.5 bg-[#34D399]/10 border border-[#34D399]/30 text-[#34D399] hover:bg-[#34D399]/20 rounded-xl text-[11px] font-extrabold uppercase tracking-widest flex items-center gap-2 transition-all shadow-sm hover:-translate-y-0.5"><Check size={14} className="stroke-[3]" /> Encerrar</button>
                )}
              </div>
            </div>

        {/* Quick Help Pill Strip */}
        <div className="px-8 py-3 border-b border-white/5 flex gap-3 overflow-x-auto no-scrollbar bg-[#11111B]/40 backdrop-blur-md items-center z-10 w-full relative">
           <span className="text-[9px] uppercase font-black tracking-widest text-[#8B7EFA] mr-1 shrink-0">Respostas Prontas:</span>
           {['Olá! Estou aqui para te ajudar. Pode...', 'Entendo. Você está em local seguro?', 'Vamos solicitar uma viatura para o...'].map((txt, i) => (
             <button onClick={() => setInputVal(txt)} key={i} className="px-4 py-2 glass-panel border-white/10 rounded-lg text-[11px] font-medium text-text-muted hover:text-white hover:border-white/30 transition-all duration-300 whitespace-nowrap shadow-sm shrink-0">
               {txt}
             </button>
           ))}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 z-10 no-scrollbar relative">
           {messages.map((msg, i) => (
             <div key={i} className={`flex ${msg.sender === 'bot' || msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
               <div className="flex flex-col gap-1.5 max-w-[75%]">
                 <div className={`p-5 rounded-[2rem] shadow-xl ${
                   (msg.sender === 'bot' || msg.sender === 'admin') 
                   ? 'bg-gradient-to-br from-brand-primary to-[#7a6cf0] text-white rounded-tr-sm border border-brand-primary/50 text-[15px]'
                   : 'bg-[#181825] border border-white/5 text-white/90 rounded-tl-sm glass-card' 
                 }`}>
                   <p className="font-medium tracking-wide leading-relaxed">{msg.text}</p>
                 </div>
                 <p className={`text-[9px] font-bold tracking-widest uppercase text-text-muted/60 ${(msg.sender === 'bot' || msg.sender === 'admin') ? 'self-end mr-2' : 'self-start ml-2'}`}>
                   {(msg.sender === 'bot' || msg.sender === 'admin') ? 'VOCÊ' : 'Usuária'} • {msg.time}
                 </p>
               </div>
             </div>
           ))}
           <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 bg-[#11111B]/80 backdrop-blur-xl border-t border-white/5 z-20">
          <form onSubmit={handleSend} className="relative group max-w-4xl mx-auto">
             <div className="absolute inset-0 bg-brand-primary/20 rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
             <input 
               value={inputVal}
               onChange={(e) => setInputVal(e.target.value)}
               disabled={currentChat.status !== 'ativo'}
               placeholder={currentChat.status !== 'ativo' ? 'O atendimento foi encerrado.' : 'Escreva uma resposta para a usuária...'}
               className="w-full bg-[#181825]/90 glass-panel border border-white/10 rounded-[2rem] py-5 pl-6 pr-20 text-[15px] font-medium text-white placeholder-text-muted/60 focus:outline-none focus:border-brand-primary/50 transition-all shadow-inner relative z-10 disabled:opacity-50"
             />
             <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 z-20">
                 <button disabled={currentChat.status !== 'ativo'} type="submit" className="w-12 h-12 bg-white disabled:bg-gray-400 hover:bg-gray-100 text-[#11111B] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-transform hover:scale-105">
                   <Send size={18} className="ml-1" />
                 </button>
             </div>
          </form>
        </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-text-muted opacity-50 relative z-10">
            <MessagesSquare size={48} className="mb-4" />
            <p className="font-bold tracking-widest uppercase">Nenhum atendimento selecionado</p>
          </div>
        )}
      </div>

      {/* Column 3: Detalhes do Caso Ultra Glass */}
      <div className="w-[360px] bg-[#11111B]/90 backdrop-blur-2xl border-l border-white/5 flex flex-col flex-shrink-0 z-30 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]">
        {currentChat ? (
        <>
        <div className="p-8 border-b border-white/5">
          <h2 className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-8">Informações do Caso</h2>
          
          <div className="space-y-6">
            <div className="glass-panel p-5 rounded-2xl border-white/5">
              <p className="text-[9px] text-text-muted uppercase font-black mb-1.5 tracking-widest">ID do Caso</p>
              <p className="text-xl font-black text-white tracking-tight">#{currentChat.id}</p>
            </div>
            
            <div className="flex justify-between items-center bg-white/5 px-5 py-4 rounded-2xl border border-white/5">
              <span className="text-[10px] text-text-muted uppercase font-black tracking-widest">Nível de Risco</span>
              <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase flex items-center w-max gap-2 ${currentChat.risk === 'alto' ? 'bg-brand-emergency/10 border border-brand-emergency/30 text-brand-emergency' : 'bg-yellow-500/10 border border-yellow-500/30 text-yellow-500'}`}>
                <span className={`w-2 h-2 rounded-full ${currentChat.risk === 'alto' ? 'bg-brand-emergency shadow-[0_0_5px_#e53e3e]' : 'bg-yellow-500 shadow-[0_0_5px_#eab308]'}`}></span> {currentChat.risk}
              </span>
            </div>
            
            <div className="space-y-1">
              <p className="text-[9px] text-text-muted uppercase font-black mb-1 tracking-widest px-2">Localização Aprox.</p>
              <p className="text-[13px] font-bold text-white px-2">{currentChat.location}</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-[9px] text-text-muted uppercase font-black mb-1 tracking-widest px-2">Atendente Responsável</p>
              <p className="text-[13px] font-bold text-brand-primary border-b border-dashed border-brand-primary/50 w-fit pb-0.5 cursor-pointer hover:text-[#a69bff] ml-2">Dra. Ana Lima</p>
            </div>
          </div>
        </div>

        <div className="p-8 border-b border-white/5">
          <h2 className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-5">Ações Críticas</h2>
          <div className="space-y-3">
             <button onClick={() => alert(`Viatura 190 solicitada para: ${currentChat.location}`)} className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center gap-3 text-xs font-bold transition-all shadow-sm group">
                <CarFront size={16} className="text-text-muted group-hover:text-white transition-colors" /> Acionar Delegacia
             </button>
             <button onClick={() => alert('Abrindo mapa de parceiros próximos...')} className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center gap-3 text-xs font-bold transition-all shadow-sm group">
                <MapPin size={16} className="text-text-muted group-hover:text-white transition-colors" /> Ver Serviços Próximos
             </button>
             {currentChat.status === 'ativo' && (
               <button onClick={() => updateChatStatus(activeId, 'concluido')} className="w-full py-4 mt-2 bg-brand-emergency/5 hover:bg-brand-emergency/20 border border-brand-emergency/30 hover:border-brand-emergency/50 text-brand-emergency rounded-2xl flex items-center justify-center gap-3 text-xs font-bold transition-all shadow-sm shadow-brand-emergency/10">
                  <StopCircle size={16} /> Encerrar Atendimento
               </button>
             )}
          </div>
        </div>

        <div className="p-8 flex-1 flex flex-col">
          <h2 className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-4">Notas Internas Confidenciais</h2>
          <textarea 
            value={localNote}
            onChange={(e) => setLocalNote(e.target.value)}
            onBlur={handleNoteBlur}
            disabled={currentChat.status !== 'ativo'}
            className="flex-1 w-full bg-[#181825]/80 glass-panel border border-white/5 rounded-2xl p-5 text-xs font-medium resize-none focus:outline-none focus:border-brand-primary/50 transition-all text-white placeholder-text-muted/60 disabled:opacity-50"
            placeholder="Registro clínico e observações do caso (visível apenas para a equipe superior)..."
          ></textarea>
        </div>
        </>
        ) : (
          <div className="flex-1 flex items-center justify-center opacity-30">
            <span className="text-[10px] tracking-widest font-bold uppercase text-white">Selecione</span>
          </div>
        )}
      </div>

    </div>
  );
}