import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import Alert from '../components/Alert';

const EditCandidatureForm = () => {
  const [name, setName] = useState('');
  const [diploma, setDiploma] = useState('');
  const [cv, setCV] = useState('');
  const [motivation, setMotivation] = useState('');
  const { id } = useParams();
  const [message, setMessage] = useState("");
    const [show, setShow] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await getUserId();

        const response = await axios.get(`/api/offres/${id}/candidatures/`);
        const candidature = response.data.find((c) => c.name === userId);

        if (candidature) {
          setName(candidature.name);
          setDiploma(candidature.diploma);
          setCV(candidature.cv);
          setMotivation(candidature.motivation);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const handleRetourClick = () => {
    window.location.href = `/profileuser`;
};
  const getUserId = async () => {
    try {
      const response = await fetch('/api/protected', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const userId = response.headers.get('userId');
      return userId;
    } catch {
      console.log('Error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = await getUserId();

      const response = await axios.get(`/api/offres/${id}/candidatures/`);
      const candidature = response.data.find((c) => c.name === userId);

      if (candidature) {
        const updatedCandidature = {
         
          cv,
          motivation,
        };

        await axios.put(`/api/offres/${id}/candidatures/${candidature._id}`, updatedCandidature);

        // Handle successful update
        console.log('Candidature updated successfully');
        setMessage('candidature modifié avec succés');
        
  
       
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 4000);
        window.location.href = "/profileuser";
      } else {
        // Handle candidature not found
        console.log('Candidature not found');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid">
     <Alert message={message} show={show}/>

    <div className="row main-content bg-success text-center">
      <div className="col-md-4 text-center company__info">
        <span className="company__logo">
          <h2><span className="fa fa-android"></span></h2>
        </span>
        <img src={require("../sources/poste.svg.png")} />
      </div>
      <div className="col-md-8 col-xs-12 col-sm-12 login_form ">
        <div className="container-fluid">
          <div className="row">
            <h2>Modifier candidature</h2>
          </div>
          <div className="row">
            <form onSubmit={handleSubmit} className="form-group">
              <div className="row">
                <label>CV:</label>
                <textarea
                  value={cv}
                
                  onChange={(e) => setCV(e.target.value)}
                  className="form__input"
                />
              </div>
              <div className="row">
                <label>Motivation:</label>
                <textarea
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  className="form__input"
                />
              </div>
              <div className="row">
                <div className="col">
                  <button className="bttn" type="submit">Modifier</button>
                </div>
                <div className="col">
                  <button
                    type="button"
                    className="btn-secondary space"
                    onClick={handleRetourClick}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  )};

export default EditCandidatureForm;
