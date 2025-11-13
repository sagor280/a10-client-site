import React from 'react';
import Banner from '../Pages/Banner';
import ProductCard from '../Component/ProductCard';
import { Link, useLoaderData } from 'react-router';
import { CheckCircle, Globe, Package, Shield, Star, Users, Zap } from 'lucide-react';

const Home = () => {
  const data = useLoaderData();
  return (
    <div>
      <Banner />

      {/* Latest Products Section */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Products</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our newest arrivals, curated for quality and innovation.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {data.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

        {/* Why Choose Us */}
 <section className="py-16 max-w-7xl mx-auto px-4">
  <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
    
    {/* Global Reach */}
    <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
      <div className="flex items-center justify-center mb-4">
        <Globe className="h-12 w-12 text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
      <p className="text-gray-600">
        Connect with traders from over 100 countries and expand your business internationally.
      </p>
    </div>

    {/* Secure Trading */}
    <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
      <div className="flex items-center justify-center mb-4">
        <Shield className="h-12 w-12 text-green-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Secure Trading</h3>
      <p className="text-gray-600">
        All transactions are protected with industry-standard security measures.
      </p>
    </div>

    {/* Fast & Easy */}
    <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
      <div className="flex items-center justify-center mb-4">
        <Zap className="h-12 w-12 text-yellow-500" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Fast & Easy</h3>
      <p className="text-gray-600">
        Simple process to list products and manage your imports and exports efficiently.
      </p>
    </div>

  </div>
</section>

<section className="py-16 bg-gray-50 max-w-7xl mx-auto px-4 ">
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
      
      <div className="space-y-2">
        <Users className="mx-auto h-12 w-12 text-blue-600" />
        <div className="text-4xl font-bold text-gray-900">15,000+</div>
        <p className="text-gray-600 text-lg">Active Traders</p>
      </div>

      <div className="space-y-2">
        <Package className="mx-auto h-12 w-12 text-green-600" />
        <div className="text-4xl font-bold text-gray-900">50,000+</div>
        <p className="text-gray-600 text-lg">Products Listed</p>
      </div>

      <div className="space-y-2">
        <Globe className="mx-auto h-12 w-12 text-purple-600" />
        <div className="text-4xl font-bold text-gray-900">120+</div>
        <p className="text-gray-600 text-lg">Countries</p>
      </div>

      <div className="space-y-2">
        <CheckCircle className="mx-auto h-12 w-12 text-teal-600" />
        <div className="text-4xl font-bold text-gray-900">98%</div>
        <p className="text-gray-600 text-lg">Success Rate</p>
      </div>

    </div>
  </div>
</section>

    <section className="container py-20 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-foreground">How It Works</h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Start your global trading journey in just four simple steps
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="relative">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-foreground">Create Account</h3>
              <p className="text-muted-foreground">
                Sign up for free and complete your business profile in minutes
              </p>
            </div>
            {/* Connection line */}
            <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-linear-to-r from-primary to-transparent -translate-x-1/2" />
          </div>

          <div className="relative">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-foreground">Browse Products</h3>
              <p className="text-muted-foreground">
                Explore thousands of quality products from verified exporters
              </p>
            </div>
            <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-linear-to-r from-primary to-transparent -translate-x-1/2" />
          </div>

          <div className="relative">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-foreground">Connect & Negotiate</h3>
              <p className="text-muted-foreground">
                Contact suppliers directly and negotiate the best deals
              </p>
            </div>
            <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-linear-to-r from-primary to-transparent -translate-x-1/2" />
          </div>

          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
              4
            </div>
            <h3 className="text-xl font-semibold text-foreground">Start Trading</h3>
            <p className="text-muted-foreground">
              Complete secure transactions and grow your business globally
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
<section className="py-20 max-w-7xl mx-auto px-4 ">
  <div className="max-w-7xl mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
    
    <p className="text-gray-600 mb-16 max-w-2xl mx-auto">
      Join thousands of satisfied traders who have grown their business with us
    </p>

    <div className="flex flex-col md:flex-row gap-8 justify-center">
      {/* Card 1 */}
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition w-full md:w-1/3">
        <div className="flex gap-1 mb-4 justify-center">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-yellow-500" />
          ))}
        </div>
        <p className="text-gray-600 italic mb-4">
          "This platform transformed my business! I found reliable suppliers from 15 countries in just weeks."
        </p>
        <div className="flex items-center gap-4 pt-4 border-t mt-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
            RK
          </div>
          <div className="text-left">
            <div className="font-semibold text-gray-900">Rajesh Kumar</div>
            <div className="text-sm text-gray-500">Importer, India</div>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition w-full md:w-1/3">
        <div className="flex gap-1 mb-4 justify-center">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-yellow-500" />
          ))}
        </div>
        <p className="text-gray-600 italic mb-4">
          "As an exporter, I've connected with buyers worldwide. The platform is easy to use and support is always helpful."
        </p>
        <div className="flex items-center gap-4 pt-4 border-t mt-4">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
            MC
          </div>
          <div className="text-left">
            <div className="font-semibold text-gray-900">Maria Chen</div>
            <div className="text-sm text-gray-500">Exporter, China</div>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition w-full md:w-1/3">
        <div className="flex gap-1 mb-4 justify-center">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-yellow-500" />
          ))}
        </div>
        <p className="text-gray-600 italic mb-4">
          "Excellent marketplace for international trade. Quality of products and professionalism is outstanding."
        </p>
        <div className="flex items-center gap-4 pt-4 border-t mt-4">
          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
            JS
          </div>
          <div className="text-left">
            <div className="font-semibold text-gray-900">John Smith</div>
            <div className="text-sm text-gray-500">Trader, USA</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>






      
    </div>
  );
};

export default Home;