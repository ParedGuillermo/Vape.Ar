// ✅ Creamos la estructura base para Pet Society
// Ruta base: E:\Hora-de-Aventura\src\components\PetSocietyPages

// 1. Componente principal: PetSociety.jsx
// Archivo: src/pages/PetSociety.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

export default function PetSociety() {
  const navigate = useNavigate();

  const sections = [
    { name: "Salud y Bienestar", path: "/pet-society/salud" },
    { name: "Entrenamiento", path: "/pet-society/entrenamiento" },
    { name: "Historias Inspiradoras", path: "/pet-society/historias" },
    { name: "Eventos y Noticias", path: "/pet-society/eventos" },
    { name: "Recursos Locales", path: "/pet-society/recursos" },
  ];

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-purple-50 to-pink-100">
      <h1 className="mb-8 text-3xl font-bold text-center text-purple-800">Pet Society 🐾</h1>

      <p className="mb-6 text-center text-gray-700">
        Bienvenido a Pet Society, tu espacio de confianza para aprender, compartir y conectarte con la comunidad pet friendly.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {sections.map((section) => (
          <button
            key={section.name}
            onClick={() => navigate(section.path)}
            className="p-6 text-left transition bg-white rounded-lg shadow hover:bg-purple-100"
          >
            <h2 className="mb-2 text-xl font-semibold text-purple-700">{section.name}</h2>
            <p className="text-sm text-gray-600">Ver más detalles...</p>
          </button>
        ))}
      </div>
    </div>
  );
}
