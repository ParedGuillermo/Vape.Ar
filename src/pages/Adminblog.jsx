// src/pages/AdminBlog.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminBlog() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.email === "walterguillermopared@gmail.com";

  const [entradas, setEntradas] = useState([]);
  const [testimonios, setTestimonios] = useState([]);
  const [editing, setEditing] = useState(null);
  const [newEntry, setNewEntry] = useState({
    titulo: "",
    categoria: "Entrenamiento",
    contenido: "",
    imagen_url: "",
    autor: user?.email || "Admin"
  });

  useEffect(() => {
    if (!isAdmin) return navigate("/");
    fetchEntradas();
    fetchTestimonios();
  }, [user]);

  const fetchEntradas = async () => {
    const { data, error } = await supabase
      .from("entradas_blog")
      .select("*")
      .order("creado_en", { ascending: false });
    if (!error) setEntradas(data);
  };

  const fetchTestimonios = async () => {
    const { data, error } = await supabase
      .from("entradas_blog")
      .select("*")
      .eq("categoria", "Testimonios")
      .order("creado_en", { ascending: false });
    if (!error) setTestimonios(data);
  };

  const handleSave = async () => {
    if (!newEntry.titulo.trim() || !newEntry.contenido.trim()) {
      alert("El título y contenido son obligatorios.");
      return;
    }
    const { error } = await supabase.from("entradas_blog").insert([newEntry]);
    if (!error) {
      setNewEntry({
        titulo: "",
        categoria: "Entrenamiento",
        contenido: "",
        imagen_url: "",
        autor: user?.email || "Admin"
      });
      fetchEntradas();
      fetchTestimonios();
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar esta entrada?")) return;
    await supabase.from("entradas_blog").delete().eq("id", id);
    fetchEntradas();
    fetchTestimonios();
  };

  const handleUpdate = async () => {
    if (!editing.titulo.trim() || !editing.contenido.trim()) {
      alert("El título y contenido son obligatorios.");
      return;
    }
    const { id, ...rest } = editing;
    await supabase.from("entradas_blog").update(rest).eq("id", id);
    setEditing(null);
    fetchEntradas();
    fetchTestimonios();
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
        <input
          type="text"
          placeholder="URL de la imagen"
          value={newEntry.imagen_url}
          onChange={(e) => setNewEntry({ ...newEntry, imagen_url: e.target.value })}
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

      {/* Testimonios */}
      <section className="mb-8 space-y-4">
        <h2 className="mb-3 text-xl font-semibold text-[#9f86c0]">🗂 Testimonios</h2>
        {testimonios.length === 0 && (
          <p className="text-center text-[#c9d1d9]">No hay testimonios publicados.</p>
        )}
        {testimonios.map((testimonio) => (
          <div
            key={testimonio.id}
            className="rounded-lg bg-[#16213e] p-4 shadow-lg shadow-[#e9456055]"
          >
            {editing?.id === testimonio.id ? (
              <>
                <input
                  type="text"
                  value={editing.titulo}
                  onChange={(e) => setEditing({ ...editing, titulo: e.target.value })}
                  className="w-full mb-3 rounded border border-[#4a4e69] bg-[#0f3460] px-3 py-2 text-sm text-gray-100
                    focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                />
                <textarea
                  value={editing.contenido}
                  onChange={(e) => setEditing({ ...editing, contenido: e.target.value })}
                  rows={4}
                  className="w-full mb-3 resize-none rounded border border-[#4a4e69] bg-[#0f3460] px-3 py-2 text-sm text-gray-100
                    focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                />
                <input
                  type="text"
                  value={editing.imagen_url}
                  onChange={(e) => setEditing({ ...editing, imagen_url: e.target.value })}
                  className="w-full mb-3 rounded border border-[#4a4e69] bg-[#0f3460] px-3 py-2 text-sm text-gray-100
                    focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleUpdate}
                    className="flex-1 rounded bg-[#22d3ee] py-2 text-gray-900 font-semibold hover:bg-[#1ea7c7] transition"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    className="flex-1 rounded bg-[#4a4e69] py-2 text-gray-300 font-semibold hover:bg-[#6c6f85] transition"
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold text-[#e94560]">{testimonio.titulo}</h3>
                <p className="text-sm text-[#9f86c0]">{testimonio.categoria}</p>
                <p className="mt-2 text-sm text-[#c9d1d9]">{testimonio.contenido?.slice(0, 200)}...</p>
                {testimonio.imagen_url && (
                  <img
                    src={testimonio.imagen_url}
                    alt="Ilustración"
                    className="object-cover w-full mt-3 rounded"
                  />
                )}
                <div className="flex gap-4 mt-4 text-sm">
                  <button
                    onClick={() => setEditing(testimonio)}
                    className="text-[#22d3ee] font-semibold hover:text-[#67e8f9]"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(testimonio.id)}
                    className="text-[#fb7185] font-semibold hover:text-[#f43f5e]"
                  >
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </section>

      {/* Otras entradas */}
      <section className="space-y-4">
        <h2 className="mb-3 text-xl font-semibold text-[#9f86c0]">🗂 Otras Entradas</h2>
        {entradas.length === 0 && (
          <p className="text-center text-[#c9d1d9]">No hay entradas publicadas.</p>
        )}
        {entradas.map((entrada) => (
          <div
            key={entrada.id}
            className="rounded-lg bg-[#16213e] p-4 shadow-lg shadow-[#e9456055]"
          >
            {editing?.id === entrada.id ? (
              <>
                <input
                  type="text"
                  value={editing.titulo}
                  onChange={(e) => setEditing({ ...editing, titulo: e.target.value })}
                  className="w-full mb-3 rounded border border-[#4a4e69] bg-[#0f3460] px-3 py-2 text-sm text-gray-100
                    focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                />
                <textarea
                  value={editing.contenido}
                  onChange={(e) => setEditing({ ...editing, contenido: e.target.value })}
                  rows={4}
                  className="w-full mb-3 resize-none rounded border border-[#4a4e69] bg-[#0f3460] px-3 py-2 text-sm text-gray-100
                    focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                />
                <input
                  type="text"
                  value={editing.imagen_url}
                  onChange={(e) => setEditing({ ...editing, imagen_url: e.target.value })}
                  className="w-full mb-3 rounded border border-[#4a4e69] bg-[#0f3460] px-3 py-2 text-sm text-gray-100
                    focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleUpdate}
                    className="flex-1 rounded bg-[#22d3ee] py-2 text-gray-900 font-semibold hover:bg-[#1ea7c7] transition"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    className="flex-1 rounded bg-[#4a4e69] py-2 text-gray-300 font-semibold hover:bg-[#6c6f85] transition"
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold text-[#e94560]">{entrada.titulo}</h3>
                <p className="text-sm text-[#9f86c0]">{entrada.categoria}</p>
                <p className="mt-2 text-sm text-[#c9d1d9]">{entrada.contenido?.slice(0, 200)}...</p>
                {entrada.imagen_url && (
                  <img
                    src={entrada.imagen_url}
                    alt="Ilustración"
                    className="object-cover w-full mt-3 rounded"
                  />
                )}
                <div className="flex gap-4 mt-4 text-sm">
                  <button
                    onClick={() => setEditing(entrada)}
                    className="text-[#22d3ee] font-semibold hover:text-[#67e8f9]"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(entrada.id)}
                    className="text-[#fb7185] font-semibold hover:text-[#f43f5e]"
                  >
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
