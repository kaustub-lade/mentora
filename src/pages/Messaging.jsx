
import React, { useState } from 'react';

const Messaging = () => {
  const [user1, setUser1] = useState('');
  const [user2, setUser2] = useState('');
  const [content, setContent] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    setLoading(true);
    setMessage('');
    fetch('http://localhost:5000/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sender_id: user1, receiver_id: user2, content })
    })
      .then(res => res.json())
      .then(data => {
        setMessage(data.success ? 'Message sent!' : data.message || 'Failed to send message');
        setLoading(false);
        if (data.success) fetchMessages();
      })
      .catch(() => {
        setMessage('Failed to send message');
        setLoading(false);
      });
  };

  const fetchMessages = () => {
    if (!user1 || !user2) return;
    setLoading(true);
    fetch(`http://localhost:5000/api/messages?user1=${user1}&user2=${user2}`)
      .then(res => res.json())
      .then(data => {
        setMessages(data.messages || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div>
      <h2>Messaging</h2>
      <div>
        <input placeholder="Your User ID" value={user1} onChange={e => setUser1(e.target.value)} />
        <input placeholder="Other User ID" value={user2} onChange={e => setUser2(e.target.value)} />
        <input placeholder="Message" value={content} onChange={e => setContent(e.target.value)} />
        <button onClick={handleSend} disabled={loading}>Send</button>
        <button onClick={fetchMessages} disabled={loading || !user1 || !user2}>View Chat</button>
      </div>
      {message && <p>{message}</p>}
      <ul>
        {messages.map(m => (
          <li key={m.id}><b>{m.sender_id}</b>: {m.content} <span style={{color: m.is_abuse ? 'red' : 'inherit'}}>{m.is_abuse ? '[Flagged]' : ''}</span></li>
        ))}
      </ul>
    </div>
  );
};

export default Messaging;
