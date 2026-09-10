import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import {
  getLanguageFlag,
  getLanguageLabel,
  languageOptions,
} from "../../utils/languages";

export const Dashboard = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };

  return (
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
  );
};
