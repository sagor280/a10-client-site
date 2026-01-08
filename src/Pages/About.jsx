import React, { useState, useEffect } from "react";
import {
  Globe,
  Shield,
  Target,
  Heart,
  ArrowRight,
  Users,
  CheckCircle,
  Package,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";

// --- Animated Counter Component (Fixed & Integrated) ---
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

// --- Framer Motion Variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" },
  }),
};

export default function About() {
  useEffect(() => {
    document.title = "About Us - Import Export Hub";
  }, []);

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      bio: "20+ years in international trade expertise.",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      bio: "Visionary leader in trade technology.",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      bio: "Global logistics & supply chain expert.",
    },
    {
      name: "David Kim",
      role: "Head of Partnerships",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      bio: "Expanding global business horizons.",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      
      {/* 1. Hero Section - Modern Gradient */}
      <section className="relative py-24 px-4 text-center bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-900/10 dark:to-transparent">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
            Our Journey
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
            Empowering <span className="text-blue-600">Global Commerce</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to democratize global trade by connecting businesses 
            of all sizes with opportunities worldwide through innovation and trust.
          </p>
        </motion.div>
      </section>

      {/* 2. Our Story Section - Clean Layout */}
      <section className="max-w-7xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Our Story</h2>
            <div className="w-16 h-1.5 bg-blue-600 rounded-full"></div>
          </div>
          <div className="text-gray-600 dark:text-gray-300 space-y-5 text-lg leading-relaxed">
            <p>
              Founded in 2020, <span className="font-semibold text-blue-600">Import Export Hub</span> was born from a simple observation: international trade was too complex and inaccessible for small businesses.
            </p>
            <p>
              Our founders set out to build a platform that levels the playing field. Today, we bridge the gap between 120+ countries, making trade simple, secure, and accessible.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
              <CheckCircle className="text-blue-600 w-5 h-5" /> Verified Global Network
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
              <CheckCircle className="text-blue-600 w-5 h-5" /> 24/7 Expert Support
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }} viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute -inset-4 bg-blue-600/10 rounded-3xl blur-2xl group-hover:bg-blue-600/20 transition duration-500"></div>
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" 
            alt="Team" className="relative rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700"
          />
          <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-8 rounded-3xl shadow-xl transform group-hover:-rotate-3 transition duration-300">
            <div className="text-4xl font-bold">5+</div>
            <div className="text-xs uppercase font-bold tracking-tighter opacity-80">Years of Excellence</div>
          </div>
        </motion.div>
      </section>

      {/* 3. Stats Section - Integrated from Home Style */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { icon: <Users className="mx-auto h-10 w-10 text-blue-600" />, num: 15000, label: "Active Traders" },
              { icon: <Package className="mx-auto h-10 w-10 text-green-600" />, num: 50000, label: "Products Listed" },
              { icon: <Globe className="mx-auto h-10 w-10 text-purple-600" />, num: 120, label: "Countries" },
              { icon: <Award className="mx-auto h-10 w-10 text-yellow-500" />, num: 98, label: "Success Rate (%)" },
            ].map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}>
                <div className="mb-4">{item.icon}</div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  <Counter end={item.num} />{item.label.includes('%') ? '%' : '+'}
                </div>
                <p className="text-gray-500 dark:text-gray-400 font-medium">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Mission & Values - Modern Cards */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Our Values</h2>
          <p className="text-gray-500 max-w-xl mx-auto">The core principles that drive our commitment to you.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Target className="text-blue-600" />, title: "Our Mission", desc: "Empowering businesses with seamless tools for global scaling.", color: "blue" },
            { icon: <Shield className="text-green-600" />, title: "Trust & Security", desc: "Rigorous verification and secure payment protocols for every deal.", color: "green" },
            { icon: <Heart className="text-red-500" />, title: "User Success", desc: "Our growth is measured by the success of our global trading community.", color: "red" }
          ].map((val, i) => (
            <motion.div 
              key={i} whileHover={{ y: -10 }} className="p-10 bg-white dark:bg-gray-800 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="bg-gray-50 dark:bg-gray-900 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                {val.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{val.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Team Section - Stylish Cards */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">The Minds Behind the Hub</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <motion.div 
                key={idx} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={idx}
                className="group bg-white dark:bg-gray-900 rounded-3xl p-4 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-square mb-6">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                </div>
                <div className="text-center px-2">
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">{member.name}</h4>
                  <p className="text-blue-600 text-xs font-black uppercase tracking-widest mt-1">{member.role}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-[13px] mt-4 leading-relaxed line-clamp-2">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA Section - High Impact */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="bg-blue-600 rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden"
        >
          <Globe className="absolute -right-16 -bottom-16 w-80 h-80 text-white/10" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 italic">Ready to scale your business?</h2>
            <p className="text-blue-100 mb-10 max-w-xl mx-auto text-lg">Join 15,000+ traders and start your international trading journey today with the most trusted hub.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:translate-y-[-2px] transition-all flex items-center gap-2 active:scale-95">
                Get Started Free <ArrowRight className="h-5 w-5" />
              </button>
              <button className="border-2 border-white/40 hover:bg-white/10 px-10 py-4 rounded-full font-bold text-lg transition-all backdrop-blur-sm">
                Contact Sales
              </button>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}