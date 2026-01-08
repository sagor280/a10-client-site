import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { 
  Package, Ship, DollarSign, Wallet, TrendingUp, 
  ArrowUpRight, Plus, PackageSearch, UserCircle, User 
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar, Cell 
} from 'recharts';
import Loader from "../Loader";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://import-export-server-blue.vercel.app/user-stats/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setStats(data.stats);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Stats fetch error:", err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  
  const chartData = [
    { name: 'Sun', export: 400, import: 240 },
    { name: 'Mon', export: 300, import: 139 },
    { name: 'Tue', export: 900, import: 980 },
    { name: 'Wed', export: 700, import: 390 },
    { name: 'Thu', export: 1100, import: 480 },
    { name: 'Fri', export: 1890, import: 380 },
    { name: 'Sat', export: 2390, import: 430 },
  ];

  if (loading) return <Loader />;

  const cardData = [
    { title: "Total Exported", value: stats?.totalExports || 0, icon: <Package size={24} />, color: "from-blue-600 to-blue-400" },
    { title: "Total Imported", value: stats?.totalImports || 0, icon: <Ship size={24} />, color: "from-purple-600 to-purple-400" },
    { title: "Export Value", value: `$${stats?.totalExportValue?.toLocaleString() || 0}`, icon: <DollarSign size={24} />, color: "from-emerald-600 to-emerald-400" },
    { title: "Import Spending", value: `$${stats?.totalImportCost?.toLocaleString() || 0}`, icon: <Wallet size={24} />, color: "from-orange-600 to-orange-400" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-10 max-w-[1600px] mx-auto">
      
      {/* --- HEADER SECTION --- */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }} 
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Welcome, <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{user?.displayName?.split(' ')[0] || 'User'}!</span> 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium mt-2 text-lg">Your trade summary is looking great today.</p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-gray-900 shadow-sm border dark:border-gray-800 px-5 py-3 rounded-2xl">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm font-bold dark:text-gray-300 tracking-wide">SYSTEM ONLINE</span>
        </div>
      </motion.div>

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardData.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
            whileHover={{ y: -10 }}
            className="relative bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl shadow-blue-500/5 group overflow-hidden"
          >
            <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${card.color} opacity-10 rounded-full transition-transform group-hover:scale-150 duration-700`}></div>
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20`}>
              {card.icon}
            </div>
            <p className="text-gray-400 dark:text-gray-500 font-bold text-xs uppercase tracking-widest">{card.title}</p>
            <h2 className="text-3xl font-black dark:text-white mt-1">{card.value}</h2>
          </motion.div>
        ))}
      </div>

      {/* --- CHARTS SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-900 p-8 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-2xl"
        >
          <h3 className="text-xl font-bold dark:text-white mb-8 flex items-center gap-2">
            <TrendingUp className="text-blue-500" /> Weekly Trade Analytics
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorExport" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                <Area type="monotone" dataKey="export" stroke="#2563eb" strokeWidth={4} fillOpacity={1} fill="url(#colorExport)" />
                <Area type="monotone" dataKey="import" stroke="#9333ea" strokeWidth={4} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-900 p-8 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-2xl flex flex-col justify-between"
        >
          <h3 className="text-xl font-bold dark:text-white mb-6">Market Activity</h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.slice(2, 7)}>
                <Bar dataKey="export" radius={[10, 10, 10, 10]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#2563eb' : '#e2e8f0'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 p-8 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-[2.5rem] text-white flex items-center justify-between group cursor-pointer">
            <div>
              <p className="text-sm font-bold opacity-80 uppercase">Business Insights</p>
              <h4 className="text-xl font-black">Analyze Global Trends</h4>
            </div>
            <div className="bg-white text-blue-600 p-4 rounded-2xl shadow-lg group-hover:rotate-45 transition-transform">
              <ArrowUpRight size={24} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* --- QUICK ACTIONS SECTION --- */}
      <div className="pt-4">
        <h3 className="text-2xl font-black dark:text-white mb-8">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            onClick={() => navigate("/dashboard/add-export")}
            className="cursor-pointer group p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] text-white shadow-2xl shadow-blue-500/20 relative overflow-hidden"
          >
            <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <Package size={180} />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/30">
                <Plus size={28} />
              </div>
              <h4 className="text-2xl font-black">Add New Export</h4>
              <p className="text-blue-100 mt-2 font-medium">List a new product for the global market.</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            onClick={() => navigate("/all-products")}
            className="cursor-pointer group p-8 bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl relative overflow-hidden"
          >
            <div className="absolute -right-8 -bottom-8 text-gray-100 dark:text-gray-800 opacity-30 group-hover:scale-110 transition-transform duration-700">
              <Ship size={180} />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <PackageSearch size={28} />
              </div>
              <h4 className="text-2xl font-black dark:text-white">Browse Products</h4>
              <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Explore and import new items.</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            onClick={() => navigate("/dashboard/profile")}
            className="cursor-pointer group p-8 bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl relative overflow-hidden"
          >
            <div className="absolute -right-8 -bottom-8 text-gray-100 dark:text-gray-800 opacity-30 group-hover:scale-110 transition-transform duration-700">
              <User size={180} />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-purple-50 dark:bg-purple-900/30 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <UserCircle size={28} />
              </div>
              <h4 className="text-2xl font-black dark:text-white">User Profile</h4>
              <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Manage account and settings.</p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default DashboardHome;