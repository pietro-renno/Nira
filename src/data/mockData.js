export const mockStats = [
  { label: 'CASOS DENUNCIADOS', value: '1/4' },
  { label: '1 VÍTIMA A CADA', value: '4min' },
  { label: 'SEM REGISTRO PRÉVIO', value: '70%' }
];

export const mockTeam = [
  { name: 'Giovanna', role: 'Qa/Docs' },
  { name: 'Samuel', role: 'BackEnd' },
  { name: 'Kauã', role: 'UX/Design' },
  { name: 'Pietro', role: 'Full Stack' },
  { name: 'Lucas', role: 'Frontend/React' }
];

export const mockArticles = [
  {
    id: 1,
    title: 'Seus direitos: Guia Completo da Lei Maria da Penha',
    description: 'Entenda como a Lei 11.340/2006 protege mulheres em situação de violência doméstica...',
    category: 'Direitos',
    author: 'ONG Vida Nova',
    readTime: '8 min de leitura',
    date: '05 mar. 2026',
    featured: true,
    tags: ['Direitos']
  },
  {
    id: 2,
    title: 'Saúde mental após o trauma: como iniciar a recuperação',
    description: 'Guia de suporte mental para superar os desafios iniciais pós-trauma.',
    category: 'Saúde Mental',
    author: 'Centro Renascer',
    readTime: '5 min de leitura',
    date: '10 fev. 2026',
    featured: false,
    tags: ['Saúde Mental']
  },
  {
    id: 3,
    title: 'Segurança digital: como proteger seu celular do agressor',
    description: 'Táticas simples e eficientes para evitar espionagem e rastreamento no seu aparelho.',
    category: 'Segurança',
    author: 'Instituto Digital Seguro',
    readTime: '6 min de leitura',
    date: '02 abr. 2026',
    featured: false,
    tags: ['Segurança']
  },
  {
    id: 4,
    title: 'Como sair de casa com segurança: guia prático',
    description: 'Passos essenciais para planejar sua saída de um ambiente doméstico violento de forma segura.',
    category: 'Segurança',
    author: 'ONG Vida Nova',
    readTime: '7 min de leitura',
    date: '15 mar. 2026',
    featured: false,
    tags: ['Segurança']
  },
  {
    id: 5,
    title: 'Como fazer um boletim de ocorrência: passo a passo',
    description: 'Instruções simples de como você deve proceder formalmente nas autoridades locais.',
    category: 'Direitos',
    author: 'Centro Renascer',
    readTime: '4 min de leitura',
    date: '12 nov. 2025',
    featured: false,
    tags: ['Direitos']
  },
  {
    id: 6,
    title: 'Protegendo os Filhos em Situações de Violência Doméstica',
    description: 'Orientações focadas na segurança e bem-estar psicológico infantil durante conflitos.',
    category: 'Família',
    author: 'Instituto Família Segura',
    readTime: '5 min de leitura',
    date: '20 jan. 2026',
    featured: false,
    tags: ['Família']
  }
];

export const mockAlerts = [
  { id: '0041', user: 'Usuária #0041', location: 'São José dos Campos, SP', time: 'há 3 min', status: 'ativo', risk: 'alto', logs: ['S.O.S. ativado - Localização recebida - 10:52'] },
  { id: '0040', user: 'Usuária anônima • #0040', location: 'São Paulo, SP', time: 'Ontem', status: 'ativo', risk: 'médio', logs: ['Sofri agressão ontem à noite... - 10:41'] },
  { id: '0039', user: 'Usuária #0039', location: 'Belo Horizonte, MG', time: 'Ontem', status: 'concluido', risk: 'baixo', logs: ['Conversa encerrada - 09:18'] }
];

export const mockUsersMap = [
  { id: 1, name: 'André Silva', status: 'Inativo', region: null },
  { id: 2, name: 'Pedro Souza', status: 'Ativo', region: 'Sul' },
  { id: 3, name: 'Maria Fernanda', status: 'Ativo', region: 'Norte' }
];

export const mockProfessionals = [
  { id: 1, name: 'Administrador', login: 'admin', profile: 'ADM', specialty: '-', link: 'Equipe NIRA', access: 'Tudo', status: 'Ativo' },
  { id: 2, name: 'ONG Vida Nova', login: 'ong_vida', profile: 'ONG', specialty: '-', link: '-', access: 'Chat', status: 'Ativo' },
  { id: 3, name: 'Dra. Ana Lima', login: 'psicologa01', profile: 'Prof.', specialty: 'Psicólogo(a)', link: 'ONG Vida Nova', access: 'Chat', status: 'Ativo' }
];
