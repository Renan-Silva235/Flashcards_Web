interface StatisticsInterface {
  id: number;
  statistic: number;
  description: string;
  color: string;
}

const dataStatistic: StatisticsInterface[] = [
  { id: 1, statistic: 0, description: "cards", color: "text-btn-main-color" },
  { id: 2, statistic: 0, description: "Acertos", color: "text-color-green-1" },
  { id: 3, statistic: 0, description: "Erros", color: "text-color-red-1" },
  {
    id: 4,
    statistic: 0,
    description: "Favoritos",
    color: "text-color-purple-1",
  },
];

export const CardsStatistic = () => {
  return (
    <div className="flex flex-wrap gap-5">
      {dataStatistic.map((stats) => (
        <div
          key={stats.id}
          className="flex flex-col border border-color-white bg-color-silver-1 hover:brightness-110 active:scale-[0.98]
                    transition-all duration-300 w-64 h-28 rounded-lg cursor-pointer p-2.5 items-center ml-5 justify-center"
        >
          <p className={`text-2xl ${stats.color}`}>{stats.statistic}</p>
          <p className="text-color-silver-2">{stats.description}</p>
        </div>
      ))}
    </div>
  );
};
