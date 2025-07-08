import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import ModalRegistrarMascota from "../components/ModalRegistrarMascota";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Traer perfil y mascotas
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 bg-gray-50">
        <p>Cargando perfil y mascotas...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 bg-gray-50">
        <p>No estás autenticado. Por favor, inicia sesión.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-50">
      <h2 className="mb-6 text-3xl font-semibold">Perfil de usuario</h2>

      <div className="w-full max-w-md p-6 mb-10 bg-white rounded-lg shadow-md">
        <p><strong>Nombre:</strong> {profileData?.nombre || "No especificado"}</p>
        <p><strong>Apellido:</strong> {profileData?.apellido || "No especificado"}</p>
        <p><strong>Email:</strong> {profileData?.correo}</p>
        <p><strong>Teléfono:</strong> {profileData?.telefono || "No especificado"}</p>
        <p><strong>Provincia:</strong> {profileData?.provincia || "No especificado"}</p>
        <p><strong>Rol:</strong> {profileData?.rol || "Usuario"}</p>
        <p><strong>Suscripción:</strong> {profileData?.suscripcion || "Gratuito"}</p>
        <p><strong>Puntos:</strong> {profileData?.puntos ?? 0}</p>
        <p><strong>Nivel:</strong> {profileData?.nivel ?? 1}</p>
      </div>

      <div className="flex items-center justify-between w-full max-w-md mb-4">
        <h3 className="text-2xl font-semibold">Mis Mascotas</h3>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          + Agregar mascota
        </button>
      </div>

      {mascotas.length === 0 ? (
        <p className="w-full max-w-md mb-6 text-gray-600">No tenés mascotas registradas.</p>
      ) : (
        <div className="grid w-full max-w-md grid-cols-1 gap-6 sm:grid-cols-2">
          {mascotas.map((m) => (
            <div
              key={m.id}
              className="flex flex-col items-center p-4 bg-white rounded-lg shadow"
            >
              <img
                src={m.foto_url || "https://placehold.co/150x150?text=Mascota"}
                alt={m.nombre}
                className="object-cover w-32 h-32 mb-3 rounded-full"
              />
              <h4 className="text-lg font-semibold">{m.nombre}</h4>
              <p className="text-sm text-gray-700">{m.especie} - {m.raza || "Sin raza"}</p>
              <p className="text-sm text-gray-700">{m.edad ? `${m.edad} años` : "Edad no especificada"}</p>
              <p className="mt-2 text-sm text-center text-gray-600">{m.descripcion || "Sin descripción"}</p>
              <p className="mt-1 text-sm text-gray-500">Estado: {m.estado || "Desconocido"}</p>
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
