import { useState } from "react";
import {
  Pencil,
  ChevronLeft,
  ChevronRight,
  Settings,
  BarChart3,
  LifeBuoy,
  LogOut,
  Bell,
} from "lucide-react";

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

const DashboardSidebar: React.FC<SidebarProps> = ({ activeMenu, setActiveMenu }) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: "Paramètres", icon: Settings },
    { name: "Statistiques", icon: BarChart3 },
    { name: "Notifications", icon: Bell },
    { name: "Support", icon: LifeBuoy },
    { name: "Déconnexion", icon: LogOut },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen transition-all duration-300 
      ${collapsed ? "w-20" : "w-64"} 
      backdrop-blur-lg bg-white/10 border-r border-white/20 
      shadow-lg flex flex-col rounded-r-2xl z-20`}
    >
      {/* Bouton toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-4 top-6 w-8 h-8 flex items-center justify-center 
        bg-white/20 rounded-full border border-white/30 text-white hover:bg-white/30 transition"
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      {/* Profil */}
      <div
        className={`flex items-center gap-3 px-4 transition-all duration-300 ${
          collapsed ? "mt-20 justify-center" : "mt-20"
        }`}
      >
        <img
          src="/assets/avatar.jpg"
          alt="Profil"
          className="w-12 h-12 rounded-full border border-white/30"
        />
        {!collapsed && (
          <div className="flex-1">
            <h3 className="text-white font-semibold text-lg">John Doe</h3>
            <button className="flex items-center gap-1 text-sm text-gray-300 hover:text-white transition">
              <Pencil size={16} />
              Modifier
            </button>
          </div>
        )}
      </div>

      <hr className="my-6 border-gray-500/30 mx-4" />

      {/* Menu */}
      <nav className="flex flex-col gap-2 px-2">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.name;

          return (
            <button
              key={idx}
              onClick={() => setActiveMenu(item.name)}
              className={`flex items-center gap-3 text-gray-300 transition px-3 py-2 rounded-lg 
                hover:text-white hover:bg-white/20 w-full text-left ${
                  isActive ? "bg-white/20 text-white" : ""
                }`}
            >
              <Icon size={18} />
              {!collapsed && <span>{item.name}</span>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
