import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Add item to cart
    const addToCart = (product) => {
        setCartItems((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    // Increase item quantity
    const increaseQuantity = (id) => {
        setCartItems((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // Decrease item quantity
    const decreaseQuantity = (id) => {
        setCartItems((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item
            )
        );
    };

    // Remove item from cart
    const removeFromCart = (id) => {
        setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, increaseQuantity, decreaseQuantity, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
