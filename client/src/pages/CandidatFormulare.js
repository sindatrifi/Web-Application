import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Sidebar from '../components/Sidebar';
import '../MyForm.css'; // import CSS file
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {  useParams } from 'react-router-dom';

function MyForm() {
 
  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  let userId=0;
  const [candidatform, setcandidatform] = useState([]);
 

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
   axios.post('/api/candidatform', form) 
          .then(async (res) => {
            
            setForm({});
            setMessage(res.data.message);
            navigate(`/informationsgenerales/${res.data.id}`);

            
           
          })
            
            .catch(err => setErrors(err.response.data))
   
  
};

  return (
  
     <div className="form-page">
    <div className="form-container-with-slider">
      <Sidebar /> 
     
      <div className="form-container">
    <form onSubmit={handleSubmit} className="my-form"> 
    <label htmlFor="experience_professionnelle">
    Niveau d'experience Professionnelle
      </label>
        <input name="experience_professionnelle" className="form-item" type="text"  onChange={onChangeHandler} required />
      
      <label>
      Type d'emploi désiré   
      </label>    
      <div>
  <label>
    <input 
      type="checkbox" 
      name="emploi_desire" 
      value="CDD" 
      onChange={onChangeHandler} 
      checked={form.emploi_desire === "CDD"} 
      
    />
    CDD
  </label>
  <label>
    <input 
      type="checkbox" 
      name="emploi_desire" 
      value="CDI" 
      onChange={onChangeHandler} 
      checked={form.emploi_desire === "CDI"} 
       
    />
    CDI
  </label>
  <label>
    <input 
      type="checkbox" 
      name="emploi_desire" 
      value="Temps plein" 
      onChange={onChangeHandler} 
      checked={form.emploi_desire === "Temps plein"} 
       
    />
    Temps plein
  </label>
  <label>
    <input 
      type="checkbox" 
      name="emploi_desire" 
      value="Temps partiel" 
      onChange={onChangeHandler} 
      checked={form.emploi_desire === "Temps partiel"} 
       
    />
    Temps partiel
  </label>
  <label>
    <input 
      type="checkbox" 
      name="emploi_desire" 
      value="Freelance" 
      onChange={onChangeHandler} 
      checked={form.emploi_desire === "Freelance"} 
      
    />
    Freelance
  </label>
  <label>
    <input 
      type="checkbox" 
      name="emploi_desire" 
      value="Saisonnier" 
      onChange={onChangeHandler} 
      checked={form.emploi_desire === "Saisonnier"} 
      
    />
    Saisonnier
  </label>
</div>
      
      <label>
      Titre du poste désiré    
      </label>   
       <input  name ="titre_emploi_desire"className="form-item" type="text" onChange={onChangeHandler} required />
      
      <label>
        Salaire
        </label>
        <input name="salaire" className="form-item" type="text"  onChange={onChangeHandler} required />
     
      <label>
        Status:
        </label>
        <input name ="status" className="form-item" type="text"  onChange={onChangeHandler} required />
        <input
                            type="text"
                            className="form-control"
                            name="UserId"
                            
                           
                            onChange={onChangeHandler}
                           hidden
                            
                           
                            
                        />
      
      <button type="submit">Sauvegarder</button>
    </form>
   </div>
   
    </div>
    </div>
  );
}

export default MyForm;