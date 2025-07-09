// src/pages/LostPetsMap.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { supabase } from "../supabaseClient";
import L from "leaflet";

// Corrección de íconos de Leaflet
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix iconos
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function LostPetsMap() {
  const [avistamientos, setAvistamientos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvistamientos = async () => {
      const { data, error } = await supabase
        .from("mascotas_perdidas")
        .select("*")
        .eq("estado", "perdida");

      if (error) {
        console.error("Error cargando avistamientos", error);
      } else {
        setAvistamientos(data);
      }
      setLoading(false);
    };

    fetchAvistamientos();
  }, []);

  return (
    <div className="h-screen">
      {loading ? (
        <p className="p-4 text-center text-gray-500">Cargando mapa...</p>
      ) : (
        <MapContainer
          center={[-27.4748, -58.8341]} // Corrientes Capital
          zoom={13}
          scrollWheelZoom
          className="z-0 w-full h-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />

          {avistamientos.length === 0 ? null : avistamientos.map((mascota) => {
            const [lat, lng] = mascota.ubicacion?.split(",").map(Number) || [];
            if (!lat || !lng || isNaN(lat) || isNaN(lng)) return null;

            return (
              <Marker key={mascota.id} position={[lat, lng]}>
                <Popup>
                  <div className="text-sm max-w-[200px]">
                    <strong>{mascota.nombre}</strong> ({mascota.tipo_mascota})<br />
                    <span className="text-xs italic text-gray-600">
                      {mascota.color} - {mascota.raza}
                    </span><br />
                    <p className="mt-1 text-xs text-gray-800">{mascota.descripcion}</p>
                    <p className="mt-2 text-xs"><strong>Contacto:</strong> {mascota.contacto}</p>
                    {mascota.foto_url && (
                      <img
                        src={mascota.foto_url}
                        alt={mascota.nombre}
                        className="w-full mt-2 rounded shadow-sm"
                      />
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      )}
    </div>
  );
}
