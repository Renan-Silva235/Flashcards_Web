import { languageSpeechCodes } from "../../utils/languages";

export function getLanguageCode(language: string): string {
  return languageSpeechCodes[language] ?? "en-US";
}
