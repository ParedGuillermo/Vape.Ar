// src/components/PetSocietyPages/Recursos.jsx
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { supabase } from "../../supabaseClient";

export default function Recursos() {
  const [entradas, setEntradas] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntradas = async () => {
      const { data, error } = await supabase
        .from("entradas_blog")
        .select("*")
        .eq("categoria", "Recursos")
        .order("creado_en", { ascending: true });

      if (error) {
        console.error("Error al cargar recursos:", error.message);
      } else {
        setEntradas(data);
      }
      setLoading(false);
    };

    fetchEntradas();
  }, []);

  if (loading) return <p className="p-6 text-center">Cargando recursos...</p>;
  if (entradas.length === 0) return <p className="p-6 text-center">No hay recursos disponibles aún.</p>;

  const entradaActual = entradas[currentStep];

  return (
    <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="mb-6 text-3xl font-bold text-center text-teal-600">
        Recursos Educativos para Dueños de Mascotas
      </h1>

      <h2 className="text-2xl font-semibold text-gray-800">{entradaActual.titulo}</h2>

      {entradaActual.imagen_url && (
        <img
          src={entradaActual.imagen_url}
          alt={entradaActual.titulo}
          className="my-4 rounded-lg max-h-[300px] object-cover w-full"
        />
      )}

      <div className="prose text-gray-700 prose-teal max-w-none">
        <ReactMarkdown>{entradaActual.contenido}</ReactMarkdown>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
          className="px-4 py-2 text-white bg-gray-400 rounded-lg disabled:opacity-50"
          disabled={currentStep === 0}
        >
          Anterior
        </button>
        <button
          onClick={() =>
            setCurrentStep((prev) => Math.min(prev + 1, entradas.length - 1))
          }
          className="px-4 py-2 text-white bg-teal-600 rounded-lg disabled:opacity-50"
          disabled={currentStep === entradas.length - 1}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
