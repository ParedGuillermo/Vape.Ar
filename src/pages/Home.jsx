import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedPets from '../components/FeaturedPets';
import EsencialesCarousel from '../components/EsencialesCarousel';
import VapeCommunity from '../components/VapeCommunity';
import SuccessStories from '../components/SuccessStories';
import TrackingDevices from './Merchandising';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <div className="flex items-start justify-center min-h-screen p-6 bg-very-dark-bg">
      <div className="w-full max-w-4xl p-6 rounded-xl border-4 border-neon-pink shadow-[0_0_12px_2px_rgba(157,78,221,0.7)] bg-very-dark-bg font-poppins text-light-gray">

        {/* Hero con margen abajo para separar */}
        <div className="mb-12">
          <HeroSection onReportClick={() => navigate('/reportar-perdida')} />
        </div>

        {/* Login / Registro si no está logueado, con margen abajo */}
        {!isLoggedIn && (
          <section className="flex justify-center gap-4 py-4 mb-12">
            <button
              onClick={() => navigate('/login')}
              className="flex-1 max-w-xs px-5 py-3 text-lg font-semibold text-center rounded-full text-very-dark-bg bg-electric-blue shadow-[0_0_10px_2px_rgba(42,127,255,0.7)] hover:bg-violet-neon hover:shadow-[0_0_10px_4px_rgba(157,78,221,0.8)] focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-neon active:scale-95 transition"
              type="button"
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => navigate('/register')}
              className="flex-1 max-w-xs px-5 py-3 text-lg font-semibold text-center rounded-full text-very-dark-bg bg-violet-neon shadow-[0_0_10px_2px_rgba(157,78,221,0.7)] hover:bg-electric-blue hover:shadow-[0_0_10px_4px_rgba(42,127,255,0.8)] focus:outline-none focus-visible:ring-4 focus-visible:ring-electric-blue active:scale-95 transition"
              type="button"
            >
              Registrarse
            </button>
          </section>
        )}

        {/* Secciones resumen sin títulos ni botones */}
        {[{
          title: 'Productos Esenciales',
          onClick: () => navigate('/productos'),
          component: <EsencialesCarousel summary maxItems={5} />,
        },{
          title: 'VapeCommunity',
          onClick: () => navigate('/vape-comunity'),
          component: <VapeCommunity summary maxItems={3} />,
        },{
          title: 'Cambios de Vida',
          onClick: () => navigate('/casos-exito'),
          component: <SuccessStories summary maxItems={3} />,
        },{
          title: 'Dispositivos de Rastreo',
          onClick: () => navigate('/dispositivos'),
          component: <TrackingDevices summary maxItems={5} />,
        }].map(({component}, index) => (
          <section
            key={index}
            className="px-4 py-6 mb-6 shadow-md bg-light-gray/10 rounded-xl last:mb-12 last:rounded-b-xl"
          >
            {component}
          </section>
        ))}

      </div>
    </div>
  );
}
