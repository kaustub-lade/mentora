
import React, { useEffect, useState } from 'react';

const SearchFilter = () => {
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/mentors/filters')
      .then(res => res.json())
      .then(data => setCategories(data.categories || []));
  }, []);

  const handleSearch = () => {
    setLoading(true);
    setError(null);
    let url = `http://localhost:5000/api/mentors/search?q=${encodeURIComponent(q)}`;
    if (category && category !== 'All Categories') {
      url += `&category=${encodeURIComponent(category)}`;
    }
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setResults(data.results || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to search mentors');
        setLoading(false);
      });
  };

  return (
    <div>
      <h2>Search & Filter</h2>
      <input
        type="text"
        placeholder="Search mentors..."
        value={q}
        onChange={e => setQ(e.target.value)}
      />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option>All Categories</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <button onClick={handleSearch}>Search</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
      <ul>
        {results.map(mentor => (
          <li key={mentor.id}>{mentor.name} ({mentor.username})</li>
        ))}
      </ul>
      {!loading && results.length === 0 && <p>No mentors found.</p>}
    </div>
  );
};

export default SearchFilter;
