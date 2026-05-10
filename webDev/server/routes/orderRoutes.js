import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// creates a new order and sends to database
// receives cart items & total from frontend
// & stores as a cmpleted order json

router.post("/", async (req, res) => {
  try {
    const { items, total } = req.body;

    const newOrder = new Order({
      items,
      total,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving order" });
  }
});

export default router;