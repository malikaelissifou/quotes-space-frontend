////import React front "react";
import { Rocket } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section className="text-center px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
        "Les mots sont les passagers de l'âme."
      </h1>

      <p className="text-lg md:text-xl mb-8 opacity-90">— QuoteSpace</p>

      <div className="flex gap-4 justify-center">
        <button className="px-6 py-3 bg-white text-purple-700 rounded-full shadow-md font-semibold hover:opacity-90 transition">
          Découvrir les citations
        </button>

        <button className="px-6 py-3 bg-purple-600 text-white rounded-full shadow-md font-semibold hover:opacity-90 transition flex items-center gap-3">
          {/* icône plus grande */
            /* on agrandit l'icône ici */ }
          <Rocket className="w-7 h-7" />
          Partager la vôtre
        </button>
      </div>
    </section>
  );
};

export default Hero;
