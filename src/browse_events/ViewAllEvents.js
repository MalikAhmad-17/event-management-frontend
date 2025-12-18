import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ViewAllEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* TOP BAR */}
      <div className="bg-[#153b9a] text-white py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="font-semibold">All Events</div>
          <button
            onClick={() => navigate(-1)}
            className="border border-white px-3 py-1 rounded-md"
          >
            ← Back
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {loading ? (
          <div>Loading...</div>
        ) : events.length ? (
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm flex overflow-hidden"
              >
                {/* IMAGE */}
                <div className="w-56 h-40 flex-shrink-0">
                  <img
                    src={"http://localhost:5000" + event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {event.title}
                      </h3>
                      <span className="text-sm bg-green-600 text-white px-2 py-1 rounded">
                        {event.price || "Free"}
                      </span>
                    </div>

                    <div className="mt-1">
                      <span className="inline-block text-xs text-gray-600 border px-2 py-1 rounded">
                        {event.category}
                      </span>
                    </div>

                    <div className="mt-3 text-sm text-gray-600 space-y-1">
                      <div>Date: {event.date}</div>
                      <div>Location: {event.location}</div>
                      <div>
                        Registered: {(event.registered ?? 0)}/{event.total ?? 0}
                      </div>
                    </div>
                  </div>

                  {/* ACTION */}
                  <div className="mt-4">
                    <button
                      onClick={() => navigate(`/event/${event.id}`)}
                      className="bg-green-600 text-white px-4 py-2 rounded-md"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border rounded-lg p-8 text-center text-gray-600">
            No events found
          </div>
        )}
      </div>
    </div>
  );
}
