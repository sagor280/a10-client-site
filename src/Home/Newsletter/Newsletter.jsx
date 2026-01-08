import React, { useState } from "react";
import { Mail, Send, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSuccess(true);
    setEmail("");
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <section className="relative py-24 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      
      {/* Subtle Background Shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-12 shadow-xl border border-gray-200 dark:border-gray-700"
        >
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-2xl bg-blue-100/50 dark:bg-blue-900/50 flex items-center justify-center">
              <Mail className="h-8 w-8 text-blue-700 dark:text-white" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Subscribe for Market Updates
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-xl mx-auto mb-10 text-lg">
            Get latest updates on products, verified suppliers, and global trade insights directly in your inbox.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600
                text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold
                flex items-center justify-center gap-2 transition-all"
            >
              Subscribe <Send className="h-4 w-4" />
            </button>
          </form>

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex items-center justify-center gap-2 text-green-600 font-medium"
            >
              <CheckCircle className="h-5 w-5" />
              <span>Subscription successful!</span>
            </motion.div>
          )}

          {/* Small Trust Note */}
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-8">
            🔒 We respect your privacy. No spam. You can unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
