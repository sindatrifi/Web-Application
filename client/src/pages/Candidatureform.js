import React, { useState } from 'react';
import axios from 'axios';
import {  useParams } from 'react-router-dom';
import Alert from "../components/Alert";
import { useNavigate } from 'react-router-dom';

import "../candidature.css";

const CandidatureForm = () => {
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
  
  
  const [appliedOffers, setAppliedOffers] = useState([]);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [diploma, setDiploma] = useState('');
  const { id } = useParams();
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  
  
  const onChangeHandler = (e) => {
  

   
  setForm({
      
    ...form,
    [e.target.name]: e.target.value,
  
});
setDiploma(e.target.files[0]);
  }
  const handleSubmit = async(event) => {
    event.preventDefault();
    const userId=await getUserId()
    axios.post(`/api/offres/${id}/candidatures`, { ...form, name: userId ,etat :"pas encore traité"})
      .then(async(response) => {
        const candidature = response.data;
        const offerId = id // extract the offer ID from the response
        const userId = await getUserId();
        axios.put(`/api/users/${userId}/apply`, { offerId })
          .then((response) => {
            const updatedAppliedOffers = response.data;
            setAppliedOffers(updatedAppliedOffers);
            setForm({});
            setMessage('Diplôme soumis avec succès');
            setShow(true);
            setTimeout(() => {
              setShow(false);
            }, 4000);
          })
          .catch((error) => {
            console.log(error);
            setMessage('Déjà soumis ');
            setShow(true);
            setTimeout(() => {
              setShow(false);
            }, 4000);
          });
          navigate(`/offres/${id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const handleRetourClick = () => {
    window.location.href = `/offres/${id}`;
};
  return (
    <div className="candidature-form-container">
       <Alert message={message} show={show}/>

      <form onSubmit={handleSubmit}>
      
        <div className="form-group">
          <label htmlFor="diploma">Déposer les documents demandés</label>
          <input
            type="file"
            className="form-control"
            id="diploma"
           name="diploma"
            onChange={onChangeHandler}
            require
          />
          
        </div>
        <div className="form-group">
          <label htmlFor="cv">Votre compétences pour cettre offre</label>
          <textarea
            className="form-control"
            id="cv"
           name="cv"
            onChange={onChangeHandler}
            require
          />
          
        </div>
        <div className="form-group">
          <label htmlFor="Motivation">Votre motivation pour cettre offre</label>
          <textarea
            className="form-control"
            id="motivation"
           name="motivation"
            onChange={onChangeHandler}
            require
          />
          
        </div>
        <button type="submit" className=" btn-primary">
          Déposer
        </button>
        <button
              type="button"
              className=" btn-secondary space"
              onClick={handleRetourClick}
            >
              Annuler
            </button>
      </form>
    </div>
  );
};

export default CandidatureForm;