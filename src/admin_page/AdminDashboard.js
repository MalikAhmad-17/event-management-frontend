import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiUsers, FiUser, FiClock, FiDollarSign } from "react-icons/fi";

const API_BASE_URL = "http://localhost:5000";

const AdminDashboard = () => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [hoveredBar, setHoveredBar] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [barMousePosition, setBarMousePosition] = useState({ x: 0, y: 0 });

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrganizers: 0,
    pendingApprovals: 0,
    totalRevenue: 0,
  });
  const [revenueData, setRevenueData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [activity, setActivity] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fixed SVG positions for line chart points
  const baseRevenuePositions = [
    { x: 20, y: 80 },
    { x: 100, y: 60 },
    { x: 180, y: 40 },
    { x: 260, y: 50 },
    { x: 340, y: 20 },
  ];

  const formatCurrency = (value) => {
    if (!value) return "₹0";
    return `₹${Number(value).toLocaleString("en-IN")}`;
  };

  const formatTimeAgo = (createdAt) => {
    if (!createdAt) return "";
    const date = new Date(createdAt);
    if (isNaN(date.getTime())) return "";
    const now = new Date();
    const diffMs = now - date;
    const diffMin = Math.floor(diffMs / 60000);

    if (diffMin < 1) return "just now";
    if (diffMin < 60) return `${diffMin} min ago`;

    const diffHrs = Math.floor(diffMin / 60);
    if (diffHrs < 24) return `${diffHrs} hour${diffHrs > 1 ? "s" : ""} ago`;

    const diffDays = Math.floor(diffHrs / 24);
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [statsRes, revenueRes, popularRes, activityRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/admin/stats`),
          axios.get(`${API_BASE_URL}/api/admin/monthly-revenue`),
          axios.get(`${API_BASE_URL}/api/admin/popular-events`),
          axios.get(`${API_BASE_URL}/api/admin/recent-activity`),
        ]);

        setStats({
          totalUsers: statsRes.data.totalUsers || 0,
          totalOrganizers: statsRes.data.totalOrganizers || 0,
          pendingApprovals: statsRes.data.pendingApprovals || 0,
          totalRevenue: statsRes.data.totalRevenue || 0,
        });

        const revenueFromApi = revenueRes.data || [];
        const formattedRevenue = revenueFromApi.map((item, index) => {
          const base = baseRevenuePositions[index] || {
            x: 20 + index * 80,
            y: 80,
          };
          return {
            month: (item.month || "").substring(0, 3) || `M${index + 1}`,
            value: Number(item.total) || 0,
            x: base.x,
            y: base.y,
          };
        });
        setRevenueData(formattedRevenue);

        const popularEvents = popularRes.data || [];
        const formattedEvents = popularEvents.map((event) => ({
          name: event.name,
          participants: Number(event.participants) || 0,
          height: Math.max(20, (Number(event.participants) || 0) / 30),
          color: "#1e40af",
        }));
        setEventsData(formattedEvents);

        setActivity(activityRes.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load admin dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Top error / loading bar */}
      {(loading || error) && (
        <div className="bg-yellow-50 border-b border-yellow-200 text-xs text-yellow-700 px-6 py-2">
          <div className="container mx-auto flex justify-between">
            {loading && <span>Loading admin dashboard data...</span>}
            {error && <span>{error}</span>}
          </div>
        </div>
      )}

      {/* Dashboard Header */}
      <div className="bg-primary shadow-sm border-b">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-xs font-medium text-white mb-0">Admin Dashboard</h1>
          <p className="text-xs font-medium text-white mb-0">System overview and analytics</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Users Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between mb-4">
              <div className="p-3 bg-indigo-50 rounded-lg">
                <FiUsers className="h-6 w-6 text-indigo-600" />
              </div>
              {/* <div className="text-green-500 text-xs font-thin">+8% this month</div> */}
            </div>
            <div>
              <div className="text-gray-500 text-xs font-thin">Total Users</div>
              <div className="text-gray-900 text-2xl font-thin">
                {stats.totalUsers.toLocaleString("en-IN")}
              </div>
            </div>
          </div>

          {/* Total Organizers Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between mb-4">
              <div className="p-3 bg-indigo-50 rounded-lg">
                <FiUser className="h-6 w-6 text-indigo-600" />
              </div>
              {/* <div className="text-green-500 text-xs font-thin">+12% this month</div> */}
            </div>
            <div>
              <div className="text-gray-500 text-xs font-thin">Total Organizers</div>
              <div className="text-gray-900 text-2xl font-thin">
                {stats.totalOrganizers.toLocaleString("en-IN")}
              </div>
            </div>
          </div>

          {/* Pending Approvals Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between mb-4">
              <div className="p-3 bg-indigo-50 rounded-lg">
                <FiClock className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <div>
              <div className="text-gray-500 text-xs font-thin">Pending Approvals</div>
              <div className="text-gray-900 text-2xl font-thin">
                {stats.pendingApprovals.toLocaleString("en-IN")}
              </div>
              <div className="text-gray-400 text-2xs">Events awaiting review</div>
            </div>
          </div>

          {/* Total Revenue Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between mb-4">
              <div className="p-3 bg-indigo-50 rounded-lg">
                <FiDollarSign className="h-6 w-6 text-indigo-600" />
              </div>
              {/* <div className="text-green-500 text-xs font-thin">+15% this month</div> */}
            </div>
            <div>
              <div className="text-gray-500 text-xs font-thin">Total Revenue</div>
              <div className="text-gray-900 text-2xl font-thin">
                {formatCurrency(stats.totalRevenue)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Revenue Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-normal text-gray-900 mb-2">Monthly Revenue</h3>
              <p className="text-gray-500 text-xs font-thin">
                Revenue trends over the last months
              </p>
            </div>
            <div className="h-64 relative">
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between text-xs text-gray-500">
                <div className="flex justify-between border-b border-gray-100 pb-1">
                  <span>26000</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-1">
                  <span>19500</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-1">
                  <span>13000</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-1">
                  <span>6500</span>
                </div>
                <div className="flex justify-between">
                  <span>0</span>
                </div>
              </div>

              {/* Line Chart */}
              <div
                className="absolute bottom-8 left-0 right-0 h-32 relative"
                onMouseMove={(e) => {
                  if (!revenueData.length) return;

                  const rect = e.currentTarget.getBoundingClientRect();
                  const mouseX = e.clientX - rect.left;
                  const mouseY = e.clientY - rect.top;

                  setMousePosition({ x: mouseX, y: mouseY });

                  const svgWidth = rect.width;
                  const relativeX = (mouseX / svgWidth) * 400;

                  let closestPoint = revenueData[0];
                  let minDistance = Math.abs(relativeX - revenueData[0].x);

                  revenueData.forEach((point) => {
                    const distance = Math.abs(relativeX - point.x);
                    if (distance < minDistance) {
                      minDistance = distance;
                      closestPoint = point;
                    }
                  });

                  setHoveredPoint(closestPoint);
                }}
                onMouseEnter={() => {
                  if (!hoveredPoint && revenueData.length) {
                    setHoveredPoint(revenueData[0]);
                  }
                }}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                <svg className="w-full h-full" viewBox="0 0 400 120">
                  <rect
                    x="0"
                    y="0"
                    width="400"
                    height="120"
                    fill="transparent"
                    className="cursor-pointer"
                  />

                  {/* Static smooth curve for visual */}
                  <path
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    d="M 20,80 C 50,75 70,65 100,60 C 130,55 150,45 180,40 C 210,35 230,42 260,50 C 290,58 310,35 340,20"
                    className="transition-all duration-200"
                  />

                  {/* Data points */}
                  {revenueData.map((point) => (
                    <circle
                      key={point.month}
                      cx={point.x}
                      cy={point.y}
                      r={hoveredPoint?.month === point.month ? "5" : "3"}
                      fill="#10b981"
                      className="transition-all duration-200"
                    />
                  ))}
                </svg>

                {/* Tooltip */}
                {hoveredPoint && (
                  <div
                    className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-3 pointer-events-none z-10 transition-all duration-150"
                    style={{
                      left: `${mousePosition.x}px`,
                      top: `${mousePosition.y - 60}px`,
                      transform: "translate(-50%, 0)",
                    }}
                  >
                    <div className="text-sm font-medium text-gray-900">
                      {hoveredPoint.month}
                    </div>
                    <div className="text-sm text-green-600">
                      Revenue: {formatCurrency(hoveredPoint.value)}
                    </div>
                  </div>
                )}
              </div>

              {/* Month labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 px-4">
                {revenueData.length > 0 ? (
                  revenueData.map((point) => (
                    <span key={point.month}>{point.month}</span>
                  ))
                ) : (
                  <>
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Aug</span>
                    <span>Sep</span>
                    <span>Oct</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Most Popular Events Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-normal text-gray-900 mb-2">
                Most Popular Events
              </h3>
              <p className="text-gray-500 text-xs font-thin">
                Events by participant count
              </p>
            </div>
            <div className="h-64 relative">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-500 w-12">
                <span>6000</span>
                <span>4500</span>
                <span>3000</span>
                <span>1500</span>
                <span>0</span>
              </div>

              {/* Bar chart */}
              <div
                className="absolute left-12 right-0 top-0 bottom-8 flex items-end justify-around gap-4"
                onMouseMove={(e) => {
                  if (!eventsData.length) return;

                  const rect = e.currentTarget.getBoundingClientRect();
                  const mouseX = e.clientX - rect.left;
                  const mouseY = e.clientY - rect.top;

                  setBarMousePosition({ x: mouseX, y: mouseY });

                  const barWidth = rect.width / eventsData.length;
                  const barIndex = Math.floor(mouseX / barWidth);

                  if (barIndex >= 0 && barIndex < eventsData.length) {
                    setHoveredBar(eventsData[barIndex]);
                  }
                }}
                onMouseEnter={() => {
                  if (!hoveredBar && eventsData.length) {
                    setHoveredBar(eventsData[0]);
                  }
                }}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {eventsData.map((event) => (
                  <div
                    key={event.name}
                    className="flex flex-col items-center flex-1 relative"
                  >
                    <div
                      className="w-full rounded-t transition-all duration-200 cursor-pointer relative"
                      style={{
                        height: `${event.height}px`,
                        backgroundColor: event.color,
                        opacity: hoveredBar?.name === event.name ? 0.8 : 1,
                        transform:
                          hoveredBar?.name === event.name
                            ? "scale(1.02)"
                            : "scale(1)",
                      }}
                    />
                  </div>
                ))}

                {/* Tooltip */}
                {hoveredBar && (
                  <div
                    className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-3 pointer-events-none z-10 transition-all duration-150"
                    style={{
                      left: `${barMousePosition.x}px`,
                      top: `${barMousePosition.y - 60}px`,
                      transform: "translate(-50%, 0)",
                    }}
                  >
                    <div className="text-sm font-medium text-gray-900">
                      {hoveredBar.name}
                    </div>
                    <div className="text-sm text-blue-600">
                      Participants:{" "}
                      {hoveredBar.participants.toLocaleString("en-IN")}
                    </div>
                  </div>
                )}
              </div>

              {/* X-axis labels */}
              <div className="absolute left-12 right-0 bottom-0 flex justify-around text-xs text-gray-500">
                {eventsData.length > 0 ? (
                  eventsData.map((event) => (
                    <span key={event.name} className="text-center flex-1 truncate px-1">
                      {event.name}
                    </span>
                  ))
                ) : (
                  <>
                    <span className="text-center flex-1 truncate px-1">
                      Tech Summit
                    </span>
                    <span className="text-center flex-1 truncate px-1">
                      Music Festival
                    </span>
                    <span className="text-center flex-1 truncate px-1">
                      Marketing Class
                    </span>
                    <span className="text-center flex-1 truncate px-1">
                      Yoga Retreat
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
    {/* Recent Activity Section */}
<div className="container mx-auto px-6 py-6">
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h1 className="text-sm font-medium text-gray-900 mb-6">
      Recent Activity
    </h1>

    {activity.length === 0 ? (
      <div className="text-xs text-gray-500">
        No recent activity found.
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activity.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50 border border-gray-200 rounded-lg p-4"
          >
            {/* Activity Type */}
            <div className="text-xs text-indigo-600 font-medium mb-1">
              {item.activity_type}
            </div>

            {/* Title */}
            <div className="text-sm font-semibold text-gray-900 mb-2">
              {item.title}
            </div>

            {/* Details */}
            <div className="text-xs text-gray-600 space-y-1">
              {item.total_capacity !== null && (
                <div>
                  Capacity:{" "}
                  <span className="font-medium">
                    {item.total_capacity}
                  </span>
                </div>
              )}

              {item.registered !== null && (
                <div>
                  Booked:{" "}
                  <span className="font-medium">
                    {item.registered}
                  </span>
                </div>
              )}
            </div>

            {/* Time */}
            <div className="mt-3 text-[11px] text-gray-400">
              {formatTimeAgo(item.created_at)}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>

    </div>
  );
};

export default AdminDashboard;
