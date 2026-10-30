export const languageLabels: Record<string, string> = {
  English: "🇺🇸 Inglês",
  Spanish: "🇪🇸 Espanhol",
  Turkish: "🇹🇷 Turco",
  Italian: "🇮🇹 Italiano",
};

export const languageFlags: Record<string, string> = {
  English: "🇺🇸",
  Spanish: "🇪🇸",
  Turkish: "🇹🇷",
  Italian: "🇮🇹",
};

export const languageSpeechCodes: Record<string, string> = {
  English: "en-US",
  Spanish: "es-ES",
  Turkish: "tr-TR",
  Italian: "it-IT",
};

export type LanguageOption = {
  id: string;
  label: string;
  value: string;
};

export const languageOptions: LanguageOption[] = [
  { id: "1", label: languageLabels.English, value: "English" },
  { id: "2", label: languageLabels.Spanish, value: "Spanish" },
  { id: "3", label: languageLabels.Turkish, value: "Turkish" },
  { id: "4", label: languageLabels.Italian, value: "Italian" },
];

export function getLanguageLabel(language: string): string {
  return languageLabels[language] ?? language;
}

export function getLanguageFlag(language: string): string {
  return languageFlags[language] ?? "🇹🇷";
}
