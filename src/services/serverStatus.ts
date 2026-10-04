import axios from "axios";
import { useSyncExternalStore } from "react";
import api from "../config/api";

// O backend está no plano gratuito do Render: depois de 15 min sem requisições
// o servidor desliga e a primeira requisição seguinte leva ~40s a 1 min para ligá-lo.
// Este serviço "acorda" o servidor e avisa a interface quando ele está pronto.

export type ServerStatus = "unknown" | "waking" | "online";

let status: ServerStatus = "unknown";
let startedAt: number | null = null;
let wakeUpPromise: Promise<void> | null = null;
const listeners = new Set<() => void>();

const setStatus = (next: ServerStatus) => {
  status = next;
  listeners.forEach((listener) => listener());
};

const RETRY_DELAY_MS = 5000;
const REQUEST_TIMEOUT_MS = 90000;

// Respostas de "gateway": quem respondeu foi o proxy da Vercel (rewrite /api),
// não o backend. Significa que o Render ainda está ligando.
const GATEWAY_STATUSES = [502, 503, 504];

const ping = async (): Promise<boolean> => {
  try {
    // Rota real da API (não a raiz): com o rewrite da Vercel, "/api/" sozinho cai na
    // página do app e responderia na hora, mesmo com o Render ainda dormindo
    await api.get("/statistics", { timeout: REQUEST_TIMEOUT_MS });
    return true;
  } catch (error: unknown) {
    // Qualquer outra resposta HTTP (até 401/404) significa que o backend já está ligado
    return (
      axios.isAxiosError(error) &&
      !!error.response &&
      !GATEWAY_STATUSES.includes(error.response.status)
    );
  }
};

// Pode ser chamada várias vezes: só faz uma tentativa de acordar por vez
export const wakeUpServer = (): Promise<void> => {
  if (status === "online") return Promise.resolve();
  if (wakeUpPromise) return wakeUpPromise;

  startedAt = Date.now();
  setStatus("waking");

  wakeUpPromise = (async () => {
    while (!(await ping())) {
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    }
    setStatus("online");
    wakeUpPromise = null;
  })();

  return wakeUpPromise;
};

export const getWakeUpStartedAt = () => startedAt;
export const getServerStatus = () => status;

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const useServerStatus = () =>
  useSyncExternalStore(subscribe, () => status);
