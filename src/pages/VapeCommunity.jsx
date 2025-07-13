import React from "react";
import { useNavigate } from "react-router-dom";

export default function VapeCommunity() {
  const navigate = useNavigate();

  const sections = [
    { name: "Salud y Seguridad", icon: "❤", path: "/vape-community/salud-y-seguridad" },
    { name: "Novedades y Tendencias", icon: "⚡", path: "/vape-community/novedades-y-tendencias" },
    { name: "Eventos y Encuentros", icon: "🎉", path: "/vape-community/eventos-y-encuentros" },
    { name: "Legislación y Regulación", icon: "📜", path: "/vape-community/legislacion-y-regulacion" },
    { name: "Guías y Tutoriales", icon: "📘", path: "/vape-community/guias-y-tutoriales" },
    { name: "Comunidad y Foros", icon: "💬", path: "/vape-community/comunidad-y-foros" },
    { name: "Reseñas de Productos", icon: "🔍", path: "/vape-community/reseñas-de-productos" },
    { name: "Equipos", icon: "⚠", path: "/vape-community/tienda-y-productos" },
  ];

  return (
    <div className="relative min-h-screen px-4 py-12 bg-gradient-to-b from-[#0a0a12] to-[#161625] text-[#d0caff] font-poppins overflow-hidden pb-20">
      
      {/* 🔁 Fondo animado tipo vapor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full bg-[url('/vapor-bg.svg')] bg-cover opacity-10 animate-float" />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10">
        <h1 className="mb-10 text-4xl font-extrabold text-center text-[#bb9aff] drop-shadow-[0_0_20px_rgba(187,154,255,0.7)]">
          Vape Community 🔥
        </h1>

        <p className="max-w-xl mx-auto mb-12 text-center text-[#c4bbff] text-lg leading-relaxed">
          Tu espacio de confianza para aprender, compartir y conectarte con la comunidad vapeadora.
        </p>

        <div className="grid max-w-6xl gap-8 mx-auto md:grid-cols-2 lg:grid-cols-3">
          {sections.map(({ name, path, icon }) => (
            <button
              key={name}
              onClick={() => navigate(path)}
              className="flex flex-col justify-between p-6 bg-[#1e1b39] rounded-3xl border border-[#7a68d8] shadow-[0_0_15px_rgba(123,104,216,0.3)] transition-transform hover:scale-105 hover:shadow-[0_0_30px_rgba(187,154,255,0.6)] hover:bg-[#2b2468] hover:text-white"
              aria-label={`Ir a sección ${name}`}
            >
              <h2 className="mb-2 text-xl font-semibold tracking-wide text-[#e6e0ff] drop-shadow-[0_0_5px_rgba(155,127,255,0.9)] flex items-center gap-2">
                <span className="text-2xl">{icon}</span>
                {name}
              </h2>
              <p className="text-sm text-[#d0caff]/90">Explorá contenido de calidad →</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
