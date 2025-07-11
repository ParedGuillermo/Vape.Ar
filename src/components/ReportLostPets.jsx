import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const provinciasArgentinas = [
  "Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes",
  "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza",
  "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis",
  "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucumán",
];

function sanitizeFileName(name) {
  return name.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9._-]/g, "");
}

export default function ModalReportarMascota({ onClose, usuarioId, onMascotaReportada }) {
  const [form, setForm] = useState({
    nombre: "",
    especie: "",
    raza: "",
    edad: "",
    descripcion: "",
    provincia: "",
    telefono: "",
    sexo: "",
    caracteristicas: "",
    cuidados_especiales: "",
    foto: null,
  });

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "foto") {
      setForm((prev) => ({ ...prev, foto: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usuarioId) {
      setError("Debés iniciar sesión para reportar una mascota.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let foto_url = null;

      if (form.foto) {
        setUploadingImage(true);
        const safeName = sanitizeFileName(form.foto.name);
        const fileName = `${Date.now()}_${safeName}`;
        const { error: uploadError } = await supabase.storage.from("pets").upload(fileName, form.foto);
        setUploadingImage(false);

        if (uploadError) {
          setError(`Error al subir la imagen: ${uploadError.message}`);
          setLoading(false);
          return;
        }

        const { data: publicUrlData } = supabase.storage.from("pets").getPublicUrl(fileName);
        foto_url = publicUrlData.publicUrl;
      }

      if (!/^\d{6,15}$/.test(form.telefono)) {
        setError("El teléfono debe ser un número válido.");
        setLoading(false);
        return;
      }

      const { error: insertError } = await supabase.from("mascotas").insert({
        nombre: form.nombre,
        especie: form.especie,
        raza: form.raza || null,
        edad: form.edad ? parseInt(form.edad) : null,
        descripcion: form.descripcion || null,
        provincia: form.provincia || null,
        telefono: form.telefono,
        sexo: form.sexo,
        caracteristicas: form.caracteristicas || null,
        cuidados_especiales: form.cuidados_especiales || null,
        estado: "reportada",
        foto_url,
        usuario_id: usuarioId,
      });

      if (insertError) {
        setError(`Error al guardar en la base de datos: ${insertError.message}`);
        setLoading(false);
        return;
      }

      if (onMascotaReportada) onMascotaReportada();
      onClose();
    } catch (err) {
      setError(`Error inesperado: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
      setUploadingImage(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg p-6 bg-neutral-900 rounded-3xl shadow-xl max-h-[90vh] overflow-auto border border-violet-600">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute text-3xl font-bold transition text-violet-400 top-4 right-4 hover:text-red-600"
          aria-label="Cerrar"
        >
          &times;
        </button>

        <h2 className="mb-6 text-2xl font-bold text-center text-violet-400">🐾 Reportar Mascota Perdida</h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm text-violet-300">
          <input
            name="nombre"
            placeholder="Nombre *"
            required
            value={form.nombre}
            onChange={handleChange}
            className="w-full p-3 text-white border rounded-lg shadow-sm bg-neutral-800 border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <input
            name="especie"
            placeholder="Especie (perro, gato) *"
            required
            value={form.especie}
            onChange={handleChange}
            className="w-full p-3 text-white border rounded-lg shadow-sm bg-neutral-800 border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <input
            name="raza"
            placeholder="Raza"
            value={form.raza}
            onChange={handleChange}
            className="w-full p-3 text-white border rounded-lg shadow-sm bg-neutral-800 border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <input
            name="edad"
            type="number"
            min="0"
            placeholder="Edad"
            value={form.edad}
            onChange={handleChange}
            className="w-full p-3 text-white border rounded-lg shadow-sm bg-neutral-800 border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <select
            name="provincia"
            value={form.provincia}
            onChange={handleChange}
            required
            className="w-full p-3 text-white border rounded-lg shadow-sm bg-neutral-800 border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="" className="text-gray-400">Seleccioná una provincia *</option>
            {provinciasArgentinas.map((prov) => (
              <option key={prov} value={prov} className="text-white bg-neutral-900">{prov}</option>
            ))}
          </select>

          <input
            name="telefono"
            placeholder="Teléfono *"
            required
            value={form.telefono}
            onChange={handleChange}
            className="w-full p-3 text-white border rounded-lg shadow-sm bg-neutral-800 border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <select
            name="sexo"
            value={form.sexo}
            onChange={handleChange}
            className="w-full p-3 text-white border rounded-lg shadow-sm bg-neutral-800 border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="" className="text-gray-400">Seleccioná el sexo</option>
            <option value="macho" className="text-white bg-neutral-900">Macho</option>
            <option value="hembra" className="text-white bg-neutral-900">Hembra</option>
            <option value="disponible" className="text-white bg-neutral-900">Disponible</option>
          </select>

          <textarea
            name="caracteristicas"
            placeholder="Características"
            value={form.caracteristicas}
            onChange={handleChange}
            className="w-full p-3 text-white border rounded-lg shadow-sm bg-neutral-800 border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <textarea
            name="cuidados_especiales"
            placeholder="Cuidados especiales"
            value={form.cuidados_especiales}
            onChange={handleChange}
            className="w-full p-3 text-white border rounded-lg shadow-sm bg-neutral-800 border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={form.descripcion}
            onChange={handleChange}
            className="w-full p-3 text-white border rounded-lg shadow-sm bg-neutral-800 border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <input
            type="file"
            name="foto"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-violet-400"
          />

          {uploadingImage && <p className="text-sm text-green-400">Subiendo imagen...</p>}
          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 transition rounded-lg text-neutral-900 bg-violet-400 hover:bg-violet-500"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || uploadingImage}
              className="px-4 py-2 text-white transition bg-green-600 rounded-lg hover:bg-green-700"
            >
              {loading ? "Reportando..." : "Reportar Mascota"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
