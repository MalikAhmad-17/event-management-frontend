import React from "react";
import { Link } from "react-router-dom";

const QuickActions = () => {
  return (
    <div className="grid grid-cols-3 gap-6 mt-8">
      <Link to="/eventform" className="bg-white shadow p-6 text-center rounded-lg cursor-pointer hover:bg-gray-50">
  + Create Event
     </Link>


      <div className="bg-white shadow p-6 text-center rounded-lg cursor-pointer hover:bg-gray-50">
        <p className="font-semibold">View All Events</p>
      </div>

      <div className="bg-white shadow p-6 text-center rounded-lg cursor-pointer hover:bg-gray-50">
        <p className="font-semibold">View Analytics</p>
      </div>
    </div>
  );
};

export default QuickActions;
