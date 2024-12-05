import React, { useState, useEffect } from 'react';
import "../profilebar.css";
import axios from 'axios';
function VisualisationBar() {
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
    <header className="VisualtionBar">
      <div className="nav-wrap">
        <nav className="main-nav" role="navigation">
          <ul className="unstyled list-hover-slide">
            <h5 className='demandeoffre'>Visualisation des données</h5>
           
            {role === 'candidat' ? (
              <>
               <li>
  <p className='demandeoffre'>Dashbord</p>
  <ul>
  <li><a href="/dashbordcandidatoffre"><i className="fas fa-briefcase"></i> Mes candidatures soumises</a></li>
    <li><a href="/dashbordcandidatformations"><i class="fas fa-chalkboard-teacher"></i> Mes formations planifiées</a></li>
    <li><a href="/dashbordcandidatentretiens"><i class="fas fa-user-tie"></i> Mes entretiens</a></li>
  
  </ul>
</li>
              </>
            ) : null}


            {role === 'employee' ? (
             

<>

<li>
  <p className='demandeoffre'>Dashbord</p>
  <ul>
    <li><a href="/dashbordemployeeoffre"><i className="fas fa-briefcase"></i> Mes offres</a></li>
    <li><a href="/dashborddemployeecandidatures"><i className="fas fa-clipboard"></i> Mes candidatures</a></li>
    <li><a href="/dashbordemployeeformations"><i class="fas fa-chalkboard-teacher"></i> Mes formations planifiées</a></li>
    <li><a href="/dashbordemployeeentretiens"><i class="fas fa-user-tie"></i> Mes entretiens</a></li>
  
  </ul>
</li>




</>
            ) : null}
            {role === 'admin' ? (
              <>

                <li>
                  <p className='demandeoffre'>Dashbord</p>
                  <ul>
                    <li><a href="/dashbord"><i className="fas fa-user"></i> Gestion des employeurs</a></li>
                    <li><a href="/dashbordgestioncandidats"><i className="fas fa-user"></i> Gestion des candidats</a></li>
                    
                    <li><a href="/dashbordgestionoffres"><i className="fas fa-briefcase"></i> Gestion des offres</a></li>
                  <li><a href="/dashbordgestioncandidatures"><i className="fas fa-clipboard"></i> Gestion des candidatures</a></li>
                  <li><a href="/dashbordgestionentretiens"><i class="fas fa-user-tie"></i> Gestion des entretiens</a></li>
                  </ul>
                </li>




              </>
            ) : null}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default VisualisationBar;