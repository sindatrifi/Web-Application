import React, { useState, useEffect, } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import "../User.css";
import UserForm from "./AddUsers";
import RowDetails from "../components/RowDetails";
import RowDetail from "../components/RowDetailsemployees";
import ProfileBar from "../components/profilebar";
import Alert from "../components/Alert";


const CandidatList = () => {
    const [users, setusers] = useState([]);
    
  
    const [form, setForm] = useState({});
   
    const [editing, setEditing] = useState(false);
const [selectedUser, setSelectedUser] = useState(null);



const [message, setMessage] = useState("");
const [show, setShow] = useState(false);

 



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
        useEffect(() => {
            const fetchUsers = async () => {
              try {
                const response = await axios.get("/api/users");
                const filteredUsers = response.data.filter((user) => user.Role === "candidat");
                setusers(filteredUsers);
              } catch (error) {
                console.error(error);
              }
            };
        
            fetchUsers();
          }, []);
        
   
    return (
    
        <div className="user-list-container">
          
          <ProfileBar/>
         
        <h1> Liste des candidats</h1>
        <Alert message={message} show={show}/>
        
        
  
         
       
        
        
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
          {users.map(({ Email, Lastname, Firstname, Age, Adress,Phone,ville,Npostal,_id }) => (
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



export default CandidatList;
