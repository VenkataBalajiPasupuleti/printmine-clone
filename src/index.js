import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext"; 
import { CartProvider } from "./context/CartContext"; 
import { FavoriteProvider } from "./context/FavoriteContext"; // ✅ Import FavoriteProvider
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <FavoriteProvider> {/* ✅ Wrap App with FavoriteProvider */}
          <App />
        </FavoriteProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
