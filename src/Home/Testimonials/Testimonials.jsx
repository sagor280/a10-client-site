import React from "react";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Importer · India",
      image: "https://i.pravatar.cc/150?img=12",
      quote: "This platform completely changed how I source products. Reliable suppliers and smooth transactions every time.",
      color: "from-blue-500 to-indigo-600",
    },
    {
      name: "Maria Chen",
      role: "Exporter · China",
      image: "https://i.pravatar.cc/150?img=32",
      quote: "Import Export Hub helped me reach buyers globally. The interface is clean and support is outstanding.",
      color: "from-emerald-500 to-green-600",
    },
    {
      name: "John Smith",
      role: "Trader · USA",
      image: "https://i.pravatar.cc/150?img=48",
      quote: "Professional, fast, and secure. One of the best platforms I’ve used for international trade.",
      color: "from-purple-500 to-pink-600",
    },
  ];

  return (
    <section className="py-28 bg-white dark:bg-[#0b0f1a] overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            Trusted by Global Traders
          </h2>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg font-medium">
            Real feedback from professionals growing their business worldwide
          </p>
        </motion.div>

        {/* Slider Area */}
        <div className="relative max-w-4xl mx-auto px-4 lg:px-0">
          <Swiper
            modules={[Navigation, Autoplay, EffectFade, Pagination]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            slidesPerView={1}
            spaceBetween={0}
            autoHeight={false} // উচ্চতা ফিক্সড রাখার জন্য এটি জরুরি
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation={true}
            pagination={{ clickable: true }}
            loop={true}
            className="rounded-[2.5rem] !pb-12"
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index} className="bg-transparent h-full">
                {/* min-h-[400px] বা md:min-h-[350px] যোগ করা হয়েছে যাতে উচ্চতা না কমে */}
                <div className="relative bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] p-8 md:p-16 overflow-hidden min-h-[420px] md:min-h-[380px] flex flex-col justify-center">
                  
                  <div className={`absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-br ${item.color} opacity-10 blur-[80px] pointer-events-none`} />

                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} mb-8 shadow-lg`}>
                      <Quote className="h-7 w-7 text-white" />
                    </div>

                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
                      ))}
                    </div>

                    <blockquote className="text-xl md:text-2xl text-gray-800 dark:text-gray-100 font-bold leading-snug mb-10 italic min-h-[80px]">
                      "{item.quote}"
                    </blockquote>

                    <div className="flex items-center gap-5 mt-auto">
                      <div className="relative group">
                        <div className={`absolute -inset-1 rounded-full bg-gradient-to-br ${item.color} opacity-40 blur transition duration-500 group-hover:opacity-75`} />
                        <img
                          src={item.image}
                          alt={item.name}
                          className="relative h-16 w-16 rounded-full object-cover border-2 border-white dark:border-gray-800"
                        />
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-gray-900 dark:text-white">
                          {item.name}
                        </h4>
                        <p className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style>{`
        .swiper-button-next, .swiper-button-prev {
          color: #2563eb !important;
          transform: scale(0.5);
          background: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .swiper-pagination-bullet-active {
          background: #2563eb !important;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;