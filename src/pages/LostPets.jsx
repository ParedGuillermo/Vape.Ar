import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function LostPets() {
  const [mascotasPerdidas, setMascotasPerdidas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMascotas = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("mascotas")
        .select("*")
        .eq("estado", "reportada") // Confirmar que este valor es correcto según DB
        .order("id", { ascending: false });

      if (error) {
        setError("No se pudieron cargar las mascotas perdidas.");
        console.error(error);
      } else {
        setMascotasPerdidas(data);
      }

      setLoading(false);
    };

    fetchMascotas();
  }, []);

  return (
    <div className="min-h-screen px-4 py-6 bg-cream">
      <h1 className="mb-6 text-3xl font-bold text-center text-brown-800">
        Mascotas Perdidas
      </h1>

      {loading && <p className="text-lg text-center text-gray-600">Cargando...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mascotasPerdidas.map((mascota) => (
          <div
            key={mascota.id}
            className="flex flex-col items-center p-4 text-center bg-white shadow rounded-xl"
          >
            <img
              src={mascota.foto_url || "/placeholder.jpg"}
              alt={mascota.nombre}
              className="object-cover w-full h-48 mb-3 rounded-lg"
            />
            <h2 className="text-xl font-semibold">{mascota.nombre}</h2>
            <p className="text-sm text-gray-700 capitalize">
              {mascota.especie} - {mascota.raza || "Sin raza"}
            </p>
            <p className="text-sm text-gray-500">Provincia: {mascota.provincia}</p>
            {mascota.telefono && (
              <a
                href={`https://wa.me/54${mascota.telefono}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-sm text-blue-600 hover:underline"
              >
                Contactar al dueño
              </a>
            )}
          </div>
        ))}
      </div>

      {!loading && mascotasPerdidas.length === 0 && (
        <p className="mt-10 text-center text-gray-600">
          No se encontraron mascotas perdidas por el momento 🐾
        </p>
      )}
    </div>
  );
}
