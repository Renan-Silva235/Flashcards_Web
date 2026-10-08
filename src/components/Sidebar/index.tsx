import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/rootReducer";
import { LuGrid3X3, LuCirclePlus, LuX } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout } from "react-icons/md";
import { PATHS } from "../../routes/Routes";
import { Navbar } from "../Navbar";
import { Modal } from "../Modal";
import { ConfirmLogout } from "../ConfirmLogout";
import { IoSparklesSharp } from "react-icons/io5";

interface SidebarProps {
  isOpen: boolean; // só tem efeito abaixo de lg (gaveta); em telas grandes ela fica sempre visível
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [confirmLogout, setConfirmLogout] = useState<boolean>(false);

  return (
    <>
      {/* Fundo escuro atrás da gaveta (só celular/tablet) */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        id="app-sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-[#070b12] h-dvh w-72 max-w-[85vw] p-7 text-color-white items-center
          transition-transform duration-300 ease-out
          lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:max-w-none lg:translate-x-0 lg:shadow-none
          ${isOpen ? "translate-x-0 shadow-2xl shadow-black" : "-translate-x-full"}`}
      >
        <div className="flex items-start justify-between w-full">
          <div className="flex flex-col items-baseline min-w-0">
            <h1 className="font-sans font-black tracking-tighter text-3xl">
              Flash Cards
            </h1>
            <p className="text-color-silver-2 text-base truncate max-w-full">
              Bem vindo, {user?.name}!
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar menu"
            className="lg:hidden flex items-center justify-center w-10 h-10 -mr-2 rounded-lg text-2xl text-color-silver-2 hover:text-color-white hover:bg-white/10 cursor-pointer"
          >
            <LuX />
          </button>
        </div>
        <nav className="flex-1 flex-col mt-14 w-full text-center">
          <Navbar
            icon={LuGrid3X3}
            name="Dashboard"
            endpoint={PATHS.DASHBOARD}
            onNavigate={onClose}
          />
          <Navbar
            icon={LuCirclePlus}
            name="Novo Deck"
            endpoint={PATHS.DECK_CREATE}
            onNavigate={onClose}
          />
          <Navbar
            icon={CgProfile}
            name="Perfil"
            endpoint={PATHS.PROFILE}
            onNavigate={onClose}
          />
          <Navbar
            icon={IoSparklesSharp}
            name="WriteClean AI"
            endpoint={PATHS.WRITECLEANAI}
            onNavigate={onClose}
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
