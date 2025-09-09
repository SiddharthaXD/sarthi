import React, { useState } from 'react';
import { Bus, Search, MapPin, Clock, Users, Route } from 'lucide-react';

type Page = 'home' | 'ticketing' | 'routes' | 'search' | 'busstops' | 'eta' | 'contact';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');

  const features = [
    {
      icon: <Bus className="h-8 w-8 text-blue-400" />,
      title: 'Easy Booking',
      description: 'Book your bus tickets online with just a few clicks',
      action: () => onNavigate('ticketing')
    },
    {
      icon: <Route className="h-8 w-8 text-green-400" />,
      title: 'Punjab Routes',
      description: 'Explore all available bus routes across Punjab',
      action: () => onNavigate('routes')
    },
    {
      icon: <MapPin className="h-8 w-8 text-purple-400" />,
      title: 'Bus Stops',
      description: 'Find bus stops in tier-2 cities with detailed information',
      action: () => onNavigate('busstops')
    },
    {
      icon: <Clock className="h-8 w-8 text-orange-400" />,
      title: 'Live ETA',
      description: 'Track your bus in real-time and get accurate arrival times',
      action: () => onNavigate('eta')
    }
  ];

  const handleQuickSearch = () => {
    if (searchFrom && searchTo) {
      onNavigate('search');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-3">
                <Bus className="h-16 w-16 text-blue-400" />
                <h1 className="text-5xl md:text-6xl font-bold text-white">Sarthi</h1>
              </div>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Your reliable digital travel companion for bus tracking and ticketing across Punjab
            </p>
            
            {/* Quick Search */}
            <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg p-6 shadow-2xl">
              <h3 className="text-lg font-semibold text-white mb-4 text-center">Quick Bus Search</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">From</label>
                  <input
                    type="text"
                    value={searchFrom}
                    onChange={(e) => setSearchFrom(e.target.value)}
                    placeholder="Enter departure city"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">To</label>
                  <input
                    type="text"
                    value={searchTo}
                    onChange={(e) => setSearchTo(e.target.value)}
                    placeholder="Enter destination city"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleQuickSearch}
                    className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Search className="h-5 w-5" />
                    <span>Search Buses</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything you need for bus travel
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              From booking tickets to tracking buses in real-time, Sarthi makes your journey seamless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                onClick={feature.action}
                className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-700 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">500+</div>
              <div className="text-gray-300">Daily Routes</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">50k+</div>
              <div className="text-gray-300">Happy Travelers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">200+</div>
              <div className="text-gray-300">Bus Stops</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">99.9%</div>
              <div className="text-gray-300">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to start your journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Book your next bus ticket or track your current journey with Sarthi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('ticketing')}
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
            >
              <Bus className="h-5 w-5" />
              <span>Book Ticket</span>
            </button>
            <button
              onClick={() => onNavigate('eta')}
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center space-x-2"
            >
              <Clock className="h-5 w-5" />
              <span>Track Bus</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;