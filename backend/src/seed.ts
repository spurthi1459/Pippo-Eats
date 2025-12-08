// backend/src/seed.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import Restaurant from "./models/Restaurant";

dotenv.config();

const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/pippoeats";
const base = "http://localhost:5000/images";

// Adjust this to where your backend serves static images from
const IMAGES_DIR = path.join(__dirname, "..", "public", "images");
// Placeholder filename you should place there
const PLACEHOLDER_FILENAME = "placeholder.jpg";

function fileExistsInImages(filename?: string) {
  if (!filename) return false;
  try {
    // defend against absolute URLs
    const name = path.basename(filename);
    const full = path.join(IMAGES_DIR, name);
    return fs.existsSync(full);
  } catch (err) {
    return false;
  }
}

async function runSeed() {
  await mongoose.connect(MONGO);
  console.log("Connected to MongoDB");

  await Restaurant.deleteMany({});
  console.log("Old data cleared.");

  // Helper to build menu (with fallback to placeholder)
  function buildMenu(prefix: string, names: string[], prices: number[]) {
    return names.map((name, i) => {
      const rawImageName = `${prefix}_${i}.jpg`;
      const imageNameToUse = fileExistsInImages(rawImageName)
        ? rawImageName
        : PLACEHOLDER_FILENAME;

      return {
        name,
        price: prices[i],
        description: `${name} — special ${prefix} dish`,
        veg:
          name.toLowerCase().includes("veg") ||
          name.toLowerCase().includes("salad") ||
          name.toLowerCase().includes("paneer"),
        image: `${base}/${imageNameToUse}`,
      };
    });
  }

  // Prices for each menu (your 5 items)
  const prices = [149, 199, 129, 169, 229];

  // All restaurants with dish names
  const data = [
    {
      hero: "pippo.jpg",
      prefix: "pippo",
      name: "Pippo Café",
      cuisines: ["Café", "Brunch", "Desserts"],
      rating: 4.7,
      eta: "15–25 min",
      priceTier: 2,
      isVeg: true,
      dishes: [
        "Cappuccino",
        "Avocado Toast",
        "Chocolate Lava Cake",
        "French Press Coffee",
        "Berry Pancakes",
      ],
    },
    {
      hero: "spice.jpg",
      prefix: "spice",
      name: "Spice Symphony",
      cuisines: ["Indian"],
      rating: 4.5,
      eta: "30–40 min",
      priceTier: 2,
      isVeg: false,
      dishes: [
        "Paneer Butter Masala",
        "Chicken Biryani",
        "Gulab Jamun",
        "Masala Dosa",
        "Rogan Josh",
      ],
    },
    {
      hero: "urban.jpg",
      prefix: "urban",
      name: "Urban Bites",
      cuisines: ["Fast Food", "American"],
      rating: 4.2,
      eta: "25–30 min",
      priceTier: 1,
      isVeg: false,
      dishes: [
        "Classic Burger",
        "French Fries",
        "Coke",
        "Chicken Nuggets",
        "Veg Wrap",
      ],
    },
    {
      hero: "bluelotus.jpg",
      prefix: "bluelotus",
      name: "Blue Lotus Kitchen",
      cuisines: ["Chinese", "Asian"],
      rating: 4.3,
      eta: "20–35 min",
      priceTier: 2,
      isVeg: false,
      dishes: [
        "Veg Hakka Noodles",
        "Chicken Manchurian",
        "Spring Rolls",
        "Fried Rice",
        "Chilli Paneer",
      ],
    },
    {
      hero: "olive.jpg",
      prefix: "olive",
      name: "Olive & Oak Bistro",
      cuisines: ["Italian"],
      rating: 4.6,
      eta: "20–30 min",
      priceTier: 3,
      isVeg: true,
      dishes: [
        "Margherita Pizza",
        "Pasta Alfredo",
        "Garlic Bread",
        "Bruschetta",
        "Caprese Salad",
      ],
    },
    {
      hero: "panda.jpg",
      prefix: "panda",
      name: "The Hungry Panda",
      cuisines: ["Asian Fusion"],
      rating: 4.1,
      eta: "30–40 min",
      priceTier: 1,
      isVeg: false,
      dishes: [
        "Kung Pao Chicken",
        "Veg Dumplings",
        "Rice Bowl",
        "Szechuan Veg",
        "Teriyaki Bowl",
      ],
    },
    {
      hero: "breezy.jpg",
      prefix: "breezy",
      name: "Breezy Bites",
      cuisines: ["Café", "Desserts"],
      rating: 4.2,
      eta: "20–30 min",
      priceTier: 2,
      isVeg: true,
      dishes: [
        "Iced Latte",
        "Berry Tart",
        "Caramel Coffee",
        "Chocolate Donut",
        "Banana Smoothie",
      ],
    },
    {
      hero: "harbor.jpg",
      prefix: "harbor",
      name: "Harbor Deli",
      cuisines: ["Continental"],
      rating: 4.1,
      eta: "25–35 min",
      priceTier: 2,
      isVeg: false,
      dishes: [
        "Club Sandwich",
        "Cheesy Fries",
        "Tomato Soup",
        "Veg Pasta",
        "Chicken Steak",
      ],
    },
    {
      hero: "SunsetGrill.jpg",
      prefix: "sunsetgrill",
      name: "Sunset Grill",
      cuisines: ["Grill", "Barbecue"],
      rating: 4.4,
      eta: "30–40 min",
      priceTier: 2,
      isVeg: false,
      dishes: [
        "Smoky BBQ Ribs",
        "Grilled Chicken Skewers",
        "Loaded Potato",
        "Charred Corn",
        "BBQ Pulled Pork",
      ],
    },
    {
      hero: "GreenFork.jpg",
      prefix: "greenfork",
      name: "Green Fork",
      cuisines: ["Healthy", "Salads"],
      rating: 4.5,
      eta: "20–30 min",
      priceTier: 2,
      isVeg: true,
      dishes: [
        "Quinoa Salad",
        "Grilled Veg Bowl",
        "Avocado Wrap",
        "Kale Caesar",
        "Protein Smoothie",
      ],
    },
    {
      hero: "CoastalCatch.jpg",
      prefix: "coastalcatch",
      name: "Coastal Catch",
      cuisines: ["Seafood"],
      rating: 4.3,
      eta: "25–35 min",
      priceTier: 3,
      isVeg: false,
      dishes: [
        "Grilled Salmon",
        "Prawn Tempura",
        "Lemon Butter Crab",
        "Fish & Chips",
        "Garlic Prawns",
      ],
    },
    {
      hero: "CafeMosaic.jpg",
      prefix: "cafemosaic",
      name: "Cafe Mosaic",
      cuisines: ["Café", "Bakery"],
      rating: 4.2,
      eta: "15–20 min",
      priceTier: 1,
      isVeg: true,
      dishes: [
        "Espresso",
        "Almond Croissant",
        "Blueberry Muffin",
        "Cinnamon Roll",
        "Chai Latte",
      ],
    },
  ];

  // Build documents (with hero fallback)
  const docs = data.map((r) => {
    const heroName = path.basename(r.hero);
    const heroToUse = fileExistsInImages(heroName) ? heroName : PLACEHOLDER_FILENAME;

    return {
      name: r.name,
      cuisines: r.cuisines,
      rating: r.rating,
      eta: r.eta,
      priceTier: r.priceTier,
      isVeg: r.isVeg,
      imageUrl: `${base}/${heroToUse}`,
      menu: buildMenu(r.prefix, r.dishes, prices),
    };
  });

  await Restaurant.insertMany(docs);
  console.log("Inserted all restaurants successfully.");

  process.exit(0);
}

runSeed().catch((err) => {
  console.error(err);
  process.exit(1);
});
