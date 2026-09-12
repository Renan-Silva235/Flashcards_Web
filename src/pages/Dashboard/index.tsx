import { useSelector } from "react-redux";
import { useState } from "react";
import { CardsStatistic } from "./CardsStatistic";
import { DeckList } from "./DeckList";
import type { RootState } from "../../store/rootReducer";
import { LanguageDropdown } from "./LanguageDropdown";

export const Dashboard = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <>
      <div className="flex w-full">
        <div className="flex-col">
          <h1 className="font-bold text-color-white text-4xl font-sans">
            Meus Decks
          </h1>
          <p className="text-color-silver-2 mt-2">
            Entre em um deck para criar cards e estudar.
          </p>
        </div>
        <div className="flex flex-1 justify-end">
          <LanguageDropdown
            selectedLanguage={selectedLanguage}
            onChange={(language) => setSelectedLanguage(language)}
          />
        </div>
      </div>

      <div className="flex flex-wrap mt-11 w-full justify-center">
        <CardsStatistic selectedLanguage={selectedLanguage} />
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

      <DeckList
        userId={user?.id}
        searchTerm={searchTerm}
        selectedLanguage={selectedLanguage}
      />
    </>
  );
};
