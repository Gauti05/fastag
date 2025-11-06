import React, { useState } from 'react';
import API from '../../api';

const VehicleForm = ({ onAdd }) => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [fastagId, setFastagId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await API.post('/vehicles', { registrationNumber: registrationNumber.toUpperCase(), fastagId });
      onAdd(data);
      setRegistrationNumber('');
      setFastagId('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add vehicle');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md mt-8">
      <h3 className="text-xl font-semibold mb-4">Add Vehicle</h3>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <input
        placeholder="Registration Number"
        value={registrationNumber}
        onChange={e => setRegistrationNumber(e.target.value)}
        required
        className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        placeholder="FASTag ID"
        value={fastagId}
        onChange={e => setFastagId(e.target.value)}
        required
        className="w-full p-3 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition">
        Add Vehicle
      </button>
    </form>
  );
};

export default VehicleForm;
