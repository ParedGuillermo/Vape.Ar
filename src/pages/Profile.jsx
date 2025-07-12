import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import ModalRegistrarArticulo from "../components/ModalRegistrarArticulo";
import ModalEditarArticulo from "../components/ModalEditarArticulo";
import AvatarSelector from "../components/AvatarSelector";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editModalArticulo, setEditModalArticulo] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    rol: "usuario",
    nombre_local: "",
    provincia: "",
    ciudad: "",
    avatar_url: "",
  });

  const fetchProfileAndArticulos = async () => {
    if (!user) return setLoading(false);
    setLoading(true);

    const { data: profile, error: profileError } = await supabase
      .from("usuarios")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError) return setLoading(false);

    setProfileData(profile);
    setFormData({
      nombre: profile.nombre || "",
      correo: profile.correo || "",
      telefono: profile.telefono || "",
      rol: profile.rol || "usuario",
      nombre_local: profile.nombre_local || "",
      provincia: profile.provincia || "",
      ciudad: profile.ciudad || "",
      avatar_url: profile.avatar_url || "",
    });

    const { data: articulosData } = await supabase
      .from("articulos")
      .select("*")
      .eq("autor_id", user.id);

    setArticulos(articulosData || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProfileAndArticulos();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}_${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      setUploadingImage(false);
      alert("Error al subir la imagen");
      return;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
    const publicUrl = data.publicUrl;

    await supabase
      .from("usuarios")
      .update({ avatar_url: publicUrl })
      .eq("id", user.id);

    fetchProfileAndArticulos();
    setUploadingImage(false);
  };

  const handleSave = async () => {
    setLoading(true);
    const { nombre, telefono, nombre_local, provincia, ciudad, avatar_url } = formData;

    await supabase
      .from("usuarios")
      .update({ nombre, telefono, nombre_local, provincia, ciudad, avatar_url })
      .eq("id", user.id);

    setEditing(false);
    fetchProfileAndArticulos();
    setLoading(false);
  };

  const handleCancel = () => {
    if (!profileData) return;
    setFormData({
      nombre: profileData.nombre || "",
      correo: profileData.correo || "",
      telefono: profileData.telefono || "",
      rol: profileData.rol || "usuario",
      nombre_local: profileData.nombre_local || "",
      provincia: profileData.provincia || "",
      ciudad: profileData.ciudad || "",
      avatar_url: profileData.avatar_url || "",
    });
    setEditing(false);
  };

  if (loading)
    return (
      <div className="min-h-screen p-6 text-center text-violet-400 bg-neutral-900">
        Cargando...
      </div>
    );

  return (
    <div className="flex flex-col items-center min-h-screen p-6 pb-16 text-white bg-neutral-900">
      <h2 className="mb-6 text-3xl font-semibold text-violet-400">Perfil de usuario</h2>

      <div className="w-full max-w-md p-6 mb-10 border rounded-lg shadow-lg bg-neutral-800 border-violet-600">
        {editing ? (
          <>
            <label className="block mb-2 font-semibold text-violet-300">Nombre *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-3 py-2 mb-3 rounded border border-[#4a4e69] bg-[#0f3460] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e94560]"
              placeholder="Nombre"
            />

            <label className="block mt-3 mb-2 font-semibold text-violet-300">Teléfono *</label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full px-3 py-2 mb-3 rounded border border-[#4a4e69] bg-[#0f3460] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e94560]"
              placeholder="Teléfono"
            />

            <label className="block mt-3 mb-2 font-semibold text-violet-300">Nombre Local</label>
            <input
              type="text"
              name="nombre_local"
              value={formData.nombre_local}
              onChange={handleChange}
              className="w-full px-3 py-2 mb-3 rounded border border-[#4a4e69] bg-[#0f3460] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e94560]"
              placeholder="Nombre Local"
            />

            <label className="block mt-3 mb-2 font-semibold text-violet-300">Provincia</label>
            <input
              type="text"
              name="provincia"
              value={formData.provincia}
              onChange={handleChange}
              className="w-full px-3 py-2 mb-3 rounded border border-[#4a4e69] bg-[#0f3460] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e94560]"
              placeholder="Provincia"
            />

            <label className="block mt-3 mb-2 font-semibold text-violet-300">Ciudad</label>
            <input
              type="text"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              className="w-full px-3 py-2 mb-3 rounded border border-[#4a4e69] bg-[#0f3460] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e94560]"
              placeholder="Ciudad"
            />

            <div className="mt-4">
              {formData.avatar_url && (
                <img
                  src={formData.avatar_url}
                  alt="avatar"
                  className="object-cover w-24 h-24 mb-2 border-2 rounded-full border-violet-500"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 rounded border border-[#4a4e69] bg-[#0f3460] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e94560]"
              />
              <AvatarSelector
                selectedAvatar={formData.avatar_url}
                onSelect={(url) => setFormData((prev) => ({ ...prev, avatar_url: url }))}
              />
            </div>

            <div className="flex gap-4 mt-4">
              <button onClick={handleSave} className="bg-green-600 btn hover:bg-green-700">
                Guardar
              </button>
              <button onClick={handleCancel} className="bg-gray-600 btn hover:bg-gray-700">
                Cancelar
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center mb-6">
              <img
                src={profileData.avatar_url}
                alt="avatar"
                className="object-cover w-40 h-40 mb-4 border-4 rounded-full border-violet-600"
              />
              <p className="text-center text-violet-300">
                <strong>Nombre:</strong> {profileData.nombre}
              </p>
              <p className="text-center text-violet-300">
                <strong>Teléfono:</strong> {profileData.telefono}
              </p>
              <p className="text-center text-violet-300">
                <strong>Correo:</strong> {profileData.correo}
              </p>
              <p className="text-center text-violet-300">
                <strong>Rol:</strong> {profileData.rol}
              </p>
              <p className="text-center text-violet-300">
                <strong>Local:</strong> {profileData.nombre_local}
              </p>
              <p className="text-center text-violet-300">
                <strong>Provincia:</strong> {profileData.provincia}
              </p>
              <p className="text-center text-violet-300">
                <strong>Ciudad:</strong> {profileData.ciudad}
              </p>
            </div>
            <button
              onClick={() => setEditing(true)}
              className="btn bg-violet-600 hover:bg-violet-700"
            >
              Editar perfil
            </button>
          </>
        )}
      </div>

      {/* Productos */}
      <div className="flex items-center justify-between w-full max-w-md mb-4">
        <h3 className="text-2xl font-semibold text-violet-400">Mis Productos</h3>
        <button
          onClick={() => setShowModal(true)}
          className="text-sm btn bg-violet-600 hover:bg-violet-700"
        >
          + Agregar
        </button>
      </div>

      <div className="grid w-full max-w-md grid-cols-1 gap-4">
        {articulos.map((a) => (
          <div
            key={a.id}
            className="flex overflow-hidden border rounded-lg shadow-lg bg-neutral-800 border-violet-600"
          >
            <img
              src={a.imagen_url || "https://placehold.co/100x100"}
              alt={a.titulo}
              className="object-cover w-28 h-28"
            />
            <div className="flex flex-col justify-between p-4">
              <div>
                <h4 className="text-lg font-semibold text-violet-400">{a.titulo}</h4>
                <p className="text-sm text-violet-300">
                  {a.categoria} {a.marca && `| ${a.marca}`}
                </p>
                <p className="text-sm text-violet-300">
                  ${a.precio?.toFixed(2)} | Stock: {a.stock}
                </p>
              </div>
              <button
                onClick={() => setEditModalArticulo(a)}
                className="mt-2 text-xs btn bg-violet-700 hover:bg-violet-800"
              >
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleLogout}
        className="mt-10 bg-red-600 btn hover:bg-red-700"
      >
        Cerrar sesión
      </button>

      {showModal && (
        <ModalRegistrarArticulo
          usuarioId={profileData.id}
          onClose={() => setShowModal(false)}
          onArticuloAgregado={fetchProfileAndArticulos}
        />
      )}

      {editModalArticulo && (
        <ModalEditarArticulo
          articulo={editModalArticulo}
          onClose={() => setEditModalArticulo(null)}
          onArticuloActualizado={fetchProfileAndArticulos}
        />
      )}
    </div>
  );
}
