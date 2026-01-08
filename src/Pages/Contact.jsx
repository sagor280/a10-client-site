import React, { useEffect, useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaClock, FaPaperPlane } from "react-icons/fa";
import toast from "react-hot-toast";
import { motion } from "framer-motion"; 

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Contact Us - Import Hub";
  }, []);

  const fadeInUP = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Message sent successfully!");
      e.target.reset();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      
      {/* Hero Section - Motion Added */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 py-24 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter">
            GET IN <span className="text-blue-600">TOUCH</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
            Have questions about global trade? Our team is here to help you navigate the world of imports and exports.
          </p>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* Left Side: Contact Info - Staggered Motion */}
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{
              animate: { transition: { staggerChildren: 0.1 } }
            }}
            className="lg:col-span-1 space-y-5"
          >
            <ContactInfoCard 
              icon={<FaEnvelope className="text-blue-600" />}
              title="Email Us"
              content="bdsagorkumar8@gmail.com"
              link="mailto:bdsagorkumar8@gmail.com"
            />
            <ContactInfoCard 
              icon={<FaPhoneAlt className="text-blue-600" />}
              title="Call Us"
              content="+8801319105280"
              link="tel:+8801319105280"
            />
            <ContactInfoCard 
              icon={<FaMapMarkerAlt className="text-blue-600" />}
              title="Visit Us"
              content="123 Trade Center, New York, NY 10001"
            />
            
            {/* Business Hours Card */}
            <motion.div 
              variants={fadeInUP}
              className="p-6 bg-gray-50 dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm"
            >
              <div className="flex gap-4">
                <div className="p-3 bg-white dark:bg-gray-700 rounded-2xl shadow-sm h-fit">
                  <FaClock className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 tracking-tight">Business Hours</h3>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                    <p>Sat: 9:00 AM - 2:00 PM</p>
                    <p className="font-bold text-red-500 pt-1 underline decoration-dotted">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Form - Slide in Motion */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-2xl shadow-blue-500/5">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormInput label="Full Name" name="name" type="text" placeholder="John Doe" />
                  <FormInput label="Email Address" name="email" type="email" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Subject</label>
                  <select 
                    name="subject"
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all appearance-none"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="sales">Sales & Pricing</option>
                    <option value="support">Technical Support</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Your Message</label>
                  <textarea 
                    required name="message" rows="5" placeholder="How can we help you?"
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all resize-none"
                  ></textarea>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  disabled={isLoading}
                  className="w-full md:w-max px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/30 transition-all disabled:opacity-70 flex items-center justify-center gap-3"
                >
                  {isLoading ? "Sending..." : <><FaPaperPlane /> Send Message</>}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section - Fade In */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="px-4 pb-24"
      >
        <div className="max-w-7xl mx-auto rounded-[3rem] overflow-hidden border-8 border-white dark:border-gray-800 shadow-2xl h-[450px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4303.008673566243!2d88.25131307591616!3d24.60424425546099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbb6adce9b8e7f%3A0x9e48aed7c8c2e606!2sChapainawabganj%20Polytechnic%20Institute!5e1!3m2!1sen!2sus!4v1767809903122!5m2!1sen!2sus"
            width="100%" height="100%" style={{ border: 0 }}
            allowFullScreen="" loading="lazy" title="Office Location"
          ></iframe>
        </div>
      </motion.section>
    </div>
  );
};



const ContactInfoCard = ({ icon, title, content, link }) => (
  <motion.div 
    variants={{
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 }
    }}
    whileHover={{ y: -5 }}
    className="p-6 bg-gray-50 dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-900 transition-all group shadow-sm"
  >
    <div className="flex items-center gap-5">
      <div className="p-4 bg-white dark:bg-gray-700 rounded-2xl shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>
        {link ? (
          <a href={link} className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors font-medium">
            {content}
          </a>
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{content}</p>
        )}
      </div>
    </div>
  </motion.div>
);

const FormInput = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">{label}</label>
    <input 
      {...props}
      required
      className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all"
    />
  </div>
);

export default Contact;