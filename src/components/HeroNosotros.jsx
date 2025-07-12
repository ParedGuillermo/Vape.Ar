import React from "react";
import { useNavigate } from "react-router-dom";

const HeroNosotros = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[450px] bg-gradient-to-r from-[#0a0a0a] to-[#121212] text-light-gray py-16 px-6 text-center rounded-lg shadow-lg">
      {/* Fondo de imagen o gradiente */}
      <div className="absolute inset-0 z-0 bg-black rounded-lg opacity-40"></div>

      {/* Contenido del Hero */}
      <div className="relative z-10">
        <h1 className="mb-6 text-4xl font-extrabold text-electric-blue sm:text-5xl">
          Nuestra Misión y Visión
        </h1>
        <p className="max-w-lg mx-auto mb-10 text-lg sm:text-xl text-neon-cyan">
          En vAPE.AR buscamos brindar información veraz sobre el vapeo, sus beneficios y cómo puede ser una alternativa más saludable para aquellos que desean dejar de fumar. Creemos que el vapeo es una herramienta que ayuda a dejar el cigarrillo tradicional, sin generar fumadores pasivos ni causar la combustión dañina de los cigarrillos convencionales.
        </p>

        <p className="max-w-lg mx-auto mb-10 text-lg sm:text-xl text-neon-cyan">
          Nuestro proyecto tiene como objetivo crear una comunidad que promueva el bienestar, la salud y el intercambio de experiencias entre los usuarios del vapeo. Apostamos por un negocio rentable, duradero y sostenible que permita traer a más personas al mundo del vapeo de forma responsable.
        </p>

        {/* Botón CTA */}
        <button
          onClick={() => navigate("/nosotros")}
          className="px-8 py-4 mx-auto text-lg font-semibold text-white transition bg-neon-pink rounded-xl hover:bg-violet-neon focus:outline-none focus:ring-2 focus:ring-violet-500 active:scale-95"
        >
          Contacta con Nosotros
        </button>
      </div>

      {/* Opcional: Fondo o decoración adicional */}
      <div className="absolute inset-x-0 bottom-0 z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 1440 320"
          className="w-full"
        >
          <path
            fill="#121212"
            d="M0,128L48,160C96,192,192,256,288,256C384,256,480,192,576,181.3C672,171,768,213,864,213.3C960,213,1056,171,1152,144C1248,117,1344,107,1392,101.3L1440,96V0H1392C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0H0Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroNosotros;
