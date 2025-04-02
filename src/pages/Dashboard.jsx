import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { ArrowRight, ChevronRight, Check } from 'lucide-react';
import appleImage from '/apple.jpeg';
import orangeImage from '/oranges.png';
import spinachImage from '/spinach.jpg';
import strawberryImage from '/strawberry.jpg';
import tomatoImage from '/tomato.jpg';
import { FaCartShopping } from "react-icons/fa6";
import { FaShoppingBasket, FaSeedling, FaChalkboardTeacher, FaVrCardboard, FaMicroscope } from 'react-icons/fa';
import { getAllLandData, getAllProfilesData, useFirebase } from '../context/firebase';
import { getFirestore, updateDoc, doc } from 'firebase/firestore';
import { Toaster } from 'react-hot-toast';

// Fix for default icon not showing
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function AdminDashboard() {
  const [lands, setLands] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [selectedLand, setSelectedLand] = useState(null);
  const [selectedDevices, setSelectedDevices] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [previousDevice, setPreviousDevice] = useState("");


  // Initialize Firestore instance for updating user profiles
  const firestoreInstance = getFirestore();

  // Fetch land (device) data
  useEffect(() => {
    async function fetchData() {
      const data = await getAllLandData();
      const landArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
      setLands(landArray);
    }
    fetchData();
  }, []);

  // Fetch profiles data
  useEffect(() => {
    async function fetchProfiles() {
      try {
        const profilesData = await getAllProfilesData();
        console.log(profilesData)
        setProfiles(profilesData);
      } catch (error) {
        console.error("Error fetching profiles data:", error);
      }
    }
    fetchProfiles();
  }, []);

  // Handle user selection
  const handleUserChange = (e) => {
    const userId = e.target.value;
    setSelectedUser(userId);

    // Find the selected user profile and set the previously allocated device
    const userProfile = profiles.find(profile => profile.id === userId);
    setPreviousDevice(userProfile?.deviceId || "");
  };

  // Function to allocate or dis-allocate a device to a user
  const allocateDeviceToUserHandler = async (userId, deviceId) => {
    try {
      if (!deviceId) {
        // If no device is selected, we dis-allocate the current device
        await updateDoc(doc(firestoreInstance, "Profiles", userId), { deviceId: "" });
      } else {
        // If a device is selected, we allocate it to the user
        await updateDoc(doc(firestoreInstance, "Profiles", userId), { deviceId });
      }

      // Optionally refresh profiles data after update
      const updatedProfiles = await getAllProfilesData();
      setProfiles(updatedProfiles);
      setPreviousDevice(deviceId); // Update the previous device after allocation
      toast.success(`Device ${deviceId ? 'allocated' : 'dis-allocated'} successfully!`, {
        duration: 3000,
      });
    } catch (error) {
      console.error("Error allocating/dis-allocating device:", error);
    }
  };

  return (
    <div className="p-5  h-full">
      <Toaster />
      {/* Device Allocation Section */}
      <div className="w-full my-6 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Device Allocation</h2>

        {/* User selection dropdown */}
        <div className="flex justify-between">
          <div className="mb-4 w-2/5">
            <label className="block text-gray-700 mb-2">Select User</label>
            <select
              value={selectedUser}
              onChange={handleUserChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select a user</option>
              {profiles.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.name} ({profile.email})
                </option>
              ))}
            </select>
          </div>

          {/* Device selection dropdown */}
          <div className="mb-4 w-2/5">
            <label className="block text-gray-700 mb-2">Allocate/Dis-allocate Device</label>
            <select
              value={selectedDevices[selectedUser] || previousDevice || ""}
              onChange={(e) => {
                setSelectedDevices({ ...selectedDevices, [selectedUser]: e.target.value });
              }}
              className="w-full px-3 py-2 border rounded"
              disabled={!selectedUser}
            >
              <option value="">Select a device</option>
              {lands.map((device) => (
                <option key={device.id} value={device.id}>
                  {device.Crop} (ID: {device.id})
                </option>
              ))}
            </select>
          </div>

          {/* Action Button */}
          <div className="grid grid-cols-2 gap-2 h-10 mt-7.5">
            {/* Allocate Button */}
            <button
              onClick={() =>
                allocateDeviceToUserHandler(selectedUser, selectedDevices[selectedUser] || "")
              }
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              disabled={!selectedUser || !selectedDevices[selectedUser]}  // Ensure a device is selected
            >
              Allocate
            </button>

            {/* De-allocate Button */}
            <button
              onClick={() =>
                allocateDeviceToUserHandler(selectedUser, "")  // Passing empty string to dis-allocate
              }
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              disabled={!selectedUser || !previousDevice}  // Ensure there is a device to de-allocate
            >
              De-allocate
            </button>
          </div>
        </div>
      </div>


      {/* Map & Visualization Section */}
      <div className='flex' >


        <div className="  h-[70vh] w-full lg:w-2/3 mb-4 lg:mb-0">
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
          <div className="absolute top-28 right-6 bg-white bg-opacity-80 p-2 rounded shadow-md z-10">
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


    </div>
  );
}

// Farmer Dashboard Component
// Updated FarmerDashboard Component
function FarmerDashboard() {
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState({ temp: '28°C', condition: 'Sunny' });

  // Get userDetails from Firebase context
  const { userDetails } = useFirebase();
  console.log(userDetails)
  // Sample farmer info (for demonstration only)
  const farmer = {
    name: "Rajesh Kumar",
    farmSize: "5 acres",
    location: "Punjab"
  };

  // Fetch land (device) data based on the user's deviceId from profile
  useEffect(() => {
    async function fetchData() {
      if (!userDetails || !userDetails.deviceId) {
        setLands([]);
        setLoading(false);
        return;
      }
      try {
        const data = await getAllLandData();
        const landArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        // Filter the lands so that only the one matching the user's deviceId is used.
        const filtered = landArray.filter(land => land.id === userDetails.deviceId);
        setLands(filtered);
      } catch (error) {
        console.error("Error fetching land data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [userDetails]);

  // Function to get health status based on soil moisture
  const getHealthStatus = (soilMoisture) => {
    if (!soilMoisture) return { status: "Unknown", color: "gray" };
    const moisture = parseFloat(soilMoisture);
    if (moisture < 30) return { status: "Needs Water", color: "red" };
    if (moisture > 70) return { status: "Excess Water", color: "orange" };
    return { status: "Healthy", color: "green" };
  };

  return (
    <div className="p-5 bg-gray-50">
      {/* Farmer Welcome Banner */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-lg p-6 text-white mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome, {userDetails.name}</h2>
            <p className="text-green-100">
              Farm Size: {userDetails.farmSize} • Location: {userDetails.location}
            </p>
          </div>
          <div className="mt-4 md:mt-0 p-2 bg-blue-300 text-black bg-opacity-20 rounded-lg">
            <div className="w-full flex items-center justify-center">
              {userDetails?.gender ? (
                userDetails.gender.toLowerCase() === 'male' ? (
                  <img
                    src="https://i.postimg.cc/VkpGnh01/male.png"
                    alt="Male"
                    className="w-12 h-12 "
                  />
                ) : userDetails.gender.toLowerCase() === 'female' ? (
                  <img
                    src="https://i.postimg.cc/d3hnhmQD/female1.png"
                    alt="Female"
                    className="w-12 h-12 "
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white font-semibold">
                    {userDetails.gender.charAt(0).toUpperCase()}
                  </div>
                )
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white font-semibold">
                  ?
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-3 text-gray-600">Loading your farm data...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Farm Overview & Insights */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <FaSeedling className="text-green-600 text-2xl mr-3" />
              <h3 className="text-xl font-semibold">Farm Overview</h3>
            </div>

            {lands.length > 0 ? (
              <div className="space-y-4">
                {lands.map((land, index) => {
                  const health = getHealthStatus(land.SoilMoisture);
                  return (
                    <div key={index} className="border-b pb-3 last:border-0">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">
                          {land.Crop || "Plot " + (index + 1)}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium text-white bg-${health.color}-500`}
                        >
                          {health.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                        <div>
                          <span className="text-gray-600">Soil Moisture:</span> {land.SoilMoisture || "N/A"}
                        </div>
                        <div>
                          <span className="text-gray-600">pH:</span> {land.PH || "N/A"}
                        </div>
                        <div>
                          <span className="text-gray-600">NPK:</span> {land.NPK || "N/A"}
                        </div>
                        <div>
                          <span className="text-gray-600">Temp:</span> {land.Temperature || "N/A"}°C
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="pt-3">
                  <button
                    className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    onClick={() => window.open('https://greenheart.streamlit.app/', '_blank')}
                  >
                    <span>Get AI Recommendations</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No farm plot registered with your device.</p>
            )}
          </div>

          {/* Quality Control & Yield Prediction */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <FaMicroscope className="text-green-600 text-2xl mr-3" />
              <h3 className="text-xl font-semibold">Quality & Yield</h3>
            </div>

            <div className="space-y-4">
              {lands.length > 0 ? (
                <div>
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-800 mb-2">Crop Health Analysis</h4>
                    <div className="h-24 bg-gray-100 rounded flex items-center justify-center">
                      <p className="text-green-600">AI analysis in progress...</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Yield Prediction</h4>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span>Current Estimate:</span>
                        <span className="font-medium">1,200 kg/acre</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Market Value:</span>
                        <span>₹24,000 - ₹26,400</span>
                      </div>
                    </div>

                    <button className="mt-4 w-full flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                      <span>Request Detailed Report</span>
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Register your farm plot to get yield predictions.</p>
              )}
            </div>
          </div>

          {/* Expert Assistance & Training */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <FaChalkboardTeacher className="text-green-600 text-2xl mr-3" />
              <h3 className="text-xl font-semibold">Support & Learning</h3>
            </div>

            <div className="space-y-4">
              <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                <h4 className="font-medium text-green-700 mb-1">Your GreenHeart Expert</h4>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-bold mr-3">
                    AS
                  </div>
                  <div>
                    <p className="font-medium">Amit Singh</p>
                    <p className="text-sm text-gray-600">Agricultural Specialist</p>
                  </div>
                </div>
                <button className="mt-2 w-full text-sm px-3 py-1 border border-green-500 text-green-500 rounded hover:bg-green-50 transition-colors">
                  Contact Expert
                </button>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-3">Services</h4>
                <div className="space-y-2">
                  {[
                    { title: "Soil Testing", icon: <ArrowRight className="h-4 w-4" />, status: "Completed" },
                    { title: "Drone Monitoring", icon: <ArrowRight className="h-4 w-4" />, status: "Scheduled" },
                    { title: "Water Quality Test", icon: <ArrowRight className="h-4 w-4" />, status: "Completed" }
                  ].map((service, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span>{service.title}</span>
                      <button className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded flex items-center">
                        {service.icon}
                        <span className="ml-1">{service.status}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <h4 className="font-medium text-gray-800 mb-3">Learning Resources</h4>
                <div className="space-y-2 text-sm">
                  <a href="#" className="block p-2 bg-orange-50 text-orange-700 rounded hover:bg-orange-100 transition-colors">
                    🎓 New farming techniques (Video)
                  </a>
                  <a href="#" className="block p-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors">
                    📋 Government subsidy scheme 2023
                  </a>
                  <a href="#" className="block p-2 bg-purple-50 text-purple-700 rounded hover:bg-purple-100 transition-colors">
                    🌱 Organic certification process
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Market Connection */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <FaShoppingBasket className="text-green-600 text-2xl mr-3" />
            <h3 className="text-xl font-semibold">Market Connection</h3>
          </div>
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
            Sell Your Produce
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left">Crop</th>
                <th className="py-3 px-4 text-left">Current Price</th>
                <th className="py-3 px-4 text-left">Trend</th>
                <th className="py-3 px-4 text-left">Best Market</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { crop: "Wheat", price: "₹2,200/quintal", trend: "up", market: "Khanna Mandi" },
                { crop: "Rice", price: "₹1,950/quintal", trend: "down", market: "Ludhiana Mandi" },
                { crop: "Corn", price: "₹1,450/quintal", trend: "stable", market: "Jalandhar Mandi" }
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{item.crop}</td>
                  <td className="py-3 px-4 font-medium">{item.price}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block rounded-full w-3 h-3 bg-${item.trend === "up" ? "green" : item.trend === "down" ? "red" : "yellow"}-500`}></span>
                  </td>
                  <td className="py-3 px-4">{item.market}</td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Main Dashboard Component with Role Switching
function Dashboard() {
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

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-green-500"></div>
      </div>
    );
  }

  // No user logged in
  if (!userDetails) {
    return (
      <div className="p-10 bg-gray-100 text-center">
        <h6 className="text-red-600 uppercase tracking-wide">Access Denied</h6>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Please Log In to Access Dashboard
        </h1>
        <p className="text-gray-700">
          You need to be logged in to view dashboard content. Please sign in to continue.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Render Dashboard According to Role */}
      <div className="max-w-7xl mx-auto ">
        {userDetails.role === 'Admin' && <AdminDashboard />}
        {userDetails.role === 'Farmer' && <FarmerDashboard />}
      </div>
    </div>
  );
}

export default Dashboard;
