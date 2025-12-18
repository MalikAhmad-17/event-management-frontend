// OrganizerDashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


// ⭐ EventCard (now receives navigate as prop)
const EventCard = ({ event, navigate }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={'http://localhost:5000'+event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-medium">
            {event.price || "Free"}
          </span>
        </div>
      </div>

      <div className="p-4">
        {/* Category */}
        <div className="mb-1">
          <span className="inline-block text-sm text-gray-600 px-2 py-1 border border-gray-200 rounded-md">
            {event.category}
          </span>
        </div>

        <h3 className="text-base font-semibold text-gray-900 my-2">
          {event.title}
        </h3>

        {/* Details */}
        <div className="text-sm text-gray-500 space-y-2">
          <div className="flex items-center gap-2">
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>
              {(event.registered ?? 0)}/{event.total ?? 0} registered
            </span>
          </div>
        </div>

        {/* ⭐ View Details (navigate works now) */}
        <div className="mt-4">
          <button
            className="w-full bg-green-600 text-white py-2 rounded-md"
            onClick={() => navigate(`/event/${event.id}`)}
          >
            View Details
          </button>
        </div>

        <div className="mt-3">
         {/*  <button className="w-full bg-white border border-gray-200 text-gray-700 py-2 rounded-md">
            Manage Event
          </button> */}
        </div>
      </div>
    </div>
  );
};



// ⭐ Main Dashboard Component
export default function OrganizerDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events");
        const data = await res.json();

        // Show only organizer-created events
        const myEvents = user
          ? data.filter((e) => e.organizer === user.fullname)
          : data;

        setEvents(myEvents);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top nav */}
      <div className="bg-[#153b9a] text-white py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">📅</div>
            <div className="font-semibold">EventHub</div>
          </div>
          <div>
            <button className="border border-white px-3 py-1 rounded-md">
              Browse Events
            </button>
            <span className="ml-4 px-3 py-1 border border-white rounded-md">
              {user ? user.fullname : "Guest"}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">My Events</h2>
            <p className="text-sm text-gray-500">Events you've created</p>
          </div>
          <div>
            <button
              onClick={() => navigate("/organizer/create-event")}
              className="bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Create New Event
            </button>
           <button
  className="ml-3 bg-white border border-gray-200 px-3 py-2 rounded-md"
  onClick={() => navigate("/organizer/view-all")}
>
  View All
</button>

          </div>
        </div>

        {/* Cards */}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.length ? (
              events.map((ev) => (
                <EventCard key={ev.id} event={ev} navigate={navigate} />
              ))
            ) : (
              <div className="col-span-full bg-white rounded-lg p-8 border border-gray-200 text-center">
                <p className="text-gray-600">
                  No events found. Click Create New Event to add one.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-2 gap-12">
          <div
            className="bg-white p-6 rounded-lg border border-gray-200 text-center cursor-pointer"
            onClick={() => navigate("/organizer/create-event")}
          >
            <div className="text-2xl mb-2">＋</div>
            <div className="font-medium">Create New Event</div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center cursor-pointer"  onClick={() => navigate('/browse')}>
            <div className="text-2xl mb-2">📋</div>
            <div className="font-medium" >View All Events</div>
          </div>

        </div>
      </div>
    </div>
  );
}
