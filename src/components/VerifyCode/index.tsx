import { useState, type FormEvent, type ReactNode } from "react";
import api from "../../config/api";
import { toast } from "react-toastify";
import { getApiErrorMessages } from "../../utils/apiError";

interface VerifyCodeProps {
  email: string;
  endpoint: string; // ex.: /auth/password/verify-code ou /auth/register/verify-code
  onClose: () => void;
  onSuccess: (code: string) => void | Promise<void>;
  onResend?: () => Promise<void>;
  description?: ReactNode; // substitui o texto padrão abaixo do título
}

export const VerifyCode = ({
  email,
  endpoint,
  onClose,
  onSuccess,
  onResend,
  description,
}: VerifyCodeProps) => {
  const [code, setCode] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);

  const handleVerifyCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!code.trim()) {
      toast.error("Erro: Por favor digite o código enviado no seu e-mail.");
      return;
    }

    setIsVerifying(true);
    try {
      await api.post(endpoint, { email, code: code.trim() });
      await onSuccess(code.trim());
    } catch (error: unknown) {
      getApiErrorMessages(error, "Código inválido.").forEach((message) =>
        toast.error(message),
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!onResend) return;
    setIsResending(true);
    try {
      await onResend();
      setCode("");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex flex-col text-center gap-4 w-full max-w-md h-fit bg-main-color text-color-white p-6 rounded-lg ">
      <h1 className="text-3xl">Verificar Código</h1>
      <p className="text-base text-color-silver-2">
        {description ?? (
          <>
            Digite o código enviado para{" "}
            <span className="text-color-white font-bold">{email}</span>.
          </>
        )}
      </p>

      <form
        onSubmit={handleVerifyCode}
        className="flex flex-col gap-4 justify-center items-center"
      >
        <input
          type="text"
          placeholder="Código"
          value={code}
          autoFocus
          onChange={(e) => setCode(e.target.value)}
          className="border border-color-white w-full text-center h-11 rounded-lg p-4 outline-none tracking-widest"
        />
        <button
          type="submit"
          disabled={isVerifying}
          className="bg-linear-to-r from-btn-main-color to-second-color h-11 w-full rounded-lg cursor-pointer hover:brightness-110 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isVerifying ? "Verificando..." : "Verificar"}
        </button>
        {onResend && (
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending || isVerifying}
            className="text-sm text-color-silver-2 hover:text-color-white underline cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isResending ? "Reenviando..." : "Não recebeu? Reenviar código"}
          </button>
        )}
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
