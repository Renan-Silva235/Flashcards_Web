import type { EssayCorrectionResult } from "../types";
import {
  buildHighlightedSegments,
  buildNativeTextSegments,
} from "../highlightErrors";

interface EssayResultProps {
  result: EssayCorrectionResult;
  originalText: string;
}

export const EssayResult = ({ result, originalText }: EssayResultProps) => {
  const { estimatedLevel, correctedText, errors, nativeSuggestions } = result;

  const errorSegments = buildHighlightedSegments(
    originalText,
    errors.map((error) => error.originalSnippet),
  );
  const nativeTextSegments = buildNativeTextSegments(
    correctedText,
    nativeSuggestions,
  );

  return (
    <div className="w-full rounded-2xl border border-color-silver-1 bg-[#0d1424] shadow-2xl shadow-black/50 p-6 mt-8 flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-color-white text-xl font-bold">Resultado</h2>
        <span className="rounded-full bg-second-color/20 border border-second-color text-second-color px-4 py-1 text-sm font-semibold">
          Nível estimado: {estimatedLevel}
        </span>
      </div>

      {errors.length > 0 && (
        <div>
          <h3 className="text-color-silver-2 text-sm font-semibold uppercase tracking-wide mb-2">
            Seu texto
          </h3>
          <p className="rounded-lg border border-color-silver-1 bg-color-silver-1/20 p-4 text-color-white whitespace-pre-wrap">
            {errorSegments.map((segment, index) =>
              segment.isHighlighted ? (
                <mark
                  key={index}
                  className="bg-color-red-1/20 text-color-red-1 rounded px-0.5"
                >
                  {segment.text}
                </mark>
              ) : (
                <span key={index}>{segment.text}</span>
              ),
            )}
          </p>
        </div>
      )}

      <div>
        <h3 className="text-color-silver-2 text-sm font-semibold uppercase tracking-wide mb-2">
          Texto corrigido
        </h3>
        <p className="rounded-lg border border-color-silver-1 bg-color-silver-1/20 p-4 text-color-white whitespace-pre-wrap">
          {correctedText}
        </p>
      </div>

      {errors.length > 0 && (
        <div>
          <h3 className="text-color-silver-2 text-sm font-semibold uppercase tracking-wide mb-2">
            Erros encontrados
          </h3>
          <div className="flex flex-col gap-3">
            {errors.map((error, index) => (
              <div
                key={index}
                className="rounded-lg border border-color-silver-1 bg-color-silver-1/10 p-4"
              >
                <p className="flex flex-wrap items-center gap-2 font-medium">
                  <span className="text-color-red-1 line-through">
                    {error.originalSnippet}
                  </span>
                  <span className="text-color-silver-2">→</span>
                  <span className="text-color-green-1">
                    {error.correctedSnippet}
                  </span>
                </p>
                <p className="text-color-silver-2 text-sm mt-2">
                  {error.ruleExplanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {nativeSuggestions.length > 0 && (
        <div>
          <h3 className="text-color-silver-2 text-sm font-semibold uppercase tracking-wide mb-2">
            Versão mais natural
          </h3>
          <p className="rounded-lg border border-color-silver-1 bg-color-silver-1/20 p-4 text-color-white whitespace-pre-wrap">
            {nativeTextSegments.map((segment, index) =>
              segment.isHighlighted ? (
                <mark
                  key={index}
                  className="bg-color-green-1/20 text-color-green-1 rounded px-0.5"
                >
                  {segment.text}
                </mark>
              ) : (
                <span key={index}>{segment.text}</span>
              ),
            )}
          </p>

          <div className="flex flex-col gap-3 mt-3">
            {nativeSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="rounded-lg border border-color-silver-1 bg-color-silver-1/10 p-4"
              >
                <p className="flex flex-wrap items-center gap-2 font-medium">
                  <span className="text-color-silver-2">
                    {suggestion.originalSnippet}
                  </span>
                  <span className="text-color-silver-2">→</span>
                  <span className="text-color-green-1">
                    {suggestion.suggestedSnippet}
                  </span>
                </p>
                <p className="text-color-silver-2 text-sm mt-2">
                  {suggestion.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
