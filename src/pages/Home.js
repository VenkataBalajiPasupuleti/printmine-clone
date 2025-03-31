import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map(product => (
          <Link to={`/product/${product.id}`} key={product.id} className="border p-4 rounded-lg shadow-lg">
            <img src={product.image} alt={product.title} className="h-40 w-full object-contain" />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-green-600">${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
