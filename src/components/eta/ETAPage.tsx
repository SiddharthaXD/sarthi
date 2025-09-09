import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Navigation, AlertTriangle, CheckCircle, Bus } from 'lucide-react';

interface BusTracking {
  id: string;
  busNumber: string;
  route: string;
  currentLocation: string;
  destination: string;
  eta: string;
  delay: number;
  status: 'on-time' | 'delayed' | 'arrived';
  nextStops: string[];
  lastUpdated: string;
  coordinates: { lat: number; lng: number };
  capacity: { total: number; occupied: number };
}

const ETAPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBus, setSelectedBus] = useState<BusTracking | null>(null);
  const [trackingData, setTrackingData] = useState<BusTracking[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const mockTrackingData: BusTracking[] = [
    {
      id: '1',
      busNumber: 'PB-01-A-1234',
      route: 'Chandigarh → Amritsar',
      currentLocation: 'Rajpura Bus Stand',
      destination: 'Amritsar Golden Temple',
      eta: '45 min',
      delay: 0,
      status: 'on-time',
      nextStops: ['Patiala', 'Sangrur', 'Bathinda', 'Amritsar'],
      lastUpdated: '2 min ago',
      coordinates: { lat: 30.4834, lng: 76.5940 },
      capacity: { total: 40, occupied: 28 }
    },
    {
      id: '2',
      busNumber: 'PB-02-B-5678',
      route: 'Ludhiana → Jalandhar',
      currentLocation: 'Khanna Junction',
      destination: 'Jalandhar City Center',
      eta: '22 min',
      delay: 5,
      status: 'delayed',
      nextStops: ['Doraha', 'Jalandhar'],
      lastUpdated: '1 min ago',
      coordinates: { lat: 30.7058, lng: 76.2211 },
      capacity: { total: 32, occupied: 15 }
    },
    {
      id: '3',
      busNumber: 'PB-03-C-9101',
      route: 'Mohali → Patiala',
      currentLocation: 'Patiala Bus Terminal',
      destination: 'Patiala Bus Terminal',
      eta: 'Arrived',
      delay: 0,
      status: 'arrived',
      nextStops: [],
      lastUpdated: 'Just now',
      coordinates: { lat: 30.3398, lng: 76.3869 },
      capacity: { total: 35, occupied: 35 }
    }
  ];

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setTrackingData(prev => prev.map(bus => ({
        ...bus,
        lastUpdated: Math.random() > 0.7 ? 'Just now' : bus.lastUpdated,
        delay: bus.status === 'delayed' ? Math.max(0, bus.delay + (Math.random() > 0.5 ? 1 : -1)) : bus.delay
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setTrackingData(mockTrackingData);
      setIsLoading(false);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-time': return 'text-green-400';
      case 'delayed': return 'text-orange-400';
      case 'arrived': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-time': return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'delayed': return <AlertTriangle className="h-5 w-5 text-orange-400" />;
      case 'arrived': return <CheckCircle className="h-5 w-5 text-blue-400" />;
      default: return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const filteredBuses = trackingData.filter(bus =>
    bus.busNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bus.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bus.currentLocation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Live Bus Tracking</h1>
          <p className="text-xl text-gray-400">Track your bus in real-time and get accurate ETAs</p>
        </div>

        {/* Search */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter bus number, route, or current location..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Tracking...' : 'Track Bus'}
            </button>
          </div>
        </div>

        {/* Live Tracking Results */}
        {trackingData.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Live Bus Locations</h2>
              <div className="text-sm text-gray-400">
                Last updated: {Math.max(...trackingData.map(bus => 
                  bus.lastUpdated === 'Just now' ? 0 : 
                  parseInt(bus.lastUpdated.split(' ')[0]) || 0
                )) === 0 ? 'Just now' : `${Math.max(...trackingData.map(bus => 
                  parseInt(bus.lastUpdated.split(' ')[0]) || 0
                ))} min ago`}
              </div>
            </div>

            {/* Map View */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <Navigation className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400">Live tracking map would be displayed here</p>
                  <p className="text-sm text-gray-500 mt-1">Showing real-time locations of all tracked buses</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300">On Time</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-300">Delayed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-300">Arrived</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  <span className="text-gray-300">Bus Stops</span>
                </div>
              </div>
            </div>

            {/* Bus List */}
            <div className="grid grid-cols-1 gap-4">
              {filteredBuses.map((bus) => (
                <div
                  key={bus.id}
                  className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors cursor-pointer"
                  onClick={() => setSelectedBus(bus)}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-white">{bus.busNumber}</h3>
                          <div className="flex items-center text-gray-300 mt-1">
                            <Navigation className="h-4 w-4 mr-1" />
                            <span>{bus.route}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(bus.status)}
                          <span className={`text-sm font-medium ${getStatusColor(bus.status)}`}>
                            {bus.status === 'on-time' ? 'On Time' : 
                             bus.status === 'delayed' ? `${bus.delay}min Delay` : 'Arrived'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-5 w-5 text-blue-400" />
                          <div>
                            <div className="text-white font-medium">Current Location</div>
                            <div className="text-sm text-gray-400">{bus.currentLocation}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Clock className="h-5 w-5 text-green-400" />
                          <div>
                            <div className="text-white font-medium">ETA</div>
                            <div className="text-sm text-gray-400">{bus.eta}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Bus className="h-5 w-5 text-purple-400" />
                          <div>
                            <div className="text-white font-medium">Occupancy</div>
                            <div className="text-sm text-gray-400">
                              {bus.capacity.occupied}/{bus.capacity.total} seats
                            </div>
                          </div>
                        </div>
                      </div>

                      {bus.nextStops.length > 0 && (
                        <div>
                          <div className="text-sm text-gray-400 mb-2">Next Stops</div>
                          <div className="flex flex-wrap gap-2">
                            {bus.nextStops.slice(0, 4).map((stop, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-700 text-xs text-gray-300 rounded"
                              >
                                {stop}
                              </span>
                            ))}
                            {bus.nextStops.length > 4 && (
                              <span className="px-2 py-1 bg-gray-700 text-xs text-gray-300 rounded">
                                +{bus.nextStops.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col space-y-2 lg:w-32">
                      <div className="text-right">
                        <div className="text-sm text-gray-400">Last Updated</div>
                        <div className="text-white font-medium">{bus.lastUpdated}</div>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bus Details Modal */}
        {selectedBus && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedBus.busNumber}</h2>
                    <p className="text-gray-300">{selectedBus.route}</p>
                  </div>
                  <button
                    onClick={() => setSelectedBus(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Current Status</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-5 w-5 text-blue-400" />
                        <div>
                          <div className="text-white">Location</div>
                          <div className="text-gray-400 text-sm">{selectedBus.currentLocation}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-green-400" />
                        <div>
                          <div className="text-white">ETA</div>
                          <div className="text-gray-400 text-sm">{selectedBus.eta}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(selectedBus.status)}
                        <div>
                          <div className="text-white">Status</div>
                          <div className={`text-sm ${getStatusColor(selectedBus.status)}`}>
                            {selectedBus.status === 'on-time' ? 'On Time' : 
                             selectedBus.status === 'delayed' ? `${selectedBus.delay} min Delayed` : 'Arrived'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Bus Details</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="text-white">Destination</div>
                        <div className="text-gray-400 text-sm">{selectedBus.destination}</div>
                      </div>
                      <div>
                        <div className="text-white">Seat Availability</div>
                        <div className="text-gray-400 text-sm">
                          {selectedBus.capacity.total - selectedBus.capacity.occupied} seats available
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${(selectedBus.capacity.occupied / selectedBus.capacity.total) * 100}%`
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="text-white">Last Updated</div>
                        <div className="text-gray-400 text-sm">{selectedBus.lastUpdated}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedBus.nextStops.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Upcoming Stops</h3>
                    <div className="space-y-2">
                      {selectedBus.nextStops.map((stop, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-700 rounded-md"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                              {index + 1}
                            </div>
                            <span className="text-white">{stop}</span>
                          </div>
                          <span className="text-gray-400 text-sm">
                            ~{(index + 1) * 15} min
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-700 grid grid-cols-2 gap-4">
                  <button className="px-4 py-3 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 transition-colors">
                    Set Alert
                  </button>
                  <button className="px-4 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
                    Share Location
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Results */}
        {trackingData.length === 0 && searchQuery && !isLoading && (
          <div className="text-center py-12">
            <Bus className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No buses found</h3>
            <p className="text-gray-400">Try searching with a different bus number or route</p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-gray-700 rounded-lg text-left hover:bg-gray-600 transition-colors">
              <AlertTriangle className="h-6 w-6 text-orange-400 mb-2" />
              <div className="text-white font-medium">Report Delay</div>
              <div className="text-gray-400 text-sm">Report if your bus is running late</div>
            </button>
            
            <button className="p-4 bg-gray-700 rounded-lg text-left hover:bg-gray-600 transition-colors">
              <MapPin className="h-6 w-6 text-blue-400 mb-2" />
              <div className="text-white font-medium">Find Nearest Stop</div>
              <div className="text-gray-400 text-sm">Locate the closest bus stop</div>
            </button>
            
            <button className="p-4 bg-gray-700 rounded-lg text-left hover:bg-gray-600 transition-colors">
              <CheckCircle className="h-6 w-6 text-green-400 mb-2" />
              <div className="text-white font-medium">Travel History</div>
              <div className="text-gray-400 text-sm">View your past bus journeys</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ETAPage;