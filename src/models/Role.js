import mongoose from "mongoose";

export const ROLES = ["user", "admin"]

const roleSchema = new mongoose.Schema({
    name: String,
  },
  {
    versionkey: false,
  }
);

export default mongoose.model("Role", roleSchema);