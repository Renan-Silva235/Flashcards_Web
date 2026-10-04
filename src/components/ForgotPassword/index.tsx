import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import validator from "validator";
import axios from "axios";
import api from "../../config/api";

interface ForgotPasswordProps {
  onClose: () => void;
  onCodeSent: (email: string) => void;
}

// Primeiro passo do "Esqueci a senha": pede o e-mail e envia o código de verificação
// Por segurança, nunca informa se o e-mail tem conta ou não (evita enumeração de usuários)
export const ForgotPassword = ({
  onClose,
  onCodeSent,
}: ForgotPasswordProps) => {
  const [email, setEmail] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = email.trim();

    if (!validator.isEmail(trimmedEmail)) {
      toast.error("Digite um e-mail válido.");
      return;
    }

    setIsSending(true);
    try {
      // A API responde igual exista ou não uma conta com esse e-mail
      await api.post("/auth/password/send-code", { email: trimmedEmail });
    } catch (error: unknown) {
      // Defesa extra: qualquer resposta do servidor (mesmo erro 4xx de uma API antiga)
      // é tratada como "enviado", para a tela nunca revelar se o e-mail tem conta.
      // Só avisa falha quando o servidor nem respondeu (fora do ar / sem internet).
      if (!(axios.isAxiosError(error) && error.response)) {
        toast.error("Não foi possível enviar o código agora. Tente novamente.");
        setIsSending(false);
        return;
      }
    }

    setIsSending(false);
    toast.success("Código enviado! Verifique a sua caixa de entrada.");
    onCodeSent(trimmedEmail);
  };

  return (
    <div className="flex flex-col text-center gap-4 w-full max-w-md h-fit bg-main-color text-color-white p-6 rounded-lg">
      <h1 className="text-3xl">Esqueceu a senha?</h1>
      <p className="text-base text-color-silver-2">
        Digite o e-mail da sua conta. Vamos enviar um código para você criar uma
        nova senha.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 justify-center items-center"
      >
        <input
          type="email"
          placeholder="seu@email.com"
          value={email}
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
          className="border border-color-white w-full text-center h-11 rounded-lg p-4 outline-none"
        />
        <button
          type="submit"
          disabled={isSending}
          className="bg-linear-to-r from-btn-main-color to-second-color h-11 w-full rounded-lg cursor-pointer hover:brightness-110 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSending ? "Enviando código..." : "Enviar código"}
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
