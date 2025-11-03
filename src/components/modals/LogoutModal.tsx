import React from "react";
import ModalLayout from "./ModalLayout";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogoutModal({ isOpen, onClose }: LogoutModalProps) {
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} title="Déconnexion">
      <div className="space-y-6 text-sm text-gray-200">
        <p className="text-gray-300">Souhaitez-vous vous déconnecter de votre compte ?</p>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={() => onClose()}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition font-medium"
          >
            Annuler
          </button>
          <button
            onClick={() => {
              // placeholder : ici appeler ta logique de logout
              alert("Déconnecté (placeholder)");
              onClose();
            }}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg transition font-medium"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}
