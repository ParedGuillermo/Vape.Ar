import React from "react";
import HeroNosotros from "../components/HeroNosotros"; // Importa el Hero que ya creamos
import { useNavigate } from "react-router-dom";

const Nosotros = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-very-dark-bg text-light-gray font-poppins pb-[80px]">

      {/* Hero de la página */}
      <HeroNosotros />

      {/* Sección sobre el proyecto */}
      <section className="px-6 py-16 text-center">
        <h2 className="mb-6 text-3xl font-bold sm:text-4xl text-neon-pink">
          ¿Quiénes somos?
        </h2>
        <p className="max-w-3xl mx-auto mb-8 text-lg sm:text-xl text-neon-cyan">
          En VAPE.AR, somos un proyecto dedicado a ofrecer una alternativa saludable al tabaco a través del vapeo. Nuestra misión es educar y ofrecer un espacio donde los usuarios encuentren productos de calidad, sin los riesgos asociados a la combustión. 
        </p>
        <p className="max-w-3xl mx-auto mb-12 text-lg sm:text-xl text-neon-cyan">
          Creemos que el vapeo es una herramienta útil para quienes desean dejar de fumar, sin los peligros del tabaco tradicional. Nuestro objetivo es construir una comunidad responsable y contribuir a la educación sobre los beneficios del vapeo.
        </p>
      </section>

      {/* Sección de beneficios */}
      <section className="px-6 py-16 text-center bg-dark-gray">
        <h2 className="mb-6 text-3xl font-bold sm:text-4xl text-neon-pink">
          Beneficios de asociarte
        </h2>
        <p className="max-w-3xl mx-auto mb-8 text-lg sm:text-xl text-neon-cyan">
          Al asociarte con VAPE.AR, podrás acceder a una comunidad activa de usuarios interesados en productos de vapeo de calidad. Aquí te presentamos los principales beneficios:
        </p>
        <ul className="max-w-3xl mx-auto mb-8 text-left list-disc list-inside text-neon-cyan">
          <li className="mb-4">
            <strong className="text-white">Visibilidad y Alcance:</strong> Accede a un público fiel y creciente que busca productos de vapeo de calidad.
          </li>
          <li className="mb-4">
            <strong className="text-white">Comunidad activa:</strong> Únete a una comunidad de usuarios responsables y comprometidos con su bienestar.
          </li>
          <li className="mb-4">
            <strong className="text-white">Asesoría continua:</strong> Desde contenido educativo hasta ayuda para impulsar tu negocio dentro de nuestra plataforma.
          </li>
          <li className="mb-4">
            <strong className="text-white">Crecimiento constante:</strong> Estarás dentro de una plataforma en constante evolución, brindándote nuevas oportunidades a medida que crecemos.
          </li>
        </ul>
      </section>

      {/* Sección de cómo asociarse */}
      <section className="px-6 py-16 text-center">
        <h2 className="mb-6 text-3xl font-bold sm:text-4xl text-neon-pink">
          ¿Cómo asociarte?
        </h2>
        <p className="max-w-3xl mx-auto mb-8 text-lg sm:text-xl text-neon-cyan">
          Si eres un proveedor o tienda que quiere formar parte de nuestra plataforma, aquí te explicamos cómo comenzar:
        </p>
        <ul className="max-w-3xl mx-auto mb-8 text-left list-disc list-inside text-neon-cyan">
          <li className="mb-4">
            <strong className="text-white">Registro sencillo:</strong> Crea tu cuenta en nuestra plataforma y completa el formulario de inscripción.
          </li>
          <li className="mb-4">
            <strong className="text-white">Verificación de calidad:</strong> Validamos tu identidad y la calidad de los productos para ofrecer confianza a nuestros usuarios.
          </li>
          <li className="mb-4">
            <strong className="text-white">Sube tus productos:</strong> Agrega tus productos al catálogo de Vape.AR para que nuestros usuarios los conozcan y compren.
          </li>
          <li className="mb-4">
            <strong className="text-white">Personaliza tu perfil:</strong> Crea un perfil único para tu tienda, brindando una experiencia personalizada a los usuarios.
          </li>
        </ul>

        <button
          onClick={() => navigate("/register")}
          className="px-8 py-4 text-lg font-semibold text-white bg-neon-pink rounded-xl hover:bg-violet-neon focus:outline-none focus:ring-2 focus:ring-violet-500 active:scale-95"
        >
          Regístrate como vendedor
        </button>
      </section>

      {/* Sección de contacto */}
      <section className="px-6 py-12 text-center bg-dark-gray">
        <h2 className="mb-6 text-3xl font-bold sm:text-4xl text-neon-pink">
          ¡Contáctanos!
        </h2>
        <p className="max-w-3xl mx-auto mb-8 text-lg sm:text-xl text-neon-cyan">
          Si tienes alguna duda o necesitas más información sobre cómo formar parte de nuestra plataforma, no dudes en ponerte en contacto con nosotros. ¡Estamos para ayudarte!
        </p>
        <button
          onClick={() => window.open("https://wa.me/3718652061?text=Hola,%20me%20gustaría%20colaborar%20con%20ustedes.", "_blank")}
          className="px-8 py-4 text-lg font-semibold text-white transition bg-neon-pink rounded-xl hover:bg-violet-neon focus:outline-none focus:ring-2 focus:ring-violet-500 active:scale-95"
        >
          Enviar mensaje
        </button>
      </section>

    </div>
  );
};

export default Nosotros;
