import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Loader from "./Loader";
import { FaInfoCircle, FaTrashAlt, FaCalendarAlt, FaBoxOpen } from "react-icons/fa";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { motion } from "framer-motion"; 

const MyImports = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;
    fetch(`https://import-export-server-blue.vercel.app/my-imports?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading imports:", err);
        setLoading(false);
      });
  }, [user?.email]);

  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 } 
    }
  };

  const rowVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This item will be permanently removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Remove it!",
      background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff',
      color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://import-export-server-blue.vercel.app/imports/${id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setProducts((prev) => prev.filter((item) => item._id !== id));
              Swal.fire("Deleted!", "Record removed.", "success");
            }
          });
      }
    });
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-[1400px] mx-auto p-4">
      {/* --- HEADER --- */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Import History
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 font-medium italic">
            Review and manage all your successfully imported items.
          </p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-xl border border-blue-100 dark:border-blue-800 self-start">
           <p className="text-blue-600 dark:text-blue-400 font-bold text-sm">
             Total Imported: {products.length}
           </p>
        </div>
      </motion.div>

      {/* --- CONTENT --- */}
      {products.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800"
        >
          <FaBoxOpen size={50} className="text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">No active imports</h3>
          <p className="text-gray-500 text-sm mt-1">Go to the marketplace to start importing.</p>
        </motion.div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-5"
        >
          {products.map((product) => (
            <motion.div
              key={product._id}
              variants={rowVariants}
              whileHover={{ x: 5 }} 
              className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 sm:p-5 flex flex-col md:flex-row items-center gap-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-200 dark:hover:border-blue-900/50"
            >
              {/* Product Image */}
              <div className="relative w-full md:w-32 h-32 flex-shrink-0 overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Product Info */}
              <div className="flex-grow w-full">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                      <span className="text-xs font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-md">
                        {product.origin}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                        <FaCalendarAlt className="text-blue-500" />
                        {product.importedAt}
                      </span>
                    </div>
                  </div>

                  {/* Pricing Info */}
                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:text-right border-t lg:border-t-0 pt-4 lg:pt-0 dark:border-gray-800">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Qty x Price</p>
                      <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                        {product.importQuantity} × ${product.price}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-blue-500 dark:text-blue-400 uppercase tracking-widest leading-none mb-1">Total Bill</p>
                      <p className="text-lg font-black text-gray-900 dark:text-white">
                        ${(product.importQuantity * product.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex md:flex-col gap-2 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 dark:border-gray-800">
                <button
                  onClick={() => navigate(`/product-details/${product.productId}`)}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold text-xs hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                  <FaInfoCircle /> Details
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-red-50 dark:bg-red-900/10 text-red-500 font-bold text-xs hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                  <FaTrashAlt /> Remove
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MyImports;