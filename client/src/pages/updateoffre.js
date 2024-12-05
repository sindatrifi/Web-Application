import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../updateoffre.css"

const EditOffre = () => {

  const { id } = useParams();

  const [form, setForm] = useState({});

  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get(`/api/offres/${id}`)
      .then(response => {
        setForm(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/offres/${id}`, form)
      .then(response => {
        window.location.href = `/offres/${id}`;
      })
      .catch(error => {



        console.log(error);
      });
  };
  const handleRetourClick = () => {
    window.location.href = `/offres/${id}`;
  };

  return (
    <div class="container-fluid">
      <div class="row main-content bg-success text-center">
        <div class="col-md-4 text-center company__info">
          <span class="company__logo"><h2><span class="fa fa-android"></span></h2></span>

          <img src={require("../sources/poste.svg.png")} />
        </div>
        <div class="col-md-8 col-xs-12 col-sm-12 login_form ">
          <div class="container-fluid">
            <div class="row">
              <h2>Mise à jour de l'offre</h2>
            </div>
            <div class="row">
              <form onSubmit={handleSubmit} className="form-group">
                <div className="row">

                  <label htmlFor="type">Type</label>
                  <input
                    type="text"
                    name="type"
                    id="type"
                    className="form__input"
                    placeholder="Entrer le type"
                    value={form.type}
                    onChange={handleChange}
                  />
                  {errors.type && (
                    <div className="invalid-feedback">{errors.type}</div>
                  )}
                </div>
                <div className="row">
                  <label htmlFor="name">Nom</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form__input"

                    placeholder="Enter le nom"
                    value={form.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                
               
                
                <div className="row">
                  <label htmlFor="entreprisenom">Nom d'entreprise</label>
                  <input
                    type="text"
                    name="entreprisenom"
                    id="entreprisenom"
                    className="form__input"

                    placeholder="Enter le nom d'entreprise"
                    value={form.entreprisenom}
                    onChange={handleChange}
                  />
                </div>
                <div className="row">
                  <label htmlFor="entreprisephone">Numero de téléphone </label>
                  <input
                    type="text"
                    name="entreprisephone"
                    id="entreprisephone"
                    className="form__input"
                    placeholder="Entrez le numero de télépohne de l'entreprise"
                    value={form.entreprisephone}
                    onChange={handleChange}
                  />
                </div>
                <div className="row">
                  <label htmlFor="entreprisemail">mail d'entreprise</label>
                  <input
                    type="text"
                    name="entreprisemail"
                    id="entreprisemail"
                    className="form__input"
                    placeholder="Entrez le mail de l'entreprise"
                    value={form.entreprisemail}
                    onChange={handleChange}
                  />
                </div>
                <div className="row">
                  <label htmlFor="entreprisesite">site d'entreprise</label>
                  <input
                    type="text"
                    name="entreprisesite"
                    id="entreprisesite"
                    className="form__input"
                    placeholder="Entrez le site de l'entreprise"
                    value={form.entreprisesite}
                    onChange={handleChange}
                  />
                </div>
                <div className="row">
                  <label htmlFor="Description">Description</label>
                  <textarea
                    name="Description"
                    id="Description"
                    className="form__input"

                    placeholder="Entrer la description"
                    value={form.Description}
                    onChange={handleChange}
                  ></textarea>
                  {errors.Description && (
                    <div className="invalid-feedback">{errors.Description}</div>
                  )}
                </div>
                <div className="row">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    name="date"
                    id="date"

                    className="form__input"

                    placeholder="Entrer la date"
                    value={form.date}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.date}</div>
                  )}
                </div>
                <div className="row">
                  <label htmlFor="niveau_etude">Niveau d'education</label>
                  <input
                    type="text"
                    name="niveau_etude"
                    id="niveau_etude"
                    className="form__input"

                    placeholder="Entrer le niveau d'education "
                    value={form.niveau_etude}
                    onChange={handleChange}
                  />
                  {errors.niveau_etude && (
                    <div className="invalid-feedback">{errors.niveau_etude}</div>
                  )}
                </div>
                <div className="row">
                  <label htmlFor="salaire">Salaire</label>
                  <input
                    type="text"
                    name="salaire"
                    id="salaire"
                    className="form__input"

                    placeholder="Entrer le salaire"
                    value={form.salaire}
                    onChange={handleChange}
                  />
                  {errors.salaire && (
                    <div className="invalid-feedback">{errors.salaire}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="langues">Languages</label>
                  <input
                    type="text"
                    name="langues"
                    id="langues"
                    className="form__input"

                    placeholder="Entrer les languages"
                    value={form.langues}
                    onChange={handleChange}
                  />
                  {errors.langues && (
                    <div className="invalid-feedback">{errors.langues}</div>
                  )}
                </div>
                <div className="row">
                  <label htmlFor="lieu">Lieu</label>
                  <input
                    type="text"
                    name="lieu"
                    id="lieu"
                    className="form__input"

                    placeholder="Entrer le lieu"
                    value={form.lieu}
                    onChange={handleChange}
                  />
                  {errors.lieu && (
                    <div className="invalid-feedback">{errors.lieu}</div>
                  )}
                </div>
                <div className="row">
                  <label htmlFor="mot_cles">mots clés</label>
                  <textarea
                    type="text"
                    name="mot_cles"
                    id="mot_cles"
                    className="form__input"

                    placeholder="Entrer les mots clés "
                    value={form.mot_cles}
                    onChange={handleChange}
                  />
                  {errors.mot_cles && (
                    <div className="invalid-feedback">{errors.mot_cles}</div>
                  )}
                </div>
                <div className="row">
                  <label htmlFor="date_dexpiration">Date d'expiration</label>
                  <input
                    type="date"
                    name="date_dexpiration"
                    id="date_dexpiration"
                    className="form__input"

                    placeholder="Enter la date d'expiration "
                    value={form.date_dexpiration}
                    onChange={handleChange}
                  />
                  {errors.date_dexpiration && (
                    <div className="invalid-feedback">{errors.date_dexpiration}</div>
                  )}
                </div>
                <div className="row">
                  <label htmlFor="CommentPostuler">Comment Postuler ?</label>
                  <textarea
                    name="CommentPostuler"
                    id="CommentPostuler"
                    className="form__input"

                    placeholder="Enter la méthode d'application "
                    value={form.CommentPostuler}
                    onChange={handleChange}
                  />
                </div>
                <div className="row">
                  <label htmlFor="CoefficientAge"> Le coefficient d'age</label>
                  <input
                    type="number"
                    name="CoefficientAge"
                    id="CoefficientAge"
                    className="form__input"
                    placeholder="Entrez le coefficient d'age"
                    value={form.CoefficientAge}
                    onChange={handleChange}
                  />
                </div>
                <div className="row">
                  <label htmlFor="CoefficientExperience"> Le coefficient d'expérience</label>
                  <input
                    type="number"
                    name="CoefficientExperience"
                    id="CoefficientExperience"
                    className="form__input"
                    placeholder="Entrez le coefficient d'expérience"
                    value={form.CoefficientExperience}
                    onChange={handleChange}
                  />
                </div>
                <div className="row">
                  <label htmlFor="CoefficientSkills">Le coefficient des compétences</label>
                  <input
                    type="number"
                    name="CoefficientSkills"
                    id="CoefficientSkills"
                    className="form__input"
                    placeholder="Entrez le coefficient des compétences"
                    value={form.CoefficientSkills}
                    onChange={handleChange}
                  />
                </div>
                <div className="row">
                  <label htmlFor="CoefficientLangues">Le coefficient des langues</label>
                  <input
                    type="number"
                    name="CoefficientLangues"
                    id="CoefficientLangues"
                    className="form__input"
                    placeholder="Entrez le coefficient des langues"
                    value={form.CoefficientLangues}
                    onChange={handleChange}
                  />
                </div>
                <div class="row">
                  <div class="col">
                    <button type="submit" className=" btn-primary">
                      Submit
                    </button>
                  </div>
                  <div class="col">
                    <button
                      type="button"
                      className=" btn-secondary space"
                      onClick={handleRetourClick}
                    >
                      Annuler
                    </button>
                  </div>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOffre;