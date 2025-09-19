import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const carouselImages = [
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
];

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    mobile: '',
    address: '',
    gender: '',
    qualification: '',
    subjects: '',
  });
  const [image, setImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) data.append(key, formData[key]);
    if (image) data.append('image', image);

    const response = await fetch('http://localhost:5000/api/signup', {
      method: 'POST',
      body: data,
    });

    const result = await response.json();
    if (result.success) {
      alert('Signup successful!');
      navigate('/login');
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        {/* Left side - form */}
        <div className="form-section">
          <h2>Create your Mentora Account</h2>
          <form
            onSubmit={handleSubmit}
            className="signup-form"
            encType="multipart/form-data"
          >
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              onChange={handleChange}
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              required
              onChange={handleChange}
            />
            <textarea
              name="address"
              placeholder="Address"
              rows="2"
              required
              onChange={handleChange}
            ></textarea>

            <select name="gender" required onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>

            <select name="qualification" required onChange={handleChange}>
              <option value="">Education Qualification</option>
              <option value="10th">10th</option>
              <option value="12th">12th</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
              <option value="PhD">PhD</option>
            </select>

            <input
              name="subjects"
              type="text"
              placeholder="Subjects of Interest"
              required
              onChange={handleChange}
            />

            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />

            <button className="btn signup-submit-btn" type="submit">
              Register
            </button>
          </form>
        </div>

        {/* Right side - carousel */}
        <div className="carousel-section">
          {carouselImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`slide-${idx}`}
              className={`carousel-image ${
                idx === currentImageIndex ? 'visible' : 'hidden'
              }`}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Signup;
