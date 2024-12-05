import React, { useState, useEffect } from 'react';
import "../showform.css"
import ProfileBar from '../components/profilebar';

const ShowForm = () => {
  const [candidatForm, setCandidatForm] = useState(null);
  const [photoUrl, setPhotoUrl] = useState('');
  let Id = 0;

  useEffect(() => {
    const getCandidatForm = async () => {
      try {
        const response = await fetch('/api/candidatform', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch candidat form data');
        }
        const res = await fetch('/api/protected', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })


        Id = res.headers.get('userId')

        const data = await response.json();
        // filter candidat form data for the user who is authenticated
        const filteredData = data.filter(candidatForm => candidatForm.UserId == Id);
        if (filteredData.length === 0) {
          throw new Error('No candidat form data found for the authenticated user');
        }

        setCandidatForm(filteredData[0]);
        setPhotoUrl(filteredData[0].photo);
      } catch (error) {
        console.error(error);
        // redirect to error page

      }
    };

    getCandidatForm();
  }, []);

  if (!candidatForm) {
    return <div>Loading...</div>;
  }
  const handleEditClick = () => {
    window.location.href = "/edit-candidat-form"; // redirect to candidat form edit page
  }
  return (
    <div class="containercandidat-cv">
      <ProfileBar />
      <div class="containercv">
      <div class="candidatform-cv">
        <div class="about-cv">
          <h2 className='text-white'>Mon CV </h2>
        </div>
      </div>
      <div class="details-cv">
        <div class="section-cv">
          <div class="section__title-cv">Experience</div>
          <div class="section__list-cv">
            <div class="section__list-item-cv">

              <div class="name-cv"><strong>Nombre d'années : </strong>{candidatForm.nombreannee}</div>
            </div>
            <div class="section__list-item-cv">
              <div class="addr-cv"><strong>Nom de la société / Entreprise: </strong>{candidatForm.Detail}</div>
            </div>
            <div class="section__list-item-cv">
              <div class="duration-cv"><strong>Mission: </strong>{candidatForm.Mission}</div>
            </div>
            <div class="section__list-item-cv">
              <div class="name-cv"><strong>Description:</strong></div>
            </div>
            <div>
              <div class="desc-cv">{candidatForm.Description}</div>
            </div>

          </div>
        </div>
        <div class="section-cv">
          <div class="section__title-cv">Education</div>
          <div class="section__list-cv">
            <div class="section__list-item-cv">

              <div class="name-cv"><strong>Université:</strong>{candidatForm.universite}</div>
            </div>
            <div class="section__list-item-cv">

              <div class="addr-cv"><strong>Niveau d'étude:</strong> {candidatForm.niveau_etude}</div>
            </div>
            <div class="section__list-item-cv">
              <div class="duration-cv"><strong>Diplôme:</strong> {candidatForm.diplome}</div>
            </div>

          </div>
        </div>
        <div class="section-cv">
          <div class="section__title-cv">Intérêts Professionnels</div>
          <div class="section__list-cv">
            <div class="section__list-item-cv">
              <div class="name-cv"><strong>Expérience professionnelle:</strong></div>
              <div class="text-cv">{candidatForm.experience_professionnelle}</div>
            </div>
            <div class="section__list-item-cv">
              <div class="name-cv"><strong>Type d'emploi désiré:</strong></div>
              <div class="text-cv">{candidatForm.emploi_desire}</div>
            </div>
            <div class="section__list-item-cv">
              <div class="name-cv"><strong>Titre du poste désiré:</strong></div>
              <div class="text-cv">{candidatForm.titre_emploi_desire}</div>
            </div>
          </div>
        </div>
        <div class="section-cv">
          <div class="section__title-cv">Informations Professionelles</div>
          <div class="skills-cv">
            <div class="section__list-item-cv">

              <div class="name-cv"><strong>langues:</strong>{candidatForm.langues}</div>

            </div>
            <div class="section__list-item-cv">

              <div class="name-cv"><strong>Compétences:</strong> {candidatForm.competences}</div>

            </div>
          </div>
        </div>
        <div class="section-cv">
          <div class="section__title-cv">Informations Générales</div>
          <div class="section__list-cv">
            <div class="section__list-item-cv">
              {candidatForm.lettre_motivation}

            </div>
            <div class="section__list-item-cv">
              Photo: <img src={photoUrl} />

            </div>
          </div>
        </div>
        <div>
          <button className="custom-btn" onClick={handleEditClick}>Modifier CV</button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ShowForm;