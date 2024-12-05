import React, { useState, useEffect } from "react";
import axios from "axios";
import "../entretien.css";
import Alert from "../components/Alert";

import { Link } from "react-router-dom";
import ProfileBar from "../components/profilebar";
const FormationList = () => {
  const [formations, setFormations] = useState([]);
  const [users, setUsers] = useState([]);
  const [offres, setOffres] = useState([]);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [nomoffreentretien, setNomoffreentretien] = useState("");
  const [originalForm, setOriginalForm] = useState({}); 
  const currentDate = new Date(); 
  const getUserId = async () => {
    try {
        const response = await fetch("/api/protected", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const userId = response.headers.get("userId");
        return userId;
    } catch (error) {
        console.error(error);
    }
};
useEffect(() => {
    const fetchData = async () => {
        try {
            const responseFormations = await axios.get("/api/formations");
            const responseUsers = await axios.get("/api/users");
            const responseOffres = await axios.get("/api/offres");

            setFormations(responseFormations.data);
            setUsers(responseUsers.data);
            setOffres(responseOffres.data);

            const userId = await getUserId();
            setFormations(responseFormations.data.filter((formation) => formation.employeeid === userId) .sort((a, b) => new Date(b.date) - new Date(a.date)));
          } catch (error) {
            console.error(error);
        }
    };

    fetchData();
}, []);

  const getUserNames = (userIds) => {
    const names = userIds.map((userId) => {
      const user = users.find((user) => user._id === userId);
      return user ? `${user.Firstname} ${user.Lastname}` : "";
    });
    return names.join(", ");
  };
  const getOffreTitle = (offreId) => {
    const offre = offres.find((offre) => offre._id === offreId);
    return offre ? offre.name : "";
  };
  const handleDelete = async (formationId) => {
    if (window.confirm("êtes-vous sûr de supprimer cet Formation ?")) {

    try {
      const formation = await axios.get(`/api/formations/${formationId}`);
      setOriginalForm(formation.data);
      const formationoffre = await axios.get(`/api/offres/${originalForm.offre}`);
      const formationnom=formationoffre.data.name
      await axios.delete(`/api/formations/${formationId}`);
      setMessage("Formation supprimé avec succés");
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 4000);
      setFormations(formations.filter((e) => e._id !== formationId));
      const notificationPromises = [];
    
      let message = `Désolé la formation ${formationnom} est annulé`;
      originalForm.user.forEach(userId => {
        notificationPromises.push(
          axios.post('/api/notification', {
            message,
            userId,
          })
        );
      });
    
   

    await Promise.all(notificationPromises);
    } catch (error) {
      console.error(error);
    }
  }
  };

  return (
    
    <div className="entretiens-list-container">
    <ProfileBar/> <Alert message={message} show={show} />
    <div class="col-lg-12 text-center">
              <h1>Liste des Formations</h1>
    </div>
      <table>
        <thead>
          <tr>
            <th>Candidats</th>
            <th>Formation</th>
            <th>Type</th>
            <th>Date</th>

          </tr>
        </thead>
        <tbody>
          {formations.filter((formation) => new Date(formation.date) > currentDate).map((formation) => (
            <tr key={formation._id}>
              <td>{getUserNames(formation.user)}</td>
              <td>{getOffreTitle(formation.offre)}</td>
              <td>{formation.type === "presentiel" ? (
                    <span>
                      {formation.type} <br/> Documents demandés: {formation.Documents_demandes} <br/>
                       lieu : {formation.adresse}
                    </span>
                  ) : (
                    <span>
                      {formation.type} <br/> url : {formation.url}  <br/>
                    code accés: {formation.code_access}
                    </span>
                  )}</td>
              <td>{formation.date} à {formation.heure}h</td>

              <td className="gap__actions">
                <div className="entretien">
              <Link to={`/formation/${formation._id}`} ><span className="badge bg-secondary badgecandidature" >
                  <i className="fas fa-edit"></i>
                </span>

                </Link>
                <span className="badge bg-danger badgecandidature" >
                <i className="fas fa-trash" onClick={() => handleDelete(formation._id)}></i>
              </span>
              </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
   
  );
};


export default FormationList;