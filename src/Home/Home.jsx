import React, { useState, useEffect } from "react";
import Banner from "../Pages/Banner";
import ProductCard from "../Component/ProductCard";
import { useLoaderData } from "react-router";
import { CheckCircle, Globe, Package, Shield, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";

import CategoriesSection from "./cardCatagory/CategoriesSection";
import TopExportersSection from "./TopExportersSection/TopExportersSection";
import ServicesSection from "./ServicesSection/ServicesSection";
import Testimonials from "./Testimonials/Testimonials";
import Newsletter from "./Newsletter/Newsletter";

// Animated Counter Component
const Counter = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60);
    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(interval);
      }
      setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, [end, duration]);
  return <span>{count.toLocaleString()}</span>;
};

// Framer Motion Variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

const Home = () => {
  const data = useLoaderData();

  const products = data?.products ? data.products : (Array.isArray(data) ? data : []);

  
  const isLoading = !data || (products.length === 0 && !data.success);

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors   duration-300">
      <Banner />

      {/* ===== Latest Products Section ===== */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeUp} className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Latest Products
          </motion.h2>
          <motion.div variants={fadeUp} className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></motion.div>
          <motion.p variants={fadeUp} className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our newest arrivals, curated for quality and innovation.
          </motion.p>
        </motion.div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {isLoading ? (
            
            [...Array(8)].map((_, i) => <ProductCard key={i} loading={true} />)
          ) : (
            
            products.slice(0, 8).map((product, i) => (
              <motion.div
                key={product._id || i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <ProductCard product={product} />
              </motion.div>
            ))
          )}
        </div>
      </section>

      <CategoriesSection />

      {/* ===== Why Choose Us Section ===== */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        >
          Why Choose Us
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            {
              icon: <Globe className="h-12 w-12 text-blue-600" />,
              title: "Global Reach",
              desc: "Connect with traders from over 100 countries and expand your business internationally.",
            },
            {
              icon: <Shield className="h-12 w-12 text-green-600" />,
              title: "Secure Trading",
              desc: "All transactions are protected with industry-standard security measures.",
            },
            {
              icon: <Zap className="h-12 w-12 text-yellow-500" />,
              title: "Fast & Easy",
              desc: "Simple process to list products and manage your imports and exports efficiently.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg cursor-pointer"
            >
              <div className="flex items-center justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== Statistics Section ===== */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: <Users className="mx-auto h-12 w-12 text-blue-600" />, num: 15000, label: "Active Traders" },
            { icon: <Package className="mx-auto h-12 w-12 text-green-600" />, num: 50000, label: "Products Listed" },
            { icon: <Globe className="mx-auto h-12 w-12 text-purple-600" />, num: 120, label: "Countries" },
            { icon: <CheckCircle className="mx-auto h-12 w-12 text-teal-600" />, num: 98, label: "Success Rate (%)" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="space-y-2"
            >
              {item.icon}
              <div className="text-4xl font-bold text-gray-900 dark:text-white">
                <Counter end={item.num} />
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <TopExportersSection />
      <ServicesSection />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Home;