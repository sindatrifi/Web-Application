import React, { useState, useEffect, } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import "../User.css";
import UserForm from "./AddUsers";
import RowDetails from "../components/RowDetails";
import RowDetail from "../components/RowDetailsemployees";
import ProfileBar from "../components/profilebar";
import Alert from "../components/Alert";

const EmployeeList = () => {
    const [users, setusers] = useState([]);
    
    const [messagealert, setMessagealert] = useState("");
    const [show, setShow] = useState(false);
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

            setMessagealert("employeur modifié  avec succés");
            setShow(true);
              setTimeout(() => {
                setShow(false);
              }, 4000);

        }
    }
    /* find all Users */
        useEffect(() => {
            const fetchUsers = async () => {
              try {
                const response = await axios.get("/api/users");
                const filteredUsers = response.data.filter((user) => user.Role === "employee");
                setusers(filteredUsers);
              } catch (error) {
                console.error(error);
              }
            };
        
            fetchUsers();
          }, []);
        
   
    return (
    
        <div className="user-list-container">
           <Alert message={messagealert} show={show}/>
           <ProfileBar/>
        <h1> Liste des employeurs</h1>
       
        <button className="custom-btn" onClick={() => setEditing(true)}>
        Ajouter employeur

        </button>
        {editing && (
        <div className="edit-form-container">
        <h2>{selectedUser ? 'Edit User' : 'Ajouter employeur'}</h2>
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
              <th scope="col">Adresse</th>
              <th scope="col">Ville</th>
              <th scope="col">N°postal</th>
              <th scope="col">Téléphone</th>
              
            </tr>
          </thead>
          <tbody>
            {users.map(({ Email, Lastname, Firstname, Age, Adress,ville,Npostal,Phone,_id }) => (
              <RowDetail
                Email={Email}
                Lastname={Lastname}
                Firstname={Firstname}
                Age={Age}
                Adress={Adress}
                ville={ville}
                Npostal={Npostal}
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



export default EmployeeList;
