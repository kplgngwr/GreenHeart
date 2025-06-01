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
  // ── 1) Filters ─────────────────────────────────
  const [state, setState] = useState('Select State')
  const [district, setDistrict] = useState('Select District')
  const [commodity, setCommodity] = useState('Select Commodity')
  const [market, setMarket] = useState('Select Market')

  // ── 2) Dropdown lists ────────────────────────────────────────────────────────
  const [statesList, setStatesList] = useState([])
  const [districtsList, setDistrictsList] = useState([])
  const [commoditiesList, setCommoditiesList] = useState([])
  const [marketsList, setMarketsList] = useState([])

  // ── 3) Date window & chart data ─────────────────────────────────────────────
  const [last30Dates, setLast30Dates] = useState([])
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // ── 4) Build the last 30-day window (hardcoded "today" = 2025-05-30) ────────
  useEffect(() => {
    const today = dayjs('2025-05-29', 'YYYY-MM-DD')
    const dates = []
    for (let i = 0; i < 30; i++) {
      dates.push(today.subtract(i, 'day').format('DD/MM/YYYY'))
    }
    setLast30Dates(dates)
  }, [])

  // ── 5) Load the dropdown lists ───────────────────────────────────────────────

  // 5a) Fetch states
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

  // 5b) Fetch districts whenever state changes
  useEffect(() => {
    if (!state || state === 'Select State') return
    const fetchDistricts = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}?api-key=${API_KEY}&format=json&limit=1000&filters[State]=${encodeURIComponent(
            state
          )}&distinct=District`
        )
        console.log(response.data)
        if (response.data && response.data.records) {
          const uniqueDistricts = [
            ...new Set(response.data.records.map((r) => r.District)),
          ]
            .filter((d) => d)
            .sort()
          setDistrictsList(uniqueDistricts)
          // Reset dependent dropdowns
          setDistrict('Select District')
          setCommodity('Select Commodity')
          setMarket('Select Market')
        }
      } catch (err) {
        console.error('Error fetching districts:', err)
      }
    }
    fetchDistricts()
  }, [state])

  // 5c) Fetch commodities whenever district changes
  useEffect(() => {
    if (!state || state === 'Select State' || !district || district === 'Select District') return
    const fetchCommodities = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}?api-key=${API_KEY}&format=json&limit=1000&filters[State]=${encodeURIComponent(
            state
          )}&filters[District]=${encodeURIComponent(
            district
          )}&distinct=Commodity`
        )
        console.log(response.data)
        if (response.data && response.data.records) {
          const uniqueCommodities = [
            ...new Set(response.data.records.map((r) => r.Commodity)),
          ]
            .filter((c) => c)
            .sort()
          setCommoditiesList(uniqueCommodities)
          // Reset dependent dropdowns
          setCommodity('Select Commodity')
          setMarket('Select Market')
        }
      } catch (err) {
        console.error('Error fetching commodities:', err)
      }
    }
    fetchCommodities()
  }, [state, district])

  // 5d) Fetch markets whenever commodity changes
  useEffect(() => {
    if (!state || state === 'Select State' || 
        !district || district === 'Select District' || 
        !commodity || commodity === 'Select Commodity') return
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
          // Reset dependent dropdown
          setMarket('Select Market')
        }
      } catch (err) {
        console.error('Error fetching markets:', err)
      }
    }
    fetchMarkets()
  }, [state, district, commodity])

  // ── 6) Fetch price data when user clicks "Search Price Data" ──────────────
  const fetchPriceData = async () => {
    if (last30Dates.length === 0 || 
        !market || market === 'Select Market' ||
        !state || state === 'Select State' ||
        !district || district === 'Select District' ||
        !commodity || commodity === 'Select Commodity') return
    
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

  // ── 7) JSX ─────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-7xl p-4 bg-teal-800 rounded-xl mt-4 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Crop Past Prices In Various Market (₹/100 kg)</h2>
      
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
            <option value="Select State">Select State</option>
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
            disabled={districtsList.length === 0 || state === 'Select State'}
          >
            <option value="Select District">Select District</option>
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
            disabled={commoditiesList.length === 0 || district === 'Select District'}
          >
            <option value="Select Commodity">Select Commodity</option>
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
            disabled={marketsList.length === 0 || commodity === 'Select Commodity'}
          >
            <option value="Select Market">Select Market</option>
            {marketsList.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Button */}
      <div className="flex justify-center mt-4 mb-6">
        <button
          onClick={fetchPriceData}
          disabled={loading || !market || market === 'Select Market'}
          className={`px-6 py-2 rounded-md ${
            loading || !market || market === 'Select Market'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-teal-500 hover:bg-teal-600'
          } text-white font-medium transition-colors`}
        >
          {loading ? 'Loading...' : 'Search Price Data'}
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
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
              <CartesianGrid strokeDasharray="3 3" stroke="white" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 14, fill: 'white' }}
                interval={2}
                tickLine={{ stroke: 'white' }}
                axisLine={{ stroke: 'white' }}
              />
              <YAxis
                tick={{ fontSize: 14, fill: 'white' }}
                tickLine={{ stroke: 'white' }}
                axisLine={{ stroke: 'white' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '4px',
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#4ade80"
                strokeWidth={2}
                dot={{ fill: '#4ade80', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {!loading && !error && chartData.length === 0 && market && (
        <div className="text-white text-center py-8">
          No price data available for the selected criteria.
        </div>
      )}
    </div>
  )
}