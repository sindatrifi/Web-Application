import React, { useState } from 'react';
import Slider from 'react-slick';
import Sidebar from '../components/Sidebar';
import '../MyForm.css'; // import CSS file
import axios from "axios";
import {  useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Information() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [photoUrl, setPhotoUrl] = useState("");
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
    setPhoto(e.target.files[0]);
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setPhotoUrl(imageUrl);
    
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`/api/candidatform/${id}`, form)
          .then((res) => {
            setForm({});
            setMessage(res.data.message);
            navigate(`/informationsprofessionelles/${id}`);
           
           
          })
            
            .catch(err => setErrors(err.response.data))
    };
  

  

  
  
 
  return (
  
     <div className="form-page">
    <div className="form-container-with-slider">
      <Sidebar /> 
     
      <div className="form-container">
    <form onSubmit={handleSubmit} className="my-form">
    <label htmlFor="photo">
      Upload your photo:
       </label>
      <input type="file" id="photo" name="photo" onChange={onChangeHandler} required />
     
      {photo && (
              <img
              src={photoUrl}
              alt="Uploaded photo"
              className="uploaded-photo"
              />
            )}
      <label>
      Objectifs et Motivations (Lettre de Motivation)
      </label>
        <textarea   name="lettre_motivation" type="textarea"  onChange={onChangeHandler} required />
      
     
      
      <button type="submit">Sauvegarder</button>
    </form>
   </div>
   
    </div>
    </div>
  );
}

export default Information;