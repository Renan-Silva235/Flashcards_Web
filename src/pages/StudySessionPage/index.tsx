import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import type { RootState } from "../../store/rootReducer";
import { flashcardRequestAction } from "../../store/modules/flashcards/actions";
import { CardFlip } from "../../components/CardFlip";
import type { AxiosResponse } from "axios";
import api from "../../config/api";
import axios from "axios";
import { toast } from "react-toastify";
import { PATHS } from "../../routes/Routes";
import { BackButton } from "../../components/BackButton";
import { LuX, LuMinus, LuCheck } from "react-icons/lu";
import type { IconType } from "react-icons/lib";

type ReviewResult = "MISTAKE" | "DIFFICULT" | "HIT";

const REVIEW_BUTTONS: {
  result: ReviewResult;
  label: string;
  icon: IconType;
  color: string;
}[] = [
  { result: "MISTAKE", label: "Difícil", icon: LuX, color: "bg-red-600" },
  {
    result: "DIFFICULT",
    label: "Médio",
    icon: LuMinus,
    color: "bg-orange-500",
  },
  { result: "HIT", label: "Fácil", icon: LuCheck, color: "bg-green-500" },
];

// Tempo da animação de saída/entrada do card (igual ao duration-300 das classes)
const CARD_ANIMATION_MS = 300;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const StudySessionPage = () => {
  const [searchParams] = useSearchParams();
  const deckId = searchParams.get("deckId");
  const deckName = searchParams.get("deckName");
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [pressed, setPressed] = useState<ReviewResult | null>(null);
  const [cardAnimation, setCardAnimation] = useState<
    "idle" | "leaving" | "entering"
  >("idle");
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const navigate = useNavigate();
  const { flashcards, isLoading } = useSelector(
    (state: RootState) => state.flashcard,
  );

  useEffect(() => {
    const initSessionStudy = async () => {
      if (deckId) {
        try {
          const response: AxiosResponse = await api.post(
            "/study-sessions/start",
            { deckId },
          );

          setSessionId(response.data.id);
          dispatch(flashcardRequestAction(deckId));
        } catch (error: unknown) {
          if (axios.isAxiosError(error))
            toast.error("Erro para carregar a sessão de estudos.");
        }
      }
    };
    initSessionStudy();
  }, [dispatch, deckId]);

  const handleReview = async (result: ReviewResult) => {
    if (!sessionId || !flashcards || flashcards.length === 0 || pressed) return;

    const currentCard = flashcards[currentIndex];
    setPressed(result);

    try {
      // Envia a revisão do card atual
      await api.post(`/study-sessions/${sessionId}/review`, {
        flashcardId: currentCard.id,
        result: result,
      });

      // Card sai pela esquerda
      setCardAnimation("leaving");
      await wait(CARD_ANIMATION_MS);

      // Se ainda houver próximos cards, avança o índice
      if (currentIndex < flashcards.length - 1) {
        setIsFlipped(false);
        setCurrentIndex((prev) => prev + 1);
        // Próximo card entra pela direita
        setCardAnimation("entering");
        await wait(50);
        setCardAnimation("idle");
      } else {
        // Se era o último card, tenta encerrar a sessão
        try {
          await api.put(`/study-sessions/${sessionId}/end`);
        } catch (endError) {
          console.error("Erro ao encerrar sessão no backend:", endError);
        }

        setIsFinished(true);
        toast.success("Sessão de estudos concluída com sucesso!");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Erro no review:", error.response?.data);
        toast.error("Erro ao registrar a resposta.");
      }
      setCardAnimation("idle");
    } finally {
      setPressed(null);
    }
  };

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-color-white text-center">
        <h2 className="text-3xl font-bold mb-4">Parabéns! 🎉</h2>
        <p className="text-color-silver-2 mb-6">
          Você concluiu todos os flashcards desta sessão.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-green-600 px-6.5 py-2.5 rounded-lg cursor-pointer hover:brightness-110"
        >
          Voltar para o Dashboard
        </button>
      </div>
    );
  }

  if (!isLoading && flashcards && flashcards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-color-white text-center">
        <h2 className="text-2xl font-bold mb-4">Nenhum flashcard encontrado</h2>
        <p className="text-color-silver-2 mb-6">
          Este deck ainda não possui flashcards cadastrados.
        </p>
        <BackButton label="Voltar" />
      </div>
    );
  }

  const currentCard =
    !isLoading && flashcards?.length && flashcards.length > 0
      ? flashcards[currentIndex]
      : null;

  const total = flashcards?.length ?? 0;
  const answered = currentIndex + (cardAnimation === "leaving" ? 1 : 0);
  const progress = total > 0 ? (answered / total) * 100 : 0;

  const cardAnimationClass = {
    idle: "opacity-100 translate-x-0 duration-300",
    leaving: "opacity-0 -translate-x-12 sm:-translate-x-24 duration-300",
    entering: "opacity-0 translate-x-12 sm:translate-x-24 duration-0",
  }[cardAnimation];

  return (
    <>
      <BackButton to={PATHS.DASHBOARD} label="Voltar para Meus Decks" />

      <div className="flex flex-col w-full max-w-2xl mx-auto mt-6 sm:mt-10">
        <div className="flex items-center justify-between gap-4 text-sm text-color-silver-2 mb-3">
          <span className="min-w-0 truncate">{deckName}</span>
          {total > 0 && (
            <span className="shrink-0 tabular-nums">
              {Math.min(currentIndex + 1, total)}/{total}
            </span>
          )}
        </div>
        <div className="h-2 w-full rounded-full bg-color-silver-1 overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-btn-main-color to-color-purple-1 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* overflow-x-clip: no celular o card que sai/entra não cria rolagem horizontal */}
        <div className="mt-6 sm:mt-10 overflow-x-clip sm:overflow-x-visible">
          <div className={`transition-all ${cardAnimationClass}`}>
            <CardFlip
              key={currentIndex}
              word={currentCard ? currentCard.word : ""}
              translation={currentCard ? currentCard.translation : ""}
              isFlipped={isFlipped}
              onFlip={() => setIsFlipped((prev) => !prev)}
              isLoading={isLoading}
            />
          </div>
        </div>

        {!isLoading && currentCard && !isFinished && (
          // No celular os 3 botões dividem a largura em partes iguais
          <div className="grid grid-cols-3 gap-2 sm:flex sm:justify-center sm:gap-6 mt-6 sm:mt-10 text-color-white">
            {REVIEW_BUTTONS.map(({ result, label, icon: Icon, color }) => (
              <button
                key={result}
                onClick={() => handleReview(result)}
                disabled={!isFlipped || pressed !== null}
                className={`${color} flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg w-full sm:w-40 h-12 sm:h-11 text-sm sm:text-base font-bold transition-all duration-200 ${
                  pressed === result
                    ? "scale-105 sm:scale-110 ring-2 ring-color-white"
                    : isFlipped
                      ? "opacity-100 cursor-pointer hover:brightness-110"
                      : "opacity-40 cursor-not-allowed"
                }`}
              >
                <Icon /> {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
