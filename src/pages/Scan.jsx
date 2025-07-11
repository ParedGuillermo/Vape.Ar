import React, { useState, useEffect } from "react";
import QrScanner from "react-qr-scanner";
import { supabase } from "../supabaseClient";

export default function Scan() {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [facingMode, setFacingMode] = useState("environment");
  const [mascota, setMascota] = useState(null);
  const [dueño, setDueño] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // 3 segundos de carga
    return () => clearTimeout(timer);
  }, []);

  const handleScan = async (data) => {
    if (data && data.text) {
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }

      const qrFileName = `qr-${data.text}.png`;

      setScanResult(qrFileName);
      setIsScanning(false);

      const { data: mascotasData, error } = await supabase
        .from("mascotas")
        .select("*")
        .eq("codigo_qr_url", qrFileName)
        .limit(1);

      if (error) {
        console.error("Error buscando mascota:", error);
        setMascota(null);
        setDueño(null);
        return;
      }

      if (!mascotasData || mascotasData.length === 0) {
        console.log("No se encontró mascota asociada");
        setMascota(null);
        setDueño(null);
        return;
      }

      const mascotaData = mascotasData[0];
      setMascota(mascotaData);

      const { data: usuarioData, error: errorUsuario } = await supabase
        .from("usuarios")
        .select("nombre, apellido, telefono, correo, apodo, avatar_url, provincia")
        .eq("id", mascotaData.usuario_id)
        .maybeSingle();

      if (errorUsuario) {
        console.error("Error buscando dueño:", errorUsuario);
        setDueño(null);
        return;
      }

      setDueño(usuarioData);
    }
  };

  const handleError = (error) => {
    console.error("Error al escanear:", error);
  };

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-white bg-neutral-900">
      <h1 className="mb-4 text-2xl font-bold text-violet-400">Escanear Código QR</h1>

      {!isScanning ? (
        <button
          onClick={() => setIsScanning(true)}
          className="px-6 py-3 mb-4 font-semibold text-white transition rounded-lg bg-violet-700 hover:bg-violet-800"
        >
          Iniciar escaneo
        </button>
      ) : (
        <div className="w-full max-w-md p-4 mb-4 space-y-4 border rounded-lg shadow-lg bg-neutral-800 border-violet-600">
          <button
            onClick={toggleCamera}
            className="w-full px-4 py-2 text-sm font-medium text-white transition rounded bg-violet-600 hover:bg-violet-700"
          >
            Cambiar cámara ({facingMode === "environment" ? "Trasera" : "Frontal"})
          </button>

          <div className="relative w-full overflow-hidden bg-black border-4 rounded aspect-square border-violet-700">
            {/* Spinner animado de carga */}
            {loading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-70">
                <div className="w-24 h-24 border-4 border-t-4 rounded-full border-violet-400 animate-spin"></div>
              </div>
            )}

            <QrScanner
              delay={300}
              onScan={handleScan}
              onError={handleError}
              className="w-full h-full"
              constraints={{ video: { facingMode } }}
              onLoad={() => setLoading(false)}
            />
          </div>
        </div>
      )}

      {/* Datos de la mascota */}
      {mascota && (
        <div className="w-full max-w-md p-4 mt-4 space-y-2 text-left border rounded-lg shadow-lg bg-neutral-800 border-violet-600">
          <h2 className="text-xl font-bold text-violet-400">🐾 Mascota</h2>
          <p><strong>Nombre:</strong> {mascota.nombre}</p>
          <p><strong>Especie:</strong> {mascota.especie}</p>
          <p><strong>Raza:</strong> {mascota.raza}</p>
          <p><strong>Edad:</strong> {mascota.edad}</p>
          <p><strong>Descripción:</strong> {mascota.descripcion}</p>
          <p><strong>Provincia:</strong> {mascota.provincia}</p>
          <p><strong>Teléfono:</strong> {mascota.telefono}</p>
          <p><strong>Sexo:</strong> {mascota.sexo}</p>
          <p><strong>Características:</strong> {mascota.caracteristicas}</p>
          <p><strong>Cuidados especiales:</strong> {mascota.cuidados_especiales}</p>
          {mascota.foto_url && (
            <img
              src={mascota.foto_url}
              alt={`Foto de ${mascota.nombre}`}
              className="w-full mt-2 border rounded-lg border-violet-600"
            />
          )}
        </div>
      )}

      {/* Datos del dueño */}
      {dueño && (
        <div className="w-full max-w-md p-4 mt-4 space-y-2 text-left border rounded-lg shadow-lg bg-neutral-800 border-violet-600">
          <h2 className="text-xl font-bold text-violet-400">👤 Dueño</h2>
          <p><strong>Nombre:</strong> {dueño.nombre} {dueño.apellido}</p>
          {dueño.apodo && <p><strong>Apodo:</strong> {dueño.apodo}</p>}
          <p><strong>Teléfono:</strong> {dueño.telefono}</p>
          <p><strong>Correo:</strong> {dueño.correo}</p>
          {dueño.provincia && <p><strong>Provincia:</strong> {dueño.provincia}</p>}
          {dueño.avatar_url && (
            <img
              src={dueño.avatar_url}
              alt={`Avatar de ${dueño.nombre}`}
              className="w-24 h-24 mt-2 border-2 rounded-full border-violet-600"
            />
          )}
        </div>
      )}
    </div>
  );
}
