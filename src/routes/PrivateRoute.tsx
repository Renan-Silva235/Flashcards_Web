import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/rootReducer";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PATHS } from "./Routes";
import { Sidebar } from "../components/Sidebar";
import { BottomNav } from "../components/BottomNav";
import { Loading } from "../components/Loading";

// Tela de espera enquanto o login é restaurado. Com o Render dormindo, a primeira
// resposta pode demorar, então depois de alguns segundos explica o motivo.
const SLOW_HINT_DELAY_MS = 3000;

// Telas "de foco" no celular: têm o próprio X para fechar, então ficam sem a barra de baixo
const PATHS_WITHOUT_BOTTOM_NAV = [PATHS.FLASHCARDS, PATHS.STUDY_SESSION];

const SessionLoading = () => {
  const [isSlow, setIsSlow] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsSlow(true), SLOW_HINT_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-4 text-center">
      <Loading />
      <p className="text-color-silver-2 text-sm">
        {isSlow
          ? "Conectando ao servidor… no primeiro acesso isso pode levar até 1 minuto."
          : "Carregando…"}
      </p>
    </div>
  );
};

export const ProtectedRoute = () => {
  const { isAuthenticated, isSessionChecked } = useSelector(
    (state: RootState) => state.auth,
  );
  const location = useLocation();
  const showBottomNav = !PATHS_WITHOUT_BOTTOM_NAV.includes(location.pathname);

  // Ainda verificando o cookie (/auth/me): espera, senão ao recarregar a página
  // o usuário seria mandado para o login mesmo estando logado
  if (!isSessionChecked) return <SessionLoading />;

  // Guarda a página que ele tentou abrir para voltar a ela depois do login
  if (!isAuthenticated)
    return <Navigate to={PATHS.LOGIN} replace state={{ from: location }} />;

  return (
    <div className="flex min-h-dvh">
      <Sidebar />

      {/* min-w-0 deixa o conteúdo encolher em vez de estourar a largura da tela */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* pb extra no celular: o conteúdo não fica escondido atrás da barra de baixo */}
        <main
          className={`flex-1 px-4 pt-[calc(env(safe-area-inset-top)+1.5rem)] sm:px-6 md:px-10 md:pt-10 lg:pb-10 xl:p-20 ${
            showBottomNav
              ? "pb-[calc(max(env(safe-area-inset-bottom),0.75rem)+6rem)]"
              : "pb-[calc(env(safe-area-inset-bottom)+1.5rem)]"
          }`}
        >
          <Outlet />
        </main>
      </div>

      {showBottomNav && <BottomNav />}
    </div>
  );
};
