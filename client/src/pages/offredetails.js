import React, { useState, useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import "../offresdetails.css";


const OffreDetails = () => {
  const { id } = useParams();
  const [offre, setOffre] = useState({});
  const [role, setRole] = useState("");
  const [UserId, setUserId] = useState('');
  const navigate = useNavigate();
  const getUserId = async () => {
    try {
      const response = await fetch('/api/protected', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const userId = response.headers.get('userId');
      return userId;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(async() => {
    const userid = await getUserId();
    setUserId(userid)
    axios.get(`/api/offres/${id}`)
      .then(response => {
        setOffre(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    const fetchData = async () => {
      const response = await fetch('/api/protected', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const userId = response.headers.get('userId');
      axios.get(`/api/users/${userId}`)
        .then((res) => {
          setRole(res.data.Role);
          console.log(res.data.Role);

        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchData();
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("êtes-vous sûr de supprimer cet offre ?")) {
    axios
      .delete(`/api/offres/${id}`)
      .then(() => {
        window.location.href = '/offre';

      })
    
      .catch(error => {
        console.log(error);
      });
    }
  }
  const handleUpdate = () => {
    window.location.href = `/offres/${id}/edit`;
  };
  const handlePostuler = () => {
    navigate(`/offres/${id}/postuler`);
  };
  const handleKeywordClick = (mot_cle) => {
    navigate(`/offre?keyword=${mot_cle}`);
  }
  const handleRetourClick = () => {
    window.location.href = `/offre`;
  };

  return (

    <section class="job-section section-padding pb-0">
      <div class="container">
        <div class="row">

          <div class="col-lg-8 col-12">
            <h2 class="job-title mb-0">{offre.name}</h2>

            <div class="job-thumb job-thumb-detail">
              <div class="d-flex flex-wrap align-items-center border-bottom pt-lg-3 pt-2 pb-3 mb-4">
                <p class="job-location mb-0">

                  <i class="custom-icon fas fa-map-marker-alt iicone"></i>
                  {offre.lieu}
                </p>

                <p class="job-date mb-0">
                  <i class="custom-icon fas fa-clock iicone"></i>
                  {offre.date}
                </p>
                
                <p class="job-price mb-0">
                  <i class="custom-icon  fas fa-money-bill iicone"></i>
                  {offre.salaire}
                </p>
                <p class="job-price mb-0">
                <i class="custom-icon fas fa-briefcase iicone"></i>

                  {offre.type}
                </p>

              </div>

              <h4 class="mt-4 mb-2">Description</h4>

              <p>{offre.Description}</p>

              <h5 class="mt-4 mb-3">Niveau d'education :</h5>

              <p class="mb-1">{offre.niveau_etude}</p>



              <h5 class="mt-4 mb-3">Langues :</h5>


              <p class="mb-1">{offre.langues}</p>

              <div className="purchase-info">
                <h5 class="mt-4 mb-3">Mots clés :</h5>

                {offre.mot_cles && offre.mot_cles.split(',').map((mot_cle, index) => (
                  <button key={index} className="custom-btn btnpostuler " onClick={() => handleKeywordClick(mot_cle)}>{mot_cle}</button>
                ))}
              </div>
             
              {role !== 'employee' && role !== 'admin'&&(
                <div class="d-flex justify-content-center flex-wrap mt-5 border-top pt-4">
                  <button className=" btn-primay  mt-2" onClick={handlePostuler}>
                    Postuler
                  </button>
                </div>
              )}
              <div class="d-flex justify-content-center  ">
              <button
              
              className=" btn-danger space"
              onClick={handleRetourClick}
            >
              Retour
            </button>
            </div>
            </div>
          </div>
          <div class="col-lg-4 col-12 mt-5 mt-lg-0">
            <div class="job-thumb job-thumb-detail-box bg-white shadow-lg">


              <h6 class="mt-3 mb-2">Entreprise</h6>

              <p>{offre.entreprisenom}</p>

              <h6 class="mt-4 mb-3"> Informations du contact</h6>

              <p class="mb-2">
                <i class="custom-icon fas fa-globe me-1"></i>

                <a  class="site-footer-link">
                {offre.entreprisesite}
                </a>
              </p>

              <p class="mb-2">
                <i class="custom-icon fas fa-phone me-1"></i>

                <a class="site-footer-link">
                {offre.entreprisephone}
                </a>
              </p>

              <p>
                <i class="custom-icon fas fa-envelope me-1"></i>

                <a  class="site-footer-link">
                {offre.entreprisemail}
                </a>
              </p>
              <h6 class="mt-4 mb-3"> Comment Postuler</h6>
              <p >
                  {offre.CommentPostuler}
                </p>
            </div>
            <div className='badgeoffre'>
                {role === 'employee' && offre.employee ==UserId  &&(

                  <>
                    <span className="badge bg-secondary " >
                      <i className="fas fa-edit" onClick={handleUpdate}></i>
                    </span>

                    <span className="badge bg-danger " >
                      <i className="fas fa-trash" onClick={handleDelete}></i>

                    </span>
                  </>
                )}
              </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default OffreDetails;