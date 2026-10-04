import { HiChevronDown } from "react-icons/hi";
import { getLanguageLabel, languageOptions } from "../../../utils/languages";
import { useTicker } from "./useTicker";
import { DemoWindow } from "./DemoWindow";
import { DemoToast } from "./DemoToast";

const NAME = "Vocabulário de Viagem";
const CATEGORY = "Verbos, Expressões";

// Linha do tempo da animação (cada tick = 110ms)
const NAME_START = 3;
const CATEGORY_START = NAME_START + NAME.length + 2;
const DROPDOWN_OPEN = CATEGORY_START + CATEGORY.length + 2;
const DROPDOWN_SELECT = DROPDOWN_OPEN + 5;
const CLICK = DROPDOWN_SELECT + 4;
const TOAST = CLICK + 2;
const TOAST_DURATION = 22;
const TOTAL_TICKS = TOAST + TOAST_DURATION + 4;

// Reproduz a tela real de criar deck (pages/Dashboard/CreateDeck) em miniatura
export const CreateDeckDemo = () => {
  const tick = useTicker(110) % TOTAL_TICKS;

  // Após o submit a tela real limpa nome e categoria
  const submitted = tick >= TOAST;
  const typedName = submitted
    ? ""
    : NAME.slice(0, Math.max(0, tick - NAME_START));
  const typedCategory = submitted
    ? ""
    : CATEGORY.slice(0, Math.max(0, tick - CATEGORY_START));
  const isDropdownOpen = tick >= DROPDOWN_OPEN && tick < DROPDOWN_SELECT;
  const isHoveringOption = tick >= DROPDOWN_OPEN + 2 && tick < DROPDOWN_SELECT;
  const language = tick >= DROPDOWN_SELECT ? "Spanish" : "English";
  const isClicking = tick >= CLICK && tick < CLICK + 2;
  const showToast = tick >= TOAST && tick < TOAST + TOAST_DURATION;
  const toastProgress = showToast ? (tick - TOAST) / TOAST_DURATION : 0;

  const inputClass =
    "h-7 w-56 rounded-md bg-input-bg-main-color text-color-white text-[11px] px-2.5 flex items-center";

  return (
    <DemoWindow
      title="flashcards.app/deck/create"
      bodyClassName="p-4 bg-main-color"
    >
      <div className="flex flex-col items-center text-color-white">
        <h4 className="text-lg font-bold tracking-tighter">Novo Baralho</h4>
        <p className="text-color-silver-2 text-xs mt-0.5">
          Crie a estrutura do seu deck aqui
        </p>

        <div className="flex flex-col gap-1.5 items-center text-center w-full border border-color-white bg-color-silver-1/50 mt-3 p-3 rounded-lg">
          <span className="text-xs">Nome do Baralho</span>
          <div
            className={`${inputClass} ${tick >= NAME_START && tick < CATEGORY_START ? "border border-color-white" : ""}`}
          >
            {typedName || (
              <span className="text-color-silver-2">
                Ex: Vocabulário de Viagem
              </span>
            )}
            {tick >= NAME_START && tick < CATEGORY_START && <Caret />}
          </div>

          <span className="text-xs">Categoria</span>
          <div
            className={`${inputClass} ${tick >= CATEGORY_START && tick < DROPDOWN_OPEN ? "border border-color-white" : ""}`}
          >
            {typedCategory || (
              <span className="text-color-silver-2">
                Ex: Verbos, Expressões
              </span>
            )}
            {tick >= CATEGORY_START && tick < DROPDOWN_OPEN && <Caret />}
          </div>

          <div className="flex gap-2 items-center mt-1.5">
            <span className="text-xs">Idioma do Baralho:</span>
            <div className="relative w-28">
              <div className="flex border-2 w-full h-7 gap-1 justify-center items-center bg-linear-to-r from-btn-main-color to-second-color text-[11px] font-medium rounded-md">
                {getLanguageLabel(language)}
                <HiChevronDown
                  className={`transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>
              <div
                className={`absolute top-full left-0 w-full mt-1 rounded-md overflow-hidden border border-color-white/20 bg-input-bg-main-color shadow-lg z-10 transition-all duration-300 origin-top ${
                  isDropdownOpen
                    ? "opacity-100 scale-y-100"
                    : "opacity-0 scale-y-0"
                }`}
              >
                {languageOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`text-left px-2 py-1.5 text-[11px] font-medium transition-colors duration-200 ${
                      isHoveringOption && option.value === "Spanish"
                        ? "bg-second-color/40"
                        : ""
                    }`}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`mt-1.5 h-7 w-28 bg-second-color text-[11px] rounded-md flex items-center justify-center transition-all duration-150 ${
              isClicking ? "scale-90 brightness-125" : "scale-[0.98]"
            }`}
          >
            Criar Baralho
          </div>
        </div>
      </div>

      <DemoToast
        message="Deck criado com sucesso"
        visible={showToast}
        progress={toastProgress}
      />
    </DemoWindow>
  );
};

const Caret = () => (
  <span className="inline-block w-px h-3 ml-0.5 bg-color-white animate-pulse" />
);
