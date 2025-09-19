import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="aboutus-container">
      <header className="aboutus-header">
        <h1>Welcome to Mentora</h1>
        <p className="tagline">Empowering Connections, Igniting Growth</p>
      </header>

      <section className="aboutus-intro">
        <h2>What is Mentora?</h2>
        <p>
          Mentora is a dynamic online platform dedicated to bridging the gap between eager learners and expert mentors worldwide.
          Whether you're a student looking to master a new skill, a professional seeking guidance, or an expert passionate about sharing your knowledge,
          Mentora provides a seamless, interactive, and personalized mentoring experience designed just for you.
        </p>
      </section>

      <section className="aboutus-purpose">
        <h2>Our Mission & Vision</h2>
        <p>
          Our mission is to democratize mentorship by leveraging technology to make expert guidance accessible to everyone, everywhere.
          We envision a world where every learner can connect with the perfect mentor, gaining the skills, confidence, and networks to unlock their full potential.
          Mentora stands as a catalyst for personal and professional growth, fostering a supportive community built on knowledge, trust, and inspiration.
        </p>
      </section>

      <section className="aboutus-features">
        <h2>What Mentora Offers</h2>
        <ul>
          <li><strong>Explore and Connect:</strong> Easily browse mentors across diverse domains, with detailed profiles showcasing expertise, experience, and reviews.</li>
          <li><strong>Smart Search & Filters:</strong> Find mentors by skill, language, rating, price, and availability to match your unique needs.</li>
          <li><strong>Flexible Booking System:</strong> Schedule, reschedule, and manage sessions effortlessly with calendar integration and reminders.</li>
          <li><strong>Interactive Live Sessions:</strong> Conduct seamless video sessions with built-in or integrated tools like Zoom and Google Meet.</li>
          <li><strong>Secure Payments & Receipts:</strong> Pay per session securely with clear transaction records and refund handling.</li>
          <li><strong>Trusted Reviews & Messaging:</strong> Engage with mentors pre-session through chat and leave honest feedback to help the community.</li>
          <li><strong>Personalized Dashboards:</strong> Track your progress, session history, earnings, and more with intuitive analytics.</li>
          <li><strong>Certificates & Proofs:</strong> Earn mentorship badges and certificates to validate your learning journey.</li>
        </ul>
      </section>

      <section className="aboutus-target">
        <h2>Who is Mentora For?</h2>
        <p>
          Mentora is crafted for lifelong learners and passionate educators alike:
        </p>
        <ul>
          <li><strong>Students & Professionals:</strong> Looking to gain new skills, career advice, or industry insights through personalized guidance.</li>
          <li><strong>Mentors & Experts:</strong> Seeking to share expertise, grow their influence, and earn through impactful mentoring.</li>
          <li><strong>Organizations & Teams:</strong> Wanting to foster continuous learning and skill development within their communities.</li>
        </ul>
      </section>

      <section className="aboutus-why">
        <h2>Why Choose Mentora?</h2>
        <p>
          Unlike generic learning platforms, Mentora thrives on meaningful human connection and tailored mentorship.
          We combine cutting-edge technology with a robust, user-friendly interface to ensure every interaction is valuable, transparent, and secure.
          From real-time video sessions to thoughtful feedback loops and seamless scheduling, Mentora is your partner in growth.
        </p>
      </section>

      <footer className="aboutus-footer">
        <p>Join Mentora today — where your learning journey meets expert guidance!</p>
      </footer>
    </div>
  );
};

export default AboutUs;
