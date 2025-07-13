// src/pages/Colaboraciones.jsx
import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../hooks/useAuth";

const categoriasValidas = [
  "Salud y Seguridad",
  "Novedades y Tendencias",
  "Eventos y Encuentros",
  "Legislación y Regulación",
  "Guías y Tutoriales",
  "Comunidad y Foros",
  "Reseñas de Productos",
  "Equipos",
  "Aporte", // <-- Nueva categoría para solicitudes de aporte
];

const tiposAutoresValidos = ["usuario", "vendedor"];

export default function Colaboraciones() {
  const { user } = useAuth();

  const [nuevaEntrada, setNuevaEntrada] = useState({
    titulo: "",
    categoria: categoriasValidas[0],
    contenido: "",
    imagen_url: "",
    tipo_autor: tiposAutoresValidos[0],
    contacto: "", // campo extra para aportes, opcional
  });

  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // Subir imagen a Supabase Storage
  const uploadImage = async (file) => {
    setLoading(true);
    const fileName = `colaboraciones/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("avatars").upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error) {
      setLoading(false);
      setMensaje("Error subiendo imagen: " + error.message);
      return null;
    }
    const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
    setLoading(false);
    return data.publicUrl;
  };

  const handleImagenChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = await uploadImage(file);
      if (url) setNuevaEntrada((prev) => ({ ...prev, imagen_url: url }));
    }
  };

  const handleSubmit = async () => {
    setMensaje("");
    if (!nuevaEntrada.titulo.trim() || !nuevaEntrada.contenido.trim()) {
      setMensaje("Título y contenido son obligatorios.");
      return;
    }
    if (!categoriasValidas.includes(nuevaEntrada.categoria)) {
      setMensaje("Categoría inválida.");
      return;
    }
    if (!tiposAutoresValidos.includes(nuevaEntrada.tipo_autor) && nuevaEntrada.categoria !== "Aporte") {
      setMensaje("Tipo de autor inválido.");
      return;
    }
    if (!user) {
      setMensaje("Debes iniciar sesión para enviar colaboraciones.");
      return;
    }

    // Objeto a guardar, agregando contacto sólo si es aporte
    const entradaAGuardar = {
      titulo: nuevaEntrada.titulo,
      categoria: nuevaEntrada.categoria,
      contenido: nuevaEntrada.contenido,
      imagen_url: nuevaEntrada.imagen_url || null,
      autor_id: user.id,
      tipo_autor: nuevaEntrada.categoria === "Aporte" ? null : nuevaEntrada.tipo_autor,
      autor: user.nombre || user.email || "Anónimo",
      estado: "pendiente",
      creado_en: new Date().toISOString(),
      contacto: nuevaEntrada.categoria === "Aporte" ? nuevaEntrada.contacto.trim() : null,
    };

    setLoading(true);
    const { error } = await supabase.from("entradas_blog").insert([entradaAGuardar]);
    setLoading(false);

    if (error) {
      setMensaje("Error al enviar la colaboración: " + error.message);
    } else {
      setMensaje(
        nuevaEntrada.categoria === "Aporte"
          ? "¡Gracias por tu solicitud de aporte! Nos pondremos en contacto pronto."
          : "¡Gracias por tu aporte! Quedará pendiente de revisión."
      );
      setNuevaEntrada({
        titulo: "",
        categoria: categoriasValidas[0],
        contenido: "",
        imagen_url: "",
        tipo_autor: tiposAutoresValidos[0],
        contacto: "",
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a2e] text-gray-300 p-6">
        <p className="mb-4 text-lg">Para colaborar, por favor inicia sesión.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-gray-300 p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-[#e94560] mb-8 text-center drop-shadow-md">
        Colaboraciones en Vape.AR
      </h1>

      {/* Texto explicativo general */}
      <section className="mb-10 bg-[#16213e] p-6 rounded-lg shadow-md shadow-[#e9456055]">
        <h2 className="text-3xl font-extrabold mb-4 text-[#bb9aff] text-center">
          ¿Cómo podés colaborar con Vape.AR?
        </h2>
        <p className="max-w-3xl mx-auto mb-4 text-lg leading-relaxed text-center text-gray-300">
          Somos una comunidad sin fines de lucro que crece gracias a vos. Podés sumar tu granito de arena de dos formas:
        </p>
        <ul className="max-w-xl mx-auto mb-6 space-y-2 text-lg text-gray-300 list-disc list-inside">
          <li>
            <strong>Colaboraciones para el blog:</strong> Compartí tus conocimientos, experiencias, noticias o reseñas. Tus aportes serán revisados y publicados para toda la comunidad.
          </li>
          <li>
            <strong>Aportes de productos o equipos para análisis:</strong> Si tenés productos para donar o prestar, los destacaremos con un lugar especial en la página principal para darles máxima visibilidad.
          </li>
        </ul>
        <p className="text-center italic text-sm text-[#d4bfff] max-w-md mx-auto">
          ¡Tu aporte hace la diferencia y ayuda a crecer esta gran comunidad!
        </p>
      </section>

      {/* Tarjeta visible y destacada para aporte de equipos */}
      <section
        className="mb-10 p-8 bg-gradient-to-r from-[#e94560] to-[#bb2978] rounded-xl shadow-xl text-white cursor-pointer hover:from-[#d63447] hover:to-[#9a205d] transition-colors duration-300"
        onClick={() => setNuevaEntrada((prev) => ({ ...prev, categoria: "Aporte" }))}
      >
        <h2 className="mb-3 text-3xl font-extrabold text-center">
          ¿Querés aportar un equipo o producto para análisis?
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-center">
          Enviá tu solicitud de aporte y tu producto será destacado en Vape.AR con un lugar privilegiado, ofreciéndote mayor presencia y reconocimiento dentro de la comunidad.
        </p>
        <p className="mt-4 font-semibold text-center underline">
          (Hacé click acá para enviar tu propuesta)
        </p>
      </section>

      {/* Formulario de envío */}
      <section className="mb-16 bg-[#16213e] p-6 rounded-lg shadow-md shadow-[#e9456055]">
        <h2 className="text-2xl font-bold mb-4 text-[#bb9aff]">
          {nuevaEntrada.categoria === "Aporte"
            ? "Enviar solicitud de aporte de producto"
            : "Enviar una colaboración"}
        </h2>

        <input
          type="text"
          placeholder="Título"
          className="w-full mb-4 p-3 rounded bg-[#0f3460] border border-[#7a68d8] text-white"
          value={nuevaEntrada.titulo}
          onChange={(e) => setNuevaEntrada({ ...nuevaEntrada, titulo: e.target.value })}
        />

        <select
          className="w-full mb-4 p-3 rounded bg-[#0f3460] border border-[#7a68d8] text-white"
          value={nuevaEntrada.categoria}
          onChange={(e) => setNuevaEntrada({ ...nuevaEntrada, categoria: e.target.value })}
        >
          {categoriasValidas.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Solo mostrar selector tipo autor si NO es "Aporte" */}
        {nuevaEntrada.categoria !== "Aporte" && (
          <select
            className="w-full mb-4 p-3 rounded bg-[#0f3460] border border-[#7a68d8] text-white"
            value={nuevaEntrada.tipo_autor}
            onChange={(e) => setNuevaEntrada({ ...nuevaEntrada, tipo_autor: e.target.value })}
          >
            {tiposAutoresValidos.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        )}

        {/* Campo contenido - para aporte es descripción / condiciones */}
        <textarea
          placeholder={
            nuevaEntrada.categoria === "Aporte"
              ? "Descripción y condiciones para el aporte"
              : "Contenido de la colaboración"
          }
          rows={6}
          className="w-full mb-4 p-3 rounded bg-[#0f3460] border border-[#7a68d8] text-white resize-none"
          value={nuevaEntrada.contenido}
          onChange={(e) => setNuevaEntrada({ ...nuevaEntrada, contenido: e.target.value })}
        />

        {/* Campo contacto solo para categoría aporte */}
        {nuevaEntrada.categoria === "Aporte" && (
          <input
            type="text"
            placeholder="Datos de contacto (email, teléfono, redes, etc)"
            className="w-full mb-4 p-3 rounded bg-[#0f3460] border border-[#7a68d8] text-white"
            value={nuevaEntrada.contacto}
            onChange={(e) => setNuevaEntrada({ ...nuevaEntrada, contacto: e.target.value })}
          />
        )}

        <input
          type="file"
          accept="image/*"
          className="mb-6 text-white"
          onChange={handleImagenChange}
          disabled={loading}
        />

        {mensaje && (
          <p className="mb-4 text-center text-sm text-[#e94560] font-semibold">{mensaje}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#e94560] hover:bg-[#d63447] text-white font-semibold py-3 rounded transition-colors disabled:opacity-60"
        >
          {loading
            ? "Enviando..."
            : nuevaEntrada.categoria === "Aporte"
            ? "Enviar Solicitud"
            : "Enviar Colaboración"}
        </button>
      </section>
    </div>
  );
}
