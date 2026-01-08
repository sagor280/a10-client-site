import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router"; 
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";
import Logo from "../Component/logo/Logo";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // React Hook Form Initialization
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    toast.loading("Signing in...", { id: "login-toast" });

    signInUser(email, password)
      .then((result) => {
        toast.success("Welcome Back!", { id: "login-toast" });
        navigate(location.state || "/");
      })
      .catch((error) => {
        toast.error(error.message || "Invalid email or password", { id: "login-toast" });
      });
  };

  const handleGoogleSignIn = () => {
    toast.loading("Connecting to Google...", { id: "google-toast" });
    signInWithGoogle()
      .then((result) => {
        toast.success("Login Successful!", { id: "google-toast" });
        navigate(location?.state || "/");
      })
      .catch((error) => {
        toast.error(error.message, { id: "google-toast" });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0b0f1a] py-12 px-4 transition-colors duration-500">
      <div className="bg-white dark:bg-gray-900 w-full mx-auto max-w-md shadow-2xl border border-gray-100 dark:border-gray-800 rounded-[2rem] overflow-hidden">
        <div className="p-8 md:p-12">
          
          {/* Animated Logo Section */}
          <div className="text-center mb-10">
            <div className="inline-block group transition-transform duration-500 hover:rotate-6 hover:scale-110 active:scale-95">
              <Logo />
            </div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mt-4">Welcome Back</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">Log in to your global trade dashboard</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Email Field */}
            <div className="form-control">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 ${errors.email ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-transparent dark:border-gray-700'} focus:border-blue-500 outline-none transition-all text-gray-900 dark:text-white font-medium`}
                  {...register("email", { 
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                  })}
                />
              </div>
              {errors.email && <p className="text-red-500 text-[10px] mt-1 ml-1 font-semibold">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div className="form-control">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1 block">Password</label>
                <Link to="/forgot-password" size="sm" className="text-[11px] font-bold text-blue-600 hover:underline">Forgot?</Link>
              </div>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 ${errors.password ? 'border-red-500' : 'border-transparent dark:border-gray-700'} focus:border-blue-500 outline-none transition-all text-gray-900 dark:text-white font-medium`}
                  {...register("password", { 
                    required: "Password is required",
                    minLength: { value: 6, message: "Must be at least 6 characters" }
                  })}
                />
              </div>
              {errors.password && <p className="text-red-500 text-[10px] mt-1 font-semibold ml-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-extrabold text-lg shadow-xl shadow-blue-500/20 transition-all hover:-translate-y-1 active:scale-95"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8 text-center">
            <span className="absolute inset-x-0 top-1/2 h-px bg-gray-100 dark:bg-gray-800"></span>
            <span className="relative bg-white dark:bg-gray-900 px-4 text-xs font-black uppercase tracking-widest text-gray-400">Secure Access</span>
          </div>

          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="w-full py-3.5 flex items-center justify-center gap-3 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-xl font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all active:scale-95"
          >
            <FaGoogle className="text-red-500" />
            Continue with Google
          </button>

          <p className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-tight">
            New to the platform?{" "}
            <Link className="text-blue-600 dark:text-blue-400 hover:underline font-black" to="/register">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;