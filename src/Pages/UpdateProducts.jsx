import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";

const UpdateProducts = () => {
  const data = useLoaderData();
  const product = data.result;
  const navigate = useNavigate();
   const handleSubmit = (e) => {
      e.preventDefault();
      const formData = {
        name: e.target.name.value,
        imageUrl: e.target.imageUrl.value,
        price: e.target.price.value,
        quantity: e.target.quantity.value,
        origin: e.target.country.value,
        rating: e.target.rating.value,
        
      
      };
       fetch(`http://localhost:3000/products/${product._id}`,{
          method:'PUT',
          headers:{
              "Content-Type":"application/json",
          },
          body:JSON.stringify(formData)
      })
      .then(res=>res.json())
      .then(data=>{
          console.log(data)
           Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product export successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  navigate('/my-exports')
      })
      
      .catch(err=>{
          console.log(err)
      })
  
    };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 p-6">
      <div className="w-full max-w-lg bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-blue-100">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8 tracking-wide">
          Update Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              defaultValue={product.name}
              name="name"
              placeholder="Enter product name"
              className="w-full px-5 py-3 text-gray-800 bg-gray-50 border border-gray-300 rounded-xl 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              defaultValue={product.imageUrl}
              name="imageUrl"
              placeholder="https://example.com/image.jpg"
              className="w-full px-5 py-3 text-gray-800 bg-gray-50 border border-gray-300 rounded-xl 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition"
            />
          </div>

          {/* Price & Quantity */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">
                Price (USD)
              </label>
              <input
                type="number"
                defaultValue={product.price}
                name="price"
                placeholder="0.00"
                step="0.01"
                className="w-full px-5 py-3 text-gray-800 bg-gray-50 border border-gray-300 rounded-xl 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                defaultValue={product.quantity}
                name="quantity"
                placeholder="100"
                className="w-full px-5 py-3 text-gray-800 bg-gray-50 border border-gray-300 rounded-xl 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition"
              />
            </div>
          </div>

          {/* Origin & Rating */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">
                Origin Country
              </label>
              <input
                type="text"
                defaultValue={product.origin}
                name="country"
                placeholder="e.g., India"
                className="w-full px-5 py-3 text-gray-800 bg-gray-50 border border-gray-300 rounded-xl 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">
                Rating (0–5)
              </label>
              <input
                type="number"
                defaultValue={product.rating}
                name="rating"
                placeholder="4.5"
                step="0.1"
                min="0"
                max="5"
                className="w-full px-5 py-3 text-gray-800 bg-gray-50 border border-gray-300 rounded-xl 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-blue-700 text-white font-semibold hover:bg-blue-800 shadow-md hover:shadow-lg transition-all"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UpdateProducts;
