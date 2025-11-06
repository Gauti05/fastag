import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api';
import { AuthContext } from '../../context/AuthContext';

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/register', { name, email, password });
      login(data.token);
      setError('');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/jean-philippe-delberghe-75xPHEQBmvA-unsplash.jpg)` }}
    >
     
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <form
        onSubmit={handleSubmit}
        className="relative bg-white bg-opacity-95 p-10 rounded-3xl shadow-lg max-w-md w-full z-10
                   transition-transform transform hover:scale-[1.03] duration-300"
      >
        <h2 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-tr from-green-600 to-teal-600 bg-clip-text text-transparent">
          Register
        </h2>

        {error && <p className="text-red-600 mb-6 text-center font-semibold">{error}</p>}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="w-full p-4 mb-6 border border-gray-300 rounded-2xl shadow-sm 
                     focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full p-4 mb-6 border border-gray-300 rounded-2xl shadow-sm 
                     focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full p-4 mb-8 border border-gray-300 rounded-2xl shadow-sm 
                     focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 rounded-3xl
                     font-semibold hover:from-teal-700 hover:to-green-700 shadow-lg transition-all duration-300
                     active:scale-95"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;




