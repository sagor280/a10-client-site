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
    fetch(`http://localhost:3000/my-imports?email=${user.email}`)
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

  //  Delete handler 
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/imports/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              // UI theke o remove korbo
              setProducts(products.filter((item) => item._id !== id));

              Swal.fire({
                title: "Deleted!",
                text: "Your import has been removed successfully.",
                icon: "success",
              });
            } else {
              Swal.fire("Error!", "Failed to delete this item.", "error");
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
    <div className="max-w-7xl mx-auto px-4 py-12 ">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          My Imports
        </h1>
        <p className="text-gray-600 text-lg mt-2 font-medium">
          Manage your imported products efficiently
        </p>
        <div className="h-1 w-24  bg-blue-600  mx-auto mt-3 rounded-full"></div>
      </div>

      {/* No products */}
      {products.length === 0 ? (
        <div className="text-center py-20 text-gray-600 font-medium">
          <p>No imports found. Start by adding a new import.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 hover:shadow-md hover:border-teal-100 transition-all duration-300"
            >
              {/* Image */}
              <div className="flex-none flex justify-center sm:justify-start">
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
                <div className="text-sm text-gray-500  mt-2 space-y-1">
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
                {/* Details Button */}
                <button
                  className=" bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium  hover:bg-blue-200 transition duration-300 flex items-center gap-2 text-sm"
                  onClick={() =>
                    navigate(`/product-details/${product.productId}`)
                  }
                >
                  <FaInfoCircle /> Details
                </button>

                {/* Remove Button */}
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-full font-medium hover:bg-red-600 transition duration-300 flex items-center gap-2 text-sm"
                >
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
