import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle, FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";
import Logo from "../Component/logo/Logo";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { displayName, photoURL, email, password } = data;
    toast.loading("Creating your account...", { id: "register-toast" });

    createUser(email, password)
      .then(() => {
        updateUserProfile(displayName, photoURL)
          .then(() => {
            toast.success("Registration Successful!", { id: "register-toast" });
            navigate("/");
          })
          .catch(() => toast.error("Profile update failed!", { id: "register-toast" }));
      })
      .catch((error) => toast.error(error.message, { id: "register-toast" }));
  };

  const handleGoogleSignIn = () => {
    toast.loading("Connecting to Google...", { id: "google-toast" });
    signInWithGoogle()
      .then(() => {
        toast.success("Welcome back!", { id: "google-toast" });
        navigate("/");
      })
      .catch((error) => toast.error(error.message, { id: "google-toast" }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0b0f1a] py-12 px-4 transition-colors duration-500">
      <div className="bg-white dark:bg-gray-900 w-full mx-auto max-w-lg shadow-2xl border border-gray-100 dark:border-gray-800 rounded-[2rem] overflow-hidden">
        <div className="p-8 md:p-12">
          
          {/* লোগো সেকশন - এখান থেকে <Link> সরিয়ে দেওয়া হয়েছে কারণ <Logo/> এর ভেতরেই লিংক আছে */}
          <div className="text-center mb-8">
            <div className="inline-block group transition-transform duration-500 hover:rotate-6 hover:scale-110 active:scale-95">
              <Logo />
            </div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mt-4">Join the Hub</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">Create your global trade account today</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="form-control">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Name</label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 ${errors.displayName ? 'border-red-500' : 'border-transparent dark:border-gray-700'} focus:border-blue-500 outline-none transition-all text-gray-900 dark:text-white font-medium`}
                    {...register("displayName", { required: "Name is required" })}
                  />
                </div>
              </div>

              {/* Photo URL */}
              <div className="form-control">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Avatar URL</label>
                <div className="relative">
                  <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Photo link"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent dark:border-gray-700 focus:border-blue-500 outline-none transition-all text-gray-900 dark:text-white font-medium"
                    {...register("photoURL", { required: "Photo URL is required" })}
                  />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="email@example.com"
                  className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 ${errors.email ? 'border-red-500' : 'border-transparent dark:border-gray-700'} focus:border-blue-500 outline-none transition-all text-gray-900 dark:text-white font-medium`}
                  {...register("email", { 
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                  })}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 ${errors.password ? 'border-red-500' : 'border-transparent dark:border-gray-700'} focus:border-blue-500 outline-none transition-all text-gray-900 dark:text-white font-medium`}
                  {...register("password", { 
                    required: "Required",
                    minLength: { value: 6, message: "Min 6 chars" },
                    validate: {
                        upper: v => /[A-Z]/.test(v) || "Need 1 uppercase",
                        lower: v => /[a-z]/.test(v) || "Need 1 lowercase"
                    }
                  })}
                />
              </div>
              {errors.password && <p className="text-red-500 text-[10px] mt-1 font-bold ml-1 italic">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-extrabold text-lg shadow-xl shadow-blue-500/20 transition-all hover:-translate-y-1 active:scale-95"
            >
              Create Account
            </button>
          </form>

          {/* Social Login */}
          <div className="relative my-8 text-center">
            <span className="absolute inset-x-0 top-1/2 h-px bg-gray-100 dark:bg-gray-800"></span>
            <span className="relative bg-white dark:bg-gray-900 px-4 text-xs font-black uppercase tracking-widest text-gray-400">Social Connect</span>
          </div>

          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="w-full py-3.5 flex items-center justify-center gap-3 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-700 rounded-xl font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all active:scale-95"
          >
            <FaGoogle className="text-red-500" />
            Continue with Google
          </button>

          <p className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-tight">
            Already have an account?{" "}
            <Link className="text-blue-600 dark:text-blue-400 hover:underline font-black" to="/login">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;