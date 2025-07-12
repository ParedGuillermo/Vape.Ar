// src/pages/LegislacionYRegulacion.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

export default function LegislacionYRegulacion() {
  const [entradas, setEntradas] = useState([]);
  const categoria = "Legislación y Regulación";

  useEffect(() => {
    fetchEntradas();
  }, []);

  const fetchEntradas = async () => {
    const { data, error } = await supabase
      .from("entradas_blog")
      .select("*")
      .eq("categoria", categoria)
      .order("creado_en", { ascending: false });
    if (!error) setEntradas(data);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-gray-300">
      <h1 className="mb-6 text-center text-3xl font-extrabold text-[#e94560] drop-shadow-md">
        Legislación y Regulación
      </h1>

      <div className="space-y-6">
        {entradas.length === 0 ? (
          <p className="text-center text-[#c9d1d9]">No hay entradas publicadas en esta categoría.</p>
        ) : (
          entradas.map((entrada) => (
            <div key={entrada.id} className="bg-[#16213e] p-4 rounded-lg shadow-lg shadow-[#e9456055]">
              <h3 className="text-lg font-bold text-[#e94560]">{entrada.titulo}</h3>
              <p className="text-sm text-[#9f86c0]">{entrada.categoria}</p>
              <p className="mt-2 text-sm text-[#c9d1d9]">
                {entrada.contenido?.length > 200
                  ? entrada.contenido.slice(0, 200) + "..."
                  : entrada.contenido}
              </p>
              {entrada.imagen_url && (
                <img
                  src={entrada.imagen_url}
                  alt="Ilustración"
                  className="object-cover w-full mt-3 rounded"
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
