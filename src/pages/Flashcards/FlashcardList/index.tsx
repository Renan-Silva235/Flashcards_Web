import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { flashcardRequestAction } from "../../../store/modules/flashcards/actions";
import { Loading } from "../../../components/Loading";
import { NotFound } from "../../../components/NotFound";
import { CardComponent } from "../CardComponent";
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

  useEffect(() => {
    if (deckId) dispatch(flashcardRequestAction(deckId));
  }, [dispatch, deckId]);

  if (isLoading) return <Loading />;
  if (!flashcards) return <NotFound msg="Nenhum card encontrado." />;

  const filteredFlashcard = flashcards.filter(
    (flashcard: FlashcardResponseApi) => {
      const term = searchTerm.toLowerCase();
      return flashcard.word?.toLowerCase().includes(term);
    },
  );

  if (filteredFlashcard.length === 0)
    return <NotFound msg="Nenhum Card encontrado" />;

  return (
    <div className="w-full flex flex-wrap gap-5 mt-10 justify-center">
      {filteredFlashcard.map((flashcard: FlashcardResponseApi) => (
        <CardComponent key={flashcard.id} mode="view" data={flashcard} />
      ))}
    </div>
  );
};
