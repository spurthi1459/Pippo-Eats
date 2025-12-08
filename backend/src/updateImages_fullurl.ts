// backend/src/updateImages_fullurl.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
import Restaurant from "./models/Restaurant";

dotenv.config();

const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/pippoeats";
const root = (process.env.ROOT_URL || "http://localhost:5000").replace(/\/$/, "");

async function run() {
  await mongoose.connect(MONGO);
  console.log("Connected to MongoDB...");

  const mapping: { name: string; image: string; menuPrefix?: string }[] = [
    { name: "Pippo Café", image: `${root}/images/pippo.jpg`, menuPrefix: "pippo" },
    { name: "Spice Symphony", image: `${root}/images/spice.jpg`, menuPrefix: "spice" },
    { name: "Urban Bites", image: `${root}/images/urban.jpg`, menuPrefix: "urban" },
    { name: "Blue Lotus Kitchen", image: `${root}/images/bluelotus.jpg`, menuPrefix: "bluelotus" },
    { name: "Olive & Oak Bistro", image: `${root}/images/olive.jpg`, menuPrefix: "olive" },
    { name: "The Hungry Panda", image: `${root}/images/panda.jpg`, menuPrefix: "panda" },
  ];

  for (const m of mapping) {
    const r = await Restaurant.findOne({ name: new RegExp("^" + m.name + "$", "i") });
    if (!r) { console.log("Not Found:", m.name); continue; }
    let changed = false;
    if (r.imageUrl !== m.image) { r.imageUrl = m.image; changed = true; }
    // add menu item images using menuPrefix_0..4.jpg
    if (r.menu && r.menu.length) {
      for (let i = 0; i < r.menu.length && i < 5; i++) {
        const menuImg = `${root}/images/${m.menuPrefix}_${i}.jpg`;
        // use any to avoid TS errors if schema doesn't have `image`
        if (!(r.menu[i] as any).image || (r.menu[i] as any).image !== menuImg) {
          (r.menu[i] as any).image = menuImg;
          changed = true;
        }
      }
    }
    if (changed) {
      await r.save();
      console.log("Updated:", m.name);
    } else {
      console.log("No change:", m.name);
    }
  }
  console.log("Done updating restaurant images.");
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
