
import React, { useEffect, useState } from 'react';

const MOCK_USER_ID = 1; // TODO: Replace with real user id from auth context

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/notifications?user_id=${MOCK_USER_ID}`)
      .then(res => res.json())
      .then(json => {
        setNotifications(json.notifications || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load notifications');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading notifications...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.length === 0 && <p>No notifications yet.</p>}
      <ul>
        {notifications.map(n => (
          <li key={n.id}>
            <strong>{n.type || 'Alert'}:</strong> {n.message}
            <span style={{color:'#888',marginLeft:8}}>{n.created_at && new Date(n.created_at).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
