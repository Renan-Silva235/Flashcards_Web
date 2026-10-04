import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../../store/modules/auth/actions";

interface ConfirmLogoutProps {
  onClose: () => void;
}

export const ConfirmLogout = ({ onClose }: ConfirmLogoutProps) => {
  const dispatch = useDispatch();

  // Ao limpar o estado de auth, o ProtectedRoute redireciona para o login
  const handleLogout = () => {
    onClose();
    dispatch(logout());
    toast.success("Você saiu da sua conta.");
  };

  return (
    <div className="flex flex-col gap-4 bg-main-color w-full max-w-md h-fit p-5 sm:p-6 text-center rounded-lg">
      <h1 className="text-color-white text-xl sm:text-2xl">
        Deseja realmente sair?
      </h1>
      <p className="text-[14px] text-color-white">
        Você precisará fazer login novamente para acessar sua conta.
      </p>
      <div className="flex w-full gap-3 sm:gap-4 items-center sm:justify-center">
        <button
          type="button"
          onClick={handleLogout}
          className="flex-1 sm:flex-none sm:w-32 h-11 sm:h-10 bg-red-700 text-color-white rounded-lg text-base cursor-pointer hover:brightness-110 transition-all duration-200"
        >
          Sair
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 sm:flex-none sm:w-32 h-11 sm:h-10 bg-color-white text-black rounded-lg text-base cursor-pointer hover:brightness-110 transition-all duration-200"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
