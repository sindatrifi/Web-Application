import React, { useState, useEffect } from 'react';
import "../showform.css"
import ProfileBar from '../components/profilebar';
import axios from 'axios';
import Alert from '../components/Alert';

const EditForm = () => {
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
 
  const [candidatForm, setCandidatForm] = useState({
    nombreannee: "",
    Detail: "",
    Mission: "",
    Description: "",
    universite: "",
    niveau_etude: "",
    diplome: "",
    experience_professionnelle: "",
    emploi_desire: "",
    langues: "",
    competences: "",
    lettre_motivation: "",

  });

  const handleChange = (event) => {
    setCandidatForm({ ...candidatForm, [event.target.name]: event.target.value });
  }



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

        const Id = res.headers.get('userId')

        const data = await response.json();
        console.log(candidatForm._id)
        // filter candidat form data for the user who is authenticated
        const filteredData = data.filter(candidatForm => candidatForm.UserId == Id);
        if (filteredData.length === 0) {
          throw new Error('No candidat form data found for the authenticated user');
        }

        setCandidatForm(filteredData[0]);
      } catch (error) {
        console.error(error);
        // redirect to error page

      }
    };

    getCandidatForm();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`/api/candidatform/${candidatForm._id}`, candidatForm, {

        headers: {

          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ candidatForm }),


      });
      window.location.href = "/candidatform";
      if (!response.ok) {
        throw new Error('Failed to update candidat form data');
      }

    } catch (error) {
      console.error(error);
      // display error message to user
    }
  }
  const handleRetourClick = () => {
    window.location.href = `/candidatform`;
  };
  return (
          <>
<Alert message={message} show={show}/>
    <div class="containercandidat-cv">

      <ProfileBar />
      <div className='containercv'>
      <div class="candidatform-cv">
        <div class="about-cv">
          <span class="position-cv">Modifier le CV du candidat</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} >
        <div class="details-cv">
          <div class="section-cv">
            <div class="section__title-cv">Experience</div>
            <div class="section__list-cv">
              <div class="section__list-item-cv">
                <div class="left-cv">
                  <div class="name-cv"><strong>Nombre d'années : </strong><input type="text" name="nombreannee" value={candidatForm.nombreannee} onChange={handleChange} /></div>
                  <div class="addr-cv"><strong>Nom de la société / Entreprise: </strong><input type="text" name="Detail" value={candidatForm.Detail} onChange={handleChange} /></div>
                  <div class="duration-cv"><strong>Mission: </strong><input type="text" name="Mission" value={candidatForm.Mission} onChange={handleChange} /></div>
                  <div class="name-cv"><strong>Description</strong></div>
                  <div class="descv"><textarea name="Description" value={candidatForm.Description} onChange={handleChange} /></div>
                </div>
              </div>
            </div>
          </div>
          <div class="section-cv">
            <div class="section__title-cv">Education</div>
            <div class="section__list-cv">
              <div class="section__list-item-cv">
                <div class="left-cv">
                  <div class="name-cv"><strong>Université</strong><input type="text" name="universite" value={candidatForm.universite} onChange={handleChange} /></div>
                  <div class="addr-cv"><strong>Niveau d'étude:</strong> <input type="text" name="niveau_etude" value={candidatForm.niveau_etude} onChange={handleChange} /></div>
                  <div class="duration-cv"><strong>Diplôme:</strong><input type="text" name="diplome" value={candidatForm.diplome} onChange={handleChange} /> </div>
                </div>
              </div>
            </div>
          </div>
          <div class="section-cv">
            <div class="section__title-cv">Intérêts Professionnels</div>
            <div class="section__list-cv">
              <div class="section__list-item-cv">
                <div class="name-cv"><strong> Expérience professionnelle:</strong></div>
                <div class="text-cv"><input type="text" name="experience_professionnelle" value={candidatForm.experience_professionnelle} onChange={handleChange} /></div>
              </div>
              <div class="section__list-item">
                <div class="name"><strong>Type d'emploi désiré</strong></div>
                <div class="text"><input type="text" name="emploi_desire" value={candidatForm.emploi_desire} onChange={handleChange} /></div>
              </div>
            </div>
          </div>
          <div class="section-cv">
            <div class="section__title-cv">Informations Professionelles</div>
            <div class="skills-cv">
              <div class="skills__item-cv">

                <div class="name-cv"><strong>langues:</strong></div>
                <div class="text-cv"><textarea name="langues" value={candidatForm.langues} onChange={handleChange} /></div>
              </div>
              <div class="skills__item-cv">

                <div class="name-cv"><strong>Compétences:</strong> </div>
                <div class="text-cv"><textarea name="competences" value={candidatForm.competences} onChange={handleChange} /></div>
              </div>
            </div>
          </div>
          <div class="section-cv">
            <div class="section__title-cv">Informations Générales</div>
            <div class="section__list-cv">
              <div class="section__list-item-cv">

                <textarea name="lettre_motivation" value={candidatForm.lettre_motivation} onChange={handleChange} />
              </div>

            </div>
          </div>
        </div>
        <div className="form-group-cv">
          <button type="submit" className=" btn-primary">
            Sauvegarder
          </button>
         
            <button
              type="button"
              className=" btn-secondary space"
              onClick={handleRetourClick}
            >
              Annuler
            </button>
           
        </div>
      </form>
      </div>
    </div>
    </>
  );
};
export default EditForm;