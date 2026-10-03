import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout } from "react-icons/md";
import { GiPadlock } from "react-icons/gi";
import type { RootState } from "../../store/rootReducer";

export const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div className="flex flex-col w-full h-fit items-center text-center justify-center p-6">
      <span className="text-second-color">
        <CgProfile size={110} />
      </span>
      <h2 className="mt-6 text-color-white text-2xl">{user?.email}</h2>
      <div className="flex flex-col gap-6 w-96 mt-12 ">
        <p className="text-start text-color-silver-2">Sua Conta</p>
        <div className="flex flex-col w-full h-fit bg-color-silver-1 rounded-lg p-6 gap-4">
          <div className="flex justify-between border-b border-b-color-silver-2 pb-3">
            <p className="text-color-white text-start">Decks</p>
            <p className="text-second-color">5</p>
          </div>
          <div className="flex justify-between border-b border-b-color-silver-2 pb-3">
            <p className="text-color-white text-start">Flashcards</p>
            <p className="text-second-color">5</p>
          </div>
          <div className="flex justify-between border-b border-b-color-silver-2 pb-3">
            <p className="text-color-white text-start">Favoritos</p>
            <p className="text-second-color">5</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 w-96 mt-12 ">
        <p className="text-start text-color-silver-2">Configurações</p>
        <div className="flex flex-col w-full h-fit bg-color-silver-1 rounded-lg p-6 gap-4">
          <div className="flex justify-between hover:brightness-110 transition-all duration-200 cursor-pointer">
            <div className="flex whitespace-nowrap gap-2">
              <span className="text-second-color">
                <GiPadlock size={24} />
              </span>
              <button className="w-full h-full rounded-lg text-color-white text-start cursor-pointer">
                Alterar Senha
              </button>
            </div>
            <p className="text-color-silver-2">{">"}</p>
          </div>
          <div className="w-full border-b border-b-color-silver-2"></div>
          <div className="flex justify-between hover:brightness-110 transition-all duration-200 cursor-pointer">
            <div className="flex whitespace-nowrap gap-2">
              <span className="text-color-red-1">
                <MdOutlineLogout size={24} />
              </span>
              <button className="w-full h-full rounded-lg text-color-red-1 text-start cursor-pointer">
                Sair da Conta
              </button>{" "}
            </div>
            <p className="text-color-silver-2">{">"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
