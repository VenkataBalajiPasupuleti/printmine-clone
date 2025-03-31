import React from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
    const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

    return (
        <div className="max-w-2xl mx-auto mt-10 p-4 bg-white shadow-lg rounded">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center border-b py-2">
                        <img src={item.image} alt={item.title} className="w-16 h-16 object-cover" />
                        <p className="text-lg font-semibold">{item.title}</p>
                        <div className="flex items-center">
                            <button onClick={() => decreaseQuantity(item.id)} className="px-2 py-1 bg-gray-300">
                                -
                            </button>
                            <span className="mx-2">{item.quantity}</span>
                            <button onClick={() => increaseQuantity(item.id)} className="px-2 py-1 bg-gray-300">
                                +
                            </button>
                        </div>
                        <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                        <button onClick={() => removeFromCart(item.id)} className="px-2 py-1 bg-red-500 text-white">
                            Remove
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default Cart;
