import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  description: { type: String, required: true },
  subscription_type: { type: String, required: true},
  
  isdeleted: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  deleted_at: {
    type: Date,
    default: null,
  },
});

const product = mongoose.model("Product", productSchema);
export default product;