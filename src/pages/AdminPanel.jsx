import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingUser, setEditingUser] = useState(null);
  const [editingPet, setEditingPet] = useState(null);

  const isAdmin = user?.email === "walterguillermopared@gmail.com";

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
      return;
    }

    fetchData();
  }, [user]);

  const fetchData = async () => {
    setLoading(true);

    const { data: usuariosData } = await supabase.from("usuarios").select("*");
    const { data: mascotasData } = await supabase.from("mascotas").select("*");

    setUsuarios(usuariosData || []);
    setMascotas(mascotasData || []);
    setLoading(false);
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("¿Eliminar este usuario?")) return;
    await supabase.from("usuarios").delete().eq("id", id);
    fetchData();
  };

  const handleDeleteMascota = async (id) => {
    if (!window.confirm("¿Eliminar esta mascota?")) return;
    await supabase.from("mascotas").delete().eq("id", id);
    fetchData();
  };

  const handleUpdateUser = async () => {
    const { id, ...data } = editingUser;
    await supabase.from("usuarios").update(data).eq("id", id);
    setEditingUser(null);
    fetchData();
  };

  const handleUpdateMascota = async () => {
    const { id, ...data } = editingPet;
    await supabase.from("mascotas").update(data).eq("id", id);
    setEditingPet(null);
    fetchData();
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (!user || !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-gray-300">
        <p className="text-lg font-semibold text-center text-[#fb7185] drop-shadow-lg">
          No estás autorizado para acceder a esta página.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-gray-300">
      <h1 className="mb-6 text-3xl font-extrabold text-center text-[#e94560] drop-shadow-lg">
        Panel de Administración
      </h1>

      {loading ? (
        <p className="text-center text-[#9f86c0] animate-pulse">Cargando datos...</p>
      ) : (
        <>
          {/* Usuarios */}
          <section className="mb-8">
            <h2 className="mb-3 text-xl font-semibold text-[#9f86c0]">
              Usuarios
            </h2>
            <div className="p-3 overflow-auto bg-[#16213e] border border-[#4a4e69] rounded-lg shadow-md max-h-72">
              <table className="w-full text-xs text-gray-200 sm:text-sm">
                <thead>
                  <tr className="bg-[#0f3460] text-[#e94560] uppercase text-[0.65rem] sm:text-xs">
                    <th className="px-2 py-1">ID</th>
                    <th className="px-2 py-1">Correo</th>
                    <th className="px-2 py-1">Nombre</th>
                    <th className="px-2 py-1">Apellido</th>
                    <th className="px-2 py-1">Rol</th>
                    <th className="px-2 py-1">Suscripción</th>
                    <th className="px-2 py-1">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((u) => (
                    <tr
                      key={u.id}
                      className="border-b border-[#4a4e69] hover:bg-[#0f3460]"
                    >
                      <td className="px-2 py-1">{u.id}</td>
                      <td className="px-2 py-1 truncate max-w-[100px]">{u.correo}</td>
                      <td className="px-2 py-1">{u.nombre}</td>
                      <td className="px-2 py-1">{u.apellido}</td>
                      <td className="px-2 py-1">{u.rol}</td>
                      <td className="px-2 py-1">{u.suscripcion}</td>
                      <td className="px-2 py-1 space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => setEditingUser(u)}
                          className="font-medium text-[#e94560] hover:text-[#fb7185] transition"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="font-medium text-[#fb7185] hover:text-[#e94560] transition"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Mascotas */}
          <section className="mb-8">
            <h2 className="mb-3 text-xl font-semibold text-[#9f86c0]">
              Mascotas
            </h2>
            <div className="p-3 overflow-auto bg-[#16213e] border border-[#4a4e69] rounded-lg shadow-md max-h-72">
              <table className="w-full text-xs text-gray-200 sm:text-sm">
                <thead>
                  <tr className="bg-[#0f3460] text-[#e94560] uppercase text-[0.65rem] sm:text-xs">
                    <th className="px-2 py-1">ID</th>
                    <th className="px-2 py-1">Nombre</th>
                    <th className="px-2 py-1">Especie</th>
                    <th className="px-2 py-1">Raza</th>
                    <th className="px-2 py-1">Edad</th>
                    <th className="px-2 py-1">Estado</th>
                    <th className="px-2 py-1">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {mascotas.map((m) => (
                    <tr
                      key={m.id}
                      className="border-b border-[#4a4e69] hover:bg-[#0f3460]"
                    >
                      <td className="px-2 py-1">{m.id}</td>
                      <td className="px-2 py-1">{m.nombre}</td>
                      <td className="px-2 py-1">{m.especie}</td>
                      <td className="px-2 py-1">{m.raza}</td>
                      <td className="px-2 py-1">{m.edad}</td>
                      <td className="px-2 py-1">{m.estado}</td>
                      <td className="px-2 py-1 space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => setEditingPet(m)}
                          className="font-medium text-[#e94560] hover:text-[#fb7185] transition"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteMascota(m.id)}
                          className="font-medium text-[#fb7185] hover:text-[#e94560] transition"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Edición Usuario */}
          {editingUser && (
            <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-70">
              <div className="w-full max-w-md p-6 bg-[#16213e] rounded-lg shadow-lg text-gray-200">
                <h3 className="mb-4 text-xl font-bold text-[#e94560]">
                  Editar Usuario
                </h3>
                <input
                  type="text"
                  value={editingUser.nombre}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, nombre: e.target.value })
                  }
                  placeholder="Nombre"
                  className="w-full p-3 mb-4 bg-[#0f3460] border border-[#4a4e69] rounded-md text-gray-200
                    focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                />
                <input
                  type="text"
                  value={editingUser.apellido}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, apellido: e.target.value })
                  }
                  placeholder="Apellido"
                  className="w-full p-3 mb-6 bg-[#0f3460] border border-[#4a4e69] rounded-md text-gray-200
                    focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                />
                <div className="flex justify-between">
                  <button
                    onClick={handleUpdateUser}
                    className="flex-1 py-3 mr-2 font-semibold text-white bg-[#e94560] rounded hover:bg-[#d63447] transition"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditingUser(null)}
                    className="flex-1 py-3 font-semibold transition bg-gray-700 rounded hover:bg-gray-600"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edición Mascota */}
          {editingPet && (
            <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-70">
              <div className="w-full max-w-md p-6 bg-[#16213e] rounded-lg shadow-lg text-gray-200">
                <h3 className="mb-4 text-xl font-bold text-[#e94560]">
                  Editar Mascota
                </h3>
                <input
                  type="text"
                  value={editingPet.nombre}
                  onChange={(e) =>
                    setEditingPet({ ...editingPet, nombre: e.target.value })
                  }
                  placeholder="Nombre"
                  className="w-full p-3 mb-4 bg-[#0f3460] border border-[#4a4e69] rounded-md text-gray-200
                    focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                />
                <input
                  type="text"
                  value={editingPet.raza}
                  onChange={(e) =>
                    setEditingPet({ ...editingPet, raza: e.target.value })
                  }
                  placeholder="Raza"
                  className="w-full p-3 mb-6 bg-[#0f3460] border border-[#4a4e69] rounded-md text-gray-200
                    focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                />
                <div className="flex justify-between">
                  <button
                    onClick={handleUpdateMascota}
                    className="flex-1 py-3 mr-2 font-semibold text-white bg-[#e94560] rounded hover:bg-[#d63447] transition"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditingPet(null)}
                    className="flex-1 py-3 font-semibold transition bg-gray-700 rounded hover:bg-gray-600"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center mt-6">
            <button
              onClick={handleLogout}
              className="w-full max-w-xs px-6 py-3 font-semibold text-white bg-[#fb7185] rounded-lg hover:bg-[#e94560] transition"
            >
              Cerrar sesión
            </button>
          </div>
        </>
      )}
    </div>
  );
}
