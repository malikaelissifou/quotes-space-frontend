import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, X, ChevronDown } from "lucide-react";

const fonts = [
  { value: "font-sans", label: "Sans Serif" },
  { value: "font-serif", label: "Serif" },
  { value: "font-mono", label: "Monospace" },
  { value: "font-hand", label: "Manuscrite" },
  { value: "font-cursive", label: "Cursive" },
  { value: "font-display", label: "Display" },
  { value: "font-futuristic", label: "Futuriste" },
  { value: "font-elegant", label: "Élégante" },
];

const FloatingPostButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [font, setFont] = useState("font-sans");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setShowDropdown(false);
  };

  const handleFontChange = (value: string) => {
    setFont(value);
    setShowDropdown(false);
  };

  return (
    <>
      {/* Bouton flottant */}
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-lg 
                     bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg 
                     hover:bg-white/20 transition-all duration-200"
        >
          <Plus className="w-6 h-6" />
        </motion.button>
      )}

      {/* Overlay + Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center 
                        bg-white/20 backdrop-blur-md">
          {/* Contenu du modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="relative bg-white/30 backdrop-blur-xl border border-white/20 
                       rounded-2xl p-6 w-[90%] max-w-md shadow-xl text-gray-900"
          >
            {/* Bouton croix */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Titre */}
            <h2 className="text-xl font-semibold mb-4">Créer une citation</h2>

            {/* Menu déroulant personnalisé */}
            <label className="block mb-2 text-sm text-gray-700">Style de police</label>
            <div className="relative mb-4">
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full flex justify-between items-center p-3 rounded-lg 
                           bg-white/50 border border-white/30 text-gray-900 
                           focus:outline-none focus:ring-2 focus:ring-purple-400 
                           backdrop-blur-md shadow-md"
              >
                {fonts.find((f) => f.value === font)?.label || "Choisir une police"}
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>

              {showDropdown && (
                <div
                  className="absolute mt-2 w-full rounded-xl bg-white/30 backdrop-blur-md 
                             border border-white/30 shadow-xl z-50 overflow-hidden"
                >
                  {fonts.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => handleFontChange(f.value)}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 
                                 hover:bg-gray-200 hover:text-gray-900 ${
                                   font === f.value ? "bg-white/30 font-semibold" : "text-gray-700"
                                 }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Zone de texte principale */}
            <textarea
              placeholder="Écris ta citation..."
              className={`w-full h-28 p-3 mb-4 rounded-lg resize-none border border-white/30 
                         bg-white/40 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400 
                         backdrop-blur-md ${font}`}
            />

            {/* Champ Auteur */}
            <input
              type="text"
              placeholder="Auteur (optionnel)"
              className="w-full p-3 mb-4 rounded-lg border border-white/30 
                         bg-white/40 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400 
                         backdrop-blur-md"
            />

            {/* Champ Hashtags */}
            <input
              type="text"
              placeholder="Hashtags (optionnel, ex: #inspiration #vie)"
              className="w-full p-3 mb-4 rounded-lg border border-white/30 
                         bg-white/40 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400 
                         backdrop-blur-md"
            />

            {/* Boutons */}
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={handleClose}
                className="px-4 py-2 rounded-lg bg-white/40 border border-white/30 
                           text-gray-900 hover:bg-white/60 transition"
              >
                Annuler
              </button>
              <button
                onClick={handleClose}
                className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
              >
                Publier
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default FloatingPostButton;
