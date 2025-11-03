import React, { useState, useEffect } from "react";
import { Home, User, Menu } from "lucide-react";
import { createPortal } from "react-dom";
import Sidebar from "./Sidebar";
import { useLocation, useNavigate } from "react-router-dom";



const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const navigate = useNavigate(); // 👈 navigation
  const ICON_SIZE = 24; // Taille des icônes
  const notifCount = 3; // Exemple: à remplacer par un state ou API
  const location = useLocation();
  //const isDashboard = location.pathname.startsWith("/dashboard");

  const handleNav = (target: string) => {
    setActive(target);
    navigate(target === "home" ? "/" : "/dashboard"); // 👈 redirection
  };

  useEffect(() => {
    if (location.pathname === "/") setActive("home");
    else if (location.pathname.startsWith("/dashboard")) setActive("user");
  }, [location.pathname]);



  // lock body scroll quand sidebar ouverte
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
  }, [open]);

  return (
    <>
      {/* Navbar desktop */}
      <nav
        className={`fixed top-4 right-4 
    ${useLocation().pathname.startsWith("/dashboard") ? "w-[75%]" : "w-[95%]"} 
    max-w-7xl flex justify-between items-center px-8 py-4 
    backdrop-blur-md bg-white/10 text-white z-30 rounded-2xl 
    border-b border-white/20 shadow-lg transition-all duration-300
    ${open ? "hidden" : ""}`}
      >
        {/* Logo */}
        <div className="text-2xl font-bold tracking-tight">Quotes Spaces</div>

        {/* Liens desktop */}
        <div className="hidden md:flex items-center gap-4">
          <button
            aria-label="Accueil"
            onClick={() => handleNav("home")}
            className={`p-2 rounded-full transition focus:outline-none focus:ring-2 focus:ring-white/20
    ${active === "home"
                ? "border-2 border-white/60 bg-white/10"   // style actif
                : "bg-white/6 hover:bg-white/10"}`}
            title="Accueil"
          >
            <Home size={ICON_SIZE} />
          </button>

          <div className="relative">
            <button
              aria-label="Compte"
              onClick={() => handleNav("user")}
              className={`p-2 rounded-full transition focus:outline-none focus:ring-2 focus:ring-white/20
    ${active === "user"
                  ? "border-2 border-white/60 bg-white/10"
                  : "bg-white/6 hover:bg-white/10"}`}
              title="Compte"
            >
              <User size={ICON_SIZE} />
            </button>

            {/* Badge notification */}
            {notifCount > 0 && (
              <span
                className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-[11px] font-semibold rounded-full bg-rose-500 text-white"
                aria-hidden="true"
              >
                {notifCount > 9 ? "9+" : notifCount}
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* Hamburger mobile */}
      <button
        aria-label="Ouvrir le menu"
        onClick={() => setOpen(true)}
        className="fixed top-4 right-4 z-40 md:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition"
      >
        <Menu className="w-10 h-10 text-white" />
      </button>

      {/* Overlay quand sidebar ouverte */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar mobile via Portal */}
      {typeof document !== "undefined" &&
        createPortal(
          <Sidebar open={open} onClose={() => setOpen(false)} />,
          document.body
        )}

    </>
  );
};

export default Navbar;
