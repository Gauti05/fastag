import React, { useState } from 'react';
import API from '../../api';

const RechargeForm = ({ vehicles, onRecharge }) => {
  const [vehicleId, setVehicleId] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!vehicleId || !amount) {
      setError('Please select a vehicle and enter an amount');
      return;
    }
    try {
      const { data } = await API.post('/recharges', { vehicleId, amount: Number(amount) });
      onRecharge(data);
      setError('');
      setSuccess('Recharge successful!');
      setAmount('');
      setVehicleId('');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Recharge failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md mt-8">
      <h3 className="text-xl font-semibold mb-4">Recharge FASTag</h3>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      {success && <p className="text-green-600 mb-3">{success}</p>}
      <select
        value={vehicleId}
        onChange={e => setVehicleId(e.target.value)}
        required
        className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="">Select Vehicle</option>
        {vehicles.map(v => (
          <option key={v._id} value={v._id}>{v.registrationNumber}</option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        min="10"
        required
        className="w-full p-3 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button type="submit" className="w-full bg-purple-600 text-white p-3 rounded-md hover:bg-purple-700 transition">
        Recharge
      </button>
    </form>
  );
};

export default RechargeForm;
