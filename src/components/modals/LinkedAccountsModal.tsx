import React from "react";
import ModalLayout from "./ModalLayout";
import { Github, Globe } from "lucide-react";

interface LinkedAccountsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LinkedAccountsModal({
  isOpen,
  onClose,
}: LinkedAccountsModalProps) {
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} title="Comptes connectés">
      <div className="space-y-6 text-sm text-gray-200">
        <p className="text-gray-300">Gérez vos connexions externes (Google, GitHub, etc.).</p>

        <div className="space-y-3">
          <div className="flex items-center justify-between bg-white/5 p-3 rounded-lg">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-white/70" />
              <div>
                <div className="text-white font-medium">Google</div>
                <div className="text-xs text-gray-400">connecté@example.com</div>
              </div>
            </div>
            <button
              onClick={() => alert("Déconnecter Google (placeholder)")}
              className="px-3 py-1 text-sm bg-white/10 rounded-md"
            >
              Déconnecter
            </button>
          </div>

          <div className="flex items-center justify-between bg-white/5 p-3 rounded-lg">
            <div className="flex items-center gap-3">
              <Github className="w-5 h-5 text-white/70" />
              <div>
                <div className="text-white font-medium">GitHub</div>
                <div className="text-xs text-gray-400">—</div>
              </div>
            </div>
            <button
              onClick={() => alert("Connecter GitHub (placeholder)")}
              className="px-3 py-1 text-sm bg-white/10 rounded-md"
            >
              Connecter
            </button>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={() => onClose()}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition font-medium"
          >
            Fermer
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}
