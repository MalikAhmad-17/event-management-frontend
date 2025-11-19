import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-primary py-4 font-poppins z-50 shadow-md">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/user" className="flex items-center text-text-light font-normal text-xl hover:opacity-80 transition-opacity cursor-pointer">
          <Icon />
          <span className="ml-2">EventHub</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/browse" className="text-text-light hover:text-accent px-3 py-2 rounded-md text-xs font-medium">Browse Events</Link>
          <div className="flex items-center text-white px-3 py-1 rounded-md text-2xs border border-white hover:bg-white hover:text-text-dark">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            jenish112005
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;