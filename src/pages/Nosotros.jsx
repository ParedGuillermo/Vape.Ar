import React from "react";
import HeroNosotros from "../components/HeroNosotros";
import { useNavigate } from "react-router-dom";
import logo from "../assets/home/icon.png";

const Nosotros = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-very-dark-bg text-light-gray font-poppins pb-[90px]">
      
      {/* Logo de VAPE.AR */}
      <div className="flex justify-center py-10">
        <img
          src={logo}
          alt="Logo de VAPE.AR"
          className="transition-transform duration-300 h-25 w-25 sm:w-28 sm:h-25 drop-shadow-xl animate-pulse hover:scale-90"
        />
      </div>

      {/* Sección sobre el proyecto */}
      <section className="px-6 py-16 text-center">
        <h2 className="mb-6 text-3xl font-bold sm:text-4xl text-neon-pink">¿Quiénes somos?</h2>
        <p className="max-w-3xl mx-auto mb-8 text-lg sm:text-xl text-neon-cyan">
          En VAPE.AR, somos un proyecto dedicado a ofrecer una alternativa saludable al tabaco a través del vapeo. Nuestra misión es educar y ofrecer un espacio donde los usuarios encuentren productos de calidad, sin los riesgos asociados a la combustión.
        </p>
        <p className="max-w-3xl mx-auto mb-12 text-lg sm:text-xl text-neon-cyan">
          Creemos que el vapeo es una herramienta útil para quienes desean dejar de fumar, sin los peligros del tabaco tradicional. Nuestro objetivo es construir una comunidad responsable y contribuir a la educación sobre los beneficios del vapeo.
        </p>
      </section>

      {/* Sección de beneficios */}
      <section className="px-6 py-16 text-center bg-dark-gray">
        <h2 className="mb-6 text-3xl font-bold sm:text-4xl text-neon-pink">Beneficios de asociarte</h2>
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
        <h2 className="mb-6 text-3xl font-bold sm:text-4xl text-neon-pink">¿Cómo asociarte?</h2>
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
            <strong className="text-white">Sube tus productos:</strong> Agrega tus productos al catálogo de Vape.AR para que nuestros usuarios los conozcan y te contacten.
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
        <h2 className="mb-6 text-3xl font-bold sm:text-4xl text-neon-pink">¡Contáctanos!</h2>
        <p className="max-w-3xl mx-auto mb-8 text-lg sm:text-xl text-neon-cyan">
          Si tienes alguna duda o necesitas más información sobre cómo formar parte de nuestra plataforma, no dudes en ponerte en contacto con nosotros. ¡Estamos para ayudarte!
        </p>
        <button
          onClick={() =>
            window.open("https://wa.me/3718652061?text=Hola,%20me%20gustaría%20colaborar%20con%20ustedes.", "_blank")
          }
          className="px-8 py-4 text-lg font-semibold text-white transition bg-neon-pink rounded-xl hover:bg-violet-neon focus:outline-none focus:ring-2 focus:ring-violet-500 active:scale-95"
        >
          Enviar mensaje
        </button>
      </section>

      {/* Información legal y política de uso */}
      <section className="px-6 py-12 text-center">
        <h2 className="mb-6 text-2xl font-bold text-neon-pink">Política y Legal</h2>
        <p className="max-w-3xl mx-auto mb-4 text-sm text-gray-400">
          VAPE.AR es una plataforma informativa y comunitaria. No vendemos productos directamente, sino que alojamos tiendas y colaboraciones para fomentar el acceso responsable al vapeo.
        </p>
        <p className="max-w-3xl mx-auto mb-4 text-sm text-gray-400">
          Al utilizar nuestra plataforma, aceptás que cualquier transacción o consulta sobre productos se realiza directamente con el vendedor a través de medios externos como WhatsApp.
        </p>
        <p className="max-w-3xl mx-auto mb-4 text-sm text-gray-400">
          VAPE.AR no se hace responsable por los productos ofrecidos ni por las comunicaciones que se realicen fuera del entorno del sitio. Para más detalles, consultá nuestros{" "}
          <span className="underline cursor-pointer text-violet-400 hover:text-violet-200">
            Términos y Condiciones
          </span>
          .
        </p>
        <p className="max-w-3xl mx-auto mt-4 text-xs text-gray-600">
          © {new Date().getFullYear()} VAPE.AR – Todos los derechos reservados.
        </p>
      </section>
    </div>
  );
};

export default Nosotros;
