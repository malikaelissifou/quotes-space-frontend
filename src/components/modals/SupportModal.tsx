import React from "react";
import ModalLayout from "./ModalLayout";

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportModal({ isOpen, onClose }: SupportModalProps) {
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} title="Support & assistance">
      <div className="space-y-6 text-sm text-gray-200">
        <p className="text-gray-300">Contactez le support ou envoyez une suggestion.</p>

        <div className="space-y-3">
          <textarea
            placeholder="Décrivez votre demande..."
            className="w-full bg-white/10 text-white rounded-lg px-4 py-2 border border-white/20 focus:outline-none focus:ring-1 focus:ring-white/30"
            rows={5}
          />

          <div className="flex items-center gap-3">
            <input type="text" placeholder="Email (optionnel)" className="flex-1 bg-white/10 px-3 py-2 rounded-lg text-white/90 border border-white/10" />
            <button
              onClick={() => alert("Message envoyé (placeholder)")}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition font-medium"
            >
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
}
