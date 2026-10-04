import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/rootReducer";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { LuMenu } from "react-icons/lu";
import { PATHS } from "./Routes";
import { Sidebar } from "../components/Sidebar";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
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

  if (!isAuthenticated) return <Navigate to={PATHS.LOGIN} replace />;

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
