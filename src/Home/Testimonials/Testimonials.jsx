import React from "react";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Importer · India",
      image: "https://i.pravatar.cc/150?img=12",
      quote:
        "This platform completely changed how I source products. Reliable suppliers and smooth transactions every time.",
      color: "from-blue-500 to-indigo-600",
    },
    {
      name: "Maria Chen",
      role: "Exporter · China",
      image: "https://i.pravatar.cc/150?img=32",
      quote:
        "Import Export Hub helped me reach buyers globally. The interface is clean and support is outstanding.",
      color: "from-emerald-500 to-green-600",
    },
    {
      name: "John Smith",
      role: "Trader · USA",
      image: "https://i.pravatar.cc/150?img=48",
      quote:
        "Professional, fast, and secure. One of the best platforms I’ve used for international trade.",
      color: "from-purple-500 to-pink-600",
    },
  ];

  return (
    <section className="py-28 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Trusted by Global Traders
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Real feedback from professionals growing their business worldwide
          </p>
        </motion.div>

        {/* Slider */}
        <Swiper
          modules={[Navigation, Autoplay]}
          slidesPerView={1}
          spaceBetween={40}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          navigation
          loop
          className="max-w-4xl mx-auto"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.7 }}
                className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl
                           rounded-3xl p-12 shadow-2xl overflow-hidden"
              >
                {/* Gradient Glow */}
                <div
                  className={`absolute -top-32 -right-32 w-72 h-72 bg-gradient-to-br ${item.color}
                              opacity-20 blur-3xl`}
                />

                {/* Quote Icon */}
                <Quote className="h-10 w-10 text-blue-500 mb-6 opacity-80" />

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xl text-gray-700 dark:text-gray-200 leading-relaxed italic mb-10">
                  “{item.quote}”
                </p>

                {/* Profile */}
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${item.color}
                                  blur-md opacity-60`}
                    />
                    <img
                      src={item.image}
                      alt={item.name}
                      className="relative h-16 w-16 rounded-full object-cover border-2 border-white dark:border-gray-700"
                    />
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
