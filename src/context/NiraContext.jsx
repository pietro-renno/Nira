import { createContext, useState, useEffect } from 'react';
import { mockArticles, mockAlerts, mockUsersMap, mockProfessionals } from '../data/mockData';

export const NiraContext = createContext();

export function NiraProvider({ children }) {
  const [articles, setArticles] = useState(mockArticles);
  const [users, setUsers] = useState([
    ...mockProfessionals,
    { id: 4, name: 'Dra. Carla Matos', login: 'psicologa02', profile: 'Prof.', specialty: 'Psicólogo(a)', link: 'Autônomo(a)', access: 'Chat', status: 'Ativo' },
    { id: 5, name: 'Rafael Souza', login: 'social02', profile: 'Prof.', specialty: 'Assistente Social', link: 'Equipe NIRA', access: 'Chat', status: 'Ativo' },
    { id: 6, name: 'Centro Renascer', login: 'ong_renascer', profile: 'ONG', specialty: '-', link: '-', access: 'Chat', status: 'Ativo' }
  ]);
  const [mapAgents, setMapAgents] = useState(mockUsersMap);
  const [alerts, setAlerts] = useState(mockAlerts);
  
  // Chats State (Persistido no localStorage para comunicação entre abas)
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem('nira_chats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Erro ao carregar chats do localStorage", e);
      }
    }
    return mockAlerts.map(alert => ({
      id: alert.id,
      user: alert.user,
      location: alert.location,
      status: alert.status,
      risk: alert.risk,
      messages: [
        { id: 1, sender: alert.user.toLowerCase().includes('anônimo') ? 'user' : 'bot', text: alert.logs[0], time: '10:00' }
      ],
      internalNote: '',
      isTyping: { user: false, prof: false }
    }));
  });

  // Heatmap Points (Simulados para o painel tático)
  const [heatmapPoints, setHeatmapPoints] = useState([
    [-23.179, -45.885, 0.8], [-23.181, -45.887, 0.6], [-23.175, -45.880, 0.9],
    [-23.190, -45.890, 0.5], [-23.185, -45.875, 0.7], [-23.200, -45.900, 0.4],
    [-23.170, -45.860, 0.6], [-23.165, -45.870, 0.8], [-23.180, -45.910, 0.3]
  ]);

  // Persistir no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('nira_chats', JSON.stringify(chats));
  }, [chats]);

  // Ouvir mudanças de outras abas
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'nira_chats' && e.newValue) {
        try {
          setChats(JSON.parse(e.newValue));
        } catch (err) {
          console.error("Erro ao sincronizar chats entre abas", err);
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);
  
  // Auth State
  const [auth, setAuth] = useState({ isAuthenticated: false, userRole: null });

  // Functions
  const login = (role) => {
    setAuth({ isAuthenticated: true, userRole: role });
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, userRole: null });
  };

  const addSOSAlert = () => {
    const newId = `S${Math.floor(Math.random() * 1000)}`;
    // Gera coordenadas aleatórias aproximadas para SJC
    const randomLat = -23.17 + (Math.random() * 0.04 - 0.02);
    const randomLng = -45.88 + (Math.random() * 0.04 - 0.02);
    
    const newAlert = {
      id: newId,
      user: `ANÔNIMO • #${newId}`,
      location: 'São José dos Campos, SP',
      time: 'Agora',
      status: 'ativo',
      risk: 'alto',
      lat: randomLat,
      lng: randomLng,
      ticketCode: `NIRA-${newId}`,
      logs: ['S.O.S. ativado via botão de emergência']
    };
    setAlerts([newAlert, ...alerts]);
    setChats([{
      id: newId,
      user: newAlert.user,
      location: newAlert.location,
      status: 'ativo',
      risk: 'alto',
      messages: [{ id: 1, sender: 'bot', text: '🚨 S.O.S ATIVADO! Já notificamos as autoridades e nossa equipe de prontidão. Permaneça em local seguro se puder.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }],
      internalNote: ''
    }, ...chats]);
  };

  const startUserTriagem = () => {
    const newId = `T${Math.floor(Math.random() * 1000)}`;
    const newChat = {
      id: newId,
      user: `ANÔNIMO • #${newId}`,
      location: 'Desconhecida',
      status: 'ativo',
      risk: 'pendente',
      messages: [{ id: 1, sender: 'bot', text: 'Olá! Sou a PsiTech, seu chatbot de triagem da NIRA. Este espaço é 100% anônimo e seguro. Nenhum dado pessoal é coletado. Como posso te ajudar hoje?', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }],

      internalNote: ''
    };
    setChats(prev => [newChat, ...prev]);
    return newId;
  };

  const addChatMessage = (chatId, text, sender = 'user', type = 'text', once = false) => {
    setChats(prev => prev.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          unread: sender === 'user', // Marca como não lido se for mensagem da usuária
          messages: [...chat.messages, { 
            id: Date.now(), 
            sender, 
            text, 
            type, 
            once, 
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
          }]
        };
      }
      return chat;
    }));
  };

  const upsertChat = (chatData) => {
    setChats(prev => {
      const exists = prev.find(c => c.id === chatData.id);
      if (exists) {
        return prev.map(c => c.id === chatData.id ? { ...c, ...chatData } : c);
      }
      return [chatData, ...prev];
    });
  };

  const markChatAsRead = (chatId) => {
    setChats(prev => prev.map(chat => chat.id === chatId ? { ...chat, unread: false } : chat));
  };

  const updateChatStatus = (chatId, status) => {
    setChats(prev => prev.map(chat => chat.id === chatId ? { ...chat, status } : chat));
    setAlerts(prev => prev.map(alert => alert.id === chatId ? { ...alert, status } : alert));
  };

  const saveInternalNote = (chatId, note) => {
    setChats(prev => prev.map(chat => chat.id === chatId ? { ...chat, internalNote: note } : chat));
  };

  const setTypingStatus = (chatId, role, isTyping) => {
    setChats(prev => prev.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          isTyping: { ...chat.isTyping, [role]: isTyping }
        };
      }
      return chat;
    }));
  };

  const burnMessage = (chatId, messageId) => {
    setChats(prev => prev.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          messages: chat.messages.map(m => m.id === messageId ? { ...m, burned: true, text: '🗑️ Esta mensagem expirou (Visualização Única)' } : m)
        };
      }
      return chat;
    }));
  };

  const deleteArticle = (articleId) => {
    setArticles(prev => prev.filter(a => a.id !== articleId));
  };

  const toggleArticleStatus = (articleId) => {
    setArticles(prev => prev.map(a => a.id === articleId ? { ...a, featured: !a.featured } : a));
  };

  const toggleUserStatus = (userId) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: u.status === 'Ativo' ? 'Inativo' : 'Ativo' } : u));
  };

  const deleteUser = (userId) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  const allocateMapAgent = (agentId, zone) => {
    setMapAgents(prev => prev.map(agent => agent.id === agentId ? { ...agent, region: zone } : agent));
  };

  return (
    <NiraContext.Provider value={{
      articles,
      users,
      mapAgents,
      alerts,
      chats,
      heatmapPoints,
      auth,
      login,
      logout,
      addSOSAlert,
      startUserTriagem,
      addChatMessage,
      upsertChat,
      markChatAsRead,
      updateChatStatus,
      saveInternalNote,
      setTypingStatus,
      burnMessage,
      deleteArticle,
      toggleArticleStatus,
      toggleUserStatus,
      allocateMapAgent,
      addArticle: (art) => setArticles(prev => [{...art, id: Date.now()}, ...prev]),
      updateArticle: (id, data) => setArticles(prev => prev.map(a => a.id === id ? {...a, ...data} : a))
    }}>
      {children}
    </NiraContext.Provider>
  );
}
