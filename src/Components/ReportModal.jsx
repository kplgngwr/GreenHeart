// src/components/ReportModal.jsx
import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import axios from 'axios';

export default function ReportModal({ isOpen, onClose, previousCrop }) {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    async function fetchReport() {
      setLoading(true);
      setError(null);
      setReport(null);

      const payload = {
        nitrogen: 50,
        phosphorus: 30,
        potassium: 40,
        temperature: 25.0,
        soil_fertility: 'high',
        moisture: 35.0,
        season: 'summer',
        ndvi: 0.68,
        evi: 0.45,
        soil_ph: 6.5,
        rainfall_last_30_days: 120,
        groundwater_depth: 15.0,
        slope_degree: 5,
        market_price_per_quintal: 3500,
        crop_history: {
          previous_crop: previousCrop,
          yield_previous_season: 3.5,
        },
        region: 'Punjab',
        district: 'Mohali',
        irrigation_type: 'canal',
        expected_harvest_days: 110,
      };

      try {
        const response = await axios.post(
          'https://three-things-strive.loca.lt/api/v1/recommend-crops',
          payload
        );
        setReport(response.data);
        console.log("Report",response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch report');
      } finally {
        setLoading(false);
      }
    }

    fetchReport();
  }, [isOpen, previousCrop]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full p-6 shadow-lg">
          <Dialog.Title className="text-xl font-semibold mb-4">
            Crop Recommendation Report
          </Dialog.Title>

          {loading && <p className="text-center">Loading report…</p>}
          {error && <p className="text-red-500">{error}</p>}

          {report && (
            <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(report, null, 2)}
            </pre>
          )}

          <div className="mt-6 text-right">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
