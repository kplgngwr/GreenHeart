// src/Components/PriceVariationChart.jsx
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

// API constants
const API_KEY = '579b464db66ec23bdd0000011751bb9238f341af54e65303a5da5956'
const BASE_URL = 'https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24'

// NOTE: Replace with your actual Google Maps API key if needed.
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_KEY

export function PriceVariationChart() {
  // ── 1) Filters & pending from geolocation ─────────────────────────────────
  const [state, setState] = useState('Select State')
  const [district, setDistrict] = useState('Select District')
  const [commodity, setCommodity] = useState('Select Commodity')
  const [market, setMarket] = useState('Select Market')

  const [pendingState, setPendingState] = useState(null)
  const [pendingDistrict, setPendingDistrict] = useState(null)

  // ── 2) Dropdown lists ────────────────────────────────────────────────────────
  const [statesList, setStatesList] = useState([])
  const [districtsList, setDistrictsList] = useState([])
  const [commoditiesList, setCommoditiesList] = useState([])
  const [marketsList, setMarketsList] = useState([])

  // ── 3) Geolocation state ─────────────────────────────────────────────────────
  const [locationStatus, setLocationStatus] = useState('idle')
  // status: 'idle' | 'loading' | 'success' | 'error' | 'denied'
  const [locationMessage, setLocationMessage] = useState('')
  const [location, setLocation] = useState(null)

  // ── 4) Date window & chart data ─────────────────────────────────────────────
  const [last30Dates, setLast30Dates] = useState([])
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // ── 5) Build the last 30-day window (hardcoded "today" = 2025-05-30) ────────
  useEffect(() => {
    const today = dayjs('2025-05-30', 'YYYY-MM-DD')
    const dates = []
    for (let i = 0; i < 30; i++) {
      dates.push(today.subtract(i, 'day').format('DD/MM/YYYY'))
    }
    setLast30Dates(dates)
  }, [])

  // ── 6) Geolocation helpers ─────────────────────────────────────────────────
  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('error');
      setLocationMessage('Geolocation is not supported by your browser.');
      setLocation({ lat: 20.5937, lng: 78.9629 }); // fallback to India
      return;
    }
  
    setLocationStatus('loading');
    setLocationMessage('Detecting location...');
  
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        setLocationStatus('success');
        setLocationMessage(`Location detected: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
  
        // Reverse geocode to derive state & district names
        try {
          const geoRes = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
              latlng: `${latitude},${longitude}`,
              key: import.meta.env.VITE_GOOGLE_KEY,
            },
          });
  
          console.log(geoRes.data);
  
          if (Array.isArray(geoRes.data.results)) {
            let foundState = null;
            let foundDistrict = null;
  
            // Loop through results and find state and district
            for (const result of geoRes.data.results) {
              for (const component of result.address_components) {
                if (!foundState && component.types.includes('administrative_area_level_1')) {
                  foundState = component.long_name;
                }
                if (!foundDistrict && component.types.includes('administrative_area_level_2')) {
                  foundDistrict = component.long_name;
                }
                if (foundState && foundDistrict) break;
              }
              if (foundState && foundDistrict) break;
            }
  
            // Set pending filters only if they exist in the dropdown lists
            if (foundState && statesList.includes(foundState)) {
              setPendingState(foundState);
            }
            if (foundDistrict && districtsList.includes(foundDistrict)) {
              setPendingDistrict(foundDistrict);
            }
          }
        } catch (geoErr) {
          console.error('Reverse geocode error:', geoErr);
          // Continue without updating pendingState if reverse fails
        }
      },
      (err) => {
        setLocationStatus('denied');
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setLocationMessage('Location access denied. Using default location.');
            break;
          case err.POSITION_UNAVAILABLE:
            setLocationMessage('Location information unavailable. Using default location.');
            break;
          case err.TIMEOUT:
            setLocationMessage('Location request timed out. Using default location.');
            break;
          default:
            setLocationMessage('Unknown geolocation error. Using default location.');
        }
        setLocation({ lat: 20.5937, lng: 78.9629 });
      }
    );
  };
  



  const requestLocationAccess = async () => {
    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' })
      if (permission.state === 'granted' || permission.state === 'prompt') {
        getLocation()
      } else {
        setLocationStatus('denied')
        setLocationMessage('Location access denied. Using default location.')
        setLocation({ lat: 20.5937, lng: 78.9629 })
      }
    } catch (permErr) {
      console.error('Permissions API error:', permErr)
      setLocationStatus('error')
      setLocationMessage('Could not request location permission. Using default.')
      setLocation({ lat: 20.5937, lng: 78.9629 })
    }
  }

  // Request location on mount
  useEffect(() => {
    requestLocationAccess()
  }, [])

  // ── 7) Load the dropdown lists ───────────────────────────────────────────────

  // 7a) Fetch states
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}?api-key=${API_KEY}&format=json&limit=1000&distinct=State`
        )
        if (response.data && response.data.records) {
          const uniqueStates = [
            ...new Set(response.data.records.map((r) => r.State)),
          ]
            .filter((s) => s)
            .sort()
          setStatesList(uniqueStates)
        }
      } catch (err) {
        console.error('Error fetching states:', err)
      }
    }
    fetchStates()
  }, [])

  // Apply pendingState once statesList is loaded
  useEffect(() => {
    if (pendingState && statesList.includes(pendingState)) {
      setState(pendingState)
      setPendingState(null)
    }
  }, [statesList, pendingState])

  // 7b) Fetch districts whenever state changes
  useEffect(() => {
    if (!state) return
    const fetchDistricts = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}?api-key=${API_KEY}&format=json&limit=1000&filters[State]=${encodeURIComponent(
            state
          )}&distinct=District`
        )
        if (response.data && response.data.records) {
          const uniqueDistricts = [
            ...new Set(response.data.records.map((r) => r.District)),
          ]
            .filter((d) => d)
            .sort()
          setDistrictsList(uniqueDistricts)
        }
      } catch (err) {
        console.error('Error fetching districts:', err)
      }
    }
    fetchDistricts()
  }, [state])

  // When statesList is updated, apply pendingState if present
  useEffect(() => {
    if (pendingState && statesList.includes(pendingState)) {
      setState(pendingState);
      setPendingState(null);
    }
  }, [statesList, pendingState]);

  // When districtsList is updated, apply pendingDistrict if present
  useEffect(() => {
    if (pendingDistrict && districtsList.includes(pendingDistrict)) {
      setDistrict(pendingDistrict);
      setPendingDistrict(null);
    }
  }, [districtsList, pendingDistrict]);

  // Apply pendingDistrict or default district
  useEffect(() => {
    if (pendingDistrict && districtsList.includes(pendingDistrict)) {
      setDistrict(pendingDistrict)
      setPendingDistrict(null)
    } else if (!district && districtsList.length > 0) {
      setDistrict(districtsList[0])
    }
  }, [districtsList, pendingDistrict])

  // 7c) Fetch commodities whenever district changes
  useEffect(() => {
    if (!state || !district) return
    const fetchCommodities = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}?api-key=${API_KEY}&format=json&limit=1000&filters[State]=${encodeURIComponent(
            state
          )}&filters[District]=${encodeURIComponent(
            district
          )}&distinct=Commodity`
        )
        if (response.data && response.data.records) {
          const uniqueCommodities = [
            ...new Set(response.data.records.map((r) => r.Commodity)),
          ]
            .filter((c) => c)
            .sort()
          setCommoditiesList(uniqueCommodities)
        }
      } catch (err) {
        console.error('Error fetching commodities:', err)
      }
    }
    fetchCommodities()
  }, [state, district])

  // Default commodity if none selected
  useEffect(() => {
    if (!commodity && commoditiesList.length > 0) {
      setCommodity(commoditiesList[0])
    }
  }, [commoditiesList])

  // 7d) Fetch markets whenever commodity changes
  useEffect(() => {
    if (!state || !district || !commodity) return
    const fetchMarkets = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}?api-key=${API_KEY}&format=json&limit=1000&filters[State]=${encodeURIComponent(
            state
          )}&filters[District]=${encodeURIComponent(
            district
          )}&filters[Commodity]=${encodeURIComponent(
            commodity
          )}&distinct=Market`
        )
        if (response.data && response.data.records) {
          const uniqueMarkets = [
            ...new Set(response.data.records.map((r) => r.Market)),
          ]
            .filter((m) => m)
            .sort()
          setMarketsList(uniqueMarkets)
        }
      } catch (err) {
        console.error('Error fetching markets:', err)
      }
    }
    fetchMarkets()
  }, [state, district, commodity])

  // Default market if none selected
  useEffect(() => {
    if (!market && marketsList.length > 0) {
      setMarket(marketsList[0])
    }
  }, [marketsList])

  // ── 8) Fetch price data when user clicks “Search Price Data” ──────────────
  const fetchPriceData = async () => {
    if (last30Dates.length === 0 || !market) return

    setLoading(true)
    setError(null)

    try {
      const points = []
      let lastValidPrice = 0

      for (const arrivalDate of last30Dates) {
        const params = new URLSearchParams({
          'api-key': API_KEY,
          format: 'json',
          limit: '1',
          offset: '0',
          'filters[State]': state,
          'filters[District]': district,
          'filters[Commodity]': commodity,
          'filters[Arrival_Date]': arrivalDate,
          'filters[Market]': market,
        })

        const url = `${BASE_URL}?${params.toString()}`
        const res = await fetch(url)
        if (!res.ok) {
          throw new Error(`API returned ${res.status} for date ${arrivalDate}`)
        }

        const json = await res.json()
        if (json.count > 0) {
          const record = json.records[0]
          const priceNum = Number(record.Modal_Price)

          if (!isNaN(priceNum) && priceNum > 0) {
            lastValidPrice = priceNum
            points.push({
              date: arrivalDate,
              price: priceNum,
            })
          } else {
            points.push({
              date: arrivalDate,
              price: lastValidPrice,
            })
          }
        } else {
          points.push({
            date: arrivalDate,
            price: lastValidPrice,
          })
        }
      }

      setChartData(points.reverse()) // chronological (oldest first)
    } catch (err) {
      console.error(err)
      setError(err.message || 'Failed to fetch price data')
    } finally {
      setLoading(false)
    }
  }

  // ── 9) JSX ─────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-7xl  p-4 bg-teal-800 rounded-xl mt-4 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Crop Price Variation (₹/100 kg)</h2>

      {/* Location status message */}
      {/* {locationStatus !== 'idle' && (
        <div
          className={`mb-4 p-2 rounded ${locationStatus === 'loading'
              ? 'bg-blue-100 text-blue-800'
              : locationStatus === 'success'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
        >
          <p>{locationMessage}</p>
          {locationStatus === 'denied' && (
            <button
              onClick={requestLocationAccess}
              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Allow Location Access
            </button>
          )}
        </div>
      )} */}

      {/* Filters */}
      <div className="flex justify-between gap-4 mb-6 w-full">
        <div className="w-full">
          <label
            htmlFor="stateSelect"
            className="block text-sm font-medium text-white mb-1"
          >
            State:
          </label>
          <select
            id="stateSelect"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="mt-1 block w-full px-3 py-2 text-black border border-gray-300 bg-white rounded-md"
          >
            {statesList.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <label
            htmlFor="districtSelect"
            className="block text-sm font-medium text-white mb-1"
          >
            District:
          </label>
          <select
            id="districtSelect"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="mt-1 block w-full px-3 py-2 text-black border border-gray-300 bg-white rounded-md"
            disabled={districtsList.length === 0}
          >
            {districtsList.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <label
            htmlFor="commoditySelect"
            className="block text-sm font-medium text-white mb-1"
          >
            Commodity:
          </label>
          <select
            id="commoditySelect"
            value={commodity}
            onChange={(e) => setCommodity(e.target.value)}
            className="mt-1 block w-full px-3 py-2 text-black border border-gray-300 bg-white rounded-md"
            disabled={commoditiesList.length === 0}
          >
            {commoditiesList.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <label
            htmlFor="marketSelect"
            className="block text-sm font-medium text-white mb-1"
          >
            Market:
          </label>
          <select
            id="marketSelect"
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            className="mt-1 block w-full px-3 py-2 text-black border border-gray-300 bg-white rounded-md"
            disabled={marketsList.length === 0}
          >
            {marketsList.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full mt-6">
          <button
            onClick={fetchPriceData}
            disabled={loading || !market}
            className="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Search Price Data'}
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Loading spinner */}
      {loading && (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
        </div>
      )}

      {/* Chart */}
      {!loading && !error && chartData.length > 0 && (
        <div className="h-80 mt-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 15 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10 }}
                interval={2}
                label={{ value: 'Date', position: 'bottom', offset: 0 }}
              />
              <YAxis
                label={{
                  value: 'Price (₹)/100 KG',
                  angle: -90,
                  position: 'insideLeft',
                  offset: 5,
                }}
              />
              <Tooltip
                formatter={(value) => `₹${value}`}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
                label={({ x, y, value, index }) => (
                  <text
                    x={x}
                    y={y - 20}
                    fill="#3b82f6"
                    fontSize={10}
                    textAnchor="middle"
                  >
                    ₹{value}
                    <tspan x={x} dy="1.2em">
                      {chartData[index].date.split('/').slice(0, 2).join('/')}
                    </tspan>
                  </text>
                )}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* No data message */}
      {!loading && !error && chartData.length === 0 && market && (
        <div className="text-white text-center py-8">
          No price data available for the selected criteria.
        </div>
      )}
    </div>
  )
}
