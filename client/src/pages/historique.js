import React, { useState, useEffect } from "react";
import axios from "axios";
import "../entretien.css";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import ProfileBar from "../components/profilebar";

const Historique = () => {
  const [entretiens, setEntretiens] = useState([]);
  const [users, setUsers] = useState([]);
  const [offres, setOffres] = useState([]);
  const [message, setMessage] = useState("");
  const [nomoffreentretien, setNomoffreentretien] = useState("");
  const [show, setShow] = useState(false);
  const [originalForm, setOriginalForm] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [formType, setFormType] = useState("");
  const [formDate, setFormDate] = useState("");

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

        setEntretiens(responseEntretiens.data);
        setUsers(responseUsers.data);
        setOffres(responseOffres.data);

        const userId = await getUserId();
        setEntretiens(
          responseEntretiens.data.filter(
            (entretien) => entretien.employeeid === userId
          )
        );
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

        if (selectedUsers.length > 0) {
          const offreTitle = getOffreTitle(originalForm.offre);
          const message = `Vous êtes accepté pour l'offre "${offreTitle}"`;
          selectedUsers.forEach((userId) => {
            notificationPromises.push(
              axios.post("/api/notification", {
                message,
                userId,
              })
            );
          });
        } else {
          const offreTitle = getOffreTitle(originalForm.offre);
          const message = `Vous êtes refusé pour l'offre "${offreTitle}"`;
          originalForm.user.forEach((userId) => {
            notificationPromises.push(
              axios.post("/api/notification", {
                message,
                userId,
              })
            );
          });
        }

        await Promise.all(notificationPromises);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedEntretien = {
        ...originalForm,
        accepted: selectedUsers,
        refused: originalForm.user.filter(
          (userId) => !selectedUsers.includes(userId)
        ),
      };

      await axios.put(`/api/entretiens/${originalForm._id}`, updatedEntretien);

      const notificationPromises = [];

      if (selectedUsers.length > 0) {
        const offreTitle = getOffreTitle(originalForm.offre);
        const acceptedMessage = `Vous êtes accepté pour l'offre "${offreTitle}"`;
        const refusedMessage = `Vous êtes refusé pour l'offre "${offreTitle}"`;

        selectedUsers.forEach((userId) => {
          notificationPromises.push(
            axios.post("/api/notification", {
              message: acceptedMessage,
              userId,
            })
          );
        });

        originalForm.user.forEach((userId) => {
          if (!selectedUsers.includes(userId)) {
            notificationPromises.push(
              axios.post("/api/notification", {
                message: refusedMessage,
                userId,
              })
            );
          }
        });
      }

      await Promise.all(notificationPromises);

      setShowForm(false);
      setMessage("Entretien mis à jour avec succès");
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 4000);
    } catch (error) {
      console.error(error);
    }
  };
  const handleFormCancel = () => {
    setShowForm(false);
  };

  return (
    <section>
      <ProfileBar />
      <div className="entretiens-list-container">
        <Alert message={message} show={show} />
        <div class="col-lg-12 text-center">
          <h1>Historique des entretiens</h1>
        </div>

        {!showForm && (
          <table>
            <thead>
              <tr>
                <th>Candidats</th>
                <th>Offres</th>
                <th>Refusé</th>
                <th>Accepté</th>

                <th>Date</th>

              </tr>
            </thead>
            <tbody>
              {entretiens
                .filter((entretien) => new Date(entretien.date) < currentDate)
                .map((entretien) => (
                  <tr key={entretien._id}>
                    <td>{getUserNames(entretien.user)}</td>
                    <td>{getOffreTitle(entretien.offre)}</td>
                    <td>{getUserNames(entretien.refused)}</td>
                    <td>{getUserNames(entretien.accepted)}</td>

                    <td>
                      {entretien.date} a {entretien.heure} h

                    </td>

                    <td className="gap__actions entretiens">
                      <div className="entretien">

                        <button

                          onClick={() => {
                            setOriginalForm(entretien);
                            setFormType(entretien.type);
                            setFormDate(entretien.date);
                            setSelectedUsers(entretien.accepted);
                            setShowForm(true);
                          }}
                        >
                          Sélection des candidats
                        </button>


                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}

{showForm && (
  <div className="container-fluid">
    <div className="row main-content bg-success text-center">
      <div className="col-md-4 text-center company__info">
        <span className="company__logo">
          <h2>
            <span className="fa fa-android"></span>
          </h2>
        </span>
        <img src={require("../sources/poste.svg.png")} alt="Company Logo" />
      </div>
      <div className="col-md-8 col-xs-12 col-sm-12 login_form">
        <div className="container-fluid">
          <div className="row">
            <h4>Liste des candidats ayant passé leurs entretiens</h4>
          </div>
          <div className="row">
            <form onSubmit={handleFormSubmit} className="form-group">
              <div className="row historique">
                <label>
                  Veuillez sélectionner les candidats acceptés
                </label>
                {users
                  .filter((user) => originalForm.user.includes(user._id))
                  .map((user) => (
                    <div key={user._id}>
                      <input
                        type="checkbox"
                        id={user._id}
                        value={user._id}
                        checked={selectedUsers.includes(user._id)}
                        onChange={(e) => {
                          const userId = e.target.value;
                          if (e.target.checked) {
                            setSelectedUsers((prevState) => [
                              ...prevState,
                              userId,
                            ]);
                          } else {
                            setSelectedUsers((prevState) =>
                              prevState.filter((id) => id !== userId)
                            );
                          }
                        }}
                      />
                      <label htmlFor={user._id}>
                        {user.Firstname} {user.Lastname}
                      </label>
                    </div>
                  ))}
              </div>
              <div className="row">
                <div className="col">
                  <button type="bttn">Confirmer</button>
                </div>
                <div className="col">
                  <button className="btn-secondary " onClick={handleFormCancel}>
                    Annuler
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
            
          </div>
    </section>
  );
};

export default Historique;
