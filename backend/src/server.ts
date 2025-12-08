// backend/src/server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import restaurantsRouter from "./routes/restaurants";
import ordersRouter from "./routes/orders";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// PUBLIC IMAGES: serve /images/<filename> from backend/public/images
const IMAGES_PATH = path.join(__dirname, "..", "public", "images");
console.log("Serving IMAGES from:", IMAGES_PATH);
app.use("/images", express.static(IMAGES_PATH));

// API routers
app.use("/api/restaurants", restaurantsRouter);
app.use("/api/orders", ordersRouter);

// optional root message
app.get("/", (_req, res) => res.send("Pippo Eats backend: API available under /api") );

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/pippoeats";

mongoose
  .connect(MONGO)
  .then(() => {
    app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("Mongo connection error:", err);
    process.exit(1);
  });
