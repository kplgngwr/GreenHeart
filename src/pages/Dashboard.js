import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getAllLandData } from '../firebase'; // Adjust the path as needed
import './style.css'; // Import the CSS file

// Fix for default icon not showing
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
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
    <div className="dashboard-container">
      <div className="map-container">
        <MapContainer center={[30.762781820080985, 76.59829567774383]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {lands.map((land, index) => (
            <Marker key={index} position={[land.Latitude, land.Longitude]} eventHandlers={{
              click: () => {
                setSelectedLand(land);
              },
            }}>
              <Popup>
                <div>
                  <h2>{land.Crop || 'Unknown Crop'}</h2>
                  <p>NPK: {land.NPK || 'N/A'}</p>
                  <p>PH: {land.PH || 'N/A'}</p>
                  <p>Soil Moisture: {land.SoilMoisture || 'N/A'}</p>
                  <p>Temperature: {land.Temperature || 'N/A'}</p>
                  <button onClick={() => window.open('https://greenheart.streamlit.app/', '_blank')}>Get Recommendations</button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        <div className="legend">
          <div className="legend-item">
            <span className="legend-color device"></span> Device
          </div>
          <div className="legend-item">
            <span className="legend-color subscription"></span> Subscription
          </div>
        </div>
      </div>
      <div className="info-container">
        <div className="info-box">Active Devices: {lands.length}</div>
        <div className="info-box">Connected Farmers: 40 {/* Add logic to fetch this data */}</div>
        <div className="info-box">Farmer Subscriptions: 15 {/* Add logic to fetch this data */}</div>
        <div className="info-box">Total querries Raised: 15 {/* Add logic to fetch this data */}</div>
        <div className="info-box">Farmers Querries Resolved: 10 {/* Add logic to fetch this data */}</div>

      </div>
    </div>
  );
}

export default Dashboard; 