import React, { useState } from 'react';
import { FiCalendar, FiMapPin, FiClock, FiUsers } from 'react-icons/fi';
import { QRCodeSVG } from 'qrcode.react';

const UserPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const upcomingEvents = [
    {
      id: 1,
      title: 'Tech Innovation Summit 2025',
      category: 'Technology',
      price: '₹99',
      date: 'November 15, 2025 at 09:00 AM',
      location: 'San Francisco Convention Center, CA',
      attendees: '1.2k attendees',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Digital Marketing Masterclass',
      category: 'Marketing',
      price: 'Free',
      date: 'November 20, 2025 at 02:00 PM',
      location: 'Online Event',
      attendees: '856 attendees',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Music Festival 2025',
      category: 'Music',
      price: '₹75',
      date: 'December 5, 2025 at 06:00 PM',
      location: 'Central Park, New York',
      attendees: '4.5k attendees',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop'
    }
  ];

  const pastEvents = [
    {
      id: 4,
      title: 'Web Development Workshop',
      category: 'Technology',
      price: '₹45',
      date: 'October 15, 2025 at 10:00 AM',
      location: 'Tech Hub, Seattle',
      attendees: '320 attendees',
      image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=200&fit=crop'
    },
    {
      id: 5,
      title: 'Business Networking Event',
      category: 'Business',
      price: '₹25',
      date: 'September 28, 2025 at 07:00 PM',
      location: 'Downtown Conference Center',
      attendees: '180 attendees',
      image: 'https://picsum.photos/400/200?random=5'
    }
  ];

  const currentEvents = activeTab === 'upcoming' ? upcomingEvents : pastEvents;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-primary shadow-sm border-b">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-xs font-medium text-white mb-1">My Dashboard</h1>
          <p className="text-xs font-medium text-white mb-1">Welcome back,jenish112005</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex space-x-1 bg-white rounded-3xl p-1 shadow-sm border border-gray-200 w-fit">
          <button
            onClick={() => setActiveTab('upcoming')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  activeTab === 'upcoming'
                    ? 'bg-gray-300 text-black'
                    : 'bg-white text-black'
                }`}
          >
            <FiCalendar className="inline-block w-3 h-3 mr-2" />
            
            My Registrations
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              activeTab === 'settings'
                ? 'bg-gray-300 text-black'
                : 'bg-white text-black'
            }`}
          >
            <FiUsers className="inline-block w-3 h-3 mr-2" />
            Profile Settings
          </button>
        </div>

        {/* Profile Settings Form */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mt-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-xs font-extralight text-gray-900 mb-6" style={{ fontSize: '13px' }}>Profile Settings</h2>
              
              <form>
                {/* Full Name */}
                <div className="mb-3">
                  <label htmlFor="fullName" className="block text-xs font-medium text-black-700 mb-2">
                    Full Name
                  </label>
                  <input
                    className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                  />
                </div>

                {/* Phone Number */}
                <div className="mb-3">
                  <label htmlFor="phone" className="block text-xs font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs placeholder:text-gray-500"
                  />
                </div>

                {/* New Password */}
                <div className="mb-6">
                  <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Leave blank to keep current"
                    className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-xs text-xs placeholder:text-gray-500"
                  />
                </div>

                {/* Update Button */}
                <div className="pt-0 -mt-2">
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    style={{ fontSize: '0.65rem' }}
                  >
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Event Type Tabs - Only show when not in settings */}
        {activeTab !== 'settings' && (
          <div className="mt-8 mb-6">
            <div className="flex space-x-1 bg-white rounded-3xl p-1 shadow-sm border border-gray-200 w-fit">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  activeTab === 'upcoming'
                    ? 'bg-gray-300 text-black'
                    : 'bg-white text-black'
                }`}
              >
                Upcoming Events
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  activeTab === 'past'
                    ? 'bg-gray-300 text-black'
                    : 'bg-white text-black'
                }`}
              >
                Past Events
              </button>
            </div>
          </div>
        )}

        {/* Event Cards Grid - Only show when not in settings */}
        {activeTab !== 'settings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
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
              <div className="p-4 ">
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
                    <FiClock className="w-3 h-3 mr-2 text-gray-500" />
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

                <div className="mt-4">
                  <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowCancelModal(true);
                      }}
                      className="flex-1 bg-white hover:bg-accent hover:text-white text-gray-900 py-1 px-2 rounded-md font-medium transition-colors border border-gray-300" 
                      style={{ fontSize: '0.70rem', lineHeight: '1rem' }}
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowTicketModal(true);
                      }}
                      className="flex-1 bg-accent hover:opacity-90 text-white py-1 px-4 rounded-md text-xs font-medium transition-colors" 
                      style={{ fontSize: '0.70rem', lineHeight: '1rem' }}
                    >
                      View Ticket
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

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
        )}
      </div>

      {/* Cancel Registration Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 sm:max-w-lg w-full mx-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-2">Cancel Registration?</h2>
            <p className="text-gray-500 text-xs mb-6">
              Are you sure you want to cancel your registration for this event? This action cannot be undone.
            </p>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="bg-white hover:bg-gray-50 text-gray-900 py-1.5 px-3 rounded-lg font-medium transition-colors border border-gray-300"
                style={{ fontSize: '0.7rem' }}
              >
                No, keep it
              </button>
              <button
                onClick={() => {
                  // Handle cancellation logic here
                  setShowCancelModal(false);
                  // You can add actual cancellation logic here
                }}
                className="bg-red-600 hover:bg-red-700 text-white py-1.5 px-3 rounded-lg font-medium transition-colors"
                style={{ fontSize: '0.7rem' }}
              >
                Yes, cancel registration
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Ticket Modal */}
      {showTicketModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-xs w-full mx-4">
            {/* Close button */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xs font-semibold text-gray-900">Your Event Ticket</h2>
              <button
                onClick={() => setShowTicketModal(false)}
                className="text-gray-500 hover:text-gray-600 text-xl"
                style={{ fontWeight: 100 }}
              >
                ×
              </button>
            </div>
            
            {/* Event Details */}
            <div className="text-center mb-6">
              <h2 className="text-xs font-semibold text-gray-900 mb-2">{selectedEvent.title}</h2>
              <p className="text-xs text-gray-600">{selectedEvent.date}</p>
            </div>

            {/* QR Code */}
            <div className="flex justify-center mb-6">
              <div className="w-48 h-48 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center">
                {/* QR Code */}
                <div className="w-40 h-40 bg-white flex items-center justify-center">
                  <QRCodeSVG value={selectedEvent.title} size={160} />
                </div>
              </div>
            </div>

            {/* Instructions */}
            <p className="text-center text-xs text-gray-600 mb-6">
              Show this QR code at the event entrance
            </p>

            {/* Add to Calendar Button */}
            <button 
              onClick={() => {
                setShowNotification(true);
                setTimeout(() => setShowNotification(false), 3000);
              }}
              className="w-full bg-accent hover:opacity-90 text-white py-1 px-3 rounded-lg text-xs font-thin transition-colors mb-3"
            >
              <FiCalendar className="inline-block w-4 h-3 mr-2" />
              <span>Add to Google Calendar</span>
            </button>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {showNotification && (
        <div className="fixed bottom-8 right-8 z-50 animate-slide-up">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 flex items-center gap-3">
            <div className="w-auto h-auto bg-black rounded-full flex items-center justify-center p-1">
              <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <p className="text-2xs font-thin text-gray-900">Event added to Google Calendar!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;