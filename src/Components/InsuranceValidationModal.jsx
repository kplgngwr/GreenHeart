import React, { useState } from 'react';

const crops = ['Maize', 'Wheat', 'Rice', 'Soybean'];
const sownDates = ['10 May 25', '11 May 25', '12 May 25'];
const insuranceTypes = [
  'Pradhan Mantri Fasal Bima Yojana',
  'Weather-Based Crop Insurance Scheme',
  'Restructured Weather-Based Crop Insurance Scheme'
];

export default function InsuranceValidationModal({ isOpen, onClose, onValidate }) {
  const [crop, setCrop] = useState(crops[0]);
  const [landmark, setLandmark] = useState('');
  const [area, setArea] = useState('');
  const [sownDate, setSownDate] = useState(sownDates[0]);
  const [insuranceType, setInsuranceType] = useState(insuranceTypes[0]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onValidate({ crop, landmark, area, sownDate, insuranceType });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 bg-opacity-50">
      <div className="bg-teal-800 rounded-lg shadow-lg w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-medium">Insurance Validation</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          {/* Crop */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Crop
            </label>
            <select
              className="w-full border bg-teal-800 rounded px-3 py-2 focus:outline-none focus:ring"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
            >
              {crops.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Landmark */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Landmark
            </label>
            <input
              type="text"
              className="w-full border bg-teal-800 text-white rounded px-3 py-2 focus:outline-none focus:ring"
              placeholder="Landmark I"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              required
            />
          </div>

          {/* Area */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Area
            </label>
            <input
              type="text"
              className="w-full border bg-teal-800 text-white rounded px-3 py-2 focus:outline-none focus:ring"
              placeholder="10 acres"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              required
            />
          </div>

          {/* Sown Date */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Sown Date
            </label>
            <select
              className="w-full border bg-teal-800 text-white rounded px-3 py-2 focus:outline-none focus:ring"
              value={sownDate}
              onChange={(e) => setSownDate(e.target.value)}
            >
              {sownDates.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Insurance Type */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Insurance Type
            </label>
            <select
              className="w-full border bg-teal-800 text-white rounded px-3 py-2 focus:outline-none focus:ring"
              value={insuranceType}
              onChange={(e) => setInsuranceType(e.target.value)}
            >
              {insuranceTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3  ">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border rounded text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Validate insurance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
