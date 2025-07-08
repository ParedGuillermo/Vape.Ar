import React from 'react';

const TrackingDevices = () => (
  <section className="px-4">
    <h2 className="mb-4 text-2xl font-semibold text-center">Dispositivos de Rastreo</h2>
    <div className="grid grid-cols-2 gap-4">
      {/* Tarjetas con dispositivos */}
      <div className="p-4 text-center bg-gray-100 rounded-lg">
        <h3 className="mb-2 font-semibold">Dispositivo A</h3>
        <p className="text-sm text-gray-700">GPS con cobertura nacional.</p>
      </div>
      <div className="p-4 text-center bg-gray-100 rounded-lg">
        <h3 className="mb-2 font-semibold">Dispositivo B</h3>
        <p className="text-sm text-gray-700">Alarma sonora para rápida localización.</p>
      </div>
      {/* Más dispositivos */}
    </div>
  </section>
);

export default TrackingDevices;
