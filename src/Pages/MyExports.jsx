import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Link } from 'react-router';
import MyExportCard from '../Component/MyExportCard';
import Loader from './Loader';
import { Plus, PackageSearch } from 'lucide-react';
import { motion } from 'framer-motion'; 

const MyExports = () => {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://import-export-server-blue.vercel.app/my-products?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setProducts(data);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [user.email]);

    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1 
            }
        }
    };

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.4, ease: "easeOut" }
        }
    };

    if (loading) return <Loader />;

    if (error) {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col justify-center items-center h-[60vh] text-center"
            >
                <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl">
                    <p className="text-red-600 dark:text-red-400 font-bold text-lg">Error: {error}</p>
                    <button onClick={() => window.location.reload()} className="mt-4 text-sm bg-red-600 text-white px-4 py-2 rounded-lg">Try Again</button>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="max-w-[1600px] mx-auto p-4">
            {/* --- Header Section --- */}
            <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10"
            >
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                        My Exports
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 font-medium">
                        You have <span className="text-blue-600 dark:text-blue-400 font-bold">{products.length}</span> products in your export list.
                    </p>
                </div>
                
                <Link
                    to="/dashboard/add-export"
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-500/25 active:scale-95"
                >
                    <Plus size={18} /> Add New Export
                </Link>
            </motion.div>

            {/* --- Content Section --- */}
            {products.length === 0 ? (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800"
                >
                    <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-full mb-4">
                        <PackageSearch size={40} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">No products found</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xs text-center text-sm">
                        It looks like you haven't added any export items yet.
                    </p>
                </motion.div>
            ) : (
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {products.map((product) => (
                        <motion.div key={product._id} variants={cardVariants}>
                            <MyExportCard 
                                product={product} 
                                setProducts={setProducts} 
                            />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default MyExports;