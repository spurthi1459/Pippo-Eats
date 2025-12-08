import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import "./index.css"; // keep your global styles


ReactDOM.createRoot(document.getElementById("root")!).render(
<React.StrictMode>
<CartProvider>
<App />
</CartProvider>
</React.StrictMode>
);