import mongoose from "mongoose";
import product from "./product";

const orderSchema = new mongoose.Schema({
  productItem_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "ProductItem" },
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  order_date: { type: Date, required: true },
  order_note: { type: String, required: true },
  order_price: { type: Number, required: true },
  order_status: { type: String, required: true },

  order_start_at: { type: Date, required: true },
  order_expire_at: { type: Date, required: true },

  order_payment: { type: String, required: true },
  order_payment_type: { type: String, enum: ["Upload Qrcode"], required: true },

  order_payment_proofer: { type: mongoose.Schema.Types.ObjectId, ref: "User" , default: null },
  order_payment_proof: { type: String, enum: ["Purchased", "Verifing", "Denied"], default: null },
  
  order_payment_create_at: { type: Date, default: Date.now },
  order_payment_check_at: { type: Date, default: null },
  order_payment_verified_at: { type: Date, default: null },
  order_payment_cancel_at: { type: Date, default: null },

  order_payment_note: { type: String, default: null },

  order_shipment_status: { type: String, required: true },
  order_shipment_email: { type: String, required: true },
  order_shipment_date: { type: Date, default: null },
  order_shipment_note: { type: String, default: null },

  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const order = mongoose.model("Order", orderSchema);
export default order;