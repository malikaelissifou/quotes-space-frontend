import React from "react";
import { X, Home, User, Bell } from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 backdrop-blur-md bg-white/10 text-white z-50 transform transition-transform duration-300 ease-in-out 
      ${open ? "translate-x-0" : "translate-x-full"} rounded-l-2xl shadow-lg`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-white/20">
        <h2 className="text-xl font-semibold">Menu</h2>
        <button
          aria-label="Fermer le menu"
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-white/20 transition"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Liens */}
      <nav className="flex-1 flex flex-col gap-4 p-6" aria-label="Mobile navigation">
        <a
          href="#"
          onClick={onClose}
          className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-white/20 transition"
        >
          <Home className="w-5 h-5" />
          <span>Accueil</span>
        </a>

        <a
          href="#"
          onClick={onClose}
          className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-white/20 transition"
        >
          <User className="w-5 h-5" />
          <span>Profil</span>
        </a>

        <a
          href="#"
          onClick={onClose}
          className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-white/20 transition"
        >
          <Bell className="w-5 h-5" />
          <span>Notifications</span>
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
