import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent,
} from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import type { FlashcardResponseApi } from "../../../store/modules/flashcards/interface";
import { ShowCard } from "../ShowCard";

interface FlashcardCarouselProps {
  cards: FlashcardResponseApi[];
  initialIndex: number;
  onClose: () => void;
}

type Direction = 1 | -1;

// Mesma duração das animações slide-* do global.css
const ANIMATION_MS = 350;
// Distância mínima do dedo para contar como "deslizar"
const SWIPE_MIN_PX = 50;

// Modal de visualizar com setas para navegar entre os cards do deck.
// Ao trocar, o card atual sai para um lado enquanto o próximo entra pelo outro.
export const FlashcardCarousel = ({
  cards,
  initialIndex,
  onClose,
}: FlashcardCarouselProps) => {
  const [index, setIndex] = useState<number>(initialIndex);
  const touchStartX = useRef<number | null>(null);
  // Card que está saindo durante a animação (fica por cima, posicionado absoluto)
  const [outgoing, setOutgoing] = useState<{
    card: FlashcardResponseApi;
    direction: Direction;
  } | null>(null);

  const current = cards[index];
  const hasPrevious = index > 0;
  const hasNext = index < cards.length - 1;

  const go = useCallback(
    (direction: Direction) => {
      const target = index + direction;
      if (outgoing || target < 0 || target >= cards.length) return;

      setOutgoing({ card: cards[index], direction });
      setIndex(target);
    },
    [index, outgoing, cards],
  );

  // Remove o card que saiu ao fim da animação. Usa timer em vez de onAnimationEnd
  // porque o navegador pausa animações em abas ocultas e o evento pode não disparar.
  useEffect(() => {
    if (!outgoing) return;
    const timer = setTimeout(() => setOutgoing(null), ANIMATION_MS);
    return () => clearTimeout(timer);
  }, [outgoing]);

  // Setas do teclado também navegam
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Digitando num campo, as setas movem o cursor do texto, não trocam de card
      const target = event.target as HTMLElement;
      if (target.closest("input, textarea")) return;
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [go]);

  if (!current) return null;

  const arrowClass =
    "flex items-center justify-center w-12 h-12 shrink-0 rounded-full border border-color-silver-1 bg-color-silver-1/60 text-color-white text-3xl cursor-pointer hover:bg-second-color hover:border-second-color hover:scale-110 transition-all duration-200";

  const textNavClass =
    "flex items-center gap-1 h-11 whitespace-nowrap text-color-white font-medium cursor-pointer active:text-btn-main-color";

  // Setas laterais: só a partir de 640px
  const previousButton = () =>
    hasPrevious ? (
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Card anterior"
        className={`${arrowClass} hidden sm:flex`}
      >
        <HiChevronLeft />
      </button>
    ) : (
      <span className="hidden sm:block w-12 shrink-0" />
    );

  const nextButton = () =>
    hasNext ? (
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Próximo card"
        className={`${arrowClass} hidden sm:flex`}
      >
        <HiChevronRight />
      </button>
    ) : (
      <span className="hidden sm:block w-12 shrink-0" />
    );

  // Deslizar o dedo para os lados troca de card (celular)
  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };
  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) < SWIPE_MIN_PX) return;
    go(deltaX < 0 ? 1 : -1);
  };

  return (
    <div className="flex flex-col items-center max-w-full">
      <div className="flex items-center gap-4 max-w-full">
        {previousButton()}

        <div
          className="relative w-[26rem] max-w-full px-2 sm:px-4 overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Card que entra */}
          <div
            key={current.id}
            className={
              outgoing
                ? outgoing.direction === 1
                  ? "animate-slide-in-right"
                  : "animate-slide-in-left"
                : ""
            }
          >
            <ShowCard data={current} onClose={onClose} />
          </div>

          {/* Card que sai */}
          {outgoing && (
            <div
              key={`out-${outgoing.card.id}`}
              className={`absolute top-0 inset-x-2 sm:inset-x-4 pointer-events-none ${
                outgoing.direction === 1
                  ? "animate-slide-out-left"
                  : "animate-slide-out-right"
              }`}
            >
              <ShowCard data={outgoing.card} onClose={onClose} />
            </div>
          )}
        </div>

        {nextButton()}
      </div>

      {/* No celular a navegação fica aqui embaixo, com texto (além de deslizar o dedo) */}
      <div className="grid grid-cols-3 items-center w-full px-2 mt-3 sm:flex sm:justify-center">
        <div className="sm:hidden">
          {hasPrevious && (
            <button
              type="button"
              onClick={() => go(-1)}
              className={textNavClass}
            >
              <HiChevronLeft className="text-2xl" /> Anterior
            </button>
          )}
        </div>
        <p className="text-center text-color-silver-2 text-sm tabular-nums">
          {index + 1} / {cards.length}
        </p>
        <div className="flex justify-end sm:hidden">
          {hasNext && (
            <button
              type="button"
              onClick={() => go(1)}
              className={textNavClass}
            >
              Próximo card <HiChevronRight className="text-2xl" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
