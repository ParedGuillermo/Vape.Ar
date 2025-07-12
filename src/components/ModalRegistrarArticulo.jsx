import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function ModalRegistrarArticulo({ onClose, usuarioId, onArticuloAgregado }) {
  const [form, setForm] = useState({
    titulo: "",
    contenido: "",
    precio: "",
    stock: 0,
    imagen: null,
    categoria: "",
    marca: "",
    disponible: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setForm((prev) => ({ ...prev, imagen: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imagen_url = null;

      if (form.imagen) {
        const fileName = `articulos/${Date.now()}_${form.imagen.name}`;
        const { error: uploadError } = await supabase.storage
          .from("articulos")  // Bucket actualizado
          .upload(fileName, form.imagen);

        if (uploadError) {
          throw new Error("Error al subir imagen: " + uploadError.message);
        }

        const { data: publicUrlData } = supabase.storage
          .from("articulos")  // Bucket actualizado
          .getPublicUrl(fileName);

        imagen_url = publicUrlData.publicUrl;
      }

      const { error: insertError } = await supabase.from("articulos").insert({
        titulo: form.titulo.trim(),
        contenido: form.contenido?.trim() || null,
        autor_id: usuarioId,
        precio: parseFloat(form.precio) || 0,
        stock: parseInt(form.stock) || 0,
        imagen_url,
        categoria: form.categoria || null,
        marca: form.marca || null,
        disponible: form.disponible,
      });

      if (insertError) {
        throw new Error("Error al guardar el artículo: " + insertError.message);
      }

      if (onArticuloAgregado) onArticuloAgregado();
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="w-full max-w-lg p-6 border shadow-2xl rounded-xl bg-neutral-900 border-violet-700">
        <h2 className="mb-4 text-2xl font-bold text-center text-violet-400">
          Registrar Producto
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-white">
          <input
            name="titulo"
            placeholder="Título *"
            required
            value={form.titulo}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-neutral-800 border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
            disabled={loading}
          />

          <textarea
            name="contenido"
            placeholder="Descripción / Detalles"
            value={form.contenido}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border rounded bg-neutral-800 border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
            disabled={loading}
          />

          <input
            name="precio"
            type="number"
            step="0.01"
            placeholder="Precio *"
            value={form.precio}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-neutral-800 border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
            required
            disabled={loading}
          />

          <input
            name="stock"
            type="number"
            placeholder="Stock disponible"
            value={form.stock}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-neutral-800 border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
            disabled={loading}
          />

          <input
            name="categoria"
            placeholder="Categoría"
            value={form.categoria}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-neutral-800 border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
            disabled={loading}
          />

          <input
            name="marca"
            placeholder="Marca"
            value={form.marca}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-neutral-800 border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
            disabled={loading}
          />

          <label className="flex items-center space-x-2 text-violet-300">
            <input
              type="checkbox"
              name="disponible"
              checked={form.disponible}
              onChange={handleChange}
              disabled={loading}
              className="accent-violet-500"
            />
            <span>Disponible para la venta</span>
          </label>

          <input
            type="file"
            name="imagen"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-sm text-violet-300"
            disabled={loading}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white rounded bg-violet-600 hover:bg-violet-700"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar Producto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
