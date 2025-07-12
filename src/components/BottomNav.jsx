import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // Importa el hook de autenticación
import { useCart } from "../components/CartContext";

// Íconos
import menuIcon from "../assets/home/menu-de-hamburguesa-icon.png";
import homeIcon from "../assets/home/home-icon.png";
import tiendaIcon from "../assets/home/tienda-icon.png";
import perfilIcon from "../assets/home/perfil-icon.png";
import adminIcon from "../assets/home/admin-icon.png";
import agregarIcon from "../assets/home/agregar-icon.png";
import petSocietyIcon from "../assets/home/pet-society-icon.png";
import adminBlogIcon from "../assets/home/admin-blog-icon.png";

import CartModal from "./CartModal";

export default function BottomNav({ onCartClick }) {
  const { isLoggedIn, user } = useAuth();
  const { totalQuantity } = useCart();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuView, setMenuView] = useState("sections");

  const sections = [
    { name: "Inicio", path: "/", icon: homeIcon },
    { name: "Tiendas", path: "/tiendas", icon: tiendaIcon },
    { name: "Merchandising", path: "/merchandising", icon: agregarIcon },
    { name: "Vape Community", path: "/vape-community", icon: petSocietyIcon },
  ];

  if (isLoggedIn && user?.email === "walterguillermopared@gmail.com") {
    sections.push(
      { name: "Panel Admin", path: "/admin", icon: adminIcon },
      { name: "Admin Blog", path: "/adminblog", icon: adminBlogIcon },
      { name: "Cargar Producto", path: "/cargar-producto", icon: agregarIcon }
    );
  }

  const openMenuSections = () => {
    setMenuView("sections");
    setIsMenuOpen(true);
  };

  const openMenuCart = () => {
    setMenuView("cart");
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setTimeout(() => setMenuView("sections"), 300);
  };

  const bottomButtons = [
    {
      label: "Menú",
      icon: menuIcon,
      onClick: openMenuSections,
    },
    // Agregamos el botón de Perfil siempre, pero con lógica diferente si el usuario no está logueado
    {
      label: "Perfil",
      icon: perfilIcon,
      onClick: () => {
        if (isLoggedIn) {
          navigate("/profile"); // Si el usuario está logueado, va al perfil
        } else {
          navigate("/login"); // Si no está logueado, va a login
        }
        closeMenu();
      },
    },
  ];

  return (
    <>
      {/* Barra inferior */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around px-3 py-2 bg-[#121212] border-t border-violet-700">
        {bottomButtons.map((btn, idx) => (
          <button
            key={idx}
            onClick={btn.onClick}
            className="relative flex flex-col items-center justify-center text-white transition hover:text-violet-400 hover:scale-110"
            aria-label={btn.label}
          >
            {btn.isSvg ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 6h13m-7-6v6"
                />
              </svg>
            ) : (
              <img src={btn.icon} alt={btn.label} className="w-6 h-6" />
            )}
            {btn.badge > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {btn.badge}
              </span>
            )}
            <span className="text-xs select-none">{btn.label}</span>
          </button>
        ))}
      </nav>

      {/* Fondo modal */}
      {isMenuOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 z-40 bg-black bg-opacity-70 backdrop-blur-sm"
          aria-hidden="true"
        />
      )}

      {/* Menú deslizante */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-[#1a1a1a] rounded-t-3xl shadow-lg transform transition-transform duration-300 ${
          isMenuOpen ? "translate-y-0" : "translate-y-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="menu-title"
        style={{ maxHeight: "90vh" }}
      >
        <div className="p-5 overflow-y-auto max-h-[90vh]">
          <h3
            id="menu-title"
            className="mb-4 text-lg font-semibold text-center select-none text-violet-400"
          >
            {menuView === "sections" ? "📱 Menú rápido" : "🛒 Tu carrito"}
          </h3>

          {menuView === "sections" ? (
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))" }}
            >
              {sections.map(({ name, path, icon }) => (
                <button
                  key={name}
                  onClick={() => {
                    navigate(path);
                    closeMenu();
                  }}
                  className="flex flex-col items-center justify-center p-3 transition bg-[#222222] rounded-xl hover:bg-violet-800 hover:shadow-violet-600/50 focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  <img src={icon} alt={name} className="w-8 h-8 mb-1" />
                  <span className="text-xs text-center text-white select-none">{name}</span>
                </button>
              ))}
              {/* Mostrar el botón de Perfil siempre, pero redirigir a Login si no está logueado */}
              <button
                onClick={() => {
                  if (isLoggedIn) {
                    navigate("/profile"); // Si el usuario está logueado, redirigir al perfil
                  } else {
                    navigate("/login"); // Si no está logueado, redirigir al login
                  }
                  closeMenu();
                }}
                className="flex flex-col items-center justify-center p-3 transition bg-[#222222] rounded-xl hover:bg-violet-800 hover:shadow-violet-600/50 focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <img src={perfilIcon} alt="Perfil" className="w-8 h-8 mb-1" />
                <span className="text-xs text-center text-white select-none">Perfil</span>
              </button>
            </div>
          ) : (
            <CartModal onClose={closeMenu} />
          )}

          <button
            onClick={closeMenu}
            className="w-full py-2 mt-6 text-white transition bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Cerrar menú
          </button>
        </div>
      </div>
    </>
  );
}
