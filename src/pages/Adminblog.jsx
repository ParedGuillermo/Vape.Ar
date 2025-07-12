import React, { useState } from "react";
import { supabase } from "../supabaseClient"; // Asegúrate de tener configurado tu cliente Supabase

export default function AdminBlog() {
  const [newEntry, setNewEntry] = useState({
    titulo: "",
    categoria: "Entrenamiento",
    contenido: "",
    imagen_url: "",
    autor: "Admin",
  });
  const [loading, setLoading] = useState(false);

  // Función para cargar imagen al bucket 'avatars' de Supabase
  const uploadImage = async (file) => {
    setLoading(true);
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase
      .storage
      .from("avatars")
      .upload(fileName, file);

    if (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
      return null;
    }

    // Obtener la URL pública de la imagen
    const { publicURL, error: urlError } = supabase
      .storage
      .from("avatars")
      .getPublicUrl(fileName);

    if (urlError) {
      console.error("Error getting image URL:", urlError);
      setLoading(false);
      return null;
    }

    setLoading(false);
    return publicURL;
  };

  // Manejar la carga de la imagen
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = await uploadImage(file);
      if (url) {
        setNewEntry((prevState) => ({
          ...prevState,
          imagen_url: url,
        }));
      }
    }
  };

  // Guardar la entrada
  const handleSave = async () => {
    if (!newEntry.titulo.trim() || !newEntry.contenido.trim()) {
      alert("El título y contenido son obligatorios.");
      return;
    }

    const { error } = await supabase.from("entradas_blog").insert([newEntry]);
    if (!error) {
      alert("Entrada guardada exitosamente.");
      setNewEntry({
        titulo: "",
        categoria: "Entrenamiento",
        contenido: "",
        imagen_url: "",
        autor: "Admin",
      });
    } else {
      alert("Error al guardar la entrada.");
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-gray-300">
      <h1 className="mb-6 text-center text-3xl font-extrabold text-[#e94560] drop-shadow-md">
        📝 Administrar Blog VapeCommunity
      </h1>

      {/* Nuevo post */}
      <section className="mb-8 rounded-lg bg-[#16213e] p-4 shadow-lg shadow-[#e9456055]">
        <h2 className="mb-4 text-xl font-semibold text-[#9f86c0]">➕ Nueva Entrada</h2>
        
        <input
          type="text"
          placeholder="Título"
          value={newEntry.titulo}
          onChange={(e) => setNewEntry({ ...newEntry, titulo: e.target.value })}
          className="w-full mb-3 rounded border border-[#4a4e69] bg-[#0f3460] px-3 py-2 text-sm text-gray-100 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-[#e94560]"
        />
        
        <select
          value={newEntry.categoria}
          onChange={(e) => setNewEntry({ ...newEntry, categoria: e.target.value })}
          className="w-full mb-3 rounded border border-[#4a4e69] bg-[#0f3460] px-3 py-2 text-sm text-gray-100
            focus:outline-none focus:ring-2 focus:ring-[#e94560]"
        >
          <option>Entrenamiento</option>
          <option>Eventos</option>
          <option>Historias</option>
          <option>Recursos</option>
          <option>Salud</option>
          <option>Testimonios</option>
        </select>
        
        <textarea
          placeholder="Contenido"
          value={newEntry.contenido}
          onChange={(e) => setNewEntry({ ...newEntry, contenido: e.target.value })}
          rows={5}
          className="w-full mb-3 resize-none rounded border border-[#4a4e69] bg-[#0f3460] px-3 py-2 text-sm text-gray-100 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-[#e94560]"
        />
        
        {/* Input para seleccionar la imagen */}
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full mb-4 rounded border border-[#4a4e69] bg-[#0f3460] px-3 py-2 text-sm text-gray-100 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-[#e94560]"
        />

        <button
          onClick={handleSave}
          className="w-full rounded bg-[#e94560] py-3 text-white font-semibold hover:bg-[#d63447] transition"
        >
          Publicar
        </button>
      </section>
    </div>
  );
}
