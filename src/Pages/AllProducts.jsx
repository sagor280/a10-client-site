import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import ProductCard from "../Component/ProductCard";

import { FaGlobe } from "react-icons/fa"; 
import Loader from "./Loader";

const AllProducts = () => {
  const data = useLoaderData();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setProducts(data);
      setTimeout(() => setLoading(false), 500);
    }
  }, [data]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Section Header */}
      <div className="text-center mb-12 flex flex-col items-center gap-2">
        <div className="flex items-center justify-center gap-3">
          <FaGlobe className="text-blue-600 text-4xl animate-pulse" /> 
          <h1 className="text-4xl font-extrabold text-gray-800">
            Discover Our Exclusive Products
          </h1>
        </div>
        <p className="text-gray-500 text-lg">
          Handpicked quality imports from around the world
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
