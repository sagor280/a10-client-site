import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useNavigate } from "react-router";
import { Rocket, MoveLeft, Home, Sparkles } from "lucide-react";

const Errorpage = () => {
  const navigate = useNavigate();
  
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  // Parallax effects
  const rotateX = useTransform(y, [-300, 300], [10, -10]);
  const rotateY = useTransform(x, [-300, 300], [-10, 10]);

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#050505] flex items-center justify-center p-6 overflow-hidden relative"
    >
      {/* Background Glass Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          className="absolute bg-white/20 rounded-full blur-[1px]"
          style={{
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <motion.div 
        style={{ rotateX, rotateY, perspective: 1000 }}
        className="relative z-10 text-center"
      >
        {/* Animated Rocket Container */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [-20, 20] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="relative inline-block mb-12"
        >
          <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-30 animate-pulse"></div>
          <Rocket size={120} className="text-blue-500 relative z-10 filter drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
          <motion.div 
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-16 bg-gradient-to-t from-transparent via-orange-500 to-transparent blur-md"
          />
        </motion.div>

        {/* 404 Text with Outline */}
        <div className="relative mb-6">
          <h1 className="text-[10rem] md:text-[16rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent italic select-none">
            404
          </h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-widest uppercase flex items-center gap-4">
              <Sparkles className="text-blue-400" /> Lost <Sparkles className="text-purple-400" />
            </h2>
          </motion.div>
        </div>

        {/* Description */}
        <div className="max-w-xl mx-auto space-y-8">
          <p className="text-gray-400 text-lg md:text-xl font-medium px-4">
            You've drifted too far into the void. The coordinate you're looking for doesn't exist in this sector.
          </p>

          {/* Action Buttons with Neomorphism/Glassmorphism */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-10 py-4 bg-white/5 backdrop-blur-xl text-white font-bold rounded-2xl border border-white/10 transition-all"
            >
              <MoveLeft size={20} /> Abort Mission
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59,130,246,0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
            >
              <Home size={20} /> Back to Base
            </motion.button>
          </div>
        </div>

        {/* Floating Tag */}
        <motion.div 
          animate={{ x: [-5, 5] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="mt-16 inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Signal Lost: 0x404_VOID</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Errorpage;