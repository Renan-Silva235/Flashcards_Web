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
    <div className="flex flex-col gap-4 bg-main-color w-fit h-fit p-6 text-center rounded-lg">
      <h1 className="text-color-white text-2xl">Deseja realmente sair?</h1>
      <p className="text-[14px] text-color-white">
        Você precisará fazer login novamente para acessar sua conta.
      </p>
      <div className="flex gap-6 items-center justify-center">
        <button
          type="button"
          onClick={handleLogout}
          className="bg-red-700 text-color-white rounded-lg text-base w-20 h-9 cursor-pointer hover:brightness-110 transition-all duration-200"
        >
          Sair
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-color-white text-black rounded-lg text-base w-20 h-9 cursor-pointer hover:brightness-110 transition-all duration-200"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
