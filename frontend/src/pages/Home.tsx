import React, { useState } from "react";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import { useProductsApi } from "../hooks/useProducts"; // 
import { LoadingScreen } from "../components/LoadingScreen"; // Pantalla de carga
import { useParams, useNavigate } from "react-router-dom";
import { categoryMap } from "../utils/CategoryMap";

const Home = () => {
  const [search, setSearch] = useState("");
  const { products, loading, error, refresh } = useProductsApi(); // usamos la API real
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();

  const filtered = products
  .filter((p) => {
    if (!categoryName) return true; // 
    const apiCategory = categoryMap[categoryName]; 
    return p.category === apiCategory;
  })
  .filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );


  const handleAddProduct = () => {
    navigate("/add-product"); // redirige a la página de agregar producto
  };

  // Loading
  if (loading) return <LoadingScreen />;

  // Error
  if (error) return <p className="text-red-600 text-center mt-10">{error}</p>;

  return (
    <div className="flex flex-col w-full h-full overflow-y-auto pt-[96px] pb-[100px] px-4">
      {/* Botón agregar producto */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleAddProduct}
          className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-5 py-2 rounded-lg font-semibold hover:from-orange-500 hover:to-red-600 transition-all shadow-md"
        >
          + Agregar producto
        </button>
      </div>

      {/* Buscador */}
      <div className="mb-6 sticky top-0 bg-gray-50 z-10 p-2 rounded-md shadow-sm">
        <SearchBar search={search} setSearch={setSearch} />
      </div>

      {/* Título */}
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Catálogo de productos
      </h2>

      {/* Lista de productos */}
      <ProductList products={filtered} />
    </div>
  );
};

export default Home;

