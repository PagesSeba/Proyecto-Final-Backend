import mongoose from "mongoose";
export const Product = mongoose.model(
  "product",
  new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    name: { type: String },
    price: { type: Number },
    stock: { type: Number },
    description: { type: String },
    image: { type: String },
    url: { type: String },
    code: { type: String },
    category: { type: String }
  }, { versionKey: false }
  )
);
