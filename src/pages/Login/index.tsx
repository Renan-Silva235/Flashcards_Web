import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../store/modules/auth/actions";
import type { RootState } from "../../store/rootReducer";
import { PATHS } from "../../routes/Routes";
import { useLocation, useNavigate } from "react-router-dom";
import { BackButton } from "../../components/BackButton";
import { ServerWakeUpModal } from "../../components/ServerWakeUpModal";
import { useServerStatus } from "../../services/serverStatus";
import { toast } from "react-toastify";
import { Modal } from "../../components/Modal";
import { ForgotPassword } from "../../components/ForgotPassword";
import { VerifyCode } from "../../components/VerifyCode";
import { ChangePassword } from "../../components/ChangePassword";
import axios from "axios";
import api from "../../config/api";

// Etapas do "Esqueci a senha": e-mail -> código -> nova senha
type ResetStep = "email" | "code" | "password" | null;

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // Depois do cadastro, o e-mail da conta nova já vem preenchido
  const [email, setEmail] = useState<string>(
    (location.state as { email?: string } | null)?.email ?? "",
  );
  const [password, setPassword] = useState("");
  const [resetStep, setResetStep] = useState<ResetStep>(null);
  const [resetEmail, setResetEmail] = useState<string>("");
  const [resetCode, setResetCode] = useState<string>("");

  const closeReset = () => {
    setResetStep(null);
    setResetCode("");
  };

  const handleResendResetCode = async () => {
    try {
      await api.post("/auth/password/send-code", { email: resetEmail });
    } catch (error: unknown) {
      // Mesmo cuidado do ForgotPassword: só falha se o servidor não respondeu
      if (!(axios.isAxiosError(error) && error.response)) {
        toast.error(
          "Não foi possível reenviar o código agora. Tente novamente.",
        );
        return;
      }
    }
    toast.success("Código reenviado! Verifique a sua caixa de entrada.");
  };

  const serverStatus = useServerStatus();
  const { isLoading, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(loginRequest(email, password));
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    // Volta para a página que o usuário tentou abrir antes de ser mandado ao login
    const from = (
      location.state as { from?: { pathname: string; search: string } } | null
    )?.from;
    navigate(from ? `${from.pathname}${from.search}` : PATHS.DASHBOARD, {
      replace: true,
    });
  }, [navigate, isAuthenticated, location.state]);

  return (
    <>
      <BackButton
        to={PATHS.HOME}
        label="Voltar para a Home"
        className="absolute top-4 left-4 sm:top-6 sm:left-6"
      />
      <ServerWakeUpModal />
      {/* px-4 = 16px: no celular nada encosta nas bordas; pt-20 deixa espaço para o botão Voltar */}
      <div className="flex min-h-dvh items-center justify-center px-4 pt-20 pb-10 sm:px-6">
        <main className="flex flex-col font-sans w-full max-w-md">
          <h1 className="font-inter text-color-white text-4xl sm:text-5xl text-center font-extrabold">
            Flash Cards
          </h1>
          <p className="text-center text-color-silver-2 mt-1.5 mb-1.5">
            Aprenda idiomas de forma inteligente
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col mt-4">
            <div className="flex flex-col mb-4">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                value={email}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full h-11 rounded-lg p-2.5 border border-transparent outline-none caret-color-white text-white
                    bg-input-bg-main-color focus:bg-input-bg-main-color focus:border focus:border-color-white focus:shadow focus:shadow-color-white/35
                      autofill:bg-input-bg-main-color"
              />
            </div>

            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              placeholder="********"
              className="w-full h-11 rounded-lg p-2.5 border border-transparent outline-none caret-color-white text-white
                    bg-input-bg-main-color focus:bg-input-bg-main-color focus:border focus:border-color-white focus:shadow focus:shadow-color-white/35
                      autofill:bg-input-bg-main-color"
            />
            <button
              type="button"
              onClick={() => setResetStep("email")}
              className="self-end mt-2 py-1 text-sm text-second-color hover:text-color-white cursor-pointer"
            >
              Esqueceu a senha?
            </button>
            <button
              type="submit"
              className="w-full h-11 rounded-lg bg-linear-to-r from-btn-main-color to-second-color text-color-white font-bold 
                    mt-5 hover:brightness-110 active:scale-[0.98] cursor-pointer transition-all duration-300"
            >
              {isLoading
                ? serverStatus === "online"
                  ? "Autenticando..."
                  : "Aguardando o servidor ligar..."
                : "Enviar"}
            </button>
          </form>
          <div className="flex-col flex-1 items-center text-center mt-5">
            <p className="text-color-silver-2">Não tem conta?</p>
            <button
              type="button"
              onClick={() => navigate(PATHS.REGISTER)}
              className="mt-5 bg-color-silver-1 w-full h-11 rounded-lg text-color-white font-bold hover:brightness-110 active:scale-[0.98] cursor-pointer transition-all duration-300"
            >
              Criar Conta
            </button>
          </div>
        </main>
      </div>

      <Modal isOpen={resetStep === "email"} onClose={closeReset}>
        <ForgotPassword
          onClose={closeReset}
          onCodeSent={(sentTo) => {
            setResetEmail(sentTo);
            setResetStep("code");
          }}
        />
      </Modal>
      <Modal isOpen={resetStep === "code"} onClose={closeReset}>
        <VerifyCode
          email={resetEmail}
          endpoint="/auth/password/verify-code"
          onClose={closeReset}
          onResend={handleResendResetCode}
          description="Enviamos um código para o e-mail informado. Digite-o abaixo para criar uma nova senha."
          onSuccess={(code) => {
            setResetCode(code);
            setResetStep("password");
          }}
        />
      </Modal>
      <Modal isOpen={resetStep === "password"} onClose={closeReset}>
        <ChangePassword
          email={resetEmail}
          code={resetCode}
          onClose={closeReset}
          onSuccess={() => setPassword("")}
        />
      </Modal>
    </>
  );
};
