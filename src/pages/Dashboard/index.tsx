import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import {
  // getLanguageFlag,
  getLanguageLabel,
  languageOptions,
} from "../../utils/languages";
import { CardsStatistic } from "../../components/CardsStatistic";
import { CardsDeck } from "../../components/CardsDeck";

export const Dashboard = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };

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
          <div className="relative w-48">
            <label
              htmlFor="languages"
              className="flex border-2 w-full h-14 gap-2 justify-center items-center bg-linear-to-r from-btn-main-color to-second-color 
            text-color-white font-medium p-2 rounded-lg pointer-events-none"
            >
              {getLanguageLabel(selectedLanguage)} <HiChevronDown />
            </label>
            <select
              id="languages"
              value={selectedLanguage}
              onChange={handleChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            >
              {languageOptions.map((language) => (
                <option key={language.id} value={language.value}>
                  {language.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap mt-11 w-full justify-center">
        <CardsStatistic />
      </div>

      <div className="w-96">
        <div className="mt-9">
          <input
            type="text"
            placeholder="pesquisar"
            className="w-full h-11 rounded-lg p-2.5 border border-transparent outline-none caret-color-white text-white
                    bg-input-bg-main-color focus:bg-input-bg-main-color focus:border focus:border-color-white focus:shadow focus:shadow-color-white/35
                      autofill:bg-input-bg-main-color"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-5 mt-10 justify-center">
        <CardsDeck
          category="English"
          title="Verbos"
          counter={8}
          description="Verbos sss"
        />
        <CardsDeck
          category="English"
          title="Verbos"
          counter={8}
          description="Verbos sss"
        />
        <CardsDeck
          category="English"
          title="Verbos"
          counter={8}
          description="Verbos sss"
        />
      </div>
    </>
  );
};
