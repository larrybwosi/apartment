'use client'
import { OccupancyChart } from '@/components/occupacy-chart';
import { Search, Calendar, ChevronLeft, ChevronRight, MoreHorizontal, ChevronDown, BarChart2, Monitor, MoreVertical } from 'lucide-react';
import { Fragment, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';


// Dashboard data object
const dashboardData = {
  stats: {
    totalBooking: {
      value: 12120,
      change: '+10%',
      period: '365 days'
    },
    checkIn: {
      value: 6190,
      change: '+16%',
      period: '365 days'
    },
    checkOut: {
      value: 4896,
      change: '-15%',
      period: '365 days'
    }
  },
  revenue: {
    total: 912120,
    offline: 612120,
    platform: 300000,
    sources: [
      { name: 'Booking.com', percentage: 90 },
      { name: 'Airbnb.com', percentage: 70 },
      { name: 'Agoda.com', percentage: 50 },
      { name: 'Hotels.com', percentage: 40 }
    ]
  },
  recentArrivals: [
    { roomNo: '105', name: 'Marvin McKinney', initial: 'M', time: '10 minutes ago' },
    { roomNo: '105', name: 'Albert Flores', initial: 'A', time: '2 minutes ago' },
    { roomNo: '107', name: 'Guy Hawkins', initial: 'G', time: '2 hours ago', special: true },
    { roomNo: '108', name: 'Brooklyn Simmons', initial: 'B', time: '12 hours ago' },
    { roomNo: '108', name: 'Cody Fisher', initial: 'C', time: '22 hours ago' },
    { roomNo: '108', name: 'Darlene Robertson', initial: 'D', time: '3 days ago', special: true }
  ],
  calendar: {
    days: ['01', '02', '03', '04', '05', '06', '07'],
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    rooms: [
      {
        roomNo: '100',
        guests: [
          { name: 'Arlene McCoy', initial: 'A', checkIn: '08:00 PM', checkOut: '11:30 PM' }
        ]
      },
      {
        roomNo: '101',
        guests: [
          { name: 'Hamid Khan', initial: 'H', checkIn: '08:00 PM' },
          { name: 'Lane David', initial: 'L', checkIn: '09:00 PM', note: 'child - 8 years old' }
        ]
      },
      {
        roomNo: '102',
        guests: [
          { name: 'Cody Fisher', initial: 'C', checkIn: '08:00 PM', checkOut: '11:30 PM' },
          { name: 'Darlene Robertson', initial: 'D', checkIn: '08:00 PM', special: true },
          { name: 'Brooklyn Simmons', initial: 'B', checkIn: '08:30 PM', checkOut: '11:30 PM' }
        ],
        type: 'family'
      },
      {
        roomNo: '103',
        guests: [
          { name: 'Floyd Miles', initial: 'F', checkIn: '08:00 PM', checkOut: '11:30 PM' },
          { name: 'Dianne Russell', initial: 'D', checkIn: '9:00 PM' }
        ],
        type: 'friends'
      }
    ]
  }
};

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [occupancyFilter, setOccupancyFilter] = useState('All Occupancy');
  const [timeFilter, setTimeFilter] = useState('30 Days');
  const [viewType, setViewType] = useState('bar');
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const handleFilterClick = (filter: string) => {
    setDropdownOpen(dropdownOpen === filter ? null : filter);
  };

  return (
    <div className="bg-white p-6">
      {/* Main layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left content area */}
        <div className="w-full md:w-3/5 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="py-1.5 px-3 pr-8 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <span className="bg-gray-100 px-2 py-1 rounded text-xs">⌘F</span>
              <button className="text-gray-600 hover:bg-gray-100 p-1 rounded-full transition-colors duration-200">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="text-sm text-gray-500 mb-1">Total Booking</div>
                <div className="text-3xl font-bold mb-1">{dashboardData.stats.totalBooking.value.toLocaleString()}</div>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500">Total Booking last {dashboardData.stats.totalBooking.period}</span>
                  <span className="ml-auto text-xs text-green-500">{dashboardData.stats.totalBooking.change}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="text-sm text-gray-500 mb-1">Check In</div>
                <div className="text-3xl font-bold mb-1 flex items-center">
                  {dashboardData.stats.checkIn.value.toLocaleString()}
                  <svg className="w-4 h-4 ml-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500">Check In last {dashboardData.stats.checkIn.period}</span>
                  <span className="ml-auto text-xs text-green-500">{dashboardData.stats.checkIn.change}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="text-sm text-gray-500 mb-1">Check Out</div>
                <div className="text-3xl font-bold mb-1 flex items-center">
                  {dashboardData.stats.checkOut.value.toLocaleString()}
                  <svg className="w-4 h-4 ml-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500">Check Out last {dashboardData.stats.checkOut.period}</span>
                  <span className="ml-auto text-xs text-red-500">{dashboardData.stats.checkOut.change}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Occupancy Section */}
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="p-4 pb-0">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold">Occupancy</CardTitle>
                <div className="flex items-center">
                  <div className="relative">
                    <button 
                      onClick={() => handleFilterClick('occupancy')}
                      className={`flex items-center justify-center border ${hoveredButton === 'occupancy' ? 'bg-gray-50' : ''} rounded-l-md px-3 py-1 text-sm transition-colors duration-200`}
                      onMouseEnter={() => setHoveredButton('occupancy')}
                      onMouseLeave={() => setHoveredButton(null)}
                    >
                      {occupancyFilter} <ChevronDown className="w-4 h-4 ml-2" />
                    </button>
                    {dropdownOpen === 'occupancy' && (
                      <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md z-10 border p-1 w-40">
                        {['All Occupancy', 'Available', 'Occupied', 'Not Ready'].map((item) => (
                          <div 
                            key={item}
                            className="px-3 py-1.5 hover:bg-gray-100 rounded cursor-pointer text-sm"
                            onClick={() => {
                              setOccupancyFilter(item);
                              setDropdownOpen(null);
                            }}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <button 
                      onClick={() => handleFilterClick('timeFilter')}
                      className={`flex items-center justify-center border-t border-b border-r px-3 py-1 text-sm ${hoveredButton === 'timeFilter' ? 'bg-gray-50' : ''} transition-colors duration-200`}
                      onMouseEnter={() => setHoveredButton('timeFilter')}
                      onMouseLeave={() => setHoveredButton(null)}
                    >
                      {timeFilter} <ChevronDown className="w-4 h-4 ml-2" />
                    </button>
                    {dropdownOpen === 'timeFilter' && (
                      <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md z-10 border p-1 w-32">
                        {['7 Days', '30 Days', '90 Days', '365 Days'].map((item) => (
                          <div 
                            key={item}
                            className="px-3 py-1.5 hover:bg-gray-100 rounded cursor-pointer text-sm"
                            onClick={() => {
                              setTimeFilter(item);
                              setDropdownOpen(null);
                            }}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <button 
                    className={`border rounded-r-md p-1 ml-1 ${hoveredButton === 'viewType' ? 'bg-gray-50' : ''} transition-colors duration-200`}
                    onClick={() => setViewType(viewType === 'bar' ? 'line' : 'bar')}
                    onMouseEnter={() => setHoveredButton('viewType')}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <BarChart2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-4">
              {/* Occupancy Legend */}
              <div className="flex items-center mb-2 text-xs">
                <div className="flex items-center mr-4">
                  <div className="w-3 h-3 bg-green-600 mr-1"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center mr-4">
                  <div className="w-3 h-3 bg-gray-400 mr-1"></div>
                  <span>Occupied</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-200 mr-1"></div>
                  <span>Not Ready</span>
                </div>
              </div>

              {/* Occupancy Chart */}
              <OccupancyChart/>
            </CardContent>
          </Card>

          {/* Revenue and Recent Arrivals Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Revenue Overview */}
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardHeader className="p-4 pb-0">
                <CardTitle className="text-lg font-semibold">Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Total Revenue</div>
                    <div className="text-2xl font-bold">${dashboardData.revenue.total.toLocaleString()}</div>
                  </div>
                  <div className="relative">
                    <button 
                      onClick={() => handleFilterClick('revenueTime')}
                      className={`flex items-center border rounded-md px-3 py-1 text-sm ${hoveredButton === 'revenueTime' ? 'bg-gray-50' : ''} transition-colors duration-200`}
                      onMouseEnter={() => setHoveredButton('revenueTime')}
                      onMouseLeave={() => setHoveredButton(null)}
                    >
                      {timeFilter} <ChevronDown className="w-4 h-4 ml-2" />
                    </button>
                    {dropdownOpen === 'revenueTime' && (
                      <div className="absolute top-full right-0 mt-1 bg-white shadow-lg rounded-md z-10 border p-1 w-32">
                        {['7 Days', '30 Days', '90 Days', '365 Days'].map((item) => (
                          <div 
                            key={item}
                            className="px-3 py-1.5 hover:bg-gray-100 rounded cursor-pointer text-sm"
                            onClick={() => {
                              setTimeFilter(item);
                              setDropdownOpen(null);
                            }}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Revenue Cards */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="border rounded-md p-4 flex items-start hover:shadow-sm transition-shadow duration-200">
                    <div className="mr-2 p-2 bg-gray-100 rounded-md">
                      <BarChart2 className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Offline Revenue</div>
                      <div className="text-xl font-bold">${dashboardData.revenue.offline.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="border rounded-md p-4 flex items-start hover:shadow-sm transition-shadow duration-200">
                    <div className="mr-2 p-2 bg-gray-100 rounded-md">
                      <Monitor className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Platform Revenue</div>
                      <div className="text-xl font-bold">${dashboardData.revenue.platform.toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                {/* Booking Sources */}
                <div className="space-y-3">
                  <div className="text-sm font-medium mb-2">Booking Sources</div>
                  {dashboardData.revenue.sources.map((source, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">{source.name}</span>
                        <span className="text-sm">{source.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-3 overflow-hidden">
                        <div 
                          className={`h-2 rounded-full ${
                            source.name === 'Booking.com' ? 'bg-green-500' : 
                            source.name === 'Airbnb.com' ? 'bg-red-400' : 
                            source.name === 'Agoda.com' ? 'bg-yellow-500' : 'bg-purple-500'
                          }`} 
                          style={{ width: `${source.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Arrivals */}
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardHeader className="p-4 pb-0">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold">Recent Arrivals</CardTitle>
                  <a href="/guests" className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200">View All</a>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <table className="w-full mb-1">
                  <thead>
                    <tr className="text-left text-sm text-gray-500">
                      <th className="pb-2">R. No</th>
                      <th className="pb-2">Name</th>
                      <th className="pb-2">Time</th>
                      <th className="pb-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.recentArrivals.map((arrival, index) => (
                      <tr 
                        key={index} 
                        className={`${index < dashboardData.recentArrivals.length - 1 ? "border-b" : ""} ${hoveredRow === index ? 'bg-gray-50' : ''} transition-colors duration-150`}
                        onMouseEnter={() => setHoveredRow(index)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        <td className="py-2">#{arrival.roomNo}</td>
                        <td className="py-2 flex items-center">
                          <div className={`w-6 h-6 rounded-full ${arrival.special ? 'bg-green-100 text-green-600' : 'bg-gray-300'} mr-2 flex items-center justify-center text-xs`}>
                            {arrival.initial}
                          </div>
                          {arrival.name}
                        </td>
                        <td className="py-2 text-sm text-gray-500">{arrival.time}</td>
                        <td className="py-2 text-center relative">
                          <button 
                            className="hover:bg-gray-100 rounded-full p-1 transition-colors duration-200"
                            onClick={() => handleFilterClick(`actions-${index}`)}
                          >
                            <MoreVertical className="w-4 h-4 text-gray-500" />
                          </button>
                          {dropdownOpen === `actions-${index}` && (
                            <div className="absolute right-0 mt-0 bg-white shadow-lg rounded-md z-10 border p-1 w-36">
                              <div className="px-3 py-1.5 hover:bg-gray-100 rounded cursor-pointer text-sm">View Details</div>
                              <div className="px-3 py-1.5 hover:bg-gray-100 rounded cursor-pointer text-sm">Contact Guest</div>
                              <div className="px-3 py-1.5 hover:bg-red-50 rounded cursor-pointer text-sm text-red-600">Cancel Booking</div>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right sidebar - Calendar */}
        <div className="w-full md:w-2/5">
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="p-4 pb-0">
              <div className="flex justify-between items-center">
                <CardTitle className="font-semibold">Calendar</CardTitle>
                <div className="flex items-center text-xs">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Every Check-out at 12:00 PM</span>
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-1">Recent schedule of 12 rooms</div>
            </CardHeader>
            <CardContent className="p-4">
              {/* Calendar Navigation */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <button className="border rounded-l-md p-1 hover:bg-gray-50 transition-colors duration-200">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <div className="px-3 py-1 border-t border-b">
                    <span className="font-medium">7 days</span> of November 2024 (1-7)
                  </div>
                  <button className="border rounded-r-md p-1 hover:bg-gray-50 transition-colors duration-200">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="relative">
                  <button 
                    onClick={() => handleFilterClick('roomFilter')}
                    className={`flex items-center text-sm ${hoveredButton === 'roomFilter' ? 'text-blue-600' : ''} transition-colors duration-200`}
                    onMouseEnter={() => setHoveredButton('roomFilter')}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <span>Room #100-103</span>
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </button>
                  {dropdownOpen === 'roomFilter' && (
                    <div className="absolute top-full right-0 mt-1 bg-white shadow-lg rounded-md z-10 border p-1 w-36">
                      <div className="px-3 py-1.5 hover:bg-gray-100 rounded cursor-pointer text-sm">Room #100-103</div>
                      <div className="px-3 py-1.5 hover:bg-gray-100 rounded cursor-pointer text-sm">Room #104-107</div>
                      <div className="px-3 py-1.5 hover:bg-gray-100 rounded cursor-pointer text-sm">Room #108-112</div>
                      <div className="px-3 py-1.5 hover:bg-gray-100 rounded cursor-pointer text-sm">All Rooms</div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Bed Selection */}
              <div className="flex space-x-2 mb-4">
                <button className="border rounded-md px-3 py-1 hover:bg-gray-50 transition-colors duration-200 text-sm">
                  1 Bed (10)
                </button>
                <button className="border rounded-md px-3 py-1 bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-200 text-sm">
                  2 Beds (6)
                </button>
                <button className="border rounded-md px-3 py-1 hover:bg-gray-50 transition-colors duration-200 text-sm">
                  3 Beds (5)
                </button>
              </div>
              
              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {dashboardData.calendar.days.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-sm">{day}</div>
                    <div className="text-xs text-gray-500">{dashboardData.calendar.weekdays[index]}</div>
                  </div>
                ))}
              </div>
              
              {/* Room Bookings */}
              <div className="space-y-3">
                {dashboardData.calendar.rooms.map((room, roomIndex) => (
                  <Fragment key={roomIndex}>
                    {room.type === 'family' && (
                      <div className="flex items-center mt-2">
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <div className="mx-4 text-xs text-gray-400">F A M I L Y</div>
                        <div className="flex-1 h-px bg-gray-200"></div>
                      </div>
                    )}
                    {room.type === 'friends' && (
                      <div className="flex items-center mt-2">
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <div className="mx-4 text-xs text-gray-400">F R I E N D S</div>
                        <div className="flex-1 h-px bg-gray-200"></div>
                      </div>
                    )}
                    
                    <div className="border-t pt-2">
                      <div className="text-xs text-gray-500 mb-1">Room #{room.roomNo}</div>
                      {room.guests.map((guest, guestIndex) => (
                        <div className="flex mb-1" key={guestIndex}>
                          <div className="flex-1 bg-gray-100 rounded p-2 flex items-center hover:bg-gray-50 transition-colors duration-200">
                            <div className={`w-6 h-6 rounded-full ${guest?.special ? 'bg-purple-300 text-purple-700' : 'bg-gray-300'} mr-2 flex items-center justify-center text-xs`}>
                              {guest.initial}
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium">{guest.name}</div>
                              <div className="text-xs text-gray-500">
                                Check-in at {guest.checkIn}{guest?.checkOut ? `, Out at ${guest?.checkOut}` : ''}
                              </div>
                            </div>
                            {guest?.note && <div className="text-xs text-gray-500">{guest?.note}</div>}
                          </div>
                          {guestIndex === 0 && (
                            <div className="flex-1 ml-2 bg-green-50 border border-dashed border-green-300 rounded hover:bg-green-100 transition-colors duration-200"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </Fragment>
                ))}
                
                <div className="text-center mt-4">
                  <button className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200">Full View</button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;