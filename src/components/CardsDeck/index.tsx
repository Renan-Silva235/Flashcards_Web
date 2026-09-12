import { getLanguageLabel } from "../../utils/languages";

interface Metadata {
  language: string;
  title: string;
  category: string;
  counter: number;
}

export const CardsDeck = ({ language, title, category, counter }: Metadata) => {
  return (
    <div
      className="flex flex-col justify-between overflow-hidden h-60 border border-color-white rounded-lg w-96 p-7 
                  bg-linear-to-r from-color-white/10 to-main-color shadow-lg shadow-black/50
                  transition-transform duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer"
    >
      <p className="font-sans tracking-wider uppercase font-bold text-second-color">
        {getLanguageLabel(language)} {language}
      </p>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-color-white text-4xl">{title}</h1>
        <div className="flex flex-col items-end">
          <p className=" text-second-color text-2xl">{counter}</p>
          <p className="text-color-silver-2 text-base">cards</p>
        </div>
      </div>
      <p className="text-color-silver-2 line-clamp-2">{category}</p>
      <div className="flex justify-center gap-4 text-color-white mt-1.5">
        <button className="bg-color-silver-1 cursor-pointer rounded-lg w-fit h-fit p-2 hover:brightness-110 scale-[0.98] transition-all duration-300">
          Abrir Deck
        </button>
        <button className="bg-linear-to-r from-btn-main-color to-second-color cursor-pointer rounded-lg w-fit h-fit p-2 hover:brightness-110 scale-[0.98] transition-all duration-300">
          Estudar
        </button>
      </div>
    </div>
  );
};
