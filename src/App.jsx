import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
// import Scan from "./pages/Scan"; // Comentado temporalmente
// import Adopciones from "./pages/Adopciones"; // Comentado temporalmente
import AdminPanel from "./pages/AdminPanel";
import AdminBlog from "./pages/Adminblog";
import Tiendas from "./pages/Tiendas";
import TiendaDetalle from "./pages/TiendaDetalle";
import CargarProducto from "./pages/CargarProductos";
// import ReportLostPets from "./components/ReportLostPets"; // Comentado temporalmente
// import LostPets from "./pages/LostPets"; // Comentado temporalmente
// import AdministrarQR from "./components/AdministrarQR"; // Comentado para omentar
import VapeCommunity from "./components/VapeCommunity";
import Salud from "./components/VapeCommunity/Salud";
import Entrenamiento from "./components/VapeCommunity/Entrenamiento";
import Historias from "./components/VapeCommunity/Historias";
import Eventos from "./components/VapeCommunity/Eventos";
import Recursos from "./components/VapeCommunity/Recursos";
import SuccessStories from "./components/SuccessStories";
import Merchandising from "./pages/Merchandising"; // ✅ NUEVO IMPORT

import BottomNav from "./components/BottomNav";
import { CartProvider } from "./components/CartContext";
import CartModal from "./components/CartModal";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="w-full min-h-screen p-0 m-0">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/adopciones" element={<Adopciones />} /> */}
              <Route path="/tiendas" element={<Tiendas />} />
              <Route path="/tiendas/:id" element={<TiendaDetalle />} />
              <Route path="/vape-community" element={<VapeCommunity />} />
              <Route path="/merchandising" element={<Merchandising />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* <Route path="/reportar-perdida" element={<ReportLostPets />} /> */}
              {/* <Route path="/mascotas-perdidas" element={<LostPets />} /> */}
              <Route path="/vape-community/salud" element={<Salud />} />
              <Route path="/vape-community/entrenamiento" element={<Entrenamiento />} />
              {/* <Route path="/vape-community/historias" element={<Historias />} /> */}
              <Route path="/vape-community/eventos" element={<Eventos />} />
              <Route path="/vape-community/recursos" element={<Recursos />} />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              {/* <Route path="/scan" element={<ProtectedRoute><Scan /></ProtectedRoute>} /> */}
              <Route
                path="/cargar-producto"
                element={
                  <ProtectedRoute>
                    <CargarProducto />
                  </ProtectedRoute>
                }
              />
              {/* <Route path="/administrar-qr" element={<ProtectedRoute><AdministrarQR /></ProtectedRoute>} /> */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/adminblog"
                element={
                  <ProtectedRoute>
                    <AdminBlog />
                  </ProtectedRoute>
                }
              />
              <Route path="/casos-exito" element={<SuccessStories />} />
            </Routes>
          </div>

          {isCartOpen && (
            <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          )}

          <BottomNav onCartClick={() => setIsCartOpen(true)} />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
