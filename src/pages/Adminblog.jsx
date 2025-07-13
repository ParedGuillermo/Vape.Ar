// src/pages/AdminBlog.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../hooks/useAuth";

export default function AdminBlog() {
  const { user } = useAuth();

  const validCategorias = [
    "Salud y Seguridad",
    "Novedades y Tendencias",
    "Eventos y Encuentros",
    "Legislación y Regulación",
    "Guías y Tutoriales",
    "Reseñas de Productos",
    "Equipos",
  ];

  const validEstados = ["pendiente", "aprobada", "rechazada"];
  const validTipoAutores = ["usuario", "vendedor", "admin"];

  const [newEntry, setNewEntry] = useState({
    titulo: "",
    categoria: validCategorias[0], // Por defecto la primera categoría válida
    contenido: "",
    imagen_url: "",
    tipo_autor: "usuario",
  });

  const [entradas, setEntradas] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Filtros para listado general
  const [filterCategoria, setFilterCategoria] = useState("");
  const [filterEstado, setFilterEstado] = useState("Todas");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (user) fetchEntradas();
  }, [user]);

  const fetchEntradas = async () => {
    const { data, error } = await supabase
      .from("entradas_blog")
      .select("*")
      .order("creado_en", { ascending: false });

    if (error) {
      console.error("Error al cargar entradas:", error);
    } else {
      setEntradas(data);
    }
  };

  // Filtro aplicado sobre las entradas para la lista general
  const filteredEntradas = entradas.filter((entrada) => {
    if (filterCategoria && filterCategoria !== "Todas" && entrada.categoria !== filterCategoria)
      return false;
    if (filterEstado && filterEstado !== "Todas" && entrada.estado !== filterEstado)
      return false;
    if (searchTerm && !entrada.titulo.toLowerCase().includes(searchTerm.toLowerCase()))
      return false;
    return true;
  });

  const uploadImage = async (file) => {
    setLoading(true);
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("avatars").upload(fileName, file);
    if (error) {
      console.error("Error subiendo imagen:", error);
      setLoading(false);
      return null;
    }
    const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
    setLoading(false);
    return data.publicUrl;
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
    if (!validCategorias.includes(newEntry.categoria)) {
      alert("Categoría inválida.");
      return;
    }
    if (!validTipoAutores.includes(newEntry.tipo_autor)) {
      alert("Tipo de autor inválido.");
      return;
    }

    const entryToSave = {
      titulo: newEntry.titulo,
      categoria: newEntry.categoria,
      contenido: newEntry.contenido,
      imagen_url: newEntry.imagen_url || null,
      autor_id: user.id,
      tipo_autor: newEntry.tipo_autor,
      autor: user.nombre || user.email || "Anónimo",
      estado: "pendiente",
    };

    if (editingId) {
      const { error } = await supabase
        .from("entradas_blog")
        .update(entryToSave)
        .eq("id", editingId);

      if (error) {
        alert("Error al actualizar.");
        console.error(error);
      } else {
        alert("Entrada actualizada.");
        resetNewEntry();
        fetchEntradas();
        setEditingId(null);
      }
    } else {
      const { error } = await supabase.from("entradas_blog").insert([entryToSave]);

      if (error) {
        alert("Error al guardar.");
        console.error(error);
      } else {
        alert("Entrada creada con estado 'pendiente'.");
        resetNewEntry();
        fetchEntradas();
      }
    }
  };

  const resetNewEntry = () => {
    setNewEntry({
      titulo: "",
      categoria: validCategorias[0], // Reiniciar a la primera categoría
      contenido: "",
      imagen_url: "",
      tipo_autor: "usuario",
    });
  };

  const handleEdit = (entrada) => {
    setNewEntry({
      titulo: entrada.titulo,
      categoria: entrada.categoria,
      contenido: entrada.contenido,
      imagen_url: entrada.imagen_url,
      tipo_autor: entrada.tipo_autor || "usuario",
    });
    setEditingId(entrada.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateEstado = async (id, nuevoEstado) => {
    const { error } = await supabase
      .from("entradas_blog")
      .update({ estado: nuevoEstado })
      .eq("id", id);

    if (error) {
      alert("Error al actualizar estado");
      console.error(error);
    } else {
      fetchEntradas();
    }
  };

  const eliminarEntrada = async (id) => {
    if (window.confirm("¿Seguro que querés eliminar esta entrada?")) {
      const { error } = await supabase.from("entradas_blog").delete().eq("id", id);
      if (error) {
        alert("Error al eliminar");
        console.error(error);
      } else {
        fetchEntradas();
      }
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 bg-[#1a1a2e]">
        <p>Por favor inicia sesión para administrar el blog.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-gray-300">
      <h1 className="mb-6 text-center text-3xl font-extrabold text-[#e94560]">📝 Administrar Blog</h1>

      {/* NUEVA ENTRADA */}
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
          {validCategorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={newEntry.tipo_autor}
          onChange={(e) => setNewEntry({ ...newEntry, tipo_autor: e.target.value })}
          className="w-full mb-3 rounded border bg-[#0f3460] px-3 py-2 text-sm"
        >
          {validTipoAutores.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Contenido"
          rows={5}
          value={newEntry.contenido}
          onChange={(e) => setNewEntry({ ...newEntry, contenido: e.target.value })}
          className="w-full mb-3 rounded border bg-[#0f3460] px-3 py-2 text-sm"
        />

        <input type="file" onChange={handleImageChange} className="w-full mb-4" />

        <button
          onClick={handleSave}
          className="w-full rounded bg-[#e94560] py-3 text-white font-semibold hover:bg-[#d63447]"
          disabled={loading}
        >
          {editingId ? "Actualizar Entrada" : "Publicar Entrada"}
        </button>
      </section>

      {/* FILTROS */}
      <section className="mb-6 rounded-lg bg-[#16213e] p-4 shadow-lg shadow-[#e9456055] flex flex-col sm:flex-row gap-4 items-center justify-center">
        <select
          value={filterCategoria}
          onChange={(e) => setFilterCategoria(e.target.value)}
          className="rounded border bg-[#0f3460] px-3 py-2 text-sm w-full sm:w-auto"
        >
          <option value="">-- Seleccioná una categoría --</option>
          <option value="Todas">Todas</option>
          {validCategorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={filterEstado}
          onChange={(e) => setFilterEstado(e.target.value)}
          className="rounded border bg-[#0f3460] px-3 py-2 text-sm w-full sm:w-auto"
          disabled={!filterCategoria}
        >
          <option value="Todas">Todas</option>
          <option value="pendiente">Pendientes</option>
          <option value="aprobada">Aprobadas</option>
          <option value="rechazada">Rechazadas</option>
        </select>

        <input
          type="text"
          placeholder="Buscar por título..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded border bg-[#0f3460] px-3 py-2 text-sm w-full sm:w-72"
          disabled={!filterCategoria}
        />
      </section>

      {/* LISTADO GENERAL */}
      {filterCategoria && (
        <section className="space-y-4">
          <h2 className="mb-2 text-xl font-semibold text-[#9f86c0]">📚 Entradas</h2>
          {filteredEntradas.length === 0 ? (
            <p className="text-center text-gray-400">No hay entradas para mostrar.</p>
          ) : (
            filteredEntradas.map((entrada) => (
              <div key={entrada.id} className="rounded-lg border bg-[#0f3460] p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-bold text-[#f2f2f2]">{entrada.titulo}</h3>
                  <button
                    onClick={() => handleEdit(entrada)}
                    className="text-sm text-[#e94560] hover:underline"
                  >
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
                <p className="text-sm">{entrada.contenido}</p>
                {entrada.imagen_url && (
                  <img src={entrada.imagen_url} alt="Blog" className="mt-3 rounded-lg max-h-48" />
                )}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => updateEstado(entrada.id, "aprobada")}
                    className="px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700"
                  >
                    Aprobar
                  </button>
                  <button
                    onClick={() => updateEstado(entrada.id, "rechazada")}
                    className="px-3 py-1 text-sm text-white bg-yellow-600 rounded hover:bg-yellow-700"
                  >
                    Rechazar
                  </button>
                  <button
                    onClick={() => eliminarEntrada(entrada.id)}
                    className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      )}

      {/* ENTRADAS PENDIENTES */}
      <section className="mt-10 rounded-lg bg-[#16213e] p-4 shadow-lg shadow-[#e9456055]">
        <h2 className="mb-4 text-xl font-semibold text-[#9f86c0]">⏳ Entradas pendientes de aprobación</h2>
        {entradas.filter((e) => e.estado === "pendiente").length === 0 ? (
          <p className="text-center text-gray-400">No hay entradas pendientes.</p>
        ) : (
          entradas
            .filter((e) => e.estado === "pendiente")
            .map((entrada) => (
              <div key={entrada.id} className="mb-4 rounded-lg border bg-[#0f3460] p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-[#f2f2f2]">{entrada.titulo}</h3>
                    <p className="text-xs text-gray-400">
                      {entrada.categoria} • {new Date(entrada.creado_en).toLocaleString()}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-yellow-400">Pendiente</span>
                </div>
                <p className="text-sm">{entrada.contenido}</p>
                {entrada.imagen_url && (
                  <img src={entrada.imagen_url} alt="Blog" className="mt-3 rounded-lg max-h-48" />
                )}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => updateEstado(entrada.id, "aprobada")}
                    className="px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700"
                  >
                    Aprobar
                  </button>
                  <button
                    onClick={() => updateEstado(entrada.id, "rechazada")}
                    className="px-3 py-1 text-sm text-white bg-yellow-600 rounded hover:bg-yellow-700"
                  >
                    Rechazar
                  </button>
                  <button
                    onClick={() => eliminarEntrada(entrada.id)}
                    className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
        )}
      </section>
    </div>
  );
}
