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
        .eq("estado", "reportada")
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
    <div className="min-h-screen px-4 py-6 bg-neutral-900">
      <h1 className="mb-6 text-3xl font-bold text-center text-violet-400 drop-shadow-lg">
        Mascotas Perdidas
      </h1>

      {loading && <p className="text-lg text-center text-violet-300">Cargando...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mascotasPerdidas.map((mascota) => (
          <div
            key={mascota.id}
            className="flex flex-col items-center p-4 text-center transition border shadow-lg bg-neutral-800 rounded-xl border-violet-600 hover:shadow-violet-500/50"
          >
            <img
              src={mascota.foto_url || "/placeholder-dark.png"}
              alt={mascota.nombre}
              className="object-cover w-full h-48 mb-3 border rounded-lg border-violet-500"
            />
            <h2 className="text-xl font-semibold text-violet-300">{mascota.nombre}</h2>
            <p className="text-sm capitalize text-violet-400">
              {mascota.especie} - {mascota.raza || "Sin raza"}
            </p>
            <p className="text-sm text-violet-500">Provincia: {mascota.provincia}</p>

            {mascota.telefono && (
              <a
                href={`https://wa.me/54${mascota.telefono}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-3 text-sm text-green-400 transition hover:text-green-600 hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.52 3.48A11.58 11.58 0 0012.01.5 11.59 11.59 0 001.5 12a11.51 11.51 0 001.57 5.76L.5 23.5l5.39-1.41a11.49 11.49 0 005.98 1.75h.01a11.58 11.58 0 008.13-19.36zm-8.5 17.17h-.01a9.3 9.3 0 01-4.73-1.32l-.34-.2-3.17.83.85-3.09-.22-.34a9.28 9.28 0 011.46-11.78 9.37 9.37 0 0114.44 12.21 9.33 9.33 0 01-6.28 3.65zm5.35-6.62c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15s-.73.94-.9 1.14-.33.22-.61.07a8.04 8.04 0 01-2.36-1.46 9.3 9.3 0 01-1.72-2.13c-.18-.3 0-.46.13-.61.13-.13.29-.33.44-.5a.84.84 0 00.2-.33.58.58 0 000-.55c-.07-.15-.63-1.53-.86-2.1-.23-.55-.47-.48-.64-.49a2.17 2.17 0 00-.58-.07c-.18 0-.46.07-.7.33a2.86 2.86 0 00-1.04 1.02 4.42 4.42 0 001.5 5.6 6.62 6.62 0 004.18 1.76 3.13 3.13 0 002.21-.99 2.77 2.77 0 00.84-1.3 2.07 2.07 0 00-.45-1.51z" />
                </svg>
                Contactar al dueño
              </a>
            )}
          </div>
        ))}
      </div>

      {!loading && mascotasPerdidas.length === 0 && (
        <p className="mt-10 text-center text-violet-300">
          No se encontraron mascotas perdidas por el momento 🐾
        </p>
      )}
    </div>
  );
}
