// src/components/Header.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBell, FaBars } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="mentora-header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo-section">
          <Link to="/" className="logo-link">
            <FaUserCircle className="logo-icon" />
            <span className="brand-name">Mentora</span>
          </Link>
        </div>

        {/* Desktop Navigation and Auth Buttons */}
        <div className="desktop-actions">
          <nav className="main-nav">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/browse">Browse</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>

          {/* Notification Icon */}
          {currentUser && (
            <button className="notifications-button" aria-label="Notifications">
              <FaBell />
              <span className="notification-badge">3</span>
            </button>
          )}

          {/* Auth Buttons */}
          {!currentUser ? (
            <>
              <Link to="/login" className="auth-button">Login</Link>
              <Link to="/signup" className="auth-button signup-button">Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="auth-button profile-button">Profile</Link>
              <button onClick={handleLogout} className="auth-button logout-button">Logout</button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle mobile menu"
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-nav-overlay ${menuOpen ? 'active' : ''}`}>
        <ul className="mobile-nav-list">
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/browse" onClick={() => setMenuOpen(false)}>Browse</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
          <hr />
          {!currentUser ? (
            <>
              <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
              <li><Link to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link></li>
              <li><button onClick={() => { handleLogout(); setMenuOpen(false); }}>Logout</button></li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
