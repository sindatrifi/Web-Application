import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../myoffres.css"
import { Link, useLocation, useNavigate } from "react-router-dom";

const Offres = () => {
  const [offres, setOffres] = useState([]);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const keyword = searchParams.get('keyword');
  const location = searchParams.get('location');
  const type = searchParams.get('type');
  const navigate = useNavigate()
  useEffect(() => {
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
        setOffres(filteredOffres);
      })
      .catch(err => console.log(err));
  }, [keyword, location]);

  const lastfiveOffres = offres.slice(Math.max(offres.length - 5, 0));
  const handleKeywordClick = (mot_cle) => {
    navigate(`/offre?keyword=${mot_cle}`);
  }
  return (

    <section class="job-section job-featured-section section-padding" id="job-section">
      <div class="container">
        <div class="row">

          <div class="col-lg-6 col-12 text-center mx-auto mb-4">
            <h2>Les dernières offres</h2>

            <p>Découvrez les toutes dernières offres d'emploi, constamment mises à jour pour vous offrir les meilleures opportunités professionnelles.</p>
          </div>

          <ul class="col-lg-12 col-12">{lastfiveOffres.map(offre => (
            <li class="job-thumb d-flex">
              <div class="job-body d-flex flex-wrap flex-auto align-items-center ms-4" key={offre._id}>
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
                    <i className="custom-icon fas fa-money-bill iicone" ></i>
                      {offre.salaire}
                    </p>

                  </div>
                </div>

                <div class="job-section-btn-wrap">
                  <Link to={`/offres/${offre._id}`} >
                    <button class="custom-btn btn">Détails</button>
                  </Link>
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

export default Offres;