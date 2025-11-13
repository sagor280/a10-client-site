import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Loader from "./Loader";
import { FaInfoCircle, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

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

  // 🔥 Delete handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, this import cannot be recovered!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://import-export-server-blue.vercel.app/imports/${id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setProducts((prev) => prev.filter((item) => item._id !== id));
              Swal.fire("Deleted!", "Import removed successfully.", "success");
            } else {
              Swal.fire("Error!", "Failed to delete item.", "error");
            }
          })
          .catch((err) => {
            console.error("Delete error:", err);
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* ===== HEADER ===== */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            My Imports
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg mt-2 font-medium">
            Manage and track your imported products
          </p>
          <div className="h-1 w-24 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* ===== EMPTY STATE ===== */}
        {products.length === 0 ? (
          <div className="text-center py-20 text-gray-600 dark:text-gray-400 font-medium">
            <p>No imports found. Start importing your favorite products!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="backdrop-blur-md bg-white/70 dark:bg-gray-800/60 border border-gray-200/40 dark:border-gray-700/50 
                rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 p-6"
              >
                {/* Image */}
                <div className="flex-none flex justify-center sm:justify-start">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-32 h-32 object-cover rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
                  />
                </div>

                {/* Content */}
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    {product.name}
                  </h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                    <p>
                      <span className="font-medium text-gray-800 dark:text-gray-300">
                        Origin:
                      </span>{" "}
                      {product.origin}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800 dark:text-gray-300">
                        Imported Quantity:
                      </span>{" "}
                      {product.importQuantity} units
                    </p>
                    <p>
                      <span className="font-medium text-gray-800 dark:text-gray-300">
                        Price per unit:
                      </span>{" "}
                      ${product.price}
                    </p>
                    <p className="font-medium text-gray-900 dark:text-gray-200">
                      Total: $
                      {(product.importQuantity * product.price).toFixed(2)}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      Imported on: {product.importedAt}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center sm:justify-end sm:flex-col gap-3 mt-3 sm:mt-0">
                  {/* Details */}
                  <button
                    className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 
                    px-4 py-2 rounded-full font-medium hover:bg-blue-200 dark:hover:bg-blue-800/50 
                    transition duration-300 flex items-center gap-2 text-sm"
                    onClick={() =>
                      navigate(`/product-details/${product.productId}`)
                    }
                  >
                    <FaInfoCircle /> Details
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-full font-medium 
                    hover:bg-red-600 active:scale-95 transition duration-300 flex items-center gap-2 text-sm"
                  >
                    <FaTrashAlt /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyImports;
