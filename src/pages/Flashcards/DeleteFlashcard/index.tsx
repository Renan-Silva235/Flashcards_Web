import api from "../../../config/api";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { toast } from "react-toastify";
import { flashcardRequestAction } from "../../../store/modules/flashcards/actions";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import type { RootState } from "../../../store/rootReducer";
import { deckRequestAction } from "../../../store/modules/decks/actions";

interface DeleteFlashCardProps {
  onClose: () => void;
  flashcardId: string | undefined;
}
//flashcar/id
export const DeleteFlashCard = ({
  onClose,
  flashcardId,
}: DeleteFlashCardProps) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const deckId = searchParams.get("deckId");
  const { user } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (flashcardId && deckId && user?.id) {
        // @ts-expect-error - ignorar erro ts(6133)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const response: AxiosResponse = await api.delete(
          `/flashcards/${flashcardId}`,
        );
        toast.success("Card deletado.");
        dispatch(flashcardRequestAction(deckId));
        dispatch(deckRequestAction(user.id));
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return toast.error("Não foi possível deletar o Flashcard.");
      }

      toast.error("Erro inesperado.");
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-main-color w-fit h-fit p-6 text-center rounded-lg">
      <h1 className="text-color-white text-2xl">
        Deseja realmente apagar este Card?
      </h1>
      <p className="text-[14px] text-color-white">
        Está ação não poderá ser desfeita, deseja mesmo prosseguir?
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex gap-6 items-center justify-center"
      >
        <button
          type="submit"
          className="bg-red-700 text-color-white rounded-lg text-base w-20 cursor-pointer hover:brightness-110 transition-all duration-200"
        >
          Deletar
        </button>
        <button
          onClick={onClose}
          className="bg-color-white text-black rounded-lg text-base w-20 cursor-pointer hover:brightness-110 transition-all duration-200"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};
