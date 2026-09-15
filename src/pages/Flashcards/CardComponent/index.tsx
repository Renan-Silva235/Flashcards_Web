import React, { useRef } from "react";

import type { FlashcardResponseApi } from "../../../store/modules/flashcards/interface";

interface CardComponentProps {
  mode: "view" | "form";
  data: FlashcardResponseApi;
  onChange?: (field: keyof FlashcardResponseApi, value: string) => void;
}

export const CardComponent = ({ mode, data, onChange }: CardComponentProps) => {
  //pegar as referências dos inputs
  const wordRef = useRef<HTMLInputElement>(null);
  const translationRef = useRef<HTMLInputElement>(null);
  const pastRef = useRef<HTMLInputElement>(null);
  const presentRef = useRef<HTMLInputElement>(null);
  const futureRef = useRef<HTMLInputElement>(null);
  const phrase1Ref = useRef<HTMLTextAreaElement>(null);
  const phrase2Ref = useRef<HTMLTextAreaElement>(null);
  const phrase3Ref = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    ref: React.RefObject<HTMLInputElement | null>,
    field: keyof FlashcardResponseApi,
  ) => {
    const element = ref.current;
    if (element && element.scrollWidth > element.clientWidth) {
      return;
    }
    onChange?.(field, event.target.value);
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    ref: React.RefObject<HTMLTextAreaElement | null>,
    field: keyof FlashcardResponseApi,
  ) => {
    const element = ref.current;
    if (element && element.scrollHeight > element.clientHeight) {
      return;
    }
    onChange?.(field, event.target.value);
  };

  return (
    <div
      className={
        mode === "view"
          ? "w-96 mt-7 h-fit border border-color-white rounded-lg bg-linear-to-r from-color-white/10 to-main-color shadow-lg shadow-black/50 transition-transform duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer p-6"
          : "w-96 mt-7 h-fit border border-color-white rounded-lg bg-linear-to-r from-color-white/10 to-main-color shadow-lg shadow-black/50  cursor-pointer p-6"
      }
    >
      {mode === "view" ? (
        <p className="text-center text-color-white text-4xl">{data.word}</p>
      ) : (
        <input
          ref={wordRef}
          type="text"
          value={data.word}
          placeholder="Palavra"
          onChange={(e) => handleInputChange(e, wordRef, "word")}
          className="text-center text-color-white text-4xl w-full"
        />
      )}
      {mode === "view" ? (
        <p className="text-color-white gap-3 font-normal m-3 text-center">
          {data.translation}
        </p>
      ) : (
        <input
          ref={translationRef}
          type="text"
          value={data.translation}
          placeholder="Tradução"
          onChange={(e) => handleInputChange(e, translationRef, "translation")}
          className="text-color-white font-normal mt-3 text-center w-full"
        />
      )}

      <div className="mt-4 flex w-full gap-2.5 items-center whitespace-nowrap justify-start">
        <p className="text-color-yellow-1 text-2xl">Passado:</p>
        {mode === "view" ? (
          <p className="text-color-white text-2xl">{data.past}</p>
        ) : (
          <input
            ref={pastRef}
            type="text"
            value={data.past}
            onChange={(e) => handleInputChange(e, pastRef, "past")}
            className="text-color-white text-2xl w-full"
          />
        )}
      </div>
      <div className="mt-4 flex w-full gap-2.5 items-center whitespace-nowrap justify-start">
        <p className="text-color-yellow-1 text-2xl">Presente:</p>
        {mode === "view" ? (
          <p className="text-color-white text-2xl">{data.present}</p>
        ) : (
          <input
            ref={presentRef}
            type="text"
            value={data.present}
            onChange={(e) => handleInputChange(e, presentRef, "present")}
            className="text-color-white text-2xl w-full"
          />
        )}
      </div>
      <div className="mt-4 flex w-full gap-2.5 items-center whitespace-nowrap justify-start">
        <p className="text-color-yellow-1 text-2xl">Futuro:</p>
        {mode === "view" ? (
          <p className="text-color-white text-2xl">{data.future}</p>
        ) : (
          <input
            ref={futureRef}
            type="text"
            value={data.future}
            onChange={(e) => handleInputChange(e, futureRef, "future")}
            className="text-color-white text-2xl w-full"
          />
        )}
      </div>
      <div className="mt-4 flex flex-col w-full gap-2.5">
        <p className="text-center text-color-yellow-1 text-base">Frase 1</p>
        {mode === "view" ? (
          <textarea
            readOnly
            tabIndex={-1}
            defaultValue={data.examplePhrase1}
            className="w-full h-18 resize-none overflow-hidden rounded-lg border border-color-white p-2.5 text-white outline-none 
                  caret-color-white focus:border focus:border-color-white focus:shadow focus:shadow-color-white/35"
          />
        ) : (
          <textarea
            ref={phrase1Ref}
            value={data.examplePhrase1}
            tabIndex={-1}
            onChange={(e) =>
              handleTextareaChange(e, phrase1Ref, "examplePhrase1")
            }
            className="w-full h-18 resize-none overflow-hidden rounded-lg border border-color-white p-2.5 text-white outline-none 
                  caret-color-white focus:border focus:border-color-white focus:shadow focus:shadow-color-white/35"
          />
        )}
      </div>
      <div className="mt-4 flex flex-col w-full gap-2.5">
        <p className="text-center text-color-yellow-1 text-2xl">Frase 2</p>
        {mode === "view" ? (
          <textarea
            readOnly
            tabIndex={-1}
            defaultValue={data.examplePhrase2}
            className="w-full h-18 resize-none overflow-hidden rounded-lg border border-color-white p-2.5 text-white outline-none 
                  caret-color-white focus:border focus:border-color-white focus:shadow focus:shadow-color-white/35"
          />
        ) : (
          <textarea
            ref={phrase2Ref}
            value={data.examplePhrase2}
            tabIndex={-1}
            onChange={(e) =>
              handleTextareaChange(e, phrase2Ref, "examplePhrase2")
            }
            className="w-full h-18 resize-none overflow-hidden rounded-lg border border-color-white p-2.5 text-white outline-none 
                  caret-color-white focus:border focus:border-color-white focus:shadow focus:shadow-color-white/35"
          />
        )}
      </div>
      <div className="mt-4 flex flex-col w-full gap-2.5">
        <p className="text-center text-color-yellow-1 text-2xl">Frase 3</p>
        {mode === "view" ? (
          <textarea
            readOnly
            tabIndex={-1}
            defaultValue={data.examplePhrase3}
            className="w-full h-18 resize-none overflow-hidden rounded-lg border border-color-white p-2.5 text-white outline-none 
                  caret-color-white focus:border focus:border-color-white focus:shadow focus:shadow-color-white/35"
          />
        ) : (
          <textarea
            ref={phrase3Ref}
            value={data.examplePhrase3}
            tabIndex={-1}
            onChange={(e) =>
              handleTextareaChange(e, phrase3Ref, "examplePhrase3")
            }
            className="w-full h-18 resize-none overflow-hidden rounded-lg border border-color-white p-2.5 text-white outline-none 
                  caret-color-white focus:border focus:border-color-white focus:shadow focus:shadow-color-white/35"
          />
        )}
      </div>
    </div>
  );
};
