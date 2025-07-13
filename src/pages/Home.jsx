import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "../components/HeroSection";
import HeroVapeCommunity from "../components/HeroVapeCommunity";
import HeroNosotros from "../components/HeroNosotros";
import { useAuth } from "../hooks/useAuth";
import logo from "../assets/home/icon.png";

export default function Home() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-b from-very-dark-bg to-dark-bg sm:px-6 sm:py-12">
      {/* Header dinámico */}
      <header className="relative flex flex-col items-center w-full mb-12">
        {/* Logo con scale animado */}
        <motion.img
          src={logo}
          alt="Logo"
          initial={{ scale: 1 }}
          animate={{ scale: scrolled ? 0.75 : 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-24 h-24 sm:w-28 sm:h-28"
        />

        {/* Texto con fade + slide desde la derecha */}
        <AnimatePresence>
          {scrolled && (
            <motion.span
              key="vape-ar-text"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.6 }}
              className="absolute top-1/2 left-[calc(50%+4rem)] -translate-y-1/2 text-light-gray font-bold text-2xl"
            >
              Vape.AR
            </motion.span>
          )}
        </AnimatePresence>

        {/* Botones visibles solo antes del scroll */}
        {!isLoggedIn && !scrolled && (
          <div className="flex flex-col items-center gap-4 mt-6 sm:flex-row">
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 text-lg font-semibold rounded-full bg-electric-blue text-very-dark-bg border-4 border-electric-blue shadow-[0_0_6px_1px_rgba(42,127,255,0.6)] hover:bg-violet-neon hover:border-violet-neon hover:shadow-[0_0_8px_3px_rgba(157,78,221,0.8)] focus:outline-none focus-visible:ring-2 sm:focus-visible:ring-4 focus-visible:ring-violet-neon active:scale-95 transition"
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-3 text-lg font-semibold rounded-full bg-violet-neon text-very-dark-bg border-4 border-violet-neon shadow-[0_0_6px_1px_rgba(157,78,221,0.6)] hover:bg-electric-blue hover:border-electric-blue hover:shadow-[0_0_8px_3px_rgba(42,127,255,0.8)] focus:outline-none focus-visible:ring-2 sm:focus-visible:ring-4 focus-visible:ring-electric-blue active:scale-95 transition"
            >
              Registrarse
            </button>
          </div>
        )}
      </header>

      {/* Hero principal */}
      <div className="mb-12">
        <HeroSection onReportClick={() => navigate("/reportar-perdida")} />
      </div>

      {/* Hero Vape Community */}
      <div className="mb-12">
        <HeroVapeCommunity onReportClick={() => navigate("/vape-community")} />
      </div>

      {/* Hero Nosotros */}
      <div className="mb-12">
        <HeroNosotros onReportClick={() => navigate("/Nosotros")} />
      </div>

      {/* Tarjeta de visibilidad para colaboradores */}
      <section
        onClick={() => navigate("/colaboraciones")}
        className="cursor-pointer p-6 mb-12 bg-gradient-to-r from-[#e94560] via-[#d63447] to-[#bb2e3f] rounded-xl shadow-lg text-white max-w-4xl mx-auto hover:scale-[1.03] transition-transform"
        aria-label="Invitación a colaborar y aparecer en la página principal"
      >
        <h2 className="mb-3 text-3xl font-extrabold drop-shadow-lg">
          ¿Querés aparecer en la página principal?
        </h2>
        <p className="mb-4 text-lg drop-shadow-md">
          Aumentá la visibilidad de tu marca o producto aportando para análisis, reviews o colaborando con Vape.AR. 
          ¡Sumate a nuestra comunidad y hacé crecer tu alcance!
        </p>
        <button
          type="button"
          className="px-6 py-3 font-semibold text-[#e94560] bg-white rounded-full hover:bg-gray-100 transition"
          onClick={(e) => {
            e.stopPropagation();
            navigate("/colaboraciones");
          }}
        >
          Colaborar ahora
        </button>
      </section>

      {/* Tarjeta para descargar la App Android */}
      <section className="p-6 mt-12 text-center text-white border border-gray-700 shadow-md bg-dark-gray rounded-xl">
        <h2 className="mb-4 text-3xl font-bold text-electric-blue">Descargá la App de VAPE.AR</h2>
        <p className="mb-4 text-lg text-gray-300">
          Llevá VAPE.AR en tu celular. Explorá productos, hacé pedidos y descubrí tiendas desde cualquier lugar.
        </p>
        <a
          href="https://github.com/ParedGuillermo/Vape.Ar/releases/download/V1/VAPE-AR-0_4_debug.apk"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 font-semibold transition rounded-full shadow-lg text-very-dark-bg bg-electric-blue hover:bg-violet-neon"
        >
          Descargar App Android
        </a>

        {/* Instrucciones para instalar la APK */}
        <div className="mt-6 text-sm text-left text-gray-400 max-w-xl mx-auto bg-[#1e1e1e] p-4 rounded-md border border-gray-600">
          <p className="mb-2 font-semibold text-violet-neon">⚠ Instrucciones de instalación:</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>1. Al descargar, tu celular puede mostrar un mensaje de advertencia.</li>
            <li>2. Tocá <strong>"Descargar de todos modos"</strong> si aparece.</li>
            <li>3. Al abrir el archivo, seleccioná <strong>"Instalar"</strong>.</li>
            <li>4. Si te pide analizar la app, podés hacerlo o continuar.</li>
            <li>5. Luego tocá <strong>"Instalar"</strong> nuevamente.</li>
            <li>6. Una vez completada la instalación, tocá <strong>"Abrir"</strong> y empezá a usar VAPE.AR.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
