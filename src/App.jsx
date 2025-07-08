import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Scan from "./pages/Scan";
import Adopciones from "./pages/Adopciones";
import AdminPanel from "./pages/AdminPanel";
import Productos from "./pages/Productos";
import CargarProducto from "./pages/CargarProductos";
import ReportLostPets from "./components/ReportLostPets";
import LostPets from "./pages/LostPets";
import AdministrarQR from "./components/AdministrarQR"; // Nueva importación
import BottomNav from "./components/BottomNav";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="pb-20">
          <Routes>
            {/* Páginas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/adopciones" element={<Adopciones />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reportar-perdida" element={<ReportLostPets />} />
            <Route path="/mascotas-perdidas" element={<LostPets />} />

            {/* Páginas protegidas */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/scan"
              element={
                <ProtectedRoute>
                  <Scan />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cargar-producto"
              element={
                <ProtectedRoute>
                  <CargarProducto />
                </ProtectedRoute>
              }
            />

            {/* Nueva página Administrar QR */}
            <Route
              path="/administrar-qr"
              element={
                <ProtectedRoute>
                  <AdministrarQR />
                </ProtectedRoute>
              }
            />

            {/* Panel Admin protegido */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <BottomNav />
      </BrowserRouter>
    </AuthProvider>
  );
}
