import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);
  const [entradasAporte, setEntradasAporte] = useState([]);
  const [loadingUsuarios, setLoadingUsuarios] = useState(true);
  const [loadingAportes, setLoadingAportes] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [tabActiva, setTabActiva] = useState("usuarios"); // Control simple de pestañas: "usuarios" o "aportes"

  const isAdmin = user?.email === "walterguillermopared@gmail.com";

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
      return;
    }

    fetchUsuarios();
    fetchAportes();
  }, [user]);

  // --- Usuarios ---
  const fetchUsuarios = async () => {
    setLoadingUsuarios(true);
    const { data: usuariosData, error } = await supabase.from("usuarios").select("*");
    if (error) console.error("Error fetching usuarios:", error);
    setUsuarios(usuariosData || []);
    setLoadingUsuarios(false);
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("¿Eliminar este usuario?")) return;
    const { error } = await supabase.from("usuarios").delete().eq("id", id);
    if (error) {
      alert("Error eliminando usuario: " + error.message);
    } else {
      fetchUsuarios();
    }
  };

  const handleUpdateUser = async () => {
    const { id, ...data } = editingUser;
    const { error } = await supabase.from("usuarios").update(data).eq("id", id);
    if (error) {
      alert("Error actualizando usuario: " + error.message);
    } else {
      setEditingUser(null);
      fetchUsuarios();
    }
  };

  // --- Aportes ---
  const fetchAportes = async () => {
    setLoadingAportes(true);
    const { data: aportesData, error } = await supabase
      .from("entradas_blog")
      .select("*")
      .eq("categoria", "Aporte")
      .order("creado_en", { ascending: false });
    if (error) console.error("Error fetching aportes:", error);
    setEntradasAporte(aportesData || []);
    setLoadingAportes(false);
  };

  const actualizarEstadoAporte = async (id, nuevoEstado) => {
    const { error } = await supabase
      .from("entradas_blog")
      .update({ estado: nuevoEstado })
      .eq("id", id);
    if (error) {
      alert("Error actualizando estado: " + error.message);
    } else {
      fetchAportes();
    }
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
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-gray-300 pb-16">
      <h1 className="mb-6 text-3xl font-extrabold text-center text-[#e94560] drop-shadow-lg">
        Panel de Administración
      </h1>

      {/* Pestañas para elegir sección */}
      <div className="flex justify-center mb-8 space-x-4">
        <button
          onClick={() => setTabActiva("usuarios")}
          className={`px-6 py-2 font-semibold rounded-md transition ${
            tabActiva === "usuarios"
              ? "bg-[#e94560] text-white shadow-lg"
              : "bg-[#16213e] text-[#9f86c0] hover:bg-[#0f3460]"
          }`}
        >
          Usuarios
        </button>
        <button
          onClick={() => setTabActiva("aportes")}
          className={`px-6 py-2 font-semibold rounded-md transition ${
            tabActiva === "aportes"
              ? "bg-[#e94560] text-white shadow-lg"
              : "bg-[#16213e] text-[#9f86c0] hover:bg-[#0f3460]"
          }`}
        >
          Solicitudes de Aporte
        </button>
      </div>

      {/* Contenido pestañas */}
      {tabActiva === "usuarios" && (
        <>
          {loadingUsuarios ? (
            <p className="text-center text-[#9f86c0] animate-pulse">Cargando usuarios...</p>
          ) : (
            <section className="mb-8">
              <h2 className="mb-3 text-xl font-semibold text-[#9f86c0]">Usuarios</h2>
              <div className="p-3 overflow-auto bg-[#16213e] border border-[#4a4e69] rounded-lg shadow-md max-h-72">
                <table className="w-full text-xs text-gray-200 sm:text-sm">
                  <thead>
                    <tr className="bg-[#0f3460] text-[#e94560] uppercase text-[0.65rem] sm:text-xs">
                      <th className="px-2 py-1">Nombre</th>
                      <th className="px-2 py-1">Correo</th>
                      <th className="px-2 py-1">Rol</th>
                      <th className="px-2 py-1">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map((u) => (
                      <tr key={u.id} className="border-b border-[#4a4e69] hover:bg-[#0f3460]">
                        <td className="px-2 py-1">{u.nombre} {u.apellido}</td>
                        <td className="px-2 py-1">{u.correo}</td>
                        <td className="px-2 py-1">{u.rol}</td>
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
          )}

          {/* Edición Usuario */}
          {editingUser && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70">
              <div className="w-full max-w-md p-6 bg-[#16213e] rounded-lg shadow-lg text-gray-200 overflow-auto max-h-[80vh]">
                <h3 className="mb-4 text-xl font-bold text-[#e94560]">Editar Usuario</h3>

                <input
                  type="text"
                  value={editingUser.nombre}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, nombre: e.target.value })
                  }
                  placeholder="Nombre"
                  className="w-full p-3 mb-4 bg-[#0f3460] border border-[#4a4e69] rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                />

                <input
                  type="text"
                  value={editingUser.apellido}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, apellido: e.target.value })
                  }
                  placeholder="Apellido"
                  className="w-full p-3 mb-4 bg-[#0f3460] border border-[#4a4e69] rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                />

                <input
                  type="text"
                  value={editingUser.correo}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, correo: e.target.value })
                  }
                  placeholder="Correo"
                  className="w-full p-3 mb-4 bg-[#0f3460] border border-[#4a4e69] rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                />

                <input
                  type="text"
                  value={editingUser.nombre_local}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, nombre_local: e.target.value })
                  }
                  placeholder="Nombre del Local"
                  className="w-full p-3 mb-4 bg-[#0f3460] border border-[#4a4e69] rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                />

                <input
                  type="text"
                  value={editingUser.provincia}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, provincia: e.target.value })
                  }
                  placeholder="Provincia"
                  className="w-full p-3 mb-4 bg-[#0f3460] border border-[#4a4e69] rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                />

                <input
                  type="text"
                  value={editingUser.ciudad}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, ciudad: e.target.value })
                  }
                  placeholder="Ciudad"
                  className="w-full p-3 mb-4 bg-[#0f3460] border border-[#4a4e69] rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                />

                <input
                  type="text"
                  value={editingUser.tipo_productos}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, tipo_productos: e.target.value })
                  }
                  placeholder="Tipo de Productos"
                  className="w-full p-3 mb-4 bg-[#0f3460] border border-[#4a4e69] rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                />

                <input
                  type="number"
                  value={editingUser.telefono}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, telefono: e.target.value })
                  }
                  placeholder="Teléfono"
                  className="w-full p-3 mb-4 bg-[#0f3460] border border-[#4a4e69] rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                />

                <input
                  type="text"
                  value={editingUser.avatar_url}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, avatar_url: e.target.value })
                  }
                  placeholder="Avatar URL"
                  className="w-full p-3 mb-4 bg-[#0f3460] border border-[#4a4e69] rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                />

                <select
                  value={editingUser.rol}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, rol: e.target.value })
                  }
                  className="w-full p-3 mb-4 bg-[#0f3460] border border-[#4a4e69] rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                >
                  <option value="usuario">Usuario</option>
                  <option value="vendedor">Vendedor</option>
                  <option value="admin">Admin</option>
                </select>

                <div className="flex justify-between mt-6">
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
        </>
      )}

      {tabActiva === "aportes" && (
        <>
          {loadingAportes ? (
            <p className="text-center text-[#9f86c0] animate-pulse">Cargando solicitudes de aporte...</p>
          ) : (
            <section className="mb-8">
              <h2 className="mb-3 text-xl font-semibold text-[#9f86c0]">Solicitudes de Aporte de Productos</h2>
              {entradasAporte.length === 0 ? (
                <p className="text-center text-gray-400">No hay solicitudes de aporte pendientes.</p>
              ) : (
                <div className="p-3 overflow-auto bg-[#16213e] border border-[#4a4e69] rounded-lg shadow-md max-h-96">
                  <table className="w-full text-xs text-gray-200 sm:text-sm">
                    <thead>
                      <tr className="bg-[#0f3460] text-[#e94560] uppercase text-[0.65rem] sm:text-xs">
                        <th className="px-2 py-1">Título</th>
                        <th className="px-2 py-1">Autor</th>
                        <th className="px-2 py-1">Contacto</th>
                        <th className="px-2 py-1">Estado</th>
                        <th className="px-2 py-1">Fecha</th>
                        <th className="px-2 py-1">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entradasAporte.map((entrada) => (
                        <tr
                          key={entrada.id}
                          className="border-b border-[#4a4e69] hover:bg-[#0f3460]"
                        >
                          <td className="px-2 py-1">{entrada.titulo}</td>
                          <td className="px-2 py-1">{entrada.autor}</td>
                          <td className="px-2 py-1">{entrada.contacto || "-"}</td>
                          <td className="px-2 py-1 capitalize">{entrada.estado || "pendiente"}</td>
                          <td className="px-2 py-1">{new Date(entrada.creado_en).toLocaleDateString()}</td>
                          <td className="px-2 py-1 space-x-2 whitespace-nowrap">
                            {entrada.estado !== "aprobado" && (
                              <button
                                onClick={() => actualizarEstadoAporte(entrada.id, "aprobado")}
                                className="font-semibold text-green-500 hover:text-green-400"
                              >
                                Aprobar
                              </button>
                            )}
                            {entrada.estado !== "rechazado" && (
                              <button
                                onClick={() => actualizarEstadoAporte(entrada.id, "rechazado")}
                                className="font-semibold text-red-500 hover:text-red-400"
                              >
                                Rechazar
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}
        </>
      )}

      <div className="flex justify-center mt-6">
        <button
          onClick={handleLogout}
          className="w-full max-w-xs px-6 py-3 font-semibold text-white bg-[#fb7185] rounded-lg hover:bg-[#e94560] transition"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
