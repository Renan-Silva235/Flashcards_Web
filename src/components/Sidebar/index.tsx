import { useSelector } from "react-redux";
import type { RootState } from "../../store/rootReducer";
import {
  LuGrid3X3,
  LuCirclePlus,
  LuBookOpen,
  LuChartNoAxesColumn,
} from "react-icons/lu";
import { MdOutlineLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { PATHS } from "../../routes/Routes";
import type { IconType } from "react-icons/lib";
// import { Dashboard } from "../../pages/Dashboard";

interface AbasInterface {
  icon: IconType;
  name: string;
  endpoint: string;
}

const Aba = ({ icon: Icon, name, endpoint }: AbasInterface) => {
  return (
    <div
      className="flex items-center justify-start w-full  h-11 mt-2 rounded-lg bg-transparent pl-2
                      whitespace-nowrap  gap-3 cursor-pointer hover:bg-white/10 transition-all duration-300"
    >
      {<Icon />}
      <Link to={endpoint}>{name}</Link>
    </div>
  );
};

export const Sidebar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  console.log(user?.name);
  return (
    <aside className="flex flex-col  bg-[#070b12] h-screen w-72 p-7 pt-7 text-color-white items-center">
      <div className="flex flex-col items-baseline w-full">
        <h1 className="font-sans font-black tracking-tighter text-3xl">
          Flash Cards
        </h1>
        <p className="text-color-silver-2 text-base ">
          Bem vindo, {user?.name}!
        </p>
      </div>
      <div className="flex-1 flex-col mt-14 w-full text-center">
        <Aba icon={LuGrid3X3} name="Dashboard" endpoint={PATHS.DASHBOARD} />
        <Aba icon={LuCirclePlus} name="Novo Deck" endpoint={PATHS.DASHBOARD} />
        <Aba icon={LuBookOpen} name="Estudar" endpoint={PATHS.DASHBOARD} />
        <Aba
          icon={LuChartNoAxesColumn}
          name="Estatísticas"
          endpoint={PATHS.DASHBOARD}
        />
      </div>
      <Aba icon={MdOutlineLogout} name="Logout" endpoint={PATHS.DASHBOARD} />
    </aside>
  );
};
