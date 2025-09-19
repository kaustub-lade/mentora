import React from 'react';
import Header from '../Components/Header';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Home_header from "../Components/Home_hero.jpg"
import {
  faChalkboardTeacher,
  faSearch,
  faCalendarCheck,
  faVideo,
  faDollarSign,
  faStar,
  faComments,
  faCloudArrowUp,
  faGaugeHigh,
  faUserTie,
  faBell,
  faShieldHalved,
  faAward,
  faGift,
  faQuoteLeft
} from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  return (
    <div className="home">
      <Header />

      {/* Hero Section */}
      <section className="hero gradient-bg">
        <div className="hero-content container">
          <div className="hero-text">
            <h1 className="hero-title">
              Unlock Your Potential with <span className="highlight">Mentora</span>
            </h1>
            <p className="hero-subtitle">
              Connect with experienced mentors across diverse fields to accelerate your learning, career, and personal growth.
            </p>
            <button className="cta-button btn-glow"><Link to="/Login">Find Your Mentor Today</Link></button>
          </div>
          <div className="hero-image">
            <img
              src={ Home_header}
              alt="Student Learning"
              loading="lazy"
              className="responsive-img hero-img-shadow"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features container">
        <h2 className="section-title center">Platform Features</h2>
        <div className="features-grid">
          <div className="feature-card purple-glow">
            <FontAwesomeIcon icon={faSearch} size="3x" className="feature-icon" />
            <h3 className="feature-title">Explore & Discover</h3>
            <p className="feature-desc">
              Browse mentors by skill, industry, and expertise across a wide range of domains.
            </p>
          </div>
          <div className="feature-card pink-glow">
            <FontAwesomeIcon icon={faCalendarCheck} size="3x" className="feature-icon" />
            <h3 className="feature-title">Easy Booking</h3>
            <p className="feature-desc">
              Schedule sessions with an intuitive calendar and manage your appointments easily.
            </p>
          </div>
          <div className="feature-card yellow-glow">
            <FontAwesomeIcon icon={faVideo} size="3x" className="feature-icon" />
            <h3 className="feature-title">Live Sessions</h3>
            <p className="feature-desc">
              Join HD video sessions directly on the platform with seamless connectivity.
            </p>
          </div>
          <div className="feature-card indigo-glow">
            <FontAwesomeIcon icon={faDollarSign} size="3x" className="feature-icon" />
            <h3 className="feature-title">Secure Payments</h3>
            <p className="feature-desc">
              Safe, transparent payment system with detailed receipts and flexible plans.
            </p>
          </div>
          <div className="feature-card green-glow">
            <FontAwesomeIcon icon={faStar} size="3x" className="feature-icon" />
            <h3 className="feature-title">Reviews & Ratings</h3>
            <p className="feature-desc">
              Read and share reviews to build trust and choose the best mentors.
            </p>
          </div>
          <div className="feature-card red-glow">
            <FontAwesomeIcon icon={faComments} size="3x" className="feature-icon" />
            <h3 className="feature-title">Direct Messaging</h3>
            <p className="feature-desc">
              Chat with mentors pre-booking to clarify doubts and goals.
            </p>
          </div>
        </div>
      </section>

      {/* Mentor Spotlight Section */}
      <section className="spotlight gradient-light-bg">
        <h2 className="section-title center">Meet Our Top Mentors</h2>
        <div className="spotlight-grid">
          {[
            {
              name: 'Jane Miller',
              role: 'Software Engineering Lead',
              quote: 'Passionate about guiding junior developers to success.',
              img: 'https://randomuser.me/api/portraits/women/44.jpg',
              alt: 'Mentor Jane Miller',
              bgColor: '#7c3aed'
            },
            {
              name: 'Alex Smith',
              role: 'Digital Marketing Strategist',
              quote: 'Helping businesses craft compelling online presences.',
              img: 'https://randomuser.me/api/portraits/men/45.jpg',
              alt: 'Mentor Alex Smith',
              bgColor: '#db2777'
            },
            {
              name: 'Rahul Bhatt',
              role: 'Startup Advisor & Investor',
              quote: 'Guiding founders from idea to impactful execution.',
              img: 'https://randomuser.me/api/portraits/men/46.jpg',
              alt: 'Mentor Rahul Bhatt',
              bgColor: '#eab308'
            },
          ].map(({ name, role, quote, img, alt, bgColor }) => (
            <div key={name} className="spotlight-card" style={{ borderColor: bgColor }}>
              <img
                src={img}
                alt={alt}
                className="mentor-avatar"
                loading="lazy"
                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/96x96/${bgColor.slice(1)}/ffffff?text=${name.split(' ').map(n=>n[0]).join('')}`; }}
              />
              <h3 className="mentor-name">{name}</h3>
              <p className="mentor-role">{role}</p>
              <blockquote className="mentor-quote">“{quote}”</blockquote>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials container">
        <h2 className="section-title center">What Our Mentees Say</h2>
        <div className="testimonials-grid">
          {[
            {
              text: "Mentora connected me with an amazing mentor who helped me land my dream job. Highly recommended!",
              name: "Sarah L.",
              iconColor: "purple"
            },
            {
              text: "The booking system is so easy to use, and the sessions are always insightful. A truly valuable platform.",
              name: "David K.",
              iconColor: "pink"
            },
            {
              text: "I've gained so much confidence and clarity thanks to my mentor on Mentora. It's a game-changer!",
              name: "Emily R.",
              iconColor: "yellow"
            }
          ].map(({ text, name, iconColor }) => (
            <div key={name} className="testimonial-card">
              <FontAwesomeIcon icon={faQuoteLeft} size="2x" className={`${iconColor} testimonial-icon`} />
              <p className="testimonial-text">“{text}”</p>
              <p className="testimonial-name">- {name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer gradient-dark-bg">
        <p>&copy; {new Date().getFullYear()} Mentora. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
