import React, { useCallback, useEffect, useRef, useState } from "react";
import { getAllLandData } from "../context/firebase";
import { GoogleMap, LoadScript, Marker, DirectionsRenderer, Circle, DrawingManager, Polygon, } from '@react-google-maps/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import axios from "axios";
import Weather from "../Components/Weather";
import ConnectStationsModal from "../Components/ConnectStationsModal";
import Chatbot from "../Components/Chatbot";


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
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
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
    const [chatOpen, setChatOpen] = useState(false);

    const toggleChat = () => setChatOpen((open) => !open);

    const cropData = [
        {
            name: 'Wheat',
            area: 4000,
            growthStage: 'Vegetative',
            yield: 2400,
        },
        {
            name: 'Rice',
            area: 3000,
            growthStage: 'Flowering',
            yield: 2210,
        },
        {
            name: 'Maize',
            area: 2000,
            growthStage: 'Mature',
            yield: 2290,
        },
        {
            name: 'Soybean',
            area: 2780,
            growthStage: 'Early vegetative',
            yield: 2000,
        },
        {
            name: 'Cotton',
            area: 1890,
            growthStage: 'Flowering',
            yield: 2181,
        },
        {
            name: 'Sugarcane',
            area: 2390,
            growthStage: 'Ripening',
            yield: 2500,
        },
        {
            name: 'Barley',
            area: 3490,
            growthStage: 'Heading',
            yield: 2100,
        },
    ];
    const [selectedCrop, setSelectedCrop] = useState('');
    const [polygonCrops, setPolygonCrops] = useState({});

    const [activeTab, setActiveTab] = useState(tabs[0]);

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

    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState('Chandigarh'); // Default location
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isWeatherOpen, setIsWeatherOpen] = useState(false);
    const apiKey = 'dd3c83dcbff8dcb138dd19aac8a3a6ff'; // Replace with your API key
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

    useEffect(() => {
        fetchWeatherData();
    }, [location]);

    const fetchWeatherData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(apiUrl, {
                params: {
                    q: location,
                    appid: apiKey,
                    units: 'metric', // Change to 'imperial' for Fahrenheit
                },
            });
            setWeatherData(response.data);
        } catch (err) {
            setError('Failed to fetch weather data');
        }
        setLoading(false);
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };
    const [drawingMode, setDrawingMode] = useState(false);
    const [drawingManager, setDrawingManager] = useState(null);
    const [customPolygons, setCustomPolygons] = useState([]);
    const onPolygonComplete = (polygon) => {
        // Get polygon path
        const path = polygon.getPath().getArray();
        const polygonCoords = path.map(coord => ({
            lat: coord.lat(),
            lng: coord.lng()
        }));

        // Create a unique ID for the new polygon
        const newPolygonId = `custom-${Date.now()}`;

        // Add to custom polygons
        setCustomPolygons(prev => [
            ...prev,
            { id: newPolygonId, path: polygonCoords }
        ]);

        // Make the new polygon selectable
        polygon.addListener('click', () => {
            setSelectedPolygon(newPolygonId);

            // Apply selection styling
            polygon.setOptions({
                fillOpacity: 0.6,
                strokeColor: '#FF4500',
                strokeWeight: 2
            });
        });

        // Set this as the selected polygon
        setSelectedPolygon(newPolygonId);

        // Turn off drawing mode after polygon is complete
        setDrawingMode(false);
        drawingManager.setDrawingMode(null);
    };

    // Function to toggle drawing mode
    const toggleDrawingMode = () => {
        if (drawingMode) {
            setDrawingMode(false);
            drawingManager.setDrawingMode(null);
        } else {
            setDrawingMode(true);
            drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
        }
    };
    return (
        <div className="flex min-h-screen bg-white text-white">
            {/* Left + Center Panel */}
            <div className="flex flex-1 flex-col gap-4 p-4 overflow-hidden">
                {/* Satellite + Tabs Container */}
                <div className="flex flex-1 gap-4 ">
                    {/* Left: Map + Tabs */}
                    <div className="flex flex-col  flex-1  rounded-lg overflow-hidden">
                        {/* Map (fixed height) */}
                        <div className="h-[400px]">
                            <LoadScript libraries={['drawing']} googleMapsApiKey={import.meta.env.VITE_GOOGLE_KEY}>
                                <GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={startingPoint}
                                    zoom={15}
                                    onLoad={handleMapLoad}
                                    mapTypeId="hybrid"
                                >
                                    {mapLoaded && (
                                        <DrawingManager
                                            onLoad={(drawingManagerInstance) => {
                                                setDrawingManager(drawingManagerInstance);
                                            }}
                                            onPolygonComplete={onPolygonComplete}
                                            options={{
                                                drawingControl: false,
                                                polygonOptions: {
                                                    fillColor: '#4CAF50',
                                                    fillOpacity: 0.4,
                                                    strokeColor: '#32CD32',
                                                    strokeWeight: 1,
                                                    clickable: true,
                                                    editable: true,
                                                    draggable: true,
                                                },
                                            }}
                                        />
                                    )}

                                    {/* Render custom polygons */}
                                    {customPolygons.map((polygon) => (
                                        <Polygon
                                            key={polygon.id}
                                            paths={polygon.path}
                                            options={{
                                                fillColor: polygonCrops[polygon.id] ? cropColors[polygonCrops[polygon.id]] : '#4CAF50',
                                                fillOpacity: selectedPolygon === polygon.id ? 0.6 : 0.4,
                                                strokeColor: selectedPolygon === polygon.id ? '#FF4500' : '#32CD32',
                                                strokeWeight: selectedPolygon === polygon.id ? 2 : 1,
                                                clickable: true,
                                            }}
                                            onClick={() => setSelectedPolygon(polygon.id)}
                                        />
                                    ))}
                                </GoogleMap>
                            </LoadScript>



                        </div>
                        {/* Add this button somewhere in your UI */}
                        <button
                            onClick={toggleDrawingMode}
                            className={`px-4 py-2 absolute right-[22rem] top-[26rem] rounded ${drawingMode ? 'bg-red-500' : 'bg-green-500'}`}
                        >
                            {drawingMode ? 'Cancel Drawing' : 'Draw Polygon'}
                        </button>

                        <div className="flex items-center justify-between p-1 px-2 bg-teal-800 text-white rounded-b-xl">
                            <div className="flex justify-start ">
                                <button className="bg-teal-700 text-white px-5 py-2 rounded-md text-sm hover:bg-green-600">
                                    Show historical images
                                </button>
                            </div>

                            <div className="flex space-x-3 overflow-x-auto ">
                                <button className="bg-teal-700 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-500">
                                    13 Jan'25
                                </button>
                                <button className="bg-teal-700 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-500">
                                    23 Jan'25
                                </button>
                                <button className="bg-teal-700 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-500">
                                    02 Feb'25
                                </button>
                                <button className="bg-teal-700 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-500">
                                    12 Feb'25
                                </button>
                                <button className="bg-teal-700 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-500">
                                    17 Feb'25
                                </button>
                                <button className="bg-teal-700 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-500">
                                    04 Mar'25
                                </button>
                                <button className="bg-teal-700 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-500">
                                    09 Mar'25
                                </button>
                            </div>

                            <div className="flex justify-end ">
                                <button className="bg-teal-700 text-white px-5 py-2 rounded-md text-sm hover:bg-green-600">
                                    Next image <span className="ml-2">May 18, 2025</span>
                                </button>
                            </div>
                        </div>


                        {/* Tabs (scrollable) */}
                        <div className="flex flex-col  p-4 mt-4 rounded-2xl bg-teal-800 h-full">
                            {/* Tab Buttons */}
                            <div className="flex justify-between border-b border-teal-700 mb-4 w-full">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-2 w-full -mb-px ${activeTab === tab
                                            ? "border-b-2 border-black text-black"
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
                                    <div className=" bg-teal-700 p-4 rounded-lg">
                                        <h3 className="text-xl font-semibold mb-2">Polygon Selection</h3>
                                        {selectedPolygon ? (
                                            <p>Selected Polygon ID: {selectedPolygon}</p>
                                        ) : (
                                            <p>Click on a polygon on the map to select it</p>
                                        )}

                                        {selectedPolygon && (
                                            <div className="mt-4 bg-teal-700 p-4 rounded-lg">
                                                <h2 className="text-xl text-white mb-4">Polygon Selection</h2>

                                                {/* Landmark Name */}
                                                <div className="mb-4">
                                                    <label className="block text-sm text-gray-400">Landmark Name</label>
                                                    <input
                                                        type="text"
                                                        value="East Wellside Plot"  // This value should be dynamic based on your state or props
                                                        className="bg-teal-700 text-white p-2 rounded w-full"
                                                        disabled
                                                    />
                                                </div>
                                                <div className="flex gap-2">
                                                    {/* Survey/Khasra No. */}
                                                    <div className="mb-4">
                                                        <label className="block text-sm text-gray-400">Survey/Khasra No.</label>
                                                        <input
                                                            type="text"
                                                            value="105/7"  // This value should be dynamic
                                                            className="bg-gray-700 text-white p-2 rounded w-full"
                                                            disabled
                                                        />
                                                    </div>

                                                    {/* Polygon ID */}
                                                    <div className="mb-4">
                                                        <label className="block text-sm text-gray-400">Polygon ID</label>
                                                        <input
                                                            type="text"
                                                            value="92"  // This value should be dynamic
                                                            className="bg-gray-700 text-white p-2 rounded w-full"
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    {/* Current Crop */}
                                                    <div className="mb-4">
                                                        <label className="block text-sm text-gray-400">Current Crop</label>
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

                                                    </div>
                                                    {/* Irrigation */}
                                                    <div className="mb-4">
                                                        <label className="block text-sm text-gray-400">Irrigation</label>
                                                        <input
                                                            type="text"
                                                            value="Canal"  // This value should be dynamic
                                                            className="bg-gray-700 text-white p-2 rounded w-full"
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                {/* Growth Stage */}
                                                <div className="mb-4">
                                                    <label className="block text-sm text-gray-400">Growth Stage</label>
                                                    <input
                                                        type="text"
                                                        value="Vegetative (NDVI: 0.65)"  // This value should be dynamic
                                                        className="bg-gray-700 text-white p-2 rounded w-full"
                                                        disabled
                                                    />
                                                </div>


                                                {/* Buttons Section */}
                                                <div className="flex gap-4 mt-4">
                                                    <button
                                                        onClick={allocateCrop}
                                                        disabled={!selectedCrop}
                                                        className="bg-green-600 hover:bg-green-700 px-6 py-3 text-white rounded w-full disabled:opacity-50"
                                                    >
                                                        Allocate Crop
                                                    </button>
                                                    <button
                                                        onClick={deallocateCrop}
                                                        disabled={!polygonCrops[selectedPolygon]}
                                                        className="bg-red-600 hover:bg-red-700 px-6 py-3 text-white rounded w-full disabled:opacity-50"
                                                    >
                                                        Deallocate Crop
                                                    </button>
                                                </div>
                                            </div>

                                        )}
                                    </div>

                                    {/* Card: Sown Area */}
                                    <div className="bg-teal-700 rounded-lg  space-y-2">
                                        <div className="flex justify-between items-center bg-teal-600 text-white px-4 py-2 rounded-t-lg">
                                            <span className="" >Sown area detected</span>
                                            <svg
                                                className="w-4 h-4 text-black"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                                                <path d="M12 8v4l2 2" strokeWidth="2" />
                                            </svg>
                                        </div>
                                        <div className="flex py-1 p-4 justify-between items-center">
                                            <p className="text-black text-sm">10 May’25</p>
                                            <p className="text-black text-sm">Not sown</p>
                                        </div>
                                    </div>

                                    {/* Card: Crop Management Guide */}
                                    <div className="bg-teal-700 rounded-lg p-4 space-y-3">
                                        <h3 className="font-semibold">Crop management guide</h3>
                                        <p className="text-gray-200 text-sm">
                                            Explore the Crop Monitoring applications for different crops here
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
                                <div className="bg-teal-700 rounded-lg p-4">
                                    <div className="bg-teal-700 rounded-lg p-4 space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="flex items-center space-x-1">
                                                <span>Growth Stages</span>
                                            </span>
                                            <button className="text-blue-500 text-sm hover:underline">Edit</button>
                                        </div>


                                        {/* Recharts Visualization */}
                                        <ResponsiveContainer width="100%" height={300}>
                                            <AreaChart
                                                data={cropData}
                                                margin={{
                                                    top: 10,
                                                    right: 30,
                                                    left: 0,
                                                    bottom: 0,
                                                }}
                                            >
                                                <CartesianGrid stroke="#0c0a09" strokeDasharray="3 3" />
                                                <XAxis dataKey="name" stroke="#0c0a09" />
                                                <YAxis stroke="#0c0a09" />
                                                <Tooltip />

                                                {/* Area representing Crop Area */}
                                                <Area
                                                    type="monotone"
                                                    dataKey="area"
                                                    stackId="1"
                                                    stroke="#8884d8"
                                                    fill="#8884d8"
                                                    name="Area (sq m)"
                                                />

                                                {/* Area representing Crop Yield */}
                                                <Area
                                                    type="monotone"
                                                    dataKey="yield"
                                                    stackId="1"
                                                    stroke="#82ca9d"
                                                    fill="#82ca9d"
                                                    name="Yield (kg)"
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            )}

                            {activeTab === "Activities" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Left Section: Current Risks, NDVI Split */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Current Risks */}
                                        <div className="bg-teal-700 rounded-lg p-4 space-y-2">
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
                                                    is available in the Essential or Professional plans
                                                </a>
                                            </p>
                                        </div>

                                        {/* NDVI values split */}
                                        <div className="bg-teal-700 rounded-lg p-4 space-y-3">
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

                                            {/* Dummy Bar Chart */}
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

                                    {/* Right Section: Crop Status, Weather, Field Data */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Crop Status */}
                                        <div className="bg-teal-700 rounded-lg p-4 space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span>Crop Status</span>
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
                                                The current status of the crop is <span className="text-green-400">Healthy</span>. Expected to reach maturity by <span className="text-yellow-400">30th June 2025</span>.
                                            </p>
                                        </div>

                                        {/* Weather Information */}
                                        <div className="bg-teal-700 rounded-lg p-4 space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-white font-semibold text-lg">Weather Forecast</span>
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

                                            {loading ? (
                                                <p className="text-gray-400 text-sm">Loading weather data...</p>
                                            ) : weatherData ? (
                                                <div>
                                                    <p className="text-sm">
                                                        Next weather forecast:{" "}
                                                        <span className="text-blue-400">
                                                            {weatherData.weather[0].description}
                                                        </span>{" "}
                                                        for the next 48 hours.
                                                    </p>
                                                    <p className="text-sm">
                                                        Ideal conditions for crop growth:{" "}
                                                        <span className="text-green-400">
                                                            {weatherData.main.temp > 20 ? "Moderate temperature &" : "Low temperature &"} Moisture
                                                        </span>
                                                        .
                                                    </p>
                                                    <div className="mt-4">
                                                        <input
                                                            type="text"
                                                            value={location}
                                                            onChange={handleLocationChange}
                                                            placeholder="Enter city name"
                                                            className="p-2 rounded bg-teal-800 text-white w-full mb-2"
                                                        />
                                                        <button
                                                            onClick={fetchWeatherData}
                                                            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                                        >
                                                            Get Weather for {location}
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className="text-red-500 text-sm">Failed to fetch weather data</p>
                                            )}
                                        </div>

                                        {/* Field Data */}
                                        <div className="bg-teal-700 rounded-lg p-4 space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span>Field Data Overview</span>
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
                                            <p className="text-sm">Total field area: <span className="text-green-400">1500 sq. meters</span></p>
                                            <p className="text-sm">Irrigation status: <span className="text-yellow-400">Completed</span></p>
                                            <p className="text-sm">Fertilization status: <span className="text-green-400">Ongoing</span></p>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="w-64 bg-teal-800 rounded-xl text-gray-300 flex flex-col justify-between py-4 px-2 overflow-auto">
                        <div>
                            {/* Logo + Title */}
                            <div className="text-white font-bold text-lg mb-4 px-2">🌿 GreenHeart <span className="text-sm font-light">monitoring</span></div>

                            {/* Season Box */}
                            <div className="bg-teal-700 p-3 rounded-md mb-4 text-sm font-semibold text-white">
                                📅 Season 2025
                            </div>

                            {/* Menu List */}
                            <div className="space-y-2 text-sm">


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
                                <div>
                                    <button className="px-2" onClick={() => setModalOpen(true)}> ⚛️ Open Connect Modal</button>
                                    <ConnectStationsModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
                                </div>
                                {/* Weather */}
                                <div>
                                    <div
                                        className="px-2 cursor-pointer hover:text-blue-400 flex justify-between items-center"
                                        onClick={() => setIsWeatherOpen(true)}
                                    >
                                        ☁️ Weather
                                        <span>{weatherOpen ? "▾" : "▸"}</span>
                                    </div>

                                    {weatherOpen && (
                                        <div className="ml-6 mt-2 bg-gray-700 rounded-lg p-4 space-y-2">
                                            {loading ? (
                                                <p className="text-gray-400 text-sm">Loading weather data...</p>
                                            ) : weatherData ? (
                                                <div>
                                                    <p className="text-sm">
                                                        Current weather:{" "}
                                                        <span className="text-blue-400">{weatherData.weather[0].description}</span>
                                                    </p>
                                                    <p className="text-sm">
                                                        Temperature:{" "}
                                                        <span className="text-green-400">{weatherData.main.temp}°C</span>
                                                    </p>
                                                    <p className="text-sm">
                                                        Humidity:{" "}
                                                        <span className="text-green-400">{weatherData.main.humidity}%</span>
                                                    </p>
                                                    {/* <div className="mt-4">
                                                        <input
                                                            type="text"
                                                            value={location}
                                                            onChange={handleLocationChange}
                                                            placeholder="Enter city name"
                                                            className="p-2 rounded bg-gray-800 text-white w-full mb-2"
                                                        />
                                                        <button
                                                            onClick={() => setWeatherOpen(true)}
                                                            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                                        >
                                                            Get Weather for {location}
                                                        </button>
                                                    </div> */}
                                                </div>
                                            ) : (
                                                <p className="text-red-500 text-sm">Failed to fetch weather data</p>
                                            )}
                                        </div>
                                    )}
                                </div>




                            </div>
                        </div>

                        {/* Footer */}
                        <div className="space-y-2 mt-4 px-2 text-sm">
                            <div>✅ Insurance validation </div>
                            <button
                                onClick={toggleChat}
                                className="px-4 py-2 bg-teal-600 text-white rounded-xl"
                            >
                                {chatOpen ? 'Close AI assistant' : 'Start AI assistant'}
                            </button>
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
                <Weather />
            </div>
            <Weather
                isOpen={isWeatherOpen}
                onClose={() => setIsWeatherOpen(false)}
            />
            <Chatbot
                isOpenExternal={chatOpen}
                onOpenChange={setChatOpen}
            />
        </div>
    );
}
