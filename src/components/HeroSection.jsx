import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleReportClick = () => {
    navigate("/tiendas");
  };

  return (
    <section className="relative p-6 mb-12 rounded-lg shadow-lg bg-gradient-to-b from-[#0a0a0a] to-[#121212] text-light-gray sm:p-12 border-4 border-neon-pink shadow-[0_0_10px_5px rgba(157,78,221,0.7)]">
      {/* Fondo oscuro con opacidad */}
      <div className="absolute inset-0 bg-black rounded-lg opacity-50"></div>

      <div className="relative z-10 text-center">
        <h1 className="mb-6 text-4xl font-extrabold text-white font-poppins drop-shadow-neon">
          ¿Buscás los mejores productos de vapeo?
        </h1>
        <p className="max-w-lg mx-auto mb-10 text-lg font-medium text-neon-cyan drop-shadow-neon">
          Encontrá tiendas, accesorios y novedades en Vape.ar.
        </p>
        <button
          onClick={handleReportClick}
          className="px-8 py-4 mx-auto text-lg font-semibold text-white transition-transform duration-150 rounded-full bg-neon-pink shadow-neon hover:bg-neon-pink/90 active:scale-95 focus:outline-none focus:ring-4 focus:ring-neon-pink/50"
          aria-label="Ir a tiendas"
          type="button"
        >
          Ver tiendas
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
