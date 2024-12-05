import React, { useState, useEffect } from "react";
import axios from "axios";
import "../User.css";
import Alert from "../components/Alert";

const UserForm = ({ onSubmit, onCancel, data }) => {
    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({});
    const [emailError, setEmailError] = useState("");
   
    const [ageError, setAgeError] = useState("");
    const [message, setMessage] = useState("");
    const [show, setShow] = useState(false);
   


    const onChangeHandler = (e) => {
        
        
        setForm({
            
            ...form,
            [e.target.name]: e.target.value,
        });
    
};

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post('/api/Candidats', form)
          .then((res) => {
            setMessage(res.data.message);
            setForm({});
            setErrors({}); // clear any previous errors
            setShow(true);
            setTimeout(() => {
              setShow(false);
            }, 4000);
          })
            
            .catch(err => setErrors(err.response.data))
    };
   

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
   
   

   

 return (
    <div >
 <Alert message={message} show={show}/>
            <form onSubmit={handleSubmit}>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="Email">Email</label>
                        <input
                            type="email"
                            name="Email"
                            placeholder="Enter email"
                            onChange={onChangeHandler}
                            errors={errors.Age}
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
            </div>
        )
    }
    export default UserForm;