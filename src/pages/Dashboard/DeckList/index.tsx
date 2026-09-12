import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../store/rootReducer";
import { deckRequestAction } from "../../../store/modules/decks/actions";
import { Loading } from "../../../components/Loading";
import { CardsDeck } from "../../../components/CardsDeck";

interface DeckListProps {
  userId: number | undefined;
  searchTerm: string;
}

export const DeckList = ({ userId, searchTerm }: DeckListProps) => {
  const dispatch = useDispatch();

  const { decks, isLoading } = useSelector((state: RootState) => state.deck);

  useEffect(() => {
    if (userId) dispatch(deckRequestAction(userId));
  }, [dispatch, userId]);
  console.log("Deck: ", decks);

  if (isLoading) return <Loading />;

  if (decks == null)
    return (
      <p className="text-color-silver-2 ">Nenhum deck criado no momento.</p>
    );

  const filteredDeck = decks.filter((deck) => {
    const term = searchTerm.toLocaleLowerCase();
    return (
      deck.name.toLocaleLowerCase().includes(term) ||
      deck.category.toLocaleLowerCase().includes(term)
    );
  });

  if (filteredDeck.length == 0) {
    return <p className="text-color-silver-2 mt-5">Nenhum deck encontrado.</p>;
  }

  return (
    <div className="flex flex-wrap gap-5 mt-10 justify-center">
      {filteredDeck.map((deck) => (
        <CardsDeck
          key={deck.id}
          language={deck.language}
          title={deck.name}
          category={deck.category}
          counter={0}
        />
      ))}
    </div>
  );
};
