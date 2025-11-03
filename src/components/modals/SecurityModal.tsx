import React from "react";
import ModalLayout from "./ModalLayout";

interface SecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SecurityModal({ isOpen, onClose }: SecurityModalProps) {
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} title="Sécurité & confidentialité">
      <div className="space-y-6 text-sm text-gray-200">
        <p className="text-gray-300">
          Gérez vos paramètres de sécurité : mot de passe, sessions et 2FA.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => alert("Changer le mot de passe - à implémenter")}
            className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition font-medium"
          >
            Modifier le mot de passe
          </button>

          <button
            onClick={() => alert("Gérer les sessions - à implémenter")}
            className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition font-medium"
          >
            Voir les sessions actives
          </button>

          <button
            onClick={() => alert("Activer 2FA - à implémenter")}
            className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition font-medium"
          >
            Activer l'authentification à deux facteurs
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}
