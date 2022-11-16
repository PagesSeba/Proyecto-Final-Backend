import mongoose from "mongoose";
// export const User = mongoose.model(
//   "User",
//   new mongoose.Schema({
//     name: String,
//     lastName: String,
//     address: String,
//     age: Number,
//     phone: Number,
//     image: String,
//     username: String,
//     email: String,
//     password: String,
//   })
// );

import bcrypt from "bcryptjs";
export const User = new mongoose.Schema({
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    adress: {
      type: String,
    },
    age: {
      type: Number,
    },
    phone: {
      type: String,
    },
    image: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        ref: "Role",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionkey: false,
  }
);

User.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

User.statics.comparePassword = async (password, hash) => {
  const result = await bcrypt.compare(password, hash);
  return result;
}

export default mongoose.model("User", User);




