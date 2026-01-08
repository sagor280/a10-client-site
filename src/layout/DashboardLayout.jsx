import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  PlusCircle,
  User,
  LogOut,
  Menu,
  X,
  Bell,
} from "lucide-react";
import { AuthContext } from "../Context/AuthContext";
import Logo from "../Component/logo/Logo";

const DashboardLayout = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // থিম শুধুমাত্র রিড করার জন্য (লোগো কালার ঠিক রাখতে)
  const isDarkMode = localStorage.getItem("theme") === "dark";
  const location = useLocation();

  // পেজ লোড হলে থিম অ্যাপ্লাই করা
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
    { name: "My Exports", icon: <Package size={20} />, path: "/dashboard/my-exports" },
    { name: "My Imports", icon: <ShoppingCart size={20} />, path: "/dashboard/my-imports" },
    { name: "Add Export", icon: <PlusCircle size={20} />, path: "/dashboard/add-export" },
    { name: "Profile", icon: <User size={20} />, path: "/dashboard/profile" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 overflow-hidden text-gray-900 dark:text-gray-100">
      
      {/* --- ১. সাইডবার (ডেক্সটপ) --- */}
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
        <div className="h-20 flex items-center px-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <Logo theme={isDarkMode ? "dark" : "light"} />
            <span className="text-lg font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tighter">
              IMPORT HUB
            </span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 mt-4">
          {menuItems.map((item) => (
            <Link key={item.name} to={item.path}>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-bold ${
                  location.pathname === item.path
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {item.icon}
                {item.name}
              </div>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={() => signOutUser()}
            className="flex items-center gap-3 px-4 py-3 w-full text-red-500 font-bold text-sm hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* --- ২. মেইন কন্টেন্ট এরিয়া --- */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* --- হেডার (ডার্কমোড এবং টাইটেল ছাড়া ক্লিন ডিজাইন) --- */}
        <header className="h-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 md:px-8 flex items-center justify-between sticky top-0 z-40">
          
          <div className="flex items-center">
            {/* মোবাইল মেনু বাটন (শুধুমাত্র ছোট স্ক্রিনে দেখাবে) */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl text-gray-600 dark:text-gray-300"
            >
              <Menu size={22} />
            </button>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            {/* নোটিফিকেশন আইকন */}
            <button className="p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all relative border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
              <Bell size={22} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
            </button>

            {/* প্রোফাইল সেকশন */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-800">
              <div className="hidden md:block text-right">
                <p className="text-sm font-bold text-gray-900 dark:text-white leading-none">
                  {user?.displayName || "User Name"}
                </p>
                <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-wider">
                  Trader Account
                </p>
              </div>
              <div className="relative group cursor-pointer">
                <img
                  src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                  className="w-10 h-10 rounded-full border-2 border-blue-500 p-0.5 object-cover bg-white dark:bg-gray-800 transition-transform group-hover:scale-105"
                  alt="profile"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
              </div>
            </div>
          </div>
        </header>

        {/* মেইন আউটলেট যেখানে ড্যাশবোর্ডের পেজগুলো রেন্ডার হবে */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
          <Outlet />
        </main>
      </div>

      {/* মোবাইল সাইডবার ড্রয়ার */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[2000] lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-0 left-0 bottom-0 w-72 bg-white dark:bg-gray-900 p-6 flex flex-col shadow-2xl transition-all">
            <div className="flex justify-between items-center mb-10 pb-4 border-b dark:border-gray-800">
              <Logo theme={isDarkMode ? "dark" : "light"} />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-600 dark:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="space-y-2 flex-1">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div
                    className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all ${
                      location.pathname === item.path
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    {item.icon} {item.name}
                  </div>
                </Link>
              ))}
            </nav>
            <div className="pt-4 border-t dark:border-gray-800">
                <button onClick={signOutUser} className="flex items-center gap-4 px-5 py-4 w-full text-red-500 font-bold italic">
                   <LogOut size={20} /> Logout
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;