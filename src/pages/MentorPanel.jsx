
import React, { useEffect, useState } from 'react';

const MOCK_MENTOR_ID = 2; // TODO: Replace with real mentor id from auth context

const MentorPanel = () => {
  const [settings, setSettings] = useState({ price: '', schedule: '', bio: '', status: '' });
  const [form, setForm] = useState({ price: '', schedule: '', bio: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/mentor/settings?mentor_id=${MOCK_MENTOR_ID}`)
      .then(res => res.json())
      .then(json => {
        setSettings(json);
        setForm({ price: json.price || '', schedule: json.schedule || '', bio: json.bio || '' });
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load mentor settings');
        setLoading(false);
      });
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    fetch('/api/mentor/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mentor_id: MOCK_MENTOR_ID, ...form })
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setSuccess('Settings updated!');
          setSettings({ ...settings, ...form });
        } else {
          setError(json.message || 'Update failed');
        }
      })
      .catch(() => setError('Update failed'));
  };

  if (loading) return <div>Loading mentor panel...</div>;
  return (
    <div>
      <h2>Mentor Panel</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Price (₹): <input name="price" value={form.price} onChange={handleChange} type="number" min="0" /></label>
        </div>
        <div>
          <label>Schedule: <input name="schedule" value={form.schedule} onChange={handleChange} placeholder="e.g. Mon-Fri 5-7pm" /></label>
        </div>
        <div>
          <label>Bio: <textarea name="bio" value={form.bio} onChange={handleChange} /></label>
        </div>
        <button type="submit">Update Settings</button>
      </form>
      {success && <div style={{color:'green'}}>{success}</div>}
      {error && <div style={{color:'red'}}>{error}</div>}
      <div style={{marginTop:20}}>
        <strong>Status:</strong> {settings.status || 'pending'}
      </div>
    </div>
  );
};

export default MentorPanel;
