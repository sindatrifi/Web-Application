import React, { useState, useEffect, } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import "../User.css";
import UserForm from "./AddUsers";
import RowDetails from "../components/RowDetails";
import RowDetail from "../components/RowDetailsemployees";

const UserList = () => {
    const [users, setusers] = useState([]);
    
  
    const [form, setForm] = useState({});
   
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
        if (window.confirm("êtes-vous sûr de supprimer cet utilisateur ?")) {

            axios.delete(`/api/users/${id__}`)



        }
    }
    /* find all Users */
    useEffect(async () => {
        await axios.get("/api/users").then((res) => {
            setusers(res.data);
        });
      });
    
    return (
    
        <div className="user-list-container">
        <h1> List des utilisateurs</h1>
        <button className="custom-btn" onClick={() => setEditing(true)}>
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
              <th scope="col">Nom</th>
              <th scope="col">Prénom</th>
              <th scope="col">Age</th>
              <th scope="col">Adress</th>
              <th scope="col">Téléphone</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ Email, Lastname, Firstname, Age, Adress,Phone,Role,_id }) => (
              <RowDetail
                Email={Email}
                Lastname={Lastname}
                Firstname={Firstname}
                Age={Age}
                Adress={Adress}
                Phone={Phone}
               Role={Role}
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
