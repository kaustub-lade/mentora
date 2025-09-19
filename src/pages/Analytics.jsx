
import React, { useEffect, useState } from 'react';

const MOCK_USER_ID = 1; // TODO: Replace with real user id from auth context

const Analytics = () => {
  const [data, setData] = useState({ sessions: 0, timeSpent: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/user/analytics?user_id=${MOCK_USER_ID}`)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load analytics');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading analytics...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Analytics</h2>
      <p>Track your progress and see analytics here.</p>
      <div>
        <strong>Sessions attended:</strong> {data.sessions}
      </div>
      <div>
        <strong>Total time spent:</strong> {data.timeSpent} minutes
      </div>
    </div>
  );
};

export default Analytics;
