
import React, { useEffect, useState } from 'react';

const MOCK_USER_ID = 1; // TODO: Replace with real user id from auth context

const UserDashboard = () => {
  const [data, setData] = useState({ bookings: [], notes: [], earnings: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/user/dashboard?user_id=${MOCK_USER_ID}`)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load dashboard');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>User Dashboard</h2>
      <h3>Earnings: ₹{data.earnings}</h3>
      <h3>Bookings</h3>
      <ul>
        {data.bookings.length === 0 && <li>No bookings yet.</li>}
        {data.bookings.map(b => (
          <li key={b.id}>Mentor #{b.mentor_id} on {b.date} at {b.time}</li>
        ))}
      </ul>
      <h3>Notes</h3>
      <ul>
        {data.notes.length === 0 && <li>No notes yet.</li>}
        {data.notes.map(n => (
          <li key={n.id}>{n.content} <span style={{color:'#888'}}>({n.created_at})</span></li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
