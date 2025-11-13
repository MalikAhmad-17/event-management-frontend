import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiCalendar, FiMapPin, FiUsers } from 'react-icons/fi';

const BrowseEvents = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [freeEventsOnly, setFreeEventsOnly] = useState(false);

  const allEvents = [
    {
      id: 1,
      title: 'Tech Innovation Summit 2025',
      category: 'Technology',
      price: '$99',
      date: 'November 15, 2025 at 09:00 AM',
      location: 'San Francisco Convention Center, CA',
      attendees: '387/500 registered',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Digital Marketing Masterclass',
      category: 'Marketing',
      price: 'Free',
      date: 'November 20, 2025 at 02:00 PM',
      location: 'Online Event',
      attendees: '756/1000 registered',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Music Festival 2025',
      category: 'Music',
      price: '$75',
      date: 'December 5, 2025 at 06:00 PM',
      location: 'Central Park, New York',
      attendees: '4523/5000 registered',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop'
    },
    {
      id: 4,
      title: 'Art & Design Fair',
      category: 'Art',
      price: '$20',
      date: 'December 12, 2025 at 11:00 AM',
      location: 'Metropolitan Pavilion, New York',
      attendees: '1500/2000 registered',
      image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400&h=200&fit=crop'
    },
    {
      id: 5,
      title: 'Food & Wine Festival',
      category: 'Food',
      price: '$120',
      date: 'December 18, 2025 at 01:00 PM',
      location: 'Napa Valley, CA',
      attendees: '800/1000 registered',
      image: 'https://picsum.photos/400/200?random=5'
    },
    {
      id: 6,
      title: 'Health & Wellness Expo',
      category: 'Health',
      price: 'Free',
      date: 'January 10, 2026 at 10:00 AM',
      location: 'Los Angeles Convention Center, CA',
      attendees: '2500/3000 registered',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=200&fit=crop'
    },
    {
      id: 7,
      title: 'Science & Technology Conference',
      category: 'Science',
      price: '$150',
      date: 'January 22, 2026 at 09:00 AM',
      location: 'MIT, Cambridge, MA',
      attendees: '600/700 registered',
      image: 'https://picsum.photos/400/200?random=7'
    }
  ];

  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesFree = !freeEventsOnly || event.price === 'Free';
    
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
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
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
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-3 pr-10 py-1 rounded-lg bg-gray-100 text-xs text-gray-900 appearance-none"
                  >
                    <option>All</option>
                    <option>Technology</option>
                    <option>Marketing</option>
                    <option>Music</option>
                    <option>Event</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>

              {/* Free Events Only */}
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={freeEventsOnly}
                    onChange={(e) => setFreeEventsOnly(e.target.checked)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="font-medium ml-2 text-xs text-gray-700">Free events only</span>
                </label>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600 text-sm">{filteredEvents.length} events found</p>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                  {/* Event Image with Price Badge */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1 left-2">
                      <span className="bg-primary text-white px-2 py-0.5 rounded-md text-xs font-medium" style={{ fontSize: '0.6rem' }}>
                        {event.price}
                      </span>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="mb-1">
                      <span className="inline-block border border-gray-300 text-gray-700 px-1 py-0.5 rounded-md text-xs font-medium" style={{ fontSize: '0.6rem' }}>
                        {event.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xs font-medium text-gray-900 mb-3">
                      {event.title}
                    </h3>

                    <div className="space-y-2 text-xs text-gray-500" style={{ fontSize: '0.70rem' }}>
                      <div className="flex items-center">
                        <FiCalendar className="w-3 h-3 mr-2 text-gray-500" />
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <FiMapPin className="w-4 h-3 mr-2 text-gray-500" />
                        {event.location}
                      </div>
                      <div className="flex items-center">
                        <FiUsers className="w-4 h-3 mr-2 text-gray-500" />
                        {event.attendees}
                      </div>
                    </div>

                    <div className="mt-auto">
                      <button 
                        onClick={() => navigate(`/event/${event.id}`)}
                        className="w-full bg-accent hover:opacity-90 text-white py-2 px-4 rounded text-sm font-medium transition-colors"
                      >
                        View Details
                      </button>
                    </div>
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