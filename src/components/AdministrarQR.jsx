import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function AdministrarQR() {
  const [mascotas, setMascotas] = useState([]);
  const [codigosQR, setCodigosQR] = useState([]);
  const [codigosUsados, setCodigosUsados] = useState([]);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);
  const [codigoSeleccionado, setCodigoSeleccionado] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMascotas = async () => {
      const { data, error } = await supabase.from("mascotas").select("*");
      if (error) {
        console.error("Error al traer mascotas:", error.message);
      } else {
        setMascotas(data);
        const usados = data
          .map((m) => m.codigo_qr_url)
          .filter((c) => c !== null && c !== "");
        setCodigosUsados(usados);
      }
    };

    const fetchCodigosQR = async () => {
      const { data, error } = await supabase
        .storage
        .from("productos")
        .list("codigos-qr", { limit: 100 });

      if (error) {
        console.error("Error al traer códigos QR:", error.message);
      } else {
        setCodigosQR(data);
      }
    };

    fetchMascotas();
    fetchCodigosQR();
    setLoading(false);
  }, []);

  const handleAsignarQR = async () => {
    if (!mascotaSeleccionada || !codigoSeleccionado) {
      alert("Debes seleccionar una mascota y un código QR");
      return;
    }

    const { error } = await supabase
      .from("mascotas")
      .update({ codigo_qr_url: codigoSeleccionado })
      .eq("id", mascotaSeleccionada);

    if (error) {
      console.error("Error al asignar código QR:", error.message);
    } else {
      alert("Código QR asignado correctamente");
      setCodigoSeleccionado(null);
      setMascotaSeleccionada(null);

      // Refrescar datos
      const { data: mascotasActualizadas } = await supabase
        .from("mascotas")
        .select("*");
      setMascotas(mascotasActualizadas);
      const usados = mascotasActualizadas
        .map((m) => m.codigo_qr_url)
        .filter((c) => c !== null && c !== "");
      setCodigosUsados(usados);
    }
  };

  const codigosDisponibles = codigosQR.filter(
    (codigo) => !codigosUsados.includes(codigo.name)
  );

  const mascotasConQR = mascotas.filter(
    (m) => m.codigo_qr_url && m.codigo_qr_url.trim() !== ""
  );

  return (
    <div className="min-h-screen p-4 pb-24 bg-purple-50">
      <h1 className="mb-4 text-3xl font-bold text-center text-purple-800">
        Asignar Código QR a Mascota
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Cargando datos...</p>
      ) : (
        <div className="space-y-6">
          {/* Selección de mascota */}
          <div className="flex flex-col mb-6">
            <label className="mb-2 text-lg font-semibold text-purple-700">
              Selecciona una mascota
            </label>
            <select
              value={mascotaSeleccionada || ""}
              onChange={(e) => setMascotaSeleccionada(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">Seleccionar mascota</option>
              {mascotas.map((mascota) => (
                <option key={mascota.id} value={mascota.id}>
                  {mascota.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Selección de código QR */}
          <div className="flex flex-col mb-6">
            <label className="mb-2 text-lg font-semibold text-purple-700">
              Selecciona un código QR
            </label>
            <select
              value={codigoSeleccionado || ""}
              onChange={(e) => setCodigoSeleccionado(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">Seleccionar código QR</option>
              {codigosDisponibles.map((codigo) => (
                <option key={codigo.name} value={codigo.name}>
                  {codigo.name}
                </option>
              ))}
            </select>
          </div>

          {/* Botón para asignar */}
          <button
            onClick={handleAsignarQR}
            className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            disabled={!mascotaSeleccionada || !codigoSeleccionado}
          >
            Asignar Código QR
          </button>

          {/* Mostrar todos los códigos ya asignados con sus mascotas */}
          <div className="mt-12">
            <h2 className="mb-4 text-2xl font-bold text-purple-800">
              Códigos QR asignados
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {mascotasConQR.map((mascota) => (
                <div
                  key={mascota.id}
                  className="p-4 bg-white rounded shadow"
                >
                  <h3 className="text-lg font-semibold text-purple-700">
                    {mascota.nombre}
                  </h3>
                  <img
                    src={`https://zcoekpdxfbnooopsrrec.supabase.co/storage/v1/object/public/productos/codigos-qr/${mascota.codigo_qr_url}`}
                    alt={`QR de ${mascota.nombre}`}
                    className="w-24 h-24 mt-2 rounded"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    {mascota.codigo_qr_url}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
