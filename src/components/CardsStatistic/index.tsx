import { useEffect, useState } from "react";
import api from "../../config/api";
import axios, { type AxiosResponse } from "axios";
import { Loading } from "../Loading";

interface StatisticsData {
  totalCards: number;
  easy: number;
  medium: number;
  hard: number;
}

interface CardsStatisticProps {
  selectedLanguage?: string;
}

interface CardProps {
  stats: number | undefined;
  context: string;
  color: string;
}

const Card = ({ stats, context, color }: CardProps) => {
  return (
    <div
      className="flex flex-col border border-color-white bg-color-silver-1 hover:brightness-110 active:scale-[0.98]
                    transition-all duration-300 w-64 h-28 rounded-lg cursor-pointer p-2.5 items-center ml-5 justify-center"
    >
      <p className={`text-2xl ${color}`}>{stats}</p>
      <p className="text-color-silver-2">{context}</p>
    </div>
  );
};

export const CardsStatistic = ({ selectedLanguage }: CardsStatisticProps) => {
  const [stats, setStats] = useState<StatisticsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
  }, [selectedLanguage]);

  console.log(stats);
  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-wrap gap-5">
      <Card
        stats={stats?.totalCards}
        context="Total Cards"
        color="text-second-color"
      />
      <Card
        stats={stats?.easy}
        context="Dificuldade Fácil"
        color="text-color-green-1"
      />
      <Card
        stats={stats?.medium}
        context="Dificuldade média"
        color="text-color-yellow-1"
      />
      <Card
        stats={stats?.totalCards}
        context="Dificuldade Difícil"
        color="text-color-red-1"
      />
    </div>
  );
};
