// src/components/PolygonDronePanel.jsx
import React, { useState } from "react";

export default function PolygonDronePanel() {
  const [droneId, setDroneId] = useState("DR-104");
  const [altitude, setAltitude] = useState(10);
  const [sprayWidth, setSprayWidth] = useState(5);
  const [material, setMaterial] = useState("Fungicide");
  const [exportFormat, setExportFormat] = useState("GeoJSON");

  return (
    <div className="bg-teal-800 text-white p- rounded-lg flex flex-col lg:flex-row justify-between w-full gap-6">
      {/* Left: Polygon Selection */}
      <div className="flex flex-col w-2/3 bg-teal-700 p-4 rounded-lg space-y-4">
        <h2 className="text-xl font-semibold">Polygon Selection</h2>
        <p className="text-sm text-green-200">Polygon ID <span className="font-bold">26</span></p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sawara density */}
          <div className="bg-teal-800 p-3 rounded">
            <h3 className="font-medium">Sawara density</h3>
            <p className="text-xs text-teal-300">Sem crar dentaiy rerdecea</p>
            <div className="mt-2 flex items-center text-green-200 text-sm">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path d="M12 8v4" strokeWidth="2" />
              </svg>
              May 10 2025
            </div>
          </div>

          {/* Crop monitoring guide */}
          <div className="bg-teal-800 p-3 rounded">
            <h3 className="font-medium">Prepifi Aud frenotive</h3>
            <p className="text-xs text-teal-300 mt-1">
              Compare the Crop Monitoring guidettes for different crops here.
            </p>
            <button className="mt-2 inline-flex items-center text-teal-100 hover:text-white text-sm">
              Learn more&nbsp;
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Right: Drone Spray Allocation */}
      <div className="flex flex-col w-1/3 bg-teal-700 p-4 rounded-lg space-y-4">
        <h2 className="text-xl font-semibold">Drone Spray Allocation</h2>

        <div className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Drone ID:</label>
            <select
              value={droneId}
              onChange={e => setDroneId(e.target.value)}
              className="w-full p-2 bg-teal-800 rounded"
            >
              <option>DR-101</option>
              <option>DR-102</option>
              <option>DR-103</option>
              <option>DR-104</option>
            </select>
          </div>
          <div className="flex gap-2">
            <div>
              <label className="block text-sm mb-1">Altitude (m):</label>
              <input
                type="number"
                value={altitude}
                onChange={e => setAltitude(e.target.value)}
                className="w-full p-2 bg-teal-800 rounded"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Spray width (m):</label>
              <input
                type="number"
                value={sprayWidth}
                onChange={e => setSprayWidth(e.target.value)}
                className="w-full p-2 bg-teal-800 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Material:</label>
            <select
              value={material}
              onChange={e => setMaterial(e.target.value)}
              className="w-full p-2 bg-teal-800 rounded"
            >
              <option>Fungicide</option>
              <option>Herbicide</option>
              <option>Insecticide</option>
            </select>
          </div>
        </div>

        {/* Export options */}
        <fieldset className="space-y-2 ">
          <legend className="text-sm">Export</legend>
          {["GeoJSON", "KML", "Sync via API"].map(opt => (
            <label key={opt} className="inline-flex items-center mr-4">
              <input
                type="radio"
                name="export"
                value={opt}
                checked={exportFormat === opt}
                onChange={() => setExportFormat(opt)}
                className="form-radio h-4 w-4 text-teal-400 bg-teal-700"
              />
              <span className="ml-2 text-sm">{opt}</span>
            </label>
          ))}
        </fieldset>

        <button
          onClick={() => console.log("Allocating with", { droneId, altitude, sprayWidth, material, exportFormat })}
          className=" w-full bg-teal-600 hover:bg-teal-700 py-2 rounded text-white font-medium"
        >
          Allocate Spray
        </button>
      </div>
    </div>
  );
}
