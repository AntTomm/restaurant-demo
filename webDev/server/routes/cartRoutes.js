import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

// get cart
// will get our cart from mongo database
router.get("/", async (req, res) => {
  try {
    let cart = await Cart.findOne();

    // if no cart exists create empty one 
    if (!cart) {
      cart = await Cart.create({ items: [] });
    }

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching cart" });
  }
});

// add item to cart
// if item already in cart -> increase quantity
router.post("/", async (req, res) => {
  try {
    const { menuItemId, name, price, quantity } = req.body;

    let cart = await Cart.findOne();

    // if there is no cart create empty one 
    if (!cart) {
      cart = await Cart.create({ items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.menuItemId.toString() === menuItemId
    );

    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({
        menuItemId,
        name,
        price,
        quantity: quantity || 1,
      });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding item to cart" });
  }
});

// remove one quantity of an item
router.put("/:menuItemId", async (req, res) => {
  try {
    const { menuItemId } = req.params;

    let cart = await Cart.findOne();

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // if item quantity = 0 item is removed completely
    const item = cart.items.find(
      (cartItem) => cartItem.menuItemId.toString() === menuItemId
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity -= 1;

    cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating cart" });
  }
});

// clear cart
// cart document itself stays in mongo database but all items removed
router.delete("/", async (req, res) => {
    try {
      console.log("DELETE /api/cart hit");
  
      let cart = await Cart.findOne();
  
      if (!cart) {
        cart = await Cart.create({ items: [] });
      } else {
        cart.items = [];
        await cart.save();
      }
  
      console.log("Cart after clear:", cart);
      res.json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error clearing cart" });
    }
  });

export default router;