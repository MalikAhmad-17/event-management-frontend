import React from "react";

const StatsCard = ({ icon, title, value, subtitle }) => {
  return (
    <div className="bg-white shadow rounded-lg p-5 flex flex-col justify-between">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <h2 className="text-2xl font-bold">{value}</h2>
        </div>
      </div>
      <p className="text-green-500 text-sm mt-2">{subtitle}</p>
    </div>
  );
};

export default StatsCard;
