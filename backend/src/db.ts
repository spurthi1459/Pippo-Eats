import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/pippoeats";

export function connectDB() {
  return mongoose.connect(MONGO);
}
