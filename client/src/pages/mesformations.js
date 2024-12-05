import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../myoffres.css"
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileBar from '../components/profilebar';



const MyFormationList = () => {
  const [offres, setOffres] = useState([]);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const keyword = searchParams.get('keyword');
  const location = searchParams.get('location');
  const type = searchParams.get('type');

  const [role, setRole] = useState('');
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
  useEffect(() => {
    const fetchData = async () => {
      const userId = await getUserId();
      axios.get(`/api/users/${userId}`)
        .then((res) => {
          setRole(res.data.Role);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchData();

    axios.get('/api/offres')
      .then(async(res) => {
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
        
        // Filter offers where offre.employee is equal to userId
        const userId = await getUserId();
        filteredOffres = filteredOffres.filter(offre => offre.employee === userId);

        setOffres(filteredOffres);
      })
      .catch(err => console.log(err));
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
      
         
      <section class="job-section section-padding">
      <ProfileBar/>
        <div class="container entretienemployee">
          <div class="row">
            <div class="col-lg-12 text-center">
              <h1>Liste des formations</h1>
            </div>
            {role === 'employee' && (
              <div className='badgeoffre'>
                <Link to={"/addoffre"}>
                  <span className="badgeoffreplus">
                    <i className="fas fa-plus"></i>
                  </span>
                </Link>
              </div>
            )}
            {offres.filter((offre) => offre.type === "Formation").map((offre, index) => (
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
                          <button class="custom-btn ">Détails</button>
                        </Link>
                        {role === 'employee' && (
                          <Link to={`/offres/${offre._id}/candidatures`}>
                            <button class="custom-btn buttonoffre">Candidatures</button>
                          </Link>
                        )}
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

export default MyFormationList;