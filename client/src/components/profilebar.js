import React, { useState, useEffect } from 'react';
import "../profilebar.css";
import axios from 'axios';
function ProfileBar() {
  const [role, setRole] = useState('');

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

        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchData();
  }, []);

  return (
    <header className="profilebar">
      <div className="nav-wrap">
        <nav className="main-nav" role="navigation">
          <ul className="unstyled list-hover-slide">
            <li>
              <a href="/profileuser"><i className="fas fa-user"></i> Mon compte</a></li>
            <li><a href="/Notification">  <i className="fas fa-bell"></i> Notifications </a></li>
            {role === 'candidat' ? (
              <>
                <li><a href="/candidatform"><i className="fas fa-file-alt"></i> Mon CV </a></li>
                <li>
                  <p className='demandeoffre'>Mes candidatures</p>
                  <ul>
                    <li><a href="/emplois">Emplois</a></li>
                    <li><a href="/stages">Stages</a></li>
                    <li><a href="/formations">Formations</a></li>
                  </ul>
                </li>
                <li><a href="/mesentretiens">Mes entretiens</a></li>
                <li><a href="/userformations">Mes formations à passer</a></li>
              </>
            ) : null}


            {role === 'employee' ? (
              <>

                <li>
                  <p className='demandeoffre'>Mes offres</p>
                  <ul>
                    <li><a href="/mesemplois">Emplois</a></li>
                    <li><a href="/messtages">Stages</a></li>
                    <li><a href="/mesformations">Formations</a></li>
                  </ul>
                </li>


                <li><a href="/entretiens">Entretiens planifiés</a></li>
                <li><a href="/formationlist">Formations planifiées</a></li>
                <li><a href="/historique">Historique des entretiens</a></li>


              </>
            ) : null}
            {role === 'admin' ? (
              <>

                <li>
                  <p className='demandeoffre'>Les utilisateurs</p>
                  <ul>
                    <li><a href="/employee">Les employeurs</a></li>
                    <li><a href="/candidat">Les candidats</a></li>
                    </ul>
                    <li><a href="/adminentretien">Entretiens planifiés</a></li>
                  <li><a href="/adminformation">Formations planifiées</a></li>
                  
                </li>




              </>
            ) : null}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default ProfileBar;