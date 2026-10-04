import { useTicker } from "./useTicker";
import { DemoWindow } from "./DemoWindow";

const STATS = [
  {
    label: "Fácil",
    value: 42,
    color: "text-color-green-1",
    bar: "bg-color-green-1",
  },
  {
    label: "Médio",
    value: 27,
    color: "text-color-yellow-1",
    bar: "bg-color-yellow-1",
  },
  {
    label: "Difícil",
    value: 11,
    color: "text-color-red-1",
    bar: "bg-color-red-1",
  },
];

const TOTAL = STATS.reduce((sum, stat) => sum + stat.value, 0);
const MAX = Math.max(...STATS.map((stat) => stat.value));
const GROW_TICKS = 20;
const TOTAL_TICKS = 55;

// Simula o dashboard: contadores subindo e barras crescendo
export const StatsDemo = () => {
  const tick = useTicker(90) % TOTAL_TICKS;
  const linear = Math.min(tick / GROW_TICKS, 1);
  const progress = 1 - Math.pow(1 - linear, 3); // easeOutCubic

  return (
    <DemoWindow title="flashcards.app/dashboard">
      <div className="flex flex-col h-full gap-4">
        <div className="rounded-lg border border-color-silver-1 bg-color-silver-1/40 p-3 flex items-center justify-between">
          <span className="text-color-silver-2 text-sm">Total Cards</span>
          <span className="text-second-color text-2xl font-bold tabular-nums">
            {Math.round(TOTAL * progress)}
          </span>
        </div>

        <div className="flex-1 flex items-end justify-around gap-4 px-2">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-end h-full flex-1"
            >
              <span className={`${stat.color} font-bold tabular-nums mb-1`}>
                {Math.round(stat.value * progress)}
              </span>
              <div
                className={`${stat.bar} w-full max-w-14 rounded-t-md opacity-80`}
                style={{ height: `${(stat.value / MAX) * 70 * progress}%` }}
              />
              <span className="text-color-silver-2 text-xs mt-2">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DemoWindow>
  );
};
