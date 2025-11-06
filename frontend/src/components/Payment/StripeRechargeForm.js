import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import API from '../../api';
import { useNavigate } from 'react-router-dom';

const StripeRechargeForm = ({ vehicles }) => {
  const [vehicleId, setVehicleId] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (!stripe || !elements) {
      setError('Stripe.js has not loaded yet. Please try again.');
      return;
    }

    if (!vehicleId || !amount) {
      setError('Please select a vehicle and enter a valid amount.');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError('Payment form is unavailable. Please refresh the page.');
      return;
    }

    setProcessing(true);

    try {
      const { data } = await API.post('/payments/create-payment-intent', {
        vehicleId,
        amount: Number(amount),
      });

      
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        setError(result.error.message || 'Payment failed. Please try another card.');
        setProcessing(false);
        return;
      }

      if (result.paymentIntent.status === 'succeeded') {
      
        await API.post('/payments/confirm-payment', {
          vehicleId,
          amount: Number(amount),
          paymentIntentId: result.paymentIntent.id,
        });

        setSuccess('Recharge successful!');
        setProcessing(false);

        // Redirect user or reset form
        navigate('/dashboard');
      } else {
        setError('Payment did not succeed. Please try again.');
        setProcessing(false);
      }
    } catch (err) {
      console.error('Payment processing error:', err);
      setError('An unexpected error occurred. Please try again.');
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md mt-8">
      <h3 className="text-xl font-semibold mb-6">Recharge FASTag</h3>

      {error && <p aria-live="assertive" className="text-red-600 mb-4">{error}</p>}
      {success && <p aria-live="polite" className="text-green-600 mb-4">{success}</p>}

      <label htmlFor="vehicle-select" className="block mb-1 font-medium">
        Select Vehicle
      </label>
      <select
        id="vehicle-select"
        value={vehicleId}
        onChange={(e) => setVehicleId(e.target.value)}
        required
        className="w-full p-3 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        disabled={processing}
      >
        <option value="" disabled>
          -- Select Vehicle --
        </option>
        {vehicles.map((v) => (
          <option key={v._id} value={v._id}>
            {v.registrationNumber}
          </option>
        ))}
      </select>

      <label htmlFor="amount-input" className="block mb-1 font-medium">
        Amount (₹)
      </label>
      <input
        id="amount-input"
        type="number"
        placeholder="Enter amount"
        min="10"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        className="w-full p-3 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        disabled={processing}
      />

      <label className="block mb-1 font-medium" htmlFor="card-element">
        Card Details
      </label>
      <div
        id="card-element"
        className="p-3 mb-6 border rounded shadow-sm"
        style={{ background: '#fafafa' }}
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>

      <button
        type="submit"
        disabled={processing || !stripe}
        className={`w-full py-3 rounded-md text-white ${
          processing ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
        }`}
      >
        {processing ? 'Processing...' : `Pay & Recharge ₹${amount || ''}`}
      </button>
    </form>
  );
};

export default StripeRechargeForm;
