import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../updateoffre.css"
import Alert from '../components/Alert';

const EditFormation = () => {

  const { id } = useParams();

  const [form, setForm] = useState({});
  const [originalForm, setOriginalForm] = useState({});
  const [errors, setErrors] = useState({});
  const [nomOffre, setNomOffre] = useState('');
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  useEffect(() => {

    axios.get(`/api/formations/${id}`)
      .then(async (response) => {
        setForm(response.data);
        setOriginalForm(response.data);
        const offreRes = await axios.get(`/api/offres/${response.data.offre}`);
        const offre = offreRes.data;
        setNomOffre(offre.name);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/formations/${id}`, form);
      setMessage("Formation modifié avec succés");


      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 4000);


      const notificationPromises = [];

      if (originalForm.date !== form.date) {
        // If the date has changed, send a notification with the new date
        let message = `Il y a une modification dans la formation  ${nomOffre} La nouvelle date est : ${form.date}`;
        originalForm.user.forEach(userId => {
          notificationPromises.push(
            axios.post('/api/notification', {
              message,
              userId,
            })
          );
        });
      }
      if (originalForm.heure !== form.heure) {
        // If the date has changed, send a notification with the new date
        let message = `Il y a une modification dans l'heure la formation ${nomOffre} La nouvelle heure est : ${form.heure}`;
        originalForm.user.forEach(userId => {
          notificationPromises.push(
            axios.post('/api/notification', {
              message,
              userId,
            })
          );
        });
      }
      if (originalForm.type !== form.type) {
        // If the type has changed, send a notification with the new type and corresponding changes
        let message = `Il y a une modification dans l'formation  ${nomOffre} Votre formation est devenu ${form.type}.`;
        if (form.type === "en_ligne") {
          message += ` Voici le lien de la réunion : ${form.url} et le code d'accès : ${form.code_access}`;
        } else if (form.type === "presentiel") {
          message += ` L'formation aura lieu à l'adresse suivante : ${form.adresse}. Les documents demandés sont les suivants : ${form.Documents_demandes}.`;
        }
        originalForm.user.forEach(userId => {
          notificationPromises.push(
            axios.post('/api/notification', {
              message,
              userId,
            })
          );
        });
      }

      await Promise.all(notificationPromises);

      window.location.href = `/FormationList`;
    } catch (error) {
      console.log(error);
    }
  };
  const handleRetourClick = () => {
    window.location.href = `/formationlist`;
};
  return (
    <div class="container-fluid">
      <Alert message={message} show={show} />

      <div class="row main-content bg-success text-center">
        <div class="col-md-4 text-center company__info">
          <span class="company__logo"><h2><span class="fa fa-android"></span></h2></span>

          <img src={require("../sources/poste.svg.png")} />
        </div>
        <div class="col-md-8 col-xs-12 col-sm-12 login_form ">
          <div class="container-fluid">
            <div class="row">
              <h2>Update Formation</h2>
            </div>
            <div class="row">
              <form onSubmit={handleSubmit} className="form-group">
                <div className="row">

                  <label>Type: </label>

                  <div className="form-check">
                    <input
                      type="radio"
                      name="type"
                      id="en_ligne"
                      className="form-check-input"
                      value="en_ligne"
                      checked={form.type === "en_ligne"}
                      onChange={handleChange}
                    />
                    <label htmlFor="en_ligne" className="form-check-label">En ligne</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      name="type"
                      id="presentiel"
                      className="form-check-input"
                      value="presentiel"
                      checked={form.type === "presentiel"}
                      onChange={handleChange}
                    />
                    <label htmlFor="presentiel" className="form-check-label">Présentiel</label>
                  </div>


                  {errors.type && (
                    <div className="invalid-feedback">{errors.type}</div>
                  )}
                </div>

                {form.type === "en_ligne" && (
                  <>
                    <div className="row">
                      <label htmlFor="url">URL:</label>
                      <input
                        type="text"
                        name="url"
                        id="url"
                        className="form__input"
                        placeholder="Enter URL"
                        value={form.url}
                        onChange={handleChange}
                      />
                      {errors.url && (
                        <div className="invalid-feedback">{errors.url}</div>
                      )}
                    </div>
                    <div className="row">
                      <label htmlFor="code_access">Code d'accès:</label>
                      <input
                        type="text"
                        name="code_access"
                        id="code_access"
                        className="form__input"
                        placeholder="Enter code d'accès"
                        value={form.code_access}
                        onChange={handleChange}
                      />
                      {errors.code_access && (
                        <div className="invalid-feedback">{errors.code_access}</div>
                      )}
                    </div>
                  </>
                )}
                {form.type === "presentiel" && (
                  <>
                    <div className="row">
                      <label htmlFor="adresse">Adresse:</label>
                      <input
                        type="text"
                        name="adresse"
                        id="adresse"
                        className="form__input"
                        placeholder="Enter adresse"
                        value={form.adresse}
                        onChange={handleChange}
                      />
                      {errors.adresse && (
                        <div className="invalid-feedback">{errors.adresse}</div>
                      )}
                    </div>
                    <div className="row">
                      <label htmlFor="Documents_demandes">Documents demandés:</label>
                      <input
                        type="text"
                        name="Documents_demandes"
                        id="Documents_demandes"
                        className="form__input"
                        placeholder="Entrer les documents demandés"
                        value={form.Documents_demandes}
                        onChange={handleChange}
                      />
                      {errors.documents_demandes && (
                        <div className="invalid-feedback">{errors.documents_demandes}</div>
                      )}
                    </div>
                  </>
                )}
                <div className="row">
                  <label htmlFor="name">Date:</label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    className="form__input"

                    placeholder="Enter name"
                    value={form.date}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>

                <div className="row">
                  <label htmlFor="heure">Heure:</label>
                  <input
                    type="number"
                    name="heure"
                    id="heure"
                    className="form__input"

                    placeholder="Entrez l'heure"
                    value={form.heure}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
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

export default EditFormation;