import React from 'react';

const RechargeHistory = ({ recharges }) => {
  return (
    <div className="max-w-4xl mx-auto mt-10 px-3">
      <h3 className="text-xl font-semibold mb-4">Recharge History</h3>
      {recharges.length === 0 ? (
        <p>No recharge history available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-md shadow-md">
            <thead>
              <tr className="bg-purple-600 text-white">
                <th className="py-3 px-6 text-left">Vehicle</th>
                <th className="py-3 px-6 text-left">Amount</th>
                <th className="py-3 px-6 text-left">Transaction ID</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {recharges.map((r) => (
                <tr key={r._id} className="border-b last:border-b-0">
                  <td className="py-3 px-6">
                    {r.vehicle?.registrationNumber || 'N/A'}
                  </td>
                  <td className="py-3 px-6">{r.amount}</td>
                  <td className="py-3 px-6">{r.transactionId}</td>
                  <td
                    className={`py-3 px-6 font-semibold ${
                      r.paymentStatus === 'Success'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {r.paymentStatus}
                  </td>
                  <td className="py-3 px-6">
                    {new Date(r.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RechargeHistory;

