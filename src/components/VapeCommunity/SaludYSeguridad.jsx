import React from "react";

export default function SaludYSeguridad() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-gray-300">
      {/* Título de la página */}
      <h1 className="mb-6 text-center text-3xl font-extrabold text-[#e94560] drop-shadow-md">
        Salud y Seguridad en el Vapeo
      </h1>

      {/* Sección de Introducción */}
      <section className="mb-8">
        <p className="text-center text-[#c9d1d9]">
          El vapeo es una actividad que ha crecido rápidamente en los últimos años. Aunque se considera una alternativa menos perjudicial que fumar cigarrillos tradicionales, es importante tener en cuenta los aspectos de salud y seguridad relacionados con el uso de estos dispositivos.
        </p>
      </section>

      {/* Sección de Riesgos */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#e94560] mb-4">Riesgos para la Salud</h2>
        <ul className="list-disc pl-6 text-[#c9d1d9]">
          <li>Posibles efectos negativos en los pulmones.</li>
          <li>Riesgo de adicción debido a la nicotina.</li>
          <li>Riesgos asociados a la exposición a químicos en los líquidos.</li>
          <li>Potencial para dañar la salud cardiovascular.</li>
        </ul>
      </section>

      {/* Sección de Consejos de Seguridad */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#e94560] mb-4">Consejos de Seguridad</h2>
        <ul className="list-disc pl-6 text-[#c9d1d9]">
          <li>Usa siempre líquidos de calidad, preferentemente de fuentes confiables.</li>
          <li>Guarda el dispositivo de vapeo fuera del alcance de los niños.</li>
          <li>No dejes el dispositivo cargando sin supervisión.</li>
          <li>Asegúrate de mantener el equipo limpio y en buen estado.</li>
        </ul>
      </section>

      {/* Sección de Estudios y Referencias */}
      <section>
        <h2 className="text-2xl font-semibold text-[#e94560] mb-4">Estudios y Referencias</h2>
        <p className="text-[#c9d1d9]">
          Existen varios estudios que han analizado los efectos del vapeo en la salud. A continuación, se mencionan algunos estudios clave:
        </p>
        <ul className="list-decimal pl-6 text-[#c9d1d9]">
          <li>Estudio de la American Heart Association sobre los efectos del vapeo.</li>
          <li>Investigación publicada en el Journal of the American Medical Association.</li>
          <li>Estudio de la OMS sobre los riesgos del vapeo para los jóvenes.</li>
        </ul>
      </section>

      {/* Sección de Conclusión */}
      <section className="mt-8">
        <p className="text-center text-[#c9d1d9]">
          Si bien el vapeo puede ser menos dañino que fumar, es fundamental tener precauciones y estar informados sobre sus riesgos. Siempre es recomendable consultar con un profesional de la salud antes de tomar decisiones sobre el uso de productos de vapeo.
        </p>
      </section>
    </div>
  );
}
