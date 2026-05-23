import React, { useState } from "react";
import Navbar from "../../components/Nav";
import StatsCard from "../../components/StatsCard";
import EventCard from "../../components/EventCard";
import QuickActions from "../../components/QuickActions";
import events from "../../data/events";
import { Calendar, Users, DollarSign } from "lucide-react";

const Dashboard = () => {
  const [showAll, setShowAll] = useState(false); // <-- State to toggle all events

  const visibleEvents = showAll ? events : events.slice(0, 4); // Show first 4 unless 'show all' is true

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 w-full">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <main className="flex-grow pt-20 px-8 pb-10 max-w-[1600px] mx-auto w-full">
        {/* Header */}
        <div className="mb-10">
          
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <StatsCard icon={<Calendar className="text-blue-600" />} title="Total Events Created" value="12" subtitle="+2 this month" />
          <StatsCard icon={<Users className="text-blue-600" />} title="Active Participants" value="5764" subtitle="+15% from last month" />
          <StatsCard icon={<DollarSign className="text-blue-600" />} title="Revenue Earned" value="$24,500" subtitle="+12% from last month" />
        </div>

        {/* My Events */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
           {/* // <h3 className="text-xl font-semibold text-gray-800">My Events</h3> */}
            <h2 className="text-2xl font-semibold text-gray-800">Organizer Dashboard</h2>
          <p className="text-gray-500">Manage your events and track performance</p>
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-blue-600 font-medium hover:underline"
            >
              {showAll ? "Show Less" : "View All"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
            {visibleEvents.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <QuickActions />
      </main>
    </div>
  );
};

export default Dashboard;
