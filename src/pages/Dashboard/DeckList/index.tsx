import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../store/rootReducer";
import { deckRequestAction } from "../../../store/modules/decks/actions";
import { Loading } from "../../../components/Loading";
import { CardsDeck } from "../../../components/CardsDeck";
import { NotFound } from "../../../components/NotFound";

interface DeckListProps {
  userId: number | undefined;
  searchTerm: string;
  selectedLanguage: string;
}

export const DeckList = ({
  userId,
  searchTerm,
  selectedLanguage,
}: DeckListProps) => {
  const dispatch = useDispatch();

  const { decks, isLoading } = useSelector((state: RootState) => state.deck);

  useEffect(() => {
    if (userId) dispatch(deckRequestAction(userId));
  }, [dispatch, userId]);

  if (isLoading) return <Loading />;

  if (decks === null) return;

  const filteredDeck = decks.filter((deck) => {
    const term = searchTerm.toLocaleLowerCase();

    const matchesSearch =
      deck.name.toLocaleLowerCase().includes(term) ||
      deck.category.toLocaleLowerCase().includes(term);

    const selectedUpper = selectedLanguage.toUpperCase();
    const deckLangUpper = deck.language.toUpperCase();

    const matchesLanguage =
      selectedUpper === "ALL" ||
      selectedUpper === "TODOS" ||
      deckLangUpper === selectedUpper;

    return matchesSearch && matchesLanguage;
  });

  if (filteredDeck.length == 0 && searchTerm.trim() !== "") {
    return <NotFound msg="Nenhum deck encontrado." isFilterSearch={true} />;
  }

  if (filteredDeck.length === 0)
    return (
      <NotFound
        msg="Nenhum deck encontrado"
        context="Crie seus Decks para começar a estruturar seus flashcards."
        isFilterSearch={false}
      />
    );

  return (
    <div className="flex flex-wrap gap-5 mt-10 justify-center">
      {filteredDeck.map((deck) => (
        <CardsDeck
          key={deck.id}
          id={deck.id}
          language={deck.language}
          title={deck.name}
          category={deck.category}
          counter={0}
        />
      ))}
    </div>
  );
};
