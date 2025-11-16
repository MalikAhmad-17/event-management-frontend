import React, { useState } from "react";
import EventCard from "./EventCard";

const EventList = () => {
  const [showAll, setShowAll] = useState(false);
  
  // Sample event data
  const events = [
    {
      id: 1,
      image: "https://via.placeholder.com/300x150",
      title: "Tech Conference 2024",
      category: "Technology",
      date: "March 15, 2024",
      location: "San Francisco, CA",
      registered: "250 registered"
    },
    // ... add more events as needed
  ];

  const visibleEvents = showAll ? events : events.slice(0, 3);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Upcoming Events</h2>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-blue-600 font-medium hover:underline"
        >
          {showAll ? "Show Less" : "View All"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleEvents.map((event) => (
          <EventCard
            key={event.id}
            image={event.image}
            title={event.title}
            category={event.category}
            date={event.date}
            location={event.location}
            registered={event.registered}
          />
        ))}
      </div>
    </div>
  );
};

export default EventList;