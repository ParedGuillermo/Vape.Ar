import React from "react";
import { useParams } from "react-router-dom";

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

export default function TiendaDetalle() {
  const { id } = useParams();
  const tienda = tiendasSimuladas.find((t) => t.id === parseInt(id));

  if (!tienda) {
    return (
      <div className="flex items-center justify-center min-h-screen text-violet-neon font-poppins">
        <p>Tienda no encontrada.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl min-h-screen px-6 py-8 mx-auto bg-very-dark-bg text-violet-neon font-poppins">
      <h1 className="mb-4 text-4xl font-extrabold text-center text-electric-blue drop-shadow-neon-blue">
        {tienda.nombre}
      </h1>
      <img
        src={tienda.logo_url}
        alt={tienda.nombre}
        className="w-40 h-40 mx-auto mb-6 rounded-full"
      />
      <p className="mb-6 text-center">{tienda.descripcion}</p>
      <a
        href={tienda.link_externo}
        target="_blank"
        rel="noopener noreferrer"
        className="block px-6 py-3 mx-auto font-semibold text-center rounded w-max text-dark-bg bg-violet-neon hover:bg-violet-700"
      >
        Visitar sitio externo
      </a>
      {/* Aquí podrías agregar lista de productos o más info */}
    </div>
  );
}
