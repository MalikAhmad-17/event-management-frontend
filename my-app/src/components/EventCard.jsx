import React from "react";

const EventCard = ({ image, title, category, date, location, registered }) => {
  return (
   <div className="
  bg-white rounded-lg shadow-md overflow-hidden 
  cursor-pointer 
  transform transition duration-300
  hover:shadow-lg hover:-translate-y-2 active:scale-95
  w-full 
">
      <img src={image} alt={title} className="h-40 w-full gap-4 object-cover " />
      
      <div className="p-4">
        <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">{category}</span>

        <h3 className="font-semibold mt-2 text-lg">{title}</h3>

        <p className="text-sm text-gray-500">{date}</p>
        <p className="text-sm text-gray-500">{location}</p>
        <p className="text-sm text-gray-600 mt-2">{registered}</p>

        {/* Buttons */}
        <div className="flex flex-col gap-2 mt-3">
          <button className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
            View Details
          </button>

          <button className="bg-white-600 text-black py-2 rounded hover:bg-green-700 transition">
            Manage Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
