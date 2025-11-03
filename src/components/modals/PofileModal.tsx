//import React front "react";
import ModalLayout from "./ModalLayout";

interface PofileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PofileModal({ isOpen, onClose }: PofileModalProps) {
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} title="Profil utilisateur">
      <div className="space-y-6 text-sm text-gray-200">
        <div className="flex items-center gap-4">
          <img
            src="/assets/avatar.jpg"
            alt="Avatar"
            className="w-16 h-16 rounded-full border border-white/20 object-cover"
          />
          <div>
            <p className="font-semibold text-white">John Doe</p>
            <p className="text-xs text-gray-400">john.doe@example.com</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4 space-y-3">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-400">Nom complet</label>
            <input
              type="text"
              defaultValue="John Doe"
              className="w-full bg-white/10 rounded-lg p-2 text-white/90 focus:outline-none focus:ring-1 focus:ring-white/30"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-400">Bio</label>
            <textarea
              defaultValue="Aime les citations et le design."
              className="w-full bg-white/10 rounded-lg p-2 text-white/90 focus:outline-none focus:ring-1 focus:ring-white/30"
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={() => {
              // placeholder : remplacer par ta logique de sauvegarde
              onClose();
            }}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition font-medium"
          >
            Sauvegarder
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}
