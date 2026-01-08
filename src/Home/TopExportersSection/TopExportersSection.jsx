import React from "react";
import { Flag } from "lucide-react";
import { motion } from "framer-motion";

const topExporters = [
  { country: "India", products: "8,500+", growth: "+15%", color: "bg-orange-100 text-orange-600" },
  { country: "China", products: "12,000+", growth: "+22%", color: "bg-red-100 text-red-600" },
  { country: "USA", products: "6,200+", growth: "+18%", color: "bg-blue-100 text-blue-600" },
  { country: "Germany", products: "4,800+", growth: "+12%", color: "bg-gray-100 text-gray-700" },
];

const TopExportersSection = () => {
  return (
    <section className="py-16  dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Top Exporting Countries
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Leading nations in global trade
          </p>
        </motion.div>

        {/* Exporter Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {topExporters.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col items-center text-center cursor-pointer transition-all"
            >
              <div className={`h-16 w-16 rounded-full flex items-center justify-center mb-4 shadow ${item.color}`}>
                <Flag className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {item.country}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{item.products} Products</p>
              <p className="text-sm font-medium text-green-600 mt-1">{item.growth} growth</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopExportersSection;
