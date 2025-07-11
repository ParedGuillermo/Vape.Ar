import React from "react";
import { useCart } from "../components/CartContext";

export default function CartModal({ isOpen, onClose }) {
  const { cartItems, removeFromCart, clearCart } = useCart();

  if (!isOpen) return null; // 👈 Evita renderizar cuando está cerrado

  const whatsappMessage = cartItems.length
    ? `Hola! Quiero hacer el siguiente pedido:\n` +
      cartItems
        .map(
          (item, idx) =>
            `${idx + 1}. ${item.nombre} - Cantidad: ${item.cantidad} - Precio unitario: $${item.precio}`
        )
        .join("\n") +
      `\n\nTotal: $${cartItems
        .reduce((total, item) => total + item.cantidad * item.precio, 0)
        .toFixed(2)}`
    : "Hola! No tengo productos en el carrito.";

  const whatsappUrl = `https://wa.me/5491133380557?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md p-4 mx-auto text-gray-200 rounded-lg shadow-xl bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
        <button
          onClick={onClose}
          className="absolute px-3 py-1 text-sm font-bold text-white bg-red-600 rounded top-4 right-4 hover:bg-red-700"
        >
          ✕
        </button>

        {cartItems.length === 0 ? (
          <p className="py-6 font-semibold text-center text-violet-400">
            No hay productos en el carrito.
          </p>
        ) : (
          <>
            <ul className="overflow-y-auto divide-y divide-violet-700 max-h-72">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between py-3"
                >
                  <div>
                    <p className="font-semibold text-violet-300">
                      {item.nombre}
                    </p>
                    <p className="text-sm text-violet-400">
                      Cantidad: {item.cantidad}
                    </p>
                    <p className="text-sm text-violet-400">
                      Precio unitario: ${item.precio.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Eliminar ${item.nombre} del carrito`}
                    className="px-3 py-1 text-sm text-black transition bg-red-400 rounded hover:bg-red-500"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-5 text-lg font-bold text-right text-violet-300">
              Total: $
              {cartItems
                .reduce(
                  (total, item) => total + item.cantidad * item.precio,
                  0
                )
                .toFixed(2)}
            </div>

            <div className="flex flex-col gap-3 mt-6">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-3 font-semibold text-center text-black transition bg-green-400 rounded hover:bg-green-500"
              >
                Enviar pedido por WhatsApp
              </a>

              <button
                onClick={clearCart}
                className="block py-3 font-semibold text-center text-gray-800 transition bg-gray-300 rounded hover:bg-gray-400"
              >
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
