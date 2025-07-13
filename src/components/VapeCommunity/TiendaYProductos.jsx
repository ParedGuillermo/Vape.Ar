// src/pages/TiendaYProductos.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

export default function TiendaYProductos() {
  const [entradas, setEntradas] = useState([]);
  const categoria = "Equipos";

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
      <h1 className="mb-10 text-center text-3xl font-extrabold text-[#e94560] drop-shadow-md">
        Equipos
      </h1>

      <div className="space-y-10">
        {entradas.length === 0 ? (
          <p className="text-center text-[#c9d1d9]">
            No hay equipos publicados por el momento.
          </p>
        ) : (
          entradas.map((entrada) => (
            <div
              key={entrada.id}
              className="flex flex-col md:flex-row items-center gap-6 bg-[#16213e] p-6 rounded-xl shadow-lg shadow-[#e9456055]"
            >
              {/* Columna izquierda: características */}
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-bold text-[#e94560] mb-2">
                  {entrada.titulo}
                </h3>
                <p className="text-sm text-[#9f86c0] mb-2">{entrada.categoria}</p>
                <p className="text-base text-[#c9d1d9] leading-relaxed">
                  {entrada.contenido}
                </p>
              </div>

              {/* Columna derecha: imagen */}
              {entrada.imagen_url && (
                <div className="w-full md:w-1/2">
                  <img
                    src={entrada.imagen_url}
                    alt="Imagen del equipo"
                    className="object-cover w-full h-auto rounded-xl max-h-80"
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
