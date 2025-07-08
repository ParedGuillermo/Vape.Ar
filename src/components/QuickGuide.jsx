import React from 'react';

const QuickGuide = () => (
  <section className="px-4">
    <h2 className="mb-4 text-2xl font-semibold text-center">Guía Rápida</h2>
    <div className="p-4 text-gray-700 bg-white rounded-lg shadow-sm">
      {/* Aquí van pasos o consejos rápidos */}
      <ol className="space-y-2 list-decimal list-inside">
        <li>Escaneá el código QR del collar.</li>
        <li>Registrá los datos de tu mascota.</li>
        <li>Reportá rápidamente si se pierde.</li>
        <li>Contactá a los dueños si encontrás una mascota.</li>
      </ol>
    </div>
  </section>
);

export default QuickGuide;
