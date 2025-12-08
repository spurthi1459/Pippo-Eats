// frontend/src/pages/RestaurantPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRestaurantById } from "../services/api";
import type { Restaurant, MenuItem } from "../types";
import { useCart } from "../context/CartContext";

const SERVER_PLACEHOLDER = "/images/placeholder.jpg";

/**
 * Build menu image using patterns:
 *  - use menu item image if provided (m.image)
 *  - else, if restaurant.imageUrl looks like ".../images/<prefix>.jpg", use
 *      <base>/images/<prefix>_<index>.jpg
 *  - else fallback to /images/placeholder.jpg
 */
function inferMenuImage(restaurant: Partial<Restaurant> | null, item: Partial<MenuItem>, index: number) {
  // 1) direct menu item image (best)
  const itemImage = (item as any).image || (item as any).imageUrl || (item as any).photo;
  if (typeof itemImage === "string" && itemImage.trim()) return itemImage;

  // 2) try to derive from restaurant.imageUrl which we seed as ".../images/<prefix>.jpg"
  const rImg: string | undefined = restaurant?.imageUrl;
  if (rImg && typeof rImg === "string") {
    try {
      // example rImg: "http://localhost:5000/images/urban.jpg"
      const url = new URL(rImg, window.location.origin);
      const parts = url.pathname.split("/");
      const last = parts[parts.length - 1] || "";
      // remove extension
      const prefix = last.replace(/\.[^.]+$/, "");
      // base path up to /images (preserve domain)
      const base = `${url.origin}${url.pathname.replace(/\/images\/.*$/, "")}/images`.replace(/\/$/, "");
      // candidate (prefer jpg)
      return `${base}/${prefix}_${index}.jpg`;
    } catch (e) {
      // URL parsing failed: continue to fallback
    }
  }

  // 3) try fallback from restaurant name -> name-based filename: <name>_<index>.jpg
  if (restaurant && restaurant.name) {
    const restName = restaurant.name
      .toString()
      .replace(/\s+/g, "_")
      .replace(/[^\w_-]/g, "")
      .toLowerCase();
    return `/images/${restName}_${index}.jpg`;
  }

  // 4) final fallback
  return SERVER_PLACEHOLDER;
}

export default function RestaurantPage(): React.ReactElement {
  const { id } = useParams<{ id?: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const cart = useCart();

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const r = await fetchRestaurantById(id);
        if (!mounted) return;
        setRestaurant(r);
      } catch (e) {
        console.error("Failed to fetch restaurant", e);
        if (!mounted) return;
        setError("Failed to load restaurant");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <div style={{ padding: 24 }}>Loading...</div>;
  if (error) return <div style={{ padding: 24 }}>{error}</div>;
  if (!restaurant) return <div style={{ padding: 24 }}>No restaurant found</div>;

  const menu: MenuItem[] = (restaurant.menu || []) as MenuItem[];

  function qtyFor(menuId: string) {
    const found = cart.state.items.find((it) => it.id === menuId);
    return found ? found.qty : 0;
  }

  return (
    <div style={{ padding: "32px 48px", maxWidth: 1100, margin: "0 auto" }}>
      <h1 style={{ fontSize: 34, marginBottom: 8 }}>{restaurant.name}</h1>
      <div style={{ color: "#cfcfcf", marginBottom: 16 }}>
        <span>{Array.isArray(restaurant.cuisines) ? restaurant.cuisines.join(", ") : "Cuisine"}</span>
        {" • "}
        <span>{restaurant.eta ?? "20–35 min"}</span>
        {" • "}
        <span>₹</span>
      </div>

      <h2 style={{ marginTop: 32 }}>Menu</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 22,
          marginTop: 18,
        }}
      >
        {menu.map((m, idx) => {
          const menuId = (m as any)._id || `${restaurant._id || "r"}-${idx}-${m.name}`;
          const imgSrc = inferMenuImage(restaurant, m, idx);
          const curQty = qtyFor(menuId);

          const itemForCart = {
            id: menuId,
            name: m.name,
            price: m.price,
            image: m.image,
          };

          return (
            <article
              key={menuId}
              style={{
                display: "flex",
                gap: 18,
                background: "#0f0f0f",
                padding: 18,
                borderRadius: 10,
                alignItems: "center",
                minHeight: 120,
              }}
            >
              <img
                src={imgSrc}
                alt={m.name}
                onError={(ev) => {
                  // if the candidate 404s, replace with server placeholder
                  (ev.currentTarget as HTMLImageElement).src = SERVER_PLACEHOLDER;
                }}
                style={{
                  width: 150,
                  height: 90,
                  objectFit: "cover",
                  borderRadius: 8,
                  flex: "0 0 150px",
                }}
              />

              <div style={{ flex: 1 }}>
                <h3 style={{ margin: "0 0 8px 0" }}>{m.name}</h3>
                <p style={{ margin: "0 0 12px 0", color: "#bdbdbd" }}>{m.description || ""}</p>

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <strong>₹{m.price}</strong>

                  <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
                    <button
                      onClick={() => cart.removeOne(menuId)}
                      style={{
                        background: "transparent",
                        border: "1px solid rgba(214,183,59,0.8)",
                        borderRadius: 8,
                        padding: "6px 10px",
                        cursor: "pointer",
                        color: "white",
                      }}
                    >
                      −
                    </button>

                    <div style={{ minWidth: 28, textAlign: "center" }}>{curQty}</div>

                    <button
                      onClick={() => {
                        if (curQty === 0) {
                          cart.add(itemForCart);
                        } else {
                          cart.addOne(menuId);
                        }
                      }}
                      style={{
                        background: "transparent",
                        border: "1px solid rgba(214,183,59,0.8)",
                        borderRadius: 8,
                        padding: "6px 10px",
                        cursor: "pointer",
                        color: "white",
                      }}
                    >
                      +
                    </button>

                    <button
                      onClick={() => cart.removeItem(menuId)}
                      style={{
                        marginLeft: 10,
                        background: "transparent",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: 8,
                        padding: "6px 10px",
                        cursor: "pointer",
                        color: "white",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
