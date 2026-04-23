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
    description: 'Entenda como a Lei 11.340/2006 protege mulheres em situação de violência doméstica e familiar.',
    category: 'Direitos',
    author: 'ONG Vida Nova',
    readTime: '8 min',
    date: '05 mar. 2026',
    featured: true,
    tags: ['Direitos'],
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'Saúde mental após o trauma: início da jornada',
    description: 'Guia de suporte mental para superar desafios emocionais com ajuda especializada e acolhimento.',
    category: 'Saúde Mental',
    author: 'Centro Renascer',
    readTime: '5 min',
    date: '10 fev. 2026',
    featured: false,
    tags: ['Saúde Mental'],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: 'Segurança digital: como se proteger online',
    description: 'Táticas eficientes para evitar espionagem e rastreamento indesejado no seu celular e contas.',
    category: 'Segurança',
    author: 'Equipe NIRA',
    readTime: '6 min',
    date: '02 abr. 2026',
    featured: false,
    tags: ['Segurança'],
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    title: 'Rede de Apoio: Onde encontrar ajuda próxima',
    description: 'Lista completa de centros de referência e casas de acolhimento em todo o território nacional.',
    category: 'Apoio',
    author: 'Instituto NIRA',
    readTime: '10 min',
    date: '15 jan. 2026',
    featured: false,
    tags: ['Apoio'],
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 5,
    title: 'Ciclo da Violência: Como identificar os sinais',
    description: 'Aprenda a reconhecer as fases do ciclo de abuso e como quebrar esse padrão de forma segura.',
    category: 'Segurança',
    author: 'ONG Vida Nova',
    readTime: '7 min',
    date: '20 mar. 2026',
    featured: false,
    tags: ['Segurança'],
    image: 'https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 6,
    title: 'Direitos da Família: Guarda e Pensão',
    description: 'Esclarecimentos sobre os direitos dos filhos e procedimentos legais em caso de separação por violência.',
    category: 'Família',
    author: 'Equipe NIRA',
    readTime: '9 min',
    date: '28 mar. 2026',
    featured: false,
    tags: ['Família'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 7,
    title: 'Recuperação Econômica e Autonomia',
    description: 'Programas de capacitação e apoio financeiro para mulheres que buscam independência do agressor.',
    category: 'Direitos',
    author: 'Instituto NIRA',
    readTime: '6 min',
    date: '02 abr. 2026',
    featured: false,
    tags: ['Apoio'],
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 8,
    title: 'Violência Psicológica: O Abuso Invisível',
    description: 'Entenda como palavras e controle podem ferir tanto quanto agressões físicas e saiba onde buscar socorro.',
    category: 'Saúde Mental',
    author: 'Centro Renascer',
    readTime: '7 min',
    date: '05 abr. 2026',
    featured: false,
    tags: ['Saúde Mental'],
    image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 9,
    title: 'Planos de Fuga: Saindo com Segurança',
    description: 'Manual estratégico de como preparar uma saída de emergência sem alertar o monitoramento do agressor.',
    category: 'Segurança',
    author: 'Instituto NIRA',
    readTime: '12 min',
    date: '07 abr. 2026',
    featured: false,
    tags: ['Segurança'],
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800'
  }
];

export const mockAlerts = [
  { id: '0041', user: 'Usuária #0041', location: 'São José dos Campos, SP', time: '3 min', status: 'ativo', risk: 'alto', type: 'map', logs: ['S.O.S. ativado - Localização recebida - 10:52'] },
  { id: '0040', user: 'Usuária anônima • #0040', location: 'São Paulo, SP', time: 'Ontem', status: 'ativo', risk: 'médio', type: 'chat', logs: ['Sofri agressão ontem à noite... - 10:41'] },
  { id: '0038', user: 'Usuária #0038', location: 'Campinas, SP', time: 'Agora', status: 'ativo', risk: 'alto', type: 'map', logs: ['S.O.S. ativado - Localização recebida'] },
  { id: '0037', user: 'Anônima #0037', location: 'Curitiba, PR', time: 'Ontem', status: 'ativo', risk: 'baixo', type: 'chat', logs: ['Solicitação de apoio psicológico pendente'] },
  { id: '0039', user: 'Usuária #0039', location: 'Belo Horizonte, MG', time: 'Ontem', status: 'concluido', risk: 'baixo', type: 'chat', logs: ['Conversa encerrada - 09:18'] }
];

export const mockUsersMap = [
  { id: 1, name: 'André Silva', status: 'Inativo', region: null },
  { id: 2, name: 'Pedro Souza', status: 'Ativo', region: 'Sul' },
  { id: 3, name: 'Maria Fernanda', status: 'Ativo', region: 'Norte' }
];

export const mockProfessionals = [
  { id: 1, name: 'Administrador', login: 'admin', profile: 'ADM', specialty: '-', link: 'Equipe NIRA', access: 'Tudo', status: 'Ativo' },
  { id: 2, name: 'ONG Vida Nova', login: 'ong_vida', profile: 'ONG', specialty: '-', link: '-', access: 'Chat', status: 'Ativo' },
  { id: 3, name: 'Dra. Ana Lima', login: 'psicologa01', profile: 'Prof.', specialty: 'Psicólogo(a)', link: 'ONG Vida Nova', access: 'Chat', status: 'Ativo' },
  { id: 10, name: 'Sgt. Fontes', login: 'agente01', profile: 'Prof.', specialty: 'Agente de Campo', link: 'Equipe NIRA', access: 'Mapa', status: 'Ativo' }
];
