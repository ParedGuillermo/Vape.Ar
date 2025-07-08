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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Productos Esenciales</h2>
        <button
          onClick={() => navigate("/productos")}
          className="text-sm text-blue-600 hover:underline"
        >
          Ver más →
        </button>
      </div>
      <div className="flex overflow-x-auto space-x-4 pb-2">
        {productos.map((p) => (
          <div
            key={p.id}
            className="min-w-[160px] bg-white shadow rounded-lg p-3"
          >
            <img
              src={p.foto_url}
              alt={p.nombre}
              className="w-full h-28 object-cover rounded mb-2"
            />
            <p className="font-semibold text-sm">{p.nombre}</p>
            <p className="text-xs text-gray-500">${p.precio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
