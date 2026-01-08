import React from 'react';
import { FaPencilAlt, FaTrash, FaGlobeAmericas, FaStar } from 'react-icons/fa';
import { Link } from 'react-router'; 
import Swal from 'sweetalert2';

const MyExportCard = ({ product, setProducts }) => {
  const { _id, name, imageUrl, price, origin, rating, quantity } = product;

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      background: document.documentElement.classList.contains('dark') ? '#111827' : '#fff',
      color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://import-export-server-blue.vercel.app/products/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setProducts(prev => prev.filter(item => item._id !== id));
              Swal.fire("Deleted!", "Item has been removed.", "success");
            }
          });
      }
    });
  };

  return (
    <div className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full">
      
      {/* Image Section - Height reduced for better grid balance */}
      <div className="relative h-40 overflow-hidden bg-gray-50 dark:bg-gray-800">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Rating Tag */}
        <div className="absolute top-2 right-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm flex items-center gap-1">
          <FaStar className="text-yellow-400 text-[10px]" />
          <span className="text-[10px] font-bold dark:text-gray-200">{rating || "N/A"}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-3">
          <h3 className="text-sm font-bold text-gray-800 dark:text-white truncate" title={name}>
            {name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <FaGlobeAmericas className="text-blue-500" /> {origin}
            </span>
            <span className="text-gray-300 dark:text-gray-700">|</span>
            <span className={`text-[10px] font-bold ${quantity > 0 ? 'text-green-600' : 'text-red-500'}`}>
              Qty: {quantity}
            </span>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-black text-blue-600 dark:text-blue-400">
              ${price}
            </span>
          </div>

          {/* Buttons - Compact & Icon focused */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              to={`/dashboard/update-products/${_id}`}
              className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold hover:bg-blue-600 hover:text-white transition-all"
            >
              <FaPencilAlt size={10} /> Edit
            </Link>
            <button
              onClick={() => handleDelete(_id)}
              className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs font-bold hover:bg-red-500 hover:text-white transition-all"
            >
              <FaTrash size={10} /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyExportCard;