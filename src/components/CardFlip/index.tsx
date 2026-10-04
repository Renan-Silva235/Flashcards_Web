import { Loading } from "../Loading";
import { useSearchParams } from "react-router-dom";
import { SpeechAudio } from "../../components/SpeechAudio";

interface CardProps {
  word: string;
  translation: string;
  isFlipped: boolean;
  onFlip: () => void;
  isLoading?: boolean;
}

// O estado de "virado" fica no pai, para ele poder desvirar o card ao trocar de palavra
export const CardFlip = ({
  word,
  translation,
  isFlipped,
  onFlip,
  isLoading,
}: CardProps) => {
  const [searchParams] = useSearchParams();
  const deckLanguage = searchParams.get("deckLanguage");

  if (isLoading) return <Loading />;

  return (
    <div
      className="w-full h-80 text-color-white cursor-pointer perspective-1000"
      onClick={onFlip}
    >
      <div
        className={`relative w-full h-full duration-500 preserve-3d transition-transform ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Lado da frente */}
        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-700 shadow-2xl shadow-second-color/30 flex flex-col items-center justify-center p-6 backface-hidden">
          <span className="text-xs tracking-widest text-color-white/60">
            PALAVRA
          </span>
          <h2 className="text-5xl font-bold mt-4 text-center">{word}</h2>
          <div className="w-fit mt-6" onClick={(e) => e.stopPropagation()}>
            <SpeechAudio language={deckLanguage ?? ""} pronounce={word} />
          </div>
          <p className="text-sm text-color-white/60 mt-2">
            Toque no card para virar
          </p>
        </div>

        {/* Lado de trás */}
        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-color-purple-1/75 to-purple-900 shadow-2xl shadow-color-purple-1/30 flex flex-col items-center justify-center p-6 backface-hidden rotate-y-180">
          <span className="text-xs tracking-widest text-color-white/60">
            TRADUÇÃO
          </span>
          <h2 className="text-5xl font-bold mt-4 text-center">{translation}</h2>
          <p className="text-sm text-color-white/60 mt-6">
            Clique novamente para voltar
          </p>
        </div>
      </div>
    </div>
  );
};
