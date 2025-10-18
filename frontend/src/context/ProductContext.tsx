import React, { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "../api/pApi";
import { productApi } from "../api/pApi";

interface ProductContextProps {
  products: Product[];
  addProduct: (p: Product) => void;
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    productApi.getAll().then(setProducts);
  }, []);

  const addProduct = (p: Product) => setProducts((prev) => [...prev, { ...p, id: prev.length + 1 }]);

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used inside ProductProvider");
  return ctx;
};
