import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      {/* Overlay escuro para fechar o modal ao clicar fora do formulário */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Container transparente: o formato visual virá 100% do componente filho */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
