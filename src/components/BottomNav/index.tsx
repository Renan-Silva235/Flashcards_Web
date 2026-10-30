import { NavLink } from "react-router-dom";
import type { IconType } from "react-icons/lib";
import { LuGrid3X3, LuCirclePlus, LuUser } from "react-icons/lu";
import { IoSparklesSharp } from "react-icons/io5";
import { PATHS } from "../../routes/Routes";

const ITEMS: { icon: IconType; name: string; endpoint: string }[] = [
  { icon: LuGrid3X3, name: "Dashboard", endpoint: PATHS.DASHBOARD },
  { icon: LuCirclePlus, name: "Novo", endpoint: PATHS.DECK_CREATE },
  { icon: IoSparklesSharp, name: "Fluently AI", endpoint: PATHS.FLUENTLYAI },
  { icon: LuUser, name: "Perfil", endpoint: PATHS.PROFILE },
];

// Navegação do celular/tablet (abaixo de lg): fica fixa embaixo, no lugar da Sidebar
export const BottomNav = () => {
  return (
    <nav
      data-bottom-nav
      // px-4 + pb mínimo: nada encosta nas bordas (regra do Android contra toques acidentais)
      className="lg:hidden fixed inset-x-0 bottom-0 z-30 flex gap-2 px-4 bg-[#070b12]/95 backdrop-blur border-t border-color-silver-1/60
                pb-[max(env(safe-area-inset-bottom),0.75rem)]"
    >
      {ITEMS.map(({ icon: Icon, name, endpoint }) => (
        <NavLink
          key={endpoint}
          to={endpoint}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center justify-center gap-1 h-16 rounded-lg text-xs transition-colors duration-200 ${
              isActive
                ? "text-btn-main-color"
                : "text-color-silver-2 active:text-color-white"
            }`
          }
        >
          <Icon className="text-2xl" />
          <span>{name}</span>
        </NavLink>
      ))}
    </nav>
  );
};
