import React, { useState } from "react";
import type { Product } from "../types/types";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((q) => Math.min(q + 1, product.stock));
  const decrement = () => setQuantity((q) => Math.max(q - 1, 1));

  const handleAddToCart = () => {
    addToCart({ product, quantity }); // 
    setQuantity(1); // 
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col">
      <img
        src={product.photo || "https://via.placeholder.com/300x200?text=Sin+imagen"}
        alt={product.name}
        className="h-48 w-full object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 flex-grow">{product.description}</p>
        <p className="text-lg font-bold text-red-600 mt-3 mb-2">${product.price}</p>

        {/* Controles de cantidad + ícono carrito */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={decrement}
              className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
            >
              -
            </button>
            <span className="px-3 py-1 border rounded-md w-10 text-center">{quantity}</span>
            <button
              onClick={increment}
              className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
            >
              +
            </button>
          </div>

          {/* Icono carrito */}
          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-red-600 to-orange-500 text-white p-3 rounded-md hover:from-orange-500 hover:to-red-600 transition-all"
          >
            <FaShoppingCart />
          </button>
        </div>

        {/* Botón de ver detalles */}
        <Link
          to={`/detalle/${product.id}`}
          className="block text-center bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition-all font-semibold"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
