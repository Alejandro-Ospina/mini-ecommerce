import type { Product } from '../types/types';

const API_BASE = (import.meta.env.VITE_API_URL ?? 'http://localhost:8080') + '/api';

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) throw new Error('Error fetching products');
  return res.json();
}

export async function checkoutOrder(payload: any) {
  const res = await fetch(`${API_BASE}/orders/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Checkout failed');
  return res.json();
}
