import { useState, useEffect, useCallback } from "react";
import { productApi } from "../api/pApi";
import type { Product } from "../api/pApi";

export const useProductsApi = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productApi.getAll();
      console.log("Productos obtenidos:", data); // <--- verificación
      setProducts(data);
    } catch (err) {
      setError("No se pudieron cargar los productos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refresh: fetchProducts };
};
