import React, { useState, useEffect } from 'react';
import appleImage from '/apple.jpeg';
import orangeImage from '/oranges.png';
import spinachImage from '/spinach.jpg';
import strawberryImage from '/strawberry.jpg';
import tomatoImage from '/tomato.jpg';
import { FaSeedling, FaAward, FaTractor, FaPhoneAlt } from 'react-icons/fa';
import { FaCartShopping } from "react-icons/fa6";
import { useFirebase } from '../context/firebase';

function Market() {
  const { getUserDetails } = useFirebase();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const details = await getUserDetails();
        if (details) {
          setUserDetails(details);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [getUserDetails]);

  // If loading, show a loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-green-500"></div>
      </div>
    );
  }

  // Render content based on user role
  return (
    <div className="w-full">
      {/* Hero Section (common to all roles) */}
      <div
        className="bg-cover bg-center h-52 flex items-center pl-10 text-white"
        style={{ backgroundImage: "url('/carousel-1.png')" }}
      >
        <div>
          <h1 className="text-4xl font-bold">E-Market</h1>
          <div className="flex gap-4 mt-3">
            <a href="/" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Home
            </a>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
              Product
            </button>
          </div>
        </div>
      </div>
      {/* Farmer View */}
      {userDetails?.role === 'Farmer' && (
        <div className="p-10 bg-gray-100 text-center">
          <h6 className="text-green-600 uppercase tracking-wide">Farmer Dashboard</h6>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Sell Your Produce &amp; Buy Inputs
          </h1>
          <div className="flex justify-center gap-4 mb-6">
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
              List Your Produce
            </button>
            <button className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
              Buy Farming Supplies
            </button>
          </div>
          <p className="text-gray-700">
            This is the Farmer View where you can manage your listings, track orders, and access insights on crop demand and pricing.
          </p>
        </div>
      )}

      {/* Admin View */}
      {userDetails?.role === 'Admin' && (
        <div className="p-10 bg-gray-100 text-center">
          <h6 className="text-green-600 uppercase tracking-wide">Admin Dashboard</h6>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Manage Marketplace Operations
          </h1>
          <div className="flex justify-center gap-4 mb-6">
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Verify Listings
            </button>
            <button className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
              Resolve Disputes
            </button>
          </div>
          <p className="text-gray-700">
            This is the Admin View where you can manage product listings, verify seller credentials, monitor transactions, and handle disputes.
          </p>
        </div>
      )}
      

      {/* Marketplace Section for all users */}
      <div className="p-10 bg-gray-100 text-center">
        <h6 className="text-green-600 uppercase tracking-wide">E-Market</h6>
        <h1 className="text-3xl font-bold text-gray-900">Explore Our Fresh & Organic Products</h1>

        {/* Search Bar */}
        <div className="mt-4 flex justify-center">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full max-w-md px-4 py-2 border rounded-l-lg focus:outline-none"
          />
          <button className="px-4 py-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700">
            Search
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {[
            { img: appleImage, name: "Apples", price: "₹80-150/kg" },
            { img: orangeImage, name: "Oranges", price: "₹40-80/kg" },
            { img: spinachImage, name: "Spinach", price: "₹40-80/kg" },
            { img: strawberryImage, name: "Strawberries", price: "₹200-400/kg" },
            { img: tomatoImage, name: "Tomatoes", price: "₹20-40/kg" }
          ].map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-5 flex flex-col items-center">
              <img src={product.img} alt={product.name} className="w-full h-40 object-cover rounded-lg" />
              <div className="w-full flex justify-between items-center mt-2">
                <h6 className="text-lg font-semibold ">{product.name}</h6>
                <h5 className="text-green-600 text-md font-bold">{product.price}</h5>
              </div>
              <div className="flex justify-between gap-4 mt-2 w-full">
                <button className="px-3 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600">
                  View Details
                </button>
                <button className="px-3 py-2 bg-green-600 text-white text-md rounded-lg hover:bg-green-700">
                  <FaCartShopping />
                </button>
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
          <div className="bg-white p-5 rounded-lg shadow-md text-center transition-transform transform hover:scale-105">
            <FaSeedling className="text-green-600 text-3xl mx-auto" />
            <h4 className="text-xl font-semibold mt-3">100% Organic</h4>
            <p className="text-gray-600 mt-2">
              Grown without harmful chemicals, pesticides, or fertilizers.
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md text-center transition-transform transform hover:scale-105">
            <FaAward className="text-green-600 text-3xl mx-auto" />
            <h4 className="text-xl font-semibold mt-3">100% Authentic</h4>
            <p className="text-gray-600 mt-2">
              Directly from the farm to your table. Guaranteed quality and origin.
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md text-center transition-transform transform hover:scale-105">
            <FaTractor className="text-green-600 text-3xl mx-auto" />
            <h4 className="text-xl font-semibold mt-3">Modern Farming</h4>
            <p className="text-gray-600 mt-2">
              Connecting farmers with advanced technology for efficiency.
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md text-center transition-transform transform hover:scale-105">
            <FaPhoneAlt className="text-green-600 text-3xl mx-auto" />
            <h4 className="text-xl font-semibold mt-3">24/7 Support</h4>
            <p className="text-gray-600 mt-2">
              Our team is available around the clock to assist you.
            </p>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default Market;
