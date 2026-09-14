import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoIosReturnLeft } from "react-icons/io";
import { LuBookOpen } from "react-icons/lu";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { FlashcardList } from "./FlashcardList";
import { Modal } from "../../components/Modal";
import { CreateCardComponent } from "./CreateCardComponent";

export const Flashcards = () => {
  const [searchParams] = useSearchParams();
  const deckName = searchParams.get("deckName");
  const deckId = searchParams.get("deckId");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col w-full">
        <Link
          to="/dashboard"
          className="flex gap-4 text-color-white text-base font-serif hover:text-white 
                    whitespace-nowrap items-center w-fit"
        >
          {<IoIosReturnLeft />} Meus Decks
        </Link>
        <div className="flex mt-10 justify-between">
          <h1 className="text-color-white font-bold text-5xl">{deckName}</h1>
          <div className="flex flex-col items-center">
            <p className="text-second-color text-5xl">0</p>
            <p className="text-color-silver-2 text-3xl">cards</p>
          </div>
        </div>
        <p className="text-color-silver-2 text-2xl">Cards deste Deck</p>
        <div className="flex items-center w-full justify-center mt-10 gap-7">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2.5 w-2xs h-11 bg-linear-to-r from-btn-main-color to-second-color hover:brightness-110 scale-[0.98] 
                    cursor-pointer transition-all drop-shadow-blue-200 text-color-white font-medium border-none outline-none rounded-lg"
          >
            {<HiOutlinePlusSmall className="text-2xl" />}Novo Card
          </button>
          <button
            className="flex items-center justify-center gap-2.5 w-2xs h-11 bg-color-silver-1 hover:brightness-110 scale-[0.98] 
                    cursor-pointer transition-all drop-shadow-blue-200 text-color-white font-medium border-none outline-none rounded-lg"
          >
            {<LuBookOpen className="text-bold text-" />}Estudar
          </button>
        </div>
        <div className="w-96">
          <div className="mt-9">
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreateCardComponent onClose={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};
