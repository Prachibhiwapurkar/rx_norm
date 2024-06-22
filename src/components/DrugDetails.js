import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DrugDetails({ match }) {
  const { drug_name } = match.params;
  const [details, setDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${drug_name}`);
        if (response.data.idGroup.rxnormId) {
          const rxcui = response.data.idGroup.rxnormId[0];
          const detailsResponse = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}/ndcs.json`);
          setDetails({ rxcui, ndcs: detailsResponse.data.ndcGroup.ndcList });
        } else {
          setError('No details found.');
        }
      } catch (err) {
        setError('Error fetching data.');
      }
    };

    fetchDetails();
  }, [drug_name]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!details) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Drug Details for {drug_name}</h1>
      <p>RxCUI: {details.rxcui}</p>
      <h2>Associated NDCs</h2>
      <ul>
        {details.ndcs.map((ndc, index) => (
          <li key={index}>{ndc}</li>
        ))}
      </ul>
    </div>
  );
}

export default DrugDetails;
