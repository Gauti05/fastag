import React from 'react';

const VehicleList = ({ vehicles }) => {
  return (
    <div className="max-w-md mx-auto mt-6">
      <h3 className="text-xl font-semibold mb-3">Your Vehicles</h3>
      {vehicles.length === 0 && <p>No vehicles added yet.</p>}
      <ul className="list-disc list-inside">
        {vehicles.map(v => (
          <li key={v._id} className="mb-2">{v.registrationNumber} - {v.fastagId}</li>
        ))}
      </ul>
    </div>
  );
};

export default VehicleList;
