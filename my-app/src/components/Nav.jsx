import React from "react";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom"; 

const Nav = () => {
  return (
    <nav className="bg-blue-800 text-white py-4 px-6 flex justify-between items-center shadow-md">
      {/* Left Section (Logo + Icon) */}
     <div className="flex items-start gap-3">
  {/* <Calendar className="w-6 h-6 text-white mt-1" /> */}

  <div className="flex flex-col">
    <h2 className="text-xl font-semibold text-white leading-tight">
      Organizer Dashboard
    </h2>
    <p className="text-sm text-gray-200  leading-tight">
      Manage your events and track performance
    </p>
  </div>
</div>

      {/* Right Section (Buttons) */}
      <div className="flex items-center gap-4">
        <Link
          to="/eventform"
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded font-medium"
        >
          + Create Event
        </Link>

        <div className="bg-blue-700 px-3 py-1 rounded text-sm font-medium">
          example@gmail.com
        </div>
      </div>
    </nav>
  );
};

export default Nav;
