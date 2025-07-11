import React from "react";
import { useNavigate } from "react-router-dom";

const tiendasSimuladas = [
  {
    id: 1,
    nombre: "Vape Store CABA",
    descripcion: "Tu tienda de vapeo en Buenos Aires, con los mejores precios y marcas.",
    logo_url: "https://i.ibb.co/5cDmyQw/vapestore-logo.png",
    link_externo: "https://www.instagram.com/vapestorecaba/",
  },
  {
    id: 2,
    nombre: "Cloud Vapers",
    descripcion: "Especialistas en líquidos y dispositivos para vapeo en Argentina.",
    logo_url: "https://i.ibb.co/DGsdYQk/cloudvapers-logo.png",
    link_externo: "https://cloudvapers.com.ar",
  },
  {
    id: 3,
    nombre: "Vape Shop Rosario",
    descripcion: "Tu punto de referencia para vapeo en Rosario. Calidad y atención.",
    logo_url: "https://i.ibb.co/k2XmRM2/vapeshop-logo.png",
    link_externo: "https://www.facebook.com/vapeshoprosario",
  },
];

export default function Tiendas() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-6 py-8 bg-very-dark-bg text-violet-neon font-poppins">
      <h1 className="mb-8 text-3xl font-extrabold text-center text-electric-blue drop-shadow-neon-blue">
        Tiendas Colaboradoras 🛍️
      </h1>

      <div className="grid max-w-4xl gap-6 mx-auto md:grid-cols-2">
        {tiendasSimuladas.map(({ id, nombre, descripcion, logo_url }) => (
          <div
            key={id}
            className="flex flex-col items-center p-6 transition-colors border rounded-lg cursor-pointer bg-dark-bg shadow-neon-violet border-violet-neon hover:bg-violet-neon hover:text-dark-bg hover:shadow-neon-purple"
          >
            <img
              src={logo_url}
              alt={nombre}
              className="object-contain w-24 h-24 mb-4 rounded-full"
            />
            <h2 className="mb-2 text-xl font-semibold text-center">{nombre}</h2>
            <p className="text-sm text-center">{descripcion}</p>
            <button
              className="px-4 py-2 mt-4 transition rounded text-dark-bg bg-violet-neon hover:bg-violet-700"
              onClick={() => navigate(`/tiendas/${id}`)}
            >
              Visitar Tienda
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
