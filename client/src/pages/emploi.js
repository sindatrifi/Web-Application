import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../submitted-offers.css';
import ProfileBar from '../components/profilebar';
import { Link } from 'react-router-dom';

const Emploi = () => {
  const [submittedOffers, setSubmittedOffers] = useState([]);
  const [entretienDates, setEntretienDates] = useState({}); 
  const [systemDate, setSystemDate] = useState(new Date()); 
  const getUserId = async()=>{
    try {
    const response = await fetch('/api/protected', {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
      
    });
    const userId = response.headers.get('userId');
      return userId
}catch{
  console.log("erreur")
}
  }
  
  useEffect(() => {
    const fetchData = async () => {
      const userId = await getUserId();
      console.log(userId);

      // Fetching applied offers
      const response = await axios.get(`/api/users/${userId}/applied_offers`);
      const appliedOffers = response.data;
      console.log(appliedOffers);
      setSubmittedOffers(appliedOffers);

      // Checking if offre and user exist in entretiens
      const entretiensResponse = await axios.get('/api/entretiens');
      const entretiens = entretiensResponse.data;
      const entretienDates = {};

      appliedOffers.forEach((offer) => {
        const matchingEntretien = entretiens.find((entretien) => entretien.offre === offer._id && entretien.user.includes(userId));
        if (matchingEntretien) {
          entretienDates[offer._id] = matchingEntretien.date;
        } else {
          entretienDates[offer._id] = null;
        }
      });

      setEntretienDates(entretienDates);
    };

    fetchData();
  }, []);
  const handleDelete = async (offerId) => {
    const userId = await getUserId();
    if (window.confirm("êtes-vous sûr de supprimer cette candidature ?")) {
    axios.delete(`api/users/${userId}/applied_offers/${offerId}`)
      .then(async(response) => {
        const userId = await getUserId();
        axios.get(`/api/offres/${offerId}/candidatures`)
          .then(response => {
            const candidatures = response.data;
            console.log(candidatures)
            const candidature = candidatures.find(c => c.name === userId);
            if (candidature) {
              const candidatureId = candidature._id;
  
              axios.delete(`/api/offres/${offerId}/candidatures/${candidatureId}`)
                .then(response => {
                  setSubmittedOffers(submittedOffers.filter(offre => offre._id !== offerId));
                })
                .catch(error => {
                  console.log(error);
                });
            }
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });}
  };
  return (
   
     
  
      <section class="job-section job-featured-section section-padding" id="job-section">
        <ProfileBar/>
      <div class="container">
     
        <div class="row">
       
          <div class="col-lg-6 col-12 text-center mx-auto mb-4">
            <h2>Les candidatures soumises</h2>

          </div>
         
          <ul class="col-lg-12 col-12">{submittedOffers
              .filter((offre) => offre.type === "Emploi")
              .filter((offre) => {
                const entretienDate = entretienDates[offre._id];
                if (entretienDate && new Date(entretienDate) < systemDate) {
                  return false; // Hide the offer if entretien.date > system date
                }
                return true; // Show the offer otherwise
              })
              .map((offre) => (
            

            <li class="job-thumb d-flex">
              <div class="job-body d-flex flex-wrap flex-auto align-items-center ms-4" li key={offre._id}>
                <div class="mb-3">
                  <h4 class="job-title mb-lg-0">
                    <span class="job-title-link">{offre.name}</span>
                  </h4>

                  <div class="d-flex flex-wrap align-items-center">
                    <p class="job-location mb-0">
                    <i className="custom-icon fas fa-map-marker-alt iicone"></i>
                      {offre.lieu}
                    </p>

                    <p class="job-date mb-0">
                    <i className="custom-icon far fa-calendar-alt iicone"></i>
                      {offre.date}
                    </p>
                    <p class="job-price mb-0">
                    <i class="custom-icon fas fa-briefcase iicone"></i>
                      {offre.type}
                    </p>
                    </div>
                    <div>
                {entretienDates[offre._id] && (
                      <p>Votre demande est acceptée </p>
                    )}
                    {!entretienDates[offre._id] && <p>Votre demande n'est pas encore traitée.</p>}
                    </div>
                 
                </div>
              
                <div class="job-section-btn-wrap">
                  <span className="badge bg-danger " >
        <i className="fas fa-trash" onClick={() => handleDelete(offre._id)}></i>
      </span>
                </div>
                
              </div>
            </li>
            
  
            ))}
          </ul>
        </div>
      </div>
    </section>
   
  );
};

export default Emploi;