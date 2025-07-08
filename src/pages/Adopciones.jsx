// src/pages/Adopciones.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Adopciones() {
  const [adopciones, setAdopciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdopciones = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("mascotas")
        .select("*")
        .eq("estado", "en_adopcion");

      if (error) {
        console.error("Error al obtener adopciones:", error.message);
      } else {
        setAdopciones(data);
      }
      setLoading(false);
    };

    fetchAdopciones();
  }, []);

  return (
    <div className="min-h-screen bg-purple-50 p-6 pb-24">
      <h1 className="text-3xl font-bold text-center text-purple-800 mb-6">
        Mascotas en Adopción 🐾
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Cargando mascotas...</p>
      ) : adopciones.length === 0 ? (
        <p className="text-center text-gray-600">No hay mascotas disponibles en este momento.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {adopciones.map((mascota) => (
            <div
              key={mascota.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
            >
              <img
                src={mascota.foto_url || "https://placehold.co/300x300?text=Mascota"}
                alt={mascota.nombre}
                className="w-40 h-40 object-cover rounded-full mb-4"
              />
              <h2 className="text-xl font-semibold text-purple-700 mb-1">
                {mascota.nombre}
              </h2>
              <p className="text-sm text-gray-700">{mascota.especie} - {mascota.raza || "Sin raza"}</p>
              <p className="text-sm text-gray-700">{mascota.edad} años</p>
              <p className="text-sm text-gray-600 mt-2 text-center">{mascota.descripcion}</p>
              <p className="text-sm text-gray-500 mt-1">📍 {mascota.provincia}</p>
              <p className="text-sm text-gray-500">📞 {mascota.telefono}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
