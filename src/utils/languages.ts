export const languageLabels: Record<string, string> = {
  English: "🇺🇸 Inglês",
  Spanish: "🇪🇸 Espanhol",
  Turkish: "🇹🇷 Turco",
};

export const languageFlags: Record<string, string> = {
  English: "🇺🇸",
  Spanish: "🇪🇸",
  Turkish: "🇹🇷",
};

export const languageSpeechCodes: Record<string, string> = {
  English: "en-US",
  Spanish: "es-ES",
  Turkish: "tr-TR",
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
];

export function getLanguageLabel(language: string): string {
  return languageLabels[language] ?? language;
}

export function getLanguageFlag(language: string): string {
  return languageFlags[language] ?? "🇹🇷";
}
