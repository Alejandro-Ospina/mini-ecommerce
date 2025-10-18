import type { Product } from "../api/pApi";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

const ProductList = ({ products }: Props) => {
  if (products.length === 0)
    return (
      <p className="text-gray-600 text-center mt-10">
        No hay productos disponibles.
      </p>
    );

  return (
    <div className="w-full max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;