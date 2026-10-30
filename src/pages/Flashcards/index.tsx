import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { PATHS } from "../../routes/Routes";
import { BackButton } from "../../components/BackButton";
import { LuBookOpen, LuX } from "react-icons/lu";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { FlashcardList } from "./FlashcardList";
import { Modal } from "../../components/Modal";
import { CreateCardComponent } from "./CreateCardComponent";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/rootReducer";
import { deckRequestAction } from "../../store/modules/decks/actions";
import { useIsMobile } from "../../hooks/useIsMobile";

export const Flashcards = () => {
  const [searchParams] = useSearchParams();
  const deckId = searchParams.get("deckId");
  const deckName = searchParams.get("deckName");
  const deckLanguage = searchParams.get("deckLanguage");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { decks } = useSelector((state: RootState) => state.deck);
  const { user } = useSelector((state: RootState) => state.auth);
  const currentDeck = (decks ?? []).find((deck) => deck.id === deckId);

  useEffect(() => {
    if (user?.id) dispatch(deckRequestAction(user.id));
  }, [dispatch, user]);

  const cardsCount = currentDeck?.cardsCount ?? 0;

  const handleOpenSessionStudy = () => {
    if (!deckId || cardsCount === 0) return;

    // URLSearchParams já codifica os valores (nomes com espaço, acento etc.)
    const params = new URLSearchParams({
      deckId,
      deckName: deckName ?? "",
      deckLanguage: deckLanguage ?? "",
    });
    navigate(`${PATHS.STUDY_SESSION}?${params.toString()}`);
  };
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="hidden lg:block">
          <BackButton to={PATHS.DASHBOARD} label="Voltar para Meus Decks" />
        </div>
        <div className="flex lg:mt-10 justify-between items-start gap-4">
          <h1 className="min-w-0 break-words text-color-white font-bold text-3xl lg:text-5xl">
            {deckName}
          </h1>
          <div className="hidden lg:flex flex-col items-center shrink-0">
            <p className="text-second-color text-5xl">{cardsCount}</p>
            <p className="text-color-silver-2 text-3xl">cards</p>
          </div>
          {/* Celular/tablet: sem a barra de baixo, o X volta para os decks */}
          <Link
            to={PATHS.DASHBOARD}
            aria-label="Fechar deck"
            className="lg:hidden flex items-center justify-center w-11 h-11 shrink-0 rounded-lg text-3xl text-color-silver-2 active:bg-white/10"
          >
            <LuX />
          </Link>
        </div>
        <p className="text-color-silver-2 mt-1 lg:mt-0 lg:text-2xl">
          <span className="lg:hidden">
            {cardsCount} {cardsCount === 1 ? "card" : "cards"}
          </span>
          <span className="hidden lg:inline">Cards deste Deck</span>
        </p>
        {/* No celular os botões ficam um embaixo do outro, ocupando a largura */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center w-full justify-center mt-6 lg:mt-10 gap-3 lg:gap-7">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2.5 w-full lg:w-2xs h-12 lg:h-11 bg-linear-to-r from-btn-main-color to-second-color hover:brightness-110 scale-[0.98] 
                    cursor-pointer transition-all drop-shadow-blue-200 text-color-white font-medium border-none outline-none rounded-lg"
          >
            {<HiOutlinePlusSmall className="text-2xl" />}Novo Card
          </button>
          <button
            onClick={handleOpenSessionStudy}
            disabled={cardsCount === 0}
            title={
              cardsCount === 0
                ? "Crie pelo menos um card para estudar"
                : "Estudar este deck"
            }
            className="flex items-center justify-center gap-2.5 w-full lg:w-2xs h-12 lg:h-11 bg-second-color lg:bg-color-silver-1 hover:brightness-110 scale-[0.98] 
                    cursor-pointer transition-all drop-shadow-blue-200 text-color-white font-medium border-none outline-none rounded-lg
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100"
          >
            <LuBookOpen className="text-xl" />
            Estudar
          </button>
        </div>
        <div className="w-full lg:w-96">
          <div className="mt-6 lg:mt-9">
            <input
              type="text"
              placeholder="pesquisar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-11 rounded-lg p-2.5 border border-transparent outline-none caret-color-white text-white
                    bg-input-bg-main-color focus:bg-input-bg-main-color focus:border focus:border-color-white focus:shadow focus:shadow-color-white/35
                      autofill:bg-input-bg-main-color"
            />
          </div>
        </div>
      </div>
      <FlashcardList deckId={deckId} searchTerm={searchTerm} />
      {/* No celular o formulário já é uma tela cheia própria, sem o modal por trás */}
      {isMobile ? (
        isModalOpen && (
          <CreateCardComponent onClose={() => setIsModalOpen(false)} />
        )
      ) : (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <CreateCardComponent onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </>
  );
};
