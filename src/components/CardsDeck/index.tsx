import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { FaStar, FaRegStar } from "react-icons/fa";
import api from "../../config/api";
import { deckFavoriteUpdateAction } from "../../store/modules/decks/actions";
import { getLanguageFlag } from "../../utils/languages";
import { PATHS } from "../../routes/Routes";

interface Metadata {
  id?: string | null;
  language: string;
  title: string;
  category: string;
  counter: number;
  favorite: boolean;
}

export const CardsDeck = ({
  id,
  language,
  title,
  category,
  counter,
  favorite,
}: Metadata) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isTogglingFavorite, setIsTogglingFavorite] = useState<boolean>(false);

  const handleToggleFavorite = async () => {
    if (!id || isTogglingFavorite) return;

    // Atualização otimista: a estrela muda na hora e volta se a API falhar
    dispatch(deckFavoriteUpdateAction(id, !favorite));
    setIsTogglingFavorite(true);

    try {
      await api.patch(`decks/${id}/favorite`);
    } catch (error: unknown) {
      dispatch(deckFavoriteUpdateAction(id, favorite));
      if (axios.isAxiosError(error))
        toast.error("Não foi possível atualizar o favorito.");
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  const handleOpenDeck = () => {
    navigate(
      `${PATHS.FLASHCARDS}?deckId=${id}&deckName=${encodeURIComponent(title)}&deckLanguage=${language}`,
    );
  };

  const handleOpenSessionStudy = () => {
    navigate(
      `${PATHS.STUDY_SESSION}?deckId=${id}&deckName=${encodeURIComponent(title)}&deckLanguage=${language}`,
    );
  };

  return (
    <div
      className="flex flex-col justify-between overflow-hidden h-60 border border-color-white rounded-lg w-96 p-7 
                  bg-linear-to-r from-color-white/10 to-main-color shadow-lg shadow-black/50
                  transition-transform duration-300 hover:scale-100 hover:-translate-y-2 cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <p className="font-sans tracking-wider uppercase font-bold text-second-color">
          {getLanguageFlag(language)} {language}
        </p>
        <button
          type="button"
          onClick={handleToggleFavorite}
          disabled={isTogglingFavorite}
          title={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          aria-label={
            favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
          }
          aria-pressed={favorite}
          className={`text-2xl cursor-pointer transition-all duration-200 hover:scale-125 active:scale-90 ${
            favorite
              ? "text-color-yellow-1 drop-shadow-[0_0_6px_rgba(224,184,24,0.6)]"
              : "text-color-silver-2 hover:text-color-yellow-1"
          }`}
        >
          {favorite ? <FaStar /> : <FaRegStar />}
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-color-white text-4xl">{title}</h1>
        <div className="flex flex-col items-center">
          <p className=" text-second-color text-2xl">{counter}</p>
          <p className="text-color-silver-2 text-base">cards</p>
        </div>
      </div>
      <p className="text-color-silver-2 line-clamp-2">{category}</p>
      <div className="flex justify-center gap-4 text-color-white mt-1.5">
        <button
          onClick={handleOpenDeck}
          className="bg-color-silver-1 cursor-pointer rounded-lg w-fit h-fit p-2 hover:brightness-110 scale-[0.98] transition-all duration-300"
        >
          Abrir Deck
        </button>
        <button
          onClick={handleOpenSessionStudy}
          className="bg-linear-to-r from-btn-main-color to-second-color cursor-pointer rounded-lg w-fit h-fit p-2 hover:brightness-110 scale-[0.98] transition-all duration-300"
        >
          Estudar
        </button>
      </div>
    </div>
  );
};
