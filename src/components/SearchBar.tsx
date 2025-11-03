import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  onExpand: (expanded: boolean) => void;
  floatingMode?: boolean;
  onClose?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onExpand, floatingMode = false, onClose }) => {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-focus quand en mode flottant
  useEffect(() => {
    if (floatingMode) {
      setExpanded(true);
      onExpand(true);
    }
  }, [floatingMode, onExpand]);

  // Gestion du clic extérieur pour fermer la SearchBar flottante
  useEffect(() => {
    if (!floatingMode) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [floatingMode]);

  const handleFocus = () => {
    setExpanded(true);
    onExpand(true);
  };

  const handleBlur = () => {
    if (!floatingMode) {
      setExpanded(false);
      onExpand(false);
    }
  };

  const handleClose = () => {
    setExpanded(false);
    onExpand(false);
    if (onClose) {
      onClose();
    }
  };

  // Style conditionnel selon le mode
  const containerClass = floatingMode
    ? "fixed top-24 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl px-4"
    : "relative";

  return (
    <AnimatePresence>
      {(floatingMode || !floatingMode) && (
        <motion.div
          ref={containerRef}
          initial={floatingMode ? { opacity: 0, scale: 0.9, y: -20 } : false}
          animate={floatingMode ? { opacity: 1, scale: 1, y: 0 } : {}}
          exit={floatingMode ? { opacity: 0, scale: 0.9, y: -20 } : {}}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={containerClass}
        >
          <motion.div
            animate={{
              width: expanded
                ? isMobile
                  ? "90%"
                  : "80%"
                : isMobile
                ? "90%"
                : floatingMode ? "100%" : "25%",
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`relative ${!floatingMode ? 'mx-auto' : ''}`}
          >
            <input
              type="text"
              placeholder="Rechercher..."
              onFocus={handleFocus}
              onBlur={handleBlur}
              autoFocus={floatingMode}
              className={`w-full px-4 py-3 rounded-lg backdrop-blur-md border text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 ${
                floatingMode
                  ? 'bg-white/20 border-white/30 shadow-2xl'
                  : 'bg-white/10 border-white/20'
              }`}
            />
            {!expanded && !floatingMode && (
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
            )}
            {floatingMode && (
              <button
                onClick={handleClose}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
              >
                <X className="w-5 h-5 text-white/80" />
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;