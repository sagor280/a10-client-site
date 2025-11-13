import React, { useContext } from "react";
import { FaGlobe, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();

    const displayName = event.target.displayName.value;
    const photoURL = event.target.photoURL.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    // Password Validation
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const validLength = password.length >= 6;

    if (!uppercase || !lowercase || !validLength) {
      toast.error(
        "Password must contain at least one uppercase, one lowercase letter, and be 6+ characters long.",
        { id: "invalid-pass" }
      );
      return;
    }

    toast.loading("Creating your account...", { id: "create-user" });

    createUser(email, password)
      .then((result) => {
        updateUserProfile(displayName, photoURL)
          .then(() => {
            toast.success("User created successfully!", { id: "create-user" });
            navigate("/"); 
          })
          .catch((error) => {
            toast.error("Profile update failed!", { id: "create-user" });
            console.error(error);
          });
      })
      .catch((error) => {
        toast.error(error.message, { id: "create-user" });
      });
  };

  const handleGoogleSignIn = () => {
    toast.loading("Signing in with Google...", { id: "google-sign" });
    signInWithGoogle()
      .then((result) => {
        toast.success("Google login successful!", { id: "google-sign" });
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message, { id: "google-sign" });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center  dark:from-gray-900 dark:to-gray-800 py-12 px-4 transition-colors duration-500">
  <div className="card bg-white dark:bg-gray-800 w-full mx-auto max-w-sm shrink-0 shadow-2xl border border-gray-200 dark:border-gray-700 rounded-3xl transition-colors duration-300">
    <div className="card-body p-8">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="h-12 w-12 mx-auto rounded-full bg-linear-to-r from-blue-500 to-indigo-600 flex items-center justify-center mb-4">
          <FaGlobe className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Create Account</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Join ImportExport Hub today</p>
      </div>

      {/* Register Form */}
      <form onSubmit={handleRegister}>
        <fieldset className="space-y-4">
          {/* Full Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-700 dark:text-gray-300">Full Name</span>
            </label>
            <input
              type="text"
              name="displayName"
              required
              placeholder="Enter your full name"
              className="input input-bordered w-full rounded-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
            />
          </div>

          {/* Photo URL */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-700 dark:text-gray-300">Photo URL</span>
            </label>
            <input
              type="text"
              name="photoURL"
              required
              placeholder="Enter your photo URL"
              className="input input-bordered w-full rounded-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
            />
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-700 dark:text-gray-300">Email</span>
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="input input-bordered w-full rounded-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
            />
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-700 dark:text-gray-300">Password</span>
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="Enter your password"
              className="input input-bordered w-full rounded-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="btn btn-primary text-white mt-4 rounded-full bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg w-full transition-all duration-300"
          >
            Sign Up
          </button>
        </fieldset>
      </form>

      {/* Divider */}
      <div className="divider text-sm text-gray-500 dark:text-gray-400 my-4">OR</div>

      {/* Google Sign-In */}
      <button
        onClick={handleGoogleSignIn}
        type="button"
        className="btn bg-white dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-blue-300 shadow-md w-full transition-all duration-300 flex items-center justify-center gap-2"
      >
        <FaGoogle className="text-red-500 h-4 w-4" />
        Continue with Google
      </button>

      {/* Login Link */}
      <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-300">
        Already have an account?{" "}
        <Link
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500 font-medium transition-colors"
          to="/login"
        >
          Sign in here
        </Link>
      </p>
    </div>
  </div>
</div>

  );
};

export default Register;
