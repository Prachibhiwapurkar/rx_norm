import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SearchDrugs() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const searchDrugs = async () => {
    try {
      setError('');
      const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${query}`);
      if (response.data.drugGroup.conceptGroup) {
        setResults(response.data.drugGroup.conceptGroup);
      } else {
        setResults([]);
        setError('No results found.');
      }
    } catch (err) {
      setError('Error fetching data.');
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim() === '') {
      setError('Please enter a drug name.');
    } else {
      searchDrugs();
    }
  };

  return (
    <div>
      <h1>Search for Drugs</h1>
      <input type="text" value={query} onChange={handleInputChange} placeholder="Enter drug name" />
      <button onClick={handleSearch}>Search</button>
      {error && <p>{error}</p>}
      <ul>
        {results.map((group, index) =>
          group.conceptProperties ? group.conceptProperties.map((drug) => (
            <li key={drug.rxcui}>
              <Link to={`/drugs/${drug.name}`}>{drug.name}</Link>
            </li>
          )) : null
        )}
      </ul>
    </div>
  );
}

export default SearchDrugs;
