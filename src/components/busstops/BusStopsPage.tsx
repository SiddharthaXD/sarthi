import React, { useState } from 'react';
import { MapPin, Search, Navigation, Clock, Bus, Map } from 'lucide-react';

interface BusStop {
  id: string;
  name: string;
  city: string;
  address: string;
  coordinates: { lat: number; lng: number };
  facilities: string[];
  busRoutes: string[];
  nextBuses: {
    route: string;
    destination: string;
    eta: string;
  }[];
  isActive: boolean;
}

const BusStopsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedStop, setSelectedStop] = useState<BusStop | null>(null);

  const busStops: BusStop[] = [
    {
      id: '1',
      name: 'City Center Bus Terminal',
      city: 'Ludhiana',
      address: 'Mall Road, Ludhiana, Punjab 141001',
      coordinates: { lat: 30.9010, lng: 75.8573 },
      facilities: ['Waiting Area', 'Restrooms', 'Food Court', 'ATM', 'Parking'],
      busRoutes: ['Route 101', 'Route 205', 'Route 308'],
      nextBuses: [
        { route: 'Route 101', destination: 'Jalandhar', eta: '5 min' },
        { route: 'Route 205', destination: 'Chandigarh', eta: '12 min' },
        { route: 'Route 308', destination: 'Amritsar', eta: '18 min' }
      ],
      isActive: true
    },
    {
      id: '2',
      name: 'Railway Station Bus Stop',
      city: 'Bathinda',
      address: 'Near Railway Station, Bathinda, Punjab 151001',
      coordinates: { lat: 30.2118, lng: 74.9455 },
      facilities: ['Waiting Area', 'Ticket Counter', 'Security'],
      busRoutes: ['Route 401', 'Route 502'],
      nextBuses: [
        { route: 'Route 401', destination: 'Faridkot', eta: '8 min' },
        { route: 'Route 502', destination: 'Mansa', eta: '25 min' }
      ],
      isActive: true
    },
    {
      id: '3',
      name: 'University Campus Stop',
      city: 'Patiala',
      address: 'Punjabi University, Patiala, Punjab 147002',
      coordinates: { lat: 30.3398, lng: 76.3869 },
      facilities: ['Waiting Area', 'Student Concession', 'Information Desk'],
      busRoutes: ['Route 201', 'Route 203', 'Route 207'],
      nextBuses: [
        { route: 'Route 201', destination: 'Chandigarh', eta: '3 min' },
        { route: 'Route 203', destination: 'Rajpura', eta: '15 min' },
        { route: 'Route 207', destination: 'Sangrur', eta: '22 min' }
      ],
      isActive: true
    },
    {
      id: '4',
      name: 'Golden Temple Complex',
      city: 'Amritsar',
      address: 'Near Golden Temple, Amritsar, Punjab 143006',
      coordinates: { lat: 31.6200, lng: 74.8765 },
      facilities: ['Waiting Area', 'Restrooms', 'Information Center', 'Security', 'Refreshments'],
      busRoutes: ['Route 501', 'Route 505', 'Route 510'],
      nextBuses: [
        { route: 'Route 501', destination: 'Chandigarh', eta: '7 min' },
        { route: 'Route 505', destination: 'Jalandhar', eta: '11 min' },
        { route: 'Route 510', destination: 'Ludhiana', eta: '16 min' }
      ],
      isActive: true
    },
    {
      id: '5',
      name: 'Industrial Area Bus Stop',
      city: 'Moga',
      address: 'Industrial Area, Moga, Punjab 142001',
      coordinates: { lat: 30.8162, lng: 75.1725 },
      facilities: ['Basic Shelter', 'Security'],
      busRoutes: ['Route 601', 'Route 603'],
      nextBuses: [
        { route: 'Route 601', destination: 'Ferozepur', eta: '14 min' },
        { route: 'Route 603', destination: 'Faridkot', eta: '28 min' }
      ],
      isActive: true
    }
  ];

  const cities = ['All Cities', ...Array.from(new Set(busStops.map(stop => stop.city))).sort()];

  const filteredStops = busStops.filter(stop => {
    const matchesSearch = stop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         stop.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         stop.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === 'all' || selectedCity === 'All Cities' || stop.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Bus Stops in Punjab</h1>
          <p className="text-xl text-gray-400">Find bus stops across tier-2 cities with live information</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Search */}
            <div className="flex-1 md:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search bus stops, cities..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* City Filter and View Toggle */}
            <div className="flex items-center space-x-4">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {cities.map(city => (
                  <option key={city} value={city === 'All Cities' ? 'all' : city}>
                    {city}
                  </option>
                ))}
              </select>

              <div className="flex bg-gray-700 rounded-md">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 text-sm font-medium transition-colors flex items-center space-x-2 ${
                    viewMode === 'list'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white'
                  } rounded-l-md`}
                >
                  <Bus className="h-4 w-4" />
                  <span>List</span>
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`px-4 py-2 text-sm font-medium transition-colors flex items-center space-x-2 ${
                    viewMode === 'map'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white'
                  } rounded-r-md`}
                >
                  <Map className="h-4 w-4" />
                  <span>Map</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'list' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredStops.map((stop) => (
              <div
                key={stop.id}
                className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors cursor-pointer"
                onClick={() => setSelectedStop(stop)}
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-white">{stop.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      stop.isActive ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                    }`}>
                      {stop.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-blue-400 font-medium">{stop.city}</span>
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{stop.address}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Facilities</div>
                    <div className="flex flex-wrap gap-1">
                      {stop.facilities.slice(0, 3).map((facility) => (
                        <span
                          key={facility}
                          className="px-2 py-1 bg-gray-700 text-xs text-gray-300 rounded"
                        >
                          {facility}
                        </span>
                      ))}
                      {stop.facilities.length > 3 && (
                        <span className="px-2 py-1 bg-gray-700 text-xs text-gray-300 rounded">
                          +{stop.facilities.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Bus Routes</div>
                    <div className="flex flex-wrap gap-1">
                      {stop.busRoutes.map((route) => (
                        <span
                          key={route}
                          className="px-2 py-1 bg-blue-600 text-xs text-white rounded"
                        >
                          {route}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-400 mb-2 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Next Buses
                  </div>
                  <div className="space-y-2">
                    {stop.nextBuses.slice(0, 2).map((bus, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-medium">{bus.route}</span>
                          <Navigation className="h-3 w-3 text-gray-400" />
                          <span className="text-gray-300">{bus.destination}</span>
                        </div>
                        <span className="text-green-400 font-medium">{bus.eta}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="h-96 bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Map className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Interactive Bus Stop Map</h3>
                <p className="text-gray-400 mb-4">
                  Interactive map showing all bus stops across Punjab would be displayed here
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300">Active Stops</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-300">Major Terminals</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-300">Tourist Areas</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-300">University Stops</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bus Stop Details Modal */}
        {selectedStop && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">{selectedStop.name}</h2>
                  <button
                    onClick={() => setSelectedStop(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ×
                  </button>
                </div>
                <div className="flex items-center text-gray-300 mt-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-blue-400">{selectedStop.city}</span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Address</h3>
                  <p className="text-gray-300">{selectedStop.address}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Facilities</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedStop.facilities.map((facility) => (
                      <div
                        key={facility}
                        className="flex items-center space-x-2 text-gray-300"
                      >
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Bus Routes</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedStop.busRoutes.map((route) => (
                      <span
                        key={route}
                        className="px-3 py-2 bg-blue-600 text-white rounded-md font-medium"
                      >
                        {route}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Live Bus Timings
                  </h3>
                  <div className="space-y-3">
                    {selectedStop.nextBuses.map((bus, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-700 rounded-md"
                      >
                        <div className="flex items-center space-x-3">
                          <Bus className="h-5 w-5 text-blue-400" />
                          <div>
                            <div className="text-white font-medium">{bus.route}</div>
                            <div className="text-gray-400 text-sm">to {bus.destination}</div>
                          </div>
                        </div>
                        <div className="text-green-400 font-semibold">{bus.eta}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <button className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">{busStops.length}+</div>
            <div className="text-gray-300">Bus Stops</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">{cities.length - 1}</div>
            <div className="text-gray-300">Cities Covered</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
            <div className="text-gray-300">Live Updates</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-orange-400 mb-2">95%</div>
            <div className="text-gray-300">Accuracy</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusStopsPage;