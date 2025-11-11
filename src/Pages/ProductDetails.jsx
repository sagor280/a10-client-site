import React from "react";
import { Star, MapPin, Package } from "lucide-react";
import { useLoaderData, useNavigate } from "react-router";

const ProductDetails = () => {
    const data = useLoaderData()
    const product =data.result
     const navigate = useNavigate()
  return (
    
    <div className="container py-8 max-w-7xl mx-auto px-4">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:text-blue-800 font-semibold"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Name, Rating, Price */}
          <div>
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-semibold">{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-gray-500">(125 reviews)</span>
            </div>

            {/* Price */}
            <div className="text-4xl font-bold text-blue-700">${product.price}</div>
          </div>

          {/* Product Details Card */}
          <div className="border border-gray-200 rounded-lg shadow p-6 space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Origin</p>
                <p className="font-semibold">{product.origin}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Package className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Available Quantity</p>
                <p className="font-semibold">{product.quantity} units</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600 leading-relaxed">
              High-quality {product.name.toLowerCase()} sourced directly from {product.origin}. 
              Perfect for businesses looking to import premium products at competitive prices. 
              All products meet international quality standards and come with proper certification.
            </p>
          </div>

          {/* Import Button */}
          <button
          
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition"
          >
            Import Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
