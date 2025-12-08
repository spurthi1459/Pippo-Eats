import mongoose, { Schema, Document } from "mongoose";

export interface MenuItem {
  name: string;
  price: number;
  description?: string;
  veg?: boolean;
}

export interface IRestaurant extends Document {
  name: string;
  cuisines: string[];
  rating: number;
  eta?: string;
  priceTier?: number;
  isVeg?: boolean;
  imageUrl?: string;
  menu: MenuItem[];
}

const MenuItemSchema = new Schema<MenuItem>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  veg: Boolean,
});

const RestaurantSchema = new Schema<IRestaurant>({
  name: { type: String, required: true },
  cuisines: { type: [String], default: [] },
  rating: { type: Number, default: 4.0 },
  eta: String,
  priceTier: Number,
  isVeg: Boolean,
  imageUrl: String,
  menu: { type: [MenuItemSchema], default: [] },
});

export default mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);
