
import React, { useState, useEffect } from 'react';

const MOCK_USER_ID = 1; // TODO: Replace with real user id from auth context

const ReferralPromo = () => {
  const [email, setEmail] = useState('');
  const [inviteMsg, setInviteMsg] = useState('');
  const [error, setError] = useState('');
  const [rewards, setRewards] = useState([]);
  const [referralCode, setReferralCode] = useState('');

  useEffect(() => {
    fetch(`/api/referral/rewards?user_id=${MOCK_USER_ID}`)
      .then(res => res.json())
      .then(json => setRewards(json.rewards || []));
  }, []);

  const handleInvite = e => {
    e.preventDefault();
    setInviteMsg(''); setError('');
    fetch('/api/referral/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ referrer_id: MOCK_USER_ID, referred_email: email })
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setInviteMsg('Invitation sent! Referral code: ' + json.code);
          setReferralCode(json.code);
        } else setError(json.message || 'Invite failed');
      })
      .catch(() => setError('Invite failed'));
  };

  return (
    <div>
      <h2>Referral & Promo</h2>
      <form onSubmit={handleInvite} style={{marginBottom:16}}>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Friend's Email" />
        <button type="submit">Invite Friend</button>
      </form>
      {inviteMsg && <div style={{color:'green'}}>{inviteMsg}</div>}
      {error && <div style={{color:'red'}}>{error}</div>}
      {referralCode && <div>Your referral code: <strong>{referralCode}</strong></div>}
      <h3>Your Rewards</h3>
      <ul>
        {rewards.length === 0 && <li>No rewards yet.</li>}
        {rewards.map(r => (
          <li key={r.id}>{r.type} - {r.value} ({r.status})</li>
        ))}
      </ul>
    </div>
  );
};

export default ReferralPromo;
