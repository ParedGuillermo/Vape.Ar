import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleReportClick = () => {
    // Redirigir a la página de tiendas
    navigate("/tiendas");
  };

  return (
    <section className="bg-gradient-to-r from-[#121212] to-[#0a0a0a] text-neon-pink py-16 px-6 text-center shadow-neon min-h-[320px] flex flex-col justify-center rounded-lg">
      <h1 className="mb-6 text-3xl font-extrabold font-poppins drop-shadow-neon">
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
    </section>
  );
};

export default HeroSection;
