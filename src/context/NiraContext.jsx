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
  
  // Chats State (Simulating Back-end)
  const initialChats = mockAlerts.map(alert => ({
    id: alert.id,
    user: alert.user,
    location: alert.location,
    status: alert.status,
    risk: alert.risk,
    messages: [
      { id: 1, sender: alert.user.includes('anônima') ? 'user' : 'bot', text: alert.logs[0], time: '10:00' }
    ],
    internalNote: ''
  }));
  const [chats, setChats] = useState(initialChats);
  
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
    const newAlert = {
      id: newId,
      user: `Usuária #${newId}`,
      location: 'SP',
      time: 'Agora',
      status: 'ativo',
      risk: 'alto',
      logs: ['S.O.S. ativado via botão de emergência']
    };
    setAlerts([newAlert, ...alerts]);
    setChats([{
      id: newId,
      user: newAlert.user,
      location: newAlert.location,
      status: 'ativo',
      risk: 'alto',
      messages: [{ id: 1, sender: 'bot', text: 'S.O.S ativado. Estamos recebendo sua localização. Como podemos ajudar agora?', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }],
      internalNote: ''
    }, ...chats]);
  };

  const startUserTriagem = () => {
    const newId = `T${Math.floor(Math.random() * 1000)}`;
    const newChat = {
      id: newId,
      user: `Anônima #${newId}`,
      location: 'Desconhecida',
      status: 'ativo',
      risk: 'pendente',
      messages: [{ id: 1, sender: 'bot', text: 'Olá! Sou a PsiTech, a IA de triagem da NIRA. Este espaço é 100% anônimo e seguro. Nenhum dado pessoal é coletado. Como posso te ajudar hoje?', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }],
      internalNote: ''
    };
    setChats(prev => [newChat, ...prev]);
    return newId;
  };

  const addChatMessage = (chatId, text, sender = 'user') => {
    setChats(prev => prev.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          messages: [...chat.messages, { id: Date.now(), sender, text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]
        };
      }
      return chat;
    }));
  };

  const updateChatStatus = (chatId, status) => {
    setChats(prev => prev.map(chat => chat.id === chatId ? { ...chat, status } : chat));
    setAlerts(prev => prev.map(alert => alert.id === chatId ? { ...alert, status } : alert));
  };

  const saveInternalNote = (chatId, note) => {
    setChats(prev => prev.map(chat => chat.id === chatId ? { ...chat, internalNote: note } : chat));
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
      auth,
      login,
      logout,
      addSOSAlert,
      startUserTriagem,
      addChatMessage,
      updateChatStatus,
      saveInternalNote,
      deleteArticle,
      toggleArticleStatus,
      toggleUserStatus,
      deleteUser,
      allocateMapAgent
    }}>
      {children}
    </NiraContext.Provider>
  );
}
