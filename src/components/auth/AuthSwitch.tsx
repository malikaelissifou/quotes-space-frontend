////import React front "react";

interface AuthSwitchProps {
  mode: "login" | "register";
  onSwitch: (newMode: "login" | "register") => void;
}

export default function AuthSwitch({ mode, onSwitch }: AuthSwitchProps) {
  return (
    <div className="flex w-full justify-center mb-6">
      <div className="inline-flex bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/20">
        <button
          className={`px-6 py-2 rounded-full text-sm font-medium transition
            ${mode === "login" ? "bg-gradient-to-r from-[#9B59D4] to-[#F0B6D8] text-white shadow-md hover:bg-[#d256a3]" : "text-gray-300 hover:text-white"}`}
          onClick={() => onSwitch("login")}
        >
          Connexion
        </button>
        <button
          className={`px-6 py-2 rounded-full text-sm font-medium transition
            ${mode === "register" ? "bg-gradient-to-r from-[#9B59D4] to-[#F0B6D8] text-white shadow-md hover:bg-[#d256a3]" : "text-gray-300 hover:text-white"}`}
          onClick={() => onSwitch("register")}
        >
          Inscription
        </button>
      </div>
    </div>
  );
}
