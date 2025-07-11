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

    Promise.all([fetchMascotas(), fetchCodigosQR()]).finally(() => setLoading(false));
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
      alert("Error al asignar código QR, intenta nuevamente.");
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
    <div className="min-h-screen p-6 pb-24 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-gray-200">
      <h1 className="mb-8 text-4xl font-extrabold text-center text-[#e94560] drop-shadow-lg">
        Asignar Código QR a Mascota
      </h1>

      {loading ? (
        <p className="text-center text-[#9f86c0] animate-pulse">Cargando datos...</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Selección de mascota */}
          <div className="flex flex-col">
            <label className="mb-3 text-lg font-semibold text-[#9f86c0]">
              Selecciona una mascota
            </label>
            <select
              value={mascotaSeleccionada || ""}
              onChange={(e) => setMascotaSeleccionada(e.target.value)}
              className="p-3 bg-[#0f3460] border border-[#4a4e69] rounded-lg shadow-md text-gray-200
                focus:outline-none focus:ring-2 focus:ring-[#e94560] transition"
            >
              <option value="" disabled>
                Seleccionar mascota
              </option>
              {mascotas.map((mascota) => (
                <option key={mascota.id} value={mascota.id}>
                  {mascota.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Selección de código QR */}
          <div className="flex flex-col">
            <label className="mb-3 text-lg font-semibold text-[#9f86c0]">
              Selecciona un código QR
            </label>
            {codigosDisponibles.length > 0 ? (
              <select
                value={codigoSeleccionado || ""}
                onChange={(e) => setCodigoSeleccionado(e.target.value)}
                className="p-3 bg-[#0f3460] border border-[#4a4e69] rounded-lg shadow-md text-gray-200
                  focus:outline-none focus:ring-2 focus:ring-[#e94560] transition"
              >
                <option value="" disabled>
                  Seleccionar código QR
                </option>
                {codigosDisponibles.map((codigo) => (
                  <option key={codigo.name} value={codigo.name}>
                    {codigo.name}
                  </option>
                ))}
              </select>
            ) : (
              <p className="font-semibold text-center text-[#fb7185]">
                No hay códigos QR disponibles.
              </p>
            )}
          </div>

          {/* Botón para asignar */}
          <button
            onClick={handleAsignarQR}
            disabled={!mascotaSeleccionada || !codigoSeleccionado}
            className="w-full py-3 mt-2 font-bold rounded-lg shadow-lg bg-[#e94560] hover:bg-[#d63447] disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Asignar Código QR
          </button>

          {/* Mostrar códigos asignados */}
          <section>
            <h2 className="mb-6 text-3xl font-bold text-center text-[#9f86c0] drop-shadow-md">
              Códigos QR asignados
            </h2>

            {mascotasConQR.length === 0 ? (
              <p className="text-center text-[#9f86c0]">No hay códigos asignados aún.</p>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {mascotasConQR.map((mascota) => (
                  <div
                    key={mascota.id}
                    className="flex flex-col items-center p-6 bg-[#16213e] border border-[#4a4e69] shadow-md rounded-xl"
                  >
                    <h3 className="mb-3 text-xl font-semibold text-[#e94560]">
                      {mascota.nombre}
                    </h3>
                    <img
                      src={`https://zcoekpdxfbnooopsrrec.supabase.co/storage/v1/object/public/productos/codigos-qr/${mascota.codigo_qr_url}`}
                      alt={`QR de ${mascota.nombre}`}
                      className="rounded-lg shadow-lg w-28 h-28"
                    />
                    <p className="max-w-full mt-3 text-sm text-center truncate text-[#9f86c0]">
                      {mascota.codigo_qr_url}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
