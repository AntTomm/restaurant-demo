import mongoose from "mongoose";
import MenuItem from "./models/MenuItem.js";

const menuItems = [
  { category: "Antipasto", name: "Pate Di Fegato", description: "Liver Pate", price: 5.5 },
  { category: "Antipasto", name: "Prosciutto E Melone", description: "Cured Ham & Melon", price: 6.0 },
  { category: "Antipasto", name: "Salmone affumicato", description: "Smoked Salmon", price: 10.3 },

  { category: "Primi Piatti", name: "Tortellini In Brodo", description: "Tortellini in Broth", price: 7.0 },
  { category: "Primi Piatti", name: "Gnocchi Al Sugo Di Pomodoro", description: "Dumplings with Tomato Sauce", price: 6.5 },
  { category: "Primi Piatti", name: "Risotto Alla Marinara", description: "Creamy Rice with Seafood", price: 8.5 },
  { category: "Primi Piatti", name: "Spaghetti Alla Bolognese", description: "Spaghetti with Meat Sauce", price: 6.3 },

  { category: "Contorni", name: "Peperoni Alla Griglia", description: "Grilled Peppers", price: 3.5 },
  { category: "Contorni", name: "Zucchine e Fagiolini", description: "Zucchini & Green Beans", price: 5.2 },

  { category: "Bevande", name: "Vino Della Casa", description: "House Wine", price: 4.0 },
  { category: "Bevande", name: "Birra", description: "Beer", price: 2.0 },
  { category: "Bevande", name: "Acqua Minerale", description: "Mineral Water Still / Sparkling", price: 2.0 },
];

async function seedMenu() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/restaurantDB");

    await MenuItem.deleteMany({});
    await MenuItem.insertMany(menuItems);

    console.log("Menu seeded successfully");
    await mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding menu:", error);
    await mongoose.connection.close();
  }
}

seedMenu();