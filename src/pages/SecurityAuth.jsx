
import React, { useState } from 'react';

const SecurityAuth = () => {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ username: '', password: '', email: '', fullname: '', otp: '', newPassword: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      let res, json;
      if (mode === 'login') {
        res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: form.username, password: form.password }) });
        json = await res.json();
        if (json.success) setMessage('Login successful! Token: ' + json.token);
        else setError(json.message || 'Login failed');
      } else if (mode === 'signup') {
        res = await fetch('/api/auth/signup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: form.username, password: form.password, email: form.email, fullname: form.fullname }) });
        json = await res.json();
        if (json.success) setMessage('Signup successful! User ID: ' + json.userId);
        else setError(json.message || 'Signup failed');
      } else if (mode === 'otp') {
        res = await fetch('/api/auth/otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: form.email }) });
        json = await res.json();
        if (json.success) { setMessage('OTP sent: ' + json.otp); setOtpSent(true); }
        else setError(json.message || 'OTP failed');
      } else if (mode === 'forgot') {
        res = await fetch('/api/auth/forgot', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: form.email, otp: form.otp, newPassword: form.newPassword }) });
        json = await res.json();
        if (json.success) setMessage('Password reset successful!');
        else setError(json.message || 'Reset failed');
      }
    } catch (e) {
      setError('Request failed');
    }
  };

  return (
    <div>
      <h2>Security & Auth</h2>
      <div style={{marginBottom:16}}>
        <button onClick={() => setMode('login')}>Login</button>
        <button onClick={() => setMode('signup')}>Signup</button>
        <button onClick={() => setMode('otp')}>Get OTP</button>
        <button onClick={() => setMode('forgot')}>Reset Password</button>
      </div>
      <form onSubmit={handleSubmit}>
        {mode === 'login' && (
          <>
            <input name="username" placeholder="Username" value={form.username} onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
            <button type="submit">Login</button>
          </>
        )}
        {mode === 'signup' && (
          <>
            <input name="username" placeholder="Username" value={form.username} onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
            <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
            <input name="fullname" placeholder="Full Name" value={form.fullname} onChange={handleChange} />
            <button type="submit">Signup</button>
          </>
        )}
        {mode === 'otp' && (
          <>
            <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
            <button type="submit">Get OTP</button>
            {otpSent && <div>OTP sent to your email (demo: shown here)</div>}
          </>
        )}
        {mode === 'forgot' && (
          <>
            <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
            <input name="otp" placeholder="OTP" value={form.otp} onChange={handleChange} />
            <input name="newPassword" type="password" placeholder="New Password" value={form.newPassword} onChange={handleChange} />
            <button type="submit">Reset Password</button>
          </>
        )}
      </form>
      {message && <div style={{color:'green'}}>{message}</div>}
      {error && <div style={{color:'red'}}>{error}</div>}
    </div>
  );
};

export default SecurityAuth;
