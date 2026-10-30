import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import {
  getLanguageFlag,
  getLanguageLabel,
  languageOptions,
} from "../../../utils/languages";

interface CustomSelectProps {
  selectedLanguage: string;
  onChange: (value: string) => void;
  // "overlay": o menu flutua por cima do conteúdo (padrão)
  // "push": o menu expande para baixo e empurra o conteúdo da página
  mode?: "overlay" | "push";
  // Abaixo de lg o botão mostra só a bandeira e o menu sempre flutua (alinhado à direita)
  compact?: boolean;
}

export const LanguageDropdown = ({
  selectedLanguage,
  onChange,
  mode = "overlay",
  compact = false,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  const options = languageOptions.map((language) => (
    <button
      key={language.id}
      type="button"
      onClick={() => handleSelect(language.value)}
      tabIndex={isOpen ? 0 : -1}
      className={`w-full text-left p-3 text-color-white font-medium hover:bg-second-color/40
                transition-colors duration-200 flex items-center gap-2 cursor-pointer ${
                  language.value === selectedLanguage
                    ? "bg-second-color/20"
                    : ""
                }`}
    >
      {language.label}
    </button>
  ));

  const overlayMenu = (className = "") => (
    <div
      className={`absolute top-full w-48 mt-2 rounded-lg overflow-hidden border border-color-white/20
                bg-input-bg-main-color shadow-lg z-50 transition-all duration-300 origin-top ${className}
                ${
                  isOpen
                    ? "opacity-100 scale-y-100 pointer-events-auto"
                    : "opacity-0 scale-y-0 pointer-events-none"
                }`}
    >
      {options}
    </div>
  );

  // Faz parte do fluxo da página: a altura anima de 0 até o tamanho do conteúdo
  // (truque do grid 0fr -> 1fr) e o que está abaixo é empurrado junto
  const pushMenu = (className = "") => (
    <div
      className={`grid transition-all duration-300 ease-out ${className} ${
        isOpen
          ? "grid-rows-[1fr] opacity-100 mt-2"
          : "grid-rows-[0fr] opacity-0 mt-0"
      }`}
    >
      <div className="min-h-0 overflow-hidden">
        <div className="rounded-lg overflow-hidden border border-color-white/20 bg-input-bg-main-color shadow-lg">
          {options}
        </div>
      </div>
    </div>
  );

  const renderMenu = () => {
    if (!compact) return mode === "push" ? pushMenu() : overlayMenu("left-0");
    return (
      <>
        {overlayMenu("right-0 lg:hidden")}
        {mode === "push"
          ? pushMenu("hidden lg:grid")
          : overlayMenu("hidden lg:block left-0")}
      </>
    );
  };

  return (
    <div className={`relative ${compact ? "w-auto lg:w-48" : "w-48"}`}>
      {/* Botão principal */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={compact ? getLanguageLabel(selectedLanguage) : undefined}
        className={`flex border-2 w-full h-14 gap-2 justify-center items-center
                  bg-linear-to-r from-btn-main-color to-second-color
                  text-color-white font-medium p-2 rounded-lg cursor-pointer select-none ${
                    compact
                      ? "px-5 lg:px-2 border-transparent lg:border-color-white"
                      : ""
                  }`}
      >
        {compact ? (
          <>
            <span className="text-2xl lg:hidden">
              {getLanguageFlag(selectedLanguage)}
            </span>
            <span className="hidden lg:inline">
              {getLanguageLabel(selectedLanguage)}
            </span>
          </>
        ) : (
          getLanguageLabel(selectedLanguage)
        )}{" "}
        <HiChevronDown
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {renderMenu()}
    </div>
  );
};
