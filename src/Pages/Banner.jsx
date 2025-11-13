import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaBoxOpen } from "react-icons/fa";
import { MdImportExport } from "react-icons/md";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Simple slides for Import-Export theme
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
    <section className="py-5"> {/* Removed bg from section */}
      {/* Bg moved to container - now constrained like Navbar */}
      <div className="max-w-7xl mx-auto px-4 bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl p-8"> {/* Added p-8 for inner padding, rounded-2xl for glassmorphism match */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          
          {/* Left Text - Gradient & Bold like Navbar Logo */}
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-linear-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent leading-tight">
              Import & Export
              <br />
              <span className="text-gray-800">Hub</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Join our platform to source products globally. 
              Streamline your trade from start to finish.
            </p>
            {/* Button matches Navbar Login style */}
            <button className="btn btn-lg rounded-full bg-linear-to-r from-blue-500 to-indigo-600 text-white border-none shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
              <FaBoxOpen className="text-lg mr-2" />
              Get Started
            </button>
          </div>

          {/* Right Slider - Glass Overlay */}
          <div className="h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg bg-white/70 backdrop-blur-xl border border-white/20">
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
                  <div className="relative h-full">
                    <img
                      src={slide.img}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Glass Card Overlay - Matches theme */}
                    <div className="absolute inset-0 flex items-end p-6">
                      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/50">
                        <div className="flex items-center gap-3 mb-3">
                          {slide.icon}
                          <h3 className="text-2xl font-bold text-gray-800">{slide.title}</h3>
                        </div>
                        <p className="text-gray-600">{slide.desc}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;