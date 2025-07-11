import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function EsencialesCarousel() {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .eq("categoria", "esenciales")
        .limit(10);
      if (error) console.error("Error productos:", error.message);
      else setProductos(data);
    };
    fetchProductos();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-electric-blue drop-shadow-neon">
          Productos Esenciales
        </h2>
        <button
          onClick={() => navigate("/productos")}
          className="text-sm font-semibold text-violet-neon drop-shadow-neon-violet hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          type="button"
        >
          Ver más →
        </button>
      </div>
      <div className="flex pb-2 space-x-4 overflow-x-auto">
        {productos.map((p) => (
          <div
            key={p.id}
            className="min-w-[160px] bg-very-dark-bg rounded-lg p-3 shadow-neon hover:shadow-neon-violet transition-shadow cursor-pointer"
            onClick={() => navigate(`/producto/${p.id}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if(e.key === "Enter") navigate(`/producto/${p.id}`) }}
          >
            <img
              src={p.foto_url}
              alt={p.nombre}
              className="object-cover w-full mb-2 border rounded h-28 border-electric-blue"
            />
            <p className="text-sm font-semibold text-light-gray">{p.nombre}</p>
            <p className="text-xs font-semibold text-violet-neon">${p.precio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
