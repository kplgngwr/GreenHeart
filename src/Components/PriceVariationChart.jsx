// src/Components/PriceVariationChart.jsx
import React, { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import dayjs from 'dayjs'
import axios from 'axios'

// API constants
const API_KEY = '579b464db66ec23bdd0000011751bb9238f341af54e65303a5da5956'
const BASE_URL = 'https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24'

export function PriceVariationChart() {
  // State for location and filters
  const [state, setState] = useState('Haryana')
  const [district, setDistrict] = useState('Ambala')
  const [commodity, setCommodity] = useState('Apple')
  const [market, setMarket] = useState('')
  
  // Lists for dropdowns
  const [statesList, setStatesList] = useState([])
  const [districtsList, setDistrictsList] = useState([])
  const [commoditiesList, setCommoditiesList] = useState([])
  const [marketsList, setMarketsList] = useState([])
  
  // Location status
  const [locationStatus, setLocationStatus] = useState('idle') // idle, loading, success, error, denied
  const [locationMessage, setLocationMessage] = useState('')
  
  // Chart data
  const [last30Dates, setLast30Dates] = useState([])
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Build a 30-day sliding window (fixed "today" = 2025-05-31)
  useEffect(() => {
    const today = dayjs('2025-05-30', 'YYYY-MM-DD')
    const dates = []
    for (let i = 0; i < 30; i++) {
      dates.push(today.subtract(i, 'day').format('DD/MM/YYYY'))
    }
    setLast30Dates(dates)
  }, [])

  // Fetch states list on component mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(
          `https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24?api-key=${API_KEY}&format=json&limit=1000&distinct=State`
        )
        if (response.data && response.data.records) {
          const uniqueStates = [...new Set(response.data.records.map(record => record.State))]
            .filter(state => state) // Remove empty values
            .sort()
          setStatesList(uniqueStates)
        }
      } catch (error) {
        console.error('Error fetching states:', error)
      }
    }
    
    fetchStates()
    // Try to get user location automatically
    getUserLocation()
  }, [])

  // Fetch districts when state changes
  useEffect(() => {
    if (!state) return
    
    const fetchDistricts = async () => {
      try {
        const response = await axios.get(
          `https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24?api-key=${API_KEY}&format=json&limit=1000&filters[State]=${state}&distinct=District`
        )
        if (response.data && response.data.records) {
          const uniqueDistricts = [...new Set(response.data.records.map(record => record.District))]
            .filter(district => district) // Remove empty values
            .sort()
          setDistrictsList(uniqueDistricts)
          if (uniqueDistricts.length > 0 && !uniqueDistricts.includes(district)) {
            setDistrict(uniqueDistricts[0])
          }
        }
      } catch (error) {
        console.error('Error fetching districts:', error)
      }
    }
    
    fetchDistricts()
  }, [state])

  // Fetch commodities when district changes
  useEffect(() => {
    if (!state || !district) return
    
    const fetchCommodities = async () => {
      try {
        const response = await axios.get(
          `https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24?api-key=${API_KEY}&format=json&limit=1000&filters[State]=${state}&filters[District]=${district}&distinct=Commodity`
        )
        if (response.data && response.data.records) {
          const uniqueCommodities = [...new Set(response.data.records.map(record => record.Commodity))]
            .filter(commodity => commodity) // Remove empty values
            .sort()
          setCommoditiesList(uniqueCommodities)
          if (uniqueCommodities.length > 0 && !uniqueCommodities.includes(commodity)) {
            setCommodity(uniqueCommodities[0])
          }
        }
      } catch (error) {
        console.error('Error fetching commodities:', error)
      }
    }
    
    fetchCommodities()
  }, [state, district])

  // Fetch markets when commodity changes
  useEffect(() => {
    if (!state || !district || !commodity) return
    
    const fetchMarkets = async () => {
      try {
        const response = await axios.get(
          `https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24?api-key=${API_KEY}&format=json&limit=1000&filters[State]=${state}&filters[District]=${district}&filters[Commodity]=${commodity}&distinct=Market`
        )
        if (response.data && response.data.records) {
          const uniqueMarkets = [...new Set(response.data.records.map(record => record.Market))]
            .filter(market => market) // Remove empty values
            .sort()
          setMarketsList(uniqueMarkets)
          if (uniqueMarkets.length > 0 && market === '') {
            setMarket(uniqueMarkets[0])
          }
        }
      } catch (error) {
        console.error('Error fetching markets:', error)
      }
    }
    
    fetchMarkets()
  }, [state, district, commodity])

  // Get user location
  const getUserLocation = () => {
    setLocationStatus('loading')
    setLocationMessage('Detecting your location...')
    
    if (!navigator.geolocation) {
      setLocationStatus('error')
      setLocationMessage('Geolocation is not supported by your browser')
      return
    }
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          setLocationMessage(`Location found: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`)
          
          // Reverse geocoding to get state and district
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDLQxMCWgu1lP7aXlzFpuVxVg1-Cn5AcT4&result_type=administrative_area_level_1|administrative_area_level_2`
          )
          
          if (response.data.results && response.data.results.length > 0) {
            let foundState = null
            let foundDistrict = null
            
            response.data.results.forEach(result => {
              result.address_components.forEach(component => {
                if (component.types.includes('administrative_area_level_1')) {
                  foundState = component.long_name
                }
                if (component.types.includes('administrative_area_level_2')) {
                  foundDistrict = component.long_name
                }
              })
            })
            
            if (foundState && statesList.includes(foundState)) {
              setState(foundState)
              setLocationStatus('success')
              setLocationMessage(`Location set to ${foundState}${foundDistrict ? `, ${foundDistrict}` : ''}`)
            } else {
              setLocationStatus('error')
              setLocationMessage('Your location is not available in our database')
            }
          } else {
            setLocationStatus('error')
            setLocationMessage('Could not determine your location')
          }
        } catch (error) {
          console.error('Error with geocoding:', error)
          setLocationStatus('error')
          setLocationMessage('Error determining your location')
        }
      },
      (error) => {
        setLocationStatus('denied')
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setLocationMessage('Location access denied. Please enable location services.')
            break
          case error.POSITION_UNAVAILABLE:
            setLocationMessage('Location information is unavailable')
            break
          case error.TIMEOUT:
            setLocationMessage('Location request timed out')
            break
          default:
            setLocationMessage('An unknown error occurred')
        }
      }
    )
  }

// Fetch price data when search button is clicked
const fetchPriceData = async () => {
  if (last30Dates.length === 0 || !market) return
  
  setLoading(true)
  setError(null)

  try {
    const points = []
    let lastValidPrice = 0; // Track the last valid price

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
          // Valid price found, update lastValidPrice
          lastValidPrice = priceNum;
          points.push({
            date: arrivalDate,
            price: priceNum,
          })
        } else {
          // Use last valid price if current price is zero or invalid
          points.push({
            date: arrivalDate,
            price: lastValidPrice,
          })
        }
      } else {
        // No data for this date, use last valid price
        points.push({
          date: arrivalDate,
          price: lastValidPrice,
        })
      }
    }

    // Reverse for chronological order (oldest first)
    setChartData(points.reverse())
  } catch (err) {
    console.error(err)
    setError(err.message || 'Failed to fetch price data')
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        Crop Price Variation (₹/100 kg)
      </h2>
      
      {/* Location status message */}
      {locationStatus !== 'idle' && (
        <div className={`mb-4 p-2 rounded ${
          locationStatus === 'loading' ? 'bg-blue-100 text-blue-800' : 
          locationStatus === 'success' ? 'bg-green-100 text-green-800' : 
          'bg-yellow-100 text-yellow-800'
        }`}>
          <p>{locationMessage}</p>
          {locationStatus === 'denied' && (
            <button 
              onClick={getUserLocation}
              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Allow Location Access
            </button>
          )}
        </div>
      )}
      
      {/* Filter selectors */}
      <div className="flex gap-4 mb-6">
        <div>
          <label htmlFor="stateSelect" className="block text-sm font-medium text-gray-700 mb-1">
            State:
          </label>
          <select
            id="stateSelect"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="mt-1 block w-full px-3 py-2 text-black border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {statesList.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="districtSelect" className="block text-sm font-medium text-gray-700 mb-1">
            District:
          </label>
          <select
            id="districtSelect"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="mt-1 block w-full px-3 py-2 text-black border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            disabled={districtsList.length === 0}
          >
            {districtsList.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="commoditySelect" className="block text-sm font-medium text-gray-700 mb-1">
            Commodity:
          </label>
          <select
            id="commoditySelect"
            value={commodity}
            onChange={(e) => setCommodity(e.target.value)}
            className="mt-1 block w-full px-3 py-2 text-black border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            disabled={commoditiesList.length === 0}
          >
            {commoditiesList.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="marketSelect" className="block text-sm font-medium text-gray-700 mb-1">
            Market:
          </label>
          <select
            id="marketSelect"
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            className="mt-1 block w-full px-3 py-2 text-black border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            disabled={marketsList.length === 0}
          >
            {marketsList.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        {/* Search button */}
      <div className="flex justify-center mt-6 ">
        <button
          onClick={fetchPriceData}
          className="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={loading || !market}
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

      {/* Loading indicator */}
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
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 15,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{fontSize: 10}} interval={2} label={{ value: "Date", position: "bottom", offset: 0 }} />
              <YAxis label={{ value: "Price (₹)/100KG", angle: 90, position: "left", offset: 5 }} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
                label={({ x, y, value, index }) => (
                  <text x={x} y={y - 20} fill="#3b82f6" fontSize={10} textAnchor="middle">
                    ₹{value}
                    <tspan x={x} dy="4em">{chartData[index].date.split('/').slice(0, 2).join('/')}</tspan>
                  </text>
                )}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* No data */}
      {!loading && !error && chartData.length === 0 && market && (
        <div className="text-gray-600 text-center py-8">No price data available for the selected criteria.</div>
      )}
    </div>
  )
}