import React, { useEffect, useState } from "react";
import ProductCard from "../Component/ProductCard";
import {
  FaSearch,
  FaSortAmountDown,
  FaTimes,
  FaFilter,
  FaGlobeAmericas,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "./Loader";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchText, setSearchText] = useState("");
  const [origin, setOrigin] = useState("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 12;

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchText) params.append("search", searchText);
      if (origin) params.append("origin", origin);
      if (sort) params.append("sort", sort);
      params.append("page", page);
      params.append("limit", limit);

      const res = await fetch(`https://import-export-server-blue.vercel.app/products?${params}`);
      const data = await res.json();

      if (data.success) {
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
      } else {
        setProducts([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(fetchProducts, 500);
    return () => clearTimeout(delay);
  }, [searchText, origin, sort, page]);

  // ================= ANIMATION VARIANTS =================
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-950 transition-colors duration-300">
      {/* ================= HERO/HEADER SECTION ================= */}
      <div className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-900/10 dark:to-transparent -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center md:text-left">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <span className="inline-block px-4 py-1.5 mb-4 text-[10px] md:text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
              Global Marketplace
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              Explore <span className="text-blue-600">All Products</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed font-medium text-sm md:text-base mx-auto md:mx-0">
              Source premium goods directly from verified international suppliers and scale your business today.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-8 md:-mt-10">
        {/* ================= PREMIUM FILTER BOX ================= */}
        <div className="bg-white dark:bg-gray-900 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-xl shadow-blue-900/5 border border-white dark:border-gray-800 mb-8 md:mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-center">
            
            {/* Search Box - Full width on small, 5 cols on lg */}
            <div className="md:col-span-2 lg:col-span-5 relative group">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchText}
                onChange={(e) => { setSearchText(e.target.value); setPage(1); }}
                className="w-full pl-11 pr-4 py-3 md:py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 focus:border-blue-500/50 rounded-xl md:rounded-2xl dark:text-white outline-none transition-all text-sm md:text-base"
              />
            </div>

            {/* Origin Dropdown - 1 col on md, 3 cols on lg */}
            <div className="lg:col-span-3 relative">
              <FaGlobeAmericas className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
              <select
                value={origin}
                onChange={(e) => { setOrigin(e.target.value); setPage(1); }}
                className="w-full pl-11 pr-8 py-3 md:py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl md:rounded-2xl dark:text-white outline-none cursor-pointer appearance-none text-sm md:text-base"
              >
                <option value="">All Regions</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="China">China</option>
                <option value="USA">USA</option>
                <option value="India">India</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▼</div>
            </div>

            {/* Sort Dropdown - 1 col on md, 3 cols on lg */}
            <div className="lg:col-span-3 relative">
              <FaSortAmountDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={sort}
                onChange={(e) => { setSort(e.target.value); setPage(1); }}
                className="w-full pl-11 pr-8 py-3 md:py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl md:rounded-2xl dark:text-white outline-none cursor-pointer appearance-none text-sm md:text-base"
              >
                <option value="latest">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▼</div>
            </div>

            {/* Filter Toggle Button - Visible only on large screen */}
            <div className="hidden lg:flex lg:col-span-1 justify-center">
              <button className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg shadow-blue-500/30 transition-all active:scale-95">
                <FaFilter />
              </button>
            </div>
          </div>

          {/* Active Filter Badges */}
          <AnimatePresence>
            {(searchText || origin) && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap items-center gap-2 md:gap-3 mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-100 dark:border-gray-800"
              >
                <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-tight">Active Filters:</span>
                {origin && (
                  <div className="flex items-center gap-2 px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-[10px] md:text-xs font-bold border border-blue-100 dark:border-blue-800">
                    {origin} <FaTimes className="cursor-pointer" onClick={() => setOrigin("")} />
                  </div>
                )}
                {searchText && (
                  <div className="flex items-center gap-2 px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg text-[10px] md:text-xs font-bold border border-green-100 dark:border-green-800">
                    "{searchText}" <FaTimes className="cursor-pointer" onClick={() => setSearchText("")} />
                  </div>
                )}
                <button 
                  onClick={() => { setSearchText(""); setOrigin(""); setPage(1); }}
                  className="text-[10px] md:text-xs font-black text-red-500 hover:text-red-600 uppercase underline decoration-2 underline-offset-4"
                >
                  Reset
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ================= PRODUCT DISPLAY ================= */}
        {loading ? (
          <div className="flex justify-center items-center py-20 md:py-32">
            <Loader />
          </div>
        ) : products.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 md:py-32 bg-white dark:bg-gray-900 rounded-[2rem] md:rounded-[3rem] border border-gray-100 dark:border-gray-800">
            <div className="bg-gray-50 dark:bg-gray-800 w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl md:text-4xl">🔎</div>
            <h2 className="text-xl md:text-3xl font-bold dark:text-white">No items found</h2>
            <p className="text-gray-500 mt-3 px-4 text-sm md:text-base">Try adjusting your filters or search keywords.</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-4 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {products.map((product) => (
              <motion.div key={product._id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ================= MODERN PAGINATION ================= */}
        {!loading && totalPages > 1 && (
          <div className="flex flex-col items-center gap-4 mt-12 md:mt-20 pb-20">
            {/* Page Buttons Container */}
            <div className="flex items-center gap-2 overflow-x-auto max-w-full p-2 no-scrollbar">
              <button
                disabled={page === 1}
                onClick={() => { setPage(page - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="flex items-center justify-center min-w-[40px] h-10 md:h-12 px-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 disabled:opacity-30 dark:text-white"
              >
                ←
              </button>

              <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setPage(i + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className={`min-w-[40px] h-10 md:w-12 md:h-12 px-2 rounded-xl font-bold transition-all text-sm md:text-base ${
                      page === i + 1
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-white dark:bg-gray-900 text-gray-400 border border-gray-200 dark:border-gray-800"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                disabled={page === totalPages}
                onClick={() => { setPage(page + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="flex items-center justify-center min-w-[40px] h-10 md:h-12 px-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 disabled:opacity-30 dark:text-white"
              >
                →
              </button>
            </div>
            
            <p className="text-xs text-gray-500 font-medium">
              Page {page} of {totalPages}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;