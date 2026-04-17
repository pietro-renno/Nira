import { useState, useContext, useEffect } from 'react';
import { Send, AlertTriangle, UserPlus, FilePlus, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { NiraContext } from '../context/NiraContext';

export default function Chat() {
  const navigate = useNavigate();
  const { startUserTriagem, addChatMessage, addSOSAlert, chats } = useContext(NiraContext);
  const [chatId, setChatId] = useState(null);
  const [inputVal, setInputVal] = useState('');
  
  useEffect(() => {
    const newId = startUserTriagem();
    setChatId(newId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentChat = chats.find(c => c.id === chatId);
  const messages = currentChat ? currentChat.messages : [];

  const handleSend = (e) => {
    e?.preventDefault();
    if(!inputVal.trim() || !chatId) return;
    addChatMessage(chatId, inputVal, 'user');
    setInputVal('');
    
    // Simula resposta bot
    setTimeout(() => {
       addChatMessage(chatId, 'Estou analisando seu relato. Se precisar de ajuda imediata, use o botão S.O.S no topo.', 'bot');
    }, 1500);
  };

  const handleQuickReply = (text) => {
    if(!chatId) return;
    addChatMessage(chatId, text, 'user');
    if(text.includes('agora')) {
       // Aumenta risco
       setTimeout(() => {
          addChatMessage(chatId, 'Entendido. Elevei a prioridade deste chat. Nossa equipe está acompanhando. Mantenha-se segura.', 'bot');
       }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-bg-main relative text-text-main font-sans overflow-hidden animate-fade-in-up">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none animate-pulse" style={{ animationDuration: '7s' }}></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-emergency/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>

      {/* Header Centralizado Container */}
      <header className="px-6 py-5 bg-[#11111B]/80 glass-panel border-b border-white/5 flex items-center justify-between z-20 shadow-sm relative">
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        
        <div className="flex items-center gap-4">
          <Link to="/" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 transition-all hover:-translate-x-1">
            <ChevronLeft size={20} />
          </Link>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-primary/30 to-brand-primary/10 border border-brand-primary/40 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(139,126,250,0.2)]">
                <span className="text-xl">🤖</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#34D399] border-2 border-[#11111B] rounded-full animate-bounce"></span>
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                PsiTech <span className="bg-brand-primary/20 text-brand-primary px-2 py-0.5 rounded-md text-[10px] border border-brand-primary/30 uppercase tracking-widest font-bold">IA NIRA</span>
              </h2>
              <p className="text-xs font-semibold text-text-muted mt-0.5">Online • Triagem ativa</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
           <button className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 text-text-muted hover:text-white hover:bg-white/10 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm">
             Nova conversa
           </button>
           <button className="hidden sm:flex items-center gap-2 bg-brand-primary/10 border border-brand-primary/30 text-brand-primary hover:bg-brand-primary/20 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-[0_0_15px_rgba(139,126,250,0.1)]">
             <UserPlus size={16} /> Atendente humana
           </button>
           <button 
             onClick={() => {
               if(window.confirm('Acionar modo S.O.S de alto risco?')) {
                 addSOSAlert();
                 navigate('/chat');
               }
             }}
             className="flex items-center gap-2 bg-brand-emergency/10 border border-brand-emergency/50 hover:bg-brand-emergency hover:text-white text-brand-emergency px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-[0_0_15px_rgba(229,62,62,0.15)] group">
             <AlertTriangle size={16} className="group-hover:animate-pulse" /> S.O.S
           </button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 flex flex-col z-10 no-scrollbar max-w-4xl mx-auto w-full mb-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`} style={{animationDuration: '0.4s'}}>
            <div className="flex flex-col gap-1.5 max-w-[85%] md:max-w-[75%]">
              <div className={`p-5 rounded-[2rem] shadow-xl ${
                msg.sender === 'user' 
                ? 'bg-gradient-to-br from-brand-primary to-[#7a6cf0] text-white rounded-br-sm border border-white/10' 
                : 'glass-card text-white/90 rounded-bl-sm border border-white/5 bg-[#181825]/90'
              }`}>
                <p className="text-[15px] font-medium leading-relaxed tracking-wide">{msg.text}</p>
              </div>
              <p className={`text-[10px] font-bold tracking-widest text-text-muted/70 uppercase ${msg.sender === 'user' ? 'self-end mr-2' : 'self-start ml-2'}`}>{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area Base */}
      <div className="bg-[#11111B]/90 glass-panel border-t border-white/5 py-6 px-4 md:px-8 z-20 pb-10">
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
           {/* Option Pills */}
           <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar px-1">
             {[
               { text: '🔴 Está acontecendo agora' },
               { text: '🟡 Aconteceu recentemente' },
               { text: '🟢 Foi no passado' }
             ].map((opt, i) => (
               <button onClick={() => handleQuickReply(opt.text)} key={i} className="px-5 py-3 glass-panel border border-white/10 rounded-2xl text-xs font-bold text-text-muted hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-300 whitespace-nowrap shadow-sm hover:-translate-y-1">
                 {opt.text}
               </button>
             ))}
           </div>
           
           {/* Input field */}
           <form onSubmit={handleSend} className="relative group">
             <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-[#7a6cf0] rounded-[2rem] blur opacity-20 group-hover:opacity-30 transition-opacity duration-500 hidden md:block"></div>
             <input 
               value={inputVal}
               onChange={(e) => setInputVal(e.target.value)}
               placeholder="Escreva sua mensagem aqui..."
               className="w-full bg-[#181825]/95 backdrop-blur-xl border border-white/10 rounded-[2rem] py-5 pl-6 pr-20 text-[15px] font-medium text-white placeholder-text-muted/60 focus:outline-none focus:border-brand-primary/50 transition-all shadow-inner relative z-10"
             />
             <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 z-20">
                <button type="button" className="w-10 h-10 rounded-full flex items-center justify-center text-text-muted hover:bg-white/5 hover:text-white transition-colors">
                  <FilePlus size={20} />
                </button>
                <button type="submit" className="w-12 h-12 bg-white hover:bg-gray-100 text-[#11111B] rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95">
                  <Send size={20} className="ml-1" />
                </button>
             </div>
           </form>
           <p className="text-center text-[10px] font-bold uppercase tracking-widest text-text-muted/50 mt-2">Tecnologia PsiTech AI • Criptografia Fim-a-Fim</p>
        </div>
      </div>
      
    </div>
  );
}