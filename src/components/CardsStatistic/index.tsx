interface StatisticsInterface {
  id: number;
  statistic: number;
  description: string;
}

const dataStatistic: StatisticsInterface[] = [
  { id: 1, statistic: 0, description: "cards" },
  { id: 2, statistic: 0, description: "Acertos" },
  { id: 3, statistic: 0, description: "Erros" },
  { id: 4, statistic: 0, description: "Favoritos" },
];

export const CardsStatistic = () => {
  return (
    <div className="flex ">
      {dataStatistic.map((stats) => (
        <div
          key={stats.id}
          className="flex flex-col border border-color-white bg-color-silver-1 hover:brightness-110 active:scale-[0.98]
                    transition-all duration-300 w-64 h-28 rounded-lg cursor-pointer p-2.5 items-center ml-5 justify-center"
        >
          <p>{stats.statistic}</p>
          <p>{stats.description}</p>
        </div>
      ))}
    </div>
  );
};
