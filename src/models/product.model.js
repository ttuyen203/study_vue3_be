import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
    },
    creator: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Product", productSchema);
