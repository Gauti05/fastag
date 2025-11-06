import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex items-center shadow-lg">
    
      <img
        src={`${process.env.PUBLIC_URL}/logo192.png`}
        alt="FASTag Logo"
        className="h-8 w-8 mr-3"
      />
      <Link to="/" className="font-bold text-xl mr-6">
        FASTag Recharge
      </Link>

   
      {!user && !isLoginPage && (
        <Link to="/login" className="mr-4 hover:underline">
          Login
        </Link>
      )}
      {!user && !isRegisterPage && (
        <Link to="/register" className="mr-4 hover:underline">
          Register
        </Link>
      )}
      <Link to="/about" className="mr-4 hover:underline">
        About Us
      </Link>
      <Link to="/contact" className="mr-4 hover:underline">
        Contact Us
      </Link>

     
      {user && (
        <div className="ml-auto">
          <Link to="/dashboard" className="mr-4 hover:underline">
            Dashboard
          </Link>
          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 ml-2"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

