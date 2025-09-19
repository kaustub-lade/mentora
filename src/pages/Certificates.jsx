
import React, { useState, useEffect } from 'react';

const MOCK_USER_ID = 1; // TODO: Replace with real user id from auth context

const Certificates = () => {
  const [certs, setCerts] = useState([]);
  const [type, setType] = useState('session');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [validateId, setValidateId] = useState('');
  const [validateResult, setValidateResult] = useState(null);

  const fetchCerts = () => {
    fetch(`/api/user/certificates?user_id=${MOCK_USER_ID}`)
      .then(res => res.json())
      .then(json => setCerts(json.certificates || []));
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  const handleRequest = e => {
    e.preventDefault();
    setMessage(''); setError('');
    fetch('/api/certificates/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: MOCK_USER_ID, type })
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setMessage('Certificate requested!');
          fetchCerts();
        } else setError(json.message || 'Request failed');
      })
      .catch(() => setError('Request failed'));
  };

  const handleValidate = e => {
    e.preventDefault();
    setValidateResult(null); setError('');
    fetch(`/api/admin/certificates/validate?certificateId=${validateId}`)
      .then(res => res.json())
      .then(json => setValidateResult(json))
      .catch(() => setError('Validation failed'));
  };

  return (
    <div>
      <h2>Certificates & Proof</h2>
      <form onSubmit={handleRequest} style={{marginBottom:16}}>
        <label>Type: 
          <select value={type} onChange={e => setType(e.target.value)}>
            <option value="session">Session Proof</option>
            <option value="mentorship">Mentorship Badge</option>
          </select>
        </label>
        <button type="submit">Request Certificate</button>
      </form>
      {message && <div style={{color:'green'}}>{message}</div>}
      {error && <div style={{color:'red'}}>{error}</div>}
      <h3>Your Certificates</h3>
      <ul>
        {certs.length === 0 && <li>No certificates yet.</li>}
        {certs.map(c => (
          <li key={c.id}>
            <strong>{c.type}</strong> - {c.status} {c.issued_at && <span>({new Date(c.issued_at).toLocaleString()})</span>}
            {c.proof && <div>Proof: {c.proof}</div>}
          </li>
        ))}
      </ul>
      <h3>Validate Certificate</h3>
      <form onSubmit={handleValidate}>
        <input value={validateId} onChange={e => setValidateId(e.target.value)} placeholder="Certificate ID" />
        <button type="submit">Validate</button>
      </form>
      {validateResult && (
        <div style={{marginTop:8}}>
          {validateResult.valid ? <span style={{color:'green'}}>Valid certificate!</span> : <span style={{color:'red'}}>Invalid certificate.</span>}
          {validateResult.certificate && <pre>{JSON.stringify(validateResult.certificate, null, 2)}</pre>}
        </div>
      )}
    </div>
  );
};

export default Certificates;
