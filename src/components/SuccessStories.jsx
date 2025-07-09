import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SuccessStories({ summary = false, showHeader = true }) {
  const navigate = useNavigate();

  const testimonios = [
    {
      texto: "Gracias a Pet Link, encontré a mi perro en menos de 24 horas.",
      autor: "Juan P.",
    },
    {
      texto: "El código QR hizo que alguien me contactara enseguida. ¡Excelente!",
      autor: "María S.",
    },
    // Podés agregar más testimonios si querés
  ];

  const testimoniosResumidos = summary ? testimonios.slice(0, 1) : testimonios;

  return (
    <section className="max-w-3xl px-6 py-8 mx-auto bg-white rounded-lg shadow-md">
      {showHeader && (
        <h2 className="mb-6 text-3xl font-bold text-center text-purple-800">Casos de Éxito</h2>
      )}

      <div className="space-y-6">
        {testimoniosResumidos.map((testimonio, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm">
            <p className="italic text-gray-800">“{testimonio.texto}”</p>
            <p className="mt-2 font-semibold">— {testimonio.autor}</p>
          </div>
        ))}
      </div>

      {summary && (
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/casos-exito')}
            className="px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
            type="button"
          >
            Ver más testimonios
          </button>
        </div>
      )}
    </section>
  );
}
