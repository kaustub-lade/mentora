import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './UserLogin.css';

const carouselImages = [
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1509475826633-fed577a2c71b?auto=format&fit=crop&w=800&q=80',
];

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const result = await response.json();
    if (result.success) {
      login(result.user);
      alert('Login successful!');
      navigate('/dashboard');
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="carousel-section">
          {carouselImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`slide-${idx}`}
              className={`carousel-image ${idx === currentImageIndex ? 'visible' : 'hidden'}`}
              loading="lazy"
            />
          ))}
        </div>

        <div className="form-section">
          <h2>Login to Mentora</h2>
          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              onChange={handleChange}
              autoComplete="username"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
              autoComplete="current-password"
            />
            <button className="btn login-btn" type="submit">Login</button>
          </form>
          <p className="forgot-password" onClick={() => alert('Forgot password flow to be implemented')}>
            Forgot Password?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
