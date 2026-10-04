import { useCallback, useEffect, useState } from "react";
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

// Modal de visualizar com setas para navegar entre os cards do deck.
// Ao trocar, o card atual sai para um lado enquanto o próximo entra pelo outro.
export const FlashcardCarousel = ({
  cards,
  initialIndex,
  onClose,
}: FlashcardCarouselProps) => {
  const [index, setIndex] = useState<number>(initialIndex);
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
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [go]);

  if (!current) return null;

  const arrowClass =
    "flex items-center justify-center w-12 h-12 shrink-0 rounded-full border border-color-silver-1 bg-color-silver-1/60 text-color-white text-3xl cursor-pointer hover:bg-second-color hover:border-second-color hover:scale-110 transition-all duration-200";

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-4">
        {hasPrevious ? (
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Card anterior"
            className={arrowClass}
          >
            <HiChevronLeft />
          </button>
        ) : (
          <span className="w-12 shrink-0" />
        )}

        <div className="relative w-[26rem] px-4 overflow-hidden">
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
              className={`absolute top-0 inset-x-4 pointer-events-none ${
                outgoing.direction === 1
                  ? "animate-slide-out-left"
                  : "animate-slide-out-right"
              }`}
            >
              <ShowCard data={outgoing.card} onClose={onClose} />
            </div>
          )}
        </div>

        {hasNext ? (
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Próximo card"
            className={arrowClass}
          >
            <HiChevronRight />
          </button>
        ) : (
          <span className="w-12 shrink-0" />
        )}
      </div>

      <p className="text-color-silver-2 text-sm mt-3">
        {index + 1} / {cards.length}
      </p>
    </div>
  );
};
