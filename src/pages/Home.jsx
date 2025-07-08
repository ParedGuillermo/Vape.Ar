import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedPets from '../components/FeaturedPets';
import EsencialesCarousel from '../components/EsencialesCarousel';
import LostPetsMap from '../components/LostPetsMap';
import QuickGuide from '../components/QuickGuide';
import SuccessStories from '../components/SuccessStories';
import TrackingDevices from '../components/TrackingDevices';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-br from-green-100 via-blue-100 to-purple-100">
      {/* Hero */}
      <HeroSection onReportClick={() => navigate('/reportar-perdida')} />

      {/* Botón para escanear código QR */}
      <section className="flex justify-center px-6 py-6">
        <button
          onClick={() => navigate('/scan')}
          className="w-full max-w-xs px-6 py-4 text-lg font-semibold text-white transition bg-blue-600 rounded-full hover:bg-blue-700"
          aria-label="Escanear código QR"
          type="button"
        >
          Escanear código QR
        </button>
      </section>

      {/* Botones de login y registro (si no está logueado) */}
      {!isLoggedIn && (
        <section className="flex justify-center gap-4 px-6 py-4 mb-8">
          <button
            onClick={() => navigate('/login')}
            className="flex-1 max-w-xs px-5 py-3 text-lg font-semibold text-center text-white transition bg-green-600 rounded-full hover:bg-green-700"
            type="button"
          >
            Iniciar sesión
          </button>
          <button
            onClick={() => navigate('/register')}
            className="flex-1 max-w-xs px-5 py-3 text-lg font-semibold text-center text-white transition bg-purple-600 rounded-full hover:bg-purple-700"
            type="button"
          >
            Registrarse
          </button>
        </section>
      )}

      {/* Mascotas Destacadas */}
      <section className="px-6 py-8 bg-white shadow-md rounded-t-xl">
        <h2 className="mb-4 text-xl font-bold text-center">Mascotas Destacadas</h2>
        <FeaturedPets />
      </section>

      {/* Productos Esenciales */}
      <section className="px-6 py-8 mt-6 shadow-sm bg-gray-50 rounded-xl">
        <h2 className="mb-4 text-xl font-bold text-center">Productos Esenciales</h2>
        <EsencialesCarousel />
      </section>

      {/* Mapa de Avistamientos */}
      <section className="px-6 py-8 mt-6 bg-white shadow-md rounded-xl">
        <h2 className="mb-4 text-xl font-bold text-center">Mapa de Avistamientos</h2>
        <LostPetsMap />
      </section>

      {/* Guía Rápida */}
      <section className="px-6 py-8 mt-6 shadow-sm bg-gray-50 rounded-xl">
        <h2 className="mb-4 text-xl font-bold text-center">Guía Rápida</h2>
        <QuickGuide />
      </section>

      {/* Casos de Éxito */}
      <section className="px-6 py-8 mt-6 bg-white shadow-md rounded-xl">
        <h2 className="mb-4 text-xl font-bold text-center">Casos de Éxito</h2>
        <SuccessStories />
      </section>

      {/* Dispositivos de Rastreo */}
      <section className="px-6 py-8 mt-6 mb-12 shadow-sm bg-gray-50 rounded-b-xl">
        <h2 className="mb-4 text-xl font-bold text-center">Dispositivos de Rastreo</h2>
        <TrackingDevices />
      </section>
    </div>
  );
}
