/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import KOLWaitlist from './pages/KOLWaitlist';
import RestaurantWaitlist from './pages/RestaurantWaitlist';
import PrivacyPolicy from './pages/PrivacyPolicy';
import HomePage from './pages/HomePage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(2) || 'home';
      setCurrentPage(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'kol':
        return <KOLWaitlist />;
      case 'restaurant':
        return <RestaurantWaitlist />;
      case 'privacy':
        return <PrivacyPolicy />;
      default:
        return <HomePage />;
    }
  };

  return <div>{renderPage()}</div>;
}
