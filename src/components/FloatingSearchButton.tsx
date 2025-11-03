////import React front "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingSearchButtonProps {
  visible: boolean;
  onSearchToggle?: () => void;
  className?: string; // ✅ permet de recevoir une classe externe
}

const slideVariants = {
  hidden: { x: -64, opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exit: { x: -64, opacity: 0 },
};

const FloatingSearchButton: React.FC<FloatingSearchButtonProps> = ({
  visible,
  onSearchToggle,
  className = "",
}) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Ouvrir la recherche"
          onClick={onSearchToggle}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={slideVariants}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 28,
            duration: 0.25,
          }}
          className={`p-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/25 ${className}`}
        >
          <Search className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingSearchButton;
