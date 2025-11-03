import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SessionExpiredTester() {
  const navigate = useNavigate();
  const [showExpired, setShowExpired] = useState(false);

  const handleFakeSessionExpired = () => {
    setShowExpired(true);

    // Après 2 secondes → redirection vers /auth
    setTimeout(() => {
      navigate("/auth");
    }, 2000);
  };

  return (
    <div className="relative">
      {/* Bouton factice */}
      <button
        onClick={handleFakeSessionExpired}
        className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
      >
        Simuler Session Expired
      </button>

      {/* Notification style toast */}
      {showExpired && (
        <div className="absolute top-5 right-5 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg shadow">
          ⚠️ Votre session a expiré. Redirection...
        </div>
      )}
    </div>
  );
}
