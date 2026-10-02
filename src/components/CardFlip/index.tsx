import { useState } from "react";
import { Loading } from "../Loading";
import { useSearchParams } from "react-router-dom";
import { SpeechAudio } from "../../components/SpeechAudio";

interface CardProps {
  word: string;
  translation: string;
  isLoading?: boolean;
}

export const CardFlip = ({ word, translation, isLoading }: CardProps) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const deckLanguage = searchParams.get("deckLanguage");

  if (isLoading) return <Loading />;

  return (
    <div className="flex text-center items-center justify-center">
      <div
        className="w-2xl rounded-lg h-96 text-color-white cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={`relative w-full h-full duration-500 preserve-3d transition-transform ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Lado da frente */}
          <div className="absolute inset-0 w-full h-full bg-linear-to-br from-blue-600 to-indigo-700 text-shadow-color-white rounded-2xl flex flex-col items-center justify-center p-6 backface-hidden">
            <span className="text-sm text-color-silver-2 px-3 py-1 mb-4 backdrop-blur-sm">
              Palavra
            </span>
            <h2 className="text-4xl font-bold mb-2">{word}</h2>
            <div className="flex flex-col mt-6 justify-center w-full items-center text-center">
              <div className="w-fit" onClick={(e) => e.stopPropagation()}>
                {<SpeechAudio language={deckLanguage ?? ""} pronounce={word} />}
              </div>
              <p className="text-center text-color-silver-2 text-sm">
                Toque no card para virar
              </p>
            </div>
          </div>

          {/* Lado de trás */}
          <div className="absolute inset-0 w-full h-full bg-linear-to-br from-color-purple-1/75 to-purple-900 text-color-white rounded-2xl flex flex-col items-center justify-center p-6 backface-hidden rotate-y-180">
            <span className="text-sm text-color-silver-2 px-3 py-1 mb-4 backdrop-blur-sm">
              TRADUÇÃO
            </span>
            <h2 className="text-4xl font-bold mb-2">{translation}</h2>
            <p className="text-sm text-color-silver-2 text-center mt-6">
              Clique novamente para voltar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
