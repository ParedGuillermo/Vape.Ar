import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useCart } from "../components/CartContext"; // Importamos el hook

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("todos");
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart(); // Usamos el hook del carrito

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("productos").select("*");
      if (error) {
        console.error("Error al traer productos:", error.message);
      } else {
        setProductos(data);
      }
      setLoading(false);
    };
    fetchProductos();
  }, []);

  const productosPorCategoria = productos.reduce((acc, producto) => {
    const cat = producto.categoria || "Otros";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(producto);
    return acc;
  }, {});

  const filtrar = (lista) => {
    return lista.filter((producto) => {
      const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
      const coincideCategoria = categoriaFiltro === "todos" || producto.categoria === categoriaFiltro;
      return coincideBusqueda && coincideCategoria;
    });
  };

  return (
    <div className="min-h-screen p-4 pb-24 bg-purple-50">
      <h1 className="mb-4 text-3xl font-bold text-center text-purple-800">Tienda Pet Link 🛍️</h1>

      <div className="flex flex-col items-center gap-3 mb-6 sm:flex-row">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <select
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="todos">Todas las categorías</option>
          {[...new Set(productos.map((p) => p.categoria))].map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Cargando productos...</p>
      ) : (
        Object.entries(productosPorCategoria).map(([categoria, items]) => {
          const filtrados = filtrar(items);
          if (filtrados.length === 0) return null;
          return (
            <section key={categoria} className="mb-10">
              <h2 className="mb-2 text-xl font-semibold capitalize">{categoria}</h2>
              <div className="flex gap-4 pb-2 overflow-x-auto">
                {filtrados.map((producto) => (
                  <div
                    key={producto.id}
                    className="min-w-[220px] bg-white rounded shadow p-4 flex flex-col"
                  >
                    <img
                      src={producto.foto_url || "https://placehold.co/300x300?text=Producto"}
                      alt={producto.nombre}
                      className="object-cover w-full h-40 mb-3 rounded"
                    />
                    <h3 className="text-lg font-semibold text-purple-700">{producto.nombre}</h3>
                    <p className="mb-1 text-sm text-gray-600">{producto.descripcion}</p>
                    <p className="mb-2 text-base font-bold text-green-700">${producto.precio}</p>
                    <div className="flex flex-col gap-2 mt-auto">
                      <button
                        onClick={() => alert("Ver producto")}
                        className="py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                      >
                        Ver producto
                      </button>
                      <button
                        onClick={() => addToCart(producto)}
                        className="py-1 text-white bg-green-500 rounded hover:bg-green-600"
                      >
                        Agregar al carrito
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}
