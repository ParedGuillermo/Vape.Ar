import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const estados = ["disponible", "agotado", "descontinuado"];

export default function CargarProducto() {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria: "",
    estado: "disponible",
    foto: null,
  });

  const [productos, setProductos] = useState([]);
  const [editando, setEditando] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const [busqueda, setBusqueda] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");

  const sanitizeFileName = (name) =>
    name.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9._-]/g, "");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "foto") {
      setForm((prev) => ({ ...prev, foto: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const fetchProductos = async () => {
    const { data, error } = await supabase
      .from("productos")
      .select("*")
      .order("id", { ascending: false });
    if (error) console.log("Error al cargar productos", error.message);
    else setProductos(data);
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);
    let foto_url = null;

    try {
      if (form.foto) {
        setUploadingImage(true);
        const fileName = `${Date.now()}_${sanitizeFileName(form.foto.name)}`;
        const { error: uploadError } = await supabase.storage
          .from("productos")
          .upload(`fotos/${fileName}`, form.foto);

        setUploadingImage(false);

        if (uploadError)
          throw new Error("Error al subir imagen: " + uploadError.message);

        const { data } = supabase.storage
          .from("productos")
          .getPublicUrl(`fotos/${fileName}`);
        foto_url = data.publicUrl;
      }

      const precio = form.precio ? parseFloat(form.precio) : null;
      const stock = form.stock ? parseInt(form.stock) : 0;

      if (!form.nombre.trim()) throw new Error("El nombre es obligatorio.");
      if (!estados.includes(form.estado)) throw new Error("Estado inválido.");

      const producto = {
        nombre: form.nombre.trim(),
        descripcion: form.descripcion.trim() || null,
        precio,
        stock,
        categoria: form.categoria.trim() || null,
        estado: form.estado,
        foto_url: foto_url || form.foto_url || null,
      };

      if (editando) {
        const { error: updateError } = await supabase
          .from("productos")
          .update(producto)
          .eq("id", editando);

        if (updateError)
          throw new Error("Error al actualizar: " + updateError.message);
        setSuccessMsg("Producto actualizado correctamente.");
      } else {
        const { error: insertError } = await supabase.from("productos").insert(producto);
        if (insertError) throw new Error("Error al guardar: " + insertError.message);
        setSuccessMsg("Producto creado correctamente.");
      }

      setForm({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        categoria: "",
        estado: "disponible",
        foto: null,
      });
      setEditando(null);
      fetchProductos();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setUploadingImage(false);
    }
  };

  const handleEdit = (producto) => {
    setEditando(producto.id);
    setForm({ ...producto, foto: null });
  };

  const handleDelete = async (id) => {
    if (confirm("¿Seguro que querés eliminar este producto?")) {
      const { error } = await supabase.from("productos").delete().eq("id", id);
      if (!error) fetchProductos();
      else alert("Error al borrar: " + error.message);
    }
  };

  const productosFiltrados = productos.filter((p) => {
    const coincideNombre = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = filtroCategoria ? p.categoria === filtroCategoria : true;
    const coincideEstado = filtroEstado ? p.estado === filtroEstado : true;
    return coincideNombre && coincideCategoria && coincideEstado;
  });

  return (
    <div className="max-w-4xl p-6 mx-auto mt-6 text-gray-200 shadow-lg bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 rounded-xl">
      <h2 className="mb-6 text-3xl font-extrabold text-center text-violet-400">
        {editando ? "Editar Producto" : "Cargar Producto"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre *"
          value={form.nombre}
          onChange={handleChange}
          className="w-full p-3 text-gray-100 bg-purple-900 border rounded-md border-violet-600 placeholder-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          className="w-full p-3 text-gray-100 bg-purple-900 border rounded-md border-violet-600 placeholder-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          min="0"
          step="0.01"
          className="w-full p-3 text-gray-100 bg-purple-900 border rounded-md border-violet-600 placeholder-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          min="0"
          className="w-full p-3 text-gray-100 bg-purple-900 border rounded-md border-violet-600 placeholder-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
        />
        <input
          type="text"
          name="categoria"
          placeholder="Categoría"
          value={form.categoria}
          onChange={handleChange}
          className="w-full p-3 text-gray-100 bg-purple-900 border rounded-md border-violet-600 placeholder-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
        />
        <select
          name="estado"
          value={form.estado}
          onChange={handleChange}
          className="w-full p-3 text-gray-100 bg-purple-900 border rounded-md border-violet-600 placeholder-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
        >
          {estados.map((e) => (
            <option key={e} value={e} className="text-gray-100 bg-purple-900">
              {e.charAt(0).toUpperCase() + e.slice(1)}
            </option>
          ))}
        </select>

        <input
          type="file"
          name="foto"
          accept="image/*"
          onChange={handleChange}
          className="w-full text-gray-300"
        />

        {uploadingImage && <p className="text-violet-400">Subiendo imagen...</p>}
        {error && <p className="font-semibold text-red-500">{error}</p>}
        {successMsg && <p className="font-semibold text-green-400">{successMsg}</p>}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading || uploadingImage}
            className="flex-1 px-6 py-3 font-semibold text-black rounded-lg bg-violet-400 hover:bg-violet-500 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (editando ? "Actualizando..." : "Guardando...") : editando ? "Actualizar" : "Guardar Producto"}
          </button>
          {editando && (
            <button
              type="button"
              onClick={() => {
                setEditando(null);
                setForm({
                  nombre: "",
                  descripcion: "",
                  precio: "",
                  stock: "",
                  categoria: "",
                  estado: "disponible",
                  foto: null,
                });
              }}
              className="flex-1 px-6 py-3 font-semibold text-black bg-gray-400 rounded-lg hover:bg-gray-500"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <hr className="my-8 border-violet-700" />

      <h3 className="mb-6 text-2xl font-semibold text-violet-300">Productos existentes</h3>

      {/* Filtros */}
      <div className="flex flex-col gap-4 mb-8 md:flex-row">
        <input
          type="text"
          placeholder="🔍 Buscar por nombre..."
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full p-3 text-gray-200 bg-purple-900 border rounded-md border-violet-600 placeholder-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 md:w-1/3"
        />
        <select
          onChange={(e) => setFiltroCategoria(e.target.value)}
          className="w-full p-3 text-gray-200 bg-purple-900 border rounded-md border-violet-600 placeholder-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 md:w-1/3"
        >
          <option value="" className="text-gray-200 bg-purple-900">
            Todas las categorías
          </option>
          {[...new Set(productos.map((p) => p.categoria).filter(Boolean))].map((cat) => (
            <option key={cat} value={cat} className="text-gray-200 bg-purple-900">
              {cat}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="w-full p-3 text-gray-200 bg-purple-900 border rounded-md border-violet-600 placeholder-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 md:w-1/3"
        >
          <option value="" className="text-gray-200 bg-purple-900">
            Todos los estados
          </option>
          {estados.map((e) => (
            <option key={e} value={e} className="text-gray-200 bg-purple-900">
              {e.charAt(0).toUpperCase() + e.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6">
        {productosFiltrados.map((p) => (
          <div
            key={p.id}
            className="flex flex-col gap-4 p-4 bg-purple-900 border rounded-lg shadow-md sm:flex-row border-violet-700"
          >
            {p.foto_url && (
              <img
                src={p.foto_url}
                alt={p.nombre}
                className="self-center object-cover w-full h-32 max-w-xs rounded-md sm:self-start"
              />
            )}
            <div className="flex-1 text-gray-200">
              <h4 className="text-xl font-bold text-violet-300">{p.nombre}</h4>
              <p className="mb-2 text-sm text-violet-200">{p.descripcion}</p>
              <p className="text-sm">💰 ${p.precio}</p>
              <p className="text-sm">📦 Stock: {p.stock}</p>
              <p className="text-sm">📂 Categoría: {p.categoria}</p>
              <p className="text-sm">📌 Estado: {p.estado}</p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleEdit(p)}
                  className="px-4 py-2 font-semibold text-black transition bg-yellow-500 rounded hover:bg-yellow-400"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="px-4 py-2 font-semibold transition bg-red-600 rounded hover:bg-red-500"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}

        {productosFiltrados.length === 0 && (
          <p className="text-center text-violet-400">No hay productos que coincidan.</p>
        )}
      </div>
    </div>
  );
}
