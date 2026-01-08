import { Link } from "react-router";
import { motion } from "framer-motion";
import { Settings2, CoffeeIcon, FlaskConicalIcon } from "lucide-react";
import { MdOutlineLaptopMac } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { FaSeedling } from "react-icons/fa";

const CategoriesSection = () => {
  const categories = [
    { name: "Electronics", icon: <MdOutlineLaptopMac className="h-10 w-10 text-blue-600" />, count: "2,500+" },
    { name: "Textiles", icon: <GiClothes className="h-10 w-10 text-pink-500" />, count: "1,800+" },
    { name: "Agriculture", icon: <FaSeedling className="h-10 w-10 text-green-600" />, count: "3,200+" },
    { name: "Machinery", icon: <Settings2 className="h-10 w-10 text-gray-600" />, count: "1,500+" },
    { name: "Food", icon: <CoffeeIcon className="h-10 w-10 text-yellow-600" />, count: "2,100+" },
    { name: "Chemicals", icon: <FlaskConicalIcon className="h-10 w-10 text-purple-600" />, count: "900+" },
  ];

  return (
    <section className=" dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Popular Categories
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Explore products by category
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <Link to="/products" key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl cursor-pointer p-6 flex flex-col items-center justify-center space-y-3 border border-gray-200 dark:border-gray-700"
              >
                <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-700">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {category.count} items
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
