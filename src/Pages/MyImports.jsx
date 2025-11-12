import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Loader from "./Loader";
import { FaInfoCircle, FaTrashAlt } from "react-icons/fa";

const MyImports = () => {
  const { user } = use(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/my-imports?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, [user.email]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 ">
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-teal-800 tracking-tight">
          My Imports
        </h1>
        <p className="text-gray-600 text-lg mt-2 font-medium">
          Manage your imported products efficiently
        </p>
        <div className="h-1 w-24 bg-teal-500 mx-auto mt-3 rounded-full"></div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-gray-600 font-medium">
          <p>No imports found. Start by adding a new import.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 hover:shadow-md hover:border-teal-100 transition-all duration-300"
            >
              {/* Image */}
              <div className="flex-shrink-0 flex justify-center sm:justify-start">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                />
              </div>

              {/* Content */}
              <div className="flex-grow text-center sm:text-left">
                <h3 className="text-xl font-semibold text-gray-800">
                  {product.name}
                </h3>
                <div className="text-sm text-teal-700 mt-1 space-y-1">
                  <p>
                    <span className="font-medium">Origin:</span>{" "}
                    {product.origin}
                  </p>
                  <p>
                    <span className="font-medium">Imported Quantity:</span>{" "}
                    {product.importQuantity} units
                  </p>
                  <p>
                    <span className="font-medium">Price per unit:</span> $
                    {product.price}
                  </p>
                  <p className="font-medium text-gray-800">
                    Total: ${(product.importQuantity * product.price).toFixed(2)}
                  </p>
                  <p className="text-xs text-blue-500 mt-1">
                    Imported on: {product.importedAt}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-center sm:justify-end sm:flex-col gap-2 mt-3 sm:mt-0">
                <button className="bg-teal-100 text-teal-700 px-4 py-2 rounded-full font-medium hover:bg-teal-200 transition duration-300 flex items-center gap-2 text-sm">
                  <FaInfoCircle /> Details
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-full font-medium hover:bg-red-600 transition duration-300 flex items-center gap-2 text-sm">
                  <FaTrashAlt /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyImports;
