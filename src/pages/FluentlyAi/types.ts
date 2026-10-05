export interface GrammarError {
  originalSnippet: string;
  correctedSnippet: string;
  ruleExplanation: string;
}

export interface NativeSuggestion {
  originalSnippet: string;
  suggestedSnippet: string;
  explanation: string;
}

export interface EssayCorrectionResult {
  languageMismatch: boolean;
  detectedLanguage: string;
  estimatedLevel: string;
  correctedText: string;
  errors: GrammarError[];
  nativeSuggestions: NativeSuggestion[];
}
