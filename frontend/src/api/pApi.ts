import axios from "axios";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  photo: string;
}

const API_BASE_URL = "http://localhost:8080/api/products"; 

export const productApi = {
  async getAll(): Promise<Product[]> {
    try {
      const response = await axios.get<Product[]>(API_BASE_URL);
      console.log("Axios response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // retorna array vacío si falla
    }
  },

  async getById(id: number): Promise<Product | null> {
    try {
      const response = await axios.get<Product>(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product by id:", error);
      return null;
    }
  },

  async create(product: Omit<Product, "id">): Promise<Product | null> {
    try {
      const response = await axios.post<Product>(API_BASE_URL, product);
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      return null;
    }
  },
};
