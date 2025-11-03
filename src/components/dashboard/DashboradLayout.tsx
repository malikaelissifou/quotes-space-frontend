import React, { useState } from "react";
import Navbar from "../Navbar";
import DashboardSidebar from "../DashboardSidebar";
import DashboardHome from "./DashboardHome";
import DashboardSettings from "./DashboardSettings";
import DashboardSupport from "./DashboardSupport";
import DashboardLogout from "./DashboardLogout";
import DashboardNotifications from "./DashboardNotifications";


const DashboardLayout: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState("Statistiques");

  const renderContent = () => {
    switch (activeMenu) {
      case "Paramètres":
        return <DashboardSettings />;
      case "Statistiques":
        return <DashboardHome />;
        case "Notifications":
        return <DashboardNotifications />;
      case "Support":
        return <DashboardSupport />;
      case "Déconnexion":
        return <DashboardLogout />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen relative flex">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#6C5DD3] via-[#9B59D4] to-[#F0B6D8] opacity-90" />
      <div className="absolute inset-0 backdrop-blur-2xl" />

      {/* Navbar */}
      <Navbar />

      {/* Sidebar */}
      <DashboardSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      {/* Contenu principal */}
      <main className="relative z-10 flex-1 flex items-center justify-center ml-64 transition-all duration-300">
        <div className="max-w-4xl w-full p-10 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
