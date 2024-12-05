import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../myoffres.css"
import { Link, useLocation, useNavigate } from "react-router-dom";



const OffresList = () => {
  const [offres, setOffres] = useState([]);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const keyword = searchParams.get('keyword');
  const location = searchParams.get('location');
  const type = searchParams.get('type');

  const [role, setRole] = useState('');
  const [UserId, setUserId] = useState('');

  const navigate = useNavigate()
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

  useEffect(async () => {
    const userid = await getUserId();
    setUserId(userid)
    axios.get('/api/offres')
      .then(res => {

        let filteredOffres = res.data;
        if (keyword) {
          filteredOffres = filteredOffres.filter(offre =>
            offre.mot_cles.includes(keyword)
          );
        }
        if (type) {
          filteredOffres = filteredOffres.filter(offre =>
            offre.type.includes(type)
          );
        }
        if (location) {
          filteredOffres = filteredOffres.filter(offre =>
            offre.lieu.includes(location)
          );
        }
        filteredOffres.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort offres by date
        setOffres(filteredOffres);
      })
      .catch(err => console.log(err));


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
  }, [keyword, location]);
  const handleKeywordClick = (mot_cle) => {
    navigate(`/offre?keyword=${mot_cle}`);
  }


  const handleCandidaturesClick = (offreId) => {
    axios.get(`/api/offres/${offreId}/candidatures`)
      .then(res => {
        console.log(res.data);
        // TODO: Render the list of candidatures for this offer
      })
      .catch(err => console.log(err));
  }
  const handleSubmit = e => {
    e.preventDefault();
    const keywordValue = document.getElementById('keyword').value;
    const locationValue = document.getElementById('location').value;

    const params = new URLSearchParams();
    if (keywordValue) {
      params.set('keyword', keywordValue);
    }
    if (locationValue) {
      params.set('location', locationValue);
    }

    navigate(`/offre?${params.toString()}`);
  };
  return (

    <main>
      <section className="section-padding pb-0 d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-12">
              <form className="custom-form hero-form" onSubmit={handleSubmit} role="form">
                <h3 className="text-white mb-3">Chercher pour des offres spécifiques</h3>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fas fa-user custom-icon"></i>
                      </span>
                      <input
                        type="text"
                        name="keyword"
                        id="keyword"
                        className="form-control"
                        placeholder="Mot clé "

                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fas fa-map-marker-alt custom-icon"></i>
                      </span>
                      <input
                        type="text"
                        name="location"
                        id="location"
                        className="form-control"
                        placeholder="Lieu"

                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-12">
                    <button type="submit" className="form-control">
                      Chercher une offre
                    </button>
                  </div>
                  <div className="col-12">
                    <div className="d-flex flex-wrap align-items-center mt-4 mt-lg-0">
                      <div class="d-flex flex-wrap align-items-center mt-4 mt-lg-0">
                        <span class="text-white mb-lg-0 mb-md-0 me-2">Mots-clés populaires:</span>

                        <div>
                          <a href="/offre?keyword=Developpement" class="motcle">Developpement</a>

                          <a href="/offre?keyword=Marketing" class="motcle">Marketing</a>

                          <a href="/offre?keyword=ingenieur" class="motcle">Ingénierie</a>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section class="job-section section-padding">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 text-center">
              <h1>Liste des offres</h1>
            </div>
            {role === 'employee' && (
              <div className='badgeoffre'>
                <Link to={"/addoffre"}>
                  <button className='custom-btn'>
                    Ajouter offre
                  </button>
                </Link>
              </div>
            )}
            {offres
              .filter((offre) => {
                const currentDate = new Date();
                const expirationDate = new Date(offre.date_dexpiration);
                return expirationDate >= currentDate; // Filter out expired offres
              }).map((offre, index) => (
                <div class="col-lg-4 col-md-4 col-4 mb-4">
                  <div class="job-thumb job-thumb-box">
                    <div class="job-body">
                      <h4 class="job-title">
                        <a class="job-title-link">{offre.name}</a>
                      </h4>
                      <div class="d-flex align-items-center">
                        <p class="mb-0">
                          <i class="custom-icon fas fa-building iicone"></i>
                          {offre.entreprisenom}
                        </p>
                      </div>

                      <div class="d-flex align-items-center">
                        <p class="job-location">
                          <i class="custom-icon fas fa-map-marker-alt iicone"></i>
                          {offre.lieu}
                        </p>
                        <p class="job-date">
                          <i class="custom-icon far fa-calendar-alt iicone"></i>
                          {offre.date}
                        </p>
                      </div>
                      <div class="d-flex align-items-center border-top pt-3">




                        <p class="job-price mb-0">
                          <p>
                            <i class="custom-icon fas fa-briefcase iicone"></i>

                            {offre.type}
                          </p>
                          <i class="custom-icon fas fa-money-bill iicone"></i>
                          {offre.salaire}
                        </p>

                        <div class="ms-auto">
                          <Link to={`/offres/${offre._id}`}>
                            <button class="custom-btn  ">Détails</button>
                          </Link>
                          {role === 'admin' || (role === 'employee' && offre.employee === UserId) ? (
                            <Link to={`/offres/${offre._id}/candidatures`}>
                              <button class="custom-btn buttonoffre">Candidatures</button>
                            </Link>
                          ) : null}
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>


    </main >


  );
};

export default OffresList;