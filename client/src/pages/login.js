import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import "../Login.css"
import ComboBox from '../components/Combobox';
import { Link } from 'react-router-dom';





const LoginForm = () => {
  const navigate = useNavigate();

  const [Email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState("");


  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!Email.includes('@') || !Email.includes('.')) {
      setMessage("S'il vous plaît, mettez une adresse Email valide.");
      return;
    }

    if (!Email || !password) {
      setMessage('Veuillez saisir votre email et votre mot de passe.');
      return;
    }

    try {
      const response = await axios.post('/api/login', { Email, password });
      const { token, Role, userId } = response.data;
      localStorage.setItem('token', token);
      setMessage(response.data.message);

      if (Role === 'employee') {
        if (password === 'aaaa') {
          navigate(`/changepassword/${userId}`);
        } else {
          navigate('/');
        }
      }

      if (Role === 'candidat') {
        const candidatFormResponse = await fetch('/api/candidatform', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!candidatFormResponse.ok) {
          throw new Error('Failed to fetch candidat form data');
        }

        const res = await fetch('/api/protected', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const userId = res.headers.get('userId');

        const candidatFormData = await candidatFormResponse.json();
        const filteredData = candidatFormData.filter((candidatForm) => candidatForm.UserId === userId);

        if (filteredData.length === 0) {
          navigate('/formulaire');
        } else {
          navigate('/');
        }
      } else if (Role === 'admin') {
        navigate('/');
      }
    } catch (error) {
      setError(error.response.data.message);
      setMessage(
        "La combinaison d'adresse e-mail et de mot de passe que vous avez saisie n'est pas reconnue ou n'existe pas. Veuillez réessayer."
      );
    }
  };
  const handleRetourClick = () => {
    window.location.href = `/`;
  };
  return (
    <section className='loginbackground'>
    <div class="container-fluid">
      <div class="row main-content bg-success text-center">
        <div class="col-md-4 text-center company__info">
          <span class="company__logo"><h2><span class="fa fa-android"></span></h2></span>
          <img src={require("../sources/poste.svg.png")} />
        </div>
        <div class="col-md-8 col-xs-12 col-sm-12 login_form ">
          <div class="container-fluid">
            <div class="row">
              <h4>Connexion</h4>
            </div>
            <div class="row">

              <form onSubmit={handleSubmit} class="form-group" >
                <div class="row">
                  <FormInput

                    description="Email"
                    placeholder="Entrez votre email"
                    type="Email"
                    value={Email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    className="form__input"
                  />
                </div>
                <div class="row">
                  <FormInput
                    description="Mot de passe"
                    placeholder="Entrez votre mot de passe"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    className="form__input"
                  />
                </div>

                <div class="row">
                <div class="col">
                  <button type="submit" className="boutonlogin" >Connexion</button>
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
                </div>
                {message && <div> {message}</div>}

              </form>
            </div>
            <div class="row">
              <p>Vous n'avez pas de compte ? <a href="/register">Inscrivez-vous ici</a></p>
            </div>

          </div>
        </div>
      </div>
    </div>
    </section>
  );
};

const FormHeader = ({ title }) => <h2 id="headerTitle">{title}</h2>;

const Form = () => (
  <div>
    <FormInput description="Email" placeholder="Entrer votre Email" type="text" />
    <FormInput description="Password" placeholder="Entrer votre mot de passe" type="password" />


  </div>
);




const FormInput = ({ description, placeholder, type, value, onChange, style }) => (
  <div class="row">
    <label>{description}</label>
    <input type={type} placeholder={placeholder} value={value} onChange={onChange} />
  </div>
);




const Login = () => {
  return <LoginForm />;
};

export default Login;