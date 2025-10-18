import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Product } from "../api/pApi";
import { useCart } from "../context/CartContext";
import { LoadingScreen } from "../components/LoadingScreen";
import axios from "axios";

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Product>(`http://localhost:8080/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error(err);
        setError("Producto no encontrado");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <LoadingScreen />;
  if (!product) return <p className="text-center mt-10">Producto no encontrado</p>;

  const handleAddToCart = () => {
    addToCart({ product, quantity }); // ✅ estructura correcta de CartItem
  };

  const increment = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (!isNaN(val) && val >= 1 && val <= product.stock) {
      setQuantity(val);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 mt-8">
      <img
        src={product.photo || "https://via.placeholder.com/400x300?text=Sin+imagen"}
        alt={product.name}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h2 className="text-2xl font-semibold mt-4">{product.name}</h2>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p className="text-xl font-bold text-red-600 mt-3">${product.price}</p>
      <p className="text-gray-500 mt-1">Categoría: {product.category}</p>
      <p className="text-gray-500 mt-1">Stock: {product.stock}</p>

      <div className="mt-4 flex items-center gap-3 justify-center">
        <button
          onClick={decrement}
          className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300"
        >
          -
        </button>
        <input
          type="number"
          min={1}
          max={product.stock}
          value={quantity}
          onChange={handleQuantityChange}
          className="border rounded-lg px-3 py-1 w-20 text-center appearance-none"
        />
        <button
          onClick={increment}
          className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300"
        >
          +
        </button>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleAddToCart}
          className="bg-gradient-to-r from-red-600 to-yellow-400 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transform transition duration-300 hover:scale-105 hover:brightness-110"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default Detail;