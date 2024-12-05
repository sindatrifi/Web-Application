import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function Update({ onCancel, data }) {
 
  const [form, setForm] = useState({});
  const {id} = useParams();
  const navigate = useNavigate()
  const [errors, setErrors] = useState({});
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState(data ? data.email : "");
  const [age, setAge] = useState(data ? data.age : "");
  const [ageError, setAgeError] = useState("");

  const onChangeHandler = (e) => {
        
    setForm({
        
        ...form,
        [e.target.name]: e.target.value,
    });
    const ageValue = e.target.value;
    setAge(ageValue);

    if (!validateAge(ageValue)) {
        setAgeError("Please enter a valid age between 18 and 120.");
    } else {
        setAgeError("");
    }   const emailValue = e.target.value;
    setEmail(emailValue);

    if (!validateEmail(emailValue)) {
        setEmailError("Please enter a valid email address.");
    } else {
        setEmailError("");
    }
};

  const onSubmitHandler = (e)=>{
    e.preventDefault();
    axios.put(`/api/Candidats/${id}`, form)
    .then(res=>{
      navigate('/load')
    })
    .catch(err=>setErrors(err.response.data))
    
  }
  const handleCancel = () => {
    onCancel();
};


const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const validateAge = (age) => {
    const ageValue = parseInt(age);
    return !isNaN(parseInt(age)) && ageValue >= 18 && ageValue <= 120;
};

  useEffect(async () => {
    await axios.get(`/api/Candidats/${id}`).then((res) => {
      setForm(res.data);
    });
  }, []);
  return (
  
            <form onSubmit={onSubmitHandler}>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="Email">Email</label>
                        <input
                            type="email"
                            name="Email"
                            placeholder="Enter email"
                            onChange={onChangeHandler}
                            errors={errors.Age}
                            value={form.Email}
                            required
                        />
                        {emailError && (
                            <div className="invalid-feedback">{emailError}</div>
                        )}


                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="Firstname">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="Firstname"
                            placeholder="Enter name"
                            onChange={onChangeHandler}
                            value={form.Firstname}
                             errors={errors.Firstname}
                            required
                        />

                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="Lastname">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="Lastname"
                            placeholder="Enter last name"
                            onChange={onChangeHandler}
                            value={form.Lastname}
                            errors={errors.Lastname}
                            required
                        />
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="Age">Age</label>
                        <input
                            type="text"

                            name="Age"
                            placeholder="Enter age"
                            value={form.Age}       
                            
                            onChange={onChangeHandler}
                            errors={errors.Age}
                            required
                        />
                        {ageError && (
                            <div className="invalid-feedback">{ageError}</div>
                        )}
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="Phone">Phone Number</label>
                        <input
                            type="tel"
                            className="form-control"
                            name="Phone"
                            placeholder="Enter phone number"
                            value={form.Phone}
                            onChange={onChangeHandler}
                            errors={errors.Phone}

                            required
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="Adress">Adress</label>
                        <input
                            type="text"
                            className="form-control"
                            name="Adress"
                            placeholder="Enter Adress"
                            value={form.Adress}
                            onChange={onChangeHandler}
                            errors={errors.Adress}

                            required
                        />
                    </div>

                    

                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary ml-2"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>

                </div>
            </form>
            
  
                        
  )
                        }
                    

export default Update;