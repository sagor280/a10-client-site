import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaBoxOpen, FaChevronDown } from "react-icons/fa";
import { MdImportExport } from "react-icons/md";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    img: "https://plus.unsplash.com/premium_photo-1661963455086-8fbd8a330cd5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074",
    title: "Global Trade Hub",
    desc: "Connect buyers & sellers worldwide.",
    icon: <FaBoxOpen className="text-3xl text-blue-500" />,
  },
  {
    img: "https://images.unsplash.com/photo-1592963219751-3800a144a41e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=736",
    title: "Seamless Exports",
    desc: "Manage logistics effortlessly.",
    icon: <MdImportExport className="text-3xl text-indigo-500" />,
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1661521311724-595cf2c3c60e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    title: "Secure Imports",
    desc: "Fast & reliable international deals.",
    icon: <FaBoxOpen className="text-3xl text-purple-500" />,
  },
];

const Banner = () => {
  return (
    <section
      className="relative min-h-[70vh] flex items-center p-10 lg:pt-14 overflow-hidden"
      id="home"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 z-0"></div>

      <div className="relative max-w-7xl mx-auto px-4 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6 text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent leading-tight">
              Import & Export
              <br />
              <span className="text-gray-800 dark:text-gray-100">Hub</span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Join our platform to source products globally. Streamline your
              trade from start to finish.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-lg rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:shadow-xl flex items-center gap-2 transition-transform duration-300 mx-auto lg:mx-0"
            >
              <FaBoxOpen className="text-lg" /> Get Started
            </motion.button>
          </motion.div>

          {/* Right Slider */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg bg-white/70 backdrop-blur-xl border border-white/20"
          >
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={0}
              slidesPerView={1}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation
              loop
              className="h-full"
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div className="relative h-full group">
                    {/* Parallax Image */}
                    <motion.img
                      src={slide.img}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />

                    {/* Overlay Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                      className="absolute inset-0 flex items-end p-6"
                    >
                      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/50">
                        <div className="flex items-center gap-3 mb-3">
                          {slide.icon}
                          <h3 className="text-2xl font-bold text-gray-800">
                            {slide.title}
                          </h3>
                        </div>
                        <p className="text-gray-600">{slide.desc}</p>
                      </div>
                    </motion.div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Hint */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <FaChevronDown className="text-2xl text-blue-500 dark:text-white" />
      </motion.div>
    </section>
  );
};

export default Banner;
