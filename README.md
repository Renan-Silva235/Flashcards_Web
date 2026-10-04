# Flash Cards Language — Web

Aplicação web para **aprender idiomas com flashcards**. Crie seus próprios decks, pratique virando os cards, ouça a pronúncia das palavras e acompanhe sua evolução por idioma e por dificuldade.

> Este repositório contém o **frontend web**. O projeto completo também possui uma **API REST** (Spring Boot) e um **app mobile** (Expo / React Native) que compartilham o mesmo backend.

<!--
Adicione aqui prints ou um GIF da aplicação, por exemplo:
![Home](docs/home.png)
![Sessão de estudo](docs/study-session.gif)
-->

---

## ✨ Funcionalidades

- **Landing page animada**: apresentação da aplicação com demonstrações animadas de como ela funciona
- **Autenticação**: login com JWT armazenado em cookie `HttpOnly` e logout com confirmação
- **Decks**
  - Criação de decks com nome, categoria e idioma (🇺🇸 Inglês, 🇪🇸 Espanhol, 🇹🇷 Turco)
  - Filtro por idioma e busca por nome
  - O idioma selecionado fica salvo por usuário, inclusive após logout/login
- **Flashcards**: criar, visualizar, editar e excluir cards com palavra, tradução, tempos verbais (passado, presente e futuro) e até três frases de exemplo
- **Sessão de estudo**
  - Card com animação de virar (palavra → tradução)
  - Avaliação de cada card como **Fácil**, **Médio** ou **Difícil**
  - Barra de progresso e contador da sessão
- **Pronúncia em áudio**: Web Speech API do navegador e, para o turco, síntese de voz local com [Piper TTS](https://github.com/rhasspy/piper)
- **Estatísticas**: total de cards e distribuição por dificuldade em um gráfico animado, filtrado por idioma
- **Perfil**
  - Totais de decks, flashcards e favoritos
  - Alteração de senha com código de verificação enviado por e-mail

---

## 🛠️ Tecnologias

| Categoria        | Ferramentas                                         |
| ---------------- | --------------------------------------------------- |
| Base             | [React 19](https://react.dev), [TypeScript](https://www.typescriptlang.org), [Vite](https://vite.dev) |
| Estilização      | [Tailwind CSS 4](https://tailwindcss.com)           |
| Estado global    | [Redux Toolkit](https://redux-toolkit.js.org) + [Redux-Saga](https://redux-saga.js.org) |
| Rotas            | [React Router](https://reactrouter.com)             |
| HTTP             | [Axios](https://axios-http.com)                     |
| Notificações     | [React-Toastify](https://fkhadra.github.io/react-toastify) |
| Ícones           | [React Icons](https://react-icons.github.io/react-icons) |
| Áudio            | Web Speech API + [piper-tts-web](https://www.npmjs.com/package/piper-tts-web) |
| Deploy           | [Vercel](https://vercel.com)                        |

---

## 📁 Estrutura do projeto

```
src/
├── components/      # Componentes reutilizáveis (Modal, Sidebar, CardFlip, SpeechAudio...)
├── config/          # Instância do Axios (api.ts)
├── hooks/           # Hooks customizados (ex.: idioma preferido do usuário)
├── pages/           # Telas: Home, Login, Dashboard, Flashcards, StudySessionPage, Profile
├── routes/          # Rotas públicas e protegidas
├── services/        # Serviço de síntese de voz
├── store/           # Redux: módulos auth, decks e flashcards (actions, reducers, sagas)
├── styles/          # CSS global e tema do Tailwind
├── types/           # Declarações de tipos
└── utils/           # Utilitários (idiomas, bandeiras, códigos de voz)
```

---

## 🚀 Como rodar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org) 20 ou superior
- A **API do Flash Cards** rodando (localmente ou em produção)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/Renan-Silva235/Flashcards_Web.git
cd Flashcards_Web

# 2. Instale as dependências
#    (o postinstall copia os arquivos do Piper TTS para a pasta public/)
npm install

# 3. Crie o arquivo .env na raiz do projeto
echo "VITE_URL_API=http://localhost:8080" > .env

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

### Variáveis de ambiente

| Variável       | Descrição                    | Exemplo                 |
| -------------- | ---------------------------- | ----------------------- |
| `VITE_URL_API` | URL base da API do Flash Cards | `http://localhost:8080` |

> Como a autenticação usa cookie, a API precisa permitir CORS com credenciais para a origem do frontend.

---

## 📜 Scripts

| Comando           | Descrição                                                |
| ----------------- | -------------------------------------------------------- |
| `npm run dev`     | Inicia o servidor de desenvolvimento                     |
| `npm run build`   | Copia os assets do Piper, checa os tipos e gera o build  |
| `npm run preview` | Serve o build de produção localmente                     |
| `npm run lint`    | Executa o ESLint                                         |

---

## ☁️ Deploy

O projeto está configurado para a **Vercel**. O arquivo `vercel.json` define os cabeçalhos `Cross-Origin-Opener-Policy` e `Cross-Origin-Embedder-Policy`, necessários para o Piper TTS (WebAssembly) funcionar no navegador. Os mesmos cabeçalhos estão configurados no `vite.config.ts` para os modos `dev` e `preview`.

Lembre-se de cadastrar a variável `VITE_URL_API` nas configurações do projeto na Vercel.

---

## 👤 Autor

Desenvolvido por **Renan Silva** — [GitHub](https://github.com/Renan-Silva235)
