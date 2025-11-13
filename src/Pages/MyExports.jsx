import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Link } from 'react-router';
import MyExportCard from '../Component/MyExportCard';
import Loader from './Loader';

const MyExports = () => {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/my-products?email=${user.email}`)
        .then(res=> res.json())
        .then(data=>{
            setProducts(data)
            setLoading(false)
        })
        .catch(err=>{
            setError(err.message)
            setLoading(false)
        })
    }, [user.email]);

    if (loading) {
        return <Loader />
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-red-600 font-semibold dark:text-red-400">
                <p>Error: {error}. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12  ">
            {/* Header Section */}
            <div className="bg-linear-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 py-16 rounded-2xl shadow-lg mb-12 transition-all duration-500">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
                                My Exports
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300 text-lg mt-2">
                                Manage and oversee your export products with ease
                            </p>
                        </div>
                        <Link
                            to="/add-export"
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-300 shadow-md"
                        >
                            Add New Export
                        </Link>
                    </div>
                </div>
            </div>

            {/* Empty State */}
            {products.length === 0 ? (
                <div className="text-center py-16 text-gray-600 dark:text-gray-400 font-medium">
                    <p>No products found. Begin by adding a new export to get started.</p>
                </div>
            ) : (
                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                    {products.map((product) => (
                        <div 
                            key={product._id} 
                            className="transition-transform hover:scale-[1.02] duration-300"
                        >
                            <MyExportCard product={product} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyExports;
