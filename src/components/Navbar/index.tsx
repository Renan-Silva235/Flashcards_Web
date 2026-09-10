import { NavLink } from "react-router-dom";
import type { IconType } from "react-icons/lib";

interface AbasInterface {
  icon: IconType;
  name: string;
  endpoint: string;
}

export const Navbar = ({ icon: Icon, name, endpoint }: AbasInterface) => {
  return (
    <NavLink to={endpoint} className="w-full">
      {({ isActive }) => (
        <div
          className={`flex items-center rounded-lg justify-start w-full h-11 mt-2 pl-2 whitespace-nowrap gap-3 cursor-pointer transition-all duration-300 ${
            isActive
              ? "bg-btn-main-color text-color-white hover:brightness-50 scale-[0.98]"
              : "rounded-lg bg-transparent hover:bg-white/10"
          }`}
        >
          <Icon />
          <span>{name}</span>
        </div>
      )}
    </NavLink>
  );
};
