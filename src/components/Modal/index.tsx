import type { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  // Portal para o <body>: assim o modal não fica preso no contexto de empilhamento
  // de quem o renderiza (ex.: a Sidebar, que é sticky) e sempre fica por cima de tudo
  return createPortal(
    // overflow-y-auto: se o conteúdo for mais alto que a tela (ex.: card no celular),
    // o modal rola em vez de cortar o topo
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm">
      {/* Overlay escuro para fechar o modal ao clicar fora do formulário */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* min-h-full + items-center: centraliza quando cabe; p-4 mantém distância das bordas */}
      <div className="relative flex min-h-full items-center justify-center p-4 pointer-events-none">
        {/* Container transparente: o formato visual virá 100% do componente filho */}
        <div className="relative z-10 max-w-full pointer-events-auto">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};
