// src/pages/AdminPanel.jsx
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
      <div className="min-h-screen flex items-center justify-center p-6">
        <p>No estás autorizado para acceder a esta página.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-4xl font-bold mb-6">Panel de Administración</h1>

      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <>
          {/* Usuarios */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Usuarios</h2>
            <div className="overflow-auto max-h-[300px] border rounded bg-white p-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-2">ID</th>
                    <th className="px-2">Correo</th>
                    <th className="px-2">Nombre</th>
                    <th className="px-2">Apellido</th>
                    <th className="px-2">Rol</th>
                    <th className="px-2">Suscripción</th>
                    <th className="px-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((u) => (
                    <tr key={u.id}>
                      <td className="px-2">{u.id}</td>
                      <td className="px-2">{u.correo}</td>
                      <td className="px-2">{u.nombre}</td>
                      <td className="px-2">{u.apellido}</td>
                      <td className="px-2">{u.rol}</td>
                      <td className="px-2">{u.suscripcion}</td>
                      <td className="px-2 space-x-2">
                        <button
                          onClick={() => setEditingUser(u)}
                          className="text-blue-600 text-sm"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="text-red-600 text-sm"
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
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Mascotas</h2>
            <div className="overflow-auto max-h-[300px] border rounded bg-white p-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-2">ID</th>
                    <th className="px-2">Nombre</th>
                    <th className="px-2">Especie</th>
                    <th className="px-2">Raza</th>
                    <th className="px-2">Edad</th>
                    <th className="px-2">Estado</th>
                    <th className="px-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {mascotas.map((m) => (
                    <tr key={m.id}>
                      <td className="px-2">{m.id}</td>
                      <td className="px-2">{m.nombre}</td>
                      <td className="px-2">{m.especie}</td>
                      <td className="px-2">{m.raza}</td>
                      <td className="px-2">{m.edad}</td>
                      <td className="px-2">{m.estado}</td>
                      <td className="px-2 space-x-2">
                        <button
                          onClick={() => setEditingPet(m)}
                          className="text-blue-600 text-sm"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteMascota(m.id)}
                          className="text-red-600 text-sm"
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
            <div className="bg-white p-4 rounded shadow mb-6">
              <h3 className="text-xl font-bold mb-2">Editar Usuario</h3>
              <input
                type="text"
                value={editingUser.nombre}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, nombre: e.target.value })
                }
                placeholder="Nombre"
                className="border p-2 mb-2 w-full"
              />
              <input
                type="text"
                value={editingUser.apellido}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, apellido: e.target.value })
                }
                placeholder="Apellido"
                className="border p-2 mb-2 w-full"
              />
              <button
                onClick={handleUpdateUser}
                className="bg-green-600 text-white px-4 py-2 rounded mr-2"
              >
                Guardar
              </button>
              <button
                onClick={() => setEditingUser(null)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancelar
              </button>
            </div>
          )}

          {/* Edición Mascota */}
          {editingPet && (
            <div className="bg-white p-4 rounded shadow mb-6">
              <h3 className="text-xl font-bold mb-2">Editar Mascota</h3>
              <input
                type="text"
                value={editingPet.nombre}
                onChange={(e) =>
                  setEditingPet({ ...editingPet, nombre: e.target.value })
                }
                placeholder="Nombre"
                className="border p-2 mb-2 w-full"
              />
              <input
                type="text"
                value={editingPet.raza}
                onChange={(e) =>
                  setEditingPet({ ...editingPet, raza: e.target.value })
                }
                placeholder="Raza"
                className="border p-2 mb-2 w-full"
              />
              <button
                onClick={handleUpdateMascota}
                className="bg-green-600 text-white px-4 py-2 rounded mr-2"
              >
                Guardar
              </button>
              <button
                onClick={() => setEditingPet(null)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancelar
              </button>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="mt-8 bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition"
          >
            Cerrar sesión
          </button>
        </>
      )}
    </div>
  );
}
