import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Clock } from "lucide-react";

export default function SessionExpiredModal() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(true);
    setTimeout(() => {
      navigate("/auth");
    }, 2500); // redirection après 2,5s
  };

  return (
    <div>
      {/* Bouton factice pour tester */}
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
      >
        Simuler Session Expired
      </button>

      {/* Overlay + Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay flouté */}
          <div className="absolute inset-0 backdrop-blur-md" />

          {/* Carte glassmorphism */}
          <div className="relative z-10 w-[90%] max-w-md p-6 rounded-2xl 
                          bg-white/20 backdrop-blur-xl shadow-lg border border-white/30 
                          flex flex-col items-center text-center text-gray-900">
            {/* Icône */}
            <AlertTriangle className="w-14 h-14 text-yellow-500 mb-4" />

            {/* Message */}
            <h2 className="text-xl font-bold mb-2">Session expirée</h2>
            <p className="text-gray-800/90 mb-4">
              Votre session a expiré. Vous allez être redirigé vers la page d’identification.
            </p>

            {/* Icône animée (optionnel) */}
            <Clock className="w-8 h-8 text-purple-500 animate-spin-slow" />
          </div>
        </div>
      )}
    </div>
  );
}
