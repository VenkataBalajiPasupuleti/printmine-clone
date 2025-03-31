import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrintHeader from "./components/PrintHeader";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorite from "./pages/Favorite";

const App = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    // Fetch products from API
    useEffect(() => {
        fetch("https://fakestoreapi.com/products") // API URL
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setFilteredProducts(data); // Initialize filtered products
            })
            .catch((err) => console.error("Error fetching products:", err));
    }, []);

    // Search function
    const handleSearch = (query) => {
        const filtered = products.filter((product) =>
            product.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    return (
        <Router>
            <PrintHeader onSearch={handleSearch} /> {/* Pass onSearch */}
            <Routes>
                <Route path="/" element={<ProductList products={filteredProducts} />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/favorite" element={<Favorite />} />
            </Routes>
        </Router>
    );
};

export default App;
