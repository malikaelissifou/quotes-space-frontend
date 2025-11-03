import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Share2, Repeat2, MoreHorizontal,
  Copy, Flag, Bookmark, Download, User, ZoomIn
} from "lucide-react";

interface QuoteCardProps {
  id: string;
  quote: string;
  author: string;
  username: string;
  avatar?: string;
  likes?: number;
  shares?: number;
  reposts?: number;
  quoteStyle?: 'elegant' | 'bold' | 'poetic' | 'modern' | 'classic';
}

const QuoteCard: React.FC<QuoteCardProps> = ({
  id,
  quote,
  author,
  username,
  avatar,
  likes = 0,
  shares = 0,
  reposts = 0,
  quoteStyle = 'elegant'
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likes);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const [isLongPressing, setIsLongPressing] = useState(false);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isZoomed, setIsZoomed] = useState(false);

  const getQuoteStyle = (style: string) => {
    switch (style) {
      case 'elegant': return 'font-serif text-lg leading-relaxed italic';
      case 'bold': return 'font-bold text-xl leading-tight tracking-wide';
      case 'poetic': return 'font-light text-lg leading-loose tracking-wider';
      case 'modern': return 'font-medium text-lg leading-normal';
      case 'classic': return 'font-serif text-lg leading-relaxed';
      default: return 'font-serif text-lg leading-relaxed italic';
    }
  };

  // Gestion du clic à l’extérieur, touche Échap et scroll
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showMenu &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        !(event.target as Element)?.closest('[data-menu-dropdown]')
      ) {
        setShowMenu(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && (showMenu || isZoomed)) {
        setShowMenu(false);
        setIsZoomed(false);
      }
    };

    const handleScroll = () => {
      if (showMenu) setShowMenu(false);
    };

    if (showMenu || isZoomed) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      window.addEventListener('scroll', handleScroll, true);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [showMenu, isZoomed]);

  // Gestion appui long mobile
  const startLongPress = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsLongPressing(true);
    longPressTimer.current = setTimeout(() => {
      handleZoom();
      setIsLongPressing(false);
    }, 3000);
  };
  const endLongPress = () => {
    setIsLongPressing(false);
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
  };
  useEffect(() => {
    return () => {
      if (longPressTimer.current) clearTimeout(longPressTimer.current);
    };
  }, []);

  // Actions
  const handleLike = () => {
    setIsLiked(!isLiked);
    setCurrentLikes(isLiked ? currentLikes - 1 : currentLikes + 1);
  };
  const handleCopy = () => { navigator.clipboard.writeText(`"${quote}" — ${author}`); setShowMenu(false); };
  const handleDownload = () => { console.log('Télécharger la citation'); setShowMenu(false); };
  const handleBookmark = () => { setIsBookmarked(!isBookmarked); setShowMenu(false); };
  const handleReport = () => { console.log('Signaler la citation'); setShowMenu(false); };
  const handleZoom = () => { setIsZoomed(true); setShowMenu(false); };

  const toggleMenu = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX
      });
    }
    setShowMenu(!showMenu);
  };

  // Menu dropdown détaché via portal
  const DropdownMenu = () => {
    if (!showMenu) return null;
    return createPortal(
      <AnimatePresence>
        <motion.div
          data-menu-dropdown
          initial={{ opacity: 0, scale: 0.95, y: -5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -5 }}
          transition={{ duration: 0.2 }}
          style={{ top: menuPosition.top, left: menuPosition.left, position: 'absolute' }}
          className="bg-white/70 backdrop-blur-md border border-white/30 rounded-xl shadow-xl w-48 z-[99999]"
        >
          <div className="py-2">
            <button onClick={handleZoom} className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-white/40 transition-colors duration-200">
              <ZoomIn className="w-4 h-4" /><span className="text-sm font-medium">Zoom</span>
            </button>
            <div className="border-t border-gray-300/50 my-1" />
            <button onClick={handleCopy} className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-white/40 transition-colors duration-200">
              <Copy className="w-4 h-4" /><span className="text-sm font-medium">Copier</span>
            </button>
            <button onClick={handleBookmark} className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-white/40 transition-colors duration-200">
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current text-yellow-600' : ''}`} />
              <span className="text-sm font-medium">{isBookmarked ? 'Supprimer' : 'Enregistrer'}</span>
            </button>
            <button onClick={handleDownload} className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-white/40 transition-colors duration-200">
              <Download className="w-4 h-4" /><span className="text-sm font-medium">Télécharger</span>
            </button>
            <div className="border-t border-gray-300/50 mt-1 pt-1">
              <button onClick={handleReport} className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50/50 transition-colors duration-200">
                <Flag className="w-4 h-4" /><span className="text-sm font-medium">Signaler</span>
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>,
      document.body
    );
  };

  // Overlay zoom (vraie carte via portal, pas de sombre)
  const ZoomOverlay = ({ children }: { children: React.ReactNode }) => {
    if (!isZoomed) return null;
    return createPortal(
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center backdrop-blur-md backdrop-saturate-150 z-[99998]"
          onClick={() => setIsZoomed(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-lg w-full px-4"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>,
      document.body
    );
  };

  const CardContent = (
    <motion.div
      id={`quote-card-${id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(139, 69, 19, 0.15)" }}
      className="relative z-0 w-full max-w-md mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300"
      onTouchStart={startLongPress}
      onTouchEnd={endLongPress}
      onTouchCancel={endLongPress}
    >
      {isLongPressing && (
        <motion.div
          className="absolute inset-0 rounded-3xl border-4 border-white/50 pointer-events-none"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: [1, 1.02, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, ease: "linear", repeat: 0 }}
        />
      )}

      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-400/5 via-transparent to-pink-400/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
          {avatar ? <img src={avatar} alt={username} className="w-full h-full rounded-full object-cover" /> : <User className="w-5 h-5 text-white/70" />}
        </div>
        <div>
          <p className="text-white/90 font-medium text-sm">@{username}</p>
        </div>
      </div>

      <div className="mb-6 text-center">
        <blockquote className={`text-white/90 mb-4 ${getQuoteStyle(quoteStyle)}`}>"{quote}"</blockquote>
        <cite className="text-white/70 text-sm font-medium">— {author}</cite>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center gap-6">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={handleLike} className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-200 ${isLiked ? 'bg-red-500/20 text-red-400' : 'hover:bg-white/10 text-white/70 hover:text-white/90'}`} aria-label={isLiked ? "Retirer le like" : "Ajouter un like"}>
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">{currentLikes}</span>
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white/90 transition-all duration-200" aria-label="Partager">
            <Share2 className="w-4 h-4" /><span className="text-sm font-medium">{shares}</span>
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white/90 transition-all duration-200" aria-label="Republier">
            <Repeat2 className="w-4 h-4" /><span className="text-sm font-medium">{reposts}</span>
          </motion.button>
        </div>

        <div className="relative">
          <motion.button ref={buttonRef} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={toggleMenu} className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white/90 transition-all duration-200" aria-label="Options" aria-expanded={showMenu}>
            <MoreHorizontal className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      <DropdownMenu />
    </motion.div>
  );

  return (
    <>
      {isZoomed ? <ZoomOverlay>{CardContent}</ZoomOverlay> : CardContent}
    </>
  );
};

export default QuoteCard;
