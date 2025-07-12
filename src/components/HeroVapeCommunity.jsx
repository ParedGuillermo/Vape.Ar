import React from "react";
import { useNavigate } from "react-router-dom";

export default function HeroVapeCommunity() {
  const navigate = useNavigate();

  return (
    <div className="relative p-6 mb-12 rounded-lg shadow-lg bg-gradient-to-b from-[#0a0a0a] to-[#121212] text-light-gray sm:p-12 border-4 border-neon-pink shadow-[0_0_10px_5px rgba(157,78,221,0.7)]">
      {/* Fondo oscuro con opacidad */}
      <div className="absolute inset-0 bg-black rounded-lg opacity-50"></div>

      <div className="relative z-10 text-center">
        <h2 className="mb-4 text-4xl font-extrabold text-neon-pink sm:text-5xl drop-shadow-neon">
          ¡Únete a nuestra Comunidad de Vapeo!
        </h2>
        <p className="mb-6 text-lg sm:text-xl text-neon-cyan drop-shadow-neon">
          Conecta con otros amantes del vapeo, comparte experiencias y descubre lo último en productos y tendencias del mundo del vapeo.
        </p>

        <button
          onClick={() => navigate('/vape-community')}
          className="px-6 py-3 text-lg font-semibold text-center rounded-full bg-neon-pink text-very-dark-bg shadow-neon hover:bg-neon-pink/90 hover:shadow-[0_0_8px_3px_rgba(157,78,221,0.8)] focus:outline-none focus-visible:ring-2 sm:focus-visible:ring-4 focus-visible:ring-neon-pink active:scale-95 transition"
        >
          Unirse a la Comunidad
        </button>
      </div>
    </div>
  );
}
