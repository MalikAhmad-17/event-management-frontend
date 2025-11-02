import React, { useState } from 'react';
import { FiCalendar, FiMapPin, FiClock, FiUsers } from 'react-icons/fi';

const UserPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingEvents = [
    {
      id: 1,
      title: 'Tech Innovation Summit 2025',
      category: 'Technology',
      price: '$99',
      date: 'November 15, 2025 at 09:00 AM',
      location: 'San Francisco Convention Center, CA',
      attendees: '1.2k attendees',
      bgColor: 'bg-gradient-to-br from-purple-900 to-blue-900'
    },
    {
      id: 2,
      title: 'Digital Marketing Masterclass',
      category: 'Marketing',
      price: 'Free',
      date: 'November 20, 2025 at 02:00 PM',
      location: 'Online Event',
      attendees: '856 attendees',
      bgColor: 'bg-gradient-to-br from-orange-400 to-pink-400'
    },
    {
      id: 3,
      title: 'Music Festival 2025',
      category: 'Music',
      price: '$75',
      date: 'December 5, 2025 at 06:00 PM',
      location: 'Central Park, New York',
      attendees: '4.5k attendees',
      bgColor: 'bg-gradient-to-br from-yellow-600 to-orange-600'
    }
  ];

  const pastEvents = [
    {
      id: 4,
      title: 'Web Development Workshop',
      category: 'Technology',
      price: '$45',
      date: 'October 15, 2025 at 10:00 AM',
      location: 'Tech Hub, Seattle',
      attendees: '320 attendees',
      bgColor: 'bg-gradient-to-br from-green-600 to-blue-600'
    },
    {
      id: 5,
      title: 'Business Networking Event',
      category: 'Business',
      price: '$25',
      date: 'September 28, 2025 at 07:00 PM',
      location: 'Downtown Conference Center',
      attendees: '180 attendees',
      bgColor: 'bg-gradient-to-br from-indigo-600 to-purple-600'
    }
  ];

  const currentEvents = activeTab === 'upcoming' ? upcomingEvents : pastEvents;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-primary shadow-sm border-b">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-xs font-medium text-white mb-0">Admin Dashboard</h1>
          <p className="text-xs font-medium text-white mb-0">System overview and analytics</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm border border-gray-200 w-fit">
          <button
            onClick={() => setActiveTab('registrations')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'registrations'
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FiCalendar className="inline-block w-4 h-4 mr-2" />
            My Registrations
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'settings'
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FiUsers className="inline-block w-4 h-4 mr-2" />
            Profile Settings
          </button>
        </div>

        {/* Event Type Tabs */}
        <div className="mt-8 mb-6">
          <div className="flex space-x-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'upcoming'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'past'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Past Events
            </button>
          </div>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Event Image with Price Badge */}
              <div className={`relative h-48 ${event.bgColor} flex items-center justify-center`}>
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {event.price}
                  </span>
                </div>
                <div className="text-white text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <FiCalendar className="w-8 h-8" />
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-6">
                <div className="mb-3">
                  <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                    {event.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {event.title}
                </h3>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FiClock className="w-4 h-4 mr-2 text-gray-400" />
                    {event.date}
                  </div>
                  <div className="flex items-center">
                    <FiMapPin className="w-4 h-4 mr-2 text-gray-400" />
                    {event.location}
                  </div>
                  <div className="flex items-center">
                    <FiUsers className="w-4 h-4 mr-2 text-gray-400" />
                    {event.attendees}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                    {activeTab === 'upcoming' ? 'View Details' : 'View Certificate'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {currentEvents.length === 0 && (
          <div className="text-center py-12">
            <FiCalendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No {activeTab} events found
            </h3>
            <p className="text-gray-600">
              {activeTab === 'upcoming' 
                ? "You haven't registered for any upcoming events yet." 
                : "You don't have any past events."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;