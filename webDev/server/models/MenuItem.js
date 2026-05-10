import mongoose from "mongoose";
// MENU SCHEMA FOR MONGOOSE
const menuItemSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

export default MenuItem;