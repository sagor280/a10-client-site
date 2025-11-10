import { Star } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  const { _id, name, imageUrl, price, origin, rating, quantity } = product;

  return (
    <div className="group relative backdrop-blur-lg bg-white/60 border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
      {/* Product Image */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 bg-white/90 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full shadow">
          {origin}
        </div>
        <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
          ⭐ {rating.toFixed(1)}
        </div>
      </div>

      {/* Product Content */}
      <div className="p-5 flex flex-col justify-between h-[230px]">
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {name}
          </h3>

          <p className="text-sm text-gray-500 mb-3">
            <span className="font-semibold">Available:</span> {quantity}
          </p>
        </div>

        {/* Price + Button */}
        <div className="flex justify-between items-center mt-2">
          <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            ${price}
          </span>

          <Link to={`/products/${_id}`}>
            <button className="relative overflow-hidden rounded-full px-5 py-2 font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-700 transition-all duration-500 group">
              <span className="relative z-10">See Details</span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
