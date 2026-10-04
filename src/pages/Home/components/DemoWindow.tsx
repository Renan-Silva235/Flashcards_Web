import type { ReactNode } from "react";

interface DemoWindowProps {
  title: string;
  children: ReactNode;
  bodyClassName?: string;
}

// "Janela de navegador" falsa que envolve cada demo animada
export const DemoWindow = ({
  title,
  children,
  bodyClassName = "p-6",
}: DemoWindowProps) => {
  return (
    <div className="w-full rounded-2xl border border-color-silver-1 bg-[#0d1424] shadow-2xl shadow-black/50 overflow-hidden">
      <div className="flex items-center gap-2 px-4 h-9 border-b border-color-silver-1 bg-[#070b12]">
        <span className="w-3 h-3 rounded-full bg-color-red-1/80" />
        <span className="w-3 h-3 rounded-full bg-color-yellow-1/80" />
        <span className="w-3 h-3 rounded-full bg-color-green-1/80" />
        <span className="ml-3 text-xs text-color-silver-2 truncate">
          {title}
        </span>
      </div>
      <div className={`relative h-80 overflow-hidden ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
};
