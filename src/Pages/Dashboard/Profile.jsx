import React, { useContext, useState } from "react";
import { User, Mail, Camera, Save, Edit3, X, ShieldCheck, MapPin, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;

    updateUserProfile(name, photo)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Profile Synchronized!",
          text: "Your identity has been updated across all platforms.",
          showConfirmButton: false,
          timer: 2000,
          background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff',
          color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
        });
        setIsEditing(false);
      })
      .catch((err) => {
        Swal.fire("Update Failed", err.message, "error");
      });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-0">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-end mb-10"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Account <span className="text-blue-600">Profile</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">Manage your professional trade identity.</p>
        </div>
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-full border border-emerald-100 dark:border-emerald-800">
          <ShieldCheck size={18} />
          <span className="text-xs font-bold uppercase tracking-wider">Verified Merchant</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Identity Card */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl shadow-blue-500/5 p-8 text-center relative overflow-hidden group">
             {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"></div>
            
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <img
                src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                alt="Profile"
                className="w-32 h-32 rounded-[2.5rem] border-4 border-white dark:border-gray-800 object-cover shadow-2xl relative z-10 rotate-3 group-hover:rotate-0 transition-transform duration-500"
              />
            </div>

            <h2 className="text-2xl font-black text-gray-900 dark:text-white">{user?.displayName || "Global Trader"}</h2>
            <p className="text-blue-600 font-bold text-sm mb-6">{user?.email}</p>

            <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                <MapPin size={16} className="text-blue-500" /> <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                <Briefcase size={16} className="text-purple-500" /> <span>Import-Export Specialist</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Details/Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl shadow-blue-500/5 p-8 md:p-10 h-full">
            
            <AnimatePresence mode="wait">
              {!isEditing ? (
                /* VIEW MODE */
                <motion.div 
                  key="view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold dark:text-white">Profile Details</h3>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all"
                    >
                      <Edit3 size={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Full Name</p>
                      <p className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        {user?.displayName || "N/A"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Email Address</p>
                      <p className="text-lg font-bold text-gray-800 dark:text-white">{user?.email}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Account Status</p>
                      <span className="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-black rounded-lg">ACTIVE</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Member Since</p>
                      <p className="text-lg font-bold text-gray-800 dark:text-white">January 2024</p>
                    </div>
                  </div>

                  <div className="p-6 bg-blue-600 rounded-[2rem] text-white flex items-center justify-between mt-10 shadow-xl shadow-blue-500/30">
                    <div>
                      <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Trade Level</p>
                      <h4 className="text-2xl font-black">Platinum Merchant</h4>
                    </div>
                    <ShieldCheck size={40} className="opacity-40" />
                  </div>
                </motion.div>
              ) : (
                /* EDIT MODE */
                <motion.form 
                  key="edit"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onSubmit={handleUpdate} 
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold dark:text-white mb-6">Update Credentials</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-500 uppercase ml-2">Display Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          name="name"
                          defaultValue={user?.displayName}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white font-bold"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-500 uppercase ml-2">Avatar Source URL</label>
                      <div className="relative">
                        <Camera className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="url"
                          name="photo"
                          defaultValue={user?.photoURL}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white font-bold"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-6">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                    >
                      <Save size={20} /> Deploy Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-4 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-2xl font-bold hover:bg-rose-50 hover:text-rose-600 transition-all"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;