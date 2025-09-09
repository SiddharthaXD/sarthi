import React, { useState } from 'react';
import { Map, List, MapPin, Clock, Navigation, Filter } from 'lucide-react';

interface Route {
  id: string;
  name: string;
  from: string;
  to: string;
  distance: string;
  duration: string;
  stops: number;
  frequency: string;
  operatingHours: string;
  majorStops: string[];
}

const RoutesPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('list');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const routes: Route[] = [
    {
      id: '1',
      name: 'Chandigarh - Amritsar Express',
      from: 'Chandigarh',
      to: 'Amritsar',
      distance: '245 km',
      duration: '4h 30m',
      stops: 12,
      frequency: 'Every 30 mins',
      operatingHours: '05:00 - 23:30',
      majorStops: ['Chandigarh', 'Rajpura', 'Patiala', 'Sangrur', 'Bathinda', 'Amritsar']
    },
    {
      id: '2',
      name: 'Ludhiana - Jalandhar City',
      from: 'Ludhiana',
      to: 'Jalandhar',
      distance: '78 km',
      duration: '1h 45m',
      stops: 8,
      frequency: 'Every 20 mins',
      operatingHours: '05:30 - 22:00',
      majorStops: ['Ludhiana', 'Khanna', 'Doraha', 'Jalandhar']
    },
    {
      id: '3',
      name: 'Mohali - Patiala Heritage',
      from: 'Mohali',
      to: 'Patiala',
      distance: '65 km',
      duration: '1h 30m',
      stops: 6,
      frequency: 'Every 45 mins',
      operatingHours: '06:00 - 21:00',
      majorStops: ['Mohali', 'Zirakpur', 'Rajpura', 'Patiala']
    },
    {
      id: '4',
      name: 'Bathinda - Faridkot Loop',
      from: 'Bathinda',
      to: 'Faridkot',
      distance: '92 km',
      duration: '2h 15m',
      stops: 10,
      frequency: 'Every 1 hour',
      operatingHours: '05:45 - 20:30',
      majorStops: ['Bathinda', 'Mansa', 'Sardulgarh', 'Faridkot']
    },
    {
      id: '5',
      name: 'Ferozepur - Fazilka Border',
      from: 'Ferozepur',
      to: 'Fazilka',
      distance: '68 km',
      duration: '1h 50m',
      stops: 7,
      frequency: 'Every 2 hours',
      operatingHours: '07:00 - 19:00',
      majorStops: ['Ferozepur', 'Guru Har Sahai', 'Fazilka']
    }
  ];

  const regions = [
    { value: 'all', label: 'All Punjab' },
    { value: 'central', label: 'Central Punjab' },
    { value: 'eastern', label: 'Eastern Punjab' },
    { value: 'western', label: 'Western Punjab' },
    { value: 'northern', label: 'Northern Punjab' }
  ];

  const filteredRoutes = routes.filter(route => {
    const matchesSearch = route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         route.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         route.to.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Punjab Bus Routes</h1>
          <p className="text-xl text-gray-400">Comprehensive network of bus routes across Punjab</p>
        </div>

        {/* Controls */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Search */}
            <div className="flex-1 md:max-w-md">
              <div className="relative">
                <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search routes, cities..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters and View Toggle */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {regions.map(region => (
                    <option key={region.value} value={region.value}>
                      {region.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex bg-gray-700 rounded-md">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    viewMode === 'list'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white'
                  } rounded-l-md`}
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    viewMode === 'map'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white'
                  } rounded-r-md`}
                >
                  <Map className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'list' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredRoutes.map((route) => (
              <div key={route.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-white mb-2">{route.name}</h3>
                  <div className="flex items-center text-gray-300">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{route.from}</span>
                    <span className="mx-2">→</span>
                    <span>{route.to}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-400">Distance</div>
                    <div className="text-white font-medium">{route.distance}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Duration</div>
                    <div className="text-white font-medium">{route.duration}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Stops</div>
                    <div className="text-white font-medium">{route.stops} stops</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Frequency</div>
                    <div className="text-white font-medium">{route.frequency}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-400 mb-2">Operating Hours</div>
                  <div className="flex items-center text-white">
                    <Clock className="h-4 w-4 mr-2 text-blue-400" />
                    <span>{route.operatingHours}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-400 mb-2">Major Stops</div>
                  <div className="flex flex-wrap gap-2">
                    {route.majorStops.map((stop, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-700 text-sm text-gray-300 rounded-full"
                      >
                        {stop}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
                  View Route Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="h-96 bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Map className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Interactive Map View</h3>
                <p className="text-gray-400 mb-4">
                  Interactive map showing all bus routes across Punjab would be displayed here
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-300">Express Routes</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300">Local Routes</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-300">Tourist Routes</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-gray-300">Limited Service</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Route Statistics */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">150+</div>
            <div className="text-gray-300">Active Routes</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">500+</div>
            <div className="text-gray-300">Daily Trips</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">25</div>
            <div className="text-gray-300">Cities Connected</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-orange-400 mb-2">1000+</div>
            <div className="text-gray-300">Bus Stops</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutesPage;