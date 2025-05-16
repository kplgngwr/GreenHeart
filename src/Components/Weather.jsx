import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const API_KEY = "LHJ4SZE9R5RK8XNR683TBU3XF"; // Replace with your Visual Crossing API key
const LOCATION = "Rurkee Pukhta,Punjab";         // Replace with your location (city, state, country)

const Weather = ({ isOpen, onClose }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch weather data from Visual Crossing Timeline API
  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
        LOCATION
      )}?unitGroup=metric&key=${API_KEY}&contentType=json`;
      const response = await axios.get(url);
      console.log(response.data);
      setWeatherData(response.data);
    } catch (err) {
      setError("Failed to fetch weather data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchWeather();
    }
  }, [isOpen]);

  if (loading) return <div className="p-6 text-center text-white">Loading weather data...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!weatherData) return null;

  const current = weatherData.currentConditions;

  // Prepare daily data for charts and table
  const dailyData = weatherData.days.map((day) => ({
    date: day.datetime,
    tempmax: day.tempmax,
    tempmin: day.tempmin,
    humidity: day.humidity,
    precip: day.precip,
    windspeed: day.windspeed,
    uvindex: day.uvindex,
  }));
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative max-w-7xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-green-800 text-white rounded-full p-2 hover:bg-gray-700 z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Weather content */}
        <div className="bg-teal-800 rounded-lg shadow-xl text-white overflow-hidden">
          {loading ? (
            <div className="p-6 text-center text-white">Loading weather data...</div>
          ) : error ? (
            <div className="p-6 text-center text-red-500">{error}</div>
          ) : !weatherData ? (
            <div className="p-6 text-center text-white">No weather data available</div>
          ) : (
            <div className="p-6 space-y-8">
              <h1 className="text-3xl font-bold mb-4">{weatherData.address}</h1>

              {/* Current Conditions */}
              <section className="bg-teal-700 p-4 rounded-md shadow-md">
                <h2 className="text-2xl mb-4 font-semibold">Current Conditions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div><strong>Temperature:</strong> {weatherData.currentConditions.temp} °C</div>
                  <div><strong>Feels Like:</strong> {weatherData.currentConditions.feelslike} °C</div>
                  <div><strong>Humidity:</strong> {weatherData.currentConditions.humidity} %</div>
                  <div><strong>Wind Speed:</strong> {weatherData.currentConditions.windspeed} km/h</div>
                  <div><strong>UV Index:</strong> {weatherData.currentConditions.uvindex}</div>
                  <div><strong>Pressure:</strong> {weatherData.currentConditions.pressure} hPa</div>
                  <div><strong>Cloud Cover:</strong> {weatherData.currentConditions.cloudcover} %</div>
                  <div><strong>Conditions:</strong> {weatherData.currentConditions.conditions}</div>
                </div>
              </section>

              {/* Charts */}
              <section className="space-y-10">
                <h2 className="text-2xl font-semibold">Weather Charts</h2>

                {/* Temperature Chart */}
                <div className="bg-teal-700 p-4 rounded shadow">
                  <h3 className="mb-2 font-semibold">Temperature (Max & Min)</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dailyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} >
                      <CartesianGrid stroke="#0c0a09" strokeDasharray="3 3" />
                      <XAxis dataKey="date" stroke="#0c0a09" />
                      <YAxis stroke="#0c0a09" />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="tempmax"
                        stroke="#f87171"
                        name="Max Temp (°C)"
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="tempmin"
                        stroke="#60a5fa"
                        name="Min Temp (°C)"
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Humidity Chart */}
                <div className="bg-teal-700 p-4 rounded shadow">
                  <h3 className="mb-2 font-semibold">Humidity (%)</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={dailyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid stroke="#0c0a09" strokeDasharray="3 3" />
                      <XAxis dataKey="date" stroke="#0c0a09" />
                      <YAxis domain={[0, 100]} stroke="#0c0a09" />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="humidity"
                        stroke="#60a5fa"
                        name="Humidity (%)"
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Precipitation Chart */}
                <div className="bg-teal-700 p-4 rounded shadow">
                  <h3 className="mb-2 font-semibold">Precipitation (mm)</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={dailyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid  stroke="#0c0a09" strokeDasharray="3 3" />
                      <XAxis dataKey="date" stroke="#0c0a09" />
                      <YAxis stroke="#0c0a09" />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="precip"
                        stroke="#10b981"
                        name="Precipitation (mm)"
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </section>

              {/* Daily Forecast Table */}
              <section className="overflow-x-auto">
                <h2 className="text-2xl font-semibold mb-4">Daily Forecast</h2>
                <table className="w-full table-auto border-collapse border border-teal-700">
                  <thead>
                    <tr className="bg-teal-700 text-left">
                      {[
                        "Date",
                        "Max Temp (°C)",
                        "Min Temp (°C)",
                        "Humidity (%)",
                        "Precipitation (mm)",
                        "Wind Speed (km/h)",
                        "UV Index",
                        "Conditions",
                      ].map((header) => (
                        <th key={header} className="border border-gray-700 px-3 py-2">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {weatherData.days.map((day) => (
                      <tr key={day.datetime} className="even:bg-teal-700 odd:bg-teal-800">
                        <td className="border border-teal-700 px-3 py-1">{day.datetime}</td>
                        <td className="border border-teal-700 px-3 py-1">{day.tempmax}</td>
                        <td className="border border-teal-700 px-3 py-1">{day.tempmin}</td>
                        <td className="border border-teal-700 px-3 py-1">{day.humidity}</td>
                        <td className="border border-teal-700 px-3 py-1">{day.precip}</td>
                        <td className="border border-gray-700 px-3 py-1">{day.windspeed}</td>
                        <td className="border border-gray-700 px-3 py-1">{day.uvindex}</td>
                        <td className="border border-gray-700 px-3 py-1">{day.conditions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
