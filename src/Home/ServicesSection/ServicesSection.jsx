import React from "react";
import { Truck, CreditCard, Award, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const services = [
  {
    icon: <Truck className="h-12 w-12 text-blue-600" />,
    title: "Logistics Support",
    desc: "End-to-end shipping solutions with real-time tracking and customs clearance assistance.",
  },
  {
    icon: <CreditCard className="h-12 w-12 text-indigo-600" />,
    title: "Secure Payments",
    desc: "Multiple payment options with escrow protection and currency conversion support.",
  },
  {
    icon: <Award className="h-12 w-12 text-green-600" />,
    title: "Quality Assurance",
    desc: "Third-party inspection services and quality verification for all products.",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20  dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Comprehensive solutions designed to simplify and secure your global trade journey
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all"
            >
              {/* Icon */}
              <div className="h-16 w-16 rounded-xl bg-blue-50 dark:bg-gray-700 flex items-center justify-center mb-6">
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {service.desc}
              </p>

              {/* CTA */}
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline"
              >
                Learn More <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
