import mongoose from "mongoose";

const chatSchema = new mongoose.Schema ({
  email: {
      type: String,
      required: true
  },
  message: {
      type: String
  }
},{
  timestamps: true
})

export default mongoose.model("chat", chatSchema)