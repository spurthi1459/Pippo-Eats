// frontend/src/types.ts
export type MenuItem = {
  _id?: string; // Mongo id if present
  name: string;
  price: number;
  description?: string;
  veg?: boolean;
  image?: string;
};

export type Restaurant = {
  _id?: string;
  name: string;
  cuisines: string[];
  rating?: number;
  eta?: string;
  priceTier?: number;
  isVeg?: boolean;
  imageUrl?: string;
  menu: MenuItem[];
};

/**
 * Cart item used inside frontend state.
 * Use `id` consistently across components (maps to menu._id when available).
 */
export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
};

export type OrderItem = {
  itemId: string;
  name: string;
  price: number;
  qty: number;
};

export type OrderRequest = {
  customerName: string;
  phone: string;
  restaurantId?: string | null;
  items: OrderItem[];
  total: number;
};
