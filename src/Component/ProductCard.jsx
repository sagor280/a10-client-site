import React from "react";
import { Star, MapPin } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const ProductCard = ({ product, loading }) => {
  
  if (loading || !product) {
    return (
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden animate-pulse">
        <div className="h-64 w-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="p-5 space-y-4">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="flex justify-between items-center mt-4">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-full w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  
  const { _id, name, imageUrl, price, origin, rating, quantity } = product;
  const stars = Math.round(Number(rating) || 0);

  return (
    <motion.div
      className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-lg hover:shadow-xl dark:hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Image */}
      <div className="relative h-64 w-full overflow-hidden rounded-t-2xl">
        <img
          src={imageUrl || "https://via.placeholder.com/300"} // fallback image
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Price Badge */}
        <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-sm px-3 py-1 rounded-full shadow-md">
          ${price}
        </div>

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 dark:bg-gray-900/80 backdrop-blur-md px-2 py-1 rounded-full shadow-md">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < stars ? "text-yellow-400 fill-yellow-400" : "text-gray-400 dark:text-gray-500"}
            />
          ))}
          <span className="text-xs text-gray-700 dark:text-gray-200 ml-1">{rating || 0}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col justify-between h-[180px]">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 truncate group-hover:text-blue-400 transition-colors">
            {name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            <span className="font-medium text-gray-800 dark:text-gray-200">Available:</span> {quantity}
          </p>
        </div>

        {/* Location + CTA */}
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300 text-sm">
            <MapPin className="w-4 h-4 text-blue-400" />
            {origin}
          </div>
          <Link to={`/product-details/${_id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white text-sm font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              View
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;