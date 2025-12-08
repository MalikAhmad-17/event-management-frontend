import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiCalendar, FiMapPin, FiUsers } from 'react-icons/fi';

const BrowseEvents = () => {
  const navigate = useNavigate();

  // STATES
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [freeEventsOnly, setFreeEventsOnly] = useState(false);

  // 🔥 Fetch events from API
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events");
        const data = await res.json();

        // convert backend fields to front-end expected structure
        const mapData = data.map(ev => ({
          id: ev.id,
          title: ev.title,
          category: ev.category,
          price: ev.price === "0" || ev.price === 0 ? "Free" : ev.price,
          date: ev.date,
          location: ev.location,
          attendees: `${ev.registered}/${ev.total} registered`,
          image: ev.image
        }));

        setEvents(mapData);
      } catch (err) {
        console.error("Error loading events:", err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  // 🔎 Apply filters
  const filteredEvents = events.filter(event => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;

    const matchesFree = !freeEventsOnly || event.price === "Free";

    return matchesSearch && matchesCategory && matchesFree;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-primary shadow-sm border-b">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-lg font-medium text-white mb-0">Discover Events</h1>
          <p className="text-xs font-medium text-white mb-0">Find your next amazing experience</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0 -ml-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h2 className="text-sm font-thin text-gray-900 mb-6">Filters</h2>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-xs font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Event name or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-1 rounded-lg bg-gray-100 text-xs text-gray-900"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-xs font-medium text-gray-700 mb-3">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-3 pr-10 py-1 rounded-lg bg-gray-100 text-xs text-gray-900"
                >
                  <option>All</option>
                  <option>Technology</option>
                  <option>Marketing</option>
                  <option>Music</option>
                  <option>Art</option>
                  <option>Food</option>
                  <option>Health</option>
                  <option>Science</option>
                </select>
              </div>

              {/* Free Events */}
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={freeEventsOnly}
                    onChange={(e) => setFreeEventsOnly(e.target.checked)}
                  />
                  <span className="ml-2 text-xs text-gray-700">Free events only</span>
                </label>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600 text-sm">
                {loading ? "Loading..." : `${filteredEvents.length} events found`}
              </p>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {!loading &&
                filteredEvents.map((event) => (
                  <div key={event.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <div className="relative h-48">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                      <div className="absolute top-1 left-2">
                        <span className="bg-primary text-white px-2 py-0.5 rounded text-xs">{event.price}</span>
                      </div>
                    </div>

                    <div className="p-4 flex flex-col flex-grow">
                      <span className="inline-block text-xs border px-1 py-0.5 rounded">{event.category}</span>

                      <h3 className="text-xs font-medium text-gray-900 my-3">{event.title}</h3>

                      <div className="text-xs text-gray-500 space-y-2">
                        <div className="flex items-center">
                          <FiCalendar className="w-3 h-3 mr-2" /> {event.date}
                        </div>
                        <div className="flex items-center">
                          <FiMapPin className="w-3 h-3 mr-2" /> {event.location}
                        </div>
                        <div className="flex items-center">
                          <FiUsers className="w-3 h-3 mr-2" /> {event.attendees}
                        </div>
                      </div>

                      <button
                        onClick={() => navigate(`/event/${event.id}`)}
                        className="w-full bg-accent text-white py-2 rounded text-sm mt-4"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseEvents;
