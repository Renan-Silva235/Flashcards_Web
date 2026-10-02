import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/rootReducer";

interface CardProps {
  deckId: string;
}

export const CardFlip = ({ deckId }: CardProps) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const { flashcards, isLoading } = useSelector(
    (state: RootState) => state.flashcard,
  );

  return (
    <div className="flex text-center items-center justify-center">
      {/* Usando a classe .perspective-1000 que criamos acima */}
      <div
        className="w-2xl rounded-lg h-96 text-color-white cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Usando .preserve-3d e a rotação condicional correta */}
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
            {flashcards?.map((flashcard) => (
              <div key={flashcard.id}>
                <h2 className="text-4xl font-bold mb-2">{flashcard.word}</h2>
              </div>
            ))}
            <p className="text-center text-color-silver-2 text-sm">
              Toque no card para virar
            </p>
          </div>

          {/* Lado de trás */}
          <div className="absolute inset-0 w-full h-full bg-linear-to-br from-orange-500 to-red-600 text-color-white rounded-2xl flex flex-col items-center justify-center p-6 backface-hidden rotate-y-180">
            <h2 className="text-3xl font-bold mb-2">Verso</h2>
            <p className="text-center text-orange-100 text-sm mb-4">
              Informações secretas ou adicionais ficam aqui!
            </p>
            <span className="text-xs text-orange-200 underline">
              Clique novamente para voltar
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
