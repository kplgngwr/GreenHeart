import React, { useCallback, useEffect, useRef, useState } from "react";
import { getAllLandData } from "../context/firebase";
import { GoogleMap, LoadScript, Marker, DirectionsRenderer, Circle, } from '@react-google-maps/api';



const containerStyle = {
    width: '100%',
    height: '400px',
};
const startingPoint = { lat: 30.762357, lng: 76.598619 };


export default function GIS() {
    const [monitoringOpen, setMonitoringOpen] = useState(true);
    const [weatherOpen, setWeatherOpen] = useState(false);
    const [overviewOpen, setOverviewOpen] = useState(false);
    const [vraOpen, setVraOpen] = useState(false);
    const [dataManagerOpen, setDataManagerOpen] = useState(false);
    const [fieldManagerOpen, setFieldManagerOpen] = useState(false);
    const [helpOpen, setHelpOpen] = useState(false);
    const [marketplaceOpen, setMarketplaceOpen] = useState(false);
    const [lands, setLands] = useState([]);
    const toggle = setter => setter(prev => !prev);
    const tabs = ['Crop info', 'Chart', 'Activities'];

    // Add new state variables for polygon selection and crop allocation
    const [selectedPolygon, setSelectedPolygon] = useState(null);
    const [cropOptions, setCropOptions] = useState(['Wheat', 'Rice', 'Corn', 'Soybean', 'Cotton']);
    const cropColors = {
        "Wheat": "#F5DEB3",  // Wheat color
        "Rice": "#90EE90",   // Light green
        "Corn": "#FFD700",   // Gold
        "Soybean": "#8FBC8F", // Dark sea green
        "Cotton": "#F0FFFF"   // Azure
      };
    const [selectedCrop, setSelectedCrop] = useState('');
    const [polygonCrops, setPolygonCrops] = useState({});

    const [activeTab, setActiveTab] = useState(tabs[0]);

    // Keep existing useEffect for land data

    // Inside your GIS component, after your map is ready…
    const [mapLoaded, setMapLoaded] = useState(false);
    const mapRef = useRef(null);
    const [geoJsonData, setGeoJsonData] = useState(null);

    // Handle map load and set map reference
    const handleMapLoad = useCallback((mapInstance) => {
        mapRef.current = mapInstance;
        setMapLoaded(true);
    }, []);

    // Modified GeoJSON loading with polygon selection functionality
    useEffect(() => {
        if (mapLoaded) {
            fetch('/roorkee_pukhta_land.geojson')
                .then(response => response.json())
                .then(data => {
                    // Remove any existing data layers before adding new
                    data.features.forEach((feature, index) => {
                        if (!feature.properties.id) {
                            feature.properties.id = index;
                        }
                    });
                    
                    // Remove any existing data layers before adding new
                    mapRef.current.data.forEach(feature => {
                        mapRef.current.data.remove(feature);
                    });
                    
                    setGeoJsonData(data);
                    console.log(data);
                    mapRef.current.data.addGeoJson(data);

                    // Set style for polygons
                    mapRef.current.data.setStyle(feature => {
                        // Access properties correctly
                        const properties = {};
                        feature.forEachProperty((value, property) => {
                            properties[property] = value;
                        });
                        
                        // Get ID from properties or use feature index
                        const polygonId = properties.id || feature.getId();
                        const cropType = polygonCrops[polygonId];
                        
                        // Get color based on crop type
                        const cropColor = cropType ? cropColors[cropType] || '#4CAF50' : '#3388ff';
                        
                        return {
                            fillColor: cropColor,
                            fillOpacity: selectedPolygon === polygonId ? 0.6 : 0.4,
                            strokeColor: selectedPolygon === polygonId ? '#FF4500' : '#32CD32',
                            strokeWeight: selectedPolygon === polygonId ? 2 : 1,
                            strokeOpacity: 1
                        };
                    });
                    

                    // Add click event listener for polygons
                    mapRef.current.data.addListener('click', (event) => {
                        const feature = event.feature;
                        
                        // Access properties correctly
                        const properties = {};
                        feature.forEachProperty((value, property) => {
                            properties[property] = value;
                        });
                        console.log("Properties:", properties);
                        
                        // Get the ID directly from properties or use index
                        const polygonId = properties.id || feature.getId();
                        console.log("Selected polygon with ID:", polygonId);
                        
                        setSelectedPolygon(polygonId);
                        mapRef.current.data.revertStyle();
                        mapRef.current.data.overrideStyle(feature, {
                            fillOpacity: 0.6,
                            strokeColor: '#FF4500',
                            strokeWeight: 2
                        });
                    });
                })
                .catch(error => {
                    console.error("Error loading GeoJSON:", error);
                });
        }
    }, [mapLoaded, polygonCrops, selectedPolygon]);

    // Function to allocate crop to selected polygon
    const allocateCrop = () => {
        if (selectedPolygon && selectedCrop) {
            setPolygonCrops(prev => ({
                ...prev,
                [selectedPolygon]: selectedCrop
            }));

            // Refresh the map styles
            mapRef.current.data.revertStyle();

            // Show success message
            alert(`Crop ${selectedCrop} allocated to polygon ${selectedPolygon}`);
        }
    };


    // Function to disallocate crop from selected polygon
    // Function to deallocate crop from selected polygon
    const deallocateCrop = () => {
        if (selectedPolygon && polygonCrops[selectedPolygon]) {
            const updatedCrops = { ...polygonCrops };
            delete updatedCrops[selectedPolygon];
            setPolygonCrops(updatedCrops);

            // Refresh the map styles
            mapRef.current.data.revertStyle();

            // Show success message
            alert(`Crop deallocated from polygon ${selectedPolygon}`);
        }
    };


    return (
        <div className="flex h-screen bg-white text-white">
            {/* Left + Center Panel */}
            <div className="flex flex-1 flex-col gap-4 p-4 overflow-hidden">


                {/* Satellite + Tabs Container */}
                <div className="flex flex-1 gap-4 overflow-hidden">
                    {/* Left: Map + Tabs */}
                    <div className="flex flex-col  flex-1  rounded-lg overflow-hidden">
                        {/* Map (fixed height) */}
                        <div className="h-[400px]">
                            <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_KEY}>
                                <GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={startingPoint}
                                    zoom={15}
                                    onLoad={handleMapLoad}
                                    mapTypeId="hybrid"
                                >
                                    {/* Other map layers or markers */}
                                </GoogleMap>
                            </LoadScript>



                        </div>

                        {/* Tabs (scrollable) */}
                        <div className="flex-1 overflow-y-auto p-4 mt-4 rounded-2xl bg-gray-800">
                            {/* Tab Buttons */}
                            <div className="flex justify-between border-b border-gray-600 mb-4 w-full">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-2 w-full -mb-px ${activeTab === tab
                                            ? "border-b-2 border-blue-500 text-blue-500"
                                            : "text-gray-400 hover:text-white"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Tab Panels */}
                            {activeTab === "Crop info" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {/* Card: Crop Rotation */}
                                    <div className=" bg-gray-700 p-4 rounded-lg">
                                        <h3 className="text-xl font-semibold mb-2">Polygon Selection</h3>
                                        {selectedPolygon ? (
                                            <p>Selected Polygon ID: {selectedPolygon}</p>
                                        ) : (
                                            <p>Click on a polygon on the map to select it</p>
                                        )}

                                        {selectedPolygon && (
                                            <div className="mt-4">
                                                <p>Current Crop: {polygonCrops[selectedPolygon] || 'None'}</p>

                                                <div className="mt-4">
                                                    <label className="block mb-2">Allocate Crop:</label>
                                                    <select
                                                        value={selectedCrop}
                                                        onChange={(e) => setSelectedCrop(e.target.value)}
                                                        className="bg-gray-800 text-white p-2 rounded w-full mb-2"
                                                    >
                                                        <option value="">Select a crop</option>
                                                        {cropOptions.map(crop => (
                                                            <option key={crop} value={crop}>{crop}</option>
                                                        ))}
                                                    </select>

                                                    <div className="flex gap-2 mt-2">
                                                        <button
                                                            onClick={allocateCrop}
                                                            disabled={!selectedCrop}
                                                            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded disabled:opacity-50"
                                                        >
                                                            Allocate Crop
                                                        </button>

                                                        <button
                                                            onClick={deallocateCrop}
                                                            disabled={!polygonCrops[selectedPolygon]}
                                                            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded disabled:opacity-50"
                                                        >
                                                            Deallocate Crop
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Card: Sown Area */}
                                    <div className="bg-gray-700 rounded-lg  space-y-2">
                                        <div className="flex justify-between items-center bg-gray-600 text-white px-4 py-2 rounded-t-lg">
                                            <span className="" >Sown area detected</span>
                                            <svg
                                                className="w-4 h-4 text-gray-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                                                <path d="M12 8v4l2 2" strokeWidth="2" />
                                            </svg>
                                        </div>
                                        <div className="flex p-4 justify-between items-center">
                                            <p className="text-gray-400 text-sm">10 May’25</p>
                                            <p className="text-gray-400 text-sm">Not sown</p>
                                        </div>
                                    </div>

                                    {/* Card: Crop Management Guide */}
                                    <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-lg p-4 space-y-3">
                                        <h3 className="font-semibold">Crop management guide</h3>
                                        <p className="text-gray-200 text-sm">
                                            Explore EOSDA Crop Monitoring applications for different crops here
                                        </p>
                                        <a
                                            href="#"
                                            className="inline-flex items-center text-white hover:underline text-sm"
                                        >
                                            Go to guide&nbsp;
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            )}

                            {activeTab === "Chart" && (
                                <div className="bg-gray-700 rounded-lg p-4">
                                    <div className="bg-gray-700 rounded-lg p-4 space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="flex items-center space-x-1">
                                                <svg
                                                    className="w-5 h-5 text-green-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M3 12l2-2 4 4 8-8 4 4" strokeWidth="2" />
                                                </svg>
                                                <span>Growth Stages</span>
                                            </span>
                                            <button className="text-blue-500 text-sm hover:underline">Edit</button>
                                        </div>
                                        <p className="text-blue-500 text-sm">
                                            Select a crop to view its growth stages
                                        </p>
                                    </div>
                                </div>
                            )}

                            {activeTab === "Activities" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Current risks */}
                                        <div className="bg-gray-700 rounded-lg p-4 space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span>Current risks</span>
                                                <svg
                                                    className="w-4 h-4 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                                                    <path d="M12 8v4" strokeWidth="2" />
                                                </svg>
                                            </div>
                                            <p className="text-sm">
                                                Risk information on this field{' '}
                                                <a href="#" className="text-blue-500 hover:underline">
                                                    is available in the Essentional or Professional plans
                                                </a>
                                            </p>
                                        </div>

                                        {/* NDVI values split */}
                                        <div className="bg-gray-700 rounded-lg p-4 space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span>NDVI values split</span>
                                                <svg
                                                    className="w-4 h-4 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                                                    <path d="M12 8v4" strokeWidth="2" />
                                                </svg>
                                            </div>
                                            <p className="text-gray-400 text-sm">Date: 10 May’25</p>

                                            {/* Dummy bar chart */}
                                            <div className="flex items-end space-x-2 h-24">
                                                <div className="w-2 bg-green-400" style={{ height: '2%' }} />
                                                <div className="w-2 bg-yellow-400" style={{ height: '13.72%' }} />
                                                <div className="w-2 bg-orange-400" style={{ height: '41.05%' }} />
                                                <div className="w-2 bg-red-500" style={{ height: '45.23%' }} />
                                                <div className="w-2 bg-gray-600" style={{ height: '0%' }} />
                                            </div>

                                            {/* Legend */}
                                            <div className="text-sm space-y-1">
                                                <p><span className="text-green-400">•</span> Dense vegetation</p>
                                                <p><span className="text-yellow-400">•</span> Moderate vegetation</p>
                                                <p><span className="text-orange-400">•</span> Sparse vegetation</p>
                                                <p><span className="text-red-500">•</span> Open soil</p>
                                                <p><span className="text-gray-400">•</span> Cloudiness</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="w-64 bg-[#141c27] text-gray-300 flex flex-col justify-between py-4 px-2 overflow-auto">
                        <div>
                            {/* Logo + Title */}
                            <div className="text-white font-bold text-lg mb-4 px-2">🌿 CROP <span className="text-sm font-light">monitoring</span></div>

                            {/* Season Box */}
                            <div className="bg-[#202b3a] p-3 rounded-md mb-4 text-sm font-semibold text-white">
                                📅 Season 2025
                            </div>

                            {/* Menu List */}
                            <div className="space-y-2 text-sm">

                                <div className="px-2">🚀 Get started</div>

                                {/* Monitoring Toggle */}
                                <div>
                                    <div
                                        className="px-2 cursor-pointer hover:text-blue-400 flex justify-between items-center"
                                        onClick={() => toggle(setMonitoringOpen)}
                                    >
                                        📦 Monitoring
                                        <span>{monitoringOpen ? '▾' : '▸'}</span>
                                    </div>
                                    {monitoringOpen && (
                                        <div className="ml-6 space-y-1 mt-1">
                                            <div className="hover:text-blue-400 cursor-pointer">Global view</div>
                                            <div className="text-blue-400 cursor-pointer">Field analytics</div>
                                            <div className="hover:text-blue-400 cursor-pointer">Diseases & Pests</div>
                                        </div>
                                    )}
                                </div>

                                {/* Weather */}
                                <div>
                                    <div
                                        className="px-2 cursor-pointer hover:text-blue-400 flex justify-between items-center"
                                        onClick={() => toggle(setWeatherOpen)}
                                    >
                                        ☁️ Weather
                                        <span>{weatherOpen ? '▾' : '▸'}</span>
                                    </div>
                                    {weatherOpen && <div className="ml-6 mt-1">Coming soon...</div>}
                                </div>

                                {/* Scout Tasks */}
                                <div className="px-2">📍 Scout tasks</div>

                                {/* Overview */}
                                <div>
                                    <div
                                        className="px-2 cursor-pointer hover:text-blue-400 flex justify-between items-center"
                                        onClick={() => toggle(setOverviewOpen)}
                                    >
                                        📊 Overview
                                        <span>{overviewOpen ? '▾' : '▸'}</span>
                                    </div>
                                    {overviewOpen && <div className="ml-6 mt-1">Coming soon...</div>}
                                </div>

                                {/* VRA Maps */}
                                <div>
                                    <div
                                        className="px-2 cursor-pointer hover:text-blue-400 flex justify-between items-center"
                                        onClick={() => toggle(setVraOpen)}
                                    >
                                        🗺 VRA maps
                                        <span>{vraOpen ? '▾' : '▸'}</span>
                                    </div>
                                    {vraOpen && <div className="ml-6 mt-1">Coming soon...</div>}
                                </div>

                                {/* Field Activity Log */}
                                <div className="px-2">🗓 Field activity log</div>

                                {/* Data Manager */}
                                <div>
                                    <div
                                        className="px-2 cursor-pointer hover:text-blue-400 flex justify-between items-center"
                                        onClick={() => toggle(setDataManagerOpen)}
                                    >
                                        💽 Data manager
                                        <span>{dataManagerOpen ? '▾' : '▸'}</span>
                                    </div>
                                    {dataManagerOpen && <div className="ml-6 mt-1">Coming soon...</div>}
                                </div>

                                {/* Field Manager */}
                                <div>
                                    <div
                                        className="px-2 cursor-pointer hover:text-blue-400 flex justify-between items-center"
                                        onClick={() => toggle(setFieldManagerOpen)}
                                    >
                                        🧱 Field manager
                                        <span>{fieldManagerOpen ? '▾' : '▸'}</span>
                                    </div>
                                    {fieldManagerOpen && <div className="ml-6 mt-1">Coming soon...</div>}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="space-y-2 mt-4 px-2 text-sm">
                            <div>✨ AI assistant</div>
                            <div>🔔 Notifications</div>

                            {/* Help Center */}
                            <div>
                                <div
                                    className="cursor-pointer hover:text-blue-400 flex justify-between items-center"
                                    onClick={() => toggle(setHelpOpen)}
                                >
                                    ❓ Help Center
                                    <span>{helpOpen ? '▾' : '▸'}</span>
                                </div>
                                {helpOpen && <div className="ml-6 mt-1">Coming soon...</div>}
                            </div>

                            {/* Marketplace */}
                            <div>
                                <div
                                    className="cursor-pointer hover:text-blue-400 flex justify-between items-center"
                                    onClick={() => toggle(setMarketplaceOpen)}
                                >
                                    🛍 Marketplace
                                    <span>{marketplaceOpen ? '▾' : '▸'}</span>
                                </div>
                                {marketplaceOpen && <div className="ml-6 mt-1">Coming soon...</div>}
                            </div>

                            {/* User Section */}
                            <div className="pt-3 border-t border-gray-700 mt-3">
                                <div>👤 Alok kumar Yadav</div>
                                <div className="text-xs text-gray-400">Team Alok kumar...</div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="pt-4 space-y-2">
                                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-md text-sm">
                                    Request A Demo
                                </button>
                                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded-md text-sm">
                                    Upgrade Plan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
