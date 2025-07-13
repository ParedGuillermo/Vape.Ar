import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";  // Asegúrate de importar AuthProvider
import { CartProvider } from "./components/CartContext"; // Cambio aquí

// Importa los componentes desde VapeCommunity
import VapeCommunity from "./pages/VapeCommunity"; 
import SaludYSeguridad from "./components/VapeCommunity/SaludYSeguridad";  // Página SaludYSeguridad añadida
import Entrenamiento from "./components/VapeCommunity/NovedadesYTendencias";
import ReseñasDeProductos from "./components/VapeCommunity/ReseñasDeProductos"; // Página añadida
import ComunidadYForos from "./components/VapeCommunity/ComunidadYForos";  // Asegúrate de que el archivo exista
import EstilosDeVidaYVapeo from "./components/VapeCommunity/EstilosDeVidaYVapeo"; // Página añadida
import NovedadesYTendencias from "./components/VapeCommunity/NovedadesYTendencias"; // Asegúrate de que el archivo exista
import EventosYEncuentros from "./components/VapeCommunity/EventosYEncuentros"; // Página añadida
import LegislacionYRegulacion from "./components/VapeCommunity/LegislacionYRegulacion"; // Página añadida
import GuiasYTutoriales from "./components/VapeCommunity/GuiasYTutoriales"; // Asegúrate de que el archivo exista
import BlogPage from "./components/VapeCommunity/BlogPage"; // Asegúrate de que el archivo exista 
import TiendaYProductos from "./components/VapeCommunity/TiendaYProductos"; // Asegúrate de que el archivo exista

// Importar la nueva página Colaboraciones
import Colaboraciones from "./pages/Colaboraciones";

// Importar otras páginas y componentes
import CargarProducto from "./pages/CargarProductos";
import Merchandising from "./pages/Merchandising";
import TiendaDetalle from "./pages/TiendaDetalle";
import Home from "./pages/Home";
import Adminblog from "./pages/Adminblog";
import Adopciones from "./pages/Adopciones";
import LostPets from "./pages/LostPets";
import MedicalHistory from "./pages/MedicalHistory";
import Pets from "./pages/Pets";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Scan from "./pages/Scan";
import ScheduleAppointment from "./pages/ScheduleAppointment";
import Tiendas from "./pages/Tiendas";
import Nosotros from "./pages/Nosotros";
// Componentes adicionales
import BottomNav from "./components/BottomNav";
import AvatarSelector from "./components/AvatarSelector";
import CartModal from "./components/CartModal";
import FeaturedPets from "./components/FeaturedPets";
import HeroSection from "./components/HeroSection";
import HeroNosotros from "./components/HeroNosotros";
import HeroVapeCommunity from "./components/HeroVapeCommunity";
import LostPetsMap from "./components/LostPetsMap";
import ModalEditarArticulo from "./components/ModalEditarArticulo";
import ModalRegistrarArticulo from "./components/ModalRegistrarArticulo";
import ReportLostPets from "./components/ReportLostPets";
import EsencialesCarousel from "./components/EsencialesCarousel";
import Admin from "./pages/AdminPanel"; 

// Estilos
import "./App.css";
import "./index.css";

function App() {
  return (
    <Router>
      {/* Envolviendo las rutas con AuthProvider */}
      <AuthProvider>
        {/* Envolviendo el CartProvider */}
        <CartProvider>
          <Routes>
            {/* Rutas principales */}
            <Route path="/" element={<Home />} />
            <Route path="/adminblog" element={<Adminblog />} />
            <Route path="/cargar-producto" element={<CargarProducto />} />
            <Route path="/merchandising" element={<Merchandising />} />
            <Route path="/vape-community" element={<VapeCommunity />} />
            <Route path="/vape-community/comunidad-y-foros" element={<ComunidadYForos />} />
            <Route path="/vape-community/reseñas-de-productos" element={<ReseñasDeProductos />} />
            <Route path="/vape-community/estilos-de-vida-y-vapeo" element={<EstilosDeVidaYVapeo />} />
            <Route path="/vape-community/salud-y-seguridad" element={<SaludYSeguridad />} />
            <Route path="/vape-community/novedades-y-tendencias" element={<NovedadesYTendencias />} />
            <Route path="/vape-community/eventos-y-encuentros" element={<EventosYEncuentros />} />
            <Route path="/vape-community/legislacion-y-regulacion" element={<LegislacionYRegulacion />} />
            <Route path="/vape-community/guias-y-tutoriales" element={<GuiasYTutoriales />} />
            <Route path="/vape-community/blog" element={<BlogPage />} />
            <Route path="/vape-community/tienda-y-productos" element={<TiendaYProductos />} />

            {/* Nueva ruta para Colaboraciones */}
            <Route path="/colaboraciones" element={<Colaboraciones />} />

            <Route path="/admin" element={<Admin />} />

            {/* Otras rutas */}
            <Route path="/entrenamiento" element={<Entrenamiento />} />
            <Route path="/tiendas/:id" element={<TiendaDetalle />} /> {/* RUTA CORREGIDA */}
            <Route path="/adopciones" element={<Adopciones />} />
            <Route path="/lost-pets" element={<LostPets />} />
            <Route path="/medical-history" element={<MedicalHistory />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="/schedule-appointment" element={<ScheduleAppointment />} />
            <Route path="/tiendas" element={<Tiendas />} />
            <Route path="/nosotros" element={<Nosotros />} />

            {/* Otros componentes */}
            <Route path="/featured-pets" element={<FeaturedPets />} />
            <Route path="/hero-section" element={<HeroSection />} />
            <Route path="/lost-pets-map" element={<LostPetsMap />} />
            <Route path="/modal-editar-articulo" element={<ModalEditarArticulo />} />
            <Route path="/modal-registrar-articulo" element={<ModalRegistrarArticulo />} />
            <Route path="/report-lost-pets" element={<ReportLostPets />} />
            <Route path="/hero-vape-community" element={<HeroVapeCommunity />} />
            <Route path="/hero-nosotros" element={<HeroNosotros />} />
            <Route path="/esenciales-carousel" element={<EsencialesCarousel />} />
          </Routes>

          {/* Componente de navegación inferior */}
          <BottomNav />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
