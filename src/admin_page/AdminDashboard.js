import { useState } from 'react';
import { FiUsers, FiUser, FiClock, FiDollarSign } from 'react-icons/fi';

const AdminDashboard = () => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [hoveredBar, setHoveredBar] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [barMousePosition, setBarMousePosition] = useState({ x: 0, y: 0 });
  
  // Chart data
  const revenueData = [
    { month: 'Jun', value: 13000, x: 20, y: 80 },
    { month: 'Jul', value: 15800, x: 100, y: 60 },
    { month: 'Aug', value: 19500, x: 180, y: 40 },
    { month: 'Sep', value: 17200, x: 260, y: 50 },
    { month: 'Oct', value: 25200, x: 340, y: 20 }
  ];
  
  const eventsData = [
    { name: 'Tech Summit', participants: 850, height: 60, color: '#1e40af' },
    { name: 'Music Festival', participants: 4523, height: 180, color: '#1e40af' },
    { name: 'Marketing Class', participants: 1240, height: 80, color: '#1e40af' },
    { name: 'Yoga Retreat', participants: 890, height: 50, color: '#1e40af' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Dashboard Header */}
      <div className="bg-primary shadow-sm border-b">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-xs font-medium text-white mb-0">Admin Dashboard</h1>
          <p className="text-xs font-medium text-white mb-0">System overview and analytics</p>
        </div>
      </div>
      {/* Stats Cards Only */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Users Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between mb-4">
              <div className="p-3 bg-indigo-50 rounded-lg">
                <FiUsers className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="text-green-500 text-xs font-thin">+8% this month</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs font-thin">Total Users</div>
              <div className="text-gray-900 text-2xl font-thin">12,547</div>
            </div>
          </div>

          {/* Total Organizers Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between mb-4">
              <div className="p-3 bg-indigo-50 rounded-lg">
                <FiUser className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="text-green-500 text-xs font-thin">+12% this month</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs font-thin">Total Organizers</div>
              <div className="text-gray-900 text-2xl font-thin">523</div>
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
              <div className="text-gray-900 text-2xl font-thin">8</div>
              <div className="text-gray-400 text-2xs">Events awaiting review</div>
            </div>
          </div>

          {/* Total Revenue Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between mb-4">
              <div className="p-3 bg-indigo-50 rounded-lg">
                <FiDollarSign className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="text-green-500 text-xs font-thin">+15% this month</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs font-thin">Total Revenue</div>
              <div className="text-gray-900 text-2xl font-thin">$245K</div>
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
              <p className="text-gray-500 text-xs font-thin">Revenue trends over the last 5 months</p>
            </div>
            <div className="h-64 relative">
              {/* Chart container with grid lines */}
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
              {/* Line chart representation */}
              <div 
                className="absolute bottom-8 left-0 right-0 h-32 relative"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const mouseX = e.clientX - rect.left;
                  const mouseY = e.clientY - rect.top;
                  
                  setMousePosition({ x: mouseX, y: mouseY });
                  
                  // Find closest data point based on mouse X position
                  const svgWidth = rect.width;
                  const relativeX = (mouseX / svgWidth) * 400; // Convert to SVG coordinates
                  
                  let closestPoint = revenueData[0];
                  let minDistance = Math.abs(relativeX - revenueData[0].x);
                  
                  revenueData.forEach(point => {
                    const distance = Math.abs(relativeX - point.x);
                    if (distance < minDistance) {
                      minDistance = distance;
                      closestPoint = point;
                    }
                  });
                  
                  setHoveredPoint(closestPoint);
                }}
                onMouseEnter={() => {
                  // Set initial point when entering chart area
                  if (!hoveredPoint) {
                    setHoveredPoint(revenueData[0]);
                  }
                }}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                <svg className="w-full h-full" viewBox="0 0 400 120">
                  {/* Invisible overlay for continuous hover */}
                  <rect 
                    x="0" 
                    y="0" 
                    width="400" 
                    height="120" 
                    fill="transparent" 
                    className="cursor-pointer"
                  />
                  
                  {/* Smooth curved line matching reference image */}
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
                
                {/* Continuous Mouse-tracking Tooltip */}
                {hoveredPoint && (
                  <div 
                    className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-3 pointer-events-none z-10 transition-all duration-150"
                    style={{
                      left: `${mousePosition.x}px`,
                      top: `${mousePosition.y - 60}px`,
                      transform: 'translate(-50%, 0)'
                    }}
                  >
                    <div className="text-sm font-medium text-gray-900">{hoveredPoint.month}</div>
                    <div className="text-sm text-green-600">revenue: ${hoveredPoint.value.toLocaleString()}</div>
                  </div>
                )}
              </div>
              {/* Month labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 px-4">
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
              </div>
            </div>
          </div>

          {/* Most Popular Events Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-normal text-gray-900 mb-2">Most Popular Events</h3>
              <p className="text-gray-500 text-xs font-thin">Events by participant count</p>
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
              
              {/* Bar chart with cursor tracking */}
              <div 
                className="absolute left-12 right-0 top-0 bottom-8 flex items-end justify-around gap-4"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const mouseX = e.clientX - rect.left;
                  const mouseY = e.clientY - rect.top;
                  
                  setBarMousePosition({ x: mouseX, y: mouseY });
                  
                  // Find which bar the mouse is over based on X position
                  const barWidth = rect.width / eventsData.length;
                  const barIndex = Math.floor(mouseX / barWidth);
                  
                  if (barIndex >= 0 && barIndex < eventsData.length) {
                    setHoveredBar(eventsData[barIndex]);
                  }
                }}
                onMouseEnter={() => {
                  // Set initial bar when entering chart area
                  if (!hoveredBar) {
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
                        transform: hoveredBar?.name === event.name ? 'scale(1.02)' : 'scale(1)'
                      }}
                    />
                  </div>
                ))}
                
                {/* Continuous Mouse-tracking Tooltip for Bar Chart */}
                {hoveredBar && (
                  <div 
                    className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-3 pointer-events-none z-10 transition-all duration-150"
                    style={{
                      left: `${barMousePosition.x}px`,
                      top: `${barMousePosition.y - 60}px`,
                      transform: 'translate(-50%, 0)'
                    }}
                  >
                    <div className="text-sm font-medium text-gray-900">{hoveredBar.name}</div>
                    <div className="text-sm text-blue-600">participants: {hoveredBar.participants.toLocaleString()}</div>
                  </div>
                )}
              </div>
              
              {/* X-axis labels */}
              <div className="absolute left-12 right-0 bottom-0 flex justify-around text-xs text-gray-500">
                {eventsData.map((event) => (
                  <span key={event.name} className="text-center flex-1 truncate px-1">
                    {event.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="container mx-auto px-6 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-sm font-thin text-gray-900 mb-6">Recent Activity</h1>
          
          <div className="space-y-3">
            {/* Activity Item 1 */}
            <div className="flex justify-between items-start py-4 px-4 bg-gray-100 rounded-lg">
              <div>
                <div className="text-sm font-thin text-gray-900 mb-1">New organizer registered</div>
                <div className="text-xs text-gray-500">John Smith</div>
              </div>
              <div className="text-xs text-gray-500">5 minutes ago</div>
            </div>

            {/* Activity Item 2 */}
            <div className="flex justify-between items-start py-4 px-4 bg-gray-100 rounded-lg">
              <div>
                <div className="text-sm font-thin text-gray-900 mb-1">Event approved</div>
                <div className="text-xs text-gray-500">Tech Innovation Summit</div>
              </div>
              <div className="text-xs text-gray-500">12 minutes ago</div>
            </div>

            {/* Activity Item 3 */}
            <div className="flex justify-between items-start py-4 px-4 bg-gray-100 rounded-lg">
              <div>
                <div className="text-sm font-thin text-gray-900 mb-1">New user registered</div>
                <div className="text-xs text-gray-500">Sarah Johnson</div>
              </div>
              <div className="text-xs text-gray-500">23 minutes ago</div>
            </div>

            {/* Activity Item 4 */}
            <div className="flex justify-between items-start py-4 px-4 bg-gray-100 rounded-lg">
              <div>
                <div className="text-sm font-thin text-gray-900 mb-1">Event created</div>
                <div className="text-xs text-gray-500">Marketing Masterclass</div>
              </div>
              <div className="text-xs text-gray-500">1 hour ago</div>
            </div>

            {/* Activity Item 5 */}
            <div className="flex justify-between items-start py-4 px-4 bg-gray-100 rounded-lg">
              <div>
                <div className="text-sm font-thin text-gray-900 mb-1">Payment processed</div>
                <div className="text-xs text-gray-500">$99.00</div>
              </div>
              <div className="text-xs text-gray-500">2 hours ago</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;