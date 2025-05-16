import React, { useState } from 'react';

const ConnectStationsModal = ({ isOpen, onClose }) => {
  const [provider, setProvider] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');

  const isFormValid = provider && apiKey && apiSecret;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-[#121212] p-6 rounded-lg w-[400px] max-w-full text-gray-200">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-right top-4 right-4 text-gray-400 text-2xl hover:text-gray-200"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        {/* Header label */}
        <div className="mb-6 text-center">
          <span className="bg-green-600 text-xs font-semibold px-3 py-1 rounded">
            CONNECT YOUR STATIONS FOR FREE
          </span>
        </div>

        {/* Weather station provider dropdown */}
        <select
          className="w-full bg-[#1e1e1e] rounded-md px-4 py-3 mb-4 focus:outline-none"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
        >
          <option value="" disabled>
            Weather station provider
          </option>
          <option value="provider1">Provider 1</option>
          <option value="provider2">Provider 2</option>
          <option value="provider3">Provider 3</option>
          {/* Add actual providers here */}
        </select>

        {/* API Key input */}
        <input
          type="text"
          placeholder="Enter API Key *"
          className="w-full bg-[#1e1e1e] rounded-md px-4 py-3 mb-4 text-gray-300 placeholder-gray-500 focus:outline-none"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />

        {/* API Secret input */}
        <input
          type="password"
          placeholder="Enter API Secret *"
          className="w-full bg-[#1e1e1e] rounded-md px-4 py-3 mb-4 text-gray-300 placeholder-gray-500 focus:outline-none"
          value={apiSecret}
          onChange={(e) => setApiSecret(e.target.value)}
        />

        {/* Link */}
        <div className="mb-6 text-sm">
          <a
            href="#"
            className="text-blue-500 hover:underline"
            onClick={(e) => e.preventDefault()} // Replace with actual link or logic
          >
            How to get the API credentials
          </a>
        </div>

        {/* Connect button */}
        <button
          disabled={!isFormValid}
          className={`w-full py-3 rounded-md font-semibold ${isFormValid
            ? 'bg-green-600 hover:bg-green-700 cursor-pointer'
            : 'bg-gray-700 cursor-not-allowed'
            } transition-colors`}
          onClick={() => alert('Connect clicked!')}
        >
          CONNECT
        </button>

        {/* Close modal (optional) */}

      </div>
    </div>
  );
};

export default ConnectStationsModal;
