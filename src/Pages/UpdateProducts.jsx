import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { PackageOpen, Save, X, Globe, DollarSign, Layers, Star, ImageIcon } from "lucide-react";

const UpdateProducts = () => {
  const data = useLoaderData();
  
  
  const product = data?.result || data; 
  
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
    };

    fetch(`https://import-export-server-blue.vercel.app/products/${product?._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0 || data.success) {
          Swal.fire({
            icon: "success",
            title: "Updated Successfully!",
            text: "Your product info has been changed.",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/my-exports");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
          <PackageOpen className="text-blue-600" size={32} /> Edit Product
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 font-medium">
          Change the values below to update the listing.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Product Name */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Product Name</label>
              <input
                type="text"
                name="name"
                defaultValue={product?.name} 
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all"
              />
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Image URL</label>
              <input
                type="url"
                name="imageUrl"
                defaultValue={product?.imageUrl} 
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all"
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Price (USD)</label>
              <input
                type="number"
                name="price"
                step="0.01"
                defaultValue={product?.price} 
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all"
              />
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Quantity</label>
              <input
                type="number"
                name="quantity"
                defaultValue={product?.quantity}
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all"
              />
            </div>

            {/* Origin */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Origin Country</label>
              <input
                type="text"
                name="country"
                defaultValue={product?.origin} 
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all"
              />
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Rating (0-5)</label>
              <input
                type="number"
                name="rating"
                step="0.1"
                defaultValue={product?.rating} 
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all"
              />
            </div>

          </div>

          <div className="flex justify-end gap-4 pt-6 border-t dark:border-gray-800">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex items-center gap-2"
            >
              <X size={18} /> Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg transition-all active:scale-95 flex items-center gap-2"
            >
              <Save size={18} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProducts;