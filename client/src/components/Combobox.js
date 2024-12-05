import React from 'react';
import { useState } from 'react';
import "../Login.css"


const ComboBox = () => {
    const [selectedValue, setSelectedValue] = useState('');
  
    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    }
  
    return (
      <div>
        <label htmlFor="my-combobox">Choisir une option:</label>
        <select id="my-combobox" value={selectedValue} onChange={handleChange}>
          <option value="">--Sélectionner--</option>
          
          <option value="Employeur">Employeur</option>
          <option value="Candidat">Candidat</option>
        </select>
        <p>Vous avez sélectionné: {selectedValue}</p>
      </div>
    );
  }
  export default ComboBox