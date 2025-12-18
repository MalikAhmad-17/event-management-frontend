import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiMapPin, FiUser } from 'react-icons/fi';

const fixImageUrl = (url) => {
  if (!url) return "https://via.placeholder.com/1200x400?text=No+Image";

  if (url.includes("images.unsplash.com")) {
    return url + "&w=1600&h=600&fit=crop";
  }

  if (url.includes("unsplash.com/photos")) {
    const id = url.split("/").pop();
    return `https://images.unsplash.com/photo-${id}?w=1600&h=600&fit=crop`;
  }

  return url;
};

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🚀 Fetch event using API
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/events/${id}`);
        const data = await res.json();

        setEvent(data);
      } catch (err) {
        console.error("API ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading)
    return <div className="min-h-screen flex items-center justify-center text-lg">Loading event...</div>;

  if (!event)
    return <div className="min-h-screen flex items-center justify-center text-lg text-red-600">Event not found</div>;

  const registered = parseInt(event.registered ?? 0);
  const total = parseInt(event.total ?? 0);
  const percentage = (registered / total) * 100;

  const remaining = total - registered;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">

      {/* Hero Section */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={'http://localhost:5000'+event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Back Button + Category */}
        <div className="absolute top-6 left-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() =>window.history.back()}
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

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2">
            {/* About Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">About This Event</h2>
              <p className="text-gray-500 text-xs leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Event Details */}
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

          {/* RIGHT SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">

              {/* Price */}
              <div className="text-right mb-6">
                <span className="text-xl font-medium text-gray-900">{event.price}</span>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-gray-600 mb-2">
                  <span>{registered}/{total}</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>

                <div className="text-xs text-gray-500">
                  {remaining} spots remaining
                </div>
              </div>

              {/* Register Button */}
            {/*   <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-xs font-medium transition-colors mb-4">
                Register Now
              </button> */}

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
