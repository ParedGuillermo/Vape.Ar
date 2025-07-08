import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import menuIcon from "../assets/home/menu-de-hamburguesa-icon.png";
import homeIcon from "../assets/home/home-icon.png";
import tiendaIcon from "../assets/home/tienda-icon.png";
import qrIcon from "../assets/home/qr-icon.png";
import perfilIcon from "../assets/home/perfil-icon.png";
import perdidaIcon from "../assets/home/perdida-icon.png";
import adopcionIcon from "../assets/home/adopcion-icon.png";
import adminIcon from "../assets/home/admin-icon.png";
import agregarIcon from "../assets/home/agregar-icon.png";
import reportlostIcon from "../assets/home/reportar-perdida-icon.png";
import administrarQRIcon from "../assets/home/administrar-qr-icon.png"; // Añadir el icono de Administrar QR

export default function BottomNav() {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sections = [
    { name: "Inicio", path: "/", icon: homeIcon },
    { name: "Tienda", path: "/productos", icon: tiendaIcon },
    { name: "Escanear QR", path: "/scan", icon: qrIcon },
    { name: "Perfil", path: "/profile", icon: perfilIcon },
    { name: "Reportar Pérdida", path: "/reportar-perdida", icon: reportlostIcon }, // ruta en español
    { name: "Mascotas Perdidas", path: "/mascotas-perdidas", icon: perdidaIcon }, // ruta en español
    { name: "Adopciones", path: "/adopciones", icon: adopcionIcon },
  ];

  // Mostrar "Administrar QR" solo si el usuario tiene el email específico
  if (isLoggedIn && user?.email === "walterguillermopared@gmail.com") {
    sections.push({ name: "Administrar QR", path: "/administrar-qr", icon: administrarQRIcon }); // Agregar la nueva página
    sections.push({ name: "Panel Admin", path: "/admin", icon: adminIcon });
    sections.push({ name: "Cargar Producto", path: "/cargar-producto", icon: agregarIcon });
  }

  return (
    <>
      {/* Barra inferior estilo mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-between px-6 py-2 bg-white shadow-inner md:justify-around">
        <button
          onClick={() => setIsMenuOpen(true)}
          className="flex flex-col items-center justify-center text-gray-700 transition hover:scale-110"
          aria-label="Abrir menú"
        >
          <img src={menuIcon} alt="Menú" className="w-6 h-6" />
          <span className="text-xs">Menú</span>
        </button>

        {isLoggedIn && (
          <button
            onClick={() => navigate("/profile")}
            className="flex flex-col items-center justify-center text-gray-700 transition hover:scale-110"
            aria-label="Ir a perfil"
          >
            <img src={perfilIcon} alt="Perfil" className="w-6 h-6" />
            <span className="text-xs">Perfil</span>
          </button>
        )}
      </nav>

      {/* Fondo oscuro al abrir el menú */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 z-40 transition-opacity bg-black bg-opacity-50 backdrop-blur-sm"
          aria-hidden="true"
        />
      )}

      {/* Menú deslizable desde abajo */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-lg transform transition-transform duration-300 ${
          isMenuOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "60vh", overflowY: "auto" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="menu-title"
      >
        <div className="p-5">
          <h3
            id="menu-title"
            className="mb-4 text-lg font-semibold text-center text-gray-700"
          >
            📱 Menú rápido
          </h3>

          <div className="grid grid-cols-3 gap-4">
            {sections.map(({ name, path, icon }) => (
              <button
                key={name}
                onClick={() => {
                  navigate(path);
                  setIsMenuOpen(false);
                }}
                className="flex flex-col items-center justify-center p-3 transition bg-gray-100 rounded-xl hover:bg-blue-100"
                aria-label={`Ir a ${name}`}
              >
                <img src={icon} alt={name} className="w-8 h-8 mb-1" />
                <span className="text-xs text-center">{name}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsMenuOpen(false)}
            className="w-full py-2 mt-6 text-white transition bg-red-500 rounded hover:bg-red-600"
            aria-label="Cerrar menú"
          >
            Cerrar menú
          </button>
        </div>
      </div>
    </>
  );
}
