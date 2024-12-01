import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; 
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-500'>
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          <div className='flex items-center flex-shrink-0'>
            <h1 className='font-bold text-white'>Cric-it</h1>
          </div>
          <div className='hidden md:flex space-x-12'>
            <NavLink
              className={({ isActive }) =>
                `font-semibold transition duration-300 ${
                  isActive ? 'text-white' : 'text-gray-300'
                }`
              }
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `font-semibold transition duration-300 ${
                  isActive ? 'text-white' : 'text-gray-300'
                }`
              }
              to="/quick-match"
            >
              Quick-Match
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `font-semibold transition duration-300 ${
                  isActive ? 'text-white' : 'text-gray-300'
                }`
              }
              to="/tournament"
            >
              Tournament
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `font-semibold transition duration-300 ${
                  isActive ? 'text-white' : 'text-gray-300'
                }`
              }
              to="/about"
            >
              About
            </NavLink>
          </div>
          <div className="hidden md:block relative">
            <button className='bg-gradient-to-r from-blue-800 to-blue-500 px-3 py-2 rounded-lg text-white font-semibold' onClick={handleDropdownToggle}>Get Started</button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded">
                <button 
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate('/tournament');
                  }}
                >
                  Tournament
                </button>
                <button 
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate('/quick-match');
                  }}
                >
                  Quick Match
                </button>
                <button 
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate('/login'); // Assuming you have a login route
                  }}
                >
                  Login
                </button>
                <button 
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate('/signup'); // Assuming you have a signup route
                  }}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={handleMenuToggle} className="text-white focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <NavLink
              className={({ isActive }) =>
                `block font-semibold transition duration-300 ${
                  isActive ? 'text-gray-300' : 'text-white'
                }`
              }
              to="/"
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `block font-semibold transition duration-300 ${
                  isActive ? 'text-gray-300' : 'text-white'
                }`
              }
              to="/quick-match"
              onClick={() => setIsOpen(false)}
            >
              Quick-Match
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `block font-semibold transition duration-300 ${
                  isActive ? 'text-gray-300' : 'text-white'
                }`
              }
              to="/tournament"
              onClick={() => setIsOpen(false)}
            >
              Tournament
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `block font-semibold transition duration-300 ${
                  isActive ? 'text-gray-300' : 'text-white'
                }`
              }
              to="/contact"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </NavLink>
            <button 
              className="block w-full bg-white text-black font-semibold px-3 py-2 rounded-lg mt-2"
              onClick={() => {
                setIsOpen(false);
                handleDropdownToggle();
              }}
            >
              Get Started
            </button>
            {dropdownOpen && (
              <div className="mt-2 space-y-2 bg-white text-black shadow-md rounded px-4 py-2">
                <button 
                  className="block w-full text-gray-800 hover:bg-gray-200"
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate('/tournament');
                  }}
                >
                  Tournament
                </button>
                <button 
                  className="block w-full text-gray-800 hover:bg-gray-200"
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate('/quick-match');
                  }}
                >
                  Quick Match
                </button>
                <button 
                  className="block w-full text-gray-800 hover:bg-gray-200"
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate('/login'); // Assuming you have a login route
                  }}
                >
                  Login
                </button>
                <button 
                  className="block w-full text-gray-800 hover:bg-gray-200"
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate('/signup'); // Assuming you have a signup route
                  }}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
