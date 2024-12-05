import React, { useState, useEffect, } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import "../User.css";
import UserForm from "./Addcandidat";

import RowDetails from "../components/RowDetails";

const UserList = () => {
    const [Candidats, setCandidats] = useState([]);
    const navigate = useNavigate()
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({});
    const { id } = useParams();
    const [editing, setEditing] = useState(false);
const [selectedUser, setSelectedUser] = useState(null);





    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const handleCancelEdit = () => {
        setSelectedUser(null);
        setEditing(false);
        };


    /* delete */
    const OnDelete = (id__) => {
        if (window.confirm("are you sure to delete this Candidat")) {

            axios.delete(`/api/Candidats/${id__}`)



        }
    }
    /* find all Candidats */
    useEffect(async () => {
        await axios.get("/api/Candidats").then((res) => {
            setCandidats(res.data);
        });
        <UserForm />
    });
    return (
    
        <div className="user-list-container">
        <h1>List des candidats</h1>
        <button className="btn btn-primary" onClick={() => setEditing(true)}>
        Ajouter employeur
        </button>
        {editing && (
        <div className="edit-form-container">
        <h2>{selectedUser ? 'Edit User' : 'Add User'}</h2>
        <UserForm
       
        onCancel={handleCancelEdit}
       />
        </div>
        )}
        
  
         
       
        
        
    <div className="col-12 col-lg-7">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">nom</th>
              <th scope="col">prénom</th>
              <th scope="col">Age</th>
              <th scope="col">Adress</th>
              <th scope="col">Phone</th>
            </tr>
          </thead>
          <tbody>
            {Candidats.map(({ Email, Lastname, Firstname, Age, Adress,Phone,_id }) => (
              <RowDetails
                Email={Email}
                Lastname={Lastname}
                Firstname={Firstname}
                Age={Age}
                Adress={Adress}
                Phone={Phone}
                Id={_id}
                OnDelete={OnDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
                </div>
    )
}



export default UserList;
