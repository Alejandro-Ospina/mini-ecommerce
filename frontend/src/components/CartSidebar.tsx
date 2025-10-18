import { useCart } from "../context/CartContext";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const TAX_RATE = 0.19;

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Cálculo de subtotal, impuesto y total
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  // Manejo de la compra
  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    const paymentHistory = {
      purchaseDate: new Date().toISOString(),
      subtotal,
      total,
      tax,
      products: cart.map((item) => ({ id: item.product.id })),
      productQuantities: Object.fromEntries(
        cart.map((item) => [item.product.id, item.quantity])
      ),
    };

    try {
      const response = await fetch("http://localhost:8080/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentHistory),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error al procesar la compra.");
      }

      setErrorMessage(null);
      clearCart();
      setShowModal(true);
    } catch (error: any) {
      console.error("Error al procesar la compra:", error);
      if (error.message?.includes("stock")) {
        setErrorMessage("No hay suficiente stock para uno o más productos.");
      } else {
        setErrorMessage("Error al procesar la compra. Intenta nuevamente.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Fondo difuminado */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        style={{
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(255,255,255,0.5)",
        }}
      ></div>

      {/* Sidebar */}
      <div className="fixed top-0 right-0 w-96 h-full bg-white text-black shadow-xl z-50 transform transition-transform duration-300 rounded-l-2xl flex flex-col">
        {/* Título */}
        <div className="p-4 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-t-2xl flex justify-between items-center">
          <h2 className="text-xl font-bold">🛒 Tu Carrito</h2>
          <button
            onClick={onClose}
            className="text-white text-lg font-bold hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        {/* Contenido */}
        <div className="p-4 flex-1 overflow-y-auto space-y-4">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">
              No hay productos en el carrito
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-3 border-b border-gray-200 pb-2"
              >
                <img
                  src={item.product.photo || "https://via.placeholder.com/150"}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-red-600 font-bold">
                    ${item.product.price.toFixed(2)}
                  </p>

                  {/* Control cantidad */}
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, Math.max(1, item.quantity - 1))
                      }
                      className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      min={1}
                      max={item.product.stock}
                      onChange={(e) =>
                        updateQuantity(
                          item.product.id,
                          Math.min(
                            item.product.stock,
                            Math.max(1, Number(e.target.value))
                          )
                        )
                      }
                      className="w-12 text-center border rounded px-1 py-0.5 appearance-none"
                    />
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          Math.min(item.product.stock, item.quantity + 1)
                        )
                      }
                      className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Eliminar */}
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-red-600 hover:text-red-800 text-lg"
                  title="Eliminar"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Totales */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-gray-200 flex flex-col gap-2 bg-white">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>IVA (19%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {/* Error */}
            {errorMessage && (
              <p className="text-red-600 text-sm text-center">{errorMessage}</p>
            )}

            <button
              onClick={handleCheckout}
              className="w-full mt-2 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition transform hover:scale-105"
            >
              Pagar
            </button>
          </div>
        )}

        {/* Modal de confirmación */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 text-center shadow-lg max-w-sm mx-4">
              <h2 className="text-2xl font-bold mb-4">
                ¡Gracias por tu compra! 🎉
              </h2>
              <p className="mb-6">Tu pedido se ha procesado correctamente.</p>
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;