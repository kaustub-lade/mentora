
import React, { useState } from 'react';

const Resources = () => {
  const [userId, setUserId] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [quota, setQuota] = useState(null);
  const [downloadName, setDownloadName] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleUpload = () => {
    if (!file || !userId) return;
    setMessage('');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', userId);
    fetch('http://localhost:5000/api/resources/upload', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        setMessage(data.success ? 'Upload successful!' : data.message || 'Upload failed');
      })
      .catch(() => setMessage('Upload failed'));
  };

  const handleQuota = () => {
    if (!userId) return;
    fetch(`http://localhost:5000/api/resources/quota?user_id=${userId}`)
      .then(res => res.json())
      .then(data => setQuota(data))
      .catch(() => setQuota(null));
  };

  const handleDownload = () => {
    if (!downloadName) return;
    setDownloadUrl(`http://localhost:5000/api/resources/download?filename=${encodeURIComponent(downloadName)}`);
  };

  return (
    <div>
      <h2>Resources</h2>
      <div>
        <input placeholder="User ID" value={userId} onChange={e => setUserId(e.target.value)} />
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button onClick={handleUpload}>Upload</button>
        <button onClick={handleQuota}>Check My Quota</button>
      </div>
      {quota && <p>Used: {(quota.used/1024/1024).toFixed(2)} MB / {(quota.limit/1024/1024).toFixed(2)} MB</p>}
      <div>
        <input placeholder="Filename to download" value={downloadName} onChange={e => setDownloadName(e.target.value)} />
        <button onClick={handleDownload}>Get Download Link</button>
        {downloadUrl && <a href={downloadUrl} download>Download File</a>}
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Resources;
