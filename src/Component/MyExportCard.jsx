import React from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router'; 
import Swal from 'sweetalert2';

const MyExportCard = ({ product }) => {
  const navigate = useNavigate();
  const { _id, name, imageUrl, price, origin, rating, quantity } = product;


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
        fetch(`https://import-export-server-blue.vercel.app/products/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              // UI theke o remove korbo
          navigate('/all-products')
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


  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1 border border-gray-100 max-w-sm">
      {/* Image Section */}
      <div className="relative w-full h-56 bg-gray-100 flex items-center justify-center">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-1 truncate">{name}</h3>
        <p className="text-gray-500 text-sm mb-1">Origin: {origin}</p>
        <p className="text-gray-500 text-sm mb-3">Available: {quantity}</p>     
        <p className="text-2xl font-bold text-blue-700 mb-3">${price}</p>
         
       

        {/* Buttons */}
        <div className="flex gap-3">
          <Link
             to={`/update-products/${_id}`}
            className="flex items-center justify-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium hover:bg-blue-200 transition duration-300 flex-1"
          >
            <FaPencilAlt /> Update
          </Link>
          <button
          onClick={() => handleDelete(_id)}
            className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full font-medium hover:bg-red-600 transition duration-300 flex-1"
          >
            <FaTrash /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyExportCard;
