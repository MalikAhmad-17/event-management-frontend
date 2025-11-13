import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiMapPin, FiUser } from 'react-icons/fi';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Event data - in a real app this would come from an API
  const eventData = {
    1: {
      title: 'Tech Innovation Summit 2025',
      category: 'Technology',
      price: '$99',
      date: 'November 15, 2025 at 09:00 AM',
      location: 'San Francisco Convention Center, CA',
      organizer: 'Tech Events Inc.',
      registered: '387',
      total: '500',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=400&fit=crop',
      description: 'Join us for the biggest tech innovation summit of the year. Network with industry leaders, explore cutting-edge technologies, and gain insights into the future of tech.'
    },
    2: {
      title: 'Digital Marketing Masterclass',
      category: 'Marketing',
      price: 'Free',
      date: 'November 20, 2025 at 02:00 PM',
      location: 'Online Event',
      organizer: 'Marketing Pro Academy',
      registered: '756',
      total: '1000',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=400&fit=crop',
      description: 'Master the art of digital marketing with industry experts. Learn the latest strategies, tools, and techniques to grow your business online.'
    },
    3: {
      title: 'Music Festival 2025',
      category: 'Music',
      price: '$75',
      date: 'December 5, 2025 at 06:00 PM',
      location: 'Central Park, New York',
      organizer: 'NYC Music Events',
      registered: '4523',
      total: '5000',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=400&fit=crop',
      description: 'Experience an unforgettable night of music with top artists from around the world. Food, drinks, and amazing performances await you.'
    }
  };

  const event = eventData[id];

  if (!event) {
    return <div>Event not found</div>;
  }

  const registrationPercentage = (parseInt(event.registered) / parseInt(event.total)) * 100;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="relative h-80 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        {/* Back Button and Category */}
        <div className="absolute top-6 left-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/browse')}
              className="flex items-center bg-black bg-opacity-60 text-white px-3 py-1 rounded text-sm hover:bg-opacity-80 transition-colors"
            >
              <FiArrowLeft className="w-4 h-4 mr-1" />
              Back
            </button>
            <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium">
              {event.category}
            </span>
          </div>
        </div>

        {/* Event Title */}
        <div className="absolute bottom-8 left-8">
          <h1 className="text-3xl font-medium text-white">{event.title}</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">About This Event</h2>
              <p className="text-gray-500 text-xs leading-relaxed">
                {event.description}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Event Details</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <FiCalendar className="w-4 h-4 text-gray-400 mt-1 mr-3" />
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Date & Time</div>
                    <div className="text-xs text-gray-900">{event.date}</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <FiMapPin className="w-4 h-4 text-gray-400 mt-1 mr-3" />
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Location</div>
                    <div className="text-xs text-gray-900">{event.location}</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <FiUser className="w-4 h-4 text-gray-400 mt-1 mr-3" />
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Organizer</div>
                    <div className="text-xs text-gray-900">{event.organizer}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* Price */}
              <div className="text-right mb-6">
                <span className="text-xl font-medium text-gray-900">{event.price}</span>
              </div>

              {/* Registration Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-gray-600 mb-2">
                  <span>{event.registered}/{event.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-accent h-2 rounded-full transition-all duration-300"
                    style={{ width: `${registrationPercentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">
                  {parseInt(event.total) - parseInt(event.registered)} spots remaining
                </div>
              </div>

              {/* Register Button */}
              <button className="w-full bg-accent hover:opacity-90 text-white py-2 px-4 rounded-lg text-xs font-medium transition-colors mb-4">
                Register Now
              </button>

              {/* Secure Payment */}
              <div className="text-center">
                <p className="text-xs text-gray-500">Secure payment powered by Stripe</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;