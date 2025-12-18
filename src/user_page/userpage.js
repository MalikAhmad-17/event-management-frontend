import React, { useState, useEffect } from "react";
import { FiCalendar, FiMapPin, FiClock, FiUsers } from "react-icons/fi";
import { QRCodeCanvas } from "qrcode.react";

const UserPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ticketEvent, setTicketEvent] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  // Password fields only
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/my-events/${userId}`);
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [userId]);

  const formatDateTime = (dateStr) => {
    const date = new Date(dateStr.replace(" ", "T"));

    const time = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    return `${time} | ${formattedDate}`;
  };

  // BOOK EVENT
  const handleBookEvent = async (eventId) => {
    try {
      const res = await fetch("http://localhost:5000/api/book-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, event_id: eventId }),
      });

      const data = await res.json();
      alert(data.message);

      if (data.success) window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // UPDATE PASSWORD ONLY
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      alert("Please fill both password fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/update-profile/${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );

      const data = await res.json();
      alert(data.message);

      if (data.success) {
        setPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* HEADER */}
      <div className="bg-primary shadow-sm border-b">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-xs font-medium text-white mb-1">My Dashboard</h1>
          <p className="text-xs font-medium text-white mb-1">
            Welcome back, {user.fullname}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        {/* TABS */}
        <div className="flex space-x-1 bg-white rounded-3xl p-1 shadow-sm border w-fit">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              activeTab === "upcoming" ? "bg-gray-300" : "bg-white"
            }`}
          >
            <FiCalendar className="inline-block w-3 h-3 mr-2" />
            My Registrations
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              activeTab === "settings" ? "bg-gray-300" : "bg-white"
            }`}
          >
            <FiUsers className="inline-block w-3 h-3 mr-2" />
            Profile Settings
          </button>
        </div>

        {/* PROFILE SETTINGS */}
        {activeTab === "settings" && (
          <div className="max-w-lg mt-8 bg-white p-6 shadow rounded-lg border">
            <h2 className="text-sm font-semibold mb-4">Update Password</h2>

            <form onSubmit={handleUpdateProfile}>
              <label className="text-xs font-medium">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-100 p-2 text-xs rounded mb-4"
              />

              <label className="text-xs font-medium">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-gray-100 p-2 text-xs rounded mb-4"
              />

              <button className="bg-green-600 text-white w-full py-2 rounded text-xs">
                Update Password
              </button>
            </form>
          </div>
        )}

        {/* EVENT LIST */}
        {activeTab !== "settings" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white shadow-sm border rounded-xl overflow-hidden"
              >
                <div className="relative h-48">
                  <img
                    src={'http://localhost:5000'+event.image}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 text-xs rounded">
                    {event.price}
                  </div>
                </div>

                <div className="p-4 text-xs">
                  <span className="border px-2 py-1 rounded text-[10px] text-gray-700">
                    {event.category}
                  </span>

                  <h3 className="text-sm font-semibold mt-2">
                    {event.title}
                  </h3>

                  <div className="mt-3 space-y-2 text-gray-500">
                    <div className="flex items-center">
                      <FiClock className="mr-2" />
                      {formatDateTime(event.date)}
                    </div>

                    <div className="flex items-center">
                      <FiMapPin className="mr-2" /> {event.location}
                    </div>

                    <div className="flex items-center">
                      <FiUsers className="mr-2" />
                      {event.registered}/{event.total}
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    {event.booked === 1 ? (
                      <button
                        onClick={() => setTicketEvent(event)}
                        className="flex-1 bg-accent text-white py-1 rounded"
                      >
                        View Ticket
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBookEvent(event.id)}
                        className="flex-1 bg-green-600 text-white py-1 rounded"
                      >
                        Book Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TICKET MODAL */}
        {ticketEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-lg font-bold mb-2">Event Ticket</h2>

              <p className="text-sm font-semibold">{ticketEvent.title}</p>
              <p className="text-xs text-gray-600 mb-3">
                {formatDateTime(ticketEvent.date)}
              </p>

              <div className="flex justify-center my-4">
                <QRCodeCanvas
                  value={JSON.stringify({
                    eventId: ticketEvent.id,
                    title: ticketEvent.title,
                    date: ticketEvent.date,
                    location: ticketEvent.location,
                    user: user.fullname,
                  })}
                  size={180}
                  level="H"
                  includeMargin={true}
                />
              </div>

              <button
                onClick={() => setTicketEvent(null)}
                className="mt-4 w-full bg-gray-200 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
