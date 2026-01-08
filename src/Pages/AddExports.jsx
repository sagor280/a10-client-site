import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { PackagePlus, Image as ImageIcon, DollarSign, Layers, Globe, Star, X } from "lucide-react";

const AddExports = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    
    const formData = {
      name: form.name.value,
      imageUrl: form.imageUrl.value,
      price: parseFloat(form.price.value),
      quantity: parseInt(form.quantity.value),
      origin: form.country.value,
      rating: parseFloat(form.rating.value),
      created_at: new Date(),
      created_by: user?.email
    };

    fetch('https://import-export-server-blue.vercel.app/products', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
      if (data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Product Added!",
          text: "Your export product has been listed successfully.",
          showConfirmButton: false,
          timer: 2000,
          background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff',
          color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
        });
        navigate('/dashboard/my-exports');
      }
    })
    .catch(err => console.error(err));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
          <PackagePlus className="text-blue-600" size={32} /> Add New Export
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 font-medium">
          Fill in the details below to list a new product for export.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-blue-500/5 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Product Name */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                Product Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Premium Basmati Rice"
                  className="w-full pl-4 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
                />
              </div>
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                Image URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  name="imageUrl"
                  required
                  placeholder="https://example.com/product.jpg"
                  className="w-full pl-4 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
                />
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                Price (USD)
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400"><DollarSign size={18} /></span>
                <input
                  type="number"
                  name="price"
                  required
                  step="0.01"
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
                />
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                Initial Stock Quantity
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400"><Layers size={18} /></span>
                <input
                  type="number"
                  name="quantity"
                  required
                  placeholder="e.g. 500"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
                />
              </div>
            </div>

            {/* Origin */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                Origin Country
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400"><Globe size={18} /></span>
                <input
                  type="text"
                  name="country"
                  required
                  placeholder="e.g. Bangladesh"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
                />
              </div>
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                Product Rating (0-5)
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400"><Star size={18} /></span>
                <input
                  type="number"
                  name="rating"
                  required
                  step="0.1"
                  min="0"
                  max="5"
                  placeholder="4.5"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
                />
              </div>
            </div>

          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-6 border-t dark:border-gray-800">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
            >
              <X size={18} /> Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-10 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <PackagePlus size={18} /> Add Product to List
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExports;