import React from "react";
import { useCart } from "../components/CartContext";

export default function CartModal({ onClose }) {
  const { cartItems, removeFromCart, clearCart } = useCart();

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
    <div className="px-2">
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600"></p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-semibold">{item.nombre}</p>
                  <p className="text-sm text-gray-600">Cantidad: {item.cantidad}</p>
                  <p className="text-sm text-gray-600">
                    Precio unitario: ${item.precio.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Eliminar ${item.nombre} del carrito`}
                  className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4 font-semibold text-right text-gray-800">
            Total: $
            {cartItems
              .reduce((total, item) => total + item.cantidad * item.precio, 0)
              .toFixed(2)}
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-3 text-center text-white transition bg-green-600 rounded hover:bg-green-700"
            >
              Enviar pedido por WhatsApp
            </a>

            <button
              onClick={clearCart}
              className="block py-3 text-center text-gray-700 transition bg-gray-300 rounded hover:bg-gray-400"
            >
              Vaciar carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
}
