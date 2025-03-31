import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdFavoriteBorder } from "react-icons/md";
import { CiShoppingCart, CiSearch } from "react-icons/ci";
import { useFavorite } from "../context/FavoriteContext";  // ✅ Import wishlist context
import { useCart } from "../context/CartContext"; // ✅ Import cart context

const PrintHeader = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const { favoriteItems } = useFavorite();  // ✅ Get wishlist items
    const { cartItems } = useCart(); // ✅ Get cart items

    // Handle search input change
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        if (onSearch) {
            onSearch(value);
        }
    };

    return (
        <header className="bg-blue-600 p-4 text-white flex flex-wrap items-center justify-between">
            <Link to="/" className="text-xl font-bold">
                <img
                    src="https://printmine.in/cdn/shop/files/PRINTMINE_FINAL_LOGO_1.png?v=1678645048&width=280"
                    alt="Logo"
                    className="h-12"
                />
            </Link>

            {/* Search Bar */}
            <div className="relative w-1/3">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={query}
                    onChange={handleSearchChange}
                    className="w-full px-4 py-2 rounded text-black"
                />
                <CiSearch className="absolute right-3 top-3 text-gray-600" size={20} />
            </div>

            {/* Navigation Links */}
            <nav className="flex space-x-6">
                {/* Wishlist Icon with Count */}
                <Link to="/favorite" className="relative">
                    <MdFavoriteBorder size={28} />
                    {favoriteItems.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            {favoriteItems.length}
                        </span>
                    )}
                </Link>

                {/* Cart Icon with Count */}
                <Link to="/cart" className="relative">
                    <CiShoppingCart size={28} />
                    {cartItems.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            {cartItems.length}
                        </span>
                    )}
                </Link>

                {/* Profile Icon */}
                <Link to="/login">
                    <CgProfile size={28} />
                </Link>
            </nav>
        </header>
    );
};

export default PrintHeader;
