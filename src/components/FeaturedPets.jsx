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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-electric-blue drop-shadow-neon">
          Mascotas en Adopción
        </h2>
        <button
          onClick={() => navigate("/adopciones")}
          className="text-sm font-semibold text-violet-neon drop-shadow-neon-violet hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          type="button"
        >
          Ver más →
        </button>
      </div>
      <div className="flex pb-2 space-x-4 overflow-x-auto">
        {mascotas.map((m) => (
          <div
            key={m.id}
            className="min-w-[160px] bg-very-dark-bg rounded-lg p-3 shadow-neon hover:shadow-neon-violet transition-shadow cursor-pointer"
            onClick={() => navigate(`/mascota/${m.id}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if(e.key === "Enter") navigate(`/mascota/${m.id}`) }}
          >
            <img
              src={m.foto_url}
              alt={m.nombre}
              className="object-cover w-full mb-2 border rounded h-28 border-electric-blue"
            />
            <p className="text-sm font-semibold text-light-gray">{m.nombre}</p>
            <p className="text-xs text-violet-neon">{m.raza || m.especie}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
