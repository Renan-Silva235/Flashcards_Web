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

export const StudySessionPage = () => {
  const [searchParams] = useSearchParams();
  const deckId = searchParams.get("deckId");
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

  const handleReview = async (result: "MISTAKE" | "DIFFICULT" | "HIT") => {
    if (!sessionId || !flashcards || flashcards.length === 0) return;

    const currentCard = flashcards[currentIndex];

    try {
      // Envia a revisão do card atual
      await api.post(`/study-sessions/${sessionId}/review`, {
        flashcardId: currentCard.id,
        result: result,
      });

      // Se ainda houver próximos cards, avança o índice
      if (currentIndex < flashcards.length - 1) {
        setCurrentIndex((prev) => prev + 1);
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
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 px-6 py-2 rounded-lg cursor-pointer hover:brightness-110"
        >
          Voltar
        </button>
      </div>
    );
  }

  const currentCard =
    !isLoading && flashcards?.length && flashcards.length > 0
      ? flashcards[currentIndex]
      : null;

  return (
    <>
      <CardFlip
        word={currentCard ? currentCard.word : ""}
        translation={currentCard ? currentCard.translation : ""}
        isLoading={isLoading}
      />
      {!isLoading && currentCard && !isFinished && (
        <div className="flex text-center items-center justify-center gap-14 mt-6 text-color-white">
          <button
            onClick={() => handleReview("MISTAKE")}
            className="bg-red-600 rounded-lg w-40 h-11 cursor-pointer hover:brightness-110 transition-all duration-200"
          >
            Difícil
          </button>
          <button
            onClick={() => handleReview("DIFFICULT")}
            className="bg-orange-500 rounded-lg w-40 h-11 cursor-pointer hover:brightness-110 transition-all duration-200"
          >
            Médio
          </button>
          <button
            onClick={() => handleReview("HIT")}
            className="bg-green-500 rounded-lg w-40 h-11 cursor-pointer hover:brightness-110 transition-all duration-200"
          >
            Fácil
          </button>
        </div>
      )}
    </>
  );
};
