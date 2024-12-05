import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../listcandidature.css'
import Alert from '../components/Alert';
const CandidatureList = () => {
  const [candidatures, setCandidatures] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showFormationForm, setShowFormationForm] = useState(false);
  const [showNotif, setNotifForm] = useState(false);
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const [url, setUrl] = useState('');
  const [codeAccess, setCodeAccess] = useState('');
  const [adresse, setAdresse] = useState('');
  const [documentsDemandes, setDocumentsDemandes] = useState('');
  const [heure, setHeure] = useState('');
  const [message, setMessage] = useState('');
  const [numCandidats, setNumCandidats] = useState(0);
  const [selectedCandidature, setSelectedCandidature] = useState(null);
  const [candidatePointer, setCandidatePointer] = useState(null);
  const [nomOffre, setNomOffre] = useState('');
  const [experienceCoefficient, setExperienceCoefficient] = useState(0);
  const [skillsCoefficient, setSkillsCoefficient] = useState(0);
  const [ageCoefficient, setAgeCoefficient] = useState(0);
  const [languesCoefficient, setLanguesCoefficient] = useState(0);
  const [offretype, setOffretype] = useState('');
  const { id } = useParams();
  const [messagealert, setMessagealert] = useState("");
  const [show, setShow] = useState(false);
  const [UserId, setUserId] = useState('');
  const [userRole, setUserRole] = useState('');

  const getUserId = async () => {
    try {
      const response = await fetch('/api/protected', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const userId = response.headers.get('userId');
  
  return userId
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(async() => {
    const userId=await getUserId()
    setUserId(userId)
    
    const fetchData = async () => {
      try {
        
        // Fetch the offer
        const offreRes = await axios.get(`/api/offres/${id}`);
        const offre = offreRes.data;
        setNomOffre(offre.name);
        setExperienceCoefficient(offre.CoefficientExperience);
        setSkillsCoefficient(offre.CoefficientSkills);
        setAgeCoefficient(offre.CoefficientAge);
        setLanguesCoefficient(offre.CoefficientLangues);
        setOffretype(offre.type)
        // Fetch all candidatures for the specified offer
        const res = await axios.get(`/api/offres/${id}/candidatures`);
        const candidatures = res.data;
        
      

        // Fetch candidat form data to get user id
        const candidatForm = await axios.get(`/api/candidatform`);
        const userId = candidatForm.data.UserId;
        
        // Fetch user data for each candidature
        const updatedCandidatures = await Promise.all(candidatures.map(async candidature => {
          if (candidature.name === userId) {
            // Add diplome and nombreannee properties from candidatForm
            candidature.diplome = candidatForm.data.diplome;
            candidature.nombreannee = candidatForm.data.nombreannee;

          } else {
            // Filter candidatForm data for the current candidature
            const filteredData = candidatForm.data.filter(item => item.UserId === candidature.name);
            if (filteredData.length === 0) {
              throw new Error(`No candidat form data found for candidature ${candidature.name}`);
            }
            // Add diplome and nombreannee properties from candidatForm
            candidature.diplome = filteredData[0].diplome;
            candidature.nombreannee = filteredData[0].nombreannee;
            candidature.experience_professionnelle = filteredData[0].experience_professionnelle;
            candidature.niveau_etude = filteredData[0].niveau_etude;
            candidature.universite = filteredData[0].universite;
            candidature.competences = filteredData[0].competences;
            candidature.langues = filteredData[0].langues;
           
            // Fetch user data for the candidature
            const res = await axios.get(`/api/users/${candidature.name}`);
            // Add user data to the candidature object
            candidature.firstname = res.data.Firstname;
            candidature.lastname = res.data.Lastname;
            candidature.Age = res.data.Age;
            candidature.Adress = res.data.Adress;
            candidature.Email = res.data.Email;
            
          
         const cvArray=candidature.cv.split(',').map(c => c.trim());
            const cvscore=cvArray.length*skillsCoefficient;
            const languesArray = candidature.langues.split(',').map(langue => langue.trim());
            const languesScore = languesArray.length * languesCoefficient;
            const skillsArray = candidature.competences.split(',').map(skill => skill.trim());
            const skillsScore = skillsArray.length * skillsCoefficient;
            const totalScore =
              experienceCoefficient * parseInt(candidature.nombreannee) +
              skillsScore + languesScore +cvscore+
              ageCoefficient * parseInt(candidature.Age);
            candidature.totalScore = totalScore;
          }
          return candidature;
        }));
        updatedCandidatures.sort((a, b) => b.totalScore - a.totalScore);

        setCandidatures(updatedCandidatures);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, experienceCoefficient, skillsCoefficient, ageCoefficient, languesCoefficient]);
  const handleDelete = (candidatureId) => {
    if (window.confirm("êtes-vous sûr de supprimer cette candidature ?")) {
    axios.delete(`/api/offres/${id}/candidatures/${candidatureId}`)
      .then(res => {
        // handle successful deletion of candidature
  
        // Delete applied_offre
        const candidature = candidatures.find(candidature => candidature._id === candidatureId);
        if (candidature) {
          axios.delete(`/api/users/${candidature.name}/applied_offers/${id}`)
            .then(res => {
              // handle successful deletion of applied_offre
              const updatedCandidatures = candidatures.filter(candidature => candidature._id !== candidatureId);
              setCandidatures(updatedCandidatures);
              const message = `Votre candidature pour l'offre ${nomOffre} a été refusée.`;
              axios.post('/api/notification', {
                message,
                userId: candidature.name,
              })
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }};
  const handleShowForm = () => {
    setShowForm(!showForm);
  };
  const handleShowFormationForm=()=>{
    setShowFormationForm(!showFormationForm);
  }
  const handlenotifShowForm = candidature => {
    setSelectedCandidature(candidature);
    setNotifForm(true);
  };
  const handleDetailsClick = candidature => {
    setShowDetails(true);
    setSelectedCandidature(candidature);
  };

  const handleCancel = () => {
    setNotifForm(false);
    setMessage('');
  };
  const handleCancelForm = () => {
    setShowForm(false);
  }
  const handleCancelFormationForm= () => {
    setShowFormationForm(false);
  }
  const handlenotifSubmit = async (event) => {
    event.preventDefault();
    try {
      const notification = {
        userId: selectedCandidature.name,
        message: message,

      };
      await axios.post('/api/notification', notification);
      setNotifForm(false);

      setMessage('');
      setMessagealert("Message envoyé avec succés");
      setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 4000);

    } catch (err) {
      console.log(err);
    }
  };
  const handleFormationSubmit= async (e) => {
    e.preventDefault();

    try {
      const selectedCandidates = candidatures
      .filter((candidature) => candidature.etat !== "Selectionné")

        .slice(candidatePointer, candidatePointer + parseInt(numCandidats))
        .map((candidature) => candidature.name); // Get the names of the selected candidates

      const formationRes = await axios.post(`/api/formations`, {
        type,
        date,
        offre: id,
        employeeid:UserId,
        user: selectedCandidates,
        adresse,
        heure,
        Documents_demandes: documentsDemandes,
        url,
        code_access: codeAccess,
      });

      const formation = formationRes.data;
      setMessagealert("Formation organisé avec succés");
      setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 4000);
        const updateEtatPromises = selectedCandidates.map(async (selectedCandidate) => {
          const candidatureToUpdate = candidatures.find((candidature) => candidature.name === selectedCandidate);
          if (candidatureToUpdate) {
            await axios.put(`/api/offres/${id}/candidatures/${candidatureToUpdate._id}`, {
              cv:candidatureToUpdate.cv,
              motivation:candidatureToUpdate.motivation,
              etat: "Selectionné",
            });
          }
        });
        await Promise.all(updateEtatPromises);
      // Send notification to each user in the candidatures list
      const notificationPromises = candidatures
      .filter((candidature) => candidature.etat !== "Selectionné")
        .slice(candidatePointer, candidatePointer + parseInt(numCandidats))
        .map(async (candidature) => {
          const userRes = await axios.get(`/api/users/${candidature.name}`);
          const user = userRes.data;
          console.log(formation.offre.name);
          let message = `Vous etes selectionner pour  la formation ${nomOffre} le ${formation.date}.`;
          if (formation.type === 'en_ligne') {
            message = message + `  La formation est ${formation.type}. Voici le lien de la formation : ${formation.url} et le code d'accès :${formation.code_access}`;
          } else if (formation.type === 'presentiel') {
            message = message + ` La formation est ${formation.type}. Elle aura lieu à l'adresse suivante : ${formation.adresse}. Les documents demandés sont les suivants : ${formation.Documents_demandes}.`;
          }
          const notificationRes = await axios.post('/api/notification', {
            message,
            userId: user._id,
          });
          return notificationRes.data;
        });
      const notifications = await Promise.all(notificationPromises);

      // Reset form state and fetch updated candidatures
      setDate('');
      setHeure('');
      setType('');
      setUrl('');
      setAdresse('');
      setCodeAccess("");
      setDocumentsDemandes("");
      setShowForm(false);
      if (candidatePointer + parseInt(numCandidats) >= candidatures.length) {
        setCandidatePointer(0);
      } else {
        setCandidatePointer(candidatePointer + parseInt(numCandidats));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     
        const selectedCandidates = candidatures
        .filter((candidature) => candidature.etat !== "Selectionné")

          .slice(candidatePointer, candidatePointer + parseInt(numCandidats))
          .map((candidature) => candidature.name);// Get the names of all candidates
     // Get the names of the selected candidates

      const entretienRes = await axios.post(`/api/entretiens`, {
        type,
        date,
        offre: id,
        employeeid:UserId,
        user: selectedCandidates,
        adresse,
        heure,
        Documents_demandes: documentsDemandes,
        url,
        code_access: codeAccess,
      });

      const entretien = entretienRes.data;
      setMessagealert("Entretien organisé avec succés");
      setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 4000);
        const updateEtatPromises = selectedCandidates.map(async (selectedCandidate) => {
          const candidatureToUpdate = candidatures.find((candidature) => candidature.name === selectedCandidate);
          if (candidatureToUpdate) {
            await axios.put(`/api/offres/${id}/candidatures/${candidatureToUpdate._id}`, {
              cv:candidatureToUpdate.cv,
              motivation:candidatureToUpdate.motivation,
              etat: "Selectionné",
            });
          }
        });
        await Promise.all(updateEtatPromises);
      // Send notification to each user in the candidatures list
      const notificationPromises = candidatures.filter((candidature) => candidature.etat !== "Selectionné")
        .slice(candidatePointer, candidatePointer + parseInt(numCandidats))
        .map(async (candidature) => {
          const userRes = await axios.get(`/api/users/${candidature.name}`);
          const user = userRes.data;
          console.log(entretien.offre.name);
          let message = `Vous avez un entretien pour l'offre ${nomOffre} le ${entretien.date}.`;
          if (entretien.type === 'en_ligne') {
            message = message + ` L'entretien est ${entretien.type}.Voici le lien de la réunion : ${entretien.url} et le code d'accès :${entretien.code_access}`;
          } else if (entretien.type === 'presentiel') {
            message = message + ` L'entretien est ${entretien.type}.Il aura lieu à l'adresse suivante : ${entretien.adresse}. Les documents demandés sont les suivants : ${entretien.Documents_demandes}.`;
          }
          const notificationRes = await axios.post('/api/notification', {
            message,
            userId: user._id,
          });
          return notificationRes.data;
        });
      const notifications = await Promise.all(notificationPromises);

      // Reset form state and fetch updated candidatures
      setDate('');
      setType('');
      setHeure('');
      setUrl('');
      setAdresse('');
      setCodeAccess("");
      setDocumentsDemandes("");
      setShowForm(false);
      if (candidatePointer + parseInt(numCandidats) >= candidatures.length) {
        setCandidatePointer(0);
      } else {
        setCandidatePointer(candidatePointer + parseInt(numCandidats));
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section classname="candidat">
              <Alert message={messagealert} show={show}/>
      <div className='container' >

        <div className="row">

          <div class="col-lg-6 col-12 text-center mx-auto mb-4">
            <h2>La liste des candidatures</h2>

            <p>Découvrez notre liste triée de candidatures, classées selon un score pertinent, pour trouver les talents qui correspondent le mieux à vos besoins sur notre application web de recrutement.</p>
          </div>

          <ul class="col-lg-12 col-12"> {candidatures.map(candidature => (

            <li class="job-thumb d-flex">
              <div class="job-body d-flex flex-wrap flex-auto align-items-center ms-4" key={candidature._id}>
                <div class="mb-3">
                  <h4 class="job-title mb-lg-0">
                    <span class="job-title-link">{candidature.firstname} {candidature.lastname} </span></h4>

                  <div class="d-flex flex-wrap align-items-center">
                    <p className="job-location mb-0 score">
                    <i class="custom-icon fas fa-chart-bar"></i>
                      {candidature.totalScore.toFixed(2)}
                    </p>
                  </div>
                  <div class="d-flex flex-wrap align-items-center">
                    <p class="job-location mb-0">


                      <i className="custom-icon fas fa-book iicone"></i>
                      {candidature.diplome}
                    </p>

                    <p class="job-date mb-0">
                      <i className="custom-icon fas fa-graduation-cap iicone"></i>
                      {candidature.niveau_etude}
                    </p>
                    <p class="job-price mb-0">
                      <i className="custom-icon fas fa-user iicone" ></i>
                      {candidature.Age} ans
                    </p>

                  </div>
                  <div class="d-flex flex-wrap align-items-center">
                  <p class="job-price mb-0">
                   {candidature.etat}
                    </p>
                    </div>
                </div>
             
                <div class="job-section-btn-wrap">
                {userRole !== 'admin' && (
                  <>
                <span className="badge bg-danger badgecandidature " >
                
                    <i className="fas fa-times delete-icon" onClick={() => handleDelete(candidature._id)}></i>
                  </span>
                  <span className='badge bg-info badgecandidature'>
                    <i className="fas fa-bell" onClick={() => handlenotifShowForm(candidature)}></i>
                  </span>
                  </>
                )}

                  <button class="custom-btn btn" onClick={() => window.location.href = `/offres/${id}/candidatures/${candidature._id}`}>Détails</button>

                </div>

              </div>
            </li>
          ))}
          </ul>


        </div>
       
 
    {offretype !== 'Formation' ? (
      <button className="custom-btn" onClick={handleShowForm}>
        Organiser entretien
      </button>
    ) : (
      <button className="custom-btn" onClick={handleShowFormationForm}>
        Notifier les candidats acceptés
      </button>
   
  
)}




        {showForm && (
          <form onSubmit={handleSubmit}>
            <label>
              Date:
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
            <div className="form-group">
              <label>Number of Candidates:</label>
              <input type="number" value={numCandidats} onChange={(e) => setNumCandidats(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Heure:</label>
              <input type="number" value={heure} onChange={(e) => setHeure(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="en_ligne">En ligne</label>
              <input type="radio" id="en_ligne" name="type" value="en_ligne" checked={type === "en_ligne"} onChange={(e) => setType(e.target.value)} />
              {type === "en_ligne" && (
                <div>
                  <label htmlFor="url">URL:</label>
                  <input type="text" id="url" value={url} onChange={(e) => setUrl(e.target.value)} />
                  <label htmlFor="code_access">Code d'accès:</label>
                  <input type="text" id="code_access" value={codeAccess} onChange={(e) => setCodeAccess(e.target.value)} />
                </div>
              )}
            </div>
            <div>
              <label htmlFor="presentiel">Présentiel</label>
              <input type="radio" id="presentiel" name="type" value="presentiel" checked={type === "presentiel"} onChange={(e) => setType(e.target.value)} />
              {type === "presentiel" && (
                <div>
                  <label htmlFor="adresse">Adresse:</label>
                  <input type="text" id="adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
                  <label htmlFor="documents">Documents demandés:</label>
                  <input type="text" id="documents" value={documentsDemandes} onChange={(e) => setDocumentsDemandes(e.target.value)} />
                </div>
              )}
            </div>

            <button type="submit">Enregistrer</button>
            <button
              type="button"
              className=" btn-secondary space"
              onClick={handleCancelForm}
            >
              Annuler
            </button>
          </form>
        )}
        {showFormationForm && (
          <form onSubmit={handleFormationSubmit}>
            <label>
              Date:
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
            <div className="form-group">
              <label>Number of Candidates:</label>
              <input type="number" value={numCandidats} onChange={(e) => setNumCandidats(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Heure:</label>
              <input type="number" value={heure} onChange={(e) => setHeure(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="en_ligne">En ligne</label>
              <input type="radio" id="en_ligne" name="type" value="en_ligne" checked={type === "en_ligne"} onChange={(e) => setType(e.target.value)} />
              {type === "en_ligne" && (
                <div>
                  <label htmlFor="url">URL:</label>
                  <input type="text" id="url" value={url} onChange={(e) => setUrl(e.target.value)} />
                  <label htmlFor="code_access">Code d'accès:</label>
                  <input type="text" id="code_access" value={codeAccess} onChange={(e) => setCodeAccess(e.target.value)} />
                </div>
              )}
            </div>
            <div>
              <label htmlFor="presentiel">Présentiel</label>
              <input type="radio" id="presentiel" name="type" value="presentiel" checked={type === "presentiel"} onChange={(e) => setType(e.target.value)} />
              {type === "presentiel" && (
                <div>
                  <label htmlFor="adresse">Adresse:</label>
                  <input type="text" id="adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
                  <label htmlFor="documents">Documents demandés:</label>
                  <input type="text" id="documents" value={documentsDemandes} onChange={(e) => setDocumentsDemandes(e.target.value)} />
                </div>
              )}
            </div>

            <button type="submit">Enregistrer</button>
            <button
              type="button"
              className=" btn-secondary space"
              onClick={handleCancelFormationForm}
            >
              Cancel
            </button>
          </form>
        )}
        {showNotif && (
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <div className="card-body">

                <form onSubmit={(e) => handlenotifSubmit(e)}>

                  <label htmlFor="message">Message:</label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="message"
                    placeholder="Enter message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />

                  <button type="submit" className=" btn-primary">
                    Send
                  </button>
                  <button
                    type="button"
                    className=" btn-secondary space"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>

        )}
      </div>

    </section >
  );
};

export default CandidatureList;