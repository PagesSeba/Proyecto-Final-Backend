import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { Product } from "./Product.js";
import { User } from "./User.js";

export const Cart = mongoose.model(
  "carts",
  new mongoose.Schema({
    id: {
      type: Number,
    },
    name: {
      type: String,
    },
    Date: {
      type: Date,
    },
    user: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  })
);
