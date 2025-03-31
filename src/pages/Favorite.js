import React from "react";
import { useFavorite } from "../context/FavoriteContext";

const Favorite = () => {
    const { favoriteItems, toggleFavorite } = useFavorite();

    return (
        <div className="max-w-2xl mx-auto mt-10 p-4 bg-white shadow-lg rounded">
            <h2 className="text-2xl font-bold mb-4">Favorite Items ❤️</h2>
            {favoriteItems.length === 0 ? (
                <p>Your favorites list is empty.</p>
            ) : (
                favoriteItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center border-b py-2">
                        <img src={item.image} alt={item.title} className="w-16 h-16 object-cover" />
                        <p className="text-lg font-semibold">{item.title}</p>
                        <p className="font-bold">${item.price}</p>
                        <button
                            onClick={() => toggleFavorite(item)}
                            className="px-2 py-1 bg-red-500 text-white"
                        >
                            Remove
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default Favorite;
