import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/rootReducer";
import { LuGrid3X3, LuCirclePlus } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout } from "react-icons/md";
import { PATHS } from "../../routes/Routes";
import { Navbar } from "../Navbar";
import { Modal } from "../Modal";
import { ConfirmLogout } from "../ConfirmLogout";
import { IoSparklesSharp } from "react-icons/io5";

// Só aparece a partir de lg; abaixo disso a navegação é a BottomNav
export const Sidebar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [confirmLogout, setConfirmLogout] = useState<boolean>(false);

  return (
    <>
      <aside className="hidden lg:flex sticky top-0 h-screen w-72 flex-col items-center bg-[#070b12] p-7 text-color-white">
        <div className="flex flex-col items-baseline w-full min-w-0">
          <h1 className="font-sans font-black tracking-tighter text-3xl">
            Flash Cards
          </h1>
          <p className="text-color-silver-2 text-base truncate max-w-full">
            Bem vindo, {user?.name}!
          </p>
        </div>
        <nav className="flex-1 flex-col mt-14 w-full text-center">
          <Navbar
            icon={LuGrid3X3}
            name="Dashboard"
            endpoint={PATHS.DASHBOARD}
          />
          <Navbar
            icon={LuCirclePlus}
            name="Novo Deck"
            endpoint={PATHS.DECK_CREATE}
          />
          <Navbar icon={CgProfile} name="Perfil" endpoint={PATHS.PROFILE} />
          <Navbar
            icon={IoSparklesSharp}
            name="Fluently AI"
            endpoint={PATHS.FLUENTLYAI}
          />
        </nav>
        <button
          type="button"
          onClick={() => setConfirmLogout(true)}
          className="flex items-center rounded-lg justify-start w-full h-11 mt-2 pl-2 whitespace-nowrap gap-3 cursor-pointer transition-all duration-300 bg-transparent hover:bg-white/10"
        >
          <MdOutlineLogout />
          <span>Logout</span>
        </button>
      </aside>

      <Modal isOpen={confirmLogout} onClose={() => setConfirmLogout(false)}>
        <ConfirmLogout onClose={() => setConfirmLogout(false)} />
      </Modal>
    </>
  );
};
