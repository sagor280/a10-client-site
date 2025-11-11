import React, { useState } from "react";
import { Star, MapPin, Package } from "lucide-react";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const data = useLoaderData();
  const product = data.result;
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

  // modal open
  const handleModalOpen = () => setShowModal(true);

  // modal close
  const handleModalClose = () => {
    setShowModal(false);
    setQuantity(1);
  };

  // handle import submit
  const handleModalSubmit = async (e) => {
    e.preventDefault();

    if (quantity > product.quantity) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Quantity exceeds available stock!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const importedProduct = {
      productId: product._id,
      name: product.name,
      importQuantity: quantity,
      price: product.price,
      origin: product.origin,
      importedAt: new Date(),
    };

    try {
      // Send imported product to backend
      const res1 = await fetch("http://localhost:3000/imports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(importedProduct),
      });

      const data1 = await res1.json();

      if (data1.success) {
        // Update product quantity
        await fetch(`http://localhost:3000/products/${product._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ $inc: { quantity: -quantity } }),
        });

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product imported successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        handleModalClose();
         navigate("/all-products");
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed to import product!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Something went wrong!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="container py-8 max-w-7xl mx-auto px-4">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:text-blue-800 font-semibold"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={
                    i < Math.round(product.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
              <span className="ml-2 text-gray-600">
                {product.rating} (125 reviews)
              </span>
            </div>

            {/* Price */}
            <div className="text-4xl font-bold text-blue-700">
              ${product.price}
            </div>
          </div>

          {/* Product Details Card */}
          <div className="border border-gray-200 rounded-lg shadow p-6 space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Origin</p>
                <p className="font-semibold">{product.origin}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Package className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Available Quantity</p>
                <p className="font-semibold">{product.quantity} units</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600 leading-relaxed">
              High-quality {product.name.toLowerCase()} sourced directly from{" "}
              {product.origin}. Perfect for businesses looking to import
              premium products at competitive prices. All products meet
              international quality standards and come with proper certification.
            </p>
          </div>

          {/* Import Button */}
          <button
            onClick={handleModalOpen}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition"
          >
            Import Now
          </button>
        </div>
      </div>

      {/* Import Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-blue-900">Import Product</h2>
              <button
                onClick={handleModalClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Enter the quantity you want to import.
            </p>

            <form onSubmit={handleModalSubmit}>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                min="1"
                max={product.quantity}
                className="w-full px-4 py-2 bg-cyan-50 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              />

              <p className="text-sm text-gray-500 mb-6">
                Available: {product.quantity} units
              </p>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-6 py-2 bg-white border border-gray-300 rounded-full text-blue-900 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={quantity > product.quantity}
                  className={`px-6 py-2 rounded-full text-white ${
                    quantity > product.quantity
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-900 hover:bg-blue-800"
                  }`}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
