import React, { useState } from 'react';
import Slider from 'react-slick';
import Sidebar from '../components/Sidebar';
import '../MyForm.css'; // import CSS file
import axios from "axios";
import {  useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function InformationProfessionelles() {
  const { id } = useParams();
 const [form, setForm] = useState({});
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
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
            navigate(`/experience/${id}`);
           
           
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
      Quelles langues connaissez-vous?</label>
        <textarea name="langues" className="form-item" onChange={onChangeHandler} required  />
      
      <label>
      De quelles compétences, outils, technologies et domaines d'expertise disposez-vous?       </label>
      <textarea name="competences" className="form-item" type="textarea" onChange={onChangeHandler} required  />
     
      
      <button type="submit">Sauvegarder</button>
    </form>
   </div>
   
    </div>
    </div>
  );
}

export default InformationProfessionelles;