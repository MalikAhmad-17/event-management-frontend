import React from "react";
import events from "../data/events"; // <-- your array file
import EventCard from "./EventCard";

const BrowseEvents = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Browse Events</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((ev, index) => (
          <EventCard key={index} {...ev} />
        ))}
      </div>
    </div>
  );
};

export default BrowseEvents;
