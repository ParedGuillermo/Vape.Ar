import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

export default function NovedadesYTendencias() {
  const [entradas, setEntradas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntradas = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("entradas_blog")
        .select("*")
        .eq("categoria", "tendencias") // Asegurate que coincida con tu tabla
        .order("fecha", { ascending: false });

      if (error) {
        console.error("Error al cargar novedades:", error);
      } else {
        setEntradas(data || []);
      }

      setLoading(false);
    };

    fetchEntradas();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-gray-300">
      <h1 className="mb-6 text-center text-3xl font-extrabold text-[#e94560] drop-shadow-md">
        Novedades y Tendencias en el Vapeo
      </h1>

      {loading ? (
        <p className="text-center text-gray-400">Cargando novedades...</p>
      ) : entradas.length === 0 ? (
        <p className="text-center text-gray-400">No hay artículos por el momento.</p>
      ) : (
        <div className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
          {entradas.map((entrada) => (
            <div
              key={entrada.id}
              className="p-4 bg-[#16213e] border border-[#4a4e69] rounded-lg shadow-md"
            >
              <h3 className="mb-2 text-xl font-bold text-[#e94560]">{entrada.titulo}</h3>
              <p className="text-sm text-gray-400">{entrada.descripcion?.slice(0, 150)}...</p>
              <div className="mt-4 text-sm text-gray-500">
                <span>{new Date(entrada.fecha).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
