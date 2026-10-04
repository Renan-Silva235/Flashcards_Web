import { useState, type FormEvent } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/rootReducer";
import api from "../../config/api";
import axios from "axios";
import { toast } from "react-toastify";

interface VerifyCodeProps {
  onClose: () => void;
  onSuccess: (code: string) => void;
}

interface Metadata {
  email: string | undefined;
  code: string;
}

export const VerifyCode = ({ onClose, onSuccess }: VerifyCodeProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [code, setCode] = useState<string>("");

  const sendRequest: Metadata = {
    email: user?.email,
    code: code,
  };

  const handleVerifyCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!code) {
      toast.error("Erro: Por favor digite o código enviado no seu e-mail.");
      return;
    }

    try {
      await api.post("/auth/password/verify-code", sendRequest);

      onSuccess(code);
    } catch (error: unknown) {
      if (axios.isAxiosError(error))
        toast.error(
          error.response?.data?.message ?? "Código inválido ou expirado.",
        );
    }
  };

  return (
    <div className="flex flex-col text-center gap-4 w-full h-fit bg-main-color text-color-white p-6 rounded-lg ">
      <h1 className="text-3xl">Verificar Código</h1>
      <p className="text-base text-color-silver-2">
        Digite o código enviado para o seu e-mail.
      </p>

      <form
        onSubmit={handleVerifyCode}
        className="flex flex-col gap-4 justify-center items-center"
      >
        <input
          type="text"
          placeholder="Código"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border border-color-white w-full text-center h-11 rounded-lg p-4 outline-none"
        />
        <button
          type="submit"
          className="bg-linear-to-r from-btn-main-color to-second-color h-11 w-full rounded-lg cursor-pointer hover:brightness-110 transition-all duration-200"
        >
          Verificar
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
