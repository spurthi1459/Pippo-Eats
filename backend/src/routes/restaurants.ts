import { Router } from "express";
import Restaurant from "../models/Restaurant";

const router = Router();

// GET /api/restaurants?q=&cuisine=&isVeg=
router.get("/", async (req, res) => {
  try {
    const q = (req.query.q as string) || "";
    const cuisine = (req.query.cuisine as string) || "";
    const isVeg = req.query.isVeg === "true" ? true : req.query.isVeg === "false" ? false : undefined;

    const filter: any = {};
    if (q) filter.$or = [{ name: new RegExp(q, "i") }, { cuisines: new RegExp(q, "i") }];
    if (cuisine) filter.cuisines = cuisine;
    if (isVeg !== undefined) filter.isVeg = isVeg;

    const restaurants = await Restaurant.find(filter).limit(50);
    res.json(restaurants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const r = await Restaurant.findById(req.params.id);
    if (!r) return res.status(404).json({ error: "not found" });
    res.json(r);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

export default router;
