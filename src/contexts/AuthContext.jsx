import React, { createContext, useContext, useState } from 'react';

import { ESPECIALIDADES, ESPEC_CHAT, ESPEC_MAPA, VINCULOS } from './AuthConstants';

// === DADOS MOCK INICIAIS ===
const USUARIOS_INIT = [
  { id: 1, usuario: 'admin', senha: '123', role: 'adm', nome: 'Administrador NIRA', ativo: true },
  { id: 2, usuario: 'ong_vida', senha: '123', role: 'ong', nome: 'ONG Vida Nova', ativo: true },
  { id: 3, usuario: 'psicologa01', senha: '123', role: 'funcionario', nome: 'Dra. Ana', especialidade: 'psicologo', vinculo: 'ong:2', ongId: 2, ativo: true },
  { id: 4, usuario: 'policial01', senha: '123', role: 'funcionario', nome: 'Cb. Marques', especialidade: 'policial', vinculo: 'nira', ativo: true, lat: -23.1800, lng: -45.8950 },
  { id: 5, usuario: 'agente01', senha: '123', role: 'funcionario', nome: 'Sgt. Fontes', especialidade: 'agente', vinculo: 'nira', ativo: true, lat: -23.1788, lng: -45.8852, area: 'Setor Central' },
  { id: 6, usuario: 'agente02', senha: '123', role: 'funcionario', nome: 'Ag. Lima', especialidade: 'agente', vinculo: 'nira', ativo: true, lat: -23.1650, lng: -45.8720, area: 'Zona Norte' },
  { id: 7, usuario: 'agente03', senha: '123', role: 'funcionario', nome: 'Ag. Rocha', especialidade: 'agente', vinculo: 'nira', ativo: true, lat: -23.1920, lng: -45.9010, area: 'Zona Sul' }
];

const ONGS_INIT = [
  { id: 2, nome: 'ONG Vida Nova' },
  { id: 7, nome: 'Instituto Renascer' }
];

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); 
  const [usuarios, setUsuarios] = useState(USUARIOS_INIT);
  const [ongs, setOngs] = useState(ONGS_INIT);

  // Sincroniza o usuário logado com as atualizações da lista global (ex: novas notificações)
  React.useEffect(() => {
    if (user) {
      const atualizado = usuarios.find(u => u.id === user.id);
      if (atualizado) setUser(atualizado);
    }
  }, [usuarios]);

  function login(usuario, senha) {
    const encontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha && u.ativo !== false);
    if (encontrado) {
      setUser(encontrado);
      return { ok: true, role: encontrado.role, user: encontrado };
    }
    return { ok: false };
  }

  function logout() {
    setUser(null);
  }

  function adicionarUsuario(dados) {
    setUsuarios(us => [...us, { ...dados, id: Date.now() }]);
  }

  function toggleAtivo(id) {
    setUsuarios(us => us.map(u => u.id === id ? { ...u, ativo: !u.ativo } : u));
  }

  function removerUsuario(id) {
    setUsuarios(us => us.filter(u => u.id !== id));
  }

  function getVinculoLabel(vinculo, ongId) {
    if (vinculo === 'nira') return '🦉 Equipe NIRA';
    if (vinculo === 'autonomo') return '🏷️ Autônomo(a)';
    if (vinculo && vinculo.startsWith('ong:')) {
      const oid = parseInt(vinculo.split(':')[1]);
      const o = ongs.find(ong => ong.id === oid);
      return o ? `🤝 ${o.nome}` : '🤝 ONG';
    }
    return '—';
  }

  function getFuncionarios() {
    return usuarios.filter(u => u.role === 'funcionario');
  }

  function alocarFuncionario(id, area, lat, lng) {
    setUsuarios(us => us.map(u => {
      if (u.id === id) {
        const novaNotif = {
          id: Date.now(),
          titulo: 'Nova Alocação',
          texto: `Você foi alocado(a) para a zona ${area}.`,
          data: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          lida: false,
          posOrigem: { lat: u.lat || -23.1788, lng: u.lng || -45.8852 },
          posDestino: { lat, lng }
        };
        return { 
          ...u, 
          area, 
          lat, 
          lng, 
          notificacoes: [novaNotif, ...(u.notificacoes || [])] 
        };
      }
      return u;
    }));
  }

  function marcarNotifLida(notifId) {
    if (!user) return;
    setUser(curr => ({
      ...curr,
      notificacoes: curr.notificacoes.map(n => n.id === notifId ? { ...n, lida: true } : n)
    }));
    // Sincronizar na lista global
    setUsuarios(us => us.map(u => u.id === user.id ? {
      ...u,
      notificacoes: u.notificacoes.map(n => n.id === notifId ? { ...n, lida: true } : n)
    } : u));
  }

  function getNotifsNaoLidas() {
    return user?.notificacoes?.filter(n => !n.lida) || [];
  }

  function getONGs() {
    return ongs;
  }

  return (
    <AuthContext.Provider value={{
      user,
      usuarios,
      login,
      logout,
      adicionarUsuario,
      toggleAtivo,
      removerUsuario,
      getVinculoLabel,
      getONGs,
      getFuncionarios,
      alocarFuncionario,
      marcarNotifLida,
      getNotifsNaoLidas
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
