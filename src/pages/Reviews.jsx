
import React, { useState } from 'react';

const Reviews = () => {
  const [mentorId, setMentorId] = useState('');
  const [userId, setUserId] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setMessage('');
    fetch('http://localhost:5000/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, mentor_id: mentorId, rating, comment })
    })
      .then(res => res.json())
      .then(data => {
        setMessage(data.success ? 'Review submitted!' : data.message || 'Failed to submit review');
        setLoading(false);
        if (data.success) fetchReviews();
      })
      .catch(() => {
        setMessage('Failed to submit review');
        setLoading(false);
      });
  };

  const fetchReviews = () => {
    if (!mentorId) return;
    setLoading(true);
    fetch(`http://localhost:5000/api/reviews?mentor_id=${mentorId}`)
      .then(res => res.json())
      .then(data => {
        setReviews(data.reviews || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div>
      <h2>Reviews & Ratings</h2>
      <div>
        <input placeholder="Mentor ID" value={mentorId} onChange={e => setMentorId(e.target.value)} />
        <input placeholder="User ID" value={userId} onChange={e => setUserId(e.target.value)} />
        <input placeholder="Rating (1-5)" value={rating} onChange={e => setRating(e.target.value)} />
        <input placeholder="Comment" value={comment} onChange={e => setComment(e.target.value)} />
        <button onClick={handleSubmit} disabled={loading}>Submit Review</button>
        <button onClick={fetchReviews} disabled={loading || !mentorId}>View Mentor Reviews</button>
      </div>
      {message && <p>{message}</p>}
      <ul>
        {reviews.map(r => (
          <li key={r.id}>User: {r.user_id} | Rating: {r.rating} | {r.comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
