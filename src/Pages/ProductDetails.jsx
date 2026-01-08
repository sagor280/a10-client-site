import React, { use, useState } from "react";
import { Star, MapPin, Package, ArrowLeft, ShieldCheck, Globe, Info, CheckCircle2, ShoppingBag } from "lucide-react";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../Context/AuthContext";

const ProductDetails = () => {
  const data = useLoaderData();
  const product = data?.result ? data.result : data;
  const navigate = useNavigate();
  const { user } = use(AuthContext);

  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

  if (!product || !product.name) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-bounce">📦</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Product not found!</h2>
          <button onClick={() => navigate(-1)} className="text-blue-600 font-bold hover:underline">Go Back</button>
        </div>
      </div>
    );
  }

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    const importedProduct = {
      productId: product._id,
      name: product.name,
      importQuantity: quantity,
      price: product.price,
      imageUrl: product.imageUrl,
      origin: product.origin,
      importedAt: new Date(),
      userEmail: user?.email || "guest@user.com",
    };

    try {
      const res = await fetch("https://import-export-server-blue.vercel.app/imports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(importedProduct),
      });

      const data1 = await res.json();
      if (data1.success) {
        await fetch(`https://import-export-server-blue.vercel.app/products/${product._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: -quantity }),
        });

        Swal.fire({ icon: "success", title: "Import Successful!", showConfirmButton: false, timer: 1500 });
        setShowModal(false);
        navigate("/all-products");
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Something went wrong!" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] dark:bg-gray-950 transition-colors duration-300 pb-20">
      
      {/* --- Section 1: Top Navigation & Back Button --- */}
      <div className="max-w-7xl mx-auto px-4 pt-28 md:pt-32">
        <motion.button 
          whileHover={{ x: -5 }}
          onClick={() => navigate(-1)}
          className="group inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-bold text-sm rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all"
        >
          <ArrowLeft size={18} className="group-hover:scale-110 transition-transform" />
          Back to Marketplace
        </motion.button>
      </div>

      {/* --- Section 2: Main Content --- */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-start">
          
          {/* Left: Product Image & Quick Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="relative aspect-square md:aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-2xl shadow-blue-900/5">
              <img
                src={product.imageUrl || "https://via.placeholder.com/600"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <span className="px-4 py-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl text-xs font-black text-blue-600 shadow-lg border border-white/20 uppercase tracking-tighter">
                  {product.origin}
                </span>
              </div>
            </div>
            
            {/* Quick Feature Grid */}
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              <div className="p-4 bg-white dark:bg-gray-900 rounded-[1.8rem] text-center border border-gray-50 dark:border-gray-800 shadow-sm">
                <Globe className="mx-auto mb-2 text-blue-500" size={20} />
                <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Region</p>
                <p className="text-sm font-black dark:text-white uppercase">{product.origin.slice(0, 10)}</p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-900 rounded-[1.8rem] text-center border border-gray-50 dark:border-gray-800 shadow-sm">
                <Package className="mx-auto mb-2 text-indigo-500" size={20} />
                <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">In Stock</p>
                <p className="text-sm font-black dark:text-white">{product.quantity}</p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-900 rounded-[1.8rem] text-center border border-gray-50 dark:border-gray-800 shadow-sm">
                <ShieldCheck className="mx-auto mb-2 text-green-500" size={20} />
                <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Status</p>
                <p className="text-sm font-black dark:text-white">Active</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Product Info & Actions */}
          <div className="flex flex-col h-full">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-tight tracking-tight">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill={i < 4 ? "currentColor" : "none"} className={i < 4 ? "" : "text-gray-300"} />
                    ))}
                  </div>
                  <span className="text-sm font-black text-gray-400 uppercase tracking-widest">Verified Trading</span>
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-blue-600 tracking-tighter">${product.price}</span>
                <span className="text-lg font-bold text-gray-400 uppercase">/ Shipment</span>
              </div>

              {/* Overview Card */}
              <div className="p-6 md:p-8 bg-blue-50/50 dark:bg-gray-900 rounded-[2.2rem] border border-blue-100/50 dark:border-gray-800 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                  <Info size={80} />
                </div>
                <h3 className="font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Info size={20} className="text-blue-600" />
                  Product Overview
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                  {product.name} is a high-demand product sourced from {product.origin}. 
                  Known for its durability and international quality grade, it is ready for immediate 
                  export to worldwide locations. All logistics and documentation are managed for a seamless experience.
                </p>
              </div>

              {/* Feature Tags */}
              <div className="grid grid-cols-2 gap-y-3">
                {['Secure Import', 'Global Logistics', 'Trade Insurance', 'Quality Assured'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm font-black text-gray-500 dark:text-gray-400">
                    <CheckCircle2 size={16} className="text-blue-600" /> {item}
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-6">
                <motion.button 
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowModal(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-[1.8rem] shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-3 text-xl"
                >
                  <ShoppingBag size={24} /> Start Import Process
                </motion.button>
                <p className="text-center text-[10px] text-gray-400 mt-4 font-black uppercase tracking-[0.2em]">
                  Trade Intelligence System Integrated
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- Section 3: Import Modal --- */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white dark:bg-gray-900 p-8 rounded-[3rem] w-full max-w-md shadow-2xl border border-white dark:border-gray-800"
            >
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">Import Request</h2>
              <form onSubmit={handleModalSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Select Quantity</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                    min="1" max={product.quantity}
                    className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-[1.5rem] focus:ring-2 focus:ring-blue-500 outline-none text-2xl font-black dark:text-white transition-all"
                  />
                  <div className="flex justify-between text-[10px] font-black uppercase text-gray-400 px-2 pt-1">
                    <span>In Stock: {product.quantity}</span>
                    <span className={quantity > product.quantity ? "text-red-500" : ""}>Request: {quantity}</span>
                  </div>
                </div>

                <div className="bg-blue-600 p-6 rounded-[2rem] text-white shadow-lg shadow-blue-500/20">
                  <p className="opacity-70 text-[10px] font-black uppercase tracking-widest mb-1">Total Quotation</p>
                  <div className="flex justify-between items-end">
                    <span className="text-4xl font-black tracking-tighter">${(quantity * product.price).toLocaleString()}</span>
                    <span className="text-xs font-bold opacity-80 uppercase">USD Net</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 font-bold text-gray-400 hover:text-gray-600 transition-colors">Cancel</button>
                  <button 
                    type="submit" 
                    disabled={!quantity || quantity > product.quantity} 
                    className="flex-[2] py-4 bg-gray-900 dark:bg-white dark:text-gray-950 text-white font-black rounded-2xl shadow-xl disabled:opacity-20 transition-all active:scale-95"
                  >
                    Confirm Import
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetails;