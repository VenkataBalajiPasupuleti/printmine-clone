import React, { createContext, useContext, useState } from "react";

const FavoriteContext = createContext();

export const useFavorite = () => useContext(FavoriteContext);

export const FavoriteProvider = ({ children }) => {
    const [favoriteItems, setFavoriteItems] = useState([]);

    // Add to favorites
    const addToFavorites = (product) => {
        setFavoriteItems((prevFavorites) => {
            const exists = prevFavorites.find((item) => item.id === product.id);
            if (!exists) {
                return [...prevFavorites, product];
            }
            return prevFavorites;
        });
    };

    // Remove from favorites
    const removeFromFavorites = (id) => {
        setFavoriteItems((prevFavorites) =>
            prevFavorites.filter((item) => item.id !== id)
        );
    };

    return (
        <FavoriteContext.Provider value={{ favoriteItems, addToFavorites, removeFromFavorites }}>
            {children}
        </FavoriteContext.Provider>
    );
};
