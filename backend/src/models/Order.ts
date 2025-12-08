import mongoose, { Schema, Document } from "mongoose";

export interface OrderItem {
  menuItemId?: string;
  name: string;
  qty: number;
  price: number;
}

export interface IOrder extends Document {
  customerName: string;
  phone?: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: Date;
}

const OrderItemSchema = new Schema<OrderItem>({
  menuItemId: String,
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
});

const OrderSchema = new Schema<IOrder>({
  customerName: { type: String, required: true },
  phone: String,
  items: { type: [OrderItemSchema], required: true },
  total: { type: Number, required: true },
  status: { type: String, default: "placed" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IOrder>("Order", OrderSchema);
