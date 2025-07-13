import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../hooks/useAuth"; // Suponiendo que tenés este hook

export default function AdminBlog() {
  const { user } = useAuth(); // Debe tener: id, tipo_usuario, nombre/email
  const [newEntry, setNewEntry] = useState({
    titulo: "",
    categoria: "Entrenamiento",
    contenido: "",
    imagen_url: "",
  });

  const [entradas, setEntradas] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEntradas();
  }, []);

  const fetchEntradas = async () => {
    const { data, error } = await supabase
      .from("entradas_blog")
      .select("*")
      .eq("autor_id", user.id)
      .order("creado_en", { ascending: false });

    if (error) console.error("Error al cargar entradas:", error);
    else setEntradas(data);
  };

  const uploadImage = async (file) => {
    setLoading(true);
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("avatars").upload(fileName, file);
    if (error) {
      console.error("Error subiendo imagen:", error);
      setLoading(false);
      return null;
    }
    const { publicURL } = supabase.storage.from("avatars").getPublicUrl(fileName);
    setLoading(false);
    return publicURL;
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = await uploadImage(file);
      if (url) setNewEntry((prev) => ({ ...prev, imagen_url: url }));
    }
  };

  const handleSave = async () => {
    if (!newEntry.titulo.trim() || !newEntry.contenido.trim()) {
      alert("Título y contenido son obligatorios.");
      return;
    }

    const entryToSave = {
      ...newEntry,
      autor_id: user.id,
      tipo_autor: user.tipo_usuario, // 'vendedor' o 'usuario'
      autor: user.nombre || user.email || "Anónimo",
      estado: "pendiente",
    };

    if (editingId) {
      const { error } = await supabase
        .from("entradas_blog")
        .update(entryToSave)
        .eq("id", editingId);

      if (!error) {
        alert("Entrada actualizada.");
        setEditingId(null);
        setNewEntry({ titulo: "", categoria: "Entrenamiento", contenido: "", imagen_url: "" });
        fetchEntradas();
      } else alert("Error al actualizar.");
    } else {
      const { error } = await supabase.from("entradas_blog").insert([entryToSave]);
      if (!error) {
        alert("Entrada creada con estado 'pendiente'.");
        setNewEntry({ titulo: "", categoria: "Entrenamiento", contenido: "", imagen_url: "" });
        fetchEntradas();
      } else alert("Error al guardar.");
    }
  };

  const handleEdit = (entrada) => {
    setNewEntry({
      titulo: entrada.titulo,
      categoria: entrada.categoria,
      contenido: entrada.contenido,
      imagen_url: entrada.imagen_url,
    });
    setEditingId(entrada.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-gray-300">
      <h1 className="mb-6 text-center text-3xl font-extrabold text-[#e94560]">📝 Administrar Blog</h1>

      {/* NUEVA / EDICIÓN */}
      <section className="mb-8 rounded-lg bg-[#16213e] p-4 shadow-lg shadow-[#e9456055]">
        <h2 className="mb-4 text-xl font-semibold text-[#9f86c0]">
          {editingId ? "✏️ Editar Entrada" : "➕ Nueva Entrada"}
        </h2>

        <input
          type="text"
          placeholder="Título"
          value={newEntry.titulo}
          onChange={(e) => setNewEntry({ ...newEntry, titulo: e.target.value })}
          className="w-full mb-3 rounded border bg-[#0f3460] px-3 py-2 text-sm"
        />

        <select
          value={newEntry.categoria}
          onChange={(e) => setNewEntry({ ...newEntry, categoria: e.target.value })}
          className="w-full mb-3 rounded border bg-[#0f3460] px-3 py-2 text-sm"
        >
          <option>Entrenamiento</option>
          <option>Eventos</option>
          <option>Testimonios</option>
          <option>Recursos</option>
          <option>Salud</option>
          <option>Novedades</option>
        </select>

        <textarea
          placeholder="Contenido"
          value={newEntry.contenido}
          onChange={(e) => setNewEntry({ ...newEntry, contenido: e.target.value })}
          rows={5}
          className="w-full mb-3 rounded border bg-[#0f3460] px-3 py-2 text-sm"
        />

        <input type="file" onChange={handleImageChange} className="w-full mb-4" />

        <button
          onClick={handleSave}
          className="w-full rounded bg-[#e94560] py-3 text-white font-semibold hover:bg-[#d63447]"
        >
          {editingId ? "Actualizar Entrada" : "Publicar Entrada"}
        </button>
      </section>

      {/* LISTADO */}
      <section className="space-y-4">
        <h2 className="mb-2 text-xl font-semibold text-[#9f86c0]">📚 Tus Entradas</h2>

        {entradas.map((entrada) => (
          <div key={entrada.id} className="rounded-lg border bg-[#0f3460] p-4">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-bold text-[#f2f2f2]">{entrada.titulo}</h3>
              <button onClick={() => handleEdit(entrada)} className="text-sm text-[#e94560] hover:underline">
                Editar
              </button>
            </div>
            <p className="mb-2 text-xs text-gray-400">
              {entrada.categoria} • Estado:{" "}
              <span
                className={`font-semibold ${
                  entrada.estado === "pendiente"
                    ? "text-yellow-400"
                    : entrada.estado === "aprobada"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {entrada.estado}
              </span>{" "}
              • {new Date(entrada.creado_en).toLocaleString()}
            </p>
            <p className="text-sm line-clamp-2">{entrada.contenido}</p>
            {entrada.imagen_url && (
              <img src={entrada.imagen_url} alt="Blog" className="mt-3 rounded-lg max-h-48" />
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
