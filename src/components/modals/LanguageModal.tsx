import React from "react";
import ModalLayout from "./ModalLayout";

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LanguageModal({ isOpen, onClose }: LanguageModalProps) {
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} title="Langue & région">
      <div className="space-y-6 text-sm text-gray-200">
        <p className="text-gray-300">Choisissez la langue d'affichage et le fuseau horaire.</p>

        <select
          defaultValue="fr"
          className="w-full bg-white/10 text-white rounded-lg px-4 py-2 border border-white/20 focus:outline-none focus:ring-1 focus:ring-white/40"
        >
          <option value="fr">Français</option>
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="pt">Português</option>
        </select>

        <div className="flex justify-end pt-2">
          <button
            onClick={() => {
              alert("Langue mise à jour (placeholder)");
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
