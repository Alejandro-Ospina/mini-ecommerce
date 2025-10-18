import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { LoadingScreen } from "../components/LoadingScreen";

const categories = [
  "Electrodomésticos",
  "Tecnología",
  "Ropa Mujer",
  "Ropa Hombre",
  "Ropa Niños(as)",
  "Juguetes",
];

const AddProduct: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [category, setCategory] = useState(categories[0]);
  const [photo, setPhoto] = useState<string>("");

  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      // En una app real, aquí subirías la imagen a Cloudinary/Imgur/etc
      // y luego guardarías la URL en "photo"
      setPhoto(objectUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !category || !photo) {
      return setError("Por favor completa todos los campos obligatorios.");
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          price,
          stock,
          category,
          photo, // sigue siendo un string (URL)
        }),
      });

      if (!response.ok) throw new Error("Error al agregar el producto.");

      alert("Producto agregado correctamente!");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Hubo un problema al agregar el producto.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24 pb-24 px-4 container mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Agregar nuevo producto
        </h2>

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6 flex flex-col gap-4"
        >
          <label className="flex flex-col font-semibold">
            Nombre*:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </label>

          <label className="flex flex-col font-semibold">
            Descripción:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </label>

          <label className="flex flex-col font-semibold">
            Precio*:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </label>

          <label className="flex flex-col font-semibold">
            Stock:
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              className="mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </label>

          <label className="flex flex-col font-semibold">
            Categoría*:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col font-semibold">
            Imagen del producto:
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </label>

          {preview && (
            <div className="mt-2 flex justify-center">
              <img
                src={preview}
                alt="Vista previa"
                className="w-32 h-32 object-cover rounded-lg shadow-md"
              />
            </div>
          )}

          <button
            type="submit"
            className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-orange-500 hover:to-red-600 transition-all shadow-md"
          >
            Agregar Producto
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default AddProduct;
