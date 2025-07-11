import React from "react";
import { useNavigate } from "react-router-dom";

export default function VapeCommunity() {
  const navigate = useNavigate();

  const sections = [
    { name: "Salud y Bienestar", path: "/vape-community/salud" },
    { name: "Entrenamiento", path: "/vape-community/entrenamiento" },
    { name: "Historias Inspiradoras", path: "/vape-community/historias" },
    { name: "Eventos y Noticias", path: "/vape-community/eventos" },
    { name: "Recursos Locales", path: "/vape-community/recursos" },
  ];

  return (
    <div className="min-h-screen px-8 py-12 bg-[#0a0a12] text-[#9b7fff] font-poppins">
      <h1 className="mb-10 text-4xl font-extrabold text-center text-[#bb9aff] drop-shadow-[0_0_10px_rgba(155,127,255,0.7)]">
        Vape Community 🔥
      </h1>

      <p className="max-w-xl mx-auto mb-12 text-center text-[#c4bbff] text-lg leading-relaxed">
        Bienvenido a Vape Community, tu espacio de confianza para aprender, compartir y conectarte con la comunidad vapeadora.
      </p>

      <div className="grid max-w-5xl gap-8 mx-auto md:grid-cols-2 lg:grid-cols-3">
        {sections.map(({ name, path }) => (
          <button
            key={name}
            onClick={() => navigate(path)}
            className="flex flex-col justify-between p-6 bg-[#1e1b39] rounded-3xl border border-[#7a68d8] shadow-[0_0_15px_rgba(123,104,216,0.6)] transition-transform hover:scale-105 hover:bg-[#7a68d8] hover:text-[#1e1b39] hover:shadow-[0_0_20px_rgba(155,127,255,0.9)]"
            aria-label={`Ir a sección ${name}`}
          >
            <h2 className="mb-3 text-2xl font-semibold drop-shadow-[0_0_5px_rgba(155,127,255,0.9)]">
              {name}
            </h2>
            <p className="text-sm text-[#d0caff]">Ver más detalles...</p>
          </button>
        ))}
      </div>
    </div>
  );
}
