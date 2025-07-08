import React, { useState } from "react";
import QrScanner from "react-qr-scanner";

export default function Scan() {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  // Maneja el resultado del escaneo
  const handleScan = (data) => {
    if (data) {
      setScanResult(data);
      setIsScanning(false);  // Detener escaneo después de leer el QR
    }
  };

  // Maneja los errores del escáner
  const handleError = (error) => {
    console.error(error);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="mb-4 text-3xl font-bold text-gray-800">Escanear Código QR</h1>

      {/* Contenedor del escáner */}
      {!isScanning ? (
        <button
          onClick={() => setIsScanning(true)}
          className="px-6 py-3 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Iniciar escaneo
        </button>
      ) : (
        <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
          <QrScanner
            delay={300}
            onScan={handleScan}
            onError={handleError}
            className="w-full h-full"
          />
        </div>
      )}

      {/* Mostrar resultado del escaneo */}
      {scanResult && (
        <div className="p-4 mt-4 text-green-800 bg-green-100 rounded-lg">
          <h3 className="font-bold">Resultado del escaneo:</h3>
          <p>{scanResult.text}</p>
        </div>
      )}
    </div>
  );
}
