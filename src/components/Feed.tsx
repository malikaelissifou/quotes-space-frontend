////import React front "react";
import QuoteCard from "./QuoteCard";
import { useFocus } from "./FocusContext";

const Feed: React.FC = () => {
  const { focusedCardId, setFocusedCardId } = useFocus();
  
  // Données d'exemple avec différents styles
  const quotes = [
    {
      id: "1",
      quote: "La vraie sagesse est de savoir que nous ne savons rien.",
      author: "Socrate",
      username: "PseudoComptePoster",
      likes: 142,
      shares: 23,
      reposts: 8,
      quoteStyle: 'elegant' as const
    },
    {
      id: "2",
      quote: "L'avenir appartient à ceux qui se lèvent tôt.",
      author: "Napoléon Bonaparte",
      username: "MotivationDaily",
      likes: 89,
      shares: 15,
      reposts: 12,
      quoteStyle: 'bold' as const
    },
    {
      id: "3",
      quote: "Dans le silence de la nuit, les étoiles murmurent des secrets à ceux qui savent écouter.",
      author: "Rumi",
      username: "PoesieEtAme",
      likes: 67,
      shares: 34,
      reposts: 5,
      quoteStyle: 'poetic' as const
    },
    {
      id: "4",
      quote: "Le succès n'est pas final, l'échec n'est pas fatal : c'est le courage de continuer qui compte.",
      author: "Winston Churchill",
      username: "LeadershipQuotes",
      likes: 203,
      shares: 45,
      reposts: 18,
      quoteStyle: 'modern' as const
    },
    {
      id: "5",
      quote: "Il vaut mieux allumer une petite chandelle que de maudire les ténèbres.",
      author: "Confucius",
      username: "SagesseAntique",
      likes: 156,
      shares: 28,
      reposts: 14,
      quoteStyle: 'classic' as const
    },
    {
      id: "6",
      quote: "Soyez le changement que vous voulez voir dans le monde.",
      author: "Gandhi",
      username: "InsprationQuotidienne",
      likes: 341,
      shares: 67,
      reposts: 29,
      quoteStyle: 'bold' as const
    },
    {
      id: "7",
      quote: "La patience est un arbre dont la racine est amère, mais dont les fruits sont très doux.",
      author: "Proverbe Persan",
      username: "SagesseOrientale",
      likes: 178,
      shares: 32,
      reposts: 11,
      quoteStyle: 'elegant' as const
    },
    {
      id: "8",
      quote: "Ne jugez pas chaque jour à la récolte que vous faites, mais aux graines que vous semez.",
      author: "Robert Louis Stevenson",
      username: "CitationsLitteraires",
      likes: 95,
      shares: 19,
      reposts: 7,
      quoteStyle: 'poetic' as const
    }
  ];

  const handleOverlayClick = () => {
    setFocusedCardId(null);
  };

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Grid responsive : 1 colonne sur mobile, 2 sur tablette, 3 sur desktop */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 auto-rows-fr transition-all duration-300 ${
            focusedCardId ? 'blur-sm opacity-40' : ''
          }`}
        >
          {quotes.map((quote, index) => (
            <div
              key={quote.id}
              className="flex"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <QuoteCard
                id={quote.id}
                quote={quote.quote}
                author={quote.author}
                username={quote.username}
                likes={quote.likes}
                shares={quote.shares}
                reposts={quote.reposts}
                quoteStyle={quote.quoteStyle}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Overlay pour l'effet de focus */}
      {focusedCardId && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 cursor-pointer"
          onClick={handleOverlayClick}
          aria-label="Cliquer pour fermer le zoom"
        />
      )}

      {/* Carte focalisée repositionnée */}
      {focusedCardId && (
        <div className="fixed inset-0 flex items-center justify-center z-60 pointer-events-none p-4">
          <div className="pointer-events-auto max-w-lg w-full">
            {quotes
              .filter(quote => quote.id === focusedCardId)
              .map(quote => (
                <QuoteCard
                  key={`focused-${quote.id}`}
                  id={quote.id}
                  quote={quote.quote}
                  author={quote.author}
                  username={quote.username}
                  likes={quote.likes}
                  shares={quote.shares}
                  reposts={quote.reposts}
                  quoteStyle={quote.quoteStyle}
                />
              ))
            }
          </div>
        </div>
      )}
    </>
  );
};

export default Feed;