import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getAllLandData } from '../firebase';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { ArrowRight, ChevronRight, Check } from 'lucide-react';
import { FaShoppingBasket, FaChalkboardTeacher, FaVrCardboard, FaSeedling, FaMicroscope } from 'react-icons/fa';
// Fix for default icon not showing
delete L.Icon.Default.prototype._getIconUrl;
import appleImage from '/apple.jpeg';
import orangeImage from '/oranges.png';
import spinachImage from '/spinach.jpg';
import strawberryImage from '/strawberry.jpg';
import tomatoImage from '/tomato.jpg';
import { FaCartShopping } from "react-icons/fa6";
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// ---------------------
// Admin Dashboard Component
// ---------------------
function AdminDashboard() {
  const [lands, setLands] = useState([]);
  const [selectedLand, setSelectedLand] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllLandData();
      const landArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
      setLands(landArray);
    }
    fetchData();
  }, []);

  return (
    <div className="p-5 flex flex-col lg:flex-row h-full">
      {/* Map & Visualization */}
      <div className="flex-3 relative h-[70vh] w-full lg:w-2/3 mb-4 lg:mb-0">
        <MapContainer center={[30.7628, 76.5983]} zoom={13} className="h-full w-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {lands.map((land, index) => (
            <Marker
              key={index}
              position={[land.Latitude, land.Longitude]}
              eventHandlers={{
                click: () => setSelectedLand(land),
              }}
            >
              <Popup>
                <div className="text-sm">
                  <h2 className="text-lg font-bold">{land.Crop || 'Unknown Crop'}</h2>
                  <p>
                    <strong>NPK:</strong> {land.NPK || 'N/A'}
                  </p>
                  <p>
                    <strong>PH:</strong> {land.PH || 'N/A'}
                  </p>
                  <p>
                    <strong>Soil Moisture:</strong> {land.SoilMoisture || 'N/A'}
                  </p>
                  <p>
                    <strong>Temperature:</strong> {land.Temperature || 'N/A'}
                  </p>
                  <button
                    className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => window.open('https://greenheart.streamlit.app/', '_blank')}
                  >
                    Get Recommendations
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        {/* Legend */}
        <div className="absolute top-2 right-2 bg-white bg-opacity-80 p-2 rounded shadow-md z-10">
          <div className="flex items-center mb-2">
            <span className="w-4 h-4 bg-blue-500 rounded-full inline-block mr-2"></span> Device
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 bg-green-500 rounded-full inline-block mr-2"></span> Subscription
          </div>
        </div>
      </div>
      {/* Metrics Panel */}
      <div className="flex-1 flex flex-col p-5 bg-gray-100 lg:w-1/3">
        <div className="bg-white border border-gray-300 rounded p-4 mb-4 shadow-md">
          Active Devices: {lands.length}
        </div>
        <div className="bg-white border border-gray-300 rounded p-4 mb-4 shadow-md">
          Connected Farmers: 40
        </div>
        <div className="bg-white border border-gray-300 rounded p-4 mb-4 shadow-md">
          Farmer Subscriptions: 15
        </div>
        <div className="bg-white border border-gray-300 rounded p-4 mb-4 shadow-md">
          Total Queries Raised: 15
        </div>
        <div className="bg-white border border-gray-300 rounded p-4 mb-4 shadow-md">
          Farmer Queries Resolved: 10
        </div>
      </div>
    </div>
  );
}

// ---------------------
// Farmer Dashboard Component
// ---------------------
function FarmerDashboard() {
  return (
    <div className="p-5 space-y-6">
      <h2 className="text-3xl font-bold text-green-600 text-center mb-4">
        Farmer Dashboard
      </h2>
      {/* Farm Overview & Recommendations */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-2">
          Farm Overview &amp; AI-Based Recommendations
        </h3>
        <ul className="list-disc list-inside text-gray-600">
          <li>
            <strong>Soil &amp; Weather Insights:</strong> Real-time alerts on soil health,
            rainfall, and pest risks.
          </li>
          <li>
            <strong>AI-Based Crop Guidance:</strong> Personalized crop recommendations based
            on your farm conditions.
          </li>
          <li>
            <strong>Lease Renewal &amp; Payment Management:</strong> Manage land leases and
            track payments effortlessly.
          </li>
        </ul>
      </div>
      {/* Quality Control & Yield Prediction */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-2">
          Quality Control &amp; Yield Prediction
        </h3>
        <ul className="list-disc list-inside text-gray-600">
          <li>
            <strong>Crop Health Reports:</strong> Get AI-driven insights on disease detection
            and nutrient deficiencies.
          </li>
          <li>
            <strong>Yield Forecasting:</strong> Predict your harvest quantity and quality with
            precision.
          </li>
        </ul>
      </div>
      {/* Expert Assistance & Training */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-2">
          Expert Assistance &amp; Training
        </h3>
        <ul className="list-disc list-inside text-gray-600">
          <li>
            <strong>Team Assigned to Farm:</strong> View details of GreenHeart experts
            assigned to your farm.
          </li>
          <li>
            <strong>On-Demand Services:</strong> Request soil testing, drone monitoring, and
            equipment rentals.
          </li>
          <li>
            <strong>Education Hub:</strong> Access video tutorials, blogs, and updates on
            government schemes.
          </li>
        </ul>
      </div>
    </div>
  );
}

// ---------------------
// Marketplace/Buyer Dashboard Component
// ---------------------
function MarketplaceDashboard() {


  return (
    <div className="p-10 bg-gray-100 text-center">
      <h6 className="text-green-600 uppercase tracking-wide">E-Market</h6>
      <h1 className="text-3xl font-bold text-gray-900">Explore Our Fresh & Organic Products</h1>

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
            <div className="flex justify-between gap-20 mt-2">
              <button className="px-3 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600">View Details</button>
              <button className="px-3 py-2 bg-green-600 text-white text-md rounded-lg hover:bg-green-700"><FaCartShopping /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------
// Main Dashboard Component with Role Switching
// ---------------------
function Dashboard() {
  const [activeRole, setActiveRole] = useState('Admin');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Role Navigation */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-center space-x-4">
          <button
            className={`px-4 py-2 rounded ${activeRole === 'Admin'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700'
              }`}
            onClick={() => setActiveRole('Admin')}
          >
            Admin View
          </button>
          <button
            className={`px-4 py-2 rounded ${activeRole === 'Farmer'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700'
              }`}
            onClick={() => setActiveRole('Farmer')}
          >
            Farmer View
          </button>
          <button
            className={`px-4 py-2 rounded ${activeRole === 'Marketplace'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700'
              }`}
            onClick={() => setActiveRole('Marketplace')}
          >
            Marketplace/Buyer View
          </button>
        </div>
      </div>

      {/* Render Dashboard According to Role */}
      <div className="max-w-7xl mx-auto mt-6">
        {activeRole === 'Admin' && <AdminDashboard />}
        {activeRole === 'Farmer' && <FarmerDashboard />}
        {activeRole === 'Marketplace' && <MarketplaceDashboard />}
      </div>
    </div>
  );
}

export default Dashboard;
