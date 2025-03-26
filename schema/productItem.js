import mongoose from "mongoose";

const productItemSchema = new mongoose.Schema({
  productItem_name: { type: String, required: true },
  product_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
  description: {type: String, required: true},
  productItem_id: { type: String, required: true },
  productItem_pass: { type: String, required: true },

  // for emergency access case
  productItem_email: { type: String, required: true },
  productItem_mail_pass: {type: String, required: true},
  productItem_recovery_pass: { type: String, default: null },
  productItem_note: { type: String, default: null },

  // user group
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  participants_count: {type: Number, default: 0},
  max_participants: {type: Number, default: 5},


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

const productItem = mongoose.model("ProductItem", productItemSchema);
export default productItem;