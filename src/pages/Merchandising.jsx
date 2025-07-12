import React from "react";

const Merchandising = () => (
  <section className="px-6 py-8 bg-[#111111] min-h-screen">
    <h2 className="mb-8 text-3xl font-extrabold tracking-wide text-center text-violet-400">
      Merchandising Oficial
    </h2>

    <div className="max-w-4xl mx-auto space-y-10">
      {/* Producto actual (Remeras / Gorras) */}
      <div className="p-6 bg-[#1a1a1a] rounded-2xl shadow-lg hover:shadow-violet-600/50 transition-shadow duration-300 text-center">
        <h3 className="mb-3 text-2xl font-semibold text-violet-300">
          Remeras y Gorras VAPE.AR
        </h3>
        <p className="max-w-xl mx-auto mb-6 text-sm leading-relaxed text-gray-300">
          Estilo urbano con diseños únicos para la comunidad vaper. Alta calidad y comodidad.
        </p>
        <img
          src="https://cvzhpgstiuclkavfidpu.supabase.co/storage/v1/object/public/avatar/gorra-vapear.jpg"
          alt="Gorra y remera con logo de VAPE.AR"
          className="object-cover mx-auto border-4 shadow-md rounded-xl w-52 h-52 border-violet-500"
        />
        <div className="mt-8">
          <a
            href="https://wa.me/5491133380557?text=Hola,%20quiero%20comprar%20merch%20de%20VAPE.AR"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 font-semibold text-black transition transform rounded-full shadow-lg bg-violet-400 hover:bg-violet-500 active:scale-95"
          >
            Comprar por WhatsApp
          </a>
        </div>
      </div>

      {/* Producto futuro (Pines, calcos, bolsos, etc.) */}
      <div className="p-6 bg-[#1a1a1a] rounded-2xl shadow-lg hover:shadow-violet-600/50 transition-shadow duration-300 text-center">
        <h3 className="mb-3 text-2xl font-semibold text-violet-300">
          Accesorios Exclusivos
        </h3>
        <p className="max-w-xl mx-auto mb-6 text-sm leading-relaxed text-gray-300">
          Próximamente: pines, stickers, bolsos y más artículos coleccionables para mostrar tu estilo vaper.
        </p>
        <img
          src="https://cvzhpgstiuclkavfidpu.supabase.co/storage/v1/object/public/avatar/pines-vapear.jpg"
          alt="Pines y accesorios VAPE.AR"
          className="object-cover mx-auto border-4 shadow-md rounded-xl w-52 h-52 border-violet-500"
        />
      </div>
    </div>
  </section>
);

export default Merchandising;
