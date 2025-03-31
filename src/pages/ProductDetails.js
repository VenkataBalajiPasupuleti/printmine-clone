import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext"; 
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Wishlist Icons
import { useFavorite } from "../context/FavoriteContext"; // ✅ Correct import


const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useCart(); 
    const { favoriteItems, addToFavorites, removeFromFavorites } = useFavorite();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => setProduct(data))
            .catch((err) => console.error("Error fetching product:", err));
    }, [id]);

    if (!product) return <p className="text-center text-gray-600 mt-10">Loading...</p>;

    const isFavorite = favoriteItems.some((item) => item.id === product.id);

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col md:flex-row items-center">
                {/* Product Image */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-64 h-64 object-contain"
                    />
                </div>

                {/* Product Details */}
                <div className="w-full md:w-1/2 mt-6 md:mt-0 md:pl-6">
                    <h2 className="text-2xl font-bold text-gray-800">{product.title}</h2>
                    <p className="text-gray-600 mt-2">{product.description}</p>
                    <p className="text-xl font-semibold text-blue-600 mt-4">${product.price}</p>

                    {/* Action Buttons */}
                    <div className="mt-6 flex space-x-4">
                        <button 
                            onClick={() => addToCart(product)}
                            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Add to Cart 🛒
                        </button>
                        
                        <button 
                            onClick={() => isFavorite ? removeFromFavorites(product.id) : addToFavorites(product)}
                            className="flex items-center space-x-2 text-gray-600 border px-6 py-2 rounded-md hover:bg-gray-100 transition"
                        >
                            {isFavorite ? <AiFillHeart size={20} className="text-red-500" /> : <AiOutlineHeart size={20} />} 
                            <span>{isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
