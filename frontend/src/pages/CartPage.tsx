// frontend/src/pages/CartPage.tsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import type { CartItem } from "../types";

export default function CartPage(): React.ReactElement {
  const cart = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const items = cart.state.items;
  const total = items.reduce((s, it) => s + it.price * it.qty, 0);
  const itemCount = items.reduce((s, it) => s + it.qty, 0);

  function onPhoneChange(v: string) {
    const digits = v.replace(/\D/g, "");
    setPhone(digits.slice(0, 10));
  }

  async function placeOrder() {
    if (items.length === 0) return setMessage("Cart is empty.");
    if (!name.trim() || phone.length !== 10)
      return setMessage("Enter name & 10-digit phone.");

    setLoading(true);
    setMessage(null);

    const payload = {
      customerName: name,
      phone,
      items: items.map(i => ({
        itemId: i.id,
        name: i.name,
        qty: i.qty,
        price: i.price,
      })),
      total,
    };

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok) throw new Error(data?.error || data?.message || "Order failed");

      cart.clear();
      cart.setPlaced(true);
      setMessage("Order placed — thank you!");
      setName("");
      setPhone("");
    } catch (err: any) {
      setMessage(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  }

  if (cart.state.placed) {
    return (
      <div style={{ padding: 24, maxWidth: 800 }}>
        <h1>Order placed — thank you</h1>
        <button onClick={() => cart.setPlaced(false)} className="btn">
          Back to shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 900 }}>
      <h1>Cart</h1>

      {items.length === 0 ? (
        <p>No items</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {items.map((it) => (
              <li
                key={it.id}
                className="cart-item-row"
                style={{
                  padding: "12px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.03)",
                }}
              >
                <div className="cart-item-left">
                  <div style={{ fontWeight: 700 }}>{it.name}</div>
                  <div style={{ color: "#bdbdbd", fontSize: 13 }}>
                    ₹{it.price} × {it.qty}
                  </div>
                </div>

                <div className="cart-controls">
                  <button
                    className="cart-btn"
                    onClick={() => cart.removeOne(it.id)}
                  >
                    −
                  </button>

                  <div className="cart-qty">{it.qty}</div>

                  <button
                    className="cart-btn"
                    onClick={() => cart.addOne(it.id)}
                  >
                    +
                  </button>

                  <button
                    className="cart-remove"
                    onClick={() => cart.removeItem(it.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: 16 }}>
            <h3>Total: ₹{total}</h3>
            <p>Items: {itemCount}</p>
          </div>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="cart-input"
            style={inputStyle}
          />

          <input
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            placeholder="Phone (10 digits)"
            maxLength={10}
            className="cart-input"
            style={inputStyle}
          />

          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <button
              onClick={placeOrder}
              disabled={loading}
              className="btn"
            >
              {loading ? "Placing..." : "Place order"}
            </button>

            <button
              onClick={() => {
                cart.clear();
                setMessage("Cart cleared");
              }}
              className="btn-ghost"
            >
              Clear
            </button>
          </div>

          {message && (
            <p style={{ marginTop: 12, color: message.includes("thank") ? "green" : "salmon" }}>
              {message}
            </p>
          )}
        </>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  marginTop: 10,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.06)",
  background: "#0b0b0b",
  color: "inherit",
};
