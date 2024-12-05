import React, { useState } from 'react';
import Slider from 'react-slick';
import Sidebar from '../components/Sidebar';
import '../MyForm.css'; // import CSS file
import axios from "axios";
import {  useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';


function Education() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  

 const [messagealert, setMessagealert] = useState("");
 const [show, setShow] = useState(false);

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
      navigate("/");

     
     
    })
            
            .catch(err => setErrors(err.response.data))
    };

  return (
   <>
    <Alert message={messagealert} show={show}/>
     <div className="form-page">
           
    <div className="form-container-with-slider">
      <Sidebar /> 

      <div className="form-container">
      
    <form onSubmit={handleSubmit} className="my-form"> 
    <label>
      Quel est votre niveau d'étude actuel?    
      </label> 
      <input  name="niveau_etude" className="form-item" type="text" onChange={onChangeHandler} required/>
     
      <label>
      Diplôme ou spécialité
      </label>
       <input  name ="diplome" className="form-item" type="text" onChange={onChangeHandler} required />
     
      <label>
      Université ou établissement
      </label>
       <input name="universite" className="form-item" type="text" onChange={onChangeHandler} required />
      
     
      
      <button type="submit">Sauvegarder</button>
    </form>
   </div>
   
    </div>
    </div>
    </>
  );
}

export default Education;