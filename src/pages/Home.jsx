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
    </div>
  );
}
