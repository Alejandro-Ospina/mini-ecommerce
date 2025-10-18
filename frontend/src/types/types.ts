export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  photo: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
