import express from "express";
import MenuItem from "../models/MenuItem.js";

const router = express.Router();


// gets all menu items from database
router.get("/", async (req, res) => {
  try {
    const items = await MenuItem.find();

    const groupedMenu = items.reduce((acc, item) => {
      const existingCategory = acc.find(
        (section) => section.category === item.category
      );

      // groups all items by categories so that the frontend can display them
      // the same way as before
      const formattedItem = {
        _id: item._id,
        name: item.name,
        description: item.description,
        price: item.price,
      };

      if (existingCategory) {
        existingCategory.items.push(formattedItem);
      } else {
        acc.push({
          category: item.category,
          items: [formattedItem],
        });
      }

      return acc;
    }, []);

    res.json(groupedMenu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching menu items" });
  }
});

export default router;