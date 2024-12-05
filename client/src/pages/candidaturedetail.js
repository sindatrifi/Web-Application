import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CandidatureDetail = () => {
    const { id, candidatureid } = useParams();
    const [candidature, setCandidature] = useState({});
    const [user, setUser] = useState({});


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the candidature data
                const candidatureRes = await axios.get(`/api/offres/${id}/candidatures/${candidatureid}`);
                const candidatureData = candidatureRes.data;
                setCandidature(candidatureData);

                // Fetch user data for each candidature
                const candidatForm = await axios.get(`/api/candidatform`);
                const userId = candidatureData.name;
                const document = candidatureData.diploma;
                const cv=candidatureData.cv;
                const motivation=candidatureData.motivation;
                if (userId === undefined) {
                    throw new Error('No candidature data found');
                }

                if (userId === null) {
                    throw new Error('No user data found for the candidature');
                }

                // Fetch the user data for the candidature
                const userRes = await axios.get(`/api/users/${userId}`);
                const userData = userRes.data;
                setUser(userData);

                // Filter candidatForm data for the current candidature
                const filteredData = candidatForm.data.filter(item => item.UserId === userId);

                if (filteredData.length === 0) {
                    throw new Error(`No candidat form data found for candidature ${userId}`);
                }

                // Add diplome and nombreannee properties from candidatForm
                setCandidature(candidature => ({
                    ...candidature,
                    diplome: filteredData[0].diplome,
                    nombreannee: filteredData[0].nombreannee,
                    experience_professionnelle: filteredData[0].experience_professionnelle,
                    niveau_etude: filteredData[0].niveau_etude,
                    universite: filteredData[0].universite,
                    competences: filteredData[0].competences,
                    emploi_desire: filteredData[0].emploi_desire,
                    titre_emploi_desire: filteredData[0].titre_emploi_desire,
                    salaire: filteredData[0].salaire,
                    status: filteredData[0].status,
                    lettre_motivation: filteredData[0].lettre_motivation,
                    langues: filteredData[0].langues,
                    nombreannee: filteredData[0].nombreannee,
                    Detail: filteredData[0].Detail,
                    Mission: filteredData[0].Mission,
                    document,
                    cv,
                    motivation,

                }))
            }
            catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [id, candidatureid]);
    const handleRetourClick = () => {
        window.location.href = `/offres/${id}/candidatures`;
    };
    return (
        <section class="job-section section-padding pb-0">
            <div class="container">
                <div class="row">

                    <div class="col-lg-8 col-12">
                        <h2 class="job-title mb-0">{user.Firstname} {user.Lastname}</h2>

                        <div class="job-thumb job-thumb-detail">
                            <div class="d-flex flex-wrap align-items-center border-bottom pt-lg-3 pt-2 pb-3 mb-4">
                                <p class="job-location mb-0">

                                    <i class="custom-icon fas fa-map-marker-alt iicone"></i>
                                    {user.Adress}
                                </p>

                                <p class="job-date mb-0">
                                <i class="custom-icon fas fa-user iicone"></i>
                                    {user.Age} ans
                                </p>



                            </div>

                            <h4 class="mt-4 mb-2">Lettre de motivation</h4>

                            <p>{candidature.lettre_motivation}</p>
                             <p> <h4>Motivation spécifique:</h4>{candidature.motivation}</p>

                            <h5 class="mt-4 mb-3">Experience :</h5>

                            <p class="mb-1"><strong>Nombre d'annee d'experience:</strong>{candidature.nombreannee}</p>
                            <p class="mb-1"><strong>Détails de l'expérience : Nom de la société / Entreprise</strong> {candidature.Detail}</p>

                            <p class="mb-1"><strong>Titre de Poste - Mission:</strong> {candidature.Mission}</p>




                            <h5 class="mt-4 mb-3">Langues :</h5>


                            <p class="mb-1">{candidature.langues}</p>

                            <div>
                                <h5 class="mt-4 mb-3">Compétences :</h5>


                                <p class="mb-1">{candidature.competences}</p>
                                <h5 class="mt-4 mb-3">Compétences pour l'offre:</h5>


                                <p class="mb-1">{candidature.cv}</p>
                            </div>
                            <div class="d-flex justify-content-center flex-wrap mt-5 border-top pt-4">
                                <button className=" btn-danger  mt-2" onClick={handleRetourClick}>
                                    Retour
                                </button>
                            </div>
                        </div>

                    </div>
                    <div class="col-lg-4 col-12 mt-5 mt-lg-0">
                        <div class="job-thumb job-thumb-detail-box bg-white shadow-lg">


                            <h6 class="mt-3 mb-2">Education</h6>
                            <p>
                            <i class="custom-icon fas fa-university iicone"></i>
                                {candidature.universite}
                            </p>
                            <p>
                            <i className="custom-icon fas fa-book iicone"></i>
                                {candidature.diplome}
                            </p>
                            <p>
                            <i class="custom-icon fas fa-graduation-cap iicone"></i>
                                {candidature.niveau_etude}
                            </p>

                            <h6 class="mt-4 mb-3"> Informations du contact</h6>



                            <p class="mb-2">
                                <i class="custom-icon fas fa-phone me-1"></i>

                                <a href="tel: 305-240-9671" class="site-footer-link">
                                    {user.Phone}
                                </a>
                            </p>

                            <p>
                                <i class="custom-icon fas fa-envelope me-1"></i>

                                <a href="mailto:info@yourgmail.com" class="site-footer-link">
                                    {user.Email}
                                </a>
                            </p>

                        </div>

                    </div>
                </div>
            </div>

        </section>

    );
};

export default CandidatureDetail;