import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/rootReducer";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { LuMenu } from "react-icons/lu";
import { PATHS } from "./Routes";
import { Sidebar } from "../components/Sidebar";
import { Loading } from "../components/Loading";

// Tela de espera enquanto o login é restaurado. Com o Render dormindo, a primeira
// resposta pode demorar, então depois de alguns segundos explica o motivo.
const SLOW_HINT_DELAY_MS = 3000;

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
  // Guarda em qual página o menu foi aberto: ao navegar para outra (inclusive
  // pelo voltar do navegador), ele fecha sozinho, sem precisar de useEffect
  const [menuOpenOn, setMenuOpenOn] = useState<string | null>(null);
  const isMenuOpen = menuOpenOn === location.pathname;
  const closeMenu = () => setMenuOpenOn(null);

  // Gaveta aberta: Esc fecha e a página de trás não rola
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpenOn(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Ainda verificando o cookie (/auth/me): espera, senão ao recarregar a página
  // o usuário seria mandado para o login mesmo estando logado
  if (!isSessionChecked) return <SessionLoading />;

  // Guarda a página que ele tentou abrir para voltar a ela depois do login
  if (!isAuthenticated)
    return <Navigate to={PATHS.LOGIN} replace state={{ from: location }} />;

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isMenuOpen} onClose={closeMenu} />

      {/* min-w-0 deixa o conteúdo encolher em vez de estourar a largura da tela */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Barra do topo com o menu ☰ (só celular/tablet) */}
        <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-6 bg-[#070b12]/95 backdrop-blur border-b border-color-silver-1/60 text-color-white">
          <span className="font-sans font-black tracking-tighter text-2xl">
            Flash Cards
          </span>
          <button
            type="button"
            onClick={() => setMenuOpenOn(location.pathname)}
            aria-label="Abrir menu"
            aria-controls="app-sidebar"
            aria-expanded={isMenuOpen}
            className="flex items-center justify-center w-11 h-11 rounded-lg text-2xl hover:bg-white/10 cursor-pointer"
          >
            <LuMenu />
          </button>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 md:p-10 xl:p-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
