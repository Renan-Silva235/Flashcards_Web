import type { FlashcardResponseApi } from "../../../store/modules/flashcards/interface";
import { CardComponent } from "../CardComponent";

interface ShowCardProps {
  data: FlashcardResponseApi;
}

export const ShowCard = ({ data }: ShowCardProps) => {
  return (
    <>
      <p className="text-color-white">
        Você pode editar o seu card enquanto visualiza
      </p>
      <CardComponent mode="form" data={data} />;
    </>
  );
};
