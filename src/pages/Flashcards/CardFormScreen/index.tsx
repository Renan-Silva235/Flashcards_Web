import { useEffect, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { LuX } from "react-icons/lu";
import type { FlashcardResponseApi } from "../../../store/modules/flashcards/interface";

type EditableField = Exclude<keyof FlashcardResponseApi, "id">;

interface CardFormScreenProps {
  title: string; // ex.: "Novo card", "Editar card"
  submitLabel: string; // ex.: "Criar card", "Salvar"
  data: FlashcardResponseApi;
  onChange: (field: EditableField, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  isSaving: boolean;
}

const FIELDS: { field: EditableField; label: string; multiline?: boolean }[] = [
  { field: "word", label: "Palavra" },
  { field: "translation", label: "Tradução" },
  { field: "past", label: "Passado" },
  { field: "present", label: "Presente" },
  { field: "future", label: "Futuro" },
  { field: "examplePhrase1", label: "Frase 1", multiline: true },
  { field: "examplePhrase2", label: "Frase 2", multiline: true },
  { field: "examplePhrase3", label: "Frase 3", multiline: true },
];

const inputClass = `w-full rounded-lg border border-color-silver-1 bg-input-bg-main-color px-4 text-color-white outline-none caret-color-white
  focus:border-color-white focus:shadow focus:shadow-color-white/35`;

// Tela cheia com o formulário do card no celular: usada para criar (Novo Card)
// e para editar (botão Editar da visualização)
export const CardFormScreen = ({
  title,
  submitLabel,
  data,
  onChange,
  onSubmit,
  onCancel,
  isSaving,
}: CardFormScreenProps) => {
  // Esc cancela, como fechar um modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  // Portal: cobre a tela toda (inclusive por cima do modal do card).
  // stopPropagation nos toques: deslizar o dedo aqui não troca de card no carrossel
  return createPortal(
    <div
      className="fixed inset-0 z-[60] overflow-y-auto bg-main-color"
      onTouchStart={(event) => event.stopPropagation()}
      onTouchEnd={(event) => event.stopPropagation()}
    >
      <form
        onSubmit={onSubmit}
        className="flex flex-col min-h-full px-4 pt-[calc(env(safe-area-inset-top)+1.5rem)] pb-[calc(max(env(safe-area-inset-bottom),0.75rem)+1rem)]"
      >
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-color-white font-bold text-3xl">{title}</h1>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Cancelar"
            className="flex items-center justify-center w-11 h-11 shrink-0 rounded-lg text-3xl text-color-silver-2 cursor-pointer active:bg-white/10"
          >
            <LuX />
          </button>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          {FIELDS.map(({ field, label, multiline }) => (
            <div key={field} className="flex flex-col gap-1.5">
              <label
                htmlFor={`edit-${field}`}
                className="text-color-silver-2 text-sm"
              >
                {label}
              </label>
              {multiline ? (
                <textarea
                  id={`edit-${field}`}
                  value={data[field]}
                  onChange={(e) => onChange(field, e.target.value)}
                  rows={2}
                  className={`${inputClass} py-3 resize-none`}
                />
              ) : (
                <input
                  id={`edit-${field}`}
                  type="text"
                  value={data[field]}
                  onChange={(e) => onChange(field, e.target.value)}
                  className={`${inputClass} h-12`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 mt-8">
          <button
            type="submit"
            disabled={isSaving}
            className="h-12 rounded-lg bg-amber-500 font-bold text-color-white cursor-pointer active:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSaving ? "Salvando..." : submitLabel}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="h-12 rounded-lg bg-color-silver-1 font-bold text-color-white cursor-pointer active:brightness-110"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>,
    document.body,
  );
};
