import React, { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalLayoutProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function ModalLayout({
  isOpen,
  onClose,
  title,
  children,
}: ModalLayoutProps) {
  // Fermer avec la touche ÉCHAP
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[999] backdrop-blur-md bg-black/50 transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative bg-white/10 border border-white/20 rounded-2xl p-6 w-full max-w-lg shadow-xl backdrop-blur-lg text-white"
        onClick={(e) => e.stopPropagation()} // Empêche la fermeture au clic intérieur
      >
        {/* Titre et bouton de fermeture */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 h-5 text-white/70" />
          </button>
        </div>

        {/* Contenu dynamique */}
        <div className="max-h-[60vh] overflow-y-auto pr-2">{children}</div>
      </div>
    </div>
  );
}
