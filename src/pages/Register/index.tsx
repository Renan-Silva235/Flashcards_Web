import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import validator from "validator";
import api from "../../config/api";
import { PATHS } from "../../routes/Routes";
import { BackButton } from "../../components/BackButton";
import { Modal } from "../../components/Modal";
import { VerifyCode } from "../../components/VerifyCode";
import { getApiErrorMessages } from "../../utils/apiError";

const inputClass = `w-full h-11 rounded-lg p-2.5 border border-transparent outline-none caret-color-white text-white
  bg-input-bg-main-color focus:bg-input-bg-main-color focus:border focus:border-color-white focus:shadow focus:shadow-color-white/35
  autofill:bg-input-bg-main-color`;

export const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isSendingCode, setIsSendingCode] = useState<boolean>(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState<boolean>(false);

  const validateForm = (): string | null => {
    if (!name.trim() || !email.trim() || !password || !confirmPassword)
      return "Preencha todos os campos.";
    if (!validator.isEmail(email.trim())) return "Digite um e-mail válido.";
    if (password.length < 6)
      return "A senha deve possuir no mínimo 6 caracteres.";
    if (password !== confirmPassword) return "As senhas não coincidem.";
    return null;
  };

  const sendCode = async () => {
    await api.post("/auth/register/send-code", { email: email.trim() });
    toast.success("Código enviado para o seu e-mail.");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setIsSendingCode(true);
    try {
      await sendCode();
      setIsVerifyModalOpen(true);
    } catch (error: unknown) {
      getApiErrorMessages(
        error,
        "Erro ao enviar o código de verificação.",
      ).forEach((message) => toast.error(message));
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleResendCode = async () => {
    try {
      await sendCode();
    } catch (error: unknown) {
      getApiErrorMessages(error, "Erro ao reenviar o código.").forEach(
        (message) => toast.error(message),
      );
    }
  };

  // Chamado pelo VerifyCode depois que o código foi validado
  const handleCreateAccount = async (code: string) => {
    try {
      await api.post("/auth/register", {
        name: name.trim(),
        email: email.trim(),
        password,
        code,
      });
      toast.success("Conta criada com sucesso! Faça login para continuar.");
      setIsVerifyModalOpen(false);
      navigate(PATHS.LOGIN, { state: { email: email.trim() } });
    } catch (error: unknown) {
      getApiErrorMessages(error, "Erro ao criar a conta.").forEach((message) =>
        toast.error(message),
      );
    }
  };

  return (
    <>
      <BackButton
        to={PATHS.LOGIN}
        label="Voltar para o Login"
        className="absolute top-4 left-4 sm:top-6 sm:left-6"
      />
      {/* Mesmo padrão do Login: 16px nas bordas no celular e espaço para o botão Voltar */}
      <div className="flex min-h-dvh items-center justify-center px-4 pt-20 pb-10 sm:px-6">
        <main className="flex flex-col font-sans w-full max-w-md">
          <h1 className="font-inter text-color-white text-4xl sm:text-5xl text-center font-extrabold">
            Criar Conta
          </h1>
          <p className="text-center text-color-silver-2 mt-1.5 mb-1.5">
            Comece a aprender idiomas com flashcards
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                value={email}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                value={password}
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo de 6 caracteres"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="confirmPassword">Confirmar senha</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                autoComplete="new-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Digite a senha novamente"
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={isSendingCode}
              className="w-full h-11 rounded-lg bg-linear-to-r from-btn-main-color to-second-color text-color-white font-bold 
                    mt-2 hover:brightness-110 active:scale-[0.98] cursor-pointer transition-all duration-300
                    disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSendingCode ? "Enviando código..." : "Cadastrar"}
            </button>
          </form>

          <p className="text-center text-color-silver-2 mt-6">
            Já tem conta?{" "}
            <Link
              to={PATHS.LOGIN}
              className="text-second-color font-bold hover:brightness-125"
            >
              Entrar
            </Link>
          </p>
        </main>
      </div>

      <Modal
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
      >
        <VerifyCode
          email={email.trim()}
          endpoint="/auth/register/verify-code"
          onClose={() => setIsVerifyModalOpen(false)}
          onSuccess={handleCreateAccount}
          onResend={handleResendCode}
        />
      </Modal>
    </>
  );
};
