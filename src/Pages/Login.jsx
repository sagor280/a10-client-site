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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl border border-gray-200 rounded-3xl">
        <div className="card-body p-8"> {/* Extra padding for pro look */}
          {/* Header with Icon */}
          <div className="text-center mb-6">
            <div className="h-12 w-12 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mb-4">
              <FaGlobe className="h-6 w-6 text-white" /> {/* Your site icon */}
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-sm text-gray-600 mt-2">Sign in to ImportExport Hub</p>
          </div>

          <form onSubmit={handleLogIn}> {/* Static form - no onSubmit */}
            <fieldset className="fieldset space-y-4"> {/* Better spacing */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="input input-bordered rounded-full focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  className="input input-bordered rounded-full focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Enter your password"
                />
              </div>

              <div className="form-control">
                <label className="label justify-end">
                  <a className="link link-hover text-sm text-blue-600 hover:text-blue-800">Forgot password?</a>
                </label>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary text-white mt-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg w-full transition-all duration-300"
              >
                Sign In
              </button>
            </fieldset>
          </form>

          {/* Divider */}
          <div className="divider text-sm text-gray-500 my-4">OR</div>

          {/* Google Button */}
          <button
           onClick={handleGoogleSignIn}
            type="button"
            className="btn bg-white rounded-full text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-blue-300 shadow-md w-full transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FaGoogle className="text-red-500 h-4 w-4" />
            Continue with Google
          </button>

          {/* Register Link */}
          <p className="text-center mt-6 text-sm text-gray-600">
            New to ImportExport Hub?{' '}
            <Link
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
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