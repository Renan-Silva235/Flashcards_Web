import { useEffect, useState } from "react";

// Contador que incrementa a cada `ms` milissegundos.
// As demos usam o valor (com %) para saber em qual etapa da animação estão.
export const useTicker = (ms: number) => {
  const [tick, setTick] = useState<number>(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), ms);
    return () => clearInterval(id);
  }, [ms]);

  return tick;
};
