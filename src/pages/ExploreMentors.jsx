
import React, { useEffect, useState } from 'react';

const ExploreMentors = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/mentors')
      .then(res => res.json())
      .then(data => {
        setMentors(data.mentors || []);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch mentors');
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Explore Mentors</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
      <ul>
        {mentors.map((mentor) => (
          <li key={mentor.id}>{mentor.name} ({mentor.username})</li>
        ))}
      </ul>
      {!loading && mentors.length === 0 && <p>No mentors found.</p>}
    </div>
  );
};

export default ExploreMentors;
