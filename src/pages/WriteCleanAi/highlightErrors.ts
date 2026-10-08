import type { NativeSuggestion } from "./types";

export interface HighlightSegment {
  text: string;
  isHighlighted: boolean;
}

// Localiza cada trecho de `snippets` dentro de `text` (em ordem, sem
// sobreposição) e devolve o texto quebrado em pedaços normais/destacados,
// pra marcar os trechos sem precisar o usuário procurar.
export const buildHighlightedSegments = (
  text: string,
  snippets: string[],
): HighlightSegment[] => {
  const ranges: { start: number; end: number }[] = [];
  let cursor = 0;

  for (const snippet of snippets) {
    if (!snippet) continue;

    const index = text.indexOf(snippet, cursor);
    if (index === -1) continue;

    ranges.push({ start: index, end: index + snippet.length });
    cursor = index + snippet.length;
  }

  if (ranges.length === 0) return [{ text, isHighlighted: false }];

  const segments: HighlightSegment[] = [];
  let pointer = 0;
  for (const range of ranges) {
    if (range.start > pointer) {
      segments.push({
        text: text.slice(pointer, range.start),
        isHighlighted: false,
      });
    }
    segments.push({
      text: text.slice(range.start, range.end),
      isHighlighted: true,
    });
    pointer = range.end;
  }
  if (pointer < text.length) {
    segments.push({ text: text.slice(pointer), isHighlighted: false });
  }

  return segments;
};

// Reescreve `correctedText` trocando cada `originalSnippet` por seu
// `suggestedSnippet` (em ordem, sem sobreposição) e devolve os pedaços
// trocados marcados, pra mostrar a versão mais natural com os trechos
// alterados destacados em vez de só listar as sugestões soltas.
export const buildNativeTextSegments = (
  correctedText: string,
  suggestions: NativeSuggestion[],
): HighlightSegment[] => {
  const matches: { start: number; end: number; replacement: string }[] = [];
  let cursor = 0;

  for (const suggestion of suggestions) {
    if (!suggestion.originalSnippet) continue;

    const index = correctedText.indexOf(suggestion.originalSnippet, cursor);
    if (index === -1) continue;

    matches.push({
      start: index,
      end: index + suggestion.originalSnippet.length,
      replacement: suggestion.suggestedSnippet,
    });
    cursor = index + suggestion.originalSnippet.length;
  }

  if (matches.length === 0) {
    return [{ text: correctedText, isHighlighted: false }];
  }

  const segments: HighlightSegment[] = [];
  let pointer = 0;
  for (const match of matches) {
    if (match.start > pointer) {
      segments.push({
        text: correctedText.slice(pointer, match.start),
        isHighlighted: false,
      });
    }
    segments.push({ text: match.replacement, isHighlighted: true });
    pointer = match.end;
  }
  if (pointer < correctedText.length) {
    segments.push({
      text: correctedText.slice(pointer),
      isHighlighted: false,
    });
  }

  return segments;
};
