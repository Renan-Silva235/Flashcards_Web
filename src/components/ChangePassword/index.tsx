import { useState, type FormEvent } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/rootReducer";
import api from "../../config/api";
import axios from "axios";
import { toast } from "react-toastify";

interface ChangePasswordProps {
  code: string;
  onClose: () => void;
}

export const ChangePassword = ({ code, onClose }: ChangePasswordProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChangePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Erro: Por favor preencha todos os campos.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Erro: A senha deve possuir no mínimo 6 caracteres.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Erro: As senhas não coincidem.");
      return;
    }

    setIsLoading(true);
    try {
      await api.post("/auth/password/change", {
        email: user?.email,
        code,
        newPassword,
      });

      toast.success("Senha alterada com sucesso.");
      onClose();
    } catch (error: unknown) {
      if (axios.isAxiosError(error))
        toast.error(
          error.response?.data?.message ??
            "Erro ao alterar senha, tente novamente.",
        );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col text-center gap-4 w-full h-fit bg-main-color text-color-white p-6 rounded-lg ">
      <h1 className="text-3xl">Alterar Senha</h1>
      <p className="text-base text-color-silver-2">Digite a sua nova senha.</p>

      <form
        onSubmit={handleChangePassword}
        className="flex flex-col gap-4 justify-center items-center"
      >
        <input
          type="password"
          placeholder="Nova senha"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border border-color-white w-full text-center h-11 rounded-lg p-4 outline-none"
        />
        <input
          type="password"
          placeholder="Confirmar nova senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border border-color-white w-full text-center h-11 rounded-lg p-4 outline-none"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-linear-to-r from-btn-main-color to-second-color h-11 w-full rounded-lg cursor-pointer hover:brightness-110 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? "Salvando..." : "Salvar"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-transparent h-11 w-full rounded-lg cursor-pointer hover:brightness-110 transition-all duration-200"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};
