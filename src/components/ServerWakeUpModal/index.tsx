import { useEffect, useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import { LuCheck } from "react-icons/lu";
import { Modal } from "../Modal";
import { Loading } from "../Loading";
import {
  getWakeUpStartedAt,
  useServerStatus,
  wakeUpServer,
} from "../../services/serverStatus";

// Aviso de que o servidor (plano gratuito do Render) pode estar desligado e demorar para ligar
export const ServerWakeUpModal = () => {
  const status = useServerStatus();
  // Sempre abre ao entrar no login, para o usuário saber da demora antes de tentar
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [elapsed, setElapsed] = useState<number>(0);

  useEffect(() => {
    wakeUpServer();
  }, []);

  // Contador de segundos enquanto o servidor liga
  useEffect(() => {
    if (status !== "waking") return;
    const update = () => {
      const startedAt = getWakeUpStartedAt();
      if (startedAt) setElapsed(Math.floor((Date.now() - startedAt) / 1000));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [status]);

  const handleClose = () => setIsOpen(false);

  const isOnline = status === "online";

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="flex flex-col items-center gap-4 bg-main-color w-full max-w-md p-6 text-center rounded-lg border border-color-silver-1 text-color-white">
        <span className="flex items-center justify-center w-14 h-14 rounded-full bg-color-yellow-1/15 text-color-yellow-1 text-3xl">
          <IoWarningOutline />
        </span>
        <h1 className="text-2xl font-bold">Atenção</h1>
        <p className="text-sm text-color-silver-2">
          O servidor desta aplicação está hospedado em um{" "}
          <span className="text-color-white font-bold">plano gratuito</span>,
          que desliga após 15 minutos sem uso. No primeiro acesso ele pode levar{" "}
          <span className="text-color-white font-bold">
            de 40 segundos a 1 minuto
          </span>{" "}
          para ligar. Depois disso, tudo funciona normalmente.
        </p>

        <div
          className={`flex items-center justify-center gap-3 w-full rounded-lg border px-4 py-3 text-sm transition-colors duration-300 ${
            isOnline
              ? "border-color-green-1/40 bg-color-green-1/10 text-color-green-1"
              : "border-color-silver-1 bg-color-silver-1/30 text-color-silver-2"
          }`}
        >
          {isOnline ? (
            <>
              <LuCheck className="text-lg" /> Servidor pronto! Pode continuar.
            </>
          ) : (
            <>
              <span className="scale-75">
                <Loading />
              </span>
              Ligando o servidor... {elapsed}s
            </>
          )}
        </div>

        <button
          type="button"
          onClick={handleClose}
          className="w-full h-11 rounded-lg bg-linear-to-r from-btn-main-color to-second-color font-bold cursor-pointer hover:brightness-110 transition-all duration-200"
        >
          {isOnline ? "Continuar" : "Entendi, vou aguardar"}
        </button>
      </div>
    </Modal>
  );
};
