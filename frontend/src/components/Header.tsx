import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

/**
 * Simple header: left = brand (click -> /), right = cart (click -> /cart).
 * Brand is golden. Cart shows item count badge.
 */

export default function Header() {
  // useCart may throw if not inside provider — App already wraps CartProvider
  let count = 0;
  try {
    const cart = useCart();
    count = cart?.state?.items?.reduce((s, i) => s + (i.qty ?? 0), 0) ?? 0;
  } catch (err) {
    // if useCart fails, silently show 0
  }

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="brand">
          PIPPO EATS
        </Link>

        <nav className="nav-right">
          <Link to="/cart" className="cart-link">
            <span>Cart</span>
            <span className="cart-badge" aria-hidden>
              {count}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
