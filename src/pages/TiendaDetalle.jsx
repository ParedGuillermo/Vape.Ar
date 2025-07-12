import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import BottomNav from "../components/BottomNav";  // Importar BottomNav

export default function TiendaDetalle() {
  const { id } = useParams(); // Obtener el ID de la tienda desde la URL
  const [tienda, setTienda] = useState(null);
  const [articulos, setArticulos] = useState([]); // Para almacenar los artículos de la tienda
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTiendaDetails() {
      setLoading(true);
      const { data: tiendaData, error: tiendaError } = await supabase
        .from("usuarios") // Consultar los datos de la tienda
        .select("*")
        .eq("id", id)
        .single();

      if (tiendaError) {
        console.error("Error al cargar la tienda:", tiendaError);
        setTienda(null);
      } else {
        setTienda(tiendaData);
      }

      // Consultar los artículos asociados a la tienda
      const { data: articulosData, error: articulosError } = await supabase
        .from("articulos") // Tabla que contiene los artículos
        .select("*")
        .eq("autor_id", id); // Filtrar los artículos por el autor_id (que es el id de la tienda)

      if (articulosError) {
        console.error("Error al cargar los artículos:", articulosError);
        setArticulos([]);
      } else {
        setArticulos(articulosData);
      }

      setLoading(false);
    }

    fetchTiendaDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center">Cargando tienda y artículos...</div>;
  }

  if (!tienda) {
    return <div className="text-center">Tienda no encontrada.</div>;
  }

  const sendWhatsAppMessage = (articuloTitulo) => {
    const telefono = tienda.telefono; // Asumiendo que el teléfono está guardado en la tienda
    const mensaje = `Hola, soy usuario de VAPE.AR y estoy interesado en el producto: ${articuloTitulo}. ¿Puedes brindarme más detalles?`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen px-6 py-8 pb-16 bg-very-dark-bg text-violet-neon font-poppins"> {/* Agregado el padding-bottom */}
      <h1 className="mb-8 text-3xl font-extrabold text-center text-electric-blue drop-shadow-neon-blue">
        {tienda.nombre_local || tienda.nombre}
      </h1>
      <div className="flex justify-center mb-6">
        <img
          src={tienda.avatar_url || "https://via.placeholder.com/160?text=Logo"}
          alt={tienda.nombre_local || tienda.nombre}
          className="w-40 h-40 rounded-full"
        />
      </div>
      {tienda.descripcion && (
        <p className="mb-8 text-center text-violet-300">{tienda.descripcion}</p>
      )}
      <p className="mb-4 text-center text-violet-400">
        {tienda.ciudad && tienda.provincia
          ? `${tienda.ciudad}, ${tienda.provincia}`
          : "Ubicación no disponible"}
      </p>

      {/* Mostrar los artículos de la tienda */}
      <h2 className="mb-6 text-2xl font-semibold text-center text-violet-neon">
        Artículos disponibles
      </h2>

      {articulos.length === 0 ? (
        <p className="text-center text-violet-400">No hay artículos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articulos.map((articulo) => (
            <div
              key={articulo.id}
              className="flex flex-col items-center p-6 border rounded-lg shadow-lg bg-neutral-800 border-violet-600"
            >
              <img
                src={articulo.imagen_url || "https://via.placeholder.com/150?text=Producto"}
                alt={articulo.titulo}
                className="object-cover w-full h-32 mb-3 rounded"
              />
              <h3 className="mb-1 text-lg font-semibold text-violet-400">{articulo.titulo}</h3>
              <p className="mb-2 text-sm text-violet-300">Precio: ${articulo.precio}</p>
              <button
                className="px-4 py-2 mt-auto text-white rounded bg-violet-600 hover:bg-violet-700"
                onClick={() => sendWhatsAppMessage(articulo.titulo)} // Usar la función para enviar mensaje
              >
                Contactar vía WhatsApp
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Aquí se coloca el BottomNav */}
      <BottomNav />
    </div>
  );
}
