import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  event_name: { type: String, required: true },
  event_owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  description: { type: String, required: true },
  event_status: { type: String, required: true},
  
  event_product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", default: null },
  event_productItem_id: { type: mongoose.Schema.Types.ObjectId, ref: "ProductItem", default: null },
  event_order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order", default: null },
  event_user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const log = mongoose.model("log", logSchema);
export default log;