import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppliedOffers = ({ userId }) => {
  const [candidatures, setCandidatures] = useState([]);

  useEffect(() => {
    axios.get(`/api/users/${userId}/candidatures`)
      .then(response => {
        setCandidatures(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [userId]);

  return (
    <div>
      <h2>Applied Offers:</h2>
      <ul>
        {candidatures.map(candidature => (
          <li key={candidature._id}>
            <p>Offer name: {candidature.offre.name}</p>
            <p>Diploma: {candidature.diploma}</p>
            {/* Display any other relevant information about the applied offer */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppliedOffers;