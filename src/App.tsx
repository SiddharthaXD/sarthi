import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import AuthModal from './components/auth/AuthModal';
import TicketingPage from './components/ticketing/TicketingPage';
import RoutesPage from './components/routes/RoutesPage';
import SearchPage from './components/search/SearchPage';
import BusStopsPage from './components/busstops/BusStopsPage';
import ETAPage from './components/eta/ETAPage';
import ContactPage from './components/ContactPage';

type Page = 'home' | 'ticketing' | 'routes' | 'search' | 'busstops' | 'eta' | 'contact';

interface User {
  id: string;
  name: string;
  email: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [user, setUser] = useState<User | null>(null);

  const handleSignIn = () => {
    setAuthMode('signin');
    setShowAuthModal(true);
  };

  const handleSignUp = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
    setShowAuthModal(false);
  };

  const handleSignOut = () => {
    setUser(null);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'ticketing':
        return <TicketingPage />;
      case 'routes':
        return <RoutesPage />;
      case 'search':
        return <SearchPage />;
      case 'busstops':
        return <BusStopsPage />;
      case 'eta':
        return <ETAPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header 
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        user={user}
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
        onSignOut={handleSignOut}
      />
      
      <main>
        {renderCurrentPage()}
      </main>

      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={handleAuthSuccess}
          onSwitchMode={setAuthMode}
        />
      )}
    </div>
  );
}

export default App;