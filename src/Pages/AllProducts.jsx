import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import ProductCard from "../Component/ProductCard";
import { FaGlobe, FaSearch } from "react-icons/fa";
import Loader from "./Loader";

const AllProducts = () => {
  const data = useLoaderData();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (data) {
      setProducts(data);
      setTimeout(() => setLoading(false), 500);
    }
  }, [data]);

  // 🔍 Live Search functionality
  useEffect(() => {
    if (searchText.trim() === "") {
      setProducts(data);
      return;
    }

    const timeout = setTimeout(() => {
      fetch(`https://import-export-server-blue.vercel.app/search?search=${searchText}`)
        .then((res) => res.json())
        .then((result) => setProducts(result))
        .catch((err) => console.error(err));
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchText, data]);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* ===== HEADER SECTION ===== */}
        <div className="text-center mb-14 flex flex-col items-center gap-3">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <FaGlobe className="text-blue-700 dark:text-blue-400 text-5xl animate-pulse" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight text-center">
              Discover Our Exclusive Products
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mt-2 max-w-2xl">
            Handpicked premium imports from around the world
          </p>
          <div className="w-24 h-1 bg-blue-600 dark:bg-blue-500 rounded-full mt-3"></div>
        </div>

        {/* ===== SEARCH BAR ===== */}
        <div className="flex items-center justify-center w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto mb-14 
          bg-white dark:bg-gray-800 shadow-xl rounded-full overflow-hidden 
          border border-gray-200 dark:border-gray-700 
          focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-300">
          
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Type to search products..."
            className="flex-grow py-3 px-5 
            text-gray-700 dark:text-gray-200 
            placeholder-gray-400 dark:placeholder-gray-500 
            bg-transparent focus:outline-none text-sm sm:text-base"
          />
          
          <button
            type="button"
            className="flex items-center gap-2 
            bg-blue-600 dark:bg-blue-500 
            text-white px-5 sm:px-8 py-3 font-medium sm:font-semibold 
            hover:bg-blue-700 dark:hover:bg-blue-600 
            active:scale-95 transition-all duration-300"
          >
            <FaSearch className="text-sm sm:text-base" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>

        {/* ===== PRODUCT GRID ===== */}
        {products.length === 0 ? (
          <div className="text-center mt-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
              No products found. Try another name.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 transition-all">
            {products.map((product) => (
              <div
                key={product._id}
                className="hover:scale-[1.02] transition-transform duration-300"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
