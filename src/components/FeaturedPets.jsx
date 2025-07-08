import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function FeaturedPets() {
  const [mascotas, setMascotas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMascotas = async () => {
      const { data, error } = await supabase
        .from("mascotas")
        .select("*")
        .eq("estado", "en_adopcion")
        .limit(10);
      if (error) console.error("Error mascotas:", error.message);
      else setMascotas(data);
    };
    fetchMascotas();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Mascotas en Adopción</h2>
        <button
          onClick={() => navigate("/adopciones")}
          className="text-sm text-blue-600 hover:underline"
        >
          Ver más →
        </button>
      </div>
      <div className="flex overflow-x-auto space-x-4 pb-2">
        {mascotas.map((m) => (
          <div
            key={m.id}
            className="min-w-[160px] bg-white shadow rounded-lg p-3"
          >
            <img
              src={m.foto_url}
              alt={m.nombre}
              className="w-full h-28 object-cover rounded mb-2"
            />
            <p className="font-semibold text-sm">{m.nombre}</p>
            <p className="text-xs text-gray-500">{m.raza || m.especie}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
