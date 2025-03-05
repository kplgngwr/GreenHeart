import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getAllLandData } from '../firebase';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default icon not showing
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function Dashboard() {
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
    <div className="p-5 flex h-[70vh]">
      <div className="flex-3 relative h-full w-full">
        <MapContainer center={[30.7628, 76.5983]} zoom={13} className="h-full w-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {lands.map((land, index) => (
            <Marker key={index} position={[land.Latitude, land.Longitude]} eventHandlers={{
              click: () => setSelectedLand(land),
            }}>
              <Popup>
                <div className="text-sm">
                  <h2 className="text-lg font-bold">{land.Crop || 'Unknown Crop'}</h2>
                  <p><strong>NPK:</strong> {land.NPK || 'N/A'}</p>
                  <p><strong>PH:</strong> {land.PH || 'N/A'}</p>
                  <p><strong>Soil Moisture:</strong> {land.SoilMoisture || 'N/A'}</p>
                  <p><strong>Temperature:</strong> {land.Temperature || 'N/A'}</p>
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
        <div className="absolute top-2 right-2 bg-white bg-opacity-80 p-2 rounded shadow-md z-10">
          <div className="flex items-center mb-2">
            <span className="w-4 h-4 bg-blue-500 rounded-full inline-block mr-2"></span> Device
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 bg-green-500 rounded-full inline-block mr-2"></span> Subscription
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col p-5 bg-gray-100">
        <div className="bg-white border border-gray-300 rounded p-4 mb-4 shadow-md">Active Devices: {lands.length}</div>
        <div className="bg-white border border-gray-300 rounded p-4 mb-4 shadow-md">Connected Farmers: 40</div>
        <div className="bg-white border border-gray-300 rounded p-4 mb-4 shadow-md">Farmer Subscriptions: 15</div>
        <div className="bg-white border border-gray-300 rounded p-4 mb-4 shadow-md">Total Queries Raised: 15</div>
        <div className="bg-white border border-gray-300 rounded p-4 mb-4 shadow-md">Farmer Queries Resolved: 10</div>
      </div>
    </div>
  );
}

export default Dashboard;
