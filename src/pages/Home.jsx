import React from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection"; // Hero principal
import HeroVapeCommunity from "../components/HeroVapeCommunity"; // Hero para VapeCommunity
import HeroNosotros from "../components/HeroNosotros"; // Hero para VapeCommunity
import { useAuth } from "../hooks/useAuth";
import logo from "../assets/home/icon.png"; // Logo importado

export default function Home() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-b from-very-dark-bg to-dark-bg sm:px-6 sm:py-12">

      {/* Header con Logo y Botones de Login / Registro */}
      <header className="flex items-center justify-between mb-12">
        {/* Logo con texto debajo */}
        <div className="flex flex-col items-center space-y-2">
          <img src={logo} alt="Logo" className="w-16 h-16 sm:w-20 sm:h-20" />
          <span className="text-xl font-bold sm:text-2xl text-light-gray">Vape.AR</span>
        </div>

        {/* Botones de Iniciar sesión y Registrarse */}
        {!isLoggedIn && (
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-3 text-lg font-semibold rounded-full bg-electric-blue text-very-dark-bg border-4 border-electric-blue shadow-[0_0_6px_1px rgba(42,127,255,0.6)] hover:bg-violet-neon hover:border-violet-neon hover:shadow-[0_0_8px_3px rgba(157,78,221,0.8)] focus:outline-none focus-visible:ring-2 sm:focus-visible:ring-4 focus-visible:ring-violet-neon active:scale-95 transition"
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-6 py-3 text-lg font-semibold rounded-full bg-violet-neon text-very-dark-bg border-4 border-violet-neon shadow-[0_0_6px_1px rgba(157,78,221,0.6)] hover:bg-electric-blue hover:border-electric-blue hover:shadow-[0_0_8px_3px rgba(42,127,255,0.8)] focus:outline-none focus-visible:ring-2 sm:focus-visible:ring-4 focus-visible:ring-electric-blue active:scale-95 transition"
            >
              Registrarse
            </button>
          </div>
        )}
      </header>

      {/* Hero principal */}
      <div className="mb-12">
        <HeroSection onReportClick={() => navigate('/reportar-perdida')} />
      </div>

      {/* Nuevo Hero para VapeCommunity */}
      <div className="mb-12">
        <HeroVapeCommunity onReportClick={() => navigate('/vape-community')} />
      </div>
      
        {/* Nuevo Hero para Nosotros */}
      <div className="mb-12">
        <HeroNosotros onReportClick={() => navigate('/Nosotros')} />
      </div>
    

    </div>
  );
}
