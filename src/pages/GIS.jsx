import React, { useEffect, useRef, useState } from "react";
import { getAllLandData } from "../context/firebase";

import { GoogleMap, LoadScript, Marker, DirectionsRenderer, Circle, } from '@react-google-maps/api';



const containerStyle = {
    width: '100%',
    height: '400px',
};
const startingPoint = { lat: 30.762357, lng: 76.598619 };
const speedLimitZone = {
    center: { lat: 30.756109, lng: 76.642427 },
    radius: 500,
    speedLimit: 30,
};

export default function GIS() {
    const [mapLoaded, setMapLoaded] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [distanceTraveled, setDistanceTraveled] = useState(null);
    const [directions, setDirections] = useState(null);
    const [currentSpeed, setCurrentSpeed] = useState(0);
    const [timestamp, setTimestamp] = useState(null);
    const [error, setError] = useState(null);
    const mapRef = useRef(null);

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
    const [active, setActive] = useState(tabs[0]);

    const [selectedLand, setSelectedLand] = useState(null);
    const handleMapLoad = map => {
        mapRef.current = map;
        setMapLoaded(true);
    };
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const toRad = v => (v * Math.PI) / 180;
    const calcDistance = (lat1, lng1, lat2, lng2) => {
        const R = 6371;
        const dLat = toRad(lat2 - lat1);
        const dLng = toRad(lng2 - lng1);
        const a =
            Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    };
    useEffect(() => {
        getAllLandData().then((data) => {
            const arr = Object.keys(data).map((k) => ({ id: k, ...data[k] }));
            setLands(arr);
        });
    }, []);

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            {/* Left + Center Panel */}
            <div className="flex flex-1 flex-col gap-4 p-4 overflow-hidden">
                {/* Satellite + Tabs Container */}
                <div className="flex flex-1 gap-4 overflow-hidden">
                    {/* Left: Map + Tabs */}
                    <div className="flex flex-col flex-1 bg-gray-800 rounded-lg overflow-hidden">
                        {/* Map (fixed height) */}
                        <div className="h-[400px]">
                            <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_KEY}>
                                {/* Map */}
                                <GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={startingPoint}
                                    zoom={12}
                                    mapTypeId="hybrid"
                                    onLoad={handleMapLoad}
                                >
                                    {/* starting point */}
                                    <Marker position={startingPoint} />
                                    {/* current */}
                                    {currentLocation && (
                                        <Marker
                                            position={currentLocation}
                                            icon={{
                                                url: 'https://cdn-icons-png.flaticon.com/512/1048/1048329.png',
                                                scaledSize: new window.google.maps.Size(40, 40),
                                            }}
                                        />
                                    )}
                                    
                                </GoogleMap>
                            </LoadScript>
                        </div>

                        {/* Tabs (scrollable) */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {/* Tab Buttons */}
                            <div className="flex border-b border-gray-600 mb-4">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-2 -mb-px ${activeTab === tab
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
                                    <div className="bg-gray-700 rounded-lg p-4 space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span>Crop rotation</span>
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
                                        <p className="text-gray-400 text-sm">Season: Season 2025</p>
                                        <button className="text-blue-500 text-sm hover:underline">Show all</button>
                                        <div className="mt-2 p-3 border border-gray-600 rounded-lg text-center text-blue-500 cursor-pointer hover:bg-gray-600">
                                            + Add crop
                                        </div>
                                    </div>

                                    {/* Card: Sown Area */}
                                    <div className="bg-gray-700 rounded-lg p-4 space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span>Sown area detected, %</span>
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
                                        <p className="text-gray-400 text-sm">10 May’25</p>
                                        <p className="font-semibold">Not sown</p>
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
