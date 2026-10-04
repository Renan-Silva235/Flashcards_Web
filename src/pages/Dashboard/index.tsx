import { useSelector } from "react-redux";
import { useState } from "react";
import { CardsStatistic } from "./CardsStatistic";
import { DeckList } from "./DeckList";
import type { RootState } from "../../store/rootReducer";
import { LanguageDropdown } from "./LanguageDropdown";
import { usePreferredLanguage } from "../../hooks/usePreferredLanguage";

export const Dashboard = () => {
  const [selectedLanguage, setSelectedLanguage] = usePreferredLanguage();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <>
      {/* flex-wrap: título e idioma ficam lado a lado enquanto couberem
          (título com no mínimo 128px + dropdown de 192px); em telas estreitas
          como 320px, o dropdown desce para a linha de baixo */}
      <div className="flex flex-wrap w-full items-start gap-x-3 gap-y-4">
        <div className="flex-1 basis-32 min-w-0">
          <h1 className="font-bold text-color-white text-4xl font-sans">
            Meus Decks
          </h1>
          <p className="text-color-silver-2 mt-2">
            Entre em um deck para criar cards e estudar.
          </p>
        </div>
        <div className="shrink-0">
          <LanguageDropdown
            mode="push"
            selectedLanguage={selectedLanguage}
            onChange={(language) => setSelectedLanguage(language)}
          />
        </div>
      </div>

      <div className="flex flex-wrap mt-11 w-full justify-center">
        <CardsStatistic selectedLanguage={selectedLanguage} />
      </div>

      <div className="w-full sm:w-96">
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
