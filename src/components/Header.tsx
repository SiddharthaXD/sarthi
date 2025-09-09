import React from 'react';
import { Bus, Menu, X, User } from 'lucide-react';

type Page = 'home' | 'ticketing' | 'routes' | 'search' | 'busstops' | 'eta' | 'contact';

interface User {
  id: string;
  name: string;
  email: string;
}

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  user: User | null;
  onSignIn: () => void;
  onSignUp: () => void;
  onSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  user,
  onSignIn,
  onSignUp,
  onSignOut
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home' as Page, label: 'Home' },
    { id: 'ticketing' as Page, label: 'Ticketing' },
    { id: 'routes' as Page, label: 'Routes' },
    { id: 'search' as Page, label: 'Search' },
    { id: 'busstops' as Page, label: 'Bus Stops' },
    { id: 'eta' as Page, label: 'ETA' },
    { id: 'contact' as Page, label: 'Contact Us' },
  ];

  const handleNavClick = (pageId: Page) => {
    onNavigate(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <Bus className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold text-white">Sarthi</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700 rounded-md'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <User className="h-4 w-4" />
                  <span>{user.name}</span>
                </div>
                <button
                  onClick={onSignOut}
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="hidden md:flex space-x-3">
                <button
                  onClick={onSignIn}
                  className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={onSignUp}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors ${
                    currentPage === item.id
                      ? 'text-blue-400 bg-gray-700 rounded-md'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700 rounded-md'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {!user && (
                <div className="pt-4 border-t border-gray-700 space-y-2">
                  <button
                    onClick={() => {
                      onSignIn();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      onSignUp();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 bg-blue-600 text-white text-base font-medium rounded-md hover:bg-blue-700"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;