import React from "react";
import { Link } from "react-router-dom";

const ProductList = ({ products }) => {
    return (
        <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.length > 0 ? (
                products.map((product) => (
                    <div key={product.id} className="border p-4 rounded-lg">
                        <img src={product.image} alt={product.title} className="h-40 mx-auto" />
                        <h3 className="text-lg font-semibold">{product.title}</h3>
                        <p className="text-gray-500">${product.price}</p>
                        <Link to={`/product/${product.id}`} className="block text-blue-600 mt-2">
                            View Details
                        </Link>
                    </div>
                ))
            ) : (
                <p className="col-span-full text-center text-gray-500">No products found</p>
            )}
        </div>
    );
};

export default ProductList;
