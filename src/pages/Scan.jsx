import React, { useState } from "react";
import QrScanner from "react-qr-scanner";

export default function Scan() {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [facingMode, setFacingMode] = useState("environment"); // Trasera por defecto

  const handleScan = (data) => {
    if (data) {
      setScanResult(data);
      setIsScanning(false); // Detener después del escaneo
    }
  };

  const handleError = (error) => {
    console.error("Error al escanear:", error);
  };

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-purple-50">
      <h1 className="mb-4 text-3xl font-bold text-purple-800">Escanear Código QR</h1>

      {!isScanning ? (
        <button
          onClick={() => setIsScanning(true)}
          className="px-6 py-3 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Iniciar escaneo
        </button>
      ) : (
        <div className="w-full max-w-md p-4 space-y-4 bg-white rounded-lg shadow-lg">
          {/* Botón para cambiar de cámara */}
          <button
            onClick={toggleCamera}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded hover:bg-gray-700"
          >
            Cambiar cámara ({facingMode === "environment" ? "Trasera" : "Frontal"})
          </button>

          {/* Escáner */}
          <div className="w-full overflow-hidden bg-black rounded aspect-square">
            <QrScanner
              delay={300}
              onScan={handleScan}
              onError={handleError}
              className="w-full h-full"
              constraints={{ video: { facingMode } }} // ✅ CORREGIDO
            />
          </div>
        </div>
      )}

      {/* Resultado del escaneo */}
      {scanResult && (
        <div className="max-w-md p-4 mt-4 text-center text-green-800 bg-green-100 rounded-lg">
          <h3 className="mb-2 font-bold">Resultado del escaneo:</h3>
          <p className="break-all">{scanResult.text}</p>
        </div>
      )}
    </div>
  );
}
