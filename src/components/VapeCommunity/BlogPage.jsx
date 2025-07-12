import React from "react";

export default function BlogPage() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-gray-300">
      {/* Título de la página */}
      <h1 className="mb-6 text-center text-3xl font-extrabold text-[#e94560] drop-shadow-md">
        Blog sobre Vapeo
      </h1>

      {/* Introducción */}
      <section className="mb-8">
        <p className="text-center text-[#c9d1d9]">
          Bienvenido al blog donde podrás encontrar artículos, noticias y recursos sobre el mundo del vapeo. Desde consejos para principiantes hasta tendencias y regulaciones, aquí aprenderás todo lo necesario para mejorar tu experiencia de vapeo.
        </p>
      </section>

      {/* Lista de artículos del blog */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Artículo 1 */}
        <div className="bg-[#16213e] p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-[#e94560] mb-2">Introducción al Vapeo</h2>
          <p className="text-[#c9d1d9] mb-4">
            Si eres nuevo en el mundo del vapeo, este artículo es para ti. Aquí te explicamos todo lo que necesitas saber para comenzar tu experiencia de vapeo con seguridad y facilidad.
          </p>
          <a
            href="/vape-community/introduccion-al-vapeo"
            className="text-[#e94560] hover:text-[#c9d1d9] transition-colors"
          >
            Leer más
          </a>
        </div>

        {/* Artículo 2 */}
        <div className="bg-[#16213e] p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-[#e94560] mb-2">Últimas Tendencias en el Mundo del Vapeo</h2>
          <p className="text-[#c9d1d9] mb-4">
            ¿Quieres estar al tanto de las últimas tendencias? Este artículo cubre los nuevos dispositivos, líquidos y estilos de vapeo que están ganando popularidad en 2023.
          </p>
          <a
            href="/vape-community/tendencias-vapeo-2023"
            className="text-[#e94560] hover:text-[#c9d1d9] transition-colors"
          >
            Leer más
          </a>
        </div>

        {/* Artículo 3 */}
        <div className="bg-[#16213e] p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-[#e94560] mb-2">Regulaciones sobre el Vapeo en Argentina</h2>
          <p className="text-[#c9d1d9] mb-4">
            Las regulaciones sobre el vapeo están cambiando constantemente. Este artículo te ofrece un vistazo a las leyes más recientes en Argentina y cómo afectan a los consumidores.
          </p>
          <a
            href="/vape-community/regulaciones-vapeo-argentina"
            className="text-[#e94560] hover:text-[#c9d1d9] transition-colors"
          >
            Leer más
          </a>
        </div>

        {/* Artículo 4 */}
        <div className="bg-[#16213e] p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-[#e94560] mb-2">Cómo Mantener tu Dispositivo de Vapeo</h2>
          <p className="text-[#c9d1d9] mb-4">
            Un dispositivo bien cuidado ofrece una experiencia de vapeo mucho más agradable. Aquí te damos consejos sobre cómo mantener y limpiar tu vapeador.
          </p>
          <a
            href="/vape-community/mantener-dispositivo-vapeo"
            className="text-[#e94560] hover:text-[#c9d1d9] transition-colors"
          >
            Leer más
          </a>
        </div>

        {/* Artículo 5 */}
        <div className="bg-[#16213e] p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-[#e94560] mb-2">La Ciencia Detrás del Vapeo</h2>
          <p className="text-[#c9d1d9] mb-4">
            ¿Te has preguntado cómo funciona el vapeo? En este artículo, desglosamos la ciencia detrás del proceso de vaporización y cómo el vapor se genera.
          </p>
          <a
            href="/vape-community/ciencia-del-vapeo"
            className="text-[#e94560] hover:text-[#c9d1d9] transition-colors"
          >
            Leer más
          </a>
        </div>

        {/* Artículo 6 */}
        <div className="bg-[#16213e] p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-[#e94560] mb-2">Vapeo y Salud: Lo que Necesitas Saber</h2>
          <p className="text-[#c9d1d9] mb-4">
            El vapeo y la salud es un tema debatido. Este artículo te brinda información sobre los estudios más recientes relacionados con el vapeo y sus posibles efectos en la salud.
          </p>
          <a
            href="/vape-community/vapeo-y-salud"
            className="text-[#e94560] hover:text-[#c9d1d9] transition-colors"
          >
            Leer más
          </a>
        </div>
      </section>

      {/* Conclusión */}
      <section className="mt-12 text-center">
        <p className="text-[#c9d1d9]">
          Estos son solo algunos de los artículos disponibles en nuestro blog. No olvides seguirnos para estar al tanto de todas las novedades y recursos relacionados con el vapeo.
        </p>
      </section>
    </div>
  );
}
