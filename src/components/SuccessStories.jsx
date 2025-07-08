import React from 'react';

const SuccessStories = () => (
  <section className="px-4">
    <h2 className="mb-4 text-2xl font-semibold text-center">Casos de Éxito</h2>
    <div className="space-y-6">
      {/* Tarjetas simples con historia y foto */}
      <div className="p-4 bg-white rounded-lg shadow">
        <p className="italic text-gray-800">
          “Gracias a Pet Link, encontré a mi perro en menos de 24 horas.”
        </p>
        <p className="mt-2 font-semibold">— Juan P.</p>
      </div>
      <div className="p-4 bg-white rounded-lg shadow">
        <p className="italic text-gray-800">
          “El código QR hizo que alguien me contactara enseguida. ¡Excelente!”
        </p>
        <p className="mt-2 font-semibold">— María S.</p>
      </div>
      {/* Agregar más testimonios */}
    </div>
  </section>
);

export default SuccessStories;
