import { useSelector } from "react-redux";
import type { RootState } from "../../store/rootReducer";
import {
  LuGrid3X3,
  LuCirclePlus,
  LuBookOpen,
  LuChartNoAxesColumn,
} from "react-icons/lu";
import { MdOutlineLogout } from "react-icons/md";
import { PATHS } from "../../routes/Routes";
import { Navbar } from "../Navbar";

export const Sidebar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <aside className="flex flex-col  bg-[#070b12] h-screen w-72 p-7 pt-7 text-color-white items-center sticky top-0 ">
      <div className="flex flex-col items-baseline w-full">
        <h1 className="font-sans font-black tracking-tighter text-3xl">
          Flash Cards
        </h1>
        <p className="text-color-silver-2 text-base ">
          Bem vindo, {user?.name}!
        </p>
      </div>
      <div className="flex-1 flex-col mt-14 w-full text-center">
        <Navbar icon={LuGrid3X3} name="Dashboard" endpoint={PATHS.DASHBOARD} />
        <Navbar
          icon={LuCirclePlus}
          name="Novo Deck"
          endpoint={PATHS.NEW_DECK}
        />
        <Navbar
          icon={LuBookOpen}
          name="Estudar"
          endpoint={PATHS.STUDY_SESSION}
        />
        <Navbar
          icon={LuChartNoAxesColumn}
          name="Estatísticas"
          endpoint={PATHS.STATISTICS}
        />
      </div>
      <Navbar icon={MdOutlineLogout} name="Logout" endpoint={""} />
    </aside>
  );
};
