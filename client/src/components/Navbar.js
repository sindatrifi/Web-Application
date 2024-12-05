
import React from 'react';
import { Link } from 'react-router-dom';
import '../HomePage.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

function Navbar() {



  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(''); // State variable for first name
  const [lastName, setLastName] = useState('');
  let Id = 0;

  const handleLogout = () => {

    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  }
  const goprofile = () => {
    navigate('/profileuser');
  }
  const gologin = () => {
    navigate('/login');
  }
  const goregistre = () => {
    navigate('/register');
  }
  useEffect(() => {
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
          setFirstName(res.data.Firstname);
          setLastName(res.data.Lastname);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchData();
  }, []);




  return (

    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <a className='logomain' href="/">
          <img src={require("../sources/poste.svg.png")} height={145} width={140} alt="banner-image" />

        </a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav align-items-center ms-lg-5">
            <li className="nav-item">
              <a class="nav-link" href="/">Accueil</a>
            </li>


            <li className="nav-item " ><a className="nav-link " href="/offre?type=Emploi">Emploi</a></li>
            <li className="nav-item" ><a className="nav-link" href="/offre?type=Formation">Formation</a></li>

            <li className="nav-item"><a className="nav-link" href="/offre?type=Stage">Stage</a></li>
            <li class="nav-item dropdown">
              <a href="#" class="nav-link dropdown-toggle" id="navbarLightDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false" >Offre par métier</a>
              <ul class="dropdown-menu dropdown-menu-light" aria-labelledby="navbarLightDropdownMenuLink">
                <li><a class="dropdown-item" href="/offre?keyword=Developpement">Offre de developpement</a></li>

                <li><a class="dropdown-item" href="/offre?keyword=ingenieur">Offre d'ingenieur</a></li>
                <li><a class="dropdown-item" href="/offre?keyword=Industrie">Offre d'industrie</a></li>

                <li><a class="dropdown-item" href="/offre?keyword=Commerce">Offre de Commerce</a></li>

                <li><a class="dropdown-item" href="/offre?keyword=Automobile">Offre d' Automobile</a></li>

                <li><a class="dropdown-item" href="/offre?keyword=Marketing">Offre de Marketing</a></li>

                <li><a class="dropdown-item" href="/offre?keyword=Télécommunications">Offre de Télécommunications</a></li>

                <li><a class="dropdown-item" href="/offre?keyword=Comptabilité">Offre de Comptabilité</a></li>

                <li><a class="dropdown-item" href="/offre?keyword=Electronique">Offre d'Electronique</a></li>

                <li><a class="dropdown-item" href="/offre?keyword=Assurances">Offre d'Assurances</a></li>

                <li><a class="dropdown-item" href="/offre?keyword=Mécanique">Offre de Mécanique</a></li>

                <li><a class="dropdown-item" href="/offre?keyword=Pharmaceutiques">Offre de Pharmaceutiques</a></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarLightDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Offre par Ville</a>
              <ul class="dropdown-menu dropdown-menu-light" aria-labelledby="navbarLightDropdownMenuLink">
                <li> <a class="dropdown-item" href="/offre?location=mourouj">Offre au mourouj</a></li>
                <li> <a class="dropdown-item" href="/offre?location=lac">Offre au lac</a></li>
                <li> <a class="dropdown-item" href="/offre?location=Tunis">Offre au Tunis</a></li>
                <li><a class="dropdown-item" href="/offre?location=Kram">Offre au Kram</a></li>

                <li><a class="dropdown-item" href="/offre?location=Monastir">Offre à Monastir</a></li>

                <li><a class="dropdown-item" href="/offre?location=Soukra">Offre  à La Soukra</a></li>

                <li><a class="dropdown-item" href="/offre?location=Ben Arous">Offre à Ben Arous</a></li>

                <li> <a class="dropdown-item" href="/offre?location=Sahloul">Offre à Sahloul</a></li>

                <li><a class="dropdown-item" href="/offre?location=Megrine">Offre à Megrine</a></li>

                <li><a class="dropdown-item" href="/offre?location=Manouba">Offre à Manouba</a></li>

                <li><a class="dropdown-item" href="/offre?location=Mghira">Offre au Zone Industrielle El Mghira</a></li>

                <li> <a class="dropdown-item" href="/offre?location=Bizerte">Offre au Bizerte</a></li>

                <li> <a class="dropdown-item" href="/offre?location=Marsa">Offre à Marsa</a></li>

                <li> <a class="dropdown-item" href="/offre?location=Lafayette">Offre à Lafayette</a></li>
              </ul>
            </li>
            {role === "employee" || role === "candidat" || role === "admin" ?
              <li>
                <a className="dropdown-item" href={role === "employee" ? "/dashbordemployeeoffre" : role === "candidat" ? "/dashbordcandidatoffre" : "/dashbord"}>
                  Visualisation
                </a>
              </li>
              : null
            }

          </ul>

          {isLoggedIn ? (

            <div className="user-info">
              <p> <i className="fas fa-circle connected-icon"></i>{firstName} {lastName}</p>

              <ul className="navbar-nav align-items-center ms-lg-5 user-actions">
                <li className="nav-item">
                  <button className="bouttonnav4" onClick={goprofile}>Mon compte</button>
                </li>
                <li className="nav-item">
                  <button className="bouttonnav" onClick={handleLogout}>Déconnexion</button>
                </li>
              </ul>
            </div>
          ) : (

            <ul className="navbar-nav align-items-center ms-lg-5">
              <li className="nav-item">
                <button className='bouttonnav3' onClick={goregistre}>S'inscrire</button>
              </li>

              <li className="nav-item">


                <button className='bouttonnav2' onClick={gologin}>Connexion</button>
              </li>
            </ul>



          )}

        </div>
      </div>
    </nav>

  );
}

export default Navbar;