import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { getLanguageLabel, languageOptions } from "../../../utils/languages";

interface CustomSelectProps {
  selectedLanguage: string;
  onChange: (value: string) => void;
}

export const LanguageDropdown = ({
  selectedLanguage,
  onChange,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-48">
      {/* Botão principal */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex border-2 w-full h-14 gap-2 justify-center items-center 
                  bg-linear-to-r from-btn-main-color to-second-color 
                  text-color-white font-medium p-2 rounded-lg cursor-pointer select-none"
      >
        {getLanguageLabel(selectedLanguage)}{" "}
        <HiChevronDown
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Menu suspenso animado */}
      <div
        className={`absolute top-full left-0 w-full mt-2 rounded-lg overflow-hidden border border-color-white/20
                    bg-input-bg-main-color shadow-lg z-50 transition-all duration-300 origin-top
                    ${
                      isOpen
                        ? "opacity-100 scale-y-100 pointer-events-auto"
                        : "opacity-0 scale-y-0 pointer-events-none"
                    }`}
      >
        {languageOptions.map((language) => (
          <button
            key={language.id}
            type="button"
            onClick={() => handleSelect(language.value)}
            className="w-full text-left p-3 text-color-white font-medium hover:bg-second-color/40 
                      transition-colors duration-200 flex items-center gap-2 cursor-pointer"
          >
            {language.label}
          </button>
        ))}
      </div>
    </div>
  );
};
