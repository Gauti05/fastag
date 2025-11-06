import React, { useState } from 'react';
import API from '../api'; 

const ContactUs = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [messageSent, setMessageSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setMessageSent(false);
    try {
      await API.post('/contact', form);
      setMessageSent(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/jean-philippe-delberghe-75xPHEQBmvA-unsplash.jpg)` }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <form
        onSubmit={handleSubmit}
        className="relative bg-white bg-opacity-95 p-8 max-w-lg rounded-2xl shadow-2xl z-10"
      >
        <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center">Contact Us</h2>
        {messageSent ? (
          <div className="text-green-700 text-lg mb-4">Your message has been sent!</div>
        ) : (
          <>
            {error && <div className="text-red-600 text-lg mb-4">{error}</div>}
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              rows="4"
              required
              className="w-full p-3 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-600 active:scale-95 transition-transform"
            >
              Submit
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ContactUs;
