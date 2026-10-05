import { useTicker } from "./useTicker";
import { DemoWindow } from "./DemoWindow";

const TEXT = "I has go to school yesterday.";
const CHARS_PER_TICK = 2;

const TYPING_END = Math.ceil(TEXT.length / CHARS_PER_TICK); // digitando
const LOADING_END = TYPING_END + 5; // "Corrigindo..."
const ORIGINAL_END = LOADING_END + 7; // mostra o erro em vermelho
const CORRECTED_END = ORIGINAL_END + 10; // mostra o texto corrigido em verde
const CYCLE = CORRECTED_END + 5; // pausa antes de recomeçar

// Reproduz o fluxo real da tela Fluently AI: o usuário digita, clica em
// "Corrigir", vê o erro destacado e depois a correção — tudo em loop.
export const FluentlyAiDemo = () => {
  const tick = useTicker(150);
  const step = tick % CYCLE;

  const isTyping = step < TYPING_END;
  const isLoading = step >= TYPING_END && step < LOADING_END;
  const isResult = step >= LOADING_END;
  const showCorrected = step >= ORIGINAL_END;
  const leaving = step >= CORRECTED_END;

  const typedLength = Math.min(TEXT.length, step * CHARS_PER_TICK);
  const typedText = TEXT.slice(0, typedLength);
  const showCursor = isTyping && Math.floor(tick / 2) % 2 === 0;

  return (
    <DemoWindow title="flashcards.app/FluentlyAi">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between text-xs text-color-silver-2 mb-3 h-5">
          <span>Inglês</span>
          {isResult && (
            <span className="rounded-full bg-second-color/20 border border-second-color text-second-color px-2.5 py-0.5 text-[10px] font-semibold">
              Nível: A1
            </span>
          )}
        </div>

        <div
          className={`rounded-lg border border-color-silver-1 bg-input-bg-main-color p-3 text-sm leading-relaxed text-white min-h-14 transition-opacity duration-500 ${
            leaving ? "opacity-0" : "opacity-100"
          }`}
        >
          {isResult ? (
            <p>
              I{" "}
              <mark className="bg-color-red-1/20 text-color-red-1 rounded px-0.5">
                has go
              </mark>{" "}
              to school yesterday.
            </p>
          ) : (
            <p>
              {typedText}
              <span
                className={`inline-block w-0.5 h-4 bg-color-white ml-0.5 align-middle ${
                  showCursor ? "opacity-100" : "opacity-0"
                }`}
              />
            </p>
          )}
        </div>

        {!isResult && (
          <div className="flex justify-end mt-3">
            <span className="h-8 px-4 rounded-lg bg-linear-to-r from-btn-main-color to-second-color text-xs font-bold flex items-center">
              {isLoading ? "Corrigindo..." : "Corrigir"}
            </span>
          </div>
        )}

        <div
          className={`mt-3 rounded-lg border border-color-silver-1 bg-color-silver-1/10 p-3 text-sm transition-all duration-500 ${
            showCorrected && !leaving
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2"
          }`}
        >
          <p className="text-color-silver-2 text-[10px] uppercase tracking-wide mb-1">
            Texto corrigido
          </p>
          <p>
            I{" "}
            <mark className="bg-color-green-1/20 text-color-green-1 rounded px-0.5">
              went
            </mark>{" "}
            to school yesterday.
          </p>
        </div>
      </div>
    </DemoWindow>
  );
};
