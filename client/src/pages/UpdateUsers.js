import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '../components/Alert';

function UpdateUser({ onCancel, data }) {
  const [form, setForm] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [age, setAge] = useState(0); // State variable for age
  const [messagealert, setMessagealert] = useState('');
  const [show, setShow] = useState(false);

  const calculateAge = (birthDate) => {
    // Calculate the age based on the birthDate
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    let updatedForm = {
      ...form,
      [name]: value,
    };

    if (name === 'Datenaissance') {
      const birthDate = new Date(value);
      const age = calculateAge(birthDate);
      updatedForm = {
        ...updatedForm,
        Age: age,
      };
    }

    setForm(updatedForm);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .put(`/api/users/${id}`, form)
      .then((res) => {
        const userRole = res.data.Role; // Assuming the response includes the updated user with the role
        if (userRole === 'employee') {
          setMessagealert('employeur modifié avec succès');
          setShow(true);
          setTimeout(() => {
            setShow(false);
            navigate('/employee');
          }, 4000);
        } else if (userRole === 'candidat') {
          setMessagealert('candidat modifié avec succès');
          setShow(true);
          setTimeout(() => {
            setShow(false);
            navigate('/candidat');
          }, 4000);
        } else {
          navigate('/user');
        }
      })
      .catch((err) => setErrors(err.response.data));
  };

  const handleCancel = () => {
    const userRole = form.Role; // Assuming the user's role is stored in the form data

    if (userRole === 'employee') {
      navigate('/employee');
    } else if (userRole === 'candidat') {
      navigate('/candidat');
    } else {
      navigate('/user');
    }
  };

  useEffect(async () => {
    await axios.get(`/api/users/${id}`).then((res) => {
      setForm(res.data);
      const age = calculateAge(res.data.Datenaissance); // Calculate age initially based on the date of birth
      setAge(age);
    });
  }, []);
  return (
<div> 
  <Alert message={messagealert} show={show}/>
    <form onSubmit={onSubmitHandler}>

      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            name="Email"
            placeholder="Entrer l' email"
            onChange={onChangeHandler}
            errors={errors.Age}
            value={form.Email}
            required
          />



        </div>
        <div className="form-group col-md-6">
          <label htmlFor="Firstname">Prénom</label>
          <input
            type="text"
            className="form-control"
            name="Firstname"
            placeholder="Entrer le prénom"
            onChange={onChangeHandler}
            value={form.Firstname}
            errors={errors.Firstname}
            required
          />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="Firstname">Civilité</label>
            <input
              type="text"
              className="form-control"
              name="civilite"
              placeholder="Entrer le civilite"
              onChange={onChangeHandler}
              value={form.civilite}
              errors={errors.civilite}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="Lastname">Nom</label>
            <input
              type="text"
              className="form-control"
              name="Lastname"
              placeholder="Entrer le nom"
              onChange={onChangeHandler}
              value={form.Lastname}
              errors={errors.Lastname}
              required
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="Datenaissance">Date de naissance</label>
            <input
              type="date"

              name="Datenaissance"
              placeholder="Entrer la date de naissance"
              value={form.Datenaissance}

              onChange={onChangeHandler}
              errors={errors.Age}
              required
            />

          </div>

          <div className="form-group col-md-6">
            <label htmlFor="Phone">Numéro de téléphone</label>
            <input
              type="tel"
              className="form-control"
              name="Phone"
              placeholder="Entrer le numéro de téléphone"
              value={form.Phone}
              onChange={onChangeHandler}
              errors={errors.Phone}

              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="Age">Age</label>
            <input
              type="text"
              name="Age"
              placeholder="Age"
              value={form.Age}
              readOnly // Make the age field read-only
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="Adress">Adresse</label>
            <input
              type="text"
              className="form-control"
              name="Adress"
              placeholder="Entrer l' adress"
              value={form.Adress}
              onChange={onChangeHandler}
              errors={errors.Adress}

              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="ville">Ville</label>
            <input
              type="ville"
              name="ville"
              placeholder="Entrez votre ville"
              onChange={onChangeHandler}
              value={form.ville}
              errors={errors.ville}
              required
            />


          </div>
          <div className="form-group col-md-6">
            <label htmlFor="Npostal">N°postal</label>
            <input
              type="text"
              name="Npostal"
              placeholder="Entrez votre Numero postal"
              onChange={onChangeHandler}
              value={form.Npostal}
              required
            />


          </div>


          <div className="form-group col-md-6">

            <input
              type="text"
              className="form-control"
              name="Role"
              placeholder="Entrer le role"
              value={form.Role}
              onChange={onChangeHandler}
              errors={errors.Role}

              hidden
            />
          </div>



        </div>
        <div className="form-group">
          <button type="submit" className=" btn-primary">
            Submit
          </button>
          <button
            type="button"
            className=" btn-danger ml-2"
            onClick={handleCancel}
          >
            Annuler
          </button>

        </div>
    </form>
    </div>


  )
}


export default UpdateUser;