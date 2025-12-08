import { Router } from "express";
import Order from "../models/Order";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { customerName, phone, items, total } = req.body;
    if (!customerName || !items || !items.length) return res.status(400).json({ error: "invalid payload" });

    const order = await Order.create({ customerName, phone, items, total });
    res.json({ orderId: order._id, status: order.status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(100);
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

export default router;
