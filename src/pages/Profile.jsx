import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import ModalRegistrarMascota from "../components/ModalRegistrarMascota";
import AvatarSelector from "../components/AvatarSelector";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    apodo: "",
    telefono: "",
    avatar_url: "",
    provincia: "",
  });

  const fetchProfileAndMascotas = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const { data: profile, error: profileError } = await supabase
      .from("usuarios")
      .select("*")
      .eq("correo", user.email)
      .single();

    if (profileError) {
      console.error("Error al obtener perfil:", profileError.message);
      setProfileData(null);
      setMascotas([]);
      setLoading(false);
      return;
    }

    setProfileData(profile);

    setFormData({
      nombre: profile.nombre || "",
      apellido: profile.apellido || "",
      apodo: profile.apodo || "",
      telefono: profile.telefono || "",
      avatar_url: profile.avatar_url || "",
      provincia: profile.provincia || "",
    });

    const { data: mascotasData, error: mascotasError } = await supabase
      .from("mascotas")
      .select("*")
      .eq("usuario_id", profile.id);

    if (mascotasError) {
      console.error("Error al obtener mascotas:", mascotasError.message);
      setMascotas([]);
    } else {
      setMascotas(mascotasData);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProfileAndMascotas();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("usuarios")
      .update(formData)
      .eq("id", profileData.id);

    if (error) {
      alert("Error al actualizar perfil: " + error.message);
    } else {
      setEditing(false);
      fetchProfileAndMascotas();
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setFormData({
      nombre: profileData.nombre || "",
      apellido: profileData.apellido || "",
      apodo: profileData.apodo || "",
      telefono: profileData.telefono || "",
      avatar_url: profileData.avatar_url || "",
      provincia: profileData.provincia || "",
    });
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 bg-neutral-900 text-violet-400">
        <p>Cargando perfil y mascotas...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 bg-neutral-900 text-violet-400">
        <p>No estás autenticado. Por favor, inicia sesión.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-6 text-white bg-neutral-900">
      <h2 className="mb-6 text-3xl font-semibold text-violet-400">Perfil de usuario</h2>

      <div className="w-full max-w-md p-6 mb-10 border rounded-lg shadow-lg bg-neutral-800 border-violet-600">
        {editing ? (
          <>
            <label className="block mb-2 font-semibold text-violet-300">
              Nombre
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full p-2 mt-1 text-white border rounded bg-neutral-900 border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
            </label>

            <label className="block mb-2 font-semibold text-violet-300">
              Apellido
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                className="w-full p-2 mt-1 text-white border rounded bg-neutral-900 border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
            </label>

            <label className="block mb-2 font-semibold text-violet-300">
              Apodo
              <input
                type="text"
                name="apodo"
                value={formData.apodo}
                onChange={handleChange}
                className="w-full p-2 mt-1 text-white border rounded bg-neutral-900 border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
            </label>

            <label className="block mb-2 font-semibold text-violet-300">
              Teléfono
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full p-2 mt-1 text-white border rounded bg-neutral-900 border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
            </label>

            <label className="block mb-2 font-semibold text-violet-300">
              Provincia
              <input
                type="text"
                name="provincia"
                value={formData.provincia}
                onChange={handleChange}
                className="w-full p-2 mt-1 text-white border rounded bg-neutral-900 border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
            </label>

            {/* Selector visual de avatars */}
            <AvatarSelector
              selectedAvatar={formData.avatar_url}
              onSelect={(url) => setFormData((prev) => ({ ...prev, avatar_url: url }))}
              className="mt-4"
            />

            <div className="flex gap-4 mt-4">
              <button
                onClick={handleSave}
                className="px-4 py-2 text-white transition bg-green-600 rounded hover:bg-green-700"
              >
                Guardar
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-white transition bg-gray-600 rounded hover:bg-gray-700"
              >
                Cancelar
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-violet-300">
              <strong>Nombre:</strong> {profileData?.nombre || "No especificado"}
            </p>
            <p className="text-violet-300">
              <strong>Apellido:</strong> {profileData?.apellido || "No especificado"}
            </p>
            <p className="text-violet-300">
              <strong>Apodo:</strong> {profileData?.apodo || "No especificado"}
            </p>
            <p className="text-violet-300">
              <strong>Email:</strong> {profileData?.correo}
            </p>
            <p className="text-violet-300">
              <strong>Teléfono:</strong> {profileData?.telefono || "No especificado"}
            </p>
            <p className="text-violet-300">
              <strong>Provincia:</strong> {profileData?.provincia || "No especificado"}
            </p>
            <p className="text-violet-300">
              <strong>Suscripción:</strong> {profileData?.suscripcion || "Gratuito"}
            </p>
            {profileData?.avatar_url && (
              <img
                src={profileData.avatar_url}
                alt="Avatar"
                className="w-24 h-24 mt-4 border-2 rounded-full border-violet-600"
              />
            )}

            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 mt-4 text-white transition rounded bg-violet-600 hover:bg-violet-700"
            >
              Editar perfil
            </button>
          </>
        )}
      </div>

      {/* Mascotas */}
      <div className="flex items-center justify-between w-full max-w-md mb-4">
        <h3 className="text-2xl font-semibold text-violet-400">Mis Mascotas</h3>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 text-sm text-white transition rounded bg-violet-600 hover:bg-violet-700"
        >
          + Agregar mascota
        </button>
      </div>

      {mascotas.length === 0 ? (
        <p className="w-full max-w-md mb-6 text-violet-300">No tenés mascotas registradas.</p>
      ) : (
        <div className="grid w-full max-w-md grid-cols-1 gap-6 sm:grid-cols-2">
          {mascotas.map((m) => (
            <div
              key={m.id}
              className="flex flex-col items-center p-4 border rounded-lg shadow-lg bg-neutral-800 border-violet-600"
            >
              <img
                src={m.foto_url || "https://placehold.co/150x150?text=Mascota"}
                alt={m.nombre}
                className="object-cover w-32 h-32 mb-3 border-2 rounded-full border-violet-600"
              />
              <h4 className="text-lg font-semibold text-violet-400">{m.nombre}</h4>
              <p className="text-sm text-violet-300">
                {m.especie} - {m.raza || "Sin raza"}
              </p>
              <p className="text-sm text-violet-300">
                {m.edad ? `${m.edad} años` : "Edad no especificada"}
              </p>
              <p className="mt-2 text-sm text-center text-violet-300">
                {m.descripcion || "Sin descripción"}
              </p>
              <p className="mt-1 text-sm text-violet-400">Estado: {m.estado || "Desconocido"}</p>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleLogout}
        className="px-6 py-3 mt-10 text-white transition bg-red-600 rounded hover:bg-red-700"
      >
        Cerrar sesión
      </button>

      {showModal && (
        <ModalRegistrarMascota
          usuarioId={profileData.id}
          onClose={() => setShowModal(false)}
          onMascotaAgregada={fetchProfileAndMascotas}
        />
      )}
    </div>
  );
}
