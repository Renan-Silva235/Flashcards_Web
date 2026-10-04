import axios from "axios";

// A API devolve erros em formatos diferentes:
// - RuntimeException: texto puro (ex.: "Código inválido.")
// - Validação (@Valid): lista de { field, message }
// - Outros: objeto com { message }
export const getApiErrorMessages = (
  error: unknown,
  fallback: string,
): string[] => {
  if (!axios.isAxiosError(error)) return [fallback];

  const data = error.response?.data;
  if (typeof data === "string" && data.trim()) return [data];
  if (Array.isArray(data)) {
    const messages = data
      .map((item) => item?.message)
      .filter((message): message is string => typeof message === "string");
    if (messages.length > 0) return messages;
  }
  if (typeof data?.message === "string") return [data.message];

  return [fallback];
};
