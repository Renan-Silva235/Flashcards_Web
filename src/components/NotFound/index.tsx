import { FiLayers } from "react-icons/fi";

interface NotFoundProps {
  msg: string;
  context?: string;
  isFilterSearch?: boolean;
}

export const NotFound = ({ msg, context, isFilterSearch }: NotFoundProps) => {
  return isFilterSearch ? (
    <div className="flex justify-center mt-10">
      <p className="text-color-silver-2">{msg}</p>
    </div>
  ) : (
    <div className="flex flex-col gap-7 items-center justify-center w-full border border-color-white/25 mt-10 h-fit p-10 rounded-lg">
      {<FiLayers className="text-4xl text-color-silver-2" />}
      <p className="text-color-white">{msg}</p>
      <p className="text-color-silver-2">{context}</p>
    </div>
  );
};
