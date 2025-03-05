import React from 'react';
import appleImage from '/apple.jpeg';
import orangeImage from '/oranges.png';
import spinachImage from '/spinach.jpg';
import strawberryImage from '/strawberry.jpg';
import tomatoImage from '/tomato.jpg';
import featureImage from '/feature.png';
import { FaSeedling, FaAward, FaTractor, FaPhoneAlt } from 'react-icons/fa';

function Market() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="bg-cover bg-center h-52 flex items-center pl-10 text-white" style={{ backgroundImage: "url('/carousel-1.png')" }}>
        <div>
          <h1 className="text-4xl font-bold">E-Market</h1>
          <div className="flex gap-4 mt-3">
            <a href="/Home" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Home</a>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Product</button>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className="p-10 bg-gray-100 text-center">
        <h6 className="text-green-600 uppercase tracking-wide">E-Market</h6>
        <h1 className="text-3xl font-bold text-gray-900">Explore Our Fresh & Organic Products</h1>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {[
            { img: appleImage, name: "Apples", price: "₹80-150 per kg" },
            { img: orangeImage, name: "Oranges", price: "₹40-80 per kg" },
            { img: spinachImage, name: "Spinach", price: "₹40-80 per kg" },
            { img: strawberryImage, name: "Strawberries", price: "₹200-400 per kg" },
            { img: tomatoImage, name: "Tomatoes", price: "₹20-40 per kg" }
          ].map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-5 flex flex-col items-center">
              <img src={product.img} alt={product.name} className="w-full h-40 object-cover rounded-lg" />
              <h6 className="text-lg font-semibold mt-3">{product.name}</h6>
              <h5 className="text-green-600 text-lg">{product.price}</h5>
              <div className="flex gap-3 mt-3">
                <button className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Add to Cart</button>
                <button className="px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-200 py-10 text-center">
        <h6 className="text-green-600 uppercase tracking-wide">Features</h6>
        <h1 className="text-3xl font-bold text-gray-900">Why Choose Us!!!</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-10 mt-6">
          <div className="bg-white p-5 rounded-lg shadow-md text-center">
            <FaSeedling className="text-green-600 text-3xl mx-auto" />
            <h4 className="text-xl font-semibold mt-3">100% Organic</h4>
            <p className="text-gray-600 mt-2">Grown without harmful chemicals, pesticides, or fertilizers.</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md text-center">
            <FaAward className="text-green-600 text-3xl mx-auto" />
            <h4 className="text-xl font-semibold mt-3">100% Authentic</h4>
            <p className="text-gray-600 mt-2">Directly from the farm to your table. Guaranteed quality and origin.</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md text-center">
            <FaTractor className="text-green-600 text-3xl mx-auto" />
            <h4 className="text-xl font-semibold mt-3">Modern Farming</h4>
            <p className="text-gray-600 mt-2">Connecting farmers with advanced technology for efficiency.</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md text-center">
            <FaPhoneAlt className="text-green-600 text-3xl mx-auto" />
            <h4 className="text-xl font-semibold mt-3">24/7 Support</h4>
            <p className="text-gray-600 mt-2">Our team is available around the clock to assist you.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Market;