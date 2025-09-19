
import React, { useState } from 'react';

const Booking = () => {
  const [userId, setUserId] = useState('');
  const [mentorId, setMentorId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleBook = () => {
    setLoading(true);
    setMessage('');
    fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, mentor_id: mentorId, date, time })
    })
      .then(res => res.json())
      .then(data => {
        setMessage(data.success ? 'Booking successful!' : data.message || 'Booking failed');
        setLoading(false);
        if (data.success) fetchBookings();
      })
      .catch(() => {
        setMessage('Booking failed');
        setLoading(false);
      });
  };

  const fetchBookings = () => {
    if (!userId) return;
    setLoading(true);
    fetch(`http://localhost:5000/api/bookings?user_id=${userId}`)
      .then(res => res.json())
      .then(data => {
        setBookings(data.bookings || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div>
      <h2>Booking System</h2>
      <div>
        <input placeholder="User ID" value={userId} onChange={e => setUserId(e.target.value)} />
        <input placeholder="Mentor ID" value={mentorId} onChange={e => setMentorId(e.target.value)} />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <input type="time" value={time} onChange={e => setTime(e.target.value)} />
        <button onClick={handleBook} disabled={loading}>Book Session</button>
        <button onClick={fetchBookings} disabled={loading || !userId}>View My Bookings</button>
      </div>
      {message && <p>{message}</p>}
      <ul>
        {bookings.map(b => (
          <li key={b.id}>{b.date} {b.time} (Mentor: {b.mentor_id}) Status: {b.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default Booking;
