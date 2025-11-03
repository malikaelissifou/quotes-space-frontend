import React, { useState } from "react";
import InputField from "./InputField";
import AuthSwitch from "./AuthSwitch";

export default function AuthForm() {
  const [mode, setMode] = useState<"login" | "register">("login");

  // États des champs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "login") {
      console.log("Tentative de connexion :", { email, password });
    } else {
      console.log("Tentative d'inscription :", { username, email, password });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-xl">
      {/* Switch login / register */}
      <AuthSwitch mode={mode} onSwitch={setMode} />

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {mode === "register" && (
          <InputField
            label="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Entrez votre pseudo"
          />
        )}

        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="exemple@email.com"
        />

        <InputField
          label="Mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Votre mot de passe"
        />

        {/* Bouton d’action */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-[#9B59D4] to-[#F0B6D8] text-white font-semibold shadow-lg shadow-[#9B59D4]/40 hover:from-[#F0B6D8] hover:to-[#9B59D4] hover:scale-105 transition-transform"
        >
          {mode === "login" ? "Se connecter" : "Créer un compte"}
        </button>
      </form>

      {/* Lien mot de passe oublié */}
      {mode === "login" && (
        <div className="mt-4 text-center">
          <button className="text-sm text-gray-300 hover:text-white transition">
            Mot de passe oublié ?
          </button>
        </div>
      )}
    </div>
  );
}
