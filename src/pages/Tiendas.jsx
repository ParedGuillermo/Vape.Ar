import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Tiendas() {
  const navigate = useNavigate();
  const [tiendas, setTiendas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [provinciaFilter, setProvinciaFilter] = useState("");

  useEffect(() => {
    async function fetchTiendas() {
      setLoading(true);
      const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("rol", "vendedor");
      if (error) {
        console.error(error);
      } else {
        setTiendas(data);
      }
      setLoading(false);
    }
    fetchTiendas();
  }, []);

  const provincias = useMemo(() => {
    const provs = tiendas
      .map((t) => t.provincia)
      .filter((p) => p && p.trim() !== "");
    return Array.from(new Set(provs));
  }, [tiendas]);

  const tiendasFiltradas = useMemo(() => {
    if (!provinciaFilter) return tiendas;
    return tiendas.filter((t) => t.provincia === provinciaFilter);
  }, [tiendas, provinciaFilter]);

  if (loading) return <div className="p-4 text-center">Cargando tiendas...</div>;

  return (
    <div className="min-h-screen px-6 py-8 bg-very-dark-bg text-violet-neon font-poppins">
      <h1 className="mb-8 text-3xl font-extrabold text-center text-electric-blue drop-shadow-neon-blue">
        Tiendas Colaboradoras 🛍️
      </h1>

      {/* Filtro por provincia */}
      <div className="max-w-4xl mx-auto mb-8">
        <select
          value={provinciaFilter}
          onChange={(e) => setProvinciaFilter(e.target.value)}
          className="w-full max-w-xs px-4 py-2 text-black rounded"
        >
          <option value="">Todas las provincias</option>
          {provincias.map((prov) => (
            <option key={prov} value={prov}>
              {prov}
            </option>
          ))}
        </select>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {tiendasFiltradas.length === 0 && <p>No hay tiendas registradas aún.</p>}

        {tiendasFiltradas.map(({ id, nombre_local, nombre, provincia, ciudad, avatar_url }) => (
          <div
            key={id}
            className="flex items-center p-6 border rounded-lg cursor-pointer bg-dark-bg shadow-neon-violet border-violet-neon hover:bg-violet-neon hover:text-dark-bg hover:shadow-neon-purple"
            onClick={() => navigate(`/tiendas/${id}`)} // Correcto para la navegación
          >
            <img
              src={
                avatar_url ||
                "https://via.placeholder.com/128?text=Logo"
              }
              alt={nombre_local || nombre}
              className="object-contain w-32 h-32 mr-6 border-4 rounded-full shadow-lg border-violet-500"
            />
            <div className="flex flex-col flex-grow">
              <h2 className="mb-2 text-xl font-semibold">{nombre_local || nombre}</h2>
              <p className="mb-4 text-sm text-violet-300">
                {provincia || "Provincia no disponible"}
                {ciudad ? `, ${ciudad}` : ""}
              </p>
              <button
                className="self-start px-4 py-2 mt-auto transition rounded text-dark-bg bg-violet-neon hover:bg-violet-700"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/tiendas/${id}`); // Evita que se dispare el evento onClick padre
                }}
              >
                Visitar Tienda
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
