import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDeleteOutline } from "react-icons/md";
import api from "../../../config/api";
import { deckRemoveAction } from "../../../store/modules/decks/actions";

interface DeleteDeckProps {
  deckId: string;
  title: string;
  cardsCount: number;
  onClose: () => void;
}

export const DeleteDeck = ({
  deckId,
  title,
  cardsCount,
  onClose,
}: DeleteDeckProps) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // O banco apaga em cascata os flashcards e o histórico de estudos do deck
      await api.delete(`decks/${deckId}`);
      toast.success("Deck deletado.");
      onClose();
      // Tira o deck da lista; o gráfico de estatísticas percebe a mudança e recarrega
      dispatch(deckRemoveAction(deckId));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error("Não foi possível deletar o deck.");
      } else {
        toast.error("Erro inesperado.");
      }
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 bg-main-color w-full max-w-md h-fit p-5 sm:p-6 text-center rounded-lg border border-color-silver-1">
      <span className="flex items-center justify-center w-14 h-14 rounded-full bg-color-red-1/15 text-color-red-1 text-3xl">
        <MdDeleteOutline />
      </span>
      <h1 className="text-color-white text-xl sm:text-2xl font-bold">
        Deseja realmente apagar este deck?
      </h1>
      <p className="text-sm text-color-silver-2">
        O deck <span className="text-color-white font-bold">{title}</span>
        {cardsCount > 0
          ? ` e ${cardsCount === 1 ? "o seu card" : `os seus ${cardsCount} cards`} serão apagados`
          : " será apagado"}
        , junto com o histórico de estudos. Esta ação não poderá ser desfeita.
      </p>
      <div className="flex w-full gap-3 sm:gap-4 items-center sm:justify-center mt-2">
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex-1 sm:flex-none sm:w-32 h-11 sm:h-10 bg-red-700 text-color-white rounded-lg text-base cursor-pointer hover:brightness-110 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isDeleting ? "Deletando..." : "Deletar"}
        </button>
        <button
          type="button"
          onClick={onClose}
          disabled={isDeleting}
          className="flex-1 sm:flex-none sm:w-32 h-11 sm:h-10 bg-color-white text-black rounded-lg text-base cursor-pointer hover:brightness-110 transition-all duration-200 disabled:opacity-60"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
