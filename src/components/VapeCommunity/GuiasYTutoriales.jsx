import React from "react";

export default function GuiasYTutoriales() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-gray-300">
      {/* Título de la página */}
      <h1 className="mb-6 text-center text-3xl font-extrabold text-[#e94560] drop-shadow-md">
        Guías y Tutoriales de Vapeo
      </h1>

      {/* Sección de Introducción */}
      <section className="mb-8">
        <p className="text-center text-[#c9d1d9]">
          El vapeo puede parecer complicado al principio, pero con las guías y tutoriales correctos, puedes aprender todo lo que necesitas para disfrutar de una experiencia segura y placentera. Aquí te proporcionamos tutoriales útiles para iniciarte y mejorar tu técnica de vapeo.
        </p>
      </section>

      {/* Sección de Guía para Principiantes */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#e94560] mb-4">Guía para Principiantes</h2>
        <p className="text-[#c9d1d9] mb-4">
          Si eres nuevo en el mundo del vapeo, esta guía es para ti. A continuación, te mostramos algunos pasos básicos para empezar:
        </p>
        <ul className="list-disc pl-6 text-[#c9d1d9]">
          <li>Elige tu dispositivo de vapeo: considera un pod system o un mod si buscas más control.</li>
          <li>Selecciona el líquido adecuado: los líquidos varían en sabor y concentración de nicotina, asegúrate de elegir el que más se ajuste a tu preferencia.</li>
          <li>Aprende a llenar el cartucho: cada dispositivo tiene una forma diferente de llenarse, así que sigue las instrucciones del fabricante.</li>
          <li>Enciende tu dispositivo: asegúrate de conocer cómo se enciende y apaga tu dispositivo para evitar accidentes.</li>
        </ul>
      </section>

      {/* Sección de Tutorial sobre Cómo Limpiar tu Dispositivo */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#e94560] mb-4">Cómo Limpiar tu Dispositivo de Vapeo</h2>
        <p className="text-[#c9d1d9] mb-4">
          Mantener limpio tu dispositivo de vapeo es esencial para su funcionamiento y para asegurar una mejor experiencia de vapeo. Aquí tienes algunos pasos para limpiarlo correctamente:
        </p>
        <ol className="list-decimal pl-6 text-[#c9d1d9]">
          <li>Apaga tu dispositivo y retira el cartucho o tanque.</li>
          <li>Usa un paño suave o algodón para limpiar el exterior del dispositivo y la boquilla.</li>
          <li>Si tu dispositivo es desmontable, limpia el tanque o el cartucho con agua tibia y déjalo secar completamente antes de usarlo de nuevo.</li>
          <li>Evita el uso de productos químicos agresivos que puedan dañar el dispositivo.</li>
        </ol>
      </section>

      {/* Sección de Tutorial sobre Técnicas de Vapeo */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#e94560] mb-4">Técnicas de Vapeo</h2>
        <p className="text-[#c9d1d9] mb-4">
          El vapeo no solo se trata de inhalar, sino también de disfrutar la experiencia. Aquí tienes algunas técnicas para mejorar tu experiencia:
        </p>
        <ul className="list-disc pl-6 text-[#c9d1d9]">
          <li><strong>Técnica de Vapeo Directo a los Pulmones (DL):</strong> Este método consiste en inhalar directamente el vapor hacia los pulmones, ideal para dispositivos con mayor producción de vapor.</li>
          <li><strong>Técnica de Boca a Pulmón (MTL):</strong> Imita la experiencia de fumar un cigarro, inhalando el vapor en la boca antes de llevarlo a los pulmones, perfecto para dispositivos de baja producción de vapor.</li>
          <li><strong>Control de Temperatura:</strong> Algunos dispositivos permiten ajustar la temperatura, lo que te permite personalizar tu experiencia de vapeo según tus preferencias.</li>
        </ul>
      </section>

      {/* Sección de Seguridad y Mantenimiento */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#e94560] mb-4">Seguridad y Mantenimiento</h2>
        <p className="text-[#c9d1d9] mb-4">
          La seguridad siempre debe ser una prioridad. Aquí hay algunos consejos para mantener tu dispositivo en buen estado y usarlo de manera segura:
        </p>
        <ul className="list-disc pl-6 text-[#c9d1d9]">
          <li>No uses líquidos que no sean compatibles con tu dispositivo.</li>
          <li>Carga el dispositivo solo con el cargador proporcionado por el fabricante.</li>
          <li>Almacena tu dispositivo en un lugar seguro y evita caídas.</li>
          <li>Cambia la bobina de tu dispositivo de vapeo regularmente para mantener un sabor fresco y evitar daños al dispositivo.</li>
        </ul>
      </section>

      {/* Sección de Conclusión */}
      <section className="mt-8">
        <p className="text-center text-[#c9d1d9]">
          El vapeo puede parecer intimidante al principio, pero con la práctica y el conocimiento adecuado, se convierte en una experiencia agradable y satisfactoria. Mantente informado y seguro mientras disfrutas de tu vapeo.
        </p>
      </section>
    </div>
  );
}
