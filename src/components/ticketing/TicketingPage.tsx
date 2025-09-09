import React, { useState } from 'react';
import { MapPin, Calendar, Users, ArrowRight, Bus, Clock, Star } from 'lucide-react';

interface BookingForm {
  from: string;
  to: string;
  date: string;
  passengers: number;
}

interface BusOption {
  id: string;
  operator: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  seatsAvailable: number;
  rating: number;
  amenities: string[];
  busType: string;
}

const TicketingPage: React.FC = () => {
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    from: '',
    to: '',
    date: '',
    passengers: 1
  });
  const [searchResults, setSearchResults] = useState<BusOption[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedBus, setSelectedBus] = useState<BusOption | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: name === 'passengers' ? parseInt(value) : value
    }));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    // Simulate API call
    setTimeout(() => {
      const mockResults: BusOption[] = [
        {
          id: '1',
          operator: 'Punjab Roadways',
          departureTime: '06:30',
          arrivalTime: '10:15',
          duration: '3h 45m',
          price: 450,
          seatsAvailable: 15,
          rating: 4.2,
          amenities: ['AC', 'WiFi', 'Charging Port'],
          busType: 'Semi-Sleeper'
        },
        {
          id: '2',
          operator: 'Express Travels',
          departureTime: '08:00',
          arrivalTime: '11:30',
          duration: '3h 30m',
          price: 550,
          seatsAvailable: 8,
          rating: 4.5,
          amenities: ['AC', 'WiFi', 'Charging Port', 'Entertainment'],
          busType: 'Volvo AC'
        },
        {
          id: '3',
          operator: 'City Bus Service',
          departureTime: '14:20',
          arrivalTime: '17:45',
          duration: '3h 25m',
          price: 380,
          seatsAvailable: 22,
          rating: 4.0,
          amenities: ['AC', 'Charging Port'],
          busType: 'Semi-Sleeper'
        }
      ];
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 2000);
  };

  const handleBookNow = (bus: BusOption) => {
    setSelectedBus(bus);
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Book Your Bus Ticket</h1>
          <p className="text-xl text-gray-400">Find and book the perfect bus for your journey across Punjab</p>
        </div>

        {/* Booking Form */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="from"
                  value={bookingForm.from}
                  onChange={handleInputChange}
                  placeholder="Departure city"
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">To</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="to"
                  value={bookingForm.to}
                  onChange={handleInputChange}
                  placeholder="Destination city"
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  name="date"
                  value={bookingForm.date}
                  onChange={handleInputChange}
                  min={getTomorrowDate()}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Passengers</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  name="passengers"
                  value={bookingForm.passengers}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} Passenger{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={isSearching}
                className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
              >
                {isSearching ? 'Searching...' : 'Search Buses'}
              </button>
            </div>
          </form>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-6">Available Buses</h2>
            {searchResults.map((bus) => (
              <div key={bus.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-semibold text-white">{bus.operator}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-300">{bus.rating}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-blue-400" />
                        <div>
                          <div className="text-white font-medium">{bus.departureTime} - {bus.arrivalTime}</div>
                          <div className="text-sm text-gray-400">{bus.duration}</div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-white font-medium">{bus.busType}</div>
                        <div className="text-sm text-gray-400">{bus.seatsAvailable} seats available</div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {bus.amenities.map((amenity) => (
                          <span key={amenity} className="px-2 py-1 bg-gray-700 text-xs text-gray-300 rounded">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row items-end lg:items-center space-y-3 lg:space-y-0 lg:space-x-6">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">₹{bus.price}</div>
                      <div className="text-sm text-gray-400">per person</div>
                    </div>
                    
                    <button
                      onClick={() => handleBookNow(bus)}
                      className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Booking Confirmation Modal */}
        {selectedBus && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg w-full max-w-md p-6">
              <h3 className="text-xl font-bold text-white mb-4">Confirm Booking</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Bus Operator:</span>
                  <span className="text-white">{selectedBus.operator}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Route:</span>
                  <span className="text-white">{bookingForm.from} → {bookingForm.to}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Date:</span>
                  <span className="text-white">{bookingForm.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Time:</span>
                  <span className="text-white">{selectedBus.departureTime} - {selectedBus.arrivalTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Passengers:</span>
                  <span className="text-white">{bookingForm.passengers}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t border-gray-700 pt-3">
                  <span className="text-white">Total Amount:</span>
                  <span className="text-blue-400">₹{selectedBus.price * bookingForm.passengers}</span>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedBus(null)}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Booking confirmed! You will receive a confirmation email shortly.');
                    setSelectedBus(null);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Confirm & Pay
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketingPage;