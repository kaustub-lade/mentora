// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Components/Header';
import UserLogin from './pages/UserLogin';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/Profile';
import AboutUs from './pages/AboutUs';
import ExploreMentors from './pages/ExploreMentors';
import SearchFilter from './pages/SearchFilter';
import Booking from './pages/Booking';
import LiveSession from './pages/LiveSession';
import Payments from './pages/Payments';
import Reviews from './pages/Reviews';
import Messaging from './pages/Messaging';
import Resources from './pages/Resources';
import UserDashboard from './pages/UserDashboard';
import Analytics from './pages/Analytics';
import MentorPanel from './pages/MentorPanel';
import Notifications from './pages/Notifications';
import SecurityAuth from './pages/SecurityAuth';
import Certificates from './pages/Certificates';
import ReferralPromo from './pages/ReferralPromo';
import Browse from './pages/Browse';
import Contact from './pages/Contact';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<UserLogin />} />
           <Route path="/signup" element={<Signup />} />
            <Route path="/About" element={<AboutUs />} />
           <Route path="/explore" element={<ExploreMentors />} />
           <Route path="/search" element={<SearchFilter />} />
           <Route path="/booking" element={<Booking />} />
           <Route path="/live" element={<LiveSession />} />
           <Route path="/payments" element={<Payments />} />
           <Route path="/reviews" element={<Reviews />} />
           <Route path="/messaging" element={<Messaging />} />
           <Route path="/resources" element={<Resources />} />
           <Route path="/user-dashboard" element={<UserDashboard />} />
           <Route path="/analytics" element={<Analytics />} />
           <Route path="/mentor-panel" element={<MentorPanel />} />
           <Route path="/notifications" element={<Notifications />} />
           <Route path="/security-auth" element={<SecurityAuth />} />
           <Route path="/certificates" element={<Certificates />} />
           <Route path="/referral-promo" element={<ReferralPromo />} />
           <Route path="/browse" element={<Browse />} />
           <Route path="/contact" element={<Contact />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
