import React from "react";

export default function NovedadesYTendencias() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-gray-300">
      {/* Título de la página */}
      <h1 className="mb-6 text-center text-3xl font-extrabold text-[#e94560] drop-shadow-md">
        Novedades y Tendencias en el Vapeo
      </h1>

      {/* Sección de Introducción */}
      <section className="mb-8">
        <p className="text-center text-[#c9d1d9]">
          El mundo del vapeo está en constante evolución. Con nuevas tecnologías y productos que surgen regularmente, es fundamental mantenerse al día con las últimas tendencias para disfrutar de la mejor experiencia posible.
        </p>
      </section>

      {/* Sección de Nuevos Dispositivos */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#e94560] mb-4">Nuevos Dispositivos de Vapeo</h2>
        <p className="text-[#c9d1d9] mb-4">
          Los dispositivos de vapeo siguen mejorando en términos de rendimiento, facilidad de uso y diseño. Algunos de los nuevos dispositivos en el mercado incluyen:
        </p>
        <ul className="list-disc pl-6 text-[#c9d1d9]">
          <li>Vapeadores de cápsulas recargables con control de temperatura.</li>
          <li>Modos de vapeo personalizables con aplicaciones móviles para ajustes.</li>
          <li>Dispositivos de pod system con menor cantidad de líquidos y mayor eficiencia.</li>
        </ul>
      </section>

      {/* Sección de Sabores Emergentes */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#e94560] mb-4">Sabores Emergentes</h2>
        <p className="text-[#c9d1d9] mb-4">
          En el mundo de los líquidos para vapeo, los sabores continúan siendo un aspecto importante de la experiencia. Algunas de las tendencias emergentes incluyen:
        </p>
        <ul className="list-disc pl-6 text-[#c9d1d9]">
          <li>Sabores de frutas exóticas y tropicales, como pitaya y maracuyá.</li>
          <li>Combinaciones de sabores dulces y salados, como caramelo con tocino.</li>
          <li>Sabores inspirados en bebidas alcohólicas, como cócteles y licores.</li>
        </ul>
      </section>

      {/* Sección de Tendencias en el Diseño de Dispositivos */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#e94560] mb-4">Tendencias en el Diseño de Dispositivos</h2>
        <p className="text-[#c9d1d9] mb-4">
          Los dispositivos de vapeo han evolucionado no solo en tecnología, sino también en su diseño. Algunas de las principales tendencias incluyen:
        </p>
        <ul className="list-disc pl-6 text-[#c9d1d9]">
          <li>Diseños más compactos y portátiles para un uso más discreto.</li>
          <li>Materiales como el aluminio y el acero inoxidable para una mayor durabilidad y estética.</li>
          <li>Modos de personalización de colores y acabados, permitiendo a los usuarios tener un dispositivo único.</li>
        </ul>
      </section>

      {/* Sección de Prevención y Regulaciones */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#e94560] mb-4">Prevención y Regulaciones</h2>
        <p className="text-[#c9d1d9] mb-4">
          Las regulaciones sobre el vapeo están cambiando en todo el mundo, con el fin de garantizar la seguridad de los usuarios. Algunos de los enfoques clave incluyen:
        </p>
        <ul className="list-disc pl-6 text-[#c9d1d9]">
          <li>Regulaciones más estrictas sobre la comercialización de productos de vapeo a menores de edad.</li>
          <li>Restricciones en el uso de saborizantes artificiales en líquidos de vapeo.</li>
          <li>Exigencia de pruebas más rigurosas en dispositivos y líquidos para garantizar la calidad.</li>
        </ul>
      </section>

      {/* Sección de Conclusión */}
      <section className="mt-8">
        <p className="text-center text-[#c9d1d9]">
          Las tendencias en el mundo del vapeo están en constante cambio, y es emocionante ver la innovación que trae consigo. Mantente informado sobre las últimas novedades y disfruta del vapeo de manera responsable y segura.
        </p>
      </section>
    </div>
  );
}
