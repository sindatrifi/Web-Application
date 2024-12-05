import React, { useState } from 'react';
import '../Login.css';

import { Link } from 'react-router-dom';
import axios from 'axios';

function Register() {

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const onChangeHandler = (e) => {


    setForm({

      ...form,
      [e.target.name]: e.target.value,

    });
  }
  const calculateAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.Email || !form.Firstname || !form.Lastname || !form.Datenaissance || !form.Adress || !form.Npostal || !form.ville || !form.civilite || !form.Phone || !form.password || !form.Role) {
      setErrors({ general: "Please fill in all the required fields." });
      return;
    }
    try {
      // Check if the email already exists
      const Email = await axios.get(`/api/register?Email=${form.Email}`);
      if (Email.data.exists) {
        setMessage('Email exist déja');
        return;
      }
      const age = calculateAge(form.Datenaissance);

      const response = await axios.post('/api/register', { ...form, Age: age });



      console.log(response.data);
      setForm({});
      setMessage('');
      if (form.Role === 'employee') {
        window.location.href = '/login';
      } else if (form.Role === 'candidat') {
        window.location.href = '/formulaire';
      }
    }
    catch (error) {
      console.error(error.response.data);
      setErrors(error.response.data);
      setMessage("utilisateur existe");
    }
  };
  const handleRetourClick = () => {
    window.location.href = `/`;
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
              <h4>Inscription </h4>
            </div>
            <div class="row">
              <form onSubmit={handleSubmit} className="form-group">
                <div className="row">
                  <label htmlFor="Email">Email</label>
                  <input
                    type="email"
                    name="Email"
                    placeholder="Entrez votre email"
                    onChange={onChangeHandler}
                    errors={errors.Email}
                    required
                    className="form__input"
                  />

                </div>

                <div className="row">
                <div className="col">

                  <label htmlFor="Firstname">Prénom</label>
                  <input
                    type="text"

                    name="Firstname"
                    placeholder="Entrez votre nom "
                    onChange={onChangeHandler}
                    errors={errors.Firstname}
                    required
                    className="form__input"
                  />
                </div>
                <div className="col">

                  <label htmlFor="Lastname">Nom</label>
                  <input
                    type="text"

                    name="Lastname"
                    placeholder="Entrez votre prénom "
                    onChange={onChangeHandler}
                    errors={errors.Lastname}
                    required
                    className="form__input"
                  />
                </div>
                </div>
                <div className="row">
                  <label htmlFor="Age">Date de naissance</label>
                  <input
                    type="date"

                    name="Datenaissance"



                    onChange={onChangeHandler}

                    required
                    className="form__input"
                  />

                </div>
                <div className="row">
                <div className="col">
                  <label htmlFor="Adress">Adresse</label>
                  <input
                    type="text"

                    name="Adress"
                    placeholder="Entrez votre addresse"
                    onChange={onChangeHandler}
                    errors={errors.Adress}

                    required
                    className="form__input"
                  />
                </div>
                <div className="col">
                  <label htmlFor="Npostal">N°postal</label>
                  <input
                    type="text"

                    name="Npostal"
                    placeholder="Entrez votre Npostal"
                    onChange={onChangeHandler}
                    errors={errors.Npostal}

                    required
                    className="form__input"
                  />
                </div>
                <div className="col">
                  <label htmlFor="ville">Ville</label>
                  <input
                    type="text"

                    name="ville"
                    placeholder="Entrez votre ville"
                    onChange={onChangeHandler}
                    errors={errors.ville}

                    required
                    className="form__input"
                  />
                </div>
                </div>
                <label htmlFor="civilite">Civilité</label>
                <div className='civilite'>
                  <label>
                    <input
                      type="radio"
                      name="civilite"
                      value="homme"
                      onChange={onChangeHandler}
                      checked={form.civilite === "homme"}
                      required
                    />
                    Homme
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="civilite"
                      value="femme"
                      onChange={onChangeHandler}
                      checked={form.civilite === "femme"}
                      required
                    />
                    Femme
                  </label>
                </div>
                <div className="row">
                  <label htmlFor="Phone">Numéro de téléphone</label>
                  <input
                    type="tel"

                    name="Phone"
                    placeholder="Entrez votre numéro de téléphone "
                    onChange={onChangeHandler}
                    errors={errors.Phone}

                    required
                    className="form__input"
                  />
                </div>
                <div className="row">
                  <label htmlFor="password">Mot de passe</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Entrez votre mot de passe"
                    onChange={onChangeHandler}

                    required
                    className="form__input"
                  />



                </div>




                <div className="row">
                  <div className="radio-buttons">

                    <label htmlFor="Role">Rôle</label>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="Role"
                          value="candidat"
                          onChange={onChangeHandler}
                          checked={form.Role === "candidat"}
                          required
                        />
                        Candidat
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="Role"
                          value="employee"
                          onChange={onChangeHandler}
                          checked={form.Role === "employee"}
                          required
                        />
                        Employeur
                      </label>
                    </div>

                  </div>
                </div>

                <div class="row">
                <div class="col">
                  <button className="bttn" type="submit">S'inscrire</button>
                  </div>
                  <div class="col">
                  <button
              type="button"
              className=" btn-danger space"
              onClick={handleRetourClick}
            >
              Annuler
            </button>
            </div>

                  {message && <div>{message}</div>}
                  {errors.general && <div className="error-message">{errors.general}</div>}

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;