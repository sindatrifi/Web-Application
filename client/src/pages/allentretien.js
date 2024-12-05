import React, { useState, useEffect } from "react";
import axios from "axios";
import "../entretien.css"
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import ProfileBar from "../components/profilebar";

const AdminEntretienList = () => {
  const [entretiens, setEntretiens] = useState([]);
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
        const responseEntretiens = await axios.get("/api/entretiens");
        const responseUsers = await axios.get("/api/users");
        const responseOffres = await axios.get("/api/offres");

        const sortedEntretiens = responseEntretiens.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setEntretiens(sortedEntretiens);
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

  const handleDelete = async (entretienId) => {
    try {
      const entretien = await axios.get(`/api/entretiens/${entretienId}`);
      setOriginalForm(entretien.data);
      const entretienoffre = await axios.get(
        `/api/offres/${originalForm.offre}`
      );
      const offrenom = entretienoffre.data.name;

      console.log(offrenom);

      if (window.confirm("Êtes-vous sûr de supprimer cet entretien ?")) {
        await axios.delete(`/api/entretiens/${entretienId}`);
        setMessage("Entretien supprimé avec succès");
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 4000);

        setEntretiens(entretiens.filter((e) => e._id !== entretienId));

        const notificationPromises = [];
        console.log(nomoffreentretien);
        let message = `Désolé, l'entretien pour l'offre ${offrenom} est annulé`;

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
          <h1>Liste des entretiens</h1>
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
            {entretiens
              .filter((entretien) => new Date(entretien.date) > currentDate)
              .map((entretien) => (
                <tr key={entretien._id}>
                  <td>{getEmployeeName(entretien.employeeid)}</td>
                  <td>{getUserNames(entretien.user)}</td>
                  <td>{getOffreTitle(entretien.offre)}</td>
                  <td>
                    {entretien.type === "presentiel" ? (
                      <span>
                        {entretien.type} <br /> Documents demandés:{" "}
                        {entretien.Documents_demandes} <br /> lieu :{" "}
                        {entretien.adresse}
                      </span>
                    ) : (
                      <span>
                        {entretien.type} <br /> url :{entretien.url} <br />
                        code accès: {entretien.code_access}
                      </span>
                    )}
                  </td>
                  <td>
                    {entretien.date} a {entretien.heure} h
                  </td>
           
                 
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminEntretienList;