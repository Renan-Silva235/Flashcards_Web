import { useSyncExternalStore } from "react";

// Mesmo limite do `lg` do Tailwind: abaixo de 1024px é o layout de celular/tablet
const MOBILE_QUERY = "(max-width: 1023px)";

const subscribe = (callback: () => void) => {
  const media = window.matchMedia(MOBILE_QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};

export const useIsMobile = () =>
  useSyncExternalStore(
    subscribe,
    () => window.matchMedia(MOBILE_QUERY).matches,
  );
