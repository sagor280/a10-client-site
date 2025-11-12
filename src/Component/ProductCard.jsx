import React from "react";
import { Star } from "lucide-react";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  const { _id, name, imageUrl, price, origin, rating, quantity } = product;

  const stars = Math.round(Number(rating) || 0);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <div className="relative h-60 rounded-t-2xl overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow">
          {origin}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-600 transition">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              className={i < stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
            />
          ))}
          <span className="text-sm text-gray-600 ml-1">{rating || 0}/5</span>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          <span className="font-semibold text-gray-800">Available:</span> {quantity}
        </p>

        {/* Price & Button */}
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-blue-700">${price}</span>
          <Link to={`/product-details/${_id}`}>
            <button className="px-4 py-2 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium hover:from-indigo-600 hover:to-blue-700 transition">
              See Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
