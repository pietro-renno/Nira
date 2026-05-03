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
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
    content: `
      <p>A Lei Maria da Penha (Lei nº 11.340/2006) é considerada pela Organização das Nações Unidas como uma das três melhores legislações do mundo no combate à violência contra as mulheres. Mas você sabe exatamente o que ela cobre?</p>
      
      <h3>Os 5 Tipos de Violência</h3>
      <p>Muitas pessoas acreditam que a lei só se aplica a agressões físicas, mas ela define cinco tipos de violência:</p>
      <ul>
        <li><strong>Física:</strong> Qualquer conduta que ofenda a integridade ou saúde corporal.</li>
        <li><strong>Psicológica:</strong> Qualquer conduta que cause dano emocional, diminuição da autoestima ou controle do comportamento.</li>
        <li><strong>Sexual:</strong> Constranger a presenciar, a manter ou a participar de relação sexual não desejada.</li>
        <li><strong>Patrimonial:</strong> Retenção, subtração, destruição parcial ou total de objetos, instrumentos de trabalho ou documentos.</li>
        <li><strong>Moral:</strong> Configura calúnia, difamação ou injúria.</li>
      </ul>

      <h3>Medidas Protetivas de Urgência</h3>
      <p>As medidas protetivas são ordens judiciais que visam proteger a vítima, afastando o agressor do lar e proibindo o contato com a mulher e seus familiares. Elas devem ser concedidas pelo juiz em até 48 horas.</p>

      <h3>Como Denunciar?</h3>
      <p>A denúncia pode ser feita em qualquer Delegacia da Mulher (DEAM) ou delegacia comum. Além disso, o Ligue 180 é um canal gratuito e anônimo que oferece orientações e encaminhamento para serviços de proteção.</p>
    `
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
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    content: `
      <p>O impacto psicológico de uma situação de violência é profundo e, muitas vezes, invisível. O processo de cura não é linear e exige paciência e suporte adequado.</p>

      <h3>O que é o Trauma?</h3>
      <p>O trauma é uma resposta emocional a um evento terrível. Imediatamente após o evento, o choque e a negação são típicos. Reações a longo prazo incluem emoções imprevisíveis, flashbacks e relacionamentos tensos.</p>

      <h3>Passos para a Recuperação</h3>
      <ol>
        <li><strong>Busque Ajuda Profissional:</strong> Terapeutas especializados em trauma podem oferecer ferramentas seguras para processar as emoções.</li>
        <li><strong>Construa uma Rede de Apoio:</strong> Estar perto de pessoas que validam sua experiência é fundamental para a recuperação.</li>
        <li><strong>Autocuidado Consciente:</strong> Práticas que reconectam a mente com o corpo, como meditação ou exercícios leves, ajudam a regular o sistema nervoso.</li>
      </ol>

      <p>Lembre-se: sentir-se vulnerável é uma resposta normal a uma situação anormal. Você não está sozinha nessa jornada.</p>
    `
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
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
    content: `
      <p>Em tempos de hiperconectividade, a violência também se manifesta no ambiente digital. O monitoramento do celular é uma das formas mais comuns de controle.</p>

      <h3>Dicas de Ouro para sua Segurança:</h3>
      <ul>
        <li><strong>Modo Anônimo:</strong> Sempre que pesquisar sobre seus direitos ou ajuda, utilize a aba anônima do navegador.</li>
        <li><strong>Verificação em Duas Etapas:</strong> Ative essa função em todas as suas redes sociais e e-mails para evitar invasões.</li>
        <li><strong>Cuidado com o GPS:</strong> Verifique quais aplicativos têm acesso à sua localização e desative o compartilhamento em tempo real.</li>
        <li><strong>Senhas Fortes:</strong> Evite dates de aniversário ou nomes de familiares. Use gerenciadores de senhas se possível.</li>
      </ul>

      <h3>Stalkerware: O que é?</h3>
      <p>São aplicativos instalados sem o seu consentimento para monitorar suas mensagens e chamadas. Se o seu celular esquenta muito ou a bateria acaba rápido demais, ele pode estar infectado.</p>
    `
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
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=800',
    content: `
      <p>Ninguém deve enfrentar a violência sozinha. A rede de apoio é composta por diversos órgãos que trabalham de forma integrada.</p>

      <h3>Principais Serviços:</h3>
      <ul>
        <li><strong>DEAM:</strong> Delegacias Especializadas de Atendimento à Mulher.</li>
        <li><strong>CRAS/CREAS:</strong> Centros de Referência de Assistência Social que oferecem suporte psicossocial.</li>
        <li><strong>Casas Abrigo:</strong> Locais seguros de moradia temporária para mulheres em risco de morte.</li>
        <li><strong>Defensoria Pública:</strong> Assistência jurídica gratuita para quem não pode pagar um advogado.</li>
      </ul>

      <p>O NIRA conecta você diretamente a essas redes através do nosso mapa e chat de triagem. A informação é o primeiro passo para a liberdade.</p>
    `
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
    image: 'https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?auto=format&fit=crop&q=80&w=800',
    content: `
      <p>A violência doméstica raramente começa com uma agressão física. Ela segue um padrão cíclico que dificulta a saída da vítima.</p>

      <h3>As 3 Fases do Ciclo:</h3>
      <ol>
        <li><strong>Aumento da Tensão:</strong> O agressor demonstra irritabilidade por coisas banais, humilha e ameaça. A mulher tenta acalmar a situação.</li>
        <li><strong>Explosão da Violência:</strong> Ocorre a agressão física, verbal ou sexual. O agressor perde o controle total.</li>
        <li><strong>Lua de Mel:</strong> O agressor pede perdão, jura que vai mudar e demonstra um carinho excessivo. A vítima acredita e mantém a esperança.</li>
      </ol>

      <p>Identificar que você está dentro deste ciclo é o primeiro passo para buscar ajuda e romper o padrão de abusos.</p>
    `
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
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    content: `
      <p>Muitas mulheres permanecem em relacionamentos abusivos por medo de perder a guarda dos filhos ou por dependência financeira.</p>

      <h3>Guarda e Segurança</h3>
      <p>Em casos de violência doméstica, a justiça prioriza a segurança das crianças. Medidas protetivas podem incluir a suspensão de visitas ou visitas assistidas para garantir que o agressor não utilize os filhos para continuar o abuso.</p>

      <h3>Pensão Alimentícia</h3>
      <p>O direito à pensão é dos filhos e não pode ser condicionado ao comportamento da mãe. O não pagamento da pensão pode levar à prisão do devedor.</p>
    `
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
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800',
    content: `
      <p>A autonomia financeira é um dos pilares para a liberdade definitiva. O controle do dinheiro pelo agressor é uma forma de violência patrimonial.</p>

      <h3>Dicas para Começar:</h3>
      <ul>
        <li><strong>Abra uma conta própria:</strong> Se possível, tenha uma conta bancária que o agressor não tenha acesso.</li>
        <li><strong>Cursos Gratuitos:</strong> Existem diversas ONGs e instituições que oferecem capacitação gratuita em áreas como tecnologia, artesanato e gestão.</li>
        <li><strong>Microcrédito:</strong> Informe-se sobre linhas de crédito específicas para mulheres empreendedoras vítimas de violência.</li>
      </ul>
    `
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
    image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=800',
    content: `
      <p>Diferente da violência física, a psicológica não deixa marcas na pele, mas as cicatrizes emocionais podem durar a vida toda.</p>

      <h3>Sinais de Alerta:</h3>
      <ul>
        <li><strong>Gaslighting:</strong> O agressor faz você duvidar da sua própria memória ou sanidade.</li>
        <li><strong>Isolamento:</strong> Ele impede que você veja amigos e familiares.</li>
        <li><strong>Monitoramento:</strong> Ele controla suas redes sociais, horários e roupas.</li>
        <li><strong>Humilhação:</strong> Ele te critica constantemente, em público ou privado.</li>
      </ul>

      <p>Se você se sente constantemente "pisando em ovos", procure ajuda. O NIRA está aqui para te acolher.</p>
    `
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
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800',
    content: `
      <p>Sair de um relacionamento abusivo é o momento de maior perigo para a mulher. Por isso, ter um plano traçado é essencial.</p>

      <h3>A "Mochila de Emergência":</h3>
      <p>Tenha uma bolsa pequena escondida com:</p>
      <ul>
        <li>Documentos originais ou cópias (RG, CPF, Certidões).</li>
        <li>Uma muda de roupa para você e seus filhos.</li>
        <li>Um pouco de dinheiro em espécie.</li>
        <li>Carregador de celular e números de emergência anotados em papel.</li>
      </ul>

      <h3>Dicas de Segurança:</h3>
      <p>Estabeleça uma palavra-chave com uma pessoa de confiança para indicar que você precisa de ajuda sem alertar o agressor. Se decidir sair, faça-o em um momento em que ele não esteja em casa.</p>
    `
  },
  {
    id: 10,
    title: 'Rede de Solidariedade: Vizinhos que Protegem',
    description: 'Como criar uma rede de apoio local com pessoas de confiança para monitoramento mútuo.',
    category: 'Apoio',
    author: 'Comunidade NIRA',
    readTime: '5 min',
    date: '12 abr. 2026',
    featured: false,
    tags: ['Apoio'],
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800',
    content: `
      <p>A segurança coletiva é uma das ferramentas mais poderosas contra a violência. Quando vizinhos se unem, o agressor se sente vigiado e a vítima se sente protegida.</p>
      <h3>Como Começar sua Rede?</h3>
      <p>Identifique pelo menos duas pessoas próximas (vizinhos, comerciantes) de quem você confia. Compartilhe sua situação de forma discreta e estabeleça sinais visuais (como uma luz acesa ou um objeto na janela) que indiquem que você precisa que alguém chame a polícia.</p>
    `
  },
  {
    id: 11,
    title: 'Impacto na Infância: Protegendo os Pequenos',
    description: 'Entenda como a exposição à violência afeta o desenvolvimento infantil e como acolher seus filhos.',
    category: 'Família',
    author: 'Psicologia Infantil NIRA',
    readTime: '10 min',
    date: '15 abr. 2026',
    featured: false,
    tags: ['Família', 'Saúde Mental'],
    image: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&q=80&w=800',
    content: `
      <p>Crianças que presenciam violência doméstica sofrem impactos profundos em seu desenvolvimento emocional e cognitivo, mesmo que não sejam o alvo direto das agressões.</p>
      <h3>Sinais de Sofrimento na Criança:</h3>
      <ul>
        <li>Regressão de comportamentos (voltar a urinar na cama, por exemplo).</li>
        <li>Agressividade excessiva ou isolamento extremo.</li>
        <li>Dificuldade de concentração e queda no rendimento escolar.</li>
      </ul>
      <p>O acolhimento deve ser constante. Reafirme que a criança está segura e que a culpa da situação não é dela.</p>
    `
  },
  {
    id: 12,
    title: 'Autonomia Digital: Limpando seus Rastros',
    description: 'Guia avançado para remover spywares e garantir que sua comunicação não seja interceptada.',
    category: 'Segurança',
    author: 'Cibersegurança NIRA',
    readTime: '8 min',
    date: '20 abr. 2026',
    featured: false,
    tags: ['Segurança', 'Tecnologia'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    content: `
      <p>Muitos agressores utilizam tecnologia para manter o controle remoto sobre suas vítimas. Aprender a "limpar" seus dispositivos é um passo vital para a independência.</p>
      <h3>Passos Críticos:</h3>
      <ul>
        <li><strong>Reset de Fábrica:</strong> Se suspeitar de stalkerware, o reset de fábrica é a única forma garantida de remoção.</li>
        <li><strong>Novas Contas:</strong> Crie um e-mail novo em um dispositivo seguro (computador da biblioteca ou de uma amiga) e não o vincule ao seu celular antigo.</li>
        <li><strong>Senhas Não Óbvias:</strong> Use frases longas misturando números e símbolos.</li>
      </ul>
    `
  }
];

export const mockAlerts = [
  { id: '0041', user: 'ANÔNIMO • #0041', location: 'São José dos Campos, SP', time: '3 min', status: 'ativo', risk: 'alto', type: 'map', logs: ['S.O.S. ativado - Localização recebida - 10:52'] },
  { id: '0040', user: 'ANÔNIMO • #0040', location: 'São Paulo, SP', time: 'Ontem', status: 'ativo', risk: 'médio', type: 'chat', logs: ['Solicitação de apoio via chat - 10:41'] },
  { id: '0038', user: 'ANÔNIMO • #0038', location: 'Campinas, SP', time: 'Agora', status: 'ativo', risk: 'alto', type: 'map', logs: ['S.O.S. ativado - Localização recebida'] },
  { id: '0037', user: 'ANÔNIMO • #0037', location: 'Curitiba, PR', time: 'Ontem', status: 'ativo', risk: 'baixo', type: 'chat', logs: ['Solicitação de apoio psicológico pendente'] },
  { id: '0039', user: 'ANÔNIMO • #0039', location: 'Belo Horizonte, MG', time: 'Ontem', status: 'concluido', risk: 'baixo', type: 'chat', logs: ['Atendimento encerrado com sucesso - 09:18'] }
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
