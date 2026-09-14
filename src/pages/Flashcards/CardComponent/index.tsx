import type { FlashcardResponseApi } from "../../../store/modules/flashcards/interface";

export const CardComponent = ({
  word,
  translation,
  past,
  present,
  future,
  examplePhrase1,
  examplePhrase2,
  examplePhrase3,
}: FlashcardResponseApi) => {
  return (
    <div
      className="w-96 mt-7 h-fit border border-color-white rounded-lg bg-linear-to-r from-color-white/10 to-main-color 
      shadow-lg shadow-black/50 transition-transform duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer p-6"
    >
      <p className="text-center text-color-white text-4xl">{word}</p>
      <p className="text-color-white gap-3 font-normal m-3 text-center">
        {translation}
      </p>
      <div className="mt-4 flex w-full gap-2.5 items-center whitespace-nowrap justify-start">
        <p className="text-color-yellow-1 text-2xl">Passado:</p>
        <p className="text-color-white text-2xl">{past}</p>
      </div>
      <div className="mt-4 flex w-full gap-2.5 items-center whitespace-nowrap justify-start">
        <p className="text-color-yellow-1 text-2xl">Presente:</p>
        <p className="text-color-white text-2xl">{present}</p>
      </div>
      <div className="mt-4 flex w-full gap-2.5 items-center whitespace-nowrap justify-start">
        <p className="text-color-yellow-1 text-2xl">Futuro:</p>
        <p className="text-color-white text-2xl">{future}</p>
      </div>
      <div className="mt-4 flex flex-col w-full gap-2.5">
        <p className="text-center text-color-yellow-1 text-base">Frase 1</p>
        <textarea
          readOnly
          tabIndex={-1}
          defaultValue={examplePhrase1}
          className="w-full h-18 resize-none overflow-hidden rounded-lg border border-color-white p-2.5 text-white outline-none 
                  caret-color-white focus:border focus:border-color-white focus:shadow focus:shadow-color-white/35"
        />
      </div>
      <div className="mt-4 flex flex-col w-full gap-2.5">
        <p className="text-center text-color-yellow-1 text-2xl">Frase 2</p>
        <textarea
          readOnly
          tabIndex={-1}
          defaultValue={examplePhrase2}
          className="w-full h-18 resize-none overflow-hidden rounded-lg border border-color-white p-2.5 text-white outline-none 
                  caret-color-white focus:border focus:border-color-white focus:shadow focus:shadow-color-white/35"
        />
      </div>
      <div className="mt-4 flex flex-col w-full gap-2.5">
        <p className="text-center text-color-yellow-1 text-2xl">Frase 3</p>
        <textarea
          readOnly
          tabIndex={-1}
          defaultValue={examplePhrase3}
          className="w-full h-18 resize-none overflow-hidden rounded-lg border border-color-white p-2.5 text-white outline-none 
                  caret-color-white focus:border focus:border-color-white focus:shadow focus:shadow-color-white/35"
        />
      </div>
    </div>
  );
};
