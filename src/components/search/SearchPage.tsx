import React, { useState } from 'react';
import { Search, Filter, MapPin, Clock, Star, Bus, Users } from 'lucide-react';

interface SearchFilters {
  route: string;
  timing: string;
  operator: string;
  busType: string;
  priceRange: string;
  amenities: string[];
}

interface BusResult {
  id: string;
  operator: string;
  route: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  seatsAvailable: number;
  rating: number;
  amenities: string[];
  busType: string;
  nextDeparture: string;
}

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    route: '',
    timing: '',
    operator: '',
    busType: '',
    priceRange: '',
    amenities: []
  });
  const [searchResults, setSearchResults] = useState<BusResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const mockResults: BusResult[] = [
    {
      id: '1',
      operator: 'Punjab Roadways',
      route: 'Chandigarh → Amritsar',
      departureTime: '06:30',
      arrivalTime: '10:15',
      duration: '3h 45m',
      price: 450,
      seatsAvailable: 15,
      rating: 4.2,
      amenities: ['AC', 'WiFi', 'Charging Port'],
      busType: 'Semi-Sleeper',
      nextDeparture: 'Today, 6:30 AM'
    },
    {
      id: '2',
      operator: 'Express Travels',
      route: 'Ludhiana → Jalandhar',
      departureTime: '08:00',
      arrivalTime: '09:45',
      duration: '1h 45m',
      price: 180,
      seatsAvailable: 8,
      rating: 4.5,
      amenities: ['AC', 'WiFi', 'Charging Port', 'Entertainment'],
      busType: 'Volvo AC',
      nextDeparture: 'Today, 8:00 AM'
    },
    {
      id: '3',
      operator: 'City Bus Service',
      route: 'Mohali → Patiala',
      departureTime: '14:20',
      arrivalTime: '15:50',
      duration: '1h 30m',
      price: 120,
      seatsAvailable: 22,
      rating: 4.0,
      amenities: ['AC', 'Charging Port'],
      busType: 'Semi-Sleeper',
      nextDeparture: 'Today, 2:20 PM'
    },
    {
      id: '4',
      operator: 'Heritage Express',
      route: 'Bathinda → Faridkot',
      departureTime: '11:00',
      arrivalTime: '13:15',
      duration: '2h 15m',
      price: 220,
      seatsAvailable: 12,
      rating: 4.3,
      amenities: ['AC', 'WiFi', 'Snacks'],
      busType: 'Luxury',
      nextDeparture: 'Today, 11:00 AM'
    }
  ];

  const operators = ['All Operators', 'Punjab Roadways', 'Express Travels', 'City Bus Service', 'Heritage Express'];
  const busTypes = ['All Types', 'AC Sleeper', 'Semi-Sleeper', 'Volvo AC', 'Luxury'];
  const timings = ['All Times', 'Early Morning (5-8 AM)', 'Morning (8-12 PM)', 'Afternoon (12-5 PM)', 'Evening (5-10 PM)'];
  const priceRanges = ['All Prices', 'Under ₹200', '₹200-₹500', '₹500-₹1000', 'Above ₹1000'];
  const availableAmenities = ['AC', 'WiFi', 'Charging Port', 'Entertainment', 'Snacks', 'Blanket', 'Reading Light'];

  const handleSearch = () => {
    setIsSearching(true);
    
    setTimeout(() => {
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1500);
  };

  const handleFilterChange = (key: keyof SearchFilters, value: string | string[]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleAmenityToggle = (amenity: string) => {
    const currentAmenities = filters.amenities;
    const newAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter(a => a !== amenity)
      : [...currentAmenities, amenity];
    
    handleFilterChange('amenities', newAmenities);
  };

  const clearFilters = () => {
    setFilters({
      route: '',
      timing: '',
      operator: '',
      busType: '',
      priceRange: '',
      amenities: []
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Search Buses</h1>
          <p className="text-xl text-gray-400">Find the perfect bus for your journey</p>
        </div>

        {/* Search Bar */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by route, operator, or city..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-6 py-3 border border-gray-600 rounded-md font-medium transition-colors flex items-center space-x-2 ${
                  showFilters ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white hover:border-gray-500'
                }`}
              >
                <Filter className="h-5 w-5" />
                <span>Filters</span>
              </button>
              
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
              >
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Filters</h3>
              <button
                onClick={clearFilters}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
              >
                Clear All
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Operator</label>
                <select
                  value={filters.operator}
                  onChange={(e) => handleFilterChange('operator', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {operators.map(operator => (
                    <option key={operator} value={operator === 'All Operators' ? '' : operator}>
                      {operator}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Bus Type</label>
                <select
                  value={filters.busType}
                  onChange={(e) => handleFilterChange('busType', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {busTypes.map(type => (
                    <option key={type} value={type === 'All Types' ? '' : type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Timing</label>
                <select
                  value={filters.timing}
                  onChange={(e) => handleFilterChange('timing', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {timings.map(timing => (
                    <option key={timing} value={timing === 'All Times' ? '' : timing}>
                      {timing}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Price Range</label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {priceRanges.map(range => (
                    <option key={range} value={range === 'All Prices' ? '' : range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-300 mb-3">Amenities</label>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {availableAmenities.map(amenity => (
                  <button
                    key={amenity}
                    onClick={() => handleAmenityToggle(amenity)}
                    className={`px-3 py-2 text-sm rounded-md transition-colors ${
                      filters.amenities.includes(amenity)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Search Results</h2>
              <span className="text-gray-400">{searchResults.length} buses found</span>
            </div>

            {searchResults.map((bus) => (
              <div key={bus.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{bus.operator}</h3>
                        <div className="flex items-center text-gray-300 mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{bus.route}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-300">{bus.rating}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-blue-400" />
                        <div>
                          <div className="text-white font-medium">{bus.departureTime} - {bus.arrivalTime}</div>
                          <div className="text-sm text-gray-400">{bus.duration}</div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-white font-medium">{bus.busType}</div>
                        <div className="text-sm text-gray-400">Next: {bus.nextDeparture}</div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-green-400" />
                        <div>
                          <div className="text-white font-medium">{bus.seatsAvailable} seats</div>
                          <div className="text-sm text-gray-400">available</div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {bus.amenities.slice(0, 3).map((amenity) => (
                          <span key={amenity} className="px-2 py-1 bg-gray-700 text-xs text-gray-300 rounded">
                            {amenity}
                          </span>
                        ))}
                        {bus.amenities.length > 3 && (
                          <span className="px-2 py-1 bg-gray-700 text-xs text-gray-300 rounded">
                            +{bus.amenities.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row items-end lg:items-center space-y-3 lg:space-y-0 lg:space-x-6">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">₹{bus.price}</div>
                      <div className="text-sm text-gray-400">per person</div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button className="px-4 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 transition-colors">
                        View Details
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
                        <Bus className="h-4 w-4" />
                        <span>Book Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {searchResults.length === 0 && searchQuery && !isSearching && (
          <div className="text-center py-12">
            <Bus className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No buses found</h3>
            <p className="text-gray-400">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;