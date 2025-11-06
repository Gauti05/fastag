import React from 'react';

const AboutUs = () => (
  <div
    className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
    style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/jean-philippe-delberghe-75xPHEQBmvA-unsplash.jpg)` }}
  >
    <div className="absolute inset-0 bg-black opacity-30"></div>
    <div className="relative bg-white bg-opacity-95 p-8 max-w-lg rounded-2xl shadow-2xl z-10">
      <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center">About Us</h2>
      <p className="text-gray-700 text-lg mb-4">
        FASTag Recharge App is dedicated to providing seamless and secure FASTag recharge and vehicle management services. Our platform leverages cutting-edge UI and real-time technology to make toll payments and account management easier than ever.
      </p>
      <p className="text-gray-700 text-lg">
        Built by passionate developers for users who value convenience, transparency, and reliability.
      </p>
    </div>
  </div>
);

export default AboutUs;
