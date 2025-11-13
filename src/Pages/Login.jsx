import React, { use } from 'react';
import { FaGlobe, FaGoogle } from 'react-icons/fa'; // Site icon (or use FaBoxOpen)
import { Link, useLocation, useNavigate } from 'react-router'; // Fixed import
import { AuthContext } from '../Context/AuthContext';

const Login = () => {
   const { signInUser, signInWithGoogle } = use(AuthContext);
    const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

  const handleLogIn = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    console.log(email, password);
    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        event.target.reset();
        navigate(location.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
  <div className="min-h-screen flex items-center justify-center  dark:from-gray-900 dark:to-gray-800 py-12 px-4 transition-colors duration-500">
  <div className="card bg-white dark:bg-gray-800 w-full mx-auto max-w-sm shrink-0 shadow-2xl border border-gray-200 dark:border-gray-700 rounded-3xl transition-colors duration-300">
    <div className="card-body p-8">
      {/* Header with Icon */}
      <div className="text-center mb-6">
        <div className="h-12 w-12 mx-auto rounded-full bg-linear-to-r from-blue-500 to-indigo-600 flex items-center justify-center mb-4">
          <FaGlobe className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome Back</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Sign in to ImportExport Hub</p>
      </div>

      <form onSubmit={handleLogIn}>
        <fieldset className="space-y-4">
          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-700 dark:text-gray-300">Email</span>
            </label>
            <input
              type="email"
              name="email"
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
              placeholder="Enter your password"
              className="input input-bordered w-full rounded-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
            />
          </div>

          {/* Forgot Password */}
          <div className="form-control">
            <label className="label justify-end">
              <a className="link link-hover text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500 transition-colors">
                Forgot password?
              </a>
            </label>
          </div>

          {/* Sign In Button */}
          <button 
            type="submit" 
            className="btn btn-primary text-white mt-4 rounded-full bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg w-full transition-all duration-300"
          >
            Sign In
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

      {/* Register Link */}
      <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-300">
        New to ImportExport Hub?{' '}
        <Link
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500 font-medium transition-colors"
          to="/register"
        >
          Create an account
        </Link>
      </p>
    </div>
  </div>
</div>

  );
};

export default Login;