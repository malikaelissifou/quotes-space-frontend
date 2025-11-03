////import React front "react";
import AuthForm from "./AuthForm";

export default function AuthPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2E0B3A] via-[#5A2E7E] to-[#E8D9F2] overflow-hidden">
      {/* Effet décoratif en arrière-plan */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#6C5DD3] via-[#9B59D4] to-[#F0B6D8]">
  <div className="absolute w-72 h-72 bg-rose-400/20 rounded-full blur-3xl top-10 left-10 animate-pulse" />
  <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse" />
</div>


      {/* Contenu centré */}
      <main className="relative z-10 w-full px-4">
        <div className="flex flex-col items-center gap-6">
          {/* Logo / Titre */}
          <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-lg">
            Quotes Spaces
          </h1>
          <p className="text-gray-200 text-center max-w-sm">
            Connectez-vous ou créez un compte pour partager vos citations
            préférées avec la communauté 
          </p>

          {/* Formulaire */}
          <AuthForm />
        </div>
      </main>
    </div>
  );
}
