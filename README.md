# NIRA - Sistema de Apoio e Proteção

> Um ecossistema digital inteligente, projetado com foco em segurança, anonimato e acolhimento para vítimas de violência, integrando tecnologia de ponta para fornecer suporte imediato e eficiente.

NIRA (Rede Integrada de Resposta e Acolhimento) é uma aplicação moderna que atua como ponte segura entre usuários que necessitam de auxílio, profissionais de psicologia, assistentes sociais, e forças de segurança (como agentes e policiais). 

Com uma interface meticulosamente desenvolvida sob os conceitos de *Glassmorphism* e paleta de cores escura e de alto contraste, o NIRA foca em acessibilidade de emergência, confiabilidade no tratamento de dados e suporte ágil.

---

## 📌 Arquitetura e Stack Tecnológico

Este projeto foi construído utilizando as seguintes tecnologias para garantir performance escalável e uma interface imersiva:

*   **React 19:** Biblioteca principal para a construção de interfaces dinâmicas e reativas.
*   **Vite:** Ferramenta de build de altíssima performance para um desenvolvimento mais ágil.
*   **Tailwind CSS (v4):** Framework utilitário para a estilização consistente e responsiva, operando como base para as classes customizadas da interface.
*   **Framer Motion & GSAP:** Utilizados para criar micro-interações fluidas e animações de interface avançadas (scroll-triggered).
*   **Recharts:** Biblioteca para a visualização de dados operacionais e relatórios gerenciais no painel administrativo.
*   **Lucide React:** Conjunto de ícones vetoriais modernos e consistentes.
*   **Google Generative AI (Gemini):** Integração com inteligência artificial para análise preditiva e recomendações estratégicas sobre focos de incidentes.
*   **Leaflet & React-Leaflet:** Ferramentas robustas para renderização e manipulação do mapa interativo com geolocalização.

---

## 🚀 Como Iniciar (Setup do Projeto)

Siga os passos abaixo para configurar o ambiente de desenvolvimento local e executar a aplicação.

### 1. Requisitos Prévios

*   Node.js (v18 ou superior recomendado)
*   NPM ou Yarn

### 2. Instalação

Clone o repositório do projeto para sua máquina local e instale as dependências:

```bash
git clone https://github.com/pietro-renno/Nira.git
cd Nira
npm install
```

### 3. Configuração de Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (utilizando o arquivo `.env.example` como base). Para o funcionamento completo da aba de *Relatórios Inteligentes*, configure a chave de API do Google Gemini:

```env
VITE_GEMINI_API_KEY=sua_chave_de_api_aqui
```
*Atenção: Mantenha sua chave de API segura e nunca a compartilhe publicamente.*

### 4. Executando o Servidor de Desenvolvimento

Para iniciar o servidor local de desenvolvimento (HMR ativo):

```bash
npm run dev
```

O servidor estará rodando geralmente na porta `5173`. Acesse `http://localhost:5173` em seu navegador.

---

## 💻 Estrutura de Funcionalidades Principais

A plataforma se divide em diferentes acessos dependendo do perfil do usuário:

1. **Acesso Público & Informativo:**
   * **Página Inicial:** Contexto do projeto, FAQ expansível e chamadas para ação seguras.
   * **Como Funciona:** Explicação gráfica e detalhada sobre o ciclo de suporte do NIRA.
   * **Sobre:** Informações da equipe desenvolvedora e a tecnologia aplicada.

2. **Área Segura (Usuário em Perigo):**
   * **Botão S.O.S:** Acionamento imediato com geolocalização e conexão direta com agentes próximos.
   * **Chat Anonimizado:** Conexão criptografada com psicólogos ou assistentes sociais disponíveis.

3. **Painel Unificado (Administradores e Parceiros):**
   * **Dashboard Operacional:** Visão geral rápida dos casos pendentes e usuários on-line.
   * **Alertas em Tempo Real:** Fila de chamados de S.O.S.
   * **Relatórios com IA:** Visualização gráfica com métricas de casos por região e horário, integrando botão de "Análise Profunda" gerada via Inteligência Artificial (Google Gemini) para identificar tendências e sugerir melhorias operacionais.
   * **Gestão de Conteúdos e Usuários:** CRUD de artigos e cadastro com controle de níveis de acesso (Admin, ONG, Psicólogo, Agente).
   * **Mapa Tático de Equipes:** Para agentes em campo.

---

## 👥 Equipe E.Y.E (Quem Constrói a NIRA)

O desenvolvimento deste software foi viabilizado por uma equipe focada na intersecção de impacto social e engenharia de software avançada.

| Membro          | Papel Principal           |
| :---            | :---                      |
| **Giovanna**    | UX / Design               |
| **Samuel**      | Backend / PHP             |
| **Kauã**        | Frontend / React          |
| **Pietro**      | Full Stack                |
| **Lucas**       | QA / Docs                 |

*Desenvolvido em colaboração com SESI-SENAI (2026).*

---

## 🔒 Segurança e Privacidade

Este projeto prioriza a integridade dos dados e o anonimato das vítimas. Recomendamos que qualquer implantação em produção deste software conte com configurações avançadas de banco de dados, camadas extras de criptografia end-to-end nas mensagens de chat, e adequação rígida às normas de proteção de dados (LGPD).

> [!WARNING]
> **Aviso para Contribuintes:** Ao submeter pull requests, atente-se às práticas de clean code e evite exposição de rotas que manipulem dados sensíveis ou geolocalizações sem devida autenticação baseada em JWT ou sessão segura.
