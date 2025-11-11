import React from 'react';
import Banner from '../Pages/Banner';
import ProductCard from '../Component/ProductCard';
import { Link, useLoaderData } from 'react-router';

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
    </div>
  );
};

export default Home;