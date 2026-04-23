import React, { createContext, useContext, useState } from 'react';

// === CONSTANTES GLOBAIS ===
export const ESPECIALIDADES = [
  { value: 'psicologo', label: 'Psicólogo(a)', icon: '🧠', acesso: 'chat' },
  { value: 'assistente_social', label: 'Assistente Social', icon: '🤝', acesso: 'chat' },
  { value: 'policial', label: 'Policial / Segurança', icon: '👮', acesso: 'mapa' },
  { value: 'agente', label: 'Agente de Campo', icon: '🚗', acesso: 'mapa' }
];

export const ESPEC_CHAT = ['psicologo', 'assistente_social'];
export const ESPEC_MAPA = ['policial', 'agente'];

export const VINCULOS = [
  { value: 'nira', label: 'Equipe NIRA', icon: '🦉' },
  { value: 'autonomo', label: 'Profissional Autônomo(a)', icon: '🏷️' }
];

// === DADOS MOCK INICIAIS ===
const USUARIOS_INIT = [
  { id: 1, usuario: 'admin', senha: '123', role: 'adm', nome: 'Administrador NIRA', ativo: true },
  { id: 2, usuario: 'ong_vida', senha: '123', role: 'ong', nome: 'ONG Vida Nova', ativo: true },
  { id: 3, usuario: 'psicologa01', senha: '123', role: 'funcionario', nome: 'Dra. Ana', especialidade: 'psicologo', vinculo: 'ong:2', ongId: 2, ativo: true },
  { id: 4, usuario: 'policial01', senha: '123', role: 'funcionario', nome: 'Cb. Marques', especialidade: 'policial', vinculo: 'nira', ativo: false }
];

const ONGS_INIT = [
  { id: 2, nome: 'ONG Vida Nova' },
  { id: 7, nome: 'Instituto Renascer' }
];

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(USUARIOS_INIT[0]); // Por padrão logado no Admin
  const [usuarios, setUsuarios] = useState(USUARIOS_INIT);
  const [ongs, setOngs] = useState(ONGS_INIT);

  function login(usuario, senha) {
    const encontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha && u.ativo !== false);
    if (encontrado) {
      setUser(encontrado);
      return { ok: true, role: encontrado.role };
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
      getONGs
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
