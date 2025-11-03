import { JSX } from "react/jsx-runtime";
import React, { useState } from "react";
import {
  User,
  Shield,
  Monitor,
  Globe,
  Link2,
  LogOut,
  HelpCircle,
  Settings,
} from "lucide-react";

import ProfileModal from "../modals/PofileModal";
import SecurityModal from "../modals/SecurityModal";
import DisplayModal from "../modals/DisplayModal";
import LanguageModal from "../modals/LanguageModal";
import LinkedAccountsModal from "../modals/LinkedAccountsModal";
import SupportModal from "../modals/SupportModal";
import LogoutModal from "../modals/LogoutModal";

interface SettingItem {
  icon: JSX.Element;
  title: string;
  description: string;
  modal:
    | "profile"
    | "security"
    | "display"
    | "language"
    | "linked"
    | "support"
    | "logout";
}

const settings: SettingItem[] = [
  {
    icon: <User className="w-6 h-6 text-white/70" />,
    title: "Profil utilisateur",
    description: "Modifie ton nom, ta bio et ta photo de profil.",
    modal: "profile",
  },
  {
    icon: <Shield className="w-6 h-6 text-white/70" />,
    title: "Sécurité et confidentialité",
    description: "Gère ton mot de passe et la visibilité de ton compte.",
    modal: "security",
  },
  {
    icon: <Monitor className="w-6 h-6 text-white/70" />,
    title: "Préférences d'affichage",
    description: "Personnalise le thème et la mise en page de l'application.",
    modal: "display",
  },
  {
    icon: <Globe className="w-6 h-6 text-white/70" />,
    title: "Langue et région",
    description: "Choisis ta langue et tes paramètres régionaux.",
    modal: "language",
  },
  {
    icon: <Link2 className="w-6 h-6 text-white/70" />,
    title: "Comptes connectés",
    description: "Gère tes connexions avec d'autres services.",
    modal: "linked",
  },
  {
    icon: <HelpCircle className="w-6 h-6 text-white/70" />,
    title: "Support et assistance",
    description: "Obtiens de l’aide ou envoie une suggestion.",
    modal: "support",
  },
  {
    icon: <LogOut className="w-6 h-6 text-red-400/70" />,
    title: "Déconnexion",
    description: "Se déconnecter de ton compte.",
    modal: "logout",
  },
];

export default function SettingsPage() {
  const [activeModal, setActiveModal] = useState<
    | "profile"
    | "security"
    | "display"
    | "language"
    | "linked"
    | "support"
    | "logout"
    | null
  >(null);

  const openModal = (type: SettingItem["modal"]) => setActiveModal(type);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="flex flex-col items-center w-full h-full text-white px-6 py-10 overflow-y-auto mt-20">
      {/* En-tête */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-3 mb-3">
          <Settings size={28} className="text-white/90" />
          Paramètres
        </h1>
        <p className="text-sm text-white/70">
          Gère ton espace et personnalise ton expérience.
        </p>
      </div>

      {/* Liste des paramètres */}
      <div className="w-full max-w-3xl space-y-4">
        {settings.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-5 rounded-xl bg-white/10 hover:bg-white/15 transition-all cursor-pointer backdrop-blur-md"
            onClick={() => openModal(item.modal)}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10">
              {item.icon}
            </div>
            <div>
              <h2 className="text-base font-semibold">{item.title}</h2>
              <p className="text-sm text-white/60">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modales */}
      <ProfileModal isOpen={activeModal === "profile"} onClose={closeModal} />
      <SecurityModal isOpen={activeModal === "security"} onClose={closeModal} />
      <DisplayModal isOpen={activeModal === "display"} onClose={closeModal} />
      <LanguageModal isOpen={activeModal === "language"} onClose={closeModal} />
      <LinkedAccountsModal
        isOpen={activeModal === "linked"}
        onClose={closeModal}
      />
      <SupportModal isOpen={activeModal === "support"} onClose={closeModal} />
      <LogoutModal isOpen={activeModal === "logout"} onClose={closeModal} />
    </div>
  );
}
