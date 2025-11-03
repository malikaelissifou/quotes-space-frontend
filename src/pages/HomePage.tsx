// src/pages/HomePage.tsx
import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import FloatingSearchButton from "../components/FloatingSearchButton";
import FloatingPostButton from "../components/FloatingPostButton";
import Feed from "../components/Feed";
import { FocusProvider } from "../components/FocusContext";
// import SessionExpiredModal from "../components/auth/SessionExpiredModal";
function HomePage() {
  const [floatingSearchVisible, setFloatingSearchVisible] = useState(false);
  const [isMainSearchVisible, setIsMainSearchVisible] = useState(true);

  // Sentinel pour détecter si l'emplacement de la search principale est visible
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Si IntersectionObserver dispo, on l'utilise (plus fiable)
    if (sentinelRef.current && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          // entry.isIntersecting === true => sentinel (en haut) est visible => on montre la search principale
          setIsMainSearchVisible(entry.isIntersecting);
        },
        {
          root: null,
          threshold: 0,
          // rootMargin top: on décale le "seuil" déclencheur si besoin (ajuste si ton header a une hauteur spécifique)
          rootMargin: "-80px 0px 0px 0px",
        }
      );

      observer.observe(sentinelRef.current);
      // nettoyage
      return () => observer.disconnect();
    }

    // Fallback : ancien mécanisme basé sur scrollY
    const handleScroll = () => {
      setIsMainSearchVisible(window.scrollY <= 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Si on remonte et que la search principale redevient visible, on ferme la flottante si elle était ouverte
  useEffect(() => {
    if (isMainSearchVisible && floatingSearchVisible) {
      setFloatingSearchVisible(false);
    }
  }, [isMainSearchVisible, floatingSearchVisible]);

  const handleSearchToggle = () => {
    setFloatingSearchVisible(true);
  };

  const handleFloatingSearchClose = () => {
    setFloatingSearchVisible(false);
  };

  // Bouton flottant visible seulement quand la barre principale est cachée ET que la flottante n'est pas ouverte
  const shouldShowFloatingButton = !isMainSearchVisible && !floatingSearchVisible;

  return (
    <FocusProvider>
      <div className="w-full bg-gradient-to-br from-[#6C5DD3] via-[#9B59D4] to-[#F0B6D8] text-white min-h-screen pb-40">
        <Navbar />

        <div className="pt-20 w-full px-4 pb-24">
          {/* Sentinel (toujours dans le DOM) - on observe ce petit repère pour savoir si la search principale est passée hors de la vue */}
          <div ref={sentinelRef} className="w-full h-px" aria-hidden="true" />

          {/* SearchBar principale (affichée/masquée via state) */}
          {isMainSearchVisible && (
            <div className="mt-8">
              <SearchBar onExpand={() => {}} />
            </div>
          )}

          <div className="mt-8">
            <Feed />
          </div>
        </div>

        {/* Overlay pour la searchBar flottante */}
        {floatingSearchVisible && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={handleFloatingSearchClose}
          />
        )}

        {/* SearchBar flottante */}
        {floatingSearchVisible && (
          <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
            {/* wrapper pointer-events-auto pour permettre les interactions uniquement sur la search flottante */}
            <div className="pointer-events-auto">
              <SearchBar
                onExpand={() => {}}
                floatingMode={true}
                onClose={handleFloatingSearchClose}
              />
            </div>
          </div>
        )}

        {/* Boutons flottants */}
        <FloatingSearchButton 
          visible={shouldShowFloatingButton}
          onSearchToggle={handleSearchToggle}
          // ✅ bouton calé à gauche, aligné sur le haut de la SearchBar principale
          className="fixed left-5 top-28 z-50" 
        />

        <FloatingPostButton />
         {/* <div className="absolute bottom-10 left-10">
        <SessionExpiredModal />
      </div> */}
      
      </div>
    </FocusProvider>
  );
}

export default HomePage;
