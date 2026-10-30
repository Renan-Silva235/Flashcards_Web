import { useSelector } from "react-redux";
import { useState } from "react";
import { LuSearch } from "react-icons/lu";
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
    // No celular a busca vem antes das estatísticas; no desktop, depois (order-*)
    <div className="flex flex-col w-full">
      <div className="flex w-full items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h1 className="font-bold text-color-white text-3xl lg:text-4xl font-sans">
            Meus Decks
          </h1>
          <p className="text-color-silver-2 mt-2">
            Entre em um deck para criar cards e estudar.
          </p>
        </div>
        <div className="shrink-0">
          <LanguageDropdown
            mode="push"
            compact
            selectedLanguage={selectedLanguage}
            onChange={(language) => setSelectedLanguage(language)}
          />
        </div>
      </div>

      <div className="order-3 lg:order-2 flex flex-wrap mt-6 lg:mt-11 w-full justify-center">
        <CardsStatistic selectedLanguage={selectedLanguage} />
      </div>

      <div className="order-2 lg:order-3 w-full lg:w-96 mt-6 lg:mt-9">
        <div className="relative">
          <LuSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xl text-color-silver-2 pointer-events-none" />
          <input
            type="search"
            placeholder="Procurar decks ou categorias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 lg:h-11 rounded-lg py-2.5 pr-2.5 pl-11 border border-color-silver-1 lg:border-transparent outline-none caret-color-white text-white
                    bg-input-bg-main-color focus:bg-input-bg-main-color focus:border focus:border-color-white focus:shadow focus:shadow-color-white/35
                      autofill:bg-input-bg-main-color placeholder:text-color-silver-2"
          />
        </div>
      </div>

      <div className="order-4">
        <DeckList
          userId={user?.id}
          searchTerm={searchTerm}
          selectedLanguage={selectedLanguage}
        />
      </div>
    </div>
  );
};
