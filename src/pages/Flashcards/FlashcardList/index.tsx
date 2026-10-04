import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { flashcardRequestAction } from "../../../store/modules/flashcards/actions";
import { Loading } from "../../../components/Loading";
import { NotFound } from "../../../components/NotFound";
import { Modal } from "../../../components/Modal";
import { CardComponent } from "../CardComponent";
import { FlashcardCarousel } from "../FlashcardCarousel";
import type { RootState } from "../../../store/rootReducer";
import type { FlashcardResponseApi } from "../../../store/modules/flashcards/interface";

interface FlashcardListProps {
  deckId: string | null;
  searchTerm: string;
}

export const FlashcardList = ({ deckId, searchTerm }: FlashcardListProps) => {
  const dispatch = useDispatch();
  const { flashcards, isLoading } = useSelector(
    (state: RootState) => state.flashcard,
  );
  // Posição (na lista filtrada) do card aberto no carrossel; null = fechado
  const [viewIndex, setViewIndex] = useState<number | null>(null);

  useEffect(() => {
    if (deckId) dispatch(flashcardRequestAction(deckId));
  }, [dispatch, deckId]);

  const filteredFlashcard = (flashcards ?? []).filter(
    (flashcard: FlashcardResponseApi) => {
      const term = searchTerm.toLowerCase();
      return flashcard.word?.toLowerCase().includes(term);
    },
  );

  const renderContent = () => {
    if (isLoading) return <Loading />;
    if (flashcards == null) return null;

    if (filteredFlashcard.length === 0 && searchTerm.trim() !== "")
      return <NotFound msg="Nenhum Card encontrado" isFilterSearch={true} />;

    if (filteredFlashcard.length === 0)
      return (
        <NotFound
          msg="Nenhum Card encontrado"
          context="Crie o seu primeiro card para começar a estudar."
          isFilterSearch={false}
        />
      );

    return (
      <div className="w-full flex flex-wrap gap-5 mt-10 justify-center">
        {filteredFlashcard.map((flashcard: FlashcardResponseApi, index) => (
          <CardComponent
            key={flashcard.id}
            mode="view"
            data={flashcard}
            onView={() => setViewIndex(index)}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      {renderContent()}

      {/* Fica fora do renderContent para não fechar quando a lista recarrega após editar um card */}
      <Modal
        isOpen={viewIndex !== null && filteredFlashcard.length > 0}
        onClose={() => setViewIndex(null)}
      >
        <FlashcardCarousel
          cards={filteredFlashcard}
          initialIndex={Math.min(viewIndex ?? 0, filteredFlashcard.length - 1)}
          onClose={() => setViewIndex(null)}
        />
      </Modal>
    </>
  );
};
