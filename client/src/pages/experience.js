import React, { useState } from 'react';
import Slider from 'react-slick';
import Sidebar from '../components/Sidebar';
import '../MyForm.css'; // import CSS file
import axios from "axios";
import {  useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Experience() {
  const { id } = useParams();
  const navigate = useNavigate();
 const [form, setForm] = useState({});
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  let userId=0;
  const onChangeHandler = async(e) => {
    const response =  await fetch('/api/protected', {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
})
userId = response.headers.get('userId')
        
    setForm({
        
        ...form,
        [e.target.name]: e.target.value,
        UserId: userId,
    });
    
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`/api/candidatform/${id}`, form)
    .then((res) => {
      setForm({});
      setMessage(res.data.message);
      navigate(`/education/${id}`);
     
     
    })
            .catch(err => setErrors(err.response.data))
    };
  


  return (
  
     <div className="form-page">
    <div className="form-container-with-slider">
      <Sidebar /> 
     
      <div className="form-container">
    <form onSubmit={handleSubmit} className="my-form">
      <label>
      Quel est le nombre d'années de votre expérience?
      </label>
        <input name="nombreannee" className="form-item" type="text"  onChange={onChangeHandler} required />
      
      <label>
      Détails de l'expérience : Nom de la société / Entreprise    
      </label>   
      <input  name="Detail" className="form-item" type="text"  onChange={onChangeHandler} required />
      
      <label>
      Titre de Poste - Mission   
      </label>  
       <input name="Mission" className="form-item" type="text"  onChange={onChangeHandler} required />
      
      <label>
      Description
      </label>
        <input name="Description" className="form-item" type="text"  onChange={onChangeHandler} required />
      
     
      <button type="submit">Sauvegarder</button>
    </form>
   </div>
   
    </div>
    </div>
  );
}

export default Experience;