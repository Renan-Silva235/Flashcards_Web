import { useTicker } from "./useTicker";

const WORDS = [
  { language: "🇺🇸 INGLÊS • VERBO", word: "to learn", translation: "aprender" },
  {
    language: "🇪🇸 ESPANHOL • SUBST.",
    word: "la biblioteca",
    translation: "a biblioteca",
  },
  { language: "🇹🇷 TURCO • SAUDAÇÃO", word: "merhaba", translation: "olá" },
];

// Card 3D que vira sozinho e troca de palavra a cada volta
export const HeroCard = () => {
  const tick = useTicker(2200);
  const isFlipped = tick % 2 === 1;
  const current = WORDS[Math.floor(tick / 2) % WORDS.length];

  return (
    <div className="relative w-full max-w-md h-72 perspective-1000">
      {/* cards decorativos flutuando atrás */}
      <div className="absolute -top-8 -left-10 w-40 h-24 rounded-xl bg-color-purple-1/20 border border-color-purple-1/30 backdrop-blur-sm -rotate-12 animate-float-slow" />
      <div className="absolute -bottom-10 -right-6 w-44 h-28 rounded-xl bg-second-color/20 border border-second-color/30 backdrop-blur-sm rotate-6 animate-float" />

      <div className="relative w-full h-full animate-float">
        <div
          className={`relative w-full h-full duration-700 preserve-3d transition-transform ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-700 shadow-2xl shadow-second-color/40 flex flex-col items-center justify-center p-6 backface-hidden text-color-white">
            <span className="text-xs tracking-widest text-color-white/70">
              {current.language}
            </span>
            <h3 className="text-4xl font-bold mt-6">{current.word}</h3>
            <p className="text-sm text-color-white/70 mt-8">
              clique para revelar a tradução
            </p>
          </div>

          <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-color-purple-1/75 to-purple-900 shadow-2xl shadow-color-purple-1/40 flex flex-col items-center justify-center p-6 backface-hidden rotate-y-180 text-color-white">
            <span className="text-xs tracking-widest text-color-white/70">
              TRADUÇÃO
            </span>
            <h3 className="text-4xl font-bold mt-6">{current.translation}</h3>
            <p className="text-sm text-color-white/70 mt-8">
              🔊 ouça a pronúncia
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
