import { useEffect, useState } from "react";
import api from "../../../config/api";
import axios, { type AxiosResponse } from "axios";
import { Loading } from "../../../components/Loading";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/rootReducer";

interface StatisticsData {
  totalCards: number;
  easy: number;
  medium: number;
  hard: number;
}

interface CardsStatisticProps {
  selectedLanguage?: string;
}

const ANIMATION_MS = 900;

// Anima de 0 a 1 (com easeOutCubic) sempre que `trigger` muda
const useGrowAnimation = (trigger: unknown) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let frame: number;
    const start = performance.now();

    // Em aba oculta o navegador pausa o requestAnimationFrame: mostra o valor final direto
    if (document.visibilityState === "hidden") {
      const timer = setTimeout(() => setProgress(1), 0);
      return () => clearTimeout(timer);
    }

    const animate = (now: number) => {
      const linear = Math.min((now - start) / ANIMATION_MS, 1);
      setProgress(1 - Math.pow(1 - linear, 3));
      if (linear < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [trigger]);

  return progress;
};

export const CardsStatistic = ({ selectedLanguage }: CardsStatisticProps) => {
  const [stats, setStats] = useState<StatisticsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const progress = useGrowAnimation(stats);
  const { decks } = useSelector((state: RootState) => state.deck);

  // Muda quando um deck ou card é criado/deletado (favoritar não altera),
  // e aí as estatísticas são buscadas de novo
  const decksSignature = decks
    ? `${decks.length}:${decks.reduce((sum, deck) => sum + deck.cardsCount, 0)}`
    : "";

  useEffect(() => {
    const fetchStatistics = async () => {
      setIsLoading(true);
      try {
        const response: AxiosResponse = await api.get<StatisticsData>(
          "/statistics",
          {
            params: selectedLanguage ? { language: selectedLanguage } : {},
          },
        );
        setStats(response.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Erro ao buscar estátisticas: ",
            error.response?.data?.message,
          );
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchStatistics();
  }, [selectedLanguage, decksSignature]);

  const bars = [
    {
      label: "Fácil",
      value: stats?.easy ?? 0,
      color: "text-color-green-1",
      bar: "bg-color-green-1",
    },
    {
      label: "Médio",
      value: stats?.medium ?? 0,
      color: "text-color-yellow-1",
      bar: "bg-color-yellow-1",
    },
    {
      label: "Difícil",
      value: stats?.hard ?? 0,
      color: "text-color-red-1",
      bar: "bg-color-red-1",
    },
  ];
  const max = Math.max(...bars.map((bar) => bar.value));

  return (
    <div className="w-full rounded-2xl border border-color-silver-1 bg-[#0d1424] shadow-2xl shadow-black/50 p-6">
      <div className="rounded-lg border border-color-silver-1 bg-color-silver-1/40 px-5 py-4 flex items-center justify-between">
        <span className="text-color-silver-2">Total Cards</span>
        <span className="text-second-color text-3xl font-bold tabular-nums">
          {Math.round((stats?.totalCards ?? 0) * progress)}
        </span>
      </div>

      <div className="relative h-56 flex items-end justify-around gap-8 px-4 mt-6">
        {isLoading && !stats ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          bars.map((bar) => (
            <div
              key={bar.label}
              className="flex flex-col items-center justify-end h-full flex-1"
            >
              <span
                className={`${bar.color} text-xl font-bold tabular-nums mb-2`}
              >
                {Math.round(bar.value * progress)}
              </span>
              <div
                className={`${bar.bar} w-full max-w-24 rounded-t-md opacity-80`}
                style={{
                  height: max > 0 ? `${(bar.value / max) * 75 * progress}%` : 0,
                }}
              />
              <span className="text-color-silver-2 text-sm mt-3">
                {bar.label}
              </span>
            </div>
          ))
        )}

        {!isLoading && max === 0 && (
          <p className="absolute inset-x-0 top-1/3 text-center text-color-silver-2 text-sm">
            Estude um deck para ver suas estatísticas aqui.
          </p>
        )}
      </div>
    </div>
  );
};
