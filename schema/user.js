import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  dateofbirth: Date,
  password: String,
  role: {
    type: String,
    enum: ["admin","staff","user"],
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpiry: Date,
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

const user = mongoose.model("User", userSchema);
export default user;