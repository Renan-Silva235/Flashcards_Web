import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdOutlineTrendingFlat } from "react-icons/md";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { LuLanguages, LuLayers, LuChartColumn } from "react-icons/lu";
import { IoSparklesSharp } from "react-icons/io5";
import type { IconType } from "react-icons/lib";
import type { RootState } from "../../store/rootReducer";
import { PATHS } from "../../routes/Routes";
import { HeroCard } from "./components/HeroCard";
import { CreateDeckDemo } from "./components/CreateDeckDemo";
import { StudyDemo } from "./components/StudyDemo";
import { StatsDemo } from "./components/StatsDemo";
import { FluentlyAiDemo } from "./components/FluentlyAiDemo";
import { Reveal } from "./components/Reveal";
import { useTicker } from "./components/useTicker";
import { wakeUpServer } from "../../services/serverStatus";

const LANGUAGES = ["Inglês", "Espanhol", "Turco"];

const STEPS = [
  {
    number: "01",
    title: "Crie seus decks",
    description:
      "Escolha o idioma, dê um nome e organize as palavras do jeito que fizer sentido para você.",
    demo: <CreateDeckDemo />,
  },
  {
    number: "02",
    title: "Estude virando os cards",
    description:
      "Veja a palavra, tente lembrar, vire o card e diga o quão difícil foi. Simples e rápido.",
    demo: <StudyDemo />,
  },
  {
    number: "03",
    title: "Acompanhe sua evolução",
    description:
      "No dashboard você vê quantos cards já domina e quais ainda precisam de mais prática.",
    demo: <StatsDemo />,
  },
];

const FEATURES: { icon: IconType; title: string; description: string }[] = [
  {
    icon: HiOutlineSpeakerWave,
    title: "Pronúncia em áudio",
    description: "Ouça cada palavra para treinar o ouvido e a fala.",
  },
  {
    icon: LuLanguages,
    title: "Vários idiomas",
    description: "Inglês, Espanhol e Turco no mesmo lugar.",
  },
  {
    icon: LuLayers,
    title: "Revisão por dificuldade",
    description: "Marque fácil, médio ou difícil e foque no que importa.",
  },
  {
    icon: LuChartColumn,
    title: "Estatísticas",
    description: "Visualize seu progresso por idioma e por dificuldade.",
  },
];

export const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const languageTick = useTicker(2200);
  const language = LANGUAGES[languageTick % LANGUAGES.length];

  // Acorda o servidor (plano gratuito do Render) enquanto o visitante lê a página
  useEffect(() => {
    wakeUpServer();
  }, []);

  const handleStart = () =>
    navigate(isAuthenticated ? PATHS.DASHBOARD : PATHS.LOGIN);

  const handleTryAi = () =>
    navigate(isAuthenticated ? PATHS.FLUENTLYAI : PATHS.LOGIN);

  return (
    <div className="relative min-h-screen overflow-x-hidden text-color-white">
      {/* manchas de luz animadas no fundo */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-second-color/30 blur-3xl animate-blob" />
        <div className="absolute top-40 -right-40 w-[30rem] h-[30rem] rounded-full bg-color-purple-1/20 blur-3xl animate-blob [animation-delay:-4s]" />
        <div className="absolute top-[60rem] left-1/3 w-[26rem] h-[26rem] rounded-full bg-btn-main-color/15 blur-3xl animate-blob [animation-delay:-8s]" />
      </div>

      <div className="relative z-10">
        <header className="flex items-center justify-between gap-4 max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <h1 className="font-black tracking-tighter text-2xl">Flash Cards</h1>
          <button
            onClick={handleStart}
            className="shrink-0 text-sm border border-color-silver-1 rounded-lg px-4 py-2 min-h-10 cursor-pointer hover:bg-white/10 transition-colors duration-300"
          >
            {isAuthenticated ? "Ir para o Dashboard" : "Entrar"}
          </button>
        </header>

        {/* HERO */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-16 sm:pb-24 md:pt-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 max-w-full text-[11px] sm:text-xs font-semibold tracking-wide sm:tracking-wider uppercase text-second-color bg-second-color/10 border border-second-color/30 rounded-full px-3 py-1 animate-word-in">
                <span className="w-2 h-2 rounded-full bg-second-color animate-pulse" />
                Aprenda idiomas com flashcards
              </span>

              <a
                href="#fluently-ai"
                className="inline-flex items-center gap-2 max-w-full text-[11px] sm:text-xs font-semibold tracking-wide sm:tracking-wider uppercase text-color-purple-1 bg-color-purple-1/10 border border-color-purple-1/30 rounded-full px-3 py-1 animate-word-in hover:bg-color-purple-1/20 transition-colors duration-300"
              >
                <IoSparklesSharp />
                Novo: correção de textos com I.A.
              </a>
            </div>

            <h2 className="font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mt-6">
              Memorize palavras em{" "}
              <span
                key={language}
                className="inline-block bg-linear-to-r from-btn-main-color via-color-purple-1 to-second-color bg-[length:200%_auto] bg-clip-text text-transparent animate-word-in"
              >
                {language}
              </span>
              <br />
              sem complicação.
            </h2>

            <p className="text-color-silver-2 text-base sm:text-lg mt-6 max-w-lg">
              Crie seus próprios decks, pratique com cards que viram, ouça a
              pronúncia, treine sua escrita com a Fluently AI e acompanhe sua
              evolução em um só lugar.
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4 mt-8 sm:mt-10">
              <button
                onClick={handleStart}
                className="group h-12 px-6 rounded-lg justify-center bg-linear-to-r from-btn-main-color via-second-color to-btn-main-color bg-[length:200%_auto] animate-gradient-x font-bold flex items-center gap-2 cursor-pointer shadow-lg shadow-second-color/30 hover:shadow-second-color/50 hover:scale-[1.03] transition-all duration-300"
              >
                Começar Agora
                <MdOutlineTrendingFlat className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <a
                href="#como-funciona"
                className="h-12 px-6 rounded-lg border border-color-silver-1 flex items-center justify-center hover:bg-white/10 transition-colors duration-300"
              >
                Ver como funciona
              </a>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <HeroCard />
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section
          id="como-funciona"
          className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 scroll-mt-10"
        >
          <Reveal className="text-center mb-12 sm:mb-20">
            <p className="text-second-color font-semibold tracking-wider uppercase text-sm">
              Como funciona
            </p>
            <h3 className="text-3xl sm:text-4xl font-bold mt-3">
              Três passos para turbinar seus estudos
            </h3>
          </Reveal>

          <div className="flex flex-col gap-20 sm:gap-28">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Reveal>
                  <span className="text-5xl sm:text-6xl font-black bg-linear-to-b from-second-color to-transparent bg-clip-text text-transparent">
                    {step.number}
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-bold mt-2">
                    {step.title}
                  </h4>
                  <p className="text-color-silver-2 text-base sm:text-lg mt-4 max-w-md">
                    {step.description}
                  </p>
                </Reveal>
                <Reveal delay={150}>{step.demo}</Reveal>
              </div>
            ))}
          </div>
        </section>

        {/* RECURSOS */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <Reveal className="text-center mb-14">
            <h3 className="text-3xl sm:text-4xl font-bold">
              Tudo que você precisa
            </h3>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {FEATURES.map(({ icon: Icon, title, description }, i) => (
              <Reveal key={title} delay={i * 100}>
                <div className="h-full rounded-2xl border border-color-silver-1 bg-color-silver-1/20 p-6 hover:-translate-y-2 hover:border-second-color/60 hover:shadow-lg hover:shadow-second-color/20 transition-all duration-300">
                  <span className="inline-flex w-11 h-11 rounded-xl bg-second-color/15 text-second-color items-center justify-center">
                    <Icon size={22} />
                  </span>
                  <h4 className="font-bold text-lg mt-4">{title}</h4>
                  <p className="text-color-silver-2 text-sm mt-2">
                    {description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FLUENTLY AI */}
        <section
          id="fluently-ai"
          className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 scroll-mt-10"
        >
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-color-purple-1/30 bg-color-silver-1/10 p-6 sm:p-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-color-purple-1/20 blur-3xl" />

              <div className="relative">
                <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wide sm:tracking-wider uppercase text-color-purple-1 bg-color-purple-1/10 border border-color-purple-1/30 rounded-full px-3 py-1">
                  <IoSparklesSharp />
                  Novidade
                </span>

                <h3
                  className="font-black text-3xl sm:text-4xl mt-5 inline-block
                            bg-linear-to-r from-btn-main-color via-color-purple-1 to-second-color
                            bg-[length:200%_auto] bg-clip-text text-transparent ml-2"
                >
                  Fluently AI
                </h3>

                <p className="text-color-silver-2 text-base sm:text-lg mt-4 max-w-lg">
                  Escreva com liberdade. Nossa inteligência artificial aponta o
                  que pode melhorar no seu texto e sugere como um nativo diria a
                  mesma frase — tudo explicado em português.
                </p>

                <button
                  onClick={handleTryAi}
                  className="group h-12 px-6 rounded-lg justify-center mt-8 bg-linear-to-r from-btn-main-color via-color-purple-1 to-second-color bg-[length:200%_auto] animate-gradient-x font-bold flex items-center gap-2 cursor-pointer shadow-lg shadow-color-purple-1/30 hover:shadow-color-purple-1/50 hover:scale-[1.03] transition-all duration-300"
                >
                  Experimentar a Fluently AI
                  <MdOutlineTrendingFlat className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>

              <div className="relative flex justify-center md:justify-end">
                <FluentlyAiDemo />
              </div>
            </div>
          </Reveal>
        </section>

        {/* CTA FINAL */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl px-6 py-10 sm:p-12 text-center bg-linear-to-r from-btn-main-color via-second-color to-color-purple-1/80 bg-[length:200%_auto] animate-gradient-x shadow-2xl shadow-second-color/30">
              <h3 className="text-3xl sm:text-4xl font-bold">
                Pronto para começar?
              </h3>
              <p className="text-color-white/80 text-base sm:text-lg mt-4">
                Crie seu primeiro deck em menos de um minuto.
              </p>
              <button
                onClick={handleStart}
                className="mt-8 h-12 px-8 w-full sm:w-auto rounded-lg bg-color-white text-main-color font-bold cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                Começar Agora
              </button>
            </div>
          </Reveal>
        </section>

        <footer className="text-center text-color-silver-2 text-sm px-4 py-10 border-t border-color-silver-1/50">
          Flash Cards Language © {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
};
