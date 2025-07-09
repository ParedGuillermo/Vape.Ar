import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedPets from '../components/FeaturedPets';
import EsencialesCarousel from '../components/EsencialesCarousel';
// import LostPetsMap from '../components/LostPetsMap';
import PetSociety from '../components/PetSociety';
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

      {/* Mascotas Destacadas - Resumen */}
      <section className="px-6 py-8 bg-white shadow-md rounded-t-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-purple-800"></h2>
          <button
            onClick={() => navigate('/mascotas-destacadas')}
            className="text-sm font-semibold text-blue-600 hover:underline"
            type="button"
          >
            
          </button>
        </div>
        <FeaturedPets summary={true} maxItems={3} />
      </section>

      {/* Productos Esenciales - Resumen */}
      <section className="px-6 py-8 mt-6 shadow-sm bg-gray-50 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-purple-800"></h2>
          <button
            onClick={() => navigate('/productos')}
            className="text-sm font-semibold text-blue-600 hover:underline"
            type="button"
          >
            
          </button>
        </div>
        <EsencialesCarousel summary={true} maxItems={5} />
      </section>

      {/* Pet Society - Resumen */}
      <section className="px-6 py-8 mt-6 bg-white shadow-sm rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-purple-800"></h2>
          <button
            onClick={() => navigate('/pet-society')}
            className="text-sm font-semibold text-blue-600 hover:underline"
            type="button"
          >
            
          </button>
        </div>
        <PetSociety summary={true} maxItems={3} />
      </section>

      {/* Casos de Éxito - Resumen */}
      <section className="px-6 py-8 mt-6 shadow-md bg-gray-50 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-purple-800"></h2>
          <button
            onClick={() => navigate('/casos-exito')}
            className="text-sm font-semibold text-blue-600 hover:underline"
            type="button"
          >
            
          </button>
        </div>
        <SuccessStories summary={true} maxItems={3} />
      </section>

      {/* Dispositivos de Rastreo - Resumen */}
      <section className="px-6 py-8 mt-6 mb-12 bg-white shadow-sm rounded-b-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-purple-800"></h2>
          <button
            onClick={() => navigate('/dispositivos')}
            className="text-sm font-semibold text-blue-600 hover:underline"
            type="button"
          >
           
          </button>
        </div>
        <TrackingDevices summary={true} maxItems={5} />
      </section>
    </div>
  );
}
