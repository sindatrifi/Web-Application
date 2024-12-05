import React, { useState, useEffect } from "react";
import axios from "axios";
import "../entretien.css"
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import ProfileBar from "../components/profilebar";

const AdminFormationList = () => {
  const [formation, setFormation] = useState([]);
  const [users, setUsers] = useState([]);
  const [offres, setOffres] = useState([]);
  const [message, setMessage] = useState("");
  const [nomoffreentretien, setNomoffreentretien] = useState("");
  const [show, setShow] = useState(false);
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

        const sortedFormation = responseFormations.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setFormation(sortedFormation);
        setUsers(responseUsers.data);
        setOffres(responseOffres.data);

        const userId = await getUserId();
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

  const getEmployeeName = (employeeId) => {
    const employeeid = users.find((user) => user._id === employeeId);
    return employeeid ? `${employeeid.Firstname} ${employeeid.Lastname}` : "";
  };

  const handleDelete = async (formationId) => {
    try {
      const formation = await axios.get(`/api/formations/${formationId}`);
      setOriginalForm(formation.data);
      const formationoffre = await axios.get(
        `/api/offres/${originalForm.offre}`
      );
      const offrenom = formationoffre.data.name;

      console.log(offrenom);

      if (window.confirm("Êtes-vous sûr de supprimer cette formation ?")) {
        await axios.delete(`/api/formations/${formationId}`);
        setMessage("Formation supprimé avec succès");
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 4000);

        setFormation(formation.filter((e) => e._id !== formationId));

        const notificationPromises = [];
        console.log(nomoffreentretien);
        let message = `Désolé, la formation pour l'offre ${offrenom} est annulé`;

        originalForm.user.forEach((userId) => {
          notificationPromises.push(
            axios.post("/api/notification", {
              message,
              userId,
            })
          );
        });

        await Promise.all(notificationPromises);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <ProfileBar />
      <div className="entretiens-list-container">
        <Alert message={message} show={show} />
        <div class="col-lg-12 text-center">
          <h1>Liste des formations</h1>
        </div>

        <table>
          <thead>
            <tr>
            <th>Employeur</th>
              <th>Candidats</th>
              <th>Offres</th>
              <th>Type</th>
              <th>Date</th>
              
            </tr>
          </thead>
          <tbody>
            {formation
              .filter((formation) => new Date(formation.date) > currentDate)
              .map((formation) => (
                <tr key={formation._id}>
                <td>{getEmployeeName(formation.employeeid)}</td>
                  <td>{getUserNames(formation.user)}</td>
                  <td>{getOffreTitle(formation.offre)}</td>
                  <td>
                    {formation.type === "presentiel" ? (
                      <span>
                        {formation.type} <br /> Documents demandés:{" "}
                        {formation.Documents_demandes} <br /> lieu :{" "}
                        {formation.adresse}
                      </span>
                    ) : (
                      <span>
                        {formation.type} <br /> url :{formation.url} <br />
                        code accès: {formation.code_access}
                      </span>
                    )}
                  </td>
                  <td>
                    {formation.date} a {formation.heure} h
                  </td>
                
                 
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminFormationList;