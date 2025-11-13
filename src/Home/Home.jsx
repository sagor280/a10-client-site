import React from 'react';
import Banner from '../Pages/Banner';
import ProductCard from '../Component/ProductCard';
import { useLoaderData } from 'react-router';
import { CheckCircle, Globe, Package, Shield, Star, Users, Zap } from 'lucide-react';

const Home = () => {
  const data = useLoaderData();
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <Banner />

      {/* Latest Products Section */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Latest Products
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our newest arrivals, curated for quality and innovation.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {data.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Card */}
          {[
            {
              icon: <Globe className="h-12 w-12 text-blue-600" />,
              title: 'Global Reach',
              desc: 'Connect with traders from over 100 countries and expand your business internationally.',
            },
            {
              icon: <Shield className="h-12 w-12 text-green-600" />,
              title: 'Secure Trading',
              desc: 'All transactions are protected with industry-standard security measures.',
            },
            {
              icon: <Zap className="h-12 w-12 text-yellow-500" />,
              title: 'Fast & Easy',
              desc: 'Simple process to list products and manage your imports and exports efficiently.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="flex items-center justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: <Users className="mx-auto h-12 w-12 text-blue-600" />, num: '15,000+', label: 'Active Traders' },
            { icon: <Package className="mx-auto h-12 w-12 text-green-600" />, num: '50,000+', label: 'Products Listed' },
            { icon: <Globe className="mx-auto h-12 w-12 text-purple-600" />, num: '120+', label: 'Countries' },
            { icon: <CheckCircle className="mx-auto h-12 w-12 text-teal-600" />, num: '98%', label: 'Success Rate' },
          ].map((item, i) => (
            <div key={i} className="space-y-2">
              {item.icon}
              <div className="text-4xl font-bold text-gray-900 dark:text-white">{item.num}</div>
              <p className="text-gray-600 dark:text-gray-300 text-lg">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container py-20 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          How It Works
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto">
          Start your global trading journey in just four simple steps
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { num: 1, title: 'Create Account', desc: 'Sign up for free and complete your business profile in minutes' },
            { num: 2, title: 'Browse Products', desc: 'Explore thousands of quality products from verified exporters' },
            { num: 3, title: 'Connect & Negotiate', desc: 'Contact suppliers directly and negotiate the best deals' },
            { num: 4, title: 'Start Trading', desc: 'Complete secure transactions and grow your business globally' },
          ].map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
                {step.num}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
          What Our Clients Say
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto text-center">
          Join thousands of satisfied traders who have grown their business with us
        </p>

        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {[
            {
              name: 'Rajesh Kumar',
              country: 'Importer, India',
              bg: 'bg-blue-100 dark:bg-blue-900',
              text: 'text-blue-600 dark:text-blue-300',
              initials: 'RK',
              quote:
                'This platform transformed my business! I found reliable suppliers from 15 countries in just weeks.',
            },
            {
              name: 'Maria Chen',
              country: 'Exporter, China',
              bg: 'bg-green-100 dark:bg-green-900',
              text: 'text-green-600 dark:text-green-300',
              initials: 'MC',
              quote:
                'As an exporter, I’ve connected with buyers worldwide. The platform is easy to use and support is always helpful.',
            },
            {
              name: 'John Smith',
              country: 'Trader, USA',
              bg: 'bg-purple-100 dark:bg-purple-900',
              text: 'text-purple-600 dark:text-purple-300',
              initials: 'JS',
              quote:
                'Excellent marketplace for international trade. Quality of products and professionalism is outstanding.',
            },
          ].map((client, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition w-full md:w-1/3"
            >
              <div className="flex gap-1 mb-4 justify-center">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-5 w-5 text-yellow-500" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic mb-4">"{client.quote}"</p>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                <div
                  className={`h-12 w-12 rounded-full ${client.bg} flex items-center justify-center ${client.text} font-bold`}
                >
                  {client.initials}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900 dark:text-white">{client.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{client.country}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
