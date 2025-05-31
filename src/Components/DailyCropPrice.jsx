import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { Dialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react'

const DailyCropPrice = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cropData, setCropData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const fetchCropPrices = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001cdc3b564546246a772a26393094f5645&offset=0&limit=100&format=json'
      )
      setCropData(response.data.records || [])
      setFilteredData(response.data.records || [])
    } catch (error) {
      console.error('Error fetching crop prices:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (open) {
      fetchCropPrices()
    }
  }, [open])

  useEffect(() => {
    if (searchTerm) {
      const filtered = cropData.filter(item => 
        item.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.market.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredData(filtered)
    } else {
      setFilteredData(cropData)
    }
  }, [searchTerm, cropData])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const [day, month, year] = dateString.split('/')
    return `${day}/${month}/${year}`
  }

  return (
    <div>
      <button 
        className="px-2 py-1  text-white rounded-md hover:bg-green-800 focus:outline-none "
        onClick={handleOpen}
      >
        View Daily Crop Prices
      </button>

      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-[80dvh] items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-teal-800 p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between items-center mb-4">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-white"
                    >
                      Daily Crop Prices
                    </Dialog.Title>
                    <button
                      type="button"
                      className="rounded-md p-1 hover:bg-gray-100 focus:outline-none"
                      onClick={handleClose}
                    >
                      <X className="h-5 w-5 text-white" />
                    </button>
                  </div>
                  
                  <div className="mb-4">
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 text-white rounded-md  "
                      placeholder="Search by commodity, state, district or market"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  {loading ? (
                    <div className="flex justify-center my-8">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-700"></div>
                    </div>
                  ) : (
                    <div className="  overflow-y-auto max-h-[75vh] rounded-2xl">
                      <table className="min-w-full divide-y divide-gray-200 ">
                        <thead className="bg-gray-50 " >
                          <tr >
                            <th scope="col" className="px-6 font-bold py-3 text-left text-sm  text-slate-800 uppercase tracking-wider">State</th>
                            <th scope="col" className="px-6 font-bold py-3 text-left text-sm  text-slate-800 uppercase tracking-wider">District</th>
                            <th scope="col" className="px-6 font-bold py-3 text-left text-sm  text-slate-800 uppercase tracking-wider">Market</th>
                            <th scope="col" className="px-6 font-bold py-3 text-left text-sm  text-slate-800 uppercase tracking-wider">Commodity</th>
                            <th scope="col" className="px-6 font-bold py-3 text-left text-sm  text-slate-800 uppercase tracking-wider">Variety</th>
                            <th scope="col" className="px-6 font-bold py-3 text-left text-sm  text-slate-800 uppercase tracking-wider">Grade</th>
                            <th scope="col" className="px-6 font-bold py-3 text-left text-sm  text-slate-800 uppercase tracking-wider">Arrival Date</th>
                            <th scope="col" className="px-6 font-bold py-3 text-left text-sm  text-slate-800 uppercase tracking-wider">Min Price (₹)</th>
                            <th scope="col" className="px-6 font-bold py-3 text-left text-sm  text-slate-800 uppercase tracking-wider">Max Price (₹)</th>
                            <th scope="col" className="px-6 font-bold py-3 text-left text-sm  text-slate-800 uppercase tracking-wider">Modal Price (₹)</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredData.length > 0 ? (
                            filteredData.map((item, index) => (
                              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.state}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.district}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.market}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.commodity}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.variety}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.grade}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(item.arrival_date)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.min_price}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.max_price}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.modal_price}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={10} className="px-6 py-4 text-center text-sm text-gray-500">
                                {cropData.length > 0 ? 'No matching results found' : 'No data available'}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default DailyCropPrice