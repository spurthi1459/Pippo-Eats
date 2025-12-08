// frontend/src/components/RestaurantCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Restaurant } from "../types";
import { BASE } from "../services/api";

type Props = { restaurant: Restaurant };

const FALLBACK_IMG = `${BASE}/images/placeholder.jpg`;

export default function RestaurantCard({ restaurant }: Props) {
  const img = restaurant.imageUrl ? restaurant.imageUrl : FALLBACK_IMG;
  const id = restaurant._id ?? encodeURIComponent(restaurant.name || "unknown");

  return (
    <article style={{ background: "#0f0f0f", borderRadius: 10, padding: 12, cursor: "pointer", border: "2px solid rgba(215,181,58,0.15)" }}>
      <Link to={`/restaurant/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div style={{ height: 180, overflow: "hidden", borderRadius: 8, marginBottom: 10 }}>
          <img src={img} alt={restaurant.name} onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK_IMG; }} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        <h3 style={{ margin: "0 0 6px 0" }}>{restaurant.name}</h3>
        <p style={{ margin: "0 0 6px 0", color: "#bdbdbd" }}>{restaurant.cuisines.join(", ")} • {restaurant.eta}</p>
        <div style={{ fontWeight: 600 }}>⭐ {restaurant.rating ?? "-"}</div>
      </Link>
    </article>
  );
}
