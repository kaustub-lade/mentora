
import React, { useState } from 'react';

const LiveSession = () => {
  const [mentorId, setMentorId] = useState('');
  const [userId, setUserId] = useState('');
  const [sessionLink, setSessionLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleJoin = () => {
    setLoading(true);
    setError(null);
    fetch('http://localhost:5000/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mentor_id: mentorId, user_id: userId })
    })
      .then(res => res.json())
      .then(data => {
        setSessionLink(data.link);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to generate session link');
        setLoading(false);
      });
  };

  return (
    <div>
      <h2>Live Session</h2>
      <input placeholder="Mentor ID" value={mentorId} onChange={e => setMentorId(e.target.value)} />
      <input placeholder="User ID" value={userId} onChange={e => setUserId(e.target.value)} />
      <button onClick={handleJoin} disabled={loading}>Join Session</button>
      {sessionLink && (
        <div>
          <p>Session Link: <a href={sessionLink} target="_blank" rel="noopener noreferrer">{sessionLink}</a></p>
        </div>
      )}
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  );
};

export default LiveSession;
