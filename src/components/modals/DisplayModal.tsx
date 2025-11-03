import React from "react";
import ModalLayout from "./ModalLayout";

interface DisplayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DisplayModal({ isOpen, onClose }: DisplayModalProps) {
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} title="Préférences d'affichage">
      <div className="space-y-6 text-sm text-gray-200">
        <p className="text-gray-300">Personnalisez le thème et l'affichage de l'interface.</p>

        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input type="radio" name="theme" className="accent-white/80" />
            <span>Mode clair</span>
          </label>

          <label className="flex items-center gap-3">
            <input type="radio" name="theme" className="accent-white/80" defaultChecked />
            <span>Mode sombre</span>
          </label>

          <label className="flex items-center gap-3">
            <input type="checkbox" className="accent-white/80" defaultChecked />
            <span>Réduire les animations</span>
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={() => onClose()}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition font-medium"
          >
            Annuler
          </button>
          <button
            onClick={() => {
              alert("Préférences enregistrées (placeholder)");
              onClose();
            }}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition font-medium"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}
