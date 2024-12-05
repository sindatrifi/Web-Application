import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../submitted-offers.css';
import ProfileBar from '../components/profilebar';

const SubmittedOffers = () => {
  const [submittedOffers, setSubmittedOffers] = useState([]);
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
  
  useEffect(async() => {
    const userId = await getUserId();
    console.log(userId)
    axios.get(`/api/users/${userId}/applied_offers`)
      .then(response => {
        console.log(response.data);
        setSubmittedOffers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const handleDelete = async(offerId) => {
    const userId = await getUserId();
    axios.delete(`api/users/${userId}/applied_offers/${offerId}`)
      .then(response => {
        setSubmittedOffers(submittedOffers.filter(offre => offre._id !== offerId));
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
   
     
  
      <section class="job-section job-featured-section section-padding" id="job-section">
        <ProfileBar/>
      <div class="container">
     
        <div class="row">
       
          <div class="col-lg-6 col-12 text-center mx-auto mb-4">
            <h2>Les candidatures soumises</h2>

          </div>
         
          <ul class="col-lg-12 col-12">{submittedOffers.map((offre) => (
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

export default SubmittedOffers;