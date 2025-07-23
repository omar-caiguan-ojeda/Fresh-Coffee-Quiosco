import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80 transition-colors duration-300">
      <div className="bg-white border-4 border-amber-400 rounded-xl shadow-2xl w-full max-w-md p-8 relative animate-fade-in">
        <button
          className="absolute top-2 right-2 text-amber-400 hover:text-amber-600 text-2xl font-bold"
          onClick={onClose}
          aria-label="Cerrar"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
