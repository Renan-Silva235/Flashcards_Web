import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/rootReducer";
import { languageOptions } from "../utils/languages";

const DEFAULT_LANGUAGE = "English";

// A chave inclui o id do usuário para cada conta guardar a sua própria escolha
const storageKey = (userId?: string) =>
  `preferred_language:${userId ?? "guest"}`;

const isValidLanguage = (value: string | null): value is string =>
  !!value && languageOptions.some((option) => option.value === value);

const readLanguage = (userId?: string): string => {
  try {
    const saved = localStorage.getItem(storageKey(userId));
    return isValidLanguage(saved) ? saved : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
};

// Idioma selecionado no dashboard, salvo no localStorage.
// Continua o mesmo ao trocar de página, recarregar e até após logout/login,
// e só muda quando o próprio usuário escolhe outro.
export const usePreferredLanguage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [language, setLanguageState] = useState<string>(() =>
    readLanguage(user?.id),
  );

  const setLanguage = (value: string) => {
    setLanguageState(value);
    try {
      localStorage.setItem(storageKey(user?.id), value);
    } catch {
      // localStorage indisponível (ex.: aba anônima): mantém só em memória
    }
  };

  return [language, setLanguage] as const;
};
