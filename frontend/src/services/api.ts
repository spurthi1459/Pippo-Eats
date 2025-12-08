// frontend/src/services/api.ts
export const BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export async function fetchRestaurants(q?: string) {
  const url = q ? `${BASE}/api/restaurants?q=${encodeURIComponent(q)}` : `${BASE}/api/restaurants`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch restaurants (${res.status})`);
  return res.json();
}

export async function fetchRestaurantById(id: string) {
  const res = await fetch(`${BASE}/api/restaurants/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch restaurant (${res.status})`);
  return res.json();
}

export async function postOrder(payload: any) {
  const res = await fetch(`${BASE}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const msg = data?.error || data?.message || `Failed to place order (${res.status})`;
    const err: any = new Error(msg);
    err.status = res.status;
    err.payload = data;
    throw err;
  }
  return data;
}
