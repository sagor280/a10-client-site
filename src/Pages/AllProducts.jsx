import React from "react";
import { useLoaderData } from "react-router";
import ProductCard from "../Component/ProductCard";

const AllProducts = () => {
  const data = useLoaderData();

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
          🌍 Discover Our Exclusive Products
        </h1>
        <p className="text-gray-500 text-lg">
          Handpicked quality imports from around the world
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {data.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
