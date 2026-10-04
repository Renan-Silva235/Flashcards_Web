import { LuX, LuMinus, LuCheck } from "react-icons/lu";
import { useTicker } from "./useTicker";
import { DemoWindow } from "./DemoWindow";

const CARDS = [
  { word: "airport", translation: "aeroporto", answer: 2 },
  { word: "luggage", translation: "bagagem", answer: 1 },
  { word: "boarding pass", translation: "cartão de embarque", answer: 0 },
];

const BUTTONS = [
  { label: "Difícil", icon: LuX, color: "bg-red-600" },
  { label: "Médio", icon: LuMinus, color: "bg-orange-500" },
  { label: "Fácil", icon: LuCheck, color: "bg-green-500" },
];

const TICKS_PER_CARD = 20;

// Reproduz a tela de estudo (pages/StudySessionPage): vira o card, escolhe a dificuldade, próximo card
export const StudyDemo = () => {
  const tick = useTicker(150);
  const index = Math.floor(tick / TICKS_PER_CARD) % CARDS.length;
  const step = tick % TICKS_PER_CARD;
  const card = CARDS[index];

  const isFlipped = step >= 6 && step < 18;
  const pressed = step >= 13 && step < 17 ? card.answer : -1;
  const leaving = step >= 18;
  const progress = ((index + (step >= 15 ? 1 : 0)) / CARDS.length) * 100;

  return (
    <DemoWindow title="flashcards.app/study-session">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between text-xs text-color-silver-2 mb-2">
          <span>Viagem</span>
          <span>
            {index + 1}/{CARDS.length}
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-color-silver-1 overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-btn-main-color to-color-purple-1 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex-1 flex items-center justify-center perspective-1000 my-4">
          <div
            className={`relative w-full max-w-xs h-36 transition-all duration-500 ${
              leaving
                ? "opacity-0 -translate-x-16"
                : "opacity-100 translate-x-0"
            }`}
          >
            <div
              className={`relative w-full h-full duration-500 preserve-3d transition-transform ${
                isFlipped ? "rotate-y-180" : ""
              }`}
            >
              <div className="absolute inset-0 rounded-xl bg-linear-to-br from-blue-600 to-indigo-700 flex flex-col items-center justify-center backface-hidden text-color-white">
                <span className="text-[10px] tracking-widest text-color-white/60">
                  PALAVRA
                </span>
                <p className="text-2xl font-bold mt-2">{card.word}</p>
              </div>
              <div className="absolute inset-0 rounded-xl bg-linear-to-br from-color-purple-1/75 to-purple-900 flex flex-col items-center justify-center backface-hidden rotate-y-180 text-color-white">
                <span className="text-[10px] tracking-widest text-color-white/60">
                  TRADUÇÃO
                </span>
                <p className="text-2xl font-bold mt-2 text-center px-2">
                  {card.translation}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3">
          {BUTTONS.map(({ label, icon: Icon, color }, i) => (
            <span
              key={label}
              className={`${color} text-color-white text-xs font-bold rounded-lg w-20 h-8 flex items-center justify-center gap-1 transition-all duration-200 ${
                pressed === i
                  ? "scale-110 ring-2 ring-color-white"
                  : isFlipped
                    ? "opacity-100"
                    : "opacity-40"
              }`}
            >
              <Icon /> {label}
            </span>
          ))}
        </div>
      </div>
    </DemoWindow>
  );
};
