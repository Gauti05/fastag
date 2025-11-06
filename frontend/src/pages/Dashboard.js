import React, { useState, useEffect } from 'react';
import API from '../api';
import StripeRechargeForm from '../components/Payment/StripeRechargeForm';
import RechargeHistory from '../components/Recharge/RechargeHistory';

const Dashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [recharges, setRecharges] = useState([]);

  useEffect(() => {
  
    API.get('/vehicles')
      .then(res => setVehicles(res.data))
      .catch(err => console.error('Error fetching vehicles:', err));

    API.get('/recharges')
      .then(res => setRecharges(res.data))
      .catch(err => console.error('Error fetching recharges:', err));
  }, []);

  const handleRechargeSuccess = (newRecharge) => {
    setRecharges(prev => [newRecharge, ...prev]);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <StripeRechargeForm vehicles={vehicles} onSuccess={handleRechargeSuccess} />
      <RechargeHistory recharges={recharges} />
    </div>
  );
};

export default Dashboard;
