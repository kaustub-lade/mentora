
import React, { useState } from 'react';

const Payments = () => {
  const [userId, setUserId] = useState('');
  const [mentorId, setMentorId] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    setLoading(true);
    setMessage('');
    fetch('http://localhost:5000/api/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, mentor_id: mentorId, booking_id: bookingId, amount })
    })
      .then(res => res.json())
      .then(data => {
        setMessage(data.success ? 'Payment successful!' : data.message || 'Payment failed');
        setLoading(false);
        if (data.success) fetchPayments();
      })
      .catch(() => {
        setMessage('Payment failed');
        setLoading(false);
      });
  };

  const fetchPayments = () => {
    if (!userId) return;
    setLoading(true);
    fetch(`http://localhost:5000/api/payments?user_id=${userId}`)
      .then(res => res.json())
      .then(data => {
        setPayments(data.payments || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div>
      <h2>Payments</h2>
      <div>
        <input placeholder="User ID" value={userId} onChange={e => setUserId(e.target.value)} />
        <input placeholder="Mentor ID" value={mentorId} onChange={e => setMentorId(e.target.value)} />
        <input placeholder="Booking ID" value={bookingId} onChange={e => setBookingId(e.target.value)} />
        <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
        <button onClick={handlePay} disabled={loading}>Pay</button>
        <button onClick={fetchPayments} disabled={loading || !userId}>View My Payments</button>
      </div>
      {message && <p>{message}</p>}
      <ul>
        {payments.map(p => (
          <li key={p.id}>Booking: {p.booking_id} | Amount: {p.amount} | Status: {p.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default Payments;
